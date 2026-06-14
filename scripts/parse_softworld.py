"""Parse the 軟體世界 scan-progress table (Excel-exported HTML, Big5) into
derived/softworld-games.json.

Rows look like: 編號 / 類別 / 中文名 / 英文名 / [scan markers]. Codes are
fullwidth (平／貴／珍 + ０-９) for the 平價版 / 貴族版 / 珍藏版 series. A few are
marked 轉珍藏版 (reserved as 貴族版 but actually shipped as 珍藏版 -> placeholder).
"""
import json
import re
from pathlib import Path

from parse_chiuinan import TableParser

SRC = Path("raw/boneash/softworld-scan.html")
OUT = Path("derived/softworld-games.json")
SERIES = {"平": "平價版", "貴": "貴族版", "珍": "珍藏版"}
CODE_RE = re.compile(r"^([平貴珍][０-９]{2,4})")
FW = {ord("０") + i: ord("0") + i for i in range(10)}


def main():
    html = SRC.read_bytes().decode("big5", errors="replace")
    p = TableParser()
    p.feed(html)
    p.close()

    rows = []
    for cells in p.rows:
        cells = [re.sub(r"\s+", " ", c).strip() for c in cells]
        if not cells:
            continue
        m = CODE_RE.match(cells[0])
        if not m:
            continue
        code = m.group(1).translate(FW)          # 貴０９０ -> 貴090
        # fixed columns: 編號 / 類別 / 中文名 / 英文名 / scan-markers...
        def col(i):
            v = cells[i].strip() if i < len(cells) else ""
            return v or None
        genre, zh, en = col(1), col(2), col(3)
        placeholder = any("轉珍藏" in c for c in cells)

        def clean(s):  # drop 《轉珍藏版》-style notes
            return (re.sub(r"《[^》]*》|[（(]?轉珍藏版?[）)]?", "", s).strip() or None) if s else None
        zh, en = clean(zh), clean(en)
        rows.append({
            "code": code,
            "series": SERIES[code[0]],
            "genre": genre,
            "name": zh,
            "name_en": en,
            "placeholder": placeholder,        # 轉珍藏版
            "provenance": ["softworld@boneash-scan"],
        })

    OUT.write_text(json.dumps(rows, ensure_ascii=False, indent=2), encoding="utf-8")
    by_series = {}
    for r in rows:
        by_series[r["series"]] = by_series.get(r["series"], 0) + 1
    print(f"softworld entries: {len(rows)}  by series: {by_series}  "
          f"轉珍藏版(placeholder): {sum(1 for r in rows if r['placeholder'])}")


if __name__ == "__main__":
    main()
