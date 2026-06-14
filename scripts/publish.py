"""Flip the publish gate for games. Publish state lives in data/publish-state.json
(outside the generated content, so it survives build_content reruns).

  python3 scripts/publish.py cdg-0001 cdg-0042 ...   # mark published
  python3 scripts/publish.py --off cdg-0001          # unpublish
  python3 scripts/publish.py --list                  # show published ids + count

After flipping, run build_content.py to regenerate frontmatter.
"""
import json
import sys
from pathlib import Path

STATE = Path("data/publish-state.json")


def main():
    args = sys.argv[1:]
    state = json.loads(STATE.read_text(encoding="utf-8")) if STATE.exists() else {}
    if "--list" in args:
        pub = sorted(k for k, v in state.items() if v)
        print(f"published: {len(pub)}")
        for k in pub:
            print(" ", k)
        return
    off = "--off" in args
    ids = [a for a in args if a.startswith("cdg-")]
    if not ids:
        print("usage: publish.py [--off] cdg-NNNN ...   |   --list")
        return
    for i in ids:
        if off:
            state.pop(i, None)
        else:
            state[i] = True
    STATE.write_text(json.dumps(state, ensure_ascii=False, indent=2, sort_keys=True),
                     encoding="utf-8")
    print(f"{'unpublished' if off else 'published'} {len(ids)} ids. "
          f"total published: {sum(1 for v in state.values() if v)}")
    print("run: python3 scripts/build_content.py")


if __name__ == "__main__":
    main()
