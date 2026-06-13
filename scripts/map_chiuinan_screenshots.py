"""Map chiuinan intro screenshots to games.

Each cgame*/egame* row links its title to an intro page (intro/<lang>/<cat>/<slug>.htm);
the matching folder intro/<lang>/<cat>/<slug>/ holds that game's screenshots. We pair
(title -> intro slug) from the genre pages, then gather screenshot paths from the repo
file tree, producing a download manifest + per-game coverage against the master list.
"""
import glob
import html
import json
import re
from pathlib import Path

from parse_chiuinan import split_title

TREE = Path("raw/chiuinan/repo-tree.txt")
OUT = Path("derived/chiuinan-screenshots.json")
RAW_BASE = "https://raw.githubusercontent.com/chiuinan/chiuinan.github.io/master/game/game/"
LINK_RE = re.compile(r'href="(intro/[a-z]+/c?[0-9]+/[A-Za-z0-9_]+)\.htm"[^>]*>([^<]+)')
IMG_RE = re.compile(r"\.(png|jpe?g|gif)$", re.I)


def main():
    tree = TREE.read_text(encoding="utf-8").splitlines()
    # index screenshots by their intro slug prefix: game/game/<intro_path>/...
    imgs_by_prefix = {}
    for p in tree:
        if p.startswith("game/game/intro/") and IMG_RE.search(p):
            rel = p[len("game/game/"):]
            slug = "/".join(rel.split("/")[:4])  # intro/<lang>/<cat>/<slug>
            imgs_by_prefix.setdefault(slug, []).append(rel)

    seen, games = set(), []
    for path in sorted(glob.glob("raw/chiuinan/[ce]game*.htm")):
        text = Path(path).read_text(encoding="utf-8-sig")
        for intro_path, raw_title in LINK_RE.findall(text):
            if intro_path in seen:
                continue
            seen.add(intro_path)
            _, zh, _, _ = split_title(html.unescape(raw_title))
            shots = sorted(imgs_by_prefix.get(intro_path, []))
            games.append({
                "title_zh": zh,
                "intro_url": f"https://chiuinan.github.io/game/game/{intro_path}.htm",
                "intro_path": intro_path,
                "screenshots": [RAW_BASE + s for s in shots],
                "n": len(shots),
            })

    OUT.write_text(json.dumps(games, ensure_ascii=False, indent=2), encoding="utf-8")
    total_shots = sum(g["n"] for g in games)
    with_shots = sum(1 for g in games if g["n"])
    print(f"intro games: {len(games)}  with screenshots: {with_shots}  total images: {total_shots}")

    # coverage vs master (exact title match)
    master = {m["title_zh"] for m in json.loads(Path("derived/master-list.json").read_text())}
    matched = sum(1 for g in games if g["title_zh"] in master)
    print(f"matched to master by title: {matched}/{len(master)}")


if __name__ == "__main__":
    main()
