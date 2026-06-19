"""Triage the `fuzzy-near-master` review-queue items (Phase 4).

These candidates have no exact / base-number match but a catalog title sits
within edit-distance 2 (in simplified+depunct space) — a likely spelling variant
(異體字 / 之的 / 秘謎 / typo) of an existing game, or a genuinely different game
that happens to be close.

For each candidate we find the nearest catalog entries (≤2 edits, shared 2-char
prefix, same logic as merge_sources.near_master) and suggest:

  - merge  : distance 1, equal length -> single-char variant, almost certainly
             the same game; keep candidate name as an alias on the target.
  - review : distance 2 or a length change -> needs a human to confirm same game.
  - reject : the candidate string is already a title/alias somewhere.

Outputs derived/fuzzy-triage.md (worklist) + derived/fuzzy-phase4-draft.json
(merge decisions only; review/append left for human follow-up). Writes nothing
into data/.
"""
import json
import re
from collections import defaultdict
from pathlib import Path

import merge_sources as M  # norm / t2s / edit_distance

CONTENT = Path("content/games")
REVIEW = Path("derived/merge-review.json")
OUT = Path("derived/fuzzy-triage.md")
DRAFT = Path("derived/fuzzy-phase4-draft.json")
MERGE_SRC = {"rwv", "fandom"}

ROMAN = {"ⅰ": "1", "ⅱ": "2", "ⅲ": "3", "ⅳ": "4", "ⅴ": "5", "ⅵ": "6",
         "ⅶ": "7", "ⅷ": "8", "ⅸ": "9", "ⅹ": "10"}


def core(norm_s):
    """Typography-only canonical form: fold full-width, Roman->arabic, drop the
    之/的 particles. Two titles with equal core differ ONLY cosmetically and are
    the same game; a one-CHARACTER meaning difference (大海商/大海盜) does not
    collapse, so it is NOT auto-merged."""
    s = M.foldnorm(norm_s)
    for k, v in ROMAN.items():
        s = s.replace(k, v)
    return re.sub(r"[之的]", "", s)


def load_catalog():
    rows = []
    for f in sorted(CONTENT.glob("cdg-*.md")):
        fm = f.read_text(encoding="utf-8").split("---", 2)[1]
        def grab(k):
            m = re.search(rf"^{k}: (.+)$", fm, re.M)
            return m.group(1).strip() if m else None
        title = grab("title_zh")
        if title:
            rows.append({"id": f.stem, "title": title,
                         "year": grab("year"), "developer": grab("developer")})
    simps = M.t2s([r["title"] for r in rows])
    for r, s in zip(rows, simps):
        r["norm"] = M.norm(s)
    return rows


def known_strings():
    ks = set()
    for f in CONTENT.glob("cdg-*.md"):
        txt = f.read_text(encoding="utf-8")
        for m in re.finditer(r"^title_zh: (.+)$", txt, re.M):
            ks.add(m.group(1).strip())
        al = re.search(r"^title_aliases:\n((?:- .+\n)+)", txt, re.M)
        if al:
            ks.update(x[2:].strip() for x in al.group(1).splitlines())
    return ks


def main():
    review = json.loads(REVIEW.read_text(encoding="utf-8"))
    items = [r for r in review if r["reason"] == "fuzzy-near-master"]
    catalog = load_catalog()
    by_prefix = defaultdict(list)
    for r in catalog:
        by_prefix[r["norm"][:2]].append(r)
    known = known_strings()

    simps = M.t2s([it["name"] for it in items])
    rows, counts = [], defaultdict(int)
    for it, simp in zip(items, simps):
        n = M.norm(simp)
        near = sorted(((M.edit_distance(n, r["norm"]), r) for r in by_prefix.get(n[:2], [])),
                      key=lambda x: x[0])
        near = [(d, r) for d, r in near if d <= 2][:4]
        src = it.get("src") or ",".join(it.get("srcs", []))
        cc = core(n)
        core_hit = next(((d, r) for d, r in near if core(r["norm"]) == cc), None)
        best = core_hit or (near[0] if near else None)
        if it["name"] in known:
            action = "reject"
        elif core_hit:
            action = "merge"          # typography-only variant -> same game
        elif near:
            action = "review"         # real char difference -> human confirms
        else:
            action = "append"         # nearest dropped out -> no longer near
        counts[action] += 1
        rows.append({"name": it["name"], "simp": simp, "src": src,
                     "action": action, "near": near, "best": best})

    # ---- worklist ----
    L = ["# Phase 4 — fuzzy-near-master triage\n",
         f"共 {len(items)} 筆。建議：merge(單字變體,同款) {counts['merge']} / "
         f"review(需人確認) {counts['review']} / reject(字串已存在) {counts['reject']} / "
         f"append(已不近) {counts['append']}。",
         "best = 最近既有款(編輯距離)。merge=距離1且同長；其餘距離2或長度變化列 review。\n",
         "| 候選 | 源 | 建議 | 距 | 最近既有款 | 其他近似 |",
         "|---|---|---|---|---|---|"]
    order = {"merge": 0, "review": 1, "reject": 2, "append": 3}
    for r in sorted(rows, key=lambda x: (order[x["action"]], x["best"][0] if x["best"] else 9, x["name"])):
        b = f"{r['best'][1]['id']} {r['best'][1]['title']}" if r["best"] else "—"
        d = r["best"][0] if r["best"] else "—"
        others = "；".join(f"{rr['id']} {rr['title']}(d{dd})" for dd, rr in r["near"][1:])
        L.append(f"| {r['name']} | {r['src']} | **{r['action']}** | {d} | {b} | {others or '—'} |")
    OUT.write_text("\n".join(L) + "\n", encoding="utf-8")

    # ---- draft: the safe auto-decisions (merge bucket = typography variant;
    # reject bucket = candidate name already in the catalog). review/append are
    # left out for human follow-up. simplified-source variant -> alias; others
    # -> reject (same policy as Phase 3). ----
    draft = {}
    for r in rows:
        tgt = r["best"][1] if r["best"] else None
        if r["action"] == "merge" and r["src"] in MERGE_SRC:
            draft.setdefault(r["name"], {
                "action": "merge", "target": tgt["id"], "prov": f"{r['src']}@merge",
                "note": f"typography variant of {tgt['title']}; keep name as alias"})
        elif r["action"] == "merge":          # Traditional-script variant -> redundant
            draft.setdefault(r["name"], {
                "action": "reject",
                "note": f"typography variant of {tgt['title']} ({tgt['id']})"})
        elif r["action"] == "reject":          # candidate name already catalogued
            draft.setdefault(r["name"], {
                "action": "reject", "note": "name already a catalog title/alias"})
    DRAFT.write_text(json.dumps(draft, ensure_ascii=False, indent=2, sort_keys=True) + "\n",
                     encoding="utf-8")

    print(f"items: {len(items)}")
    for k in ("merge", "review", "reject", "append"):
        print(f"  {k:7}: {counts[k]}")
    nm = sum(1 for v in draft.values() if v["action"] == "merge")
    nr = sum(1 for v in draft.values() if v["action"] == "reject")
    print(f"worklist -> {OUT}")
    print(f"draft -> {DRAFT} ({len(draft)} unique: merge {nm}, reject {nr})")


if __name__ == "__main__":
    main()
