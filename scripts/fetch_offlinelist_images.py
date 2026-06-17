"""Download OfflineList (cndosgames) screenshots to raw/offlinelist/img/
(gitignored) and write a provenance manifest (committed). Idempotent.

The DAT's imgs/ holds `<imageNumber>a.png` / `<imageNumber>b.png` pairs under
range folders (1-500/, 501-1000/). Only ~100 of the 723 games have a screenshot.
File list comes from the archive.org metadata API so we fetch exactly what
exists. The manifest keys by imageNumber so build_master can join screenshots
onto the matched / merged catalog entries.

No explicit license on the source item (personal compilation) — host with care.
"""
import json
import re
import subprocess
import urllib.parse
from collections import defaultdict
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

IMG_DIR = Path("raw/offlinelist/img")
MANIFEST = IMG_DIR / "screenshots-manifest.jsonl"
META = "https://archive.org/metadata/cndosgames/files"
DL = "https://archive.org/download/cndosgames/"


def list_image_files():
    r = subprocess.run(["curl", "-sL", "--max-time", "60", META],
                       capture_output=True, text=True)
    files = json.loads(r.stdout)["result"]
    return [f["name"] for f in files
            if "/imgs/" in f["name"] and f["name"].lower().endswith(".png")]


def download(name):
    base = name.rsplit("/", 1)[-1]                       # e.g. 102a.png
    m = re.match(r"(\d+)([a-z])\.png$", base)
    image_number = int(m.group(1)) if m else None
    dest = IMG_DIR / base
    url = DL + urllib.parse.quote(name)
    rec = {
        "local_path": str(dest),
        "image_number": image_number,
        "source_image_url": url,
        "source": "offlinelist/cndosgames",
        "license": "unknown (personal compilation)",
        "fetched": "2026-06-15",
    }
    if dest.exists() and dest.stat().st_size > 0:
        rec["status"] = "cached"
        return rec
    r = subprocess.run(["curl", "-sL", "--max-time", "60", "-o", str(dest),
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
    IMG_DIR.mkdir(parents=True, exist_ok=True)
    names = list_image_files()
    print(f"image files in item: {len(names)}")
    with ThreadPoolExecutor(max_workers=12) as pool:
        recs = list(pool.map(download, names))
    recs.sort(key=lambda r: (r["image_number"] or 0, r["local_path"]))
    with MANIFEST.open("w", encoding="utf-8") as f:
        for r in recs:
            f.write(json.dumps(r, ensure_ascii=False) + "\n")
    from collections import Counter
    by = Counter(r["status"].split(":")[0] for r in recs)
    games = defaultdict(list)
    for r in recs:
        if r["status"] in ("ok", "cached"):
            games[r["image_number"]].append(r["local_path"])
    print(f"images: {len(recs)}  status: {dict(by)}  games-with-img: {len(games)}")
    print(f"manifest: {MANIFEST}")


if __name__ == "__main__":
    main()
