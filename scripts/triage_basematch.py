"""Triage the `base-matches-N-master` review-queue items (Phase 3).

For each candidate whose number-stripped base collides with N existing catalog
entries, decide whether the *specific* series number already exists:

  - exact number already in catalog  -> DUPLICATE  -> suggest `reject`
                                        (or `merge` if the candidate name is a
                                         variant worth keeping as an alias)
  - number genuinely missing          -> suggest `append` (real missing entry)

Comparison reproduces merge_sources' simplified+depunct space, plus a stronger
fold that maps full-width and Roman numerals to ASCII so that e.g.
`三國志２` (full-width) and `三國志2` are recognised as the same game.

Outputs a human worklist (derived/basematch-triage.md). Writes NO decisions.
Run from repo root:  /usr/bin/python3 scripts/triage_basematch.py
"""
import json
import re
from collections import defaultdict
from pathlib import Path

import merge_sources as M  # norm/base/strip_edition/t2s + constants

CONTENT = Path("content/games")
REVIEW = Path("derived/merge-review.json")
OUT = Path("derived/basematch-triage.md")

ROMAN = {"ⅰ": "1", "ⅱ": "2", "ⅲ": "3", "ⅳ": "4", "ⅴ": "5", "ⅵ": "6",
         "ⅶ": "7", "ⅷ": "8", "ⅸ": "9", "ⅹ": "10"}
ROMAN_ASCII = [("viii", "8"), ("vii", "7"), ("iii", "3"), ("ii", "2"),
               ("iv", "4"), ("ix", "9"), ("vi", "6"), ("v", "5"),
               ("x", "10"), ("i", "1")]


def canon(simp):
    """Fold full-width + Roman numerals to ASCII, then norm (depunct/lower)."""
    s = M.foldnorm(simp or "")           # full-width -> half-width incl ２->2
    for k, v in ROMAN.items():
        s = s.replace(k, v)
    for k, v in ROMAN_ASCII:             # trailing latin roman numerals
        s = re.sub(k + r"$", v, s)
    return s


def split_num(canon_s):
    """(stem_before_first_number, that_number_or_'').

    The series number need not be trailing: `洛克人3威利博士的末期` -> (`洛克人`,
    `3`). We take the FIRST run of digits as the series index so that titles
    carrying a subtitle after the number still resolve to the right stem."""
    m = re.search(r"(\d+)", canon_s)
    if m:
        return canon_s[: m.start()], m.group(1)
    return canon_s, ""


def find_dups(cb, cnum, base_key, catalog, by_base):
    """Existing catalog entries that ARE the same game as this candidate.

    numbered `洛克人`+`3` -> entries whose canon starts `洛克人3` (subtitle ok).
    numberless -> bare stem, else the series #1 entry (catalog stores a series'
    first game as `<name>1`), else a unique base-collision (subtitle pins it)."""
    if cnum:
        pat = re.compile(re.escape(cb) + cnum + r"(?!\d)")
        hit = [m for m in catalog if pat.match(m["canon"])]
        if hit:
            return hit
        if cnum == "1":                  # series #1 may be stored bare (no "1")
            return [m for m in catalog if m["canon"] == cb]
        return []
    exact = [m for m in catalog if m["canon"] == cb]
    if exact:
        return exact
    one_pat = re.compile(re.escape(cb) + "1" + r"(?!\d)")   # `<name>1：副標` ok
    one = [m for m in catalog if one_pat.match(m["canon"])]
    if one:
        return one
    matched = by_base.get(base_key, [])
    return matched if len(matched) == 1 else []   # >1 = ambiguous bare name


def load_catalog():
    """[{id,title,aliases,year,developer,simp,base,canon,canon_split}]"""
    rows = []
    for f in sorted(CONTENT.glob("cdg-*.md")):
        txt = f.read_text(encoding="utf-8")
        fm = txt.split("---", 2)[1] if txt.startswith("---") else txt
        def grab(key):
            m = re.search(rf"^{key}: (.+)$", fm, re.M)
            return m.group(1).strip() if m else None
        title = grab("title_zh")
        if not title:
            continue
        rows.append({"id": f.stem, "title": title,
                     "year": grab("year"), "developer": grab("developer")})
    simps = M.t2s([r["title"] for r in rows])
    for r, s in zip(rows, simps):
        r["simp"] = s
        r["base"] = M.base(s)
        r["canon"] = canon(s)
    return rows


def main():
    review = json.loads(REVIEW.read_text(encoding="utf-8"))
    items = [r for r in review if r["reason"].startswith("base-matches")]
    catalog = load_catalog()
    by_base = defaultdict(list)
    for r in catalog:
        by_base[r["base"]].append(r)

    # exact catalog strings (title + aliases) to tell merge (adds a name) from
    # reject (the candidate string is already recorded on the target).
    known = set()
    for f in sorted(CONTENT.glob("cdg-*.md")):
        txt = f.read_text(encoding="utf-8")
        for m in re.finditer(r"^title_zh: (.+)$", txt, re.M):
            known.add(m.group(1).strip())
        al = re.search(r"^title_aliases:\n((?:- .+\n)+)", txt, re.M)
        if al:
            known.update(x[2:].strip() for x in al.group(1).splitlines())

    cand_simps = M.t2s([it["name"] for it in items])
    rows = []
    counts = defaultdict(int)
    for it, simp in zip(items, cand_simps):
        stripped = M.strip_edition(simp)            # drop 光碟版/加強版/… first
        base_key = M.base(stripped)
        matched = by_base.get(base_key, [])
        cb, cnum = split_num(canon(stripped))
        dups = find_dups(cb, cnum, base_key, catalog, by_base)
        if dups:
            # duplicate of an existing game: merge (preserve candidate name as
            # alias) unless that exact string is already on the target.
            action = "reject" if it["name"] in known else "merge"
        elif matched:
            # base family exists but this exact game does not.
            action = "append" if cnum else "review"   # numberless+multi-family = ambiguous
        else:
            action = "append"          # no family at all -> genuinely new
        counts[action] += 1
        rows.append({
            "name": it["name"], "simp": simp, "src": it.get("src") or ",".join(it.get("srcs", [])),
            "reason": it["reason"], "num": cnum or "—", "action": action,
            "target": dups[0] if dups else None, "exact": dups, "matched": matched,
        })

    # ---- worklist markdown ----
    L = ["# Phase 3 — base-matches triage\n",
         f"共 {len(items)} 筆。建議：merge(變體名併入既有) {counts['merge']} / "
         f"reject(完全重複) {counts['reject']} / append(真缺號新款) {counts['append']} / "
         f"review(無號且對多代，需人判) {counts['review']}。",
         "判定：候選對應的遊戲是否已在 catalog（全形／羅馬數字正規化；無號款比對 <名>1 慣例）。",
         "dup→候選名已記在 target=reject，否則 merge(把候選名併為 alias)；無對應→append；無號撞多代→review。\n",
         "| 候選 | 源 | 號 | 建議 | 對應既有款(dup target) | base 家族 |",
         "|---|---|---|---|---|---|"]
    order = {"merge": 0, "reject": 1, "review": 2, "append": 3}
    for r in sorted(rows, key=lambda x: (order[x["action"]], -len(x["matched"]), x["name"])):
        tgt = "；".join(f"{m['id']} {m['title']}" for m in r["exact"]) or "—"
        mm = "；".join(f"{m['id']} {m['title']}({m['year']})" for m in r["matched"][:6])
        if len(r["matched"]) > 6:
            mm += f" …+{len(r['matched'])-6}"
        L.append(f"| {r['name']} | {r['src']} | {r['num']} | **{r['action']}** | {tgt} | {mm or '（無）'} |")
    OUT.write_text("\n".join(L) + "\n", encoding="utf-8")

    # ---- draft decisions for the merge bucket (policy: simplified-source ->
    # merge as alias; Traditional-script variant -> reject as redundant).
    # Deduped by candidate name; if any source is rwv/fandom, prefer merge. ----
    MERGE_SRC = {"rwv", "fandom"}
    draft = {}
    for r in rows:
        if r["action"] != "merge":
            continue
        name, src = r["name"], r["src"]
        if src in MERGE_SRC:
            draft[name] = {"action": "merge", "target": r["target"]["id"],
                           "prov": f"{src}@merge",
                           "note": f"base-match dup of {r['target']['title']}; keep simplified name as alias"}
        elif name not in draft:        # don't downgrade an existing merge to reject
            draft[name] = {"action": "reject",
                           "note": f"redundant variant of {r['target']['title']} ({r['target']['id']})"}
    Path("derived/basematch-phase3-draft.json").write_text(
        json.dumps(draft, ensure_ascii=False, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    nmerge = sum(1 for v in draft.values() if v["action"] == "merge")
    nreject = sum(1 for v in draft.values() if v["action"] == "reject")

    print(f"items: {len(items)}")
    for k in ("merge", "reject", "append", "review"):
        print(f"  {k:7}: {counts[k]}")
    print(f"worklist -> {OUT}")
    print(f"draft decisions -> derived/basematch-phase3-draft.json "
          f"({len(draft)} unique: merge {nmerge}, reject {nreject})")


if __name__ == "__main__":
    main()
