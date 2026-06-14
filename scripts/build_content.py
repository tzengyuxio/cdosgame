"""Generate one Markdown file per game (Astro Content Collections layout) from
derived/master-list.json, with YAML frontmatter matching schema/game.schema.mjs.

Stable ids: data/id-registry.json maps a stable key -> cdg-NNNN and is append-only,
so ids never shift across rebuilds. Body is left empty for summary/review prose.
"""
import json
import re
from pathlib import Path

import yaml

MASTER = Path("derived/master-list.json")
REGISTRY = Path("data/id-registry.json")
OUT_DIR = Path("content/games")


def slugify(aliases):
    """ASCII slug from the first Latin alias, else None."""
    for a in aliases:
        if re.search(r"[A-Za-z]", a) and not re.search(r"[一-鿿]", a):
            s = re.sub(r"[^a-z0-9]+", "-", a.lower()).strip("-")
            if s:
                return s
    return None


def stable_key(g):
    # Avoid volatile fields (e.g. year) so ids stay stable across re-derivation.
    if g.get("catalog_id"):
        return f"cat:{g['catalog_id']}"
    return f"t:{g['title_zh']}|{g.get('developer')}"


def load_registry():
    if REGISTRY.exists():
        return json.loads(REGISTRY.read_text(encoding="utf-8"))
    return {}


def frontmatter(g, gid):
    """Build an ordered frontmatter dict; omit empty optional collections."""
    fm = {
        "id": gid,
        "title_zh": g["title_zh"],
        "title_aliases": g.get("title_aliases", []),
        "slug": slugify(g.get("title_aliases", [])),
        "year": g.get("year"),
        "developer": g.get("developer"),
        "developer_region": g.get("developer_region"),
        "publisher_tw": g.get("publisher_tw", []),
        "content_language": g.get("content_language"),
        "genre": g.get("genre"),
        "localization_level": g.get("localization_level"),
        "size": g.get("size"),
        "platform_note": g.get("platform_note"),
        "catalog_id": g.get("catalog_id"),
        "cover": g.get("cover"),
        "provenance": g.get("provenance", []),
    }
    if g.get("images"):
        fm["images"] = g["images"]
    if g.get("references"):
        fm["references"] = g["references"]
    if g.get("external_links"):
        fm["external_links"] = g["external_links"]
    if g.get("localization_basis"):
        fm["localization_basis"] = g["localization_basis"]
    if g.get("rwv_source_id"):
        fm["rwv_source_id"] = g["rwv_source_id"]
    if g.get("rwv_match"):
        fm["rwv_match"] = g["rwv_match"]
    return fm


def main():
    games = json.loads(MASTER.read_text(encoding="utf-8"))
    registry = load_registry()
    used_keys, next_id = {}, max(
        [int(v.split("-")[1]) for v in registry.values()] + [0]) + 1

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    seen_files, new_ids = set(), 0
    for g in games:
        key = stable_key(g)
        # disambiguate exact-duplicate keys within this run
        used_keys[key] = used_keys.get(key, 0) + 1
        if used_keys[key] > 1:
            key = f"{key}#{used_keys[key]}"
        if key not in registry:
            registry[key] = f"cdg-{next_id:04d}"
            next_id += 1
            new_ids += 1
        gid = registry[key]
        fm = frontmatter(g, gid)
        body = yaml.safe_dump(fm, allow_unicode=True, sort_keys=False, width=1000)
        (OUT_DIR / f"{gid}.md").write_text(f"---\n{body}---\n\n", encoding="utf-8")
        seen_files.add(f"{gid}.md")

    # remove orphaned files whose game no longer exists
    orphans = [p for p in OUT_DIR.glob("*.md") if p.name not in seen_files]
    for p in orphans:
        p.unlink()

    REGISTRY.write_text(json.dumps(registry, ensure_ascii=False, indent=2,
                                   sort_keys=True), encoding="utf-8")
    print(f"games: {len(games)}  files: {len(seen_files)}  new ids: {new_ids}  "
          f"orphans removed: {len(orphans)}  registry size: {len(registry)}")


if __name__ == "__main__":
    main()
