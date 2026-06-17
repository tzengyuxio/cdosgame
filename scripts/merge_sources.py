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


def s2t(titles):
    clean = [re.sub(r"\s+", " ", x or "").strip() for x in titles]
    out = subprocess.run(["opencc", "-c", "s2t.json"], input="\n".join(clean),
                         capture_output=True, text=True).stdout.split("\n")
    return out[: len(titles)]


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
    # offlinelist (cndosgames): 簡中 names already; carries a curated 繁名 + year.
    # Names are 簡中, so feed `name` (簡) to keep the norm/t2s path uniform.
    ol = json.loads((D / "offlinelist-games.json").read_text())
    for g in ol:
        if norm(g["name"]) not in master_norm:
            cands.append({"src": "offlinelist", "name": g["name"], "simp": g["name"],
                          "year": g.get("year"), "name_hant": g.get("name_zh_hant")})
    return cands


def classify_vs_master(c, master_norm_map, master_base):
    """Return (bucket, reason, target). target = the matched master entry for
    enrich, else None. bucket in {enrich, review, new}."""
    n = norm(c["simp"])
    if not c["name"] or c["name"].strip().upper().replace("/", "") in ("NA", "-", ""):
        return "review", "invalid-name", None
    stripped = norm(strip_edition(c["simp"]))
    had_suffix = stripped != n
    if any(r in c["name"] for r in REMAKE):
        return "review", "remake-suffix", None
    if any(k in c["name"].lower() for k in NONGAME):
        return "review", "suspected-non-game", None
    if stripped in master_norm_map:
        return "enrich", ("edition" if had_suffix else "same-title-variant"), master_norm_map[stripped]
    bm = master_base.get(base(stripped), [])
    if had_suffix and len(bm) == 1:
        return "enrich", "edition-base-unique", bm[0]
    if bm:
        return "review", f"base-matches-{len(bm)}-master", None
    return "new", "", None


def main(write=False):
    master = json.loads((D / "master-list.json").read_text())
    msimp = t2s([m["title_zh"] for m in master])
    master_norm = {norm(s) for s in msimp}
    master_norm_map = {}                   # norm -> master entry (enrich target)
    master_base = defaultdict(list)        # base -> [master entries]
    master_by_prefix = defaultdict(list)   # first-2-chars -> [norm titles] for fuzzy
    for m, s in zip(master, msimp):
        master_norm_map.setdefault(norm(s), m)
        master_base[base(s)].append(m)
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
        bucket, reason, target = classify_vs_master(c, master_norm_map, master_base)
        # fuzzy guard: a near-identical master title means it's not really new
        if bucket == "new" and near_master(norm(c["simp"])):
            bucket, reason = "review", "fuzzy-near-master"
        c["reason"], c["target"] = reason, target
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
            "name_hant": first(group, "name_hant"),
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
        high = (len(srcs) >= 2 or ("boneash" in srcs and year)
                or ("offlinelist" in srcs and year) or (year and cover))
        merged_new.append({
            "name": baseu["name"], "simp": baseu["simp"],
            "srcs": srcs, "year": year, "region": region,
            "editions": [u["name"] for u in us if u is not baseu],
            "name_en": next((u["name_en"] for u in us if u["name_en"]), None),
            "name_hant": next((u["name_hant"] for u in us if u.get("name_hant")), None),
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

    if not write:
        return

    # ---- apply: enrich existing + append accepted new -> master-list.merged.json ----
    decisions = json.loads((D.parent / "data/merge-decisions.json").read_text(encoding="utf-8")) \
        if (D.parent / "data/merge-decisions.json").exists() else {}
    accepted = [m for m in auto_new if decisions.get(m["name"]) == "accept"]
    undecided = [m for m in auto_new if m["name"] not in decisions]

    # enrich: append the candidate as an edition of its matched master entry
    for c in enrich:
        tgt = c["target"]
        tgt.setdefault("editions", [])
        if not any(e.get("name") == c["name"] for e in tgt["editions"]):
            tgt["editions"].append({"name": c["name"], "provenance": [f"{c['src']}@merge"]})
        if "@merge" not in " ".join(tgt.get("provenance", [])):
            tgt.setdefault("provenance", []).append(f"{c['src']}@merge")

    # build new entries for accepted candidates (繁中 title preferred, else s2t)
    s2t_map = dict(zip([m["name"] for m in accepted], s2t([m["simp"] for m in accepted])))
    new_entries = [build_entry(m, s2t_map) for m in accepted]
    merged = master + new_entries

    # hand-curated base-match resolutions (append / merge-into-existing / reject)
    merged, bm_decided, bm = apply_basematch(merged)
    (D / "master-list.merged.json").write_text(
        json.dumps(merged, ensure_ascii=False, indent=2), encoding="utf-8")

    # review queue: ambiguous/non-game + low-confidence new + undecided auto-new,
    # minus anything already resolved via the base-match worklist.
    review_out = (
        [{"name": c["name"], "reason": c["reason"], "src": c["src"]}
         for c in review if c["name"] not in bm_decided]
        + [{"name": m["name"], "reason": "low-confidence", "srcs": m["srcs"]} for m in low_new]
        + [{"name": m["name"], "reason": "undecided", "srcs": m["srcs"]} for m in undecided]
    )
    (D / "merge-review.json").write_text(
        json.dumps(review_out, ensure_ascii=False, indent=2), encoding="utf-8")

    print(f"\n  WROTE master-list.merged.json: {len(master)} + {len(new_entries)} auto-new "
          f"+ {bm['appends']} basematch-append = {len(merged)}")
    print(f"  basematch: appended {bm['appends']}, merged-into-existing {bm['merges']}, "
          f"rejected {bm['rejects']}, missing-target {len(bm['missing'])}")
    if bm["missing"]:
        print("    MISSING:", bm["missing"])
    print(f"  enriched existing entries: {len(enrich)}")
    print(f"  review queue -> merge-review.json: {len(review_out)} "
          f"(undecided auto-new: {len(undecided)})")
    print("  next: python3 scripts/build_content.py && npm run validate")


def load_offlinelist_images():
    """imageNumber -> [local screenshot paths] from the fetch manifest."""
    out = defaultdict(list)
    man = D.parent / "raw/offlinelist/img/screenshots-manifest.jsonl"
    if man.exists():
        for line in man.read_text(encoding="utf-8").splitlines():
            if not line.strip():
                continue
            r = json.loads(line)
            if r.get("status") in ("ok", "cached") and r.get("image_number") is not None:
                out[r["image_number"]].append(r["local_path"])
    return out


def apply_basematch(merged):
    """Apply data/basematch-decisions.json (hand-curated from the base-match
    worklist). `append` -> new catalog entry; `merge` -> tag the chosen existing
    entry with offlinelist provenance + 簡 alias + screenshot (繁名 stays canonical);
    `reject` -> drop. Returns (merged, decided_simp_names, stats)."""
    path = D.parent / "data/basematch-decisions.json"
    if not path.exists():
        return merged, set(), {"appends": 0, "merges": 0, "rejects": 0, "missing": []}
    dec = json.loads(path.read_text(encoding="utf-8"))
    olg = {g["name"]: g for g in json.loads((D / "offlinelist-games.json").read_text())}
    reg = json.loads((D.parent / "data/id-registry.json").read_text())["ids"]
    ol_img = load_offlinelist_images()
    by_title = defaultdict(list)
    for e in merged:
        by_title[e["title_zh"]].append(e)

    appends = merges = rejects = 0
    missing = []
    for simp, d in dec.items():
        g = olg.get(simp, {})
        imgs = ol_img.get(g.get("image_number")) if g else None
        if d["action"] == "append":
            title = d.get("title") or g.get("name_zh_hant") or simp
            merged.append({
                "title_zh": title,
                "title_aliases": [simp] if simp != title else [],
                "year": g.get("year"),
                "developer": None, "developer_region": None, "publisher_tw": [],
                "content_language": None, "genre": None,
                "localization_level": None, "localization_basis": "merged (basematch append)",
                "size": None, "platform_note": None, "catalog_id": None,
                "license_status": None, "release_codes": [], "cover": None,
                "images": {"offlinelist": imgs} if imgs else {},
                "references": {}, "external_links": {}, "editions": [],
                "intro_todo": True, "provenance": ["offlinelist@merge"],
            })
            appends += 1
        elif d["action"] == "merge":
            rt = reg.get(d["target"], {})
            cands = by_title.get(rt.get("title_zh"), [])
            if len(cands) > 1 and rt.get("developer"):
                cands = [e for e in cands if e.get("developer") == rt["developer"]] or cands
            if not cands:
                missing.append((simp, d["target"]))
                continue
            tgt = cands[0]
            if "offlinelist@cndosgames" not in tgt["provenance"]:
                tgt["provenance"].append("offlinelist@cndosgames")
            if simp not in tgt.setdefault("title_aliases", []):
                tgt["title_aliases"].append(simp)
            if imgs:
                tgt.setdefault("images", {}).setdefault("offlinelist", imgs)
            merges += 1
        elif d["action"] == "reject":
            rejects += 1
    return merged, set(dec), {"appends": appends, "merges": merges,
                              "rejects": rejects, "missing": missing}


def build_entry(m, s2t_map):
    """Construct a master-style catalog entry from an accepted merge candidate."""
    title = None
    for v in m["variants"]:                      # prefer a 繁中 name from boneash/omega
        src, _, nm = v.partition(":")
        if src in ("boneash", "omega") and re.search(r"[一-鿿]", nm):
            title = nm
            break
    # 繁體為主：fall back to OfflineList's curated Taiwan-正體 name before s2t.
    title = title or m.get("name_hant") or s2t_map.get(m["name"]) or m["name"]
    sw = m.get("softworld")
    images = {"rwv_cover": m["cover_local"]} if m.get("cover_local") else {}
    refs = {}
    if m.get("ref_omega"):
        refs["omega"] = m["ref_omega"]
    if m.get("ref_fandom"):
        refs["fandom"] = m["ref_fandom"]
    prov = [f"{s}@merge" for s in m["srcs"]] + (["softworld@boneash-scan"] if sw else [])
    en = m.get("name_en")
    return {
        "title_zh": title,
        "title_aliases": [en] if en and en != title else [],
        "year": m.get("year"),
        "developer": None,
        "developer_region": m.get("region"),
        "publisher_tw": ["軟體世界"] if sw else [],
        "content_language": None,
        "genre": None,
        "localization_level": None,
        "localization_basis": "merged (unclassified)",
        "size": None,
        "platform_note": None,
        "catalog_id": None,
        "license_status": "unofficial" if sw else None,
        "release_codes": ([{"issuer": "軟體世界", "code": sw["code"],
                            "status": "placeholder" if sw["placeholder"] else "released"}]
                          if sw else []),
        "cover": None,
        "images": images,
        "references": refs,
        "external_links": {},
        "editions": [{"name": e} for e in m.get("editions", [])],
        "intro_todo": True,
        "provenance": prov,
    }


if __name__ == "__main__":
    main(write="--write" in sys.argv)
