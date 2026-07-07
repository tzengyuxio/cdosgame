"""Build a compact title -> intro-page lookup from chiuinan list-1.htm.

`chiuinan-games.json` carries `intro_todo` but NOT the intro-page href, so
until now writing an entry meant re-fetching/grepping the 693KB list-1.htm to
recover the `<a href="intro/...">` link. This pre-parses that once into a small
greppable TSV, so agents read the summary instead of ingesting the raw HTML.

Reuses parse_chiuinan's tolerant table parser (same rows -> same catalog_ids);
only adds capture of the first intro href per row (it lives in the title cell).

Run from repo root:  python scripts/build_chiuinan_intro_links.py
"""
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from parse_chiuinan import TableParser, split_title, HEADER, SRC  # noqa: E402

OUT = Path("derived/chiuinan-intro-links.tsv")
BASE = "https://chiuinan.github.io/game/game/"


class LinkTableParser(TableParser):
    """Same as TableParser, but also records the first `intro/...` href per row
    (kept index-aligned with self.rows)."""

    def __init__(self):
        super().__init__()
        self.row_links = []
        self._cur_link = None

    def _flush_row(self):
        # mirror parent: only records a link when a row is actually emitted
        self._flush_cell()
        if self.cur_row:
            self.rows.append(self.cur_row)
            self.row_links.append(self._cur_link)
        self.cur_row = None
        self._cur_link = None

    def handle_starttag(self, tag, attrs):
        super().handle_starttag(tag, attrs)
        if tag == "a":
            href = dict(attrs).get("href", "") or ""
            if "intro" in href and self._cur_link is None:
                self._cur_link = href


def main():
    html = SRC.read_text(encoding="utf-8-sig")
    p = LinkTableParser()
    p.feed(html)
    p.close()

    lines = ["catalog_id\ttitle_zh\tintro_url"]
    n = 0
    for row, link in zip(p.rows, p.row_links):
        if len(row) != 7 or row[0] in HEADER or set(row) & HEADER:
            continue
        if not link:
            continue  # game has no dedicated intro page
        _, title_zh, _, _ = split_title(row[0])
        # 編號 cell may stack multiple codes with <br> (embedded newline) —
        # collapse whitespace so each record stays on one TSV line.
        catalog_id = re.sub(r"\s+", " ", row[6]).strip()
        lines.append(f"{catalog_id}\t{title_zh}\t{BASE}{link}")
        n += 1

    OUT.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"rows: {len(p.rows)}  intro links: {n}  -> {OUT}")


if __name__ == "__main__":
    main()
