"""Enrich the chiuinan backbone with content_language + genre by parsing the
per-genre pages (cgame*/egame*), joining on catalog_id (編號).

- cgame* = 中文遊戲 (in-game language Chinese) -> content_language "zh"
- egame* = 英文遊戲 (in-game language English) -> content_language "en"
- genre comes from each page's heading, e.g. "中文回合角色扮演類" -> "回合角色扮演".

Join key: catalog_id (編號) is shared between list-1 and the genre pages.
Title is used as a fallback when catalog_id is missing.
"""
import glob
import json
import re
from pathlib import Path

from parse_chiuinan import TableParser, split_title, HEADER

GAMES = Path("derived/chiuinan-games.json")


def page_genre(html: str) -> str:
    text = re.sub(r"<[^>]*>", " ", html)
    for line in text.splitlines():
        line = line.strip().lstrip("﻿")
        if line:
            # "中文回合角色扮演類" / "英文回合角色扮演類" -> "回合角色扮演"
            return re.sub(r"^(中文|英文)", "", line).rstrip("類").strip()
    return None


def parse_page(path: str):
    html = Path(path).read_text(encoding="utf-8-sig")
    lang = "zh" if Path(path).name.startswith("cgame") else "en"
    genre = page_genre(html)
    p = TableParser()
    p.feed(html)
    p.close()
    out = []
    for row in p.rows:
        if len(row) != 7 or row[0] in HEADER or set(row) & HEADER:
            continue
        _, zh, _, _ = split_title(row[0])
        out.append({"catalog_id": row[6].strip() or None, "title_zh": zh,
                    "content_language": lang, "genre": genre})
    return out


def main():
    by_catalog, by_title = {}, {}
    for path in sorted(glob.glob("raw/chiuinan/[ce]game*.htm")):
        for rec in parse_page(path):
            if rec["catalog_id"]:
                by_catalog[rec["catalog_id"]] = rec
            by_title.setdefault(rec["title_zh"], rec)

    games = json.loads(GAMES.read_text(encoding="utf-8"))
    hit = 0
    for g in games:
        rec = by_catalog.get(g.get("catalog_id")) or by_title.get(g["title_zh"])
        if rec:
            hit += 1
            g["content_language"] = rec["content_language"]
            g["genre"] = rec["genre"]
        else:
            g.setdefault("content_language", None)
            g.setdefault("genre", None)
    GAMES.write_text(json.dumps(games, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"genre pages indexed: {len(by_catalog)} by catalog, {len(by_title)} by title")
    print(f"enriched: {hit}/{len(games)}")
    zh = sum(1 for g in games if g.get("content_language") == "zh")
    en = sum(1 for g in games if g.get("content_language") == "en")
    print(f"content_language: zh={zh} en={en} none={len(games)-zh-en}")


if __name__ == "__main__":
    main()
