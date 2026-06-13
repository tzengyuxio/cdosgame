"""Build derived/master-list.json by joining the chiuinan backbone (繁中,
structured) with rwv games.json (簡中 + covers/links).

Match strategy: convert chiuinan 繁中 titles to 簡中 via opencc (t2s), then
match against rwv identifiers (簡中). Matching key is normalized (whitespace
and punctuation stripped).
"""
import json
import re
import subprocess
from pathlib import Path

CHIUINAN = Path("derived/chiuinan-games.json")
RWV = Path("derived/rwv-games.json")
OUT = Path("derived/master-list.json")

PUNCT = re.compile(r"[\s：:・·／/、，,．.\-—–_!！?？’'\"“”()（）\[\]【】]+")
CJK = re.compile(r"[一-鿿㐀-䶿]")


def norm(s: str) -> str:
    return PUNCT.sub("", s or "").lower()


def has_cjk(s) -> bool:
    return bool(s and CJK.search(s))


def classify_localization(content_language, developer, publisher_tw):
    """Derive a localization level from chiuinan signals. Low-confidence heuristic.

    A  原生中文開發  : 中文遊戲 + 中文開發商
    B  中文化遊戲    : 中文遊戲 + 外國開發商（官方中文版）
    D  中文包裝代理  : 英文遊戲 + 有台灣發行/代理商
    foreign 純外國   : 英文遊戲 + 無台灣發行商（收集邊界外候選）
    null            : content_language 未知，無法判定

    C（民間漢化）無法從此來源 derive。返回 (level, basis)。
    """
    if content_language == "zh":
        if has_cjk(developer):
            return "A", "zh-content + cjk-developer"
        return "B", "zh-content + foreign-developer"
    if content_language == "en":
        if publisher_tw:
            return "D", "en-content + tw-publisher"
        return "foreign", "en-content + no-tw-publisher"
    return None, "unknown content_language"


def to_simplified(titles):
    """Batch-convert a list of 繁中 strings to 簡中 via opencc t2s."""
    payload = "\n".join(titles)
    out = subprocess.run(
        ["opencc", "-c", "t2s.json"],
        input=payload, capture_output=True, text=True, check=True,
    ).stdout
    return out.split("\n")[: len(titles)]


def main():
    chiuinan = json.loads(CHIUINAN.read_text(encoding="utf-8"))
    rwv = json.loads(RWV.read_text(encoding="utf-8"))

    # index rwv by normalized 簡中 identifier
    rwv_idx = {}
    for g in rwv:
        rwv_idx.setdefault(norm(g["identifier"]), g)

    simplified = to_simplified([g["title_zh"] for g in chiuinan])

    master, matched = [], 0
    for g, simp in zip(chiuinan, simplified):
        r = rwv_idx.get(norm(simp)) or rwv_idx.get(norm(g["title_zh"]))
        level, basis = classify_localization(
            g.get("content_language"), g.get("developer"), g.get("publisher_tw"))
        # Catalog entry: Taiwan-product focus. Drops rating + publisher_original
        # (those stay in the per-source derived/chiuinan-games.json record).
        entry = {
            "title_zh": g["title_zh"],
            "title_aliases": g["title_aliases"],
            "year": g["year"],
            "developer": g["developer"],
            "publisher_tw": g["publisher_tw"],
            "content_language": g.get("content_language"),
            "genre": g.get("genre"),
            "localization_level": level,
            "localization_basis": basis,
            "size": g["size"],
            "platform_note": g["platform_note"],
            "catalog_id": g["catalog_id"],
            "intro_todo": g["intro_todo"],
            "cover": None,
            "external_links": {},
            "provenance": list(g["provenance"]),
        }
        if r:
            matched += 1
            entry["cover"] = r["cover"]
            entry["external_links"] = r["external_links"]
            entry["rwv_source_id"] = r["source_id"]
            entry["provenance"] += r["provenance"]
        master.append(entry)

    OUT.write_text(json.dumps(master, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"chiuinan: {len(chiuinan)}  rwv: {len(rwv)}  matched: {matched}")
    print(f"matched with cover: {sum(1 for e in master if e.get('cover'))}")
    from collections import Counter
    dist = Counter(e["localization_level"] for e in master)
    print("localization_level:", dict(dist))


if __name__ == "__main__":
    main()
