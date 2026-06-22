"""One-off: migrate game references.cited from legacy {label:url} to keyed
{shortkey:{label,url}}, and rewrite prose citations from
<sup class="cite"><a href="#cite-N">[N]</a></sup> to <sup class="cite" data-ref="key"></sup>
for the wikipedia-style dynamic citation system (docs/refs-convention.md).

Run with --write to apply; default is dry-run.
"""
import glob
import re
import sys
from urllib.parse import urlparse

WRITE = "--write" in sys.argv


def short_key(url):
    h = (urlparse(url).hostname or "").replace("www.", "")
    if "wikipedia.org" in h:
        lang = h.split(".")[0]
        return "wikipedia" if lang == "zh" else "wikipedia_" + lang
    if "gamer.com.tw" in h:
        return "bahamut"
    if "fandom.com" in h:
        return "fandom"
    if h in ("bgm.tv", "bangumi.tv"):
        return "bangumi"
    if "udn.com" in h:
        return "udn"
    if "baidu.com" in h:
        return "baidu"
    return re.sub(r"[^a-z0-9_]", "", h.split(".")[0].lower()) or "src"


changed = 0
for f in sorted(glob.glob("content/games/*.md")):
    t = open(f, encoding="utf-8").read()
    m = re.search(r"(?m)^  cited:\n((?:    .+\n)+)", t)
    if not m:
        continue
    block = m.group(1)
    if re.search(r"^    \w+:\s*$", block, re.M):  # already keyed
        continue
    pairs = []
    for label, url in re.findall(r'^    "(.*?)":\s*(.+)$', block, re.M):
        pairs.append((label, url.strip().strip('"')))
    if not pairs:
        continue
    keys, seen = [], {}
    for label, url in pairs:
        k = short_key(url)
        if k in seen:
            seen[k] += 1
            k = f"{k}{seen[k]}"
        else:
            seen[k] = 1
        keys.append(k)
    new_block = "  cited:\n"
    for (label, url), k in zip(pairs, keys):
        new_block += f'    {k}:\n      label: "{label}"\n      url: "{url}"\n'
    nt = t[: m.start()] + new_block + t[m.end():]

    n_prose = [0]

    def repl(mm):
        n = int(mm.group(1))
        if n <= len(keys):
            n_prose[0] += 1
            return f'<sup class="cite" data-ref="{keys[n - 1]}"></sup>'
        return mm.group(0)

    nt = re.sub(r'<sup class="cite"><a href="#cite-(\d+)">\[\d+\]</a></sup>', repl, nt)
    name = f.split("/")[-1]
    print(f"{name}: keys={keys}  prose-cites={n_prose[0]}")
    if nt != t:
        changed += 1
        if WRITE:
            open(f, "w", encoding="utf-8").write(nt)

print(f"\n{'WROTE' if WRITE else 'DRY-RUN'} {changed} files")
