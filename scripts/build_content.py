"""Generate one Markdown file per game (Astro Content Collections layout) from
derived/master-list.json, with YAML frontmatter matching schema/game.schema.mjs.

Stable ids: data/id-registry.json maps a stable key -> cdg-NNNN and is append-only,
so ids never shift across rebuilds. Body is left empty for summary/review prose.
"""
import json
import re
from pathlib import Path

import yaml

MASTER_MERGED = Path("derived/master-list.merged.json")  # merge_sources --write output
MASTER = Path("derived/master-list.json")                # build_master output (chiuinan)
REGISTRY = Path("data/id-registry.json")
PUBLISH_STATE = Path("data/publish-state.json")          # {id: true} editorial gate
OUT_DIR = Path("content/games")
CHIUINAN = Path("derived/chiuinan-screenshots.json")
SERIES_DECISIONS = Path("data/series-decisions.json")


def slugify(aliases):
    """ASCII slug from the first Latin alias, else None."""
    for a in aliases:
        if re.search(r"[A-Za-z]", a) and not re.search(r"[一-鿿]", a):
            s = re.sub(r"[^a-z0-9]+", "-", a.lower()).strip("-")
            if s:
                return s
    return None


REG_META = {
    "description": "Game id registry — source of truth. append-only; ids never reassigned.",
    "id_scheme": "cd<type>-NNNN (cdg game / cdc company / cds series / cdp person)",
    "policy": "docs/id-policy.md",
    "structure": "ids[<id>] = {title_zh, developer, catalog_id, keys[], status, merged_into?}",
}


def stable_key(g):
    # Avoid volatile fields (e.g. year) so ids stay stable across re-derivation.
    if g.get("catalog_id"):
        return f"cat:{g['catalog_id']}"
    return f"t:{g['title_zh']}|{g.get('developer')}"


def load_registry():
    """Return the id-centric registry, migrating the old flat {key: id} form."""
    if not REGISTRY.exists():
        return {"_meta": REG_META, "ids": {}}
    data = json.loads(REGISTRY.read_text(encoding="utf-8"))
    if "ids" in data:
        return data
    ids = {}
    for key, gid in data.items():
        ids.setdefault(gid, {"keys": [], "status": "active"})["keys"].append(key)
    return {"_meta": REG_META, "ids": ids}


def frontmatter(g, gid, published):
    """Build an ordered frontmatter dict; omit empty optional collections."""
    fm = {
        "id": gid,
        "published": published,
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
        "series": g.get("series"),
        "size": g.get("size"),
        "platform_note": g.get("platform_note"),
        "catalog_id": g.get("catalog_id"),
        "license_status": g.get("license_status"),
        "cover": g.get("cover"),
        "provenance": g.get("provenance", []),
    }
    if g.get("release_codes"):
        fm["release_codes"] = g["release_codes"]
    if g.get("editions"):
        fm["editions"] = g["editions"]
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


def series_pairs():
    """(prefix, series_name) sorted longest-prefix-first."""
    if not SERIES_DECISIONS.exists():
        return []
    dec = json.loads(SERIES_DECISIONS.read_text(encoding="utf-8"))
    pairs = [(pre, name) for name, prefixes in dec.items() for pre in prefixes]
    return sorted(pairs, key=lambda x: -len(x[0]))


def assign_series(title, pairs):
    for pre, name in pairs:
        if title.startswith(pre):
            return name
    return None


def existing_body(path):
    """Markdown body after the frontmatter block; '\n' for new/absent files."""
    if not path.exists():
        return "\n"
    text = path.read_text(encoding="utf-8")
    m = re.match(r"^---\n.*?\n---\n", text, re.S)
    return text[m.end():] if m else "\n"


def main():
    src = MASTER_MERGED if MASTER_MERGED.exists() else MASTER
    games = json.loads(src.read_text(encoding="utf-8"))
    print(f"source: {src}")
    publish_state = json.loads(PUBLISH_STATE.read_text(encoding="utf-8")) \
        if PUBLISH_STATE.exists() else {}
    intro_idx = {r["title_zh"]: r["intro_url"]
                 for r in json.loads(CHIUINAN.read_text(encoding="utf-8"))
                 if r.get("intro_url")} if CHIUINAN.exists() else {}
    spairs = series_pairs()
    registry = load_registry()
    ids = registry["ids"]

    # reverse map: every key (incl. aliases) -> id, redirecting merged ids
    key2id = {}
    for gid, e in ids.items():
        target = e.get("merged_into", gid)
        for k in e.get("keys", []):
            key2id[k] = target
    next_id = max([int(g.split("-")[1]) for g in ids] + [0]) + 1

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    used_keys, seen_files, new_ids = {}, set(), 0
    for g in games:
        key = stable_key(g)
        # disambiguate exact-duplicate keys within this run
        used_keys[key] = used_keys.get(key, 0) + 1
        if used_keys[key] > 1:
            key = f"{key}#{used_keys[key]}"
        gid = key2id.get(key)
        if not gid:
            gid = f"cdg-{next_id:04d}"
            next_id += 1
            new_ids += 1
            ids[gid] = {"keys": [key], "status": "active"}
            key2id[key] = gid
        # refresh human-auditable display fields on the registry entry
        e = ids[gid]
        e["title_zh"] = g["title_zh"]
        e["developer"] = g.get("developer")
        e["catalog_id"] = g.get("catalog_id")
        e.setdefault("status", "active")
        if key not in e["keys"]:
            e["keys"].append(key)

        g["series"] = assign_series(g["title_zh"], spairs)
        iu = intro_idx.get(g["title_zh"])
        if iu:
            refs = g.get("references")
            if not isinstance(refs, dict):
                refs = {}
            refs["chiuinan"] = iu
            g["references"] = refs
        fm = frontmatter(g, gid, bool(publish_state.get(gid)))
        body = yaml.safe_dump(fm, allow_unicode=True, sort_keys=False, width=1000)
        path = OUT_DIR / f"{gid}.md"
        prose = existing_body(path)
        path.write_text(f"---\n{body}---\n{prose}", encoding="utf-8")
        seen_files.add(f"{gid}.md")

    # remove orphaned files whose game no longer exists (skip merged tombstones)
    orphans = [p for p in OUT_DIR.glob("*.md") if p.name not in seen_files]
    for p in orphans:
        p.unlink()

    registry["_meta"] = REG_META
    REGISTRY.write_text(json.dumps(registry, ensure_ascii=False, indent=2,
                                   sort_keys=True), encoding="utf-8")
    print(f"games: {len(games)}  files: {len(seen_files)}  new ids: {new_ids}  "
          f"orphans removed: {len(orphans)}  registry size: {len(ids)}")


if __name__ == "__main__":
    main()
