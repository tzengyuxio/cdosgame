"""One-off: migrate content genre values from the old Chinese-name taxonomy
(13 buckets) to the v2 key taxonomy (22 keys / 7 groups).

1:1 renames and the 模擬養成/教育養成 → LSG merge are exact. Five "split" buckets
(角色扮演/策略/冒險解謎/運動動作/射擊) cannot be split mechanically, so each is
mapped to its dominant sub-key as a PROVISIONAL value — a later pass re-judges
per entry to peel off ARPG / RTS+HSG / PZG / SPG+RCG+SIM / FPS (and CMS out of
LSG). null stays null. Idempotent: values already in key form are left alone.
"""
import glob
import pathlib
import re
import sys

# old Chinese name -> new key.  Provisional (needs later re-judge) flagged below.
MAP = {
    # 1:1 renames
    "戰略角色扮演": "SRPG",
    "故事劇情": "AVG",
    "桌遊棋牌": "TBG",
    "格鬥": "FTG",
    "歷史模擬": "HSG",
    "城市建造": "CBG",
    # merge
    "模擬養成": "LSG",   # provisional: peel off CMS
    "教育養成": "LSG",
    # provisional dominant-sub mappings (need later split)
    "角色扮演": "RPG",   # peel off ARPG
    "策略": "SLG",       # peel off RTS, HSG
    "冒險解謎": "ADV",   # peel off PZG
    "運動動作": "ACT",   # peel off SPG, RCG, SIM
    "射擊": "STG",       # peel off FPS
}
KEYS = set(MAP.values()) | {
    "ARPG", "RTS", "PZG", "SPG", "RCG", "SIM", "FPS", "AADV", "CMS", "ETC",
}

changed = 0
for f in glob.glob("content/games/*.md"):
    p = pathlib.Path(f)
    t = p.read_text(encoding="utf-8")

    def repl(m):
        v = m.group(1).strip()
        if v == "null" or v in KEYS:
            return m.group(0)
        if v in MAP:
            return f"genre: {MAP[v]}"
        sys.exit(f"unknown genre {v!r} in {f}")

    nt = re.sub(r"(?m)^genre:\s*(.+)$", repl, t)
    if nt != t:
        p.write_text(nt, encoding="utf-8")
        changed += 1

print(f"changed {changed} files")
