"""Interactive reviewer for merge auto-new candidates.

Run it in a terminal:  python3 scripts/review_merge.py
On image-capable terminals (Ghostty, Kitty) the cover is shown on the RIGHT half
while data + keys stay on the LEFT. iTerm2 shows inline; others print the path.

Decisions persist to data/merge-decisions.json and the tool is resumable. Filter
with --region CN|null|all and --min-sources N. Accepted items are later written
to the catalog by `merge_sources.py --write`.
"""
import argparse
import base64
import json
import os
import platform
import shutil
import subprocess
import sys
import unicodedata
from pathlib import Path

PREVIEW = Path("derived/merge-auto-preview.json")
DECISIONS = Path("data/merge-decisions.json")


def load_json(p, default):
    return json.loads(p.read_text(encoding="utf-8")) if p.exists() else default


def save(dec):
    DECISIONS.parent.mkdir(parents=True, exist_ok=True)
    DECISIONS.write_text(json.dumps(dec, ensure_ascii=False, indent=2, sort_keys=True),
                         encoding="utf-8")


# ---- terminal graphics ----
def graphics_kind():
    if not sys.stdout.isatty():
        return None
    env = os.environ
    term, prog = env.get("TERM", ""), env.get("TERM_PROGRAM", "")
    if "ghostty" in term or "ghostty" in prog.lower() or "kitty" in term or env.get("KITTY_WINDOW_ID"):
        return "kitty"
    if prog == "iTerm.app" or env.get("LC_TERMINAL") == "iTerm2":
        return "iterm"
    return None


def kitty_blob(data, cols, rows):
    """Kitty graphics protocol: place a PNG at the cursor, fit into cols x rows cells."""
    b64 = base64.standard_b64encode(data)
    chunks = [b64[i:i + 4096] for i in range(0, len(b64), 4096)]
    out = []
    for i, ch in enumerate(chunks):
        last = i == len(chunks) - 1
        ctrl = (f"a=T,f=100,c={cols},r={rows},m={0 if last else 1}" if i == 0
                else f"m={0 if last else 1}")
        out.append("\033_G" + ctrl + ";" + ch.decode("ascii") + "\033\\")
    return "".join(out)


def dwidth(s):
    return sum(2 if unicodedata.east_asian_width(c) in ("W", "F") else 1 for c in s)


def dtrunc(s, w):
    out, cur = "", 0
    for c in s:
        cw = 2 if unicodedata.east_asian_width(c) in ("W", "F") else 1
        if cur + cw > w:
            break
        out, cur = out + c, cur + cw
    return out


def render_split(lines, cover, gk):
    """Left = text lines, right = cover image (kitty). Returns True if image drawn."""
    cols, _ = shutil.get_terminal_size((100, 30))
    img_col = cols // 2 + 2
    left_w = img_col - 3
    for ln in lines:
        print(dtrunc(ln, left_w))
    if not (cover and Path(cover).exists() and gk):
        return False
    h = len(lines)
    data = Path(cover).read_bytes()
    if gk == "kitty":
        sys.stdout.write("\0337")                       # save cursor (below block)
        sys.stdout.write(f"\033[{h}A\033[{img_col}G")    # up to top, right column
        sys.stdout.write(kitty_blob(data, cols - img_col - 1, max(h - 1, 4)))
        sys.stdout.write("\0338")                        # restore
    else:  # iterm: inline below the text (no split)
        b64 = base64.b64encode(data).decode()
        sys.stdout.write(f"\033]1337;File=inline=1;width=24;preserveAspectRatio=1:{b64}\a\n")
    sys.stdout.flush()
    return True


def open_external(cover):
    if cover and Path(cover).exists() and platform.system() == "Darwin":
        subprocess.run(["open", cover])
    elif cover:
        print(f"  路徑: {cover}")


def card_lines(c, idx, total, dec):
    acc = sum(1 for v in dec.values() if v == "accept")
    rej = sum(1 for v in dec.values() if v == "reject")
    L = [f"[{idx}/{total}]  accepted:{acc}  rejected:{rej}", ""]
    L.append(f"{c['name']}   ({c.get('year') or '?'})")
    L.append(f"region: {c.get('region') or '—'}   conf: {c.get('confidence')}")
    if c.get("name_en"):
        L.append(f"英文名 : {c['name_en']}")
    L.append(f"來源   : {', '.join(c['srcs'])} ({len(c['srcs'])}源)")
    if c.get("editions"):
        L.append(f"版本   : {', '.join(c['editions'])}")
    if c.get("softworld"):
        sw = c["softworld"]
        ph = " (轉珍藏版)" if sw.get("placeholder") else ""
        L.append(f"軟體世界: {sw['series']}{sw['code']}{ph} → unofficial")
    if len(c.get("variants", [])) > 1:
        L.append(f"variants: {' | '.join(c['variants'])}")
    if c.get("ref_fandom"):
        L.append(f"fandom : {c['ref_fandom']}")
    if c.get("ref_omega"):
        L.append(f"omega  : {c['ref_omega']}")
    L += ["", "[a]接受 [r]拒絕 [s]略過 [o]外開圖 [b]上一筆 [q]存離"]
    return L


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--region", default="all", help="CN | null | all")
    ap.add_argument("--min-sources", type=int, default=1)
    ap.add_argument("--no-image", action="store_true")
    args = ap.parse_args()

    items = load_json(PREVIEW, [])
    dec = load_json(DECISIONS, {})
    gk = None if args.no_image else graphics_kind()

    def want(c):
        if args.region == "CN" and c.get("region") != "CN":
            return False
        if args.region == "null" and c.get("region") is not None:
            return False
        return len(c["srcs"]) >= args.min_sources

    queue = [c for c in items if want(c)]
    todo = [c for c in queue if c["name"] not in dec]
    print(f"preview:{len(items)} filtered:{len(queue)} done:{len(queue) - len(todo)} "
          f"to-review:{len(todo)}  graphics:{gk or 'none'}")

    history, i = [], 0
    while i < len(todo):
        c = todo[i]
        if sys.stdout.isatty():
            sys.stdout.write("\033[2J\033[H")        # clear screen
        render_split(card_lines(c, i + 1, len(todo), dec), c.get("cover_local"), gk)
        try:
            cmd = input("\n> ").strip().lower()
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
            open_external(c.get("cover_local"))
        elif cmd == "b" and history:
            i = history.pop()
            dec.pop(todo[i]["name"], None)
            save(dec)
        elif cmd == "q":
            break

    acc = sum(1 for v in dec.values() if v == "accept")
    rej = sum(1 for v in dec.values() if v == "reject")
    print(f"\nsaved -> {DECISIONS}   accepted:{acc} rejected:{rej} "
          f"undecided:{len(items) - acc - rej}")
    print("next: python3 scripts/merge_sources.py --write")


if __name__ == "__main__":
    main()
