"""Merge secondary-source candidates into the catalog.

Pipeline position: build_master -> merge_sources -> build_content.

Classifies each not-in-master candidate into:
  - enrich : same game already in master (edition / variant) -> attach to it
  - new    : genuinely new game -> new entry (high-confidence auto, else review)
  - review : ambiguous dedup, suspected non-game, remake, or low-confidence new

Dry run by default (prints bucket stats). Pass --write to emit:
  - derived/master-list.merged.json  (master + auto-new + enrich applied)
  - derived/merge-review.json         (everything awaiting human decision)
"""
import json
import re
import subprocess
import sys
from collections import defaultdict
from pathlib import Path

D = Path("derived")
PUNCT = re.compile(r"[\s：:・·／/、，,．.\-—–_!！?？’'\"“”()（）\[\]【】~～·]+")
EDITIONS = ["光盘版", "光碟版", "加强版", "加強版", "增强版", "增強版", "梦幻版", "夢幻版",
            "典藏版", "完整版", "硬盘版", "硬碟版", "简体版", "繁体版", "繁體版", "cd版",
            "磁片版", "dos版", "windows版", "win版", "豪华版", "豪華版", "纪念版", "紀念版"]
REMAKE = ["重制版", "重製版", "复刻", "復刻", "新版", "革新版"]
NONGAME = ["合集", "合輯", "合辑", "collection", "有聲書", "有声书", "工具", "字型",
           "教學", "教学", "月刊", "大補帖", "大补帖", "補帖", "雜誌", "杂志"]


def norm(s):
    return PUNCT.sub("", s or "").lower()


def base(s):
    return re.sub(r"\d+", "", norm(s))


FOLD = {0x3000: 0x20, **{0xFF01 + i: 0x21 + i for i in range(94)}}


def foldnorm(s):
    return norm((s or "").translate(FOLD))


def softworld_index():
    idx = {}
    for r in json.loads((D / "softworld-games.json").read_text(encoding="utf-8")):
        for nm in (r.get("name"), r.get("name_en")):
            if nm and foldnorm(nm) not in idx:
                idx[foldnorm(nm)] = r
    return idx


def strip_edition(s):
    for e in EDITIONS:
        s = s.replace(e, "")
    return s


def group_key(simp):
    """Base-game key for edition grouping: drop 版-editions + trailing version
    letters (S/X/SP/DX...), but KEEP digits (series numbers = different games).
    Only strips trailing letters when CJK remains, so latin-only names survive."""
    s = norm(strip_edition(simp))
    trimmed = re.sub(r"[a-z+]+$", "", s)
    return trimmed if trimmed and re.search(r"[一-鿿]", trimmed) else s


def edit_distance(a, b, cap=2):
    """Bounded Levenshtein; returns >cap early if clearly farther (cheap)."""
    if abs(len(a) - len(b)) > cap:
        return cap + 1
    prev = list(range(len(b) + 1))
    for i, ca in enumerate(a, 1):
        cur = [i]
        best = i
        for j, cb in enumerate(b, 1):
            cur.append(min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (ca != cb)))
            best = min(best, cur[-1])
        if best > cap:
            return cap + 1
        prev = cur
    return prev[-1]


def t2s(titles):
    # collapse internal whitespace so each input is exactly one line — an embedded
    # newline would shift opencc's line-split output and misalign every entry after.
    clean = [re.sub(r"\s+", " ", x or "").strip() for x in titles]
    out = subprocess.run(["opencc", "-c", "t2s.json"], input="\n".join(clean),
                         capture_output=True, text=True).stdout.split("\n")
    return out[: len(titles)]


def load_candidates(master_norm):
    """Normalize each source's not-in-master entries into unified candidate dicts."""
    cands = []
    rwv = json.loads((D / "rwv-games.json").read_text())
    for g, s in zip(rwv, t2s([g["identifier"] for g in rwv])):
        if norm(s) not in master_norm:
            cover_local = None
            if g.get("cover"):
                p = f"raw/rwv/img/{g['identifier']}/{g['cover']}"
                if Path(p).exists():
                    cover_local = p
            cands.append({"src": "rwv", "name": g["identifier"], "simp": s,
                          "year": g.get("year"), "cover_local": cover_local})
    fan = json.loads((D / "fandom-games.json").read_text())
    for g, s in zip(fan, t2s([g["name"] for g in fan])):
        if norm(s) not in master_norm:
            cands.append({"src": "fandom", "name": g["name"], "simp": s,
                          "year": g.get("year"), "ref_fandom": g["fandom_title"]})
    ome = json.loads((D / "omega-threads.json").read_text())
    for g, s in zip(ome, t2s([g["name"] for g in ome])):
        if norm(s) not in master_norm:
            cands.append({"src": "omega", "name": g["name"], "simp": s,
                          "year": None, "ref_omega": g["link"],
                          "title_raw": g.get("title_raw")})
    bon = json.loads((D / "boneash-games.json").read_text())
    for g, s in zip(bon, t2s([g["name"] for g in bon])):
        if norm(s) not in master_norm:
            cands.append({"src": "boneash", "name": g["name"], "simp": s,
                          "year": g.get("year"), "name_en": g.get("name_en")})
    return cands


def classify_vs_master(c, master_norm, master_base):
    """Return (bucket, reason). bucket in {enrich, review, new}."""
    n = norm(c["simp"])
    stripped = norm(strip_edition(c["simp"]))
    had_suffix = stripped != n
    if any(r in c["name"] for r in REMAKE):
        return "review", "remake-suffix"
    if any(k in c["name"].lower() for k in NONGAME):
        return "review", "suspected-non-game"
    if stripped in master_norm:
        return "enrich", "edition" if had_suffix else "same-title-variant"
    bm = master_base.get(base(stripped), [])
    if had_suffix and len(bm) == 1:
        return "enrich", "edition-base-unique"
    if bm:
        return "review", f"base-matches-{len(bm)}-master"
    return "new", ""


def main(write=False):
    master = json.loads((D / "master-list.json").read_text())
    msimp = t2s([m["title_zh"] for m in master])
    master_norm = {norm(s) for s in msimp}
    master_base = defaultdict(list)
    master_by_prefix = defaultdict(list)  # first-2-chars -> [norm titles] for fuzzy
    for m, s in zip(master, msimp):
        master_base[base(s)].append(m["title_zh"])
        master_by_prefix[norm(s)[:2]].append(norm(s))

    def near_master(n):
        """True if a master title is within edit distance 2 (catches 秘/謎, SP/X)."""
        for cand in master_by_prefix.get(n[:2], []):
            if edit_distance(n, cand) <= 2:
                return True
        return False

    cands = load_candidates(master_norm)

    enrich, review, new = [], [], []
    for c in cands:
        bucket, reason = classify_vs_master(c, master_norm, master_base)
        # fuzzy guard: a near-identical master title means it's not really new
        if bucket == "new" and near_master(norm(c["simp"])):
            bucket, reason = "review", "fuzzy-near-master"
        c["reason"] = reason
        (enrich if bucket == "enrich" else review if bucket == "review" else new).append(c)

    # cross-source dedup (exact normalized) -> units
    by_norm = defaultdict(list)
    for c in new:
        by_norm[norm(c["simp"])].append(c)
    def first(group, field):
        return next((c.get(field) for c in group if c.get(field)), None)

    units = []
    for k, group in by_norm.items():
        units.append({
            "name": group[0]["name"], "simp": group[0]["simp"],
            "srcs": sorted({c["src"] for c in group}),
            "year": first(group, "year"),
            "cover_local": first(group, "cover_local"),
            "name_en": first(group, "name_en"),
            "ref_omega": first(group, "ref_omega"),
            "ref_fandom": first(group, "ref_fandom"),
            "title_raw": first(group, "title_raw"),
            "variants": sorted({f"{c['src']}:{c['name']}" for c in group}),
        })

    # edition-group units that share a base game (主题医院 + 主题医院S -> one)
    by_base = defaultdict(list)
    for u in units:
        by_base[group_key(u["simp"])].append(u)
    sw_idx = softworld_index()
    merged_new = []
    for gk, us in by_base.items():
        baseu = next((u for u in us if norm(u["simp"]) == gk),
                     min(us, key=lambda u: len(norm(u["simp"]))))
        sw = next((sw_idx[foldnorm(u["name"])] for u in us
                   if foldnorm(u["name"]) in sw_idx), None) or next(
            (sw_idx[foldnorm(u["name_en"])] for u in us
             if u["name_en"] and foldnorm(u["name_en"]) in sw_idx), None)
        srcs = sorted({s for u in us for s in u["srcs"]})
        year = next((u["year"] for u in us if u["year"]), None)
        cover = next((u["cover_local"] for u in us if u["cover_local"]), None)
        region = "CN" if set(srcs) <= {"rwv", "fandom", "omega"} else None
        high = len(srcs) >= 2 or ("boneash" in srcs and year) or (year and cover)
        merged_new.append({
            "name": baseu["name"], "srcs": srcs, "year": year, "region": region,
            "editions": [u["name"] for u in us if u is not baseu],
            "name_en": next((u["name_en"] for u in us if u["name_en"]), None),
            "cover_local": cover,
            "ref_omega": next((u["ref_omega"] for u in us if u["ref_omega"]), None),
            "ref_fandom": next((u["ref_fandom"] for u in us if u["ref_fandom"]), None),
            "title_raw": next((u["title_raw"] for u in us if u["title_raw"]), None),
            "variants": sorted({v for u in us for v in u["variants"]}),
            "softworld": ({"code": sw["code"], "series": sw["series"],
                           "placeholder": sw["placeholder"]} if sw else None),
            "confidence": "high" if high else "low",
        })

    auto_new = [m for m in merged_new if m["confidence"] == "high"]
    low_new = [m for m in merged_new if m["confidence"] == "low"]

    # ---- report ----
    print(f"candidates (raw, per-source not-in-master): {len(cands)}")
    print(f"  enrich (attach to existing): {len(enrich)}")
    print(f"  review (ambiguous/non-game/remake): {len(review)}")
    er = defaultdict(int)
    for c in review:
        er[c["reason"]] += 1
    for k, v in sorted(er.items(), key=lambda x: -x[1]):
        print(f"      {k}: {v}")
    folded = sum(len(m["editions"]) for m in merged_new)
    print(f"  new (after cross-source + edition grouping): {len(merged_new)}  "
          f"(folded {folded} edition-variants into base games)")
    print(f"      auto-new (high confidence): {len(auto_new)}")
    print(f"      low-confidence -> review:   {len(low_new)}")
    cn = sum(1 for m in merged_new if m["region"] == "CN")
    print(f"  region=CN inferred among new: {cn}")
    print(f"\n  >>> would AUTO-ADD: {len(auto_new)} new entries")
    print(f"  >>> would ENRICH:   {len(enrich)} existing entries")
    print(f"  >>> review queue:   {len(review) + len(low_new)}")
    print("\n  auto-new w/ editions sample:",
          [(m["name"], m["editions"]) for m in auto_new if m["editions"]][:5])

    # always export the auto-new preview for human review (not the catalog)
    preview = D / "merge-auto-preview.json"
    preview.write_text(json.dumps(sorted(auto_new, key=lambda m: (m["region"] or "", m["name"])),
                                  ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"\n  auto-new preview written: {preview}")

    if write:
        print("\n(--write not yet implemented; confirm preview first)")


if __name__ == "__main__":
    main(write="--write" in sys.argv)
