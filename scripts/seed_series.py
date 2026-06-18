"""Advisory: suggest candidate series by grouping master titles on a
digit/punctuation-stripped base. Prints groups with >=2 distinct games so a
human can extend data/series-decisions.json. Does NOT write decisions."""
import json
import re
from collections import defaultdict
from pathlib import Path

PUNCT = re.compile(r"[\s：:・·／/、，,．.\-—–_!！?？''\"""()（）\[\]【】~～]+")


def base(t):
    return re.sub(r"\d+", "", PUNCT.sub("", t or ""))


def main():
    src = Path("derived/master-list.merged.json")
    games = json.loads(src.read_text(encoding="utf-8"))
    groups = defaultdict(set)
    for g in games:
        groups[base(g["title_zh"])].add(g["title_zh"])
    big = {k: sorted(v) for k, v in groups.items() if len(v) >= 2 and len(k) >= 2}
    for k, v in sorted(big.items(), key=lambda x: -len(x[1]))[:60]:
        print(f"{len(v):3}  {k!r:20}  {v[:6]}")
    print(f"\n{len(big)} candidate base-groups with >=2 games")


if __name__ == "__main__":
    main()
