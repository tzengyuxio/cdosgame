"""Interactive reviewer for merge auto-new candidates.

Run it yourself in a terminal:  python3 scripts/review_merge.py
Decisions persist to data/merge-decisions.json and the tool is resumable
(already-decided items are skipped). Filter with --region CN|null|all and
--min-sources N. Accepted items are later written to the catalog by
`merge_sources.py --write` (which reads these decisions).
"""
import argparse
import base64
import json
import os
import platform
import subprocess
import sys
from pathlib import Path

PREVIEW = Path("derived/merge-auto-preview.json")
DECISIONS = Path("data/merge-decisions.json")
DASH = "─" * 64


def load_json(p, default):
    return json.loads(p.read_text(encoding="utf-8")) if p.exists() else default


def save(dec):
    DECISIONS.parent.mkdir(parents=True, exist_ok=True)
    DECISIONS.write_text(json.dumps(dec, ensure_ascii=False, indent=2, sort_keys=True),
                         encoding="utf-8")


def show_inline(path, cells=22):
    """Render an image inline if the terminal supports it (iTerm2 / kitty).
    Returns True if shown, False otherwise."""
    p = Path(path)
    if not p.exists():
        return False
    env = os.environ
    if env.get("TERM_PROGRAM") == "iTerm.app" or env.get("LC_TERMINAL") == "iTerm2":
        data = base64.b64encode(p.read_bytes()).decode()
        sys.stdout.write(
            f"\033]1337;File=inline=1;width={cells};preserveAspectRatio=1:{data}\a\n")
        sys.stdout.flush()
        return True
    if "kitty" in env.get("TERM", "") or env.get("KITTY_WINDOW_ID"):
        subprocess.run(["kitty", "+kitten", "icat", "--align", "left",
                        "--use-window-size", f"{cells},20", str(p)])
        return True
    return False


def card(c, idx, total, dec, inline=True):
    acc = sum(1 for v in dec.values() if v == "accept")
    rej = sum(1 for v in dec.values() if v == "reject")
    print(f"\n{DASH}  [{idx}/{total}]  ✓{acc} ✗{rej}")
    region = c.get("region") or "—"
    print(f"  \033[1m{c['name']}\033[0m   ({c.get('year') or '?'})   "
          f"region: {region}   conf: {c.get('confidence')}")
    if c.get("name_en"):
        print(f"  英文名 : {c['name_en']}")
    print(f"  來源   : {', '.join(c['srcs'])}  ({len(c['srcs'])} 源)")
    if c.get("editions"):
        print(f"  版本   : {', '.join(c['editions'])}")
    if c.get("softworld"):
        sw = c["softworld"]
        ph = " (轉珍藏版/placeholder)" if sw.get("placeholder") else ""
        print(f"  軟體世界: {sw['series']} {sw['code']}{ph}  → license=unofficial")
    if len(c.get("variants", [])) > 1:
        print(f"  variants: {' | '.join(c['variants'])}")
    if c.get("cover_local"):
        shown = inline and show_inline(c["cover_local"])
        hint = "" if shown else "   [o 開啟]"
        print(f"  封面   : {c['cover_local']}{hint}")
    if c.get("ref_fandom"):
        print(f"  fandom : {c['ref_fandom']}")
    if c.get("ref_omega"):
        print(f"  omega  : {c['ref_omega']}")
    if c.get("title_raw"):
        print(f"  omega標題: {c['title_raw']}")
    print(DASH)


def open_cover(c):
    p = c.get("cover_local")
    if not p or not Path(p).exists():
        print("  (無本地封面)")
        return
    if platform.system() == "Darwin":
        subprocess.run(["open", p])
    else:
        print(f"  路徑: {p}")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--region", default="all", help="CN | null | all")
    ap.add_argument("--min-sources", type=int, default=1)
    ap.add_argument("--no-inline", action="store_true",
                    help="don't render cover images inline (iTerm2/kitty)")
    args = ap.parse_args()

    items = load_json(PREVIEW, [])
    dec = load_json(DECISIONS, {})

    def want(c):
        if args.region == "CN" and c.get("region") != "CN":
            return False
        if args.region == "null" and c.get("region") is not None:
            return False
        return len(c["srcs"]) >= args.min_sources

    queue = [c for c in items if want(c)]
    todo = [c for c in queue if c["name"] not in dec]
    print(f"preview: {len(items)}  filtered: {len(queue)}  already decided: "
          f"{len(queue) - len(todo)}  to review: {len(todo)}")
    print("keys: [a]ccept [r]eject [s]kip [o]pen cover [b]ack [q]uit&save")

    history = []
    i = 0
    while i < len(todo):
        c = todo[i]
        card(c, i + 1, len(todo), dec, inline=not args.no_inline)
        try:
            cmd = input("> ").strip().lower()
        except (EOFError, KeyboardInterrupt):
            cmd = "q"
        if cmd in ("a", "r"):
            dec[c["name"]] = "accept" if cmd == "a" else "reject"
            save(dec)
            history.append(i)
            i += 1
        elif cmd == "s":
            history.append(i)
            i += 1
        elif cmd == "o":
            open_cover(c)
        elif cmd == "b" and history:
            i = history.pop()
            dec.pop(todo[i]["name"], None)
            save(dec)
        elif cmd == "q":
            break
        else:
            print("  ? a/r/s/o/b/q")

    acc = sum(1 for v in dec.values() if v == "accept")
    rej = sum(1 for v in dec.values() if v == "reject")
    print(f"\nsaved -> {DECISIONS}   accepted:{acc}  rejected:{rej}  "
          f"undecided:{len(items) - acc - rej}")
    print("next: run `python3 scripts/merge_sources.py --write` to apply accepted.")


if __name__ == "__main__":
    main()
