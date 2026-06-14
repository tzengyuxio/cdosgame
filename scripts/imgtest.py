"""Standalone terminal-image diagnostic. Run in your terminal:
    python3 scripts/imgtest.py [path-to-image]
Prints terminal detection, then draws one image with the Kitty graphics protocol.
If you see the image, your terminal supports it and review_merge will too.
"""
import base64
import os
import sys
from pathlib import Path

print("TERM            =", os.environ.get("TERM"))
print("TERM_PROGRAM    =", os.environ.get("TERM_PROGRAM"))
print("KITTY_WINDOW_ID =", os.environ.get("KITTY_WINDOW_ID"))
print("stdout.isatty   =", sys.stdout.isatty())

img = sys.argv[1] if len(sys.argv) > 1 else "raw/rwv/img/上古神兵/cover.png"
p = Path(img)
if not p.exists():
    print(f"\n!! image not found: {img}")
    sys.exit(1)
data = p.read_bytes()
print(f"image           = {img} ({len(data)} bytes)\n")

print(">>> Kitty graphics protocol (should show an image right below this line):")
b64 = base64.standard_b64encode(data)
chunks = [b64[i:i + 4096] for i in range(0, len(b64), 4096)]
for i, ch in enumerate(chunks):
    last = i == len(chunks) - 1
    ctrl = (f"a=T,f=100,c=30,r=15,m={0 if last else 1}" if i == 0
            else f"m={0 if last else 1}")
    sys.stdout.write("\033_G" + ctrl + ";" + ch.decode("ascii") + "\033\\")
sys.stdout.write("\n\n")
sys.stdout.flush()
print(">>> If you saw the cover above: protocol works. If not: tell me and we'll")
print("    try the iTerm2 protocol or sixel instead.")
