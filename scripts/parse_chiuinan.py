"""Parse chiuinan list-1.htm (遊戲總表) into structured JSON.

Columns: 遊戲名稱 / 評價 / 年代 / 公司 / 大小 / 限制 / 編號
Title cell may carry an English alias and a "[待補]" marker, e.g.
"007詹姆士龐德：夜之火 [待補]James Bond 007: Nightfire".
"""
import json
import re
from html.parser import HTMLParser
from pathlib import Path

SRC = Path("raw/chiuinan/list-1.htm")
OUT = Path("derived/chiuinan-games.json")
HEADER = {"遊戲名稱", "評價", "年代", "公司", "大小", "限制", "編號"}


class TableParser(HTMLParser):
    """Tolerant of the old HTML's missing </td>/</tr> close tags:
    a new <tr>/<td> implicitly closes the previous cell/row."""

    def __init__(self):
        super().__init__()
        self.rows = []
        self.cur_row = None
        self.cur_cell = None

    def _flush_cell(self):
        if self.cur_cell is not None and self.cur_row is not None:
            self.cur_row.append("".join(self.cur_cell).strip())
        self.cur_cell = None

    def _flush_row(self):
        self._flush_cell()
        if self.cur_row:
            self.rows.append(self.cur_row)
        self.cur_row = None

    def handle_starttag(self, tag, attrs):
        if tag == "tr":
            self._flush_row()
            self.cur_row = []
        elif tag == "td":
            self._flush_cell()
            if self.cur_row is None:
                self.cur_row = []
            self.cur_cell = []
        elif tag == "br" and self.cur_cell is not None:
            self.cur_cell.append("\n")

    def handle_endtag(self, tag):
        if tag == "td":
            self._flush_cell()
        elif tag == "tr":
            self._flush_row()

    def close(self):
        super().close()
        self._flush_row()

    def handle_data(self, data):
        if self.cur_cell is not None:
            self.cur_cell.append(data)


CJK = r"一-鿿㐀-䶿"


def split_title(raw: str):
    """Return (title_full, title_zh, title_aliases[], todo_flag).

    Heuristic: an English alias is a trailing Latin run that begins only
    *after* at least one CJK character (so leading digits/latin that are
    part of the zh title, e.g. "007詹姆士龐德" or "MISS阿性", stay put).
    """
    todo = "待補" in raw or "待重整" in raw
    text = re.sub(r"\s+", " ", re.sub(r"\[[^\]]*\]", " ", raw)).strip()
    full = text
    # find first ASCII letter that has a CJK char somewhere before it
    boundary = None
    for m in re.finditer(r"[A-Za-z]", text):
        if re.search(f"[{CJK}]", text[: m.start()]):
            boundary = m.start()
            break
    zh, alias_blob = (text[:boundary], text[boundary:]) if boundary else (text, "")
    zh = zh.strip(" :")
    aliases = [a.strip() for a in re.split(r"[／/]", alias_blob) if a.strip()]
    # zh side may carry slash-separated zh aliases
    zh_parts = [p.strip() for p in re.split(r"[／/]", zh) if p.strip()]
    if len(zh_parts) > 1:
        zh = zh_parts[0]
        aliases = zh_parts[1:] + aliases
    return full, zh, aliases, todo


def split_vendor(raw: str):
    """Split the 公司 cell into developer + Taiwan publisher + original publisher.

    Pattern observed in the data: "開發商 (原廠發行商[, 台灣代理...])". Text before
    the first paren is the developer; comma/、-separated entries inside the parens
    are publishers. CJK entries are treated as the Taiwan publisher/distributor
    (catalog-relevant), Latin entries as the foreign original publisher (raw only).
    A bare value (no parens) is treated as the developer.

    Returns (developer, publisher_tw[], publisher_original[]).
    """
    if not raw:
        return None, [], []
    text = re.sub(r"\s+", " ", raw).strip()
    m = re.match(r"^(?P<dev>[^(（]*)[(（](?P<pub>[^)）]*)[)）]?", text)
    if not m:
        return (text or None), [], []
    dev = m.group("dev").strip() or None
    entries = [p.strip() for p in re.split(r"[,，、/／]", m.group("pub")) if p.strip()]
    tw = [p for p in entries if re.search(f"[{CJK}]", p)]
    original = [p for p in entries if not re.search(f"[{CJK}]", p)]
    return dev, tw, original


def main():
    html = SRC.read_text(encoding="utf-8-sig")
    p = TableParser()
    p.feed(html)
    p.close()
    games = []
    for row in p.rows:
        if len(row) != 7:
            continue
        if row[0] in HEADER or set(row) & HEADER:
            continue
        full, zh, aliases, todo = split_title(row[0])
        year = row[2].strip()
        vendor_raw = row[3].strip() or None
        developer, publisher_tw, publisher_original = split_vendor(vendor_raw)
        games.append({
            "title_full": full,
            "title_zh": zh,
            "title_aliases": aliases,
            "rating": row[1].strip() or None,
            "year": int(year) if year.isdigit() else None,
            "developer": developer,
            "publisher_tw": publisher_tw,
            "publisher_original": publisher_original,
            "vendor_raw": vendor_raw,
            "size": row[4].strip() or None,
            "platform_note": row[5].strip() or None,
            "catalog_id": row[6].strip() or None,
            "intro_todo": todo,
            "provenance": ["chiuinan@list-1.htm"],
        })
    OUT.write_text(json.dumps(games, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"parsed rows: {len(p.rows)}  games: {len(games)}")


if __name__ == "__main__":
    main()
