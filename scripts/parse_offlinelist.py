"""Parse the OfflineList DAT (raw/offlinelist/) into derived/offlinelist-games.json
and report its overlap with the master list.

The DAT (by NashG, archive.org/details/cndosgames) holds 723 简中 entries with
title / publisher / year. location & language codes are constant (3 / 4) across
all entries, so they carry no signal and are dropped. imageNumber maps to a
screenshot under the item's imgs/ folder (gitignored, re-fetchable if wanted).

Coverage matching mirrors build_master.py: convert the 繁中 master titles to 简
via opencc t2s, normalize (strip punctuation/whitespace), then exact / edition /
digit-removed match against the (already 简中) OfflineList titles.
"""
import json
import re
import subprocess
import xml.etree.ElementTree as ET
from collections import Counter
from pathlib import Path

DAT = Path("raw/offlinelist/Chinese Game Dat - DOS.xml")
MASTER = Path("derived/master-list.json")
OUT = Path("derived/offlinelist-games.json")

PUNCT = re.compile(r"[\s：:・·／/、，,．.\-—–_!！?？’'\"“”()（）\[\]【】~～·]+")
EDITIONS = ["光盘版", "光碟版", "加强版", "加強版", "增强版", "增強版", "梦幻版", "夢幻版",
            "典藏版", "完整版", "重制版", "重製版", "硬盘版", "硬碟版", "简体版", "繁体版",
            "繁體版", "dos版", "windows版", "win版", "cd版", "豪华版", "豪華版", "纪念版", "紀念版"]


def norm(s: str) -> str:
    return PUNCT.sub("", s or "").lower()


def strip_edition(s: str) -> str:
    for e in EDITIONS:
        s = s.replace(e, "")
    return s


def no_digits(s: str) -> str:
    return re.sub(r"\d+", "", s)


def _convert(titles, config):
    payload = "\n".join(re.sub(r"\s+", " ", t or "").strip() for t in titles)
    out = subprocess.run(
        ["opencc", "-c", config],
        input=payload, capture_output=True, text=True, check=True,
    ).stdout
    return out.split("\n")[: len(titles)]


def to_simplified(titles):
    return _convert(titles, "t2s.json")


def to_traditional(titles):
    # 繁體為主：OfflineList titles are 简中; provide a Taiwan-正體 form so the
    # canonical name follows the 繁中 catalog. Orthographic (s2tw), not s2twp,
    # to avoid over-translating game titles via vocabulary substitution.
    return _convert(titles, "s2tw.json")


def parse_dat():
    games = ET.parse(DAT).getroot().find("games").findall("game")
    out = []
    for x in games:
        year = x.findtext("comment") or ""
        out.append({
            "name": (x.findtext("title") or "").strip(),
            "publisher": (x.findtext("publisher") or "").strip() or None,
            "source_rom": (x.findtext("sourceRom") or "").strip() or None,
            "year": int(year) if year.isdigit() else None,
            "image_number": int(x.findtext("imageNumber") or 0) or None,
            "release_number": int(x.findtext("releaseNumber") or 0) or None,
            "provenance": ["offlinelist@cndosgames"],
        })
    # 繁體為主：add a Taiwan-正體 canonical name; keep 簡 `name` as the alias.
    for g, hant in zip(out, to_traditional([g["name"] for g in out])):
        g["name_zh_hant"] = hant
    return out


def main():
    games = parse_dat()
    OUT.write_text(json.dumps(games, ensure_ascii=False, indent=2), encoding="utf-8")

    # coverage vs master (master titles 繁 -> 简, then normalized index)
    master = json.loads(MASTER.read_text(encoding="utf-8"))
    simp = to_simplified([g["title_zh"] for g in master])
    m_exact = set()
    m_edstrip = set()
    m_nodigit = Counter()
    for s in simp:
        m_exact.add(norm(s))
        m_edstrip.add(norm(strip_edition(s)))
        m_nodigit[no_digits(norm(s))] += 1
    # aliases (English/原名) too, in case OfflineList title equals an alias
    for g in master:
        for a in g.get("title_aliases", []):
            m_exact.add(norm(a))

    m_simp_norm = [norm(s) for s in simp]
    tiers = Counter()
    new = []
    for g in games:
        k = norm(g["name"])
        if k in m_exact:
            tiers["exact"] += 1
        elif norm(strip_edition(g["name"])) in m_edstrip:
            tiers["edition"] += 1
        elif m_nodigit.get(no_digits(k), 0) == 1:
            tiers["alt"] += 1
        else:
            tiers["new"] += 1
            new.append(g)

    # Conservative exact matching inflates "new" with naming differences. Bucket
    # the raw-new pile to separate likely false-new from genuine gaps.
    def classify_new(g):
        k = norm(g["name"])
        if norm(re.sub(r"[-－—].*", "", g["name"])) in m_exact:
            return "subtitle"   # same game, OfflineList carries a subtitle
        if no_digits(k) in {no_digits(x) for x in m_simp_norm}:
            return "numbering"  # series installment, ambiguous digit match
        if any(k and (k in ms or ms in k) for ms in m_simp_norm if len(ms) > 2):
            return "substr"     # title is a substring of / contains a master title
        return "absent"         # no trace in master — genuine candidate
    buckets = Counter(classify_new(g) for g in new)
    absent = [g for g in new if classify_new(g) == "absent"]

    print(f"offlinelist: {len(games)}  -> {OUT}")
    matched = len(games) - tiers["new"]
    print(f"in master: {matched}  (tiers: {dict(tiers)})")
    print(f"raw-new (exact-match miss): {tiers['new']}  breakdown: {dict(buckets)}")
    print(f"genuine gaps (absent): {len(absent)}")
    yrs = Counter(g["year"] for g in games if g["year"])
    print(f"year range: {min(yrs)}–{max(yrs)}")
    print("absent by year:", dict(sorted(Counter(g["year"] for g in absent if g["year"]).items())))
    print("absent by publisher:", Counter(g["publisher"] for g in absent).most_common(10))
    print("absent samples:", [(g["name_zh_hant"], g["year"], g["publisher"]) for g in absent[:12]])


if __name__ == "__main__":
    main()
