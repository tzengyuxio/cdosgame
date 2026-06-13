"""Build derived/master-list.json by joining the chiuinan backbone (繁中,
structured) with rwv games.json (簡中 + covers/links).

Match strategy: convert chiuinan 繁中 titles to 簡中 via opencc (t2s), then
match against rwv identifiers (簡中). Matching key is normalized (whitespace
and punctuation stripped).
"""
import json
import re
import subprocess
from pathlib import Path

CHIUINAN = Path("derived/chiuinan-games.json")
RWV = Path("derived/rwv-games.json")
REGIONS = Path("data/developer-regions.json")
OMEGA = Path("derived/omega-threads.json")
FANDOM = Path("derived/fandom-games.json")
OUT = Path("derived/master-list.json")
CHINESE_REGIONS = {"TW", "HK", "CN", "MO"}

PUNCT = re.compile(r"[\s：:・·／/、，,．.\-—–_!！?？’'\"“”()（）\[\]【】~～·]+")
CJK = re.compile(r"[一-鿿㐀-䶿]")
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


def has_cjk(s) -> bool:
    return bool(s and CJK.search(s))


def classify_localization(content_language, developer, publisher_tw):
    """Derive a localization level from chiuinan signals. Low-confidence heuristic.

    A  原生中文開發  : 中文遊戲 + 中文開發商
    B  中文化遊戲    : 中文遊戲 + 外國開發商（官方中文版）
    D  中文包裝代理  : 英文遊戲 + 有台灣發行/代理商
    foreign 純外國   : 英文遊戲 + 無台灣發行商（收集邊界外候選）
    null            : content_language 未知，無法判定

    C（民間漢化）無法從此來源 derive。返回 (level, basis)。
    """
    if content_language == "zh":
        if has_cjk(developer):
            return "A", "zh-content + cjk-developer"
        return "B", "zh-content + foreign-developer"
    if content_language == "en":
        if publisher_tw:
            return "D", "en-content + tw-publisher"
        return "foreign", "en-content + no-tw-publisher"
    # content_language unknown (not in a genre page): backfill from developer.
    # A CJK developer is a strong signal for a native Chinese game.
    if has_cjk(developer):
        return "A", "backfill: cjk-developer (no genre page)"
    return None, "unknown content_language"


def to_simplified(titles):
    """Batch-convert a list of 繁中 strings to 簡中 via opencc t2s."""
    payload = "\n".join(titles)
    out = subprocess.run(
        ["opencc", "-c", "t2s.json"],
        input=payload, capture_output=True, text=True, check=True,
    ).stdout
    return out.split("\n")[: len(titles)]


def main():
    chiuinan = json.loads(CHIUINAN.read_text(encoding="utf-8"))
    rwv = json.loads(RWV.read_text(encoding="utf-8"))
    dev_regions = json.loads(REGIONS.read_text(encoding="utf-8"))["regions"]

    simplified = to_simplified([g["title_zh"] for g in chiuinan])

    # reference-link indexes: normalized simplified name -> source ref
    omega = json.loads(OMEGA.read_text(encoding="utf-8"))
    fandom = json.loads(FANDOM.read_text(encoding="utf-8"))
    omega_idx = {norm(s): r["link"]
                 for r, s in zip(omega, to_simplified([r["name"] for r in omega]))}
    fandom_idx = {norm(s): r["fandom_title"]
                  for r, s in zip(fandom, to_simplified([r["name"] for r in fandom]))}

    # rwv lookup tables (keys are 簡中, already simplified)
    rwv_exact, rwv_edstrip = {}, {}
    rwv_alt = {}  # digit-removed -> set of identifiers (for 1:1 uniqueness check)
    for g in rwv:
        k = norm(g["identifier"])
        rwv_exact.setdefault(k, g)
        rwv_edstrip.setdefault(norm(strip_edition(g["identifier"])), g)
        rwv_alt.setdefault(no_digits(k), set()).add(g["identifier"])
        if g.get("title_zh_hant"):  # the 42 with explicit 繁中
            rwv_exact.setdefault(norm(g["title_zh_hant"]), g)
    # chiuinan-side digit-removed uniqueness (avoid 三國志N series collisions)
    chiu_alt_count = {}
    for s in simplified:
        chiu_alt_count[no_digits(norm(s))] = chiu_alt_count.get(no_digits(norm(s)), 0) + 1

    def match_rwv(simp, title_zh):
        for k in (norm(simp), norm(title_zh), norm(strip_edition(simp))):
            if k in rwv_exact:
                return rwv_exact[k], "exact"
            if k in rwv_edstrip:
                return rwv_edstrip[k], "edition"
        # digit-removed match, only when unambiguous on BOTH sides
        ka = no_digits(norm(simp))
        cands = rwv_alt.get(ka)
        if cands and len(cands) == 1 and chiu_alt_count.get(ka, 0) == 1:
            return rwv_exact[norm(next(iter(cands)))], "alt"
        return None, None

    master, matched = [], 0
    tiers = {"exact": 0, "edition": 0, "alt": 0}
    for g, simp in zip(chiuinan, simplified):
        r, tier = match_rwv(simp, g["title_zh"])
        if tier:
            tiers[tier] += 1
        level, basis = classify_localization(
            g.get("content_language"), g.get("developer"), g.get("publisher_tw"))
        dev_region = dev_regions.get(g["developer"]) if g.get("developer") else None
        # Region correction: a CJK-named studio that is actually JP/US/EU was
        # wrongly tagged native (A). If the developer's region is known and not
        # Chinese, it is a localized title (B), not native development.
        if level == "A" and dev_region and dev_region not in CHINESE_REGIONS:
            level, basis = "B", f"region-correction: {dev_region} developer"
        # Catalog entry: Taiwan-product focus. Drops rating + publisher_original
        # (those stay in the per-source derived/chiuinan-games.json record).
        entry = {
            "title_zh": g["title_zh"],
            "title_aliases": g["title_aliases"],
            "year": g["year"],
            "developer": g["developer"],
            "developer_region": dev_region,
            "publisher_tw": g["publisher_tw"],
            "content_language": g.get("content_language"),
            "genre": g.get("genre"),
            "localization_level": level,
            "localization_basis": basis,
            "size": g["size"],
            "platform_note": g["platform_note"],
            "catalog_id": g["catalog_id"],
            "intro_todo": g["intro_todo"],
            "cover": None,
            "external_links": {},
            "references": {},
            "provenance": list(g["provenance"]),
        }
        nk = norm(simp)
        if nk in omega_idx:
            entry["references"]["omega"] = omega_idx[nk]
            entry["provenance"].append("omega@forumid=68")
        if nk in fandom_idx:
            entry["references"]["fandom"] = fandom_idx[nk]
            entry["provenance"].append("fandom@cn-dos-games")
        if r:
            matched += 1
            entry["cover"] = r["cover"]
            entry["external_links"] = r["external_links"]
            entry["rwv_source_id"] = r["source_id"]
            entry["rwv_match"] = tier
            entry["provenance"] += r["provenance"]
        master.append(entry)

    OUT.write_text(json.dumps(master, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"chiuinan: {len(chiuinan)}  rwv: {len(rwv)}  matched: {matched}  tiers: {tiers}")
    print(f"matched with cover: {sum(1 for e in master if e.get('cover'))}")
    from collections import Counter
    dist = Counter(e["localization_level"] for e in master)
    print("localization_level:", dict(dist))
    reg = Counter(e["developer_region"] for e in master)
    print("developer_region:", dict(reg))
    corrected = sum(1 for e in master if e["localization_basis"].startswith("region-correction"))
    print(f"A->B region corrections: {corrected}")
    print(f"references: omega={sum(1 for e in master if 'omega' in e['references'])}"
          f"  fandom={sum(1 for e in master if 'fandom' in e['references'])}"
          f"  any={sum(1 for e in master if e['references'])}")


if __name__ == "__main__":
    main()
