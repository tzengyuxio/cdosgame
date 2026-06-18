# cdosgame 網站 Phase 1.5（百科化）實作計畫

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 把 Phase 1 的查詢式資料庫升級成可互連、可 wander 的百科：實體連結、hub 頁（類型／年份／年代／廠商／系列）、相關區、分類頁尾、MobyGames 式外部連結，並補 `series` 與青衫介紹連結。

**Architecture:** 沿用 Phase 1（Astro 5 + Content Collections + 發布閘 + 純 CSS）。新增資料欄位 `series`、`references.chiuinan`；純邏輯（分組／相關／URL）放 `src/lib/`（node:test 覆蓋）；hub 頁與詳情頁於 build 時吃 gated collection 呼叫這些 helper。

**Tech Stack:** Astro 5、原生 zod、node:test、`/usr/bin/python3`+pyyaml（管線）。

---

## 檔案結構

```
schema/game.schema.mjs                     # 改：+series, +references.chiuinan
scripts/build_content.py                   # 改：寫 series + references.chiuinan
scripts/seed_series.py                     # 新：系列分組建議（advisory）
data/series-decisions.json                 # 新：策展系列（name → 前綴[]）
src/lib/gamesQuery.js                       # 改：+groupBy/relatedFor/distinctValues/seriesOf (+test)
src/lib/links.js                            # 新：URL builders
src/components/GameList.astro               # 新：共用遊戲清單
src/components/Infobox.astro                # 改：欄位連結化
src/components/ExternalLinks.astro          # 新：外部連結分區
src/components/RelatedGames.astro           # 新：相關區
src/components/CategoryFooter.astro         # 新：分類頁尾
src/pages/games/[id].astro                  # 改：wiki 雙欄 + 互連 + 相關 + 分類 + 外連
src/pages/genres/index.astro + [genre].astro
src/pages/years/[year].astro
src/pages/decades/[decade].astro
src/pages/companies/index.astro + [name].astro
src/pages/series/index.astro + [series].astro
src/layouts/Base.astro                      # 改：nav 加 hub 入口
src/styles/global.css                       # 改：+wiki/hub/link 樣式
```

---

## Task 1: schema — 加 `series` 與 `references.chiuinan`

**Files:** Modify `schema/game.schema.mjs`

- [ ] **Step 1: 加 `series`（在 classification 區，`localization_level` 之後）**

在 `localization_level: z.enum(["A", "B", "D", "foreign"]).nullable(),` 之後加一行：
```js
  series: z.string().nullable().default(null),
```

- [ ] **Step 2: 加 `references.chiuinan`**

把 references 物件：
```js
  references: z.object({
    omega: z.string().url().optional(),
    fandom: z.string().optional(),
  }).default({}),
```
改成：
```js
  references: z.object({
    omega: z.string().url().optional(),
    fandom: z.string().optional(),
    chiuinan: z.string().url().optional(),
  }).default({}),
```

- [ ] **Step 3: 驗證 schema 仍可驗證現有內容**

Run: `npm run validate`
Expected: `files: 4144  valid: 4144  errors: 0`（新欄位皆 optional/nullable，現有內容仍通過）。

- [ ] **Step 4: Commit**
```bash
git add schema/game.schema.mjs
git commit -m "feat(schema): add series field and references.chiuinan"
```

---

## Task 2: 資料補強 — series 指派 + 青衫介紹連結

**Files:** Modify `scripts/build_content.py`; Create `data/series-decisions.json`, `scripts/seed_series.py`

- [ ] **Step 1: 建立策展系列 `data/series-decisions.json`**

格式 `{ 系列名: [標題前綴, ...] }`。起始批（前綴比對 `title_zh.startswith`）：
```json
{
  "仙劍奇俠傳": ["仙劍奇俠傳", "新仙劍奇俠傳"],
  "軒轅劍": ["軒轅劍"],
  "三國志": ["三國志"],
  "三國群英傳": ["三國群英傳"],
  "大富翁": ["大富翁"],
  "金庸群俠傳": ["金庸群俠傳"],
  "炎龍騎士團": ["炎龍騎士團"],
  "太閣立志傳": ["太閣立志傳"],
  "大航海時代": ["大航海時代"],
  "信長之野望": ["信長之野望"],
  "楚漢之爭": ["楚漢之爭"],
  "春秋爭霸傳": ["春秋爭霸傳"],
  "凱蘭迪亞傳奇": ["凱蘭迪亞傳奇"],
  "銀河英雄傳說": ["銀河英雄傳說"],
  "吞食天地": ["吞食天地"],
  "大戰略": ["大戰略"]
}
```

- [ ] **Step 2: 建立 advisory 工具 `scripts/seed_series.py`**（幫日後擴充，不 gating）
```python
"""Advisory: suggest candidate series by grouping master titles on a
digit/punctuation-stripped base. Prints groups with >=2 distinct games so a
human can extend data/series-decisions.json. Does NOT write decisions."""
import json
import re
from collections import defaultdict
from pathlib import Path

PUNCT = re.compile(r"[\s：:・·／/、，,．.\-—–_!！?？’'\"“”()（）\[\]【】~～]+")


def base(t):
    return re.sub(r"\d+", "", PUNCT.sub("", t or ""))


def main():
    src = Path("derived/master-list.merged.json")
    games = json.loads(src.read_text(encoding="utf-8"))
    groups = defaultdict(set)
    for g in games:
        groups[base(g["title_zh"])].add(g["title_zh"])
    big = {k: sorted(v) for k, v in groups.items() if len(v) >= 2 and len(k) >= 2}
    for k, v in sorted(big.items(), key=lambda x: -len(x[1]))[:60]:
        print(f"{len(v):3}  {k!r:20}  {v[:6]}")
    print(f"\n{len(big)} candidate base-groups with >=2 games")


if __name__ == "__main__":
    main()
```

- [ ] **Step 3: 在 `build_content.py` 加系列與青衫的指派**

在 `build_content.py` 頂部 imports 後，加常數路徑（與既有 `MASTER` 等並列）：
```python
CHIUINAN = Path("derived/chiuinan-screenshots.json")
SERIES_DECISIONS = Path("data/series-decisions.json")
```

在 `frontmatter()` 之前加兩個 helper：
```python
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
```

在 `frontmatter()` 的 fm dict 裡，於 `"localization_level": ...,` 之後加：
```python
        "series": g.get("series"),
```

在 `main()` 載入 `games` 之後（`publish_state = ...` 附近）加：
```python
    intro_idx = {r["title_zh"]: r["intro_url"]
                 for r in json.loads(CHIUINAN.read_text(encoding="utf-8"))
                 if r.get("intro_url")} if CHIUINAN.exists() else {}
    spairs = series_pairs()
```

在 `main()` 的 for 迴圈內、`fm = frontmatter(...)` 之前加：
```python
        g["series"] = assign_series(g["title_zh"], spairs)
        iu = intro_idx.get(g["title_zh"])
        if iu:
            refs = g.get("references")
            if not isinstance(refs, dict):
                refs = {}
            refs["chiuinan"] = iu
            g["references"] = refs
```

- [ ] **Step 4: 重建內容並驗證**
```bash
/usr/bin/python3 scripts/build_content.py
npm run validate
echo "series assigned:"; grep -l '^series: ..' content/games/*.md | wc -l
echo "chiuinan intro links:"; grep -l 'chiuinan: http' content/games/*.md | wc -l
echo "spot check 仙劍:"; grep -h '^series:' content/games/cdg-1564.md
```
Expected: validate `4144 valid, 0 errors`; series assigned 數百筆（含仙劍/三國志/軒轅劍…）；chiuinan intro links ≈ 2000+；cdg-1564 顯示 `series: 仙劍奇俠傳`。

- [ ] **Step 5: Commit**
```bash
git add scripts/build_content.py scripts/seed_series.py data/series-decisions.json content/games data/id-registry.json
git commit -m "feat(data): assign series (curated prefixes) + chiuinan intro links into content"
```
（注意：`build_content` 重跑會更新 content frontmatter；id-registry 可能因 series 無關不變，但一併 add 以防顯示欄位更新。確認 `git status` 僅 content/ + 上述檔變動。）

---

## Task 3: gamesQuery helper + links.js（TDD）

**Files:** Modify `src/lib/gamesQuery.js`, `src/lib/gamesQuery.test.js`; Create `src/lib/links.js`

- [ ] **Step 1: 在 test 檔加新案例**（接在現有 import 後擴充 import，並加 test）

把現有 import 行改為包含新函式：
```js
import {
  normalize, searchGames, decadeOf, vendorsOf, applyFacets,
  sortGames, paginate, deriveFacets, toIndexRecord, NONE,
  seriesOf, groupBy, relatedFor, distinctValues,
} from './gamesQuery.js';
```
在檔尾加：
```js
const H = [
  { id:'a', title_zh:'仙劍1', year:1995, developer:'大宇', publisher_tw:['大宇'], genre:'即時角色扮演', series:'仙劍奇俠傳' },
  { id:'b', title_zh:'仙劍2', year:2002, developer:'大宇', publisher_tw:[], genre:'即時角色扮演', series:'仙劍奇俠傳' },
  { id:'c', title_zh:'三國志2', year:1995, developer:'KOEI', publisher_tw:['智冠'], genre:'計策戰略', series:null },
];

test('seriesOf', () => {
  assert.equal(seriesOf(H[0]), '仙劍奇俠傳');
  assert.equal(seriesOf(H[2]), null);
});

test('groupBy scalar and array keyFn', () => {
  const byGenre = groupBy(H, g => g.genre);
  assert.equal(byGenre.get('即時角色扮演').length, 2);
  const byVendor = groupBy(H, vendorsOf);   // array keyFn
  assert.equal(byVendor.get('大宇').length, 2);
  assert.equal(byVendor.get('智冠').length, 1);
});

test('distinctValues counts, sorted desc, skips null', () => {
  const dv = distinctValues(H, g => g.genre);
  assert.deepEqual(dv[0], { value: '即時角色扮演', count: 2 });
  assert.equal(dv.find(d => d.value === '計策戰略').count, 1);
});

test('relatedFor: same series/company/year, excludes self, caps', () => {
  const r = relatedFor(H[0], H);
  assert.deepEqual(r.sameSeries.map(g => g.id), ['b']);       // 仙劍2
  assert.deepEqual(r.sameCompany.map(g => g.id), ['b']);      // 大宇
  assert.deepEqual(r.sameYear.map(g => g.id), ['c']);         // 1995
  assert.ok(!r.sameSeries.some(g => g.id === 'a'));           // no self
});
```

- [ ] **Step 2: 跑測試確認失敗**

Run: `npm test`
Expected: FAIL — `seriesOf`/`groupBy`/`relatedFor`/`distinctValues` not exported.

- [ ] **Step 3: 在 `gamesQuery.js` 末尾加實作**
```js
export function seriesOf(g) {
  return g.series || null;
}

export function groupBy(games, keyFn) {
  const m = new Map();
  for (const g of games) {
    for (const k of [].concat(keyFn(g))) {
      if (k == null || k === '') continue;
      if (!m.has(k)) m.set(k, []);
      m.get(k).push(g);
    }
  }
  return m;
}

export function distinctValues(games, keyFn) {
  const m = new Map();
  for (const g of games) {
    for (const k of [].concat(keyFn(g))) {
      if (k == null || k === '') continue;
      m.set(k, (m.get(k) || 0) + 1);
    }
  }
  return [...m.entries()].sort((a, b) => b[1] - a[1]).map(([value, count]) => ({ value, count }));
}

export function relatedFor(game, all, limit = 12) {
  const cut = a => a.slice(0, limit);
  const sameSeries = game.series
    ? all.filter(g => g.id !== game.id && g.series === game.series) : [];
  const comps = new Set(vendorsOf(game));
  const sameCompany = comps.size
    ? all.filter(g => g.id !== game.id && vendorsOf(g).some(v => comps.has(v))) : [];
  const sameYear = game.year
    ? all.filter(g => g.id !== game.id && g.year === game.year) : [];
  return { sameSeries: cut(sameSeries), sameCompany: cut(sameCompany), sameYear: cut(sameYear) };
}
```

- [ ] **Step 4: 跑測試確認通過**

Run: `npm test`
Expected: all PASS（原 9 + 新 4 = 13）。

- [ ] **Step 5: 建立 `src/lib/links.js`**
```js
const enc = s => encodeURIComponent(s);
export const gameUrl = id => `/games/${id}`;
export const genreUrl = g => `/genres/${enc(g)}`;
export const yearUrl = y => `/years/${y}`;
export const decadeUrl = d => `/decades/${d}`;
export const companyUrl = c => `/companies/${enc(c)}`;
export const seriesUrl = s => `/series/${enc(s)}`;
export const fandomUrl = t => `https://cn-dos-games.fandom.com/zh/wiki/${enc(t)}`;
```

- [ ] **Step 6: Commit**
```bash
git add src/lib/gamesQuery.js src/lib/gamesQuery.test.js src/lib/links.js
git commit -m "feat(site): gamesQuery hub helpers (groupBy/relatedFor/distinctValues) + link builders"
```

---

## Task 4: CSS + 共用 GameList 元件

**Files:** Modify `src/styles/global.css`; Create `src/components/GameList.astro`

- [ ] **Step 1: 在 `global.css` 末尾追加 wiki/hub/link 樣式**
```css
/* wiki 互連 / hub */
a.lk{color:#1d6fa5;border-bottom:1px dotted #9cc3dd}
a.lk:hover{background:#eef6fb;text-decoration:none}
.game-wiki{display:flex;gap:0;border:1px solid var(--border);border-radius:0 0 5px 5px;border-top:0}
.gw-main{flex:1;padding:16px 20px;min-width:0}
.gw-ib{flex:0 0 240px;background:#faf7f0;border-left:1px solid #eee4d2;padding:14px}
.gw-main h2{font-family:var(--serif);font-size:16px;border-bottom:1px solid var(--border);padding-bottom:4px;margin:18px 0 8px}
.rel{display:flex;flex-wrap:wrap;gap:4px 10px}
.cats{background:#f6f2e9;border:1px solid var(--border);border-top:0;border-radius:0 0 5px 5px;padding:10px 20px;font-size:13px;color:#666}
.cats a{margin:0 2px}
.exgrp{margin:6px 0;font-size:14px}
.exgrp .lbl{display:inline-block;min-width:56px;color:var(--muted);font-size:12px;font-family:var(--mono)}
.exgrp .src{color:#bbb;font-size:11px;margin-left:4px}
.hub-title{font-family:var(--serif);font-size:26px;margin:8px 0 4px}
.hub-count{color:var(--muted);font-size:15px;font-weight:400;font-family:var(--mono)}
.hub-sub{font-family:var(--serif);font-size:17px;margin:18px 0 6px;border-bottom:1px solid var(--border);padding-bottom:4px}
.index-grid{display:flex;flex-wrap:wrap;gap:6px 14px;font-size:14px}
.index-grid a .c{color:var(--muted);font-size:11px;font-family:var(--mono)}
@media(max-width:680px){.game-wiki{flex-direction:column}.gw-ib{flex:none;border-left:0;border-top:1px solid #eee4d2}}
```

- [ ] **Step 2: 建立 `src/components/GameList.astro`**
```astro
---
const { games } = Astro.props;
---
<ul class="results">
  {games.map(g => (
    <li><a href={`/games/${g.id}`}>
      <span class="r-title">{g.title_zh}</span>
      <span class="r-meta">{g.year ?? '—'} · {g.developer || g.publisher_tw?.[0] || '—'} · {g.genre || '—'}</span>
    </a></li>
  ))}
</ul>
```

- [ ] **Step 3: build 驗證**

Run: `npm run build`
Expected: 成功（GameList 尚未被引用，僅確認 CSS/元件不破壞 build）。

- [ ] **Step 4: Commit**
```bash
git add src/styles/global.css src/components/GameList.astro
git commit -m "feat(site): wiki/hub CSS + shared GameList component"
```

---

## Task 5: 詳情頁元件（Infobox 連結化 + 外連 + 相關 + 分類）

**Files:** Modify `src/components/Infobox.astro`; Create `src/components/ExternalLinks.astro`, `src/components/RelatedGames.astro`, `src/components/CategoryFooter.astro`

- [ ] **Step 1: 改寫 `src/components/Infobox.astro`（欄位連結化）**
```astro
---
import { companyUrl, genreUrl, yearUrl, seriesUrl } from '../lib/links.js';
const { g } = Astro.props;
const pubs = g.publisher_tw || [];
const codes = (g.release_codes || []).map(rc => `${rc.issuer} ${rc.code}`).join('、');
const editions = (g.editions || []).map(e => e.name).join('、');
---
<div class="infobox-wrap">
  <table class="infobox">
    {g.developer && <tr><th>開發</th><td><a class="lk" href={companyUrl(g.developer)}>{g.developer}</a></td></tr>}
    {g.year && <tr><th>發行年</th><td><a class="lk" href={yearUrl(g.year)}>{g.year}</a></td></tr>}
    {g.genre && <tr><th>類型</th><td><a class="lk" href={genreUrl(g.genre)}>{g.genre}</a></td></tr>}
    {g.series && <tr><th>系列</th><td><a class="lk" href={seriesUrl(g.series)}>{g.series}</a></td></tr>}
    {pubs.length > 0 && <tr><th>台灣發行</th><td>{pubs.map((p, i) => <>{i > 0 && '、'}<a class="lk" href={companyUrl(p)}>{p}</a></>)}</td></tr>}
    {g.content_language && <tr><th>內容語言</th><td>{g.content_language === 'zh' ? '中文' : '英文'}</td></tr>}
    {g.localization_level && <tr><th>在地化</th><td>{g.localization_level}</td></tr>}
    {g.size && <tr><th>容量</th><td>{g.size}</td></tr>}
    {g.platform_note && <tr><th>平台</th><td>{g.platform_note}</td></tr>}
    {(g.title_aliases || []).length > 0 && <tr><th>別名</th><td>{(g.title_aliases).join('、')}</td></tr>}
    {codes && <tr><th>編號</th><td>{codes}</td></tr>}
    {editions && <tr><th>版本</th><td>{editions}</td></tr>}
  </table>
</div>
```
（順手把 `content_language` 人性化為 中文／英文。）

- [ ] **Step 2: 建立 `src/components/ExternalLinks.astro`**
```astro
---
import { fandomUrl } from '../lib/links.js';
const { g } = Astro.props;
const r = g.references || {};
const groups = [];
if (r.chiuinan) groups.push(['介紹', [{ url: r.chiuinan, text: '青衫之友 介紹頁', src: 'chiuinan' }]]);
if (r.fandom) groups.push(['百科', [{ url: fandomUrl(r.fandom), text: 'Fandom 條目', src: 'cn-dos-games' }]]);
if (r.omega) groups.push(['討論', [{ url: r.omega, text: 'Omega 討論串', src: 'omega' }]]);
const ext = Object.entries(g.external_links || {});
if (ext.length) groups.push(['相關', ext.map(([text, url]) => ({ url, text, src: '' }))]);
---
{groups.length > 0 && (
  <section class="sources">
    <h2>外部連結</h2>
    {groups.map(([label, items]) => (
      <div class="exgrp">
        <span class="lbl">{label}</span>
        {items.map((it, i) => <>{i > 0 && ' · '}<a href={it.url} target="_blank" rel="noopener nofollow">{it.text} ↗</a>{it.src && <span class="src">({it.src})</span>}</>)}
      </div>
    ))}
  </section>
)}
```

- [ ] **Step 3: 建立 `src/components/RelatedGames.astro`**
```astro
---
import { seriesUrl, companyUrl, yearUrl } from '../lib/links.js';
const { related, g } = Astro.props;
const blocks = [
  ['同系列', related.sameSeries, g.series ? seriesUrl(g.series) : null],
  [`${g.developer || '同廠商'}的其他作品`, related.sameCompany, g.developer ? companyUrl(g.developer) : null],
  [`${g.year || ''}年的其他遊戲`, related.sameYear, g.year ? yearUrl(g.year) : null],
].filter(([, list]) => list && list.length > 0);
---
{blocks.map(([title, list, more]) => (
  <section>
    <h2>{title}</h2>
    <div class="rel">
      {list.map((x, i) => <>{i > 0 && ' · '}<a class="lk" href={`/games/${x.id}`}>{x.title_zh}</a></>)}
      {more && <> · <a class="lk" href={more}>更多 →</a></>}
    </div>
  </section>
))}
```

- [ ] **Step 4: 建立 `src/components/CategoryFooter.astro`**
```astro
---
import { yearUrl, companyUrl, genreUrl, seriesUrl } from '../lib/links.js';
const { g } = Astro.props;
const cats = [
  g.year && { href: yearUrl(g.year), text: `${g.year}年遊戲` },
  g.developer && { href: companyUrl(g.developer), text: g.developer },
  g.genre && { href: genreUrl(g.genre), text: g.genre },
  g.series && { href: seriesUrl(g.series), text: `${g.series}系列` },
].filter(Boolean);
---
{cats.length > 0 && (
  <div class="cats">分類：{cats.map((c, i) => <>{i > 0 && ' · '}<a class="lk" href={c.href}>{c.text}</a></>)}</div>
)}
```

- [ ] **Step 5: build 驗證**

Run: `npm run build`
Expected: 成功（元件尚未全被引用，確認可編譯；Infobox 已被詳情頁引用，仍須通過）。

- [ ] **Step 6: Commit**
```bash
git add src/components/Infobox.astro src/components/ExternalLinks.astro src/components/RelatedGames.astro src/components/CategoryFooter.astro
git commit -m "feat(site): linkified infobox + external-links/related/category components"
```

---

## Task 6: 詳情頁 wiki 雙欄重構

**Files:** Modify `src/pages/games/[id].astro`

- [ ] **Step 1: 改寫 `src/pages/games/[id].astro`**
```astro
---
import { getCollection, render } from 'astro:content';
import Base from '../../layouts/Base.astro';
import DosBar from '../../components/DosBar.astro';
import Infobox from '../../components/Infobox.astro';
import ExternalLinks from '../../components/ExternalLinks.astro';
import RelatedGames from '../../components/RelatedGames.astro';
import CategoryFooter from '../../components/CategoryFooter.astro';
import { genreUrl, seriesUrl } from '../../lib/links.js';
import { relatedFor } from '../../lib/gamesQuery.js';

export async function getStaticPaths() {
  const games = await getCollection('games', e => import.meta.env.PROD ? e.data.published : true);
  const all = games.map(e => e.data);
  // compute related here (pass only the small result) — never pass the full
  // `all` array as props (4144 pages × 4144 games would explode the build).
  return games.map(e => ({ params: { id: e.data.id }, props: { entry: e, related: relatedFor(e.data, all) } }));
}

const { entry, related } = Astro.props;
const g = entry.data;
const { Content } = await render(entry);
const hasBody = (entry.body || '').trim().length > 0;
const codeRight = g.catalog_id || (g.release_codes?.[0]?.code) || '';
---
<Base title={`${g.title_zh}｜中文 DOS 遊戲資料庫`}>
  <DosBar path={g.title_zh} right={`${g.id}${codeRight ? ' · ' + codeRight : ''}`} />
  <div class="game-wiki">
    <div class="gw-main">
      <h1 class="game-title">{g.title_zh}{g.year && <span class="year">{g.year}</span>}</h1>
      <div class="chips">
        {g.genre && <a class="chip chip-genre" href={genreUrl(g.genre)}>{g.genre}</a>}
        {g.series && <a class="chip" href={seriesUrl(g.series)}>{g.series}系列</a>}
        {g.localization_level && <span class="chip">{g.localization_level} 在地化</span>}
      </div>
      <section class="prose">
        {hasBody ? <Content /> : <p class="muted">簡介待補</p>}
      </section>
      <RelatedGames related={related} g={g} />
      <ExternalLinks g={g} />
    </div>
    <aside class="gw-ib">
      <div class="cover-placeholder">封面待補</div>
      <Infobox g={g} />
    </aside>
  </div>
  <CategoryFooter g={g} />
</Base>
```

- [ ] **Step 2: 詳情頁 headless 驗證（temp-publish 一組相關遊戲）**
```bash
/usr/bin/python3 scripts/publish.py cdg-1564 cdg-1565 cdg-1566
/usr/bin/python3 scripts/build_content.py
npm run build
F=dist/games/cdg-1564/index.html
grep -o '/companies/' $F | head -1
grep -o '/genres/' $F | head -1
grep -o '同系列' $F | head -1
grep -o '分類：' $F | head -1
grep -o '封面待補' $F | head -1
/usr/bin/python3 scripts/publish.py --off cdg-1564 cdg-1565 cdg-1566
/usr/bin/python3 scripts/build_content.py
git status --short content/games data/publish-state.json
```
Expected: 各 grep 命中（infobox 有 company/genre 連結、相關區「同系列」、分類頁尾）；還原後 git status content/ 乾淨。

- [ ] **Step 3: Commit**
```bash
git add src/pages/games/[id].astro
git commit -m "feat(site): wiki two-column detail (interlink + related + external links + categories)"
```

---

## Task 7: Hub 頁 A — 類型 / 年份 / 年代

**Files:** Create `src/pages/genres/index.astro`, `src/pages/genres/[genre].astro`, `src/pages/years/[year].astro`, `src/pages/decades/[decade].astro`

- [ ] **Step 1: `src/pages/genres/[genre].astro`**
```astro
---
import { getCollection } from 'astro:content';
import Base from '../../layouts/Base.astro';
import GameList from '../../components/GameList.astro';
import { groupBy } from '../../lib/gamesQuery.js';

export async function getStaticPaths() {
  const games = await getCollection('games', e => import.meta.env.PROD ? e.data.published : true);
  const by = groupBy(games.map(e => e.data), g => g.genre);
  return [...by].map(([genre, list]) => ({ params: { genre }, props: { list } }));
}
const { genre } = Astro.params;
const { list } = Astro.props;
const games = [...list].sort((a, b) => (a.year ?? 9999) - (b.year ?? 9999));
---
<Base title={`${genre}｜中文 DOS 遊戲資料庫`}>
  <h1 class="hub-title">{genre} <span class="hub-count">{games.length} 款</span></h1>
  <GameList games={games} />
</Base>
```

- [ ] **Step 2: `src/pages/genres/index.astro`**
```astro
---
import { getCollection } from 'astro:content';
import Base from '../../layouts/Base.astro';
import { distinctValues } from '../../lib/gamesQuery.js';
import { genreUrl } from '../../lib/links.js';

const games = await getCollection('games', e => import.meta.env.PROD ? e.data.published : true);
const genres = distinctValues(games.map(e => e.data), g => g.genre);
---
<Base title="類型｜中文 DOS 遊戲資料庫">
  <h1 class="hub-title">依類型瀏覽</h1>
  <div class="index-grid">
    {genres.map(({ value, count }) => <a class="lk" href={genreUrl(value)}>{value} <span class="c">{count}</span></a>)}
  </div>
</Base>
```

- [ ] **Step 3: `src/pages/years/[year].astro`**
```astro
---
import { getCollection } from 'astro:content';
import Base from '../../layouts/Base.astro';
import GameList from '../../components/GameList.astro';
import { groupBy } from '../../lib/gamesQuery.js';

export async function getStaticPaths() {
  const games = await getCollection('games', e => import.meta.env.PROD ? e.data.published : true);
  const by = groupBy(games.map(e => e.data), g => (g.year ? String(g.year) : null));
  return [...by].map(([year, list]) => ({ params: { year }, props: { list } }));
}
const { year } = Astro.params;
const { list } = Astro.props;
const games = [...list].sort((a, b) => a.title_zh.localeCompare(b.title_zh, 'zh-Hant'));
---
<Base title={`${year} 年｜中文 DOS 遊戲資料庫`}>
  <h1 class="hub-title">{year} 年的遊戲 <span class="hub-count">{games.length} 款</span></h1>
  <GameList games={games} />
</Base>
```

- [ ] **Step 4: `src/pages/decades/[decade].astro`**
```astro
---
import { getCollection } from 'astro:content';
import Base from '../../layouts/Base.astro';
import GameList from '../../components/GameList.astro';
import { groupBy, decadeOf } from '../../lib/gamesQuery.js';

export async function getStaticPaths() {
  const games = await getCollection('games', e => import.meta.env.PROD ? e.data.published : true);
  const by = groupBy(games.map(e => e.data), g => decadeOf(g.year));
  return [...by].map(([decade, list]) => ({ params: { decade }, props: { list } }));
}
const { decade } = Astro.params;
const { list } = Astro.props;
const games = [...list].sort((a, b) => (a.year ?? 9999) - (b.year ?? 9999));
---
<Base title={`${decade}｜中文 DOS 遊戲資料庫`}>
  <h1 class="hub-title">{decade} <span class="hub-count">{games.length} 款</span></h1>
  <GameList games={games} />
</Base>
```

- [ ] **Step 5: build 驗證（temp-publish 跨年/類型樣本）**
```bash
/usr/bin/python3 scripts/publish.py cdg-1564 cdg-0211 cdg-0214
/usr/bin/python3 scripts/build_content.py && npm run build
ls dist/genres/ | head; ls dist/years/ | head; ls dist/decades/ | head
test -f dist/genres/index.html && echo "genres index ok"
/usr/bin/python3 scripts/publish.py --off cdg-1564 cdg-0211 cdg-0214
/usr/bin/python3 scripts/build_content.py
git status --short content/games data/publish-state.json
```
Expected: dist/genres/、dist/years/、dist/decades/ 下生成對應頁；genres index 存在；還原乾淨。

- [ ] **Step 6: Commit**
```bash
git add src/pages/genres src/pages/years src/pages/decades
git commit -m "feat(site): genre/year/decade hub pages"
```

---

## Task 8: Hub 頁 B — 廠商 / 系列

**Files:** Create `src/pages/companies/index.astro`, `src/pages/companies/[name].astro`, `src/pages/series/index.astro`, `src/pages/series/[series].astro`

- [ ] **Step 1: `src/pages/companies/[name].astro`**（分「開發／台灣發行」）
```astro
---
import { getCollection } from 'astro:content';
import Base from '../../layouts/Base.astro';
import GameList from '../../components/GameList.astro';

export async function getStaticPaths() {
  const games = await getCollection('games', e => import.meta.env.PROD ? e.data.published : true);
  // pre-group per company; pass ONLY that company's games (never the full array).
  const map = new Map();
  const get = n => { if (!map.has(n)) map.set(n, { developed: [], published: [] }); return map.get(n); };
  for (const e of games) {
    const g = e.data;
    if (g.developer) get(g.developer).developed.push(g);
    for (const p of (g.publisher_tw || [])) if (p !== g.developer) get(p).published.push(g);
  }
  const byYear = (a, b) => (a.year ?? 9999) - (b.year ?? 9999);
  return [...map].map(([name, v]) => ({
    params: { name },
    props: { developed: v.developed.sort(byYear), published: v.published.sort(byYear) },
  }));
}
const { name } = Astro.params;
const { developed, published } = Astro.props;
---
<Base title={`${name}｜中文 DOS 遊戲資料庫`}>
  <h1 class="hub-title">{name}</h1>
  {developed.length > 0 && <><h2 class="hub-sub">開發（{developed.length}）</h2><GameList games={developed} /></>}
  {published.length > 0 && <><h2 class="hub-sub">台灣發行／代理（{published.length}）</h2><GameList games={published} /></>}
</Base>
```

- [ ] **Step 2: `src/pages/companies/index.astro`**（依款數排序）
```astro
---
import { getCollection } from 'astro:content';
import Base from '../../layouts/Base.astro';
import { distinctValues, vendorsOf } from '../../lib/gamesQuery.js';
import { companyUrl } from '../../lib/links.js';

const games = await getCollection('games', e => import.meta.env.PROD ? e.data.published : true);
const companies = distinctValues(games.map(e => e.data), vendorsOf);
---
<Base title="廠商｜中文 DOS 遊戲資料庫">
  <h1 class="hub-title">依廠商瀏覽 <span class="hub-count">{companies.length} 家</span></h1>
  <div class="index-grid">
    {companies.map(({ value, count }) => <a class="lk" href={companyUrl(value)}>{value} <span class="c">{count}</span></a>)}
  </div>
</Base>
```

- [ ] **Step 3: `src/pages/series/[series].astro`**
```astro
---
import { getCollection } from 'astro:content';
import Base from '../../layouts/Base.astro';
import GameList from '../../components/GameList.astro';
import { groupBy } from '../../lib/gamesQuery.js';

export async function getStaticPaths() {
  const games = await getCollection('games', e => import.meta.env.PROD ? e.data.published : true);
  const by = groupBy(games.map(e => e.data), g => g.series);
  return [...by].map(([series, list]) => ({ params: { series }, props: { list } }));
}
const { series } = Astro.params;
const { list } = Astro.props;
const games = [...list].sort((a, b) => (a.year ?? 9999) - (b.year ?? 9999));
---
<Base title={`${series}系列｜中文 DOS 遊戲資料庫`}>
  <h1 class="hub-title">{series}系列 <span class="hub-count">{games.length} 款</span></h1>
  <GameList games={games} />
</Base>
```

- [ ] **Step 4: `src/pages/series/index.astro`**
```astro
---
import { getCollection } from 'astro:content';
import Base from '../../layouts/Base.astro';
import { distinctValues } from '../../lib/gamesQuery.js';
import { seriesUrl } from '../../lib/links.js';

const games = await getCollection('games', e => import.meta.env.PROD ? e.data.published : true);
const series = distinctValues(games.map(e => e.data), g => g.series);
---
<Base title="系列｜中文 DOS 遊戲資料庫">
  <h1 class="hub-title">依系列瀏覽 <span class="hub-count">{series.length} 個</span></h1>
  <div class="index-grid">
    {series.map(({ value, count }) => <a class="lk" href={seriesUrl(value)}>{value} <span class="c">{count}</span></a>)}
  </div>
</Base>
```

- [ ] **Step 5: build 驗證（temp-publish 含同系列＋同廠商）**
```bash
/usr/bin/python3 scripts/publish.py cdg-1564 cdg-1565 cdg-1566 cdg-0211
/usr/bin/python3 scripts/build_content.py && npm run build
test -f dist/companies/index.html && echo "companies index ok"
test -f dist/series/index.html && echo "series index ok"
ls dist/series/ | head
/usr/bin/python3 scripts/publish.py --off cdg-1564 cdg-1565 cdg-1566 cdg-0211
/usr/bin/python3 scripts/build_content.py
git status --short content/games data/publish-state.json
```
Expected: companies/series index 生成、dist/series/ 下有仙劍系列頁；還原乾淨。

- [ ] **Step 6: Commit**
```bash
git add src/pages/companies src/pages/series
git commit -m "feat(site): company and series hub pages"
```

---

## Task 9: 導覽列 + 最終驗證

**Files:** Modify `src/layouts/Base.astro`

- [ ] **Step 1: `Base.astro` nav 加 hub 入口**

把 nav 那行：
```astro
      <nav><a href="/games">目錄</a><a href="/about">關於</a></nav>
```
改成：
```astro
      <nav><a href="/games">目錄</a><a href="/companies">廠商</a><a href="/series">系列</a><a href="/genres">類型</a><a href="/about">關於</a></nav>
```

- [ ] **Step 2: 全套驗證**
```bash
npm test
npm run validate
npm run build
git status --short content/games data/publish-state.json
```
Expected: 測試 13 pass / 0 fail；validate 4144/0；build 成功；content/ + publish-state 乾淨。

- [ ] **Step 3: Commit**
```bash
git add src/layouts/Base.astro
git commit -m "feat(site): nav links to company/series/genre hubs"
```

---

## Self-Review 對照（撰寫者已核）

- **Spec 覆蓋**：series 欄位+指派→T1/T2；chiuinan 介紹外連→T1/T2；hub 頁類型/年/年代/廠商/系列→T7/T8；互連 infobox/chips→T5/T6；相關區→T3/T5/T6；分類頁尾→T5/T6；外部連結分區→T5/T6；共享 helper→T3；CSS/雙欄→T4/T6；nav→T9。`/games` 列表不做巢狀錨點（spec §5 已修，計畫未在列內加實體連結）。
- **型別一致**：`gamesQuery` 新匯出 `seriesOf/groupBy/distinctValues/relatedFor` 於 T3 定義，T6/T7/T8 引用一致；`links.js` 的 `companyUrl/genreUrl/yearUrl/decadeUrl/seriesUrl/fandomUrl` 於 T3 定義，T5/T7/T8 引用一致；`GameList`（props `games`）於 T4 定義，T7/T8 引用一致；發布閘表達式各頁逐字相同。
- **無 placeholder**：每步含可貼上的完整程式碼與確切指令／預期輸出。
- **風險備註**：series 用前綴比對，可能對少數同前綴不同系列誤歸（為顯示性、非破壞性，可日後用 series-decisions 細修）；company hub 用字串聚合，同名歸併以字串相等為準（cdc 正規化後續）。prod 目前 0 published → hub/詳情於 prod 為空集合（dev 全覽，符合發布閘）。
```
