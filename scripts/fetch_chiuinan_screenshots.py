"""Download up to N representative screenshots per game from chiuinan into
raw/chiuinan/img/ (gitignored), preserving the intro/<lang>/<cat>/<slug>/ layout,
and write a provenance manifest (committed).

N defaults to 3 (enough to identify a game). Natural sort so game1/2/3 win over
game10/game100. Idempotent; curl-based (sandbox blocks urllib).
"""
import json
import re
import subprocess
import sys
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

SRC = Path("derived/chiuinan-screenshots.json")
IMG_DIR = Path("raw/chiuinan/img")
MANIFEST = IMG_DIR / "screenshots-manifest.jsonl"
PREFIX = "https://raw.githubusercontent.com/chiuinan/chiuinan.github.io/master/game/game/"
N = int(sys.argv[1]) if len(sys.argv) > 1 else 3


def natkey(url):
    return [int(t) if t.isdigit() else t for t in re.split(r"(\d+)", url)]


def download(url, title, intro_path):
    rel = url[len(PREFIX):]  # intro/<lang>/<cat>/<slug>/<file>
    dest = IMG_DIR / rel
    rec = {
        "local_path": str(dest),
        "source_url": url,
        "title_zh": title,
        "intro_path": intro_path,
        "source": "chiuinan (青衫之友)",
        "license_note": "personal site, no explicit license — local ID use; confirm before redistribution",
        "fetched": "2026-06-14",
    }
    if dest.exists() and dest.stat().st_size > 0:
        rec["status"] = "cached"
        return rec
    dest.parent.mkdir(parents=True, exist_ok=True)
    r = subprocess.run(["curl", "-sL", "--max-time", "30", "-o", str(dest),
                        "-w", "%{http_code}", url], capture_output=True, text=True)
    if r.stdout.strip() == "200" and dest.exists() and dest.stat().st_size > 0:
        rec["status"] = "ok"
        rec["bytes"] = dest.stat().st_size
    else:
        rec["status"] = f"error: http {r.stdout.strip() or '?'}"
        if dest.exists():
            dest.unlink()
    return rec


def main():
    games = json.loads(SRC.read_text(encoding="utf-8"))
    jobs = []
    for g in games:
        for url in sorted(g["screenshots"], key=natkey)[:N]:
            jobs.append((url, g["title_zh"], g["intro_path"]))
    IMG_DIR.mkdir(parents=True, exist_ok=True)
    print(f"games: {len(games)}  download jobs (<= {N}/game): {len(jobs)}")
    with ThreadPoolExecutor(max_workers=12) as pool:
        recs = list(pool.map(lambda a: download(*a), jobs))
    with MANIFEST.open("w", encoding="utf-8") as f:
        for r in recs:
            f.write(json.dumps(r, ensure_ascii=False) + "\n")
    from collections import Counter
    by = Counter(r["status"].split(":")[0] for r in recs)
    print(f"images: {len(recs)}  status: {dict(by)}")
    print(f"manifest: {MANIFEST}")


if __name__ == "__main__":
    main()
