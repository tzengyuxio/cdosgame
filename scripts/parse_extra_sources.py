"""Parse the secondary sources (omega forum, Fandom) into derived lists.

- omega: each thread title is "【類別】遊戲名.別名.開發商.代理商.版本", with a
  threadid that links back as a reference URL. We keep the raw title (rich but
  messy) plus a best-effort game name (first dot/slash segment).
- Fandom: page titles look like "游戏名 (YYYY)"; split into name + year.
"""
import glob
import html
import json
import re
from pathlib import Path

from parse_chiuinan import TableParser

OMEGA_OUT = Path("derived/omega-threads.json")
FANDOM_OUT = Path("derived/fandom-games.json")
BONEASH_OUT = Path("derived/boneash-games.json")
OMEGA_READ = "https://omega.idv.tw/kdb120/viewthread.php?threadid="

THREAD_RE = re.compile(r'read\.php\?threadid=(\d+)[^"]*"[^>]*>([^<]+)')
BRACKET_RE = re.compile(r"^【[^】]*】")


def parse_omega():
    seen, rows = set(), []
    for path in sorted(glob.glob("raw/omega/page-*.html")):
        text = Path(path).read_text(encoding="utf-8", errors="replace")
        for tid, title in THREAD_RE.findall(text):
            if tid in seen:
                continue
            seen.add(tid)
            raw = html.unescape(title).strip()
            body = BRACKET_RE.sub("", raw).strip()
            # game name = first segment before "." or " / "
            name = re.split(r"[./]| / ", body)[0].strip()
            if not name:  # announcements / image-only links
                continue
            rows.append({
                "threadid": tid,
                "title_raw": raw,
                "name": name,
                "link": OMEGA_READ + tid,
                "provenance": ["omega@forumid=68"],
            })
    OMEGA_OUT.write_text(json.dumps(rows, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"omega threads: {len(rows)}")


def parse_fandom():
    SKIP = {"CN DOS Games Wiki"}
    rows = []
    for path in sorted(glob.glob("raw/fandom/allpages-*.json")):
        data = json.loads(Path(path).read_text(encoding="utf-8"))
        for p in data["query"]["allpages"]:
            t = p["title"]
            if t in SKIP or ":" in t:
                continue
            m = re.search(r"\s*\((\d{4})\)\s*$", t)
            year = int(m.group(1)) if m else None
            name = re.sub(r"\s*\(\d{4}\)\s*$", "", t).strip()
            rows.append({
                "name": name,
                "year": year,
                "fandom_title": t,
                "provenance": ["fandom@cn-dos-games"],
            })
    FANDOM_OUT.write_text(json.dumps(rows, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"fandom games: {len(rows)}  with year: {sum(1 for r in rows if r['year'])}")


def parse_boneash():
    """Each genre subpage is a 4-col table: 英文名稱 / 中文名稱 / 年代 / 圖片簡介.
    Files are Big5-encoded; genre comes from the page heading "PC XT/AT - <genre>".
    """
    HEADER = {"英文名稱", "中文名稱", "年代", "遊戲圖片及簡介"}
    rows = []
    for path in sorted(glob.glob("raw/boneash/pcgame-*.html")):
        raw = Path(path).read_bytes().decode("big5", errors="replace")
        heading = ""
        m = re.search(r"PC XT/AT\s*[-–]\s*([^<\n]+)", raw)
        if m:
            heading = m.group(1).strip()
        p = TableParser()
        p.feed(re.sub(r"<img[^>]*>", "[IMG]", raw))
        p.close()
        for cells in p.rows:
            cells = [c.strip() for c in cells]
            if len(cells) < 3 or set(cells) & HEADER:
                continue
            en, zh, year = cells[0], cells[1], cells[2]
            if not re.fullmatch(r"\d{4}", year or ""):
                continue
            zh = re.sub(r"\s+", " ", zh).strip()
            en = re.sub(r"\s+", " ", en).strip()
            rows.append({
                "name": zh or None,
                "name_en": en or None,
                "year": int(year),
                "genre": heading or None,
                "provenance": ["boneash@oldgame.tw"],
            })
    BONEASH_OUT.write_text(json.dumps(rows, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"boneash games: {len(rows)}")


if __name__ == "__main__":
    parse_omega()
    parse_fandom()
    parse_boneash()
