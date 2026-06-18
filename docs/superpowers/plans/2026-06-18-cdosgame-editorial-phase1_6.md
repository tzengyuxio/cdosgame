# cdosgame Phase 1.6（編輯機制 + 版面重設計）實作計畫

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`).

**Goal:** 加公司／系列編輯內容機制（手寫簡介疊在自動聚合上）＋把首頁、廠商頁、系列/廠商/類型索引重設計成文章式／卡片式，讓站不再像資料庫。

**Architecture:** 新增 `content/companies/`、`content/series/` 兩個可選 content collection（id=實體字串，與遊戲資料 join）。頁面用 `getEntry` 查 overlay、`getCollection('games')`（發布閘）自動聚合。沿用混合風 + DOS、純 CSS。

**Tech Stack:** Astro 5、node:test、純 CSS。

---

## 檔案結構
```
src/content.config.ts            # 改：+companies +series collections
content/companies/大宇.md        # seed 示範
content/series/仙劍奇俠傳.md     # seed 示範
src/lib/gamesQuery.js            # +yearRange/topValue (+test)
src/pages/index.astro            # 改：策展 landing
src/pages/companies/[name].astro # 改：文章式 + overlay
src/pages/companies/index.astro  # 改：分層卡片
src/pages/series/[series].astro  # 改：文章式 + overlay
src/pages/series/index.astro     # 改：卡片
src/pages/genres/index.astro     # 改：卡片
src/styles/global.css            # +card/capsule/columns/entity 樣式
```

---

## Task 1: content collections + seed 示範

**Files:** Modify `src/content.config.ts`; Create `content/companies/大宇.md`, `content/series/仙劍奇俠傳.md`

- [ ] **Step 1: 改寫 `src/content.config.ts`**
```ts
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro:content';
import { gameSchema } from '../schema/game.schema.mjs';

const fileId = ({ entry }) => entry.replace(/\.md$/, '');

const games = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/games', generateId: fileId }),
  schema: gameSchema,
});

const companies = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/companies', generateId: fileId }),
  schema: z.object({
    name_zh: z.string(),
    aliases: z.array(z.string()).default([]),
    name_en: z.string().optional(),
    founded: z.number().optional(),
    region: z.string().optional(),
    website: z.string().url().optional(),
    featured_series: z.array(z.string()).default([]),
    featured_games: z.array(z.string()).default([]),
  }),
});

const series = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/series', generateId: fileId }),
  schema: z.object({
    name_zh: z.string(),
    aliases: z.array(z.string()).default([]),
    lead_developer: z.string().optional(),
    summary: z.string().optional(),
  }),
});

export const collections = { games, companies, series };
```

- [ ] **Step 2: Create `content/companies/大宇.md`** (id「大宇」= 遊戲資料中的 developer 字串)
```md
---
name_zh: 大宇資訊
name_en: Softstar
aliases: [大宇, Softstar]
founded: 1988
region: 台灣
website: https://www.softstar.com.tw/
featured_series: [仙劍奇俠傳, 軒轅劍, 大富翁]
featured_games: [cdg-1564]
---

大宇資訊（Softstar）成立於 1988 年，是台灣最具代表性的遊戲公司之一。以角色扮演見長，旗下「仙劍奇俠傳」與「軒轅劍」並列華語 RPG 雙璧，另有長壽派對遊戲「大富翁」系列。1990 年代以「大宇雙劍」奠定中文單機遊戲黃金期的標竿地位。
```

- [ ] **Step 3: Create `content/series/仙劍奇俠傳.md`** (id「仙劍奇俠傳」= series 字串)
```md
---
name_zh: 仙劍奇俠傳
lead_developer: 大宇
summary: 姚壯憲領銜的華語 RPG 里程碑。
---

《仙劍奇俠傳》是大宇資訊 1995 年推出的角色扮演遊戲，以「宿命」主題、水墨風美術與經典劇情成為華語單機遊戲的里程碑，並衍生出橫跨數十年的系列。
```

- [ ] **Step 4: build 驗證（collections 載入、seed 通過 schema）**
```bash
npm run build 2>&1 | grep -iE "error|Complete" | tail -1
npm run validate 2>&1 | tail -1
```
Expected: build Complete（companies/series collection 載入無 schema error）；validate（games）仍 4144/0。若 glob 因目錄空報錯，確認兩個 seed 檔已建立。

- [ ] **Step 5: Commit**
```bash
git add src/content.config.ts content/companies content/series
git commit -m "feat(site): companies/series content collections + seed examples"
```

---

## Task 2: helper yearRange + topValue（TDD）

**Files:** Modify `src/lib/gamesQuery.js`, `src/lib/gamesQuery.test.js`

- [ ] **Step 1: 擴充測試**：在 import 區加 `yearRange, topValue`，並追加：
```js
test('yearRange', () => {
  assert.deepEqual(yearRange(H), { min: 1995, max: 2002 });
  assert.equal(yearRange([{ year: null }]), null);
});

test('topValue returns most common', () => {
  assert.equal(topValue(H, g => g.developer), '大宇');   // a,b 大宇 vs c KOEI
});
```
（`H` 已存在於測試檔。import 行改為包含 `yearRange, topValue`。）

- [ ] **Step 2: 跑測試確認失敗** — Run: `npm test`　Expected: FAIL（yearRange/topValue 未定義）。

- [ ] **Step 3: 追加實作到 `src/lib/gamesQuery.js`**
```js
export function yearRange(games) {
  const ys = games.map(g => g.year).filter(y => y != null);
  return ys.length ? { min: Math.min(...ys), max: Math.max(...ys) } : null;
}

export function topValue(games, keyFn) {
  const dv = distinctValues(games, keyFn);
  return dv.length ? dv[0].value : null;
}
```

- [ ] **Step 4: 跑測試確認通過** — Run: `npm test`　Expected: all pass（14 + 2 = 16）。

- [ ] **Step 5: Commit**
```bash
git add src/lib/gamesQuery.js src/lib/gamesQuery.test.js
git commit -m "feat(site): yearRange + topValue helpers"
```

---

## Task 3: 卡片／膠囊／文章 CSS

**Files:** Modify `src/styles/global.css`

- [ ] **Step 1: 在 `global.css` 末尾追加**
```css
/* 卡片 / 膠囊 / 文章式實體頁 */
.section-h{font-family:var(--serif);font-size:18px;border-bottom:1px solid var(--border);padding-bottom:5px;margin:24px 0 12px}
.cardrow{display:flex;gap:12px;flex-wrap:wrap}
.scard{flex:1 1 160px;border:1px solid var(--border);border-radius:6px;padding:12px 14px;background:#fff}
.scard .t{font-family:var(--serif);font-weight:600;font-size:16px}
.scard .m{color:var(--muted);font-size:12px;font-family:var(--mono);margin:2px 0 5px}
.scard .d{font-size:12.5px;color:#777}
.scard .more{font-size:12px;color:var(--brown);margin-top:6px;display:block}
.vendrow{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
.vend{border:1px solid var(--border);border-radius:20px;padding:3px 12px;font-size:13px;color:var(--fg);background:#fff}
.vend:hover{background:#faf6ee;text-decoration:none}
.vend .c{color:var(--muted);font-size:11px;font-family:var(--mono)}
.hero h1{font-family:var(--serif);font-size:30px;margin:0 0 4px}
.hero .lead{color:#555;font-size:15px}
.glist{list-style:none;margin:0;padding:0;columns:2;column-gap:28px}
.glist li{padding:3px 0;font-size:14px;break-inside:avoid}
.glist .y{color:var(--muted);font-family:var(--mono);font-size:12px;margin-right:6px}
.entity-sub{color:var(--muted);font-size:13px;font-family:var(--mono);margin-bottom:12px}
@media(max-width:680px){.glist{columns:1}}
```

- [ ] **Step 2: build 驗證** — Run: `npm run build 2>&1 | grep -iE "error|Complete" | tail -1`　Expected: Complete。

- [ ] **Step 3: Commit**
```bash
git add src/styles/global.css
git commit -m "feat(site): card/capsule/article CSS for editorial redesign"
```

---

## Task 4: 首頁策展 landing

**Files:** Modify `src/pages/index.astro`

- [ ] **Step 1: 改寫 `src/pages/index.astro`**
```astro
---
import Base from '../layouts/Base.astro';
import { getCollection } from 'astro:content';
import { groupBy, distinctValues, vendorsOf, decadeOf, yearRange } from '../lib/gamesQuery.js';
import { seriesUrl, companyUrl, decadeUrl, genreUrl } from '../lib/links.js';

const games = (await getCollection('games', e => import.meta.env.PROD ? e.data.published : true)).map(e => e.data);
const total = games.length;
const bySeries = groupBy(games, g => g.series);
const seriesCount = bySeries.size;
const companies = distinctValues(games, vendorsOf);
const featSeries = [...bySeries.entries()]
  .map(([name, list]) => ({ name, list, range: yearRange(list) }))
  .sort((a, b) => b.list.length - a.list.length).slice(0, 8);
const topCompanies = companies.slice(0, 12);
const decades = distinctValues(games, g => decadeOf(g.year)).sort((a, b) => a.value.localeCompare(b.value));
const genres = distinctValues(games, g => g.genre);
---
<Base title="中文 DOS 遊戲資料庫">
  <section class="hero">
    <h1>中文 DOS 遊戲資料庫</h1>
    <p class="lead">盡可能齊全、重考據的中文 DOS 時代遊戲百科。</p>
    <p class="entity-sub">已收錄 {total} 款 · {seriesCount} 系列 · {companies.length} 廠商</p>
    <a class="btn" href="/games">瀏覽全部</a> <button class="btn" id="random">隨機探索</button>
  </section>

  <h2 class="section-h">經典系列</h2>
  <div class="cardrow">
    {featSeries.map(s => (
      <div class="scard">
        <div class="t"><a class="lk" href={seriesUrl(s.name)}>{s.name}</a></div>
        <div class="m">{s.range ? `${s.range.min}–${s.range.max}` : ''} · {s.list.length} 款</div>
        <a class="more" href={seriesUrl(s.name)}>查看系列 →</a>
      </div>
    ))}
  </div>

  <h2 class="section-h">主要廠商</h2>
  <div class="vendrow">
    {topCompanies.map(c => <a class="vend" href={companyUrl(c.value)}>{c.value} <span class="c">{c.count}</span></a>)}
    <a class="lk" href="/companies">全部廠商 →</a>
  </div>

  <h2 class="section-h">依年代</h2>
  <div class="vendrow">
    {decades.map(d => <a class="vend" href={decadeUrl(d.value)}>{d.value} <span class="c">{d.count}</span></a>)}
  </div>

  <h2 class="section-h">依類型</h2>
  <div class="vendrow">
    {genres.map(g => <a class="vend" href={genreUrl(g.value)}>{g.value} <span class="c">{g.count}</span></a>)}
  </div>

  <script>
    document.getElementById('random')?.addEventListener('click', async () => {
      const g = await (await fetch('/games.json')).json();
      if (g.length) location.href = `/games/${g[Math.floor(Math.random() * g.length)].id}`;
    });
  </script>
</Base>
```

- [ ] **Step 2: build + 驗證首頁區塊**
```bash
npm run build 2>&1 | grep -iE "error|Complete" | tail -1
grep -o '經典系列' dist/index.html | head -1
grep -o '主要廠商' dist/index.html | head -1
```
Expected: Complete；首頁含「經典系列」「主要廠商」。（prod publish-state 空 → 卡片為空集合但頁面結構在；dev 才有資料。）

- [ ] **Step 3: Commit**
```bash
git add src/pages/index.astro
git commit -m "feat(site): curated landing home page"
```

---

## Task 5: 廠商頁文章化 + content overlay

**Files:** Modify `src/pages/companies/[name].astro`

- [ ] **Step 1: 改寫 `src/pages/companies/[name].astro`**
```astro
---
import { getCollection, getEntry, render } from 'astro:content';
import Base from '../../layouts/Base.astro';
import DosBar from '../../components/DosBar.astro';
import { seriesUrl } from '../../lib/links.js';

export async function getStaticPaths() {
  const games = await getCollection('games', e => import.meta.env.PROD ? e.data.published : true);
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
const company = await getEntry('companies', name);
const c = company?.data;
const Body = company ? (await render(company)).Content : null;
const featured = (c?.featured_games || [])
  .map(id => [...developed, ...published].find(g => g.id === id)).filter(Boolean);
---
<Base title={`${c?.name_zh || name}｜中文 DOS 遊戲資料庫`}>
  <DosBar path={`COMPANIES\\${name}`} right={c?.name_en || ''} />
  <div class="game-wiki">
    <div class="gw-main">
      <h1 class="game-title">{c?.name_zh || name}</h1>
      <div class="entity-sub">{c?.name_en && `${c.name_en} · `}開發 {developed.length} · 台灣代理 {published.length}</div>
      {Body && <div class="prose"><Body /></div>}
      {(c?.featured_series || []).length > 0 && (
        <><h2>代表系列</h2><div class="vendrow">{c.featured_series.map(s => <a class="vend" href={seriesUrl(s)}>{s}</a>)}</div></>
      )}
      {featured.length > 0 && (
        <><h2>代表作</h2><div class="cardrow">{featured.map(g => (
          <div class="scard"><div class="t"><a class="lk" href={`/games/${g.id}`}>{g.title_zh}</a></div><div class="m">{g.year ?? ''}</div></div>
        ))}</div></>
      )}
      {developed.length > 0 && <><h2>開發作品（{developed.length}）</h2><ul class="glist">{developed.map(g => <li><span class="y">{g.year ?? '—'}</span><a class="lk" href={`/games/${g.id}`}>{g.title_zh}</a></li>)}</ul></>}
      {published.length > 0 && <><h2>台灣發行／代理（{published.length}）</h2><ul class="glist">{published.map(g => <li><span class="y">{g.year ?? '—'}</span><a class="lk" href={`/games/${g.id}`}>{g.title_zh}</a></li>)}</ul></>}
    </div>
    <aside class="gw-ib">
      <div class="infobox-wrap">
        <table class="infobox">
          {c?.name_en && <tr><th>英文名</th><td>{c.name_en}</td></tr>}
          {c?.founded && <tr><th>成立</th><td>{c.founded}</td></tr>}
          {c?.region && <tr><th>地區</th><td>{c.region}</td></tr>}
          <tr><th>作品數</th><td>開發 {developed.length} · 代理 {published.length}</td></tr>
          {c?.website && <tr><th>官網</th><td><a class="lk" href={c.website} target="_blank" rel="noopener nofollow">官方網站 ↗</a></td></tr>}
        </table>
      </div>
    </aside>
  </div>
</Base>
```

- [ ] **Step 2: headless 驗證（大宇有 overlay；某無 overlay 公司走模板）**
```bash
/usr/bin/python3 scripts/publish.py cdg-1564 cdg-0211
/usr/bin/python3 scripts/build_content.py && npm run build
F="dist/companies/%E5%A4%A7%E5%AE%87/index.html"
grep -o '大宇資訊' $F | head -1
grep -o '成立' $F | head -1
grep -o '代表系列' $F | head -1
echo "-- no-overlay company (KOEI) still template --"
grep -o '開發作品' "dist/companies/KOEI/index.html" | head -1
/usr/bin/python3 scripts/publish.py --off cdg-1564 cdg-0211
/usr/bin/python3 scripts/build_content.py
git status --short content/games data/publish-state.json
```
Expected: 大宇頁顯示 name_zh「大宇資訊」、infobox「成立」、「代表系列」；KOEI 頁走模板（有「開發作品」清單、無簡介）；還原乾淨。

- [ ] **Step 3: Commit**
```bash
git add src/pages/companies/[name].astro
git commit -m "feat(site): article-style company page with content overlay"
```

---

## Task 6: 系列頁文章化 + 系列索引卡片化

**Files:** Modify `src/pages/series/[series].astro`, `src/pages/series/index.astro`

- [ ] **Step 1: 改寫 `src/pages/series/[series].astro`**
```astro
---
import { getCollection, getEntry, render } from 'astro:content';
import Base from '../../layouts/Base.astro';
import GameList from '../../components/GameList.astro';
import { groupBy, topValue, yearRange } from '../../lib/gamesQuery.js';
import { companyUrl } from '../../lib/links.js';

export async function getStaticPaths() {
  const games = await getCollection('games', e => import.meta.env.PROD ? e.data.published : true);
  const by = groupBy(games.map(e => e.data), g => g.series);
  return [...by].map(([series, list]) => ({ params: { series }, props: { list } }));
}
const { series } = Astro.params;
const { list } = Astro.props;
const games = [...list].sort((a, b) => (a.year ?? 9999) - (b.year ?? 9999));
const dev = topValue(list, g => g.developer);
const range = yearRange(list);
const entry = await getEntry('series', series);
const Body = entry ? (await render(entry)).Content : null;
---
<Base title={`${series}系列｜中文 DOS 遊戲資料庫`}>
  <h1 class="hub-title">{series}系列 <span class="hub-count">{games.length} 款</span></h1>
  <div class="entity-sub">{dev && <>主要廠商 <a class="lk" href={companyUrl(dev)}>{dev}</a> · </>}{range && `${range.min}–${range.max}`}</div>
  {Body && <div class="prose"><Body /></div>}
  <GameList games={games} />
</Base>
```

- [ ] **Step 2: 改寫 `src/pages/series/index.astro`（卡片）**
```astro
---
import { getCollection, getEntry } from 'astro:content';
import Base from '../../layouts/Base.astro';
import { groupBy, topValue, yearRange } from '../../lib/gamesQuery.js';
import { seriesUrl } from '../../lib/links.js';

const games = await getCollection('games', e => import.meta.env.PROD ? e.data.published : true);
const by = groupBy(games.map(e => e.data), g => g.series);
const cards = await Promise.all([...by.entries()].map(async ([name, list]) => {
  const entry = await getEntry('series', name);
  return { name, count: list.length, dev: topValue(list, g => g.developer), range: yearRange(list), summary: entry?.data.summary };
}));
cards.sort((a, b) => b.count - a.count);
---
<Base title="系列｜中文 DOS 遊戲資料庫">
  <h1 class="hub-title">依系列瀏覽 <span class="hub-count">{cards.length} 個</span></h1>
  <div class="cardrow">
    {cards.map(s => (
      <div class="scard">
        <div class="t"><a class="lk" href={seriesUrl(s.name)}>{s.name}</a></div>
        <div class="m">{s.dev ? s.dev + ' · ' : ''}{s.range ? `${s.range.min}–${s.range.max}` : ''} · {s.count} 款</div>
        {s.summary && <div class="d">{s.summary}</div>}
      </div>
    ))}
  </div>
</Base>
```

- [ ] **Step 3: headless 驗證**
```bash
/usr/bin/python3 scripts/publish.py cdg-1564 cdg-1565 cdg-1566
/usr/bin/python3 scripts/build_content.py && npm run build
S="dist/series/%E4%BB%99%E5%8A%8D%E5%A5%87%E4%BF%A0%E5%82%B3/index.html"
grep -o '主要廠商' $S | head -1
grep -o '姚壯憲' $S | head -1
grep -o 'scard' dist/series/index.html | head -1
/usr/bin/python3 scripts/publish.py --off cdg-1564 cdg-1565 cdg-1566
/usr/bin/python3 scripts/build_content.py
git status --short content/games data/publish-state.json
```
Expected: 仙劍系列頁有「主要廠商」與簡介（姚壯憲）；系列索引為卡片（scard）；還原乾淨。

- [ ] **Step 4: Commit**
```bash
git add src/pages/series/[series].astro src/pages/series/index.astro
git commit -m "feat(site): article-style series page + card series index"
```

---

## Task 7: 廠商索引分層 + 類型索引卡片

**Files:** Modify `src/pages/companies/index.astro`, `src/pages/genres/index.astro`

- [ ] **Step 1: 改寫 `src/pages/companies/index.astro`（主要 + 全部）**
```astro
---
import { getCollection } from 'astro:content';
import Base from '../../layouts/Base.astro';
import { distinctValues, vendorsOf } from '../../lib/gamesQuery.js';
import { companyUrl } from '../../lib/links.js';

const games = await getCollection('games', e => import.meta.env.PROD ? e.data.published : true);
const companies = distinctValues(games.map(e => e.data), vendorsOf);
const major = companies.slice(0, 24);
const rest = companies.slice(24);
---
<Base title="廠商｜中文 DOS 遊戲資料庫">
  <h1 class="hub-title">依廠商瀏覽 <span class="hub-count">{companies.length} 家</span></h1>
  <h2 class="section-h">主要廠商</h2>
  <div class="vendrow">
    {major.map(c => <a class="vend" href={companyUrl(c.value)}>{c.value} <span class="c">{c.count}</span></a>)}
  </div>
  {rest.length > 0 && (
    <><h2 class="section-h">全部廠商</h2>
    <div class="index-grid">
      {rest.map(c => <a class="lk" href={companyUrl(c.value)}>{c.value} <span class="c">{c.count}</span></a>)}
    </div></>
  )}
</Base>
```

- [ ] **Step 2: 改寫 `src/pages/genres/index.astro`（卡片）**
```astro
---
import { getCollection } from 'astro:content';
import Base from '../../layouts/Base.astro';
import { groupBy, yearRange } from '../../lib/gamesQuery.js';
import { genreUrl } from '../../lib/links.js';

const games = await getCollection('games', e => import.meta.env.PROD ? e.data.published : true);
const by = groupBy(games.map(e => e.data), g => g.genre);
const cards = [...by.entries()].map(([name, list]) => ({
  name, count: list.length, range: yearRange(list),
  sample: [...list].sort((a, b) => (a.year ?? 9999) - (b.year ?? 9999)).slice(0, 3),
})).sort((a, b) => b.count - a.count);
---
<Base title="類型｜中文 DOS 遊戲資料庫">
  <h1 class="hub-title">依類型瀏覽 <span class="hub-count">{cards.length} 類</span></h1>
  <div class="cardrow">
    {cards.map(g => (
      <div class="scard">
        <div class="t"><a class="lk" href={genreUrl(g.name)}>{g.name}</a></div>
        <div class="m">{g.range ? `${g.range.min}–${g.range.max}` : ''} · {g.count} 款</div>
        <div class="d">{g.sample.map(x => x.title_zh).join('、')}…</div>
      </div>
    ))}
  </div>
</Base>
```

- [ ] **Step 3: build 驗證**
```bash
/usr/bin/python3 scripts/publish.py cdg-1564 cdg-0211 cdg-0214
/usr/bin/python3 scripts/build_content.py && npm run build
grep -o '主要廠商' dist/companies/index.html | head -1
grep -o 'scard' dist/genres/index.html | head -1
/usr/bin/python3 scripts/publish.py --off cdg-1564 cdg-0211 cdg-0214
/usr/bin/python3 scripts/build_content.py
git status --short content/games data/publish-state.json
```
Expected: 廠商索引有「主要廠商」分層；類型索引為卡片；還原乾淨。

- [ ] **Step 4: Commit**
```bash
git add src/pages/companies/index.astro src/pages/genres/index.astro
git commit -m "feat(site): layered company index + card genre index"
```

---

## Task 8: 最終驗證 + review

**Files:**（驗證）

- [ ] **Step 1: 全套驗證**
```bash
npm test
npm run validate
npm run build
git status --short content/games data/publish-state.json
```
Expected: 測試 16 pass / 0；validate 4144/0；build 成功；content/ + publish-state 乾淨。

- [ ] **Step 2: playwright wander（dev 全看）** — 起 `npm run dev`，瀏覽器走：首頁（經典系列卡／主要廠商膠囊）→ 點系列卡 → 系列頁（簡介）→ 點主要廠商「大宇」→ 公司頁（大宇資訊簡介＋infobox 成立 1988）；確認 /companies（主要+全部分層）、/series（卡片）、/genres（卡片）。收掉 dev server。

- [ ] **Step 3: Commit（若 step 2 無修改則略）**

---

## Self-Review 對照（撰寫者已核）

- **Spec 覆蓋**：content collections→T1；helper→T2；CSS→T3；首頁策展→T4；廠商文章化+overlay→T5；系列文章化+索引卡片→T6；廠商索引分層+類型卡片→T7；驗證→T8。
- **型別一致**：`yearRange/topValue` T2 定義，T4/T5/T6/T7 引用；`getEntry('companies'|'series', name)` 之 id=檔名=實體字串，與遊戲資料 join 一致；發布閘表達式各頁逐字相同；`groupBy/distinctValues/vendorsOf/decadeOf` 沿用既有。
- **無 placeholder**：每步含完整程式碼與指令／預期。
- **風險**：`getEntry` 查無回 undefined（已用 `?.`/條件渲染處理）；中文檔名作 collection id（Astro glob 支援）；prod 0 published → 首頁/索引卡片空集合但結構在（dev 完整）。content overlay 的 `name_zh` 顯示名與 join key（字串）可不同（如 大宇/大宇資訊），屬刻意。
