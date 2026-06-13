"""Download Fandom per-game lead images (pageimages 'original') to
raw/fandom/img/ (gitignored) and write a provenance manifest (committed).

Fandom content is CC-BY-SA — the manifest records the source image URL, source
wiki page, and license so attribution is preserved. Idempotent.
"""
import json
import subprocess
import urllib.parse
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

FANDOM = Path("derived/fandom-games.json")
IMG_DIR = Path("raw/fandom/img")
MANIFEST = IMG_DIR / "images-manifest.jsonl"
API = "https://cn-dos-games.fandom.com/zh/api.php"
PAGE = "https://cn-dos-games.fandom.com/zh/wiki/"


def curl_json(url):
    r = subprocess.run(["curl", "-sL", "--max-time", "30", url],
                       capture_output=True, text=True)
    return json.loads(r.stdout)


def fetch_image_urls(titles):
    """Batch query pageimages; return {title: original_url}."""
    out = {}
    for i in range(0, len(titles), 50):
        batch = titles[i:i + 50]
        q = urllib.parse.quote("|".join(batch))
        data = curl_json(f"{API}?action=query&prop=pageimages&piprop=original"
                         f"&titles={q}&format=json&formatversion=2")
        for p in data.get("query", {}).get("pages", []):
            src = p.get("original", {}).get("source")
            if src:
                out[p["title"]] = src
    return out


def download(title, url):
    ext = Path(urllib.parse.urlparse(url).path).suffix or ".png"
    safe = title.replace("/", "／")
    dest = IMG_DIR / f"{safe}{ext}"
    rec = {
        "local_path": str(dest),
        "source_image_url": url,
        "fandom_title": title,
        "source_page_url": PAGE + urllib.parse.quote(title.replace(" ", "_")),
        "source": "fandom/cn-dos-games",
        "license": "CC-BY-SA",
        "fetched": "2026-06-14",
    }
    if dest.exists() and dest.stat().st_size > 0:
        rec["status"] = "cached"
        return rec
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
    games = json.loads(FANDOM.read_text(encoding="utf-8"))
    titles = [g["fandom_title"] for g in games]
    IMG_DIR.mkdir(parents=True, exist_ok=True)
    urls = fetch_image_urls(titles)
    print(f"pages with image: {len(urls)}/{len(titles)}")
    with ThreadPoolExecutor(max_workers=12) as pool:
        recs = list(pool.map(lambda kv: download(*kv), urls.items()))
    with MANIFEST.open("w", encoding="utf-8") as f:
        for r in recs:
            f.write(json.dumps(r, ensure_ascii=False) + "\n")
    from collections import Counter
    by = Counter(r["status"].split(":")[0] for r in recs)
    print(f"images: {len(recs)}  status: {dict(by)}")
    print(f"manifest: {MANIFEST}")


if __name__ == "__main__":
    main()
