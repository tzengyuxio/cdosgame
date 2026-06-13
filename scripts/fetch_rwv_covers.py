"""Download rwv cover images to raw/rwv/img/ (gitignored) and write a provenance
manifest (committed). Images live at img/<identifier>/<coverFilename> in the repo.

The image files themselves are excluded by .gitignore; covers-manifest.jsonl
records each image's source URL so provenance survives in version control.

Idempotent: skips files already present. Usage: python3 scripts/fetch_rwv_covers.py
"""
import json
import subprocess
import sys
import urllib.parse
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

GAMES = Path("raw/rwv/games.json")
IMG_DIR = Path("raw/rwv/img")
MANIFEST = IMG_DIR / "covers-manifest.jsonl"
BASE = "https://raw.githubusercontent.com/rwv/chinese-dos-games/master/img"


def task(key, g):
    cover = g.get("coverFilename")
    if not cover:
        return None
    url = f"{BASE}/{urllib.parse.quote(key)}/{urllib.parse.quote(cover)}"
    dest = IMG_DIR / key / cover
    rec = {
        "local_path": str(dest),
        "source_url": url,
        "identifier": key,
        "title_zh_hant": g.get("name", {}).get("zh-Hant"),
        "source": "rwv/chinese-dos-games",
        "license_note": "code GPL-3.0; asset redistribution disputed — see raw/rwv/PROVENANCE.md",
        "fetched": "2026-06-14",
    }
    if dest.exists() and dest.stat().st_size > 0:
        rec["status"] = "cached"
        return rec
    dest.parent.mkdir(parents=True, exist_ok=True)
    r = subprocess.run(
        ["curl", "-sL", "--max-time", "30", "-o", str(dest), "-w", "%{http_code}", url],
        capture_output=True, text=True,
    )
    if r.stdout.strip() == "200" and dest.exists() and dest.stat().st_size > 0:
        rec["status"] = "ok"
        rec["bytes"] = dest.stat().st_size
    else:
        rec["status"] = f"error: http {r.stdout.strip() or '?'}"
        if dest.exists():
            dest.unlink()
    return rec


def main():
    games = json.loads(GAMES.read_text(encoding="utf-8"))["games"]
    items = list(games.items())
    if len(sys.argv) > 1:  # optional limit for a smoke test
        items = items[: int(sys.argv[1])]
    IMG_DIR.mkdir(parents=True, exist_ok=True)
    with ThreadPoolExecutor(max_workers=12) as pool:
        recs = [r for r in pool.map(lambda kv: task(*kv), items) if r]
    with MANIFEST.open("w", encoding="utf-8") as f:
        for r in recs:
            f.write(json.dumps(r, ensure_ascii=False) + "\n")
    from collections import Counter
    by = Counter(r["status"].split(":")[0] for r in recs)
    print(f"covers: {len(recs)}  status: {dict(by)}")
    print(f"manifest: {MANIFEST}")


if __name__ == "__main__":
    main()
