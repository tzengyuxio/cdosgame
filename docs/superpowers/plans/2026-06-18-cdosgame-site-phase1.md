# cdosgame 網站 Phase 1 實作計畫

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 把 4144 款 catalog 做成 Astro 靜態站：可搜尋／篩選的目錄、單款詳情、首頁、關於頁，並讓 `build_content` 重跑保留手寫考據正文。

**Architecture:** Astro 5 + Content Collections（直接用 `schema/game.schema.mjs` 的 `gameSchema`）。詳情／首頁／關於靜態生成；`/games` 列表載入精簡 `games.json` 端點，於瀏覽器以純 JS 模組（`src/lib/gamesQuery.js`）做搜尋／篩選／排序／分頁。發布閘：`import.meta.env.PROD ? e.data.published : true`，dev 全看、prod 只看已發布。純手寫 CSS、零 Astro 預設樣式。

**Tech Stack:** Astro 5（無前端框架）、原生 zod schema、node:test（JS 單元測試）、/usr/bin/python3 + pyyaml（`build_content`）。

---

## 檔案結構

```
astro.config.mjs              # 新增：Astro 設定（無 integration）
package.json                  # 修改：加 astro 依賴與 scripts
src/
  content.config.ts           # 新增：games collection（gameSchema）
  layouts/Base.astro          # 新增：頁框（header/nav/footer）
  components/
    DosBar.astro              # 新增：DOS 頂條
    Infobox.astro             # 新增：詳情結構化欄位表
  lib/
    gamesQuery.js             # 新增：純查詢邏輯（search/facet/sort/paginate/derive/toIndexRecord）
    gamesQuery.test.js        # 新增：node:test 單元測試
  pages/
    index.astro               # 新增：首頁
    about.astro               # 新增：關於
    games/index.astro         # 新增：目錄列表（前端 island）
    games/[id].astro          # 新增：單款詳情
    games.json.ts             # 新增：精簡索引端點（published-gated）
  styles/global.css           # 新增：design token + 元件樣式
scripts/
  build_content.py            # 修改：保留正文 body
  test_build_content.py       # 新增：existing_body 單元測試
```

每個檔案單一職責：`gamesQuery.js` 純邏輯（瀏覽器與 node 測試共用）；`*.astro` 只管渲染；`build_content.py` 只管生成 frontmatter 並保留正文。

---

## Task 1: Astro scaffold + 設定 + 頁框 + design token

**Files:**
- Create: `astro.config.mjs`, `src/content.config.ts`, `src/layouts/Base.astro`, `src/styles/global.css`, `src/pages/index.astro`（暫時占位，Task 8 取代）
- Modify: `package.json`

- [ ] **Step 1: 加依賴與 scripts 到 `package.json`**

把 `package.json` 改成（保留既有 validate）：

```json
{
  "name": "cdosgame",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "description": "中文 DOS 遊戲資料庫 — platform-neutral catalog",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "test": "node --test src/lib/",
    "validate": "node scripts/validate_content.mjs"
  },
  "dependencies": {
    "astro": "^5.0.0",
    "js-yaml": "^4.1.0",
    "zod": "^3.23.0"
  }
}
```

- [ ] **Step 2: 安裝**

Run: `npm install`
Expected: 安裝完成、`node_modules/astro` 存在、無 error。

- [ ] **Step 3: 建立 `astro.config.mjs`**

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  // 站點 URL 之後上線再填；Phase 1 不需要 integration
});
```

- [ ] **Step 4: 建立 `src/content.config.ts`**

```ts
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { gameSchema } from '../schema/game.schema.mjs';

const games = defineCollection({
  // Force entry id = filename (cdg-NNNN). Default generateId uses frontmatter `slug`,
  // which is non-unique here (e.g. "d","x") and would collide/drop entries.
  loader: glob({
    pattern: '*.md',
    base: './content/games',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: gameSchema,
});

export const collections = { games };
```

備註：若 `astro build` 因 zod 與 `astro:content` 的 z 版本不合而報 schema 型別錯，退路是把 `gameSchema` 的欄位定義複製進此檔、改用 `defineCollection` 第二參的 `({ image }) => z.object({...})`（z 由 `astro:content` 匯入）；欄位內容不變。先試直接 import。

- [ ] **Step 5: 建立 `src/styles/global.css`**

```css
:root{
  --bg:#fffdf9; --fg:#2b2b2b; --muted:#999; --border:#e3ddd0;
  --amber:#ffb000; --brown:#a8612a; --dos-bg:#0c0c0c;
  --serif:Georgia,'Songti TC','Noto Serif TC',serif;
  --sans:-apple-system,BlinkMacSystemFont,'PingFang TC','Noto Sans TC',sans-serif;
  --mono:'Courier New',ui-monospace,monospace;
}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--fg);font-family:var(--sans);line-height:1.6}
a{color:var(--brown);text-decoration:none}
a:hover{text-decoration:underline}
.site-header{display:flex;justify-content:space-between;align-items:center;padding:12px 20px;border-bottom:1px solid var(--border)}
.brand{font-family:var(--serif);font-weight:600;font-size:18px;color:var(--fg)}
.site-header nav a{margin-left:14px}
main{max-width:920px;margin:0 auto;padding:24px 20px}
.site-footer{border-top:1px solid var(--border);color:var(--muted);font-size:13px;text-align:center;padding:18px;margin-top:40px}
.muted{color:var(--muted)}

/* DOS 頂條 */
.dosbar{display:flex;justify-content:space-between;align-items:center;background:var(--dos-bg);color:var(--amber);font-family:var(--mono);font-size:13px;padding:8px 12px;border-radius:4px 4px 0 0}
.doscodes{opacity:.55;font-size:12px}
.cursor{display:inline-block;width:8px;height:14px;background:var(--amber);vertical-align:-2px;margin-left:2px;animation:blink 1s steps(1) infinite}
@keyframes blink{0%,49%{opacity:1}50%,100%{opacity:0}}

/* 詳情 */
.game{border:1px solid var(--border);border-radius:5px;overflow:hidden}
.game-title,.chips,.cover-placeholder,.infobox-wrap,.prose,.sources{margin:14px 16px}
.game-title{font-family:var(--serif);font-size:24px;font-weight:600}
.game-title .year{color:var(--muted);font-weight:400;font-size:17px;margin-left:8px}
.chips{display:flex;gap:6px;flex-wrap:wrap}
.chip{background:#f3f0e8;color:#666;border-radius:3px;padding:1px 8px;font-size:12px}
.chip-genre{background:#fff3dc;color:var(--brown);border:1px solid #f0dca8}
.cover-placeholder{background:#f3f0e8;color:var(--muted);text-align:center;padding:28px;border-radius:4px;font-size:13px}
.infobox{width:100%;border-collapse:collapse;font-size:14px}
.infobox th{text-align:left;color:var(--muted);font-weight:400;width:88px;padding:5px 12px 5px 0;vertical-align:top;white-space:nowrap}
.infobox td{border-bottom:1px solid #f2eee4;padding:5px 0}
.prose{font-size:15px}
.sources h2,.prose h2{font-family:var(--serif);font-size:16px;border-bottom:1px solid var(--border);padding-bottom:4px}

/* 列表 */
.games-layout{display:flex;gap:24px;align-items:flex-start}
.facets{flex:0 0 200px;font-size:13px}
.facet{margin-bottom:16px}
.facet h3{font-size:13px;text-transform:uppercase;letter-spacing:.04em;color:var(--muted);margin:0 0 6px}
.facet label{display:flex;align-items:center;gap:6px;padding:2px 0;cursor:pointer}
.facet .c{margin-left:auto;color:var(--muted);font-size:11px}
.facet .vfilter{width:100%;margin-bottom:6px;padding:3px 6px;border:1px solid var(--border);border-radius:3px}
.games-main{flex:1;min-width:0}
.controls{display:flex;gap:10px;margin-bottom:10px}
.controls #search{flex:1;padding:8px 10px;border:1px solid var(--border);border-radius:4px;font-size:14px}
.controls select{padding:8px;border:1px solid var(--border);border-radius:4px}
.count{color:var(--muted);font-size:13px;margin-bottom:8px}
.results{list-style:none;margin:0;padding:0}
.results li{border-bottom:1px solid #f2eee4}
.results a{display:flex;justify-content:space-between;gap:12px;padding:8px 4px;color:var(--fg)}
.results a:hover{background:#faf6ee;text-decoration:none}
.r-title{font-weight:600}
.r-meta{color:var(--muted);font-size:13px;font-family:var(--mono);white-space:nowrap}
.pager{display:flex;align-items:center;gap:8px;justify-content:center;margin-top:16px}
.pager button{padding:5px 12px;border:1px solid var(--border);background:#fff;border-radius:4px;cursor:pointer}
.pager button:disabled{opacity:.4;cursor:default}

/* 首頁 */
.hero h1{font-family:var(--serif);font-size:30px;margin-bottom:6px}
.stats{color:var(--muted);font-family:var(--mono)}
.entry{display:flex;gap:10px;margin:18px 0}
.btn{display:inline-block;padding:8px 16px;border:1px solid var(--border);border-radius:4px;background:#fff;cursor:pointer;font-size:14px;color:var(--fg)}
.btn:hover{background:#faf6ee;text-decoration:none}
.decades{display:flex;gap:10px}
.decades a{font-family:var(--mono)}

@media(max-width:680px){.games-layout{flex-direction:column}.facets{flex:none;width:100%}}
```

- [ ] **Step 6: 建立 `src/layouts/Base.astro`**

```astro
---
import '../styles/global.css';
const { title = '中文 DOS 遊戲資料庫' } = Astro.props;
---
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
  </head>
  <body>
    <header class="site-header">
      <a href="/" class="brand">中文 DOS 遊戲資料庫</a>
      <nav><a href="/games">目錄</a><a href="/about">關於</a></nav>
    </header>
    <main><slot /></main>
    <footer class="site-footer">cdosgame · git-backed catalog</footer>
  </body>
</html>
```

- [ ] **Step 7: 建立暫時占位首頁 `src/pages/index.astro`**

```astro
---
import Base from '../layouts/Base.astro';
---
<Base><p>scaffold ok</p></Base>
```

- [ ] **Step 8: build 驗證**

Run: `npm run build`
Expected: build 成功、`dist/index.html` 產生、無 error。若 schema import 報錯，依 Step 4 備註改用內聯 schema。

- [ ] **Step 9: Commit**

```bash
git add astro.config.mjs package.json package-lock.json src/ 
git commit -m "feat(site): scaffold Astro + content collection + base layout + design tokens"
```

---

## Task 2: `build_content.py` 保留正文

**Files:**
- Modify: `scripts/build_content.py`（新增 `existing_body`、改寫第 ~140-143 行寫檔段）
- Test: `scripts/test_build_content.py`

- [ ] **Step 1: 寫失敗測試 `scripts/test_build_content.py`**

```python
import sys
import tempfile
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from build_content import existing_body


def run():
    with tempfile.TemporaryDirectory() as d:
        t = Path(d)
        # 不存在 -> 預設換行
        assert existing_body(t / "nope.md") == "\n"
        # 空正文（現行格式）-> 換行
        p = t / "a.md"
        p.write_text("---\nid: cdg-0001\n---\n\n", encoding="utf-8")
        assert existing_body(p) == "\n"
        # 有手寫正文 -> 原樣保留
        q = t / "b.md"
        q.write_text("---\nid: cdg-0002\n---\n\n## 考據\n內文\n", encoding="utf-8")
        assert existing_body(q) == "\n## 考據\n內文\n"
    print("ok")


if __name__ == "__main__":
    run()
```

- [ ] **Step 2: 跑測試確認失敗**

Run: `/usr/bin/python3 scripts/test_build_content.py`
Expected: FAIL — `ImportError: cannot import name 'existing_body'`。

- [ ] **Step 3: 在 `build_content.py` 新增 `existing_body`**

在 `frontmatter()` 函式之後（約第 97 行後）插入：

```python
def existing_body(path):
    """Markdown body after the frontmatter block; '\n' for new/absent files."""
    if not path.exists():
        return "\n"
    text = path.read_text(encoding="utf-8")
    m = re.match(r"^---\n.*?\n---\n", text, re.S)
    return text[m.end():] if m else "\n"
```

- [ ] **Step 4: 跑測試確認通過**

Run: `/usr/bin/python3 scripts/test_build_content.py`
Expected: 印出 `ok`。

- [ ] **Step 5: 整合進寫檔段**

把 `main()` 內這段（原約 140-143 行）：

```python
        fm = frontmatter(g, gid, bool(publish_state.get(gid)))
        body = yaml.safe_dump(fm, allow_unicode=True, sort_keys=False, width=1000)
        (OUT_DIR / f"{gid}.md").write_text(f"---\n{body}---\n\n", encoding="utf-8")
        seen_files.add(f"{gid}.md")
```

改為：

```python
        fm = frontmatter(g, gid, bool(publish_state.get(gid)))
        body = yaml.safe_dump(fm, allow_unicode=True, sort_keys=False, width=1000)
        path = OUT_DIR / f"{gid}.md"
        prose = existing_body(path)
        path.write_text(f"---\n{body}---\n{prose}", encoding="utf-8")
        seen_files.add(f"{gid}.md")
```

（`prose` 預設 `"\n"` 會重現原本的 `---\n...---\n\n`，對空正文檔冪等。）

- [ ] **Step 6: 整合驗證——正文保留 + 全量冪等**

```bash
# 在一個既有檔加入手寫正文
printf '\n## 考據\n測試保留\n' >> content/games/cdg-0001.md
/usr/bin/python3 scripts/build_content.py
grep -q '測試保留' content/games/cdg-0001.md && echo PRESERVED || echo LOST
npm run validate
git checkout content/games/cdg-0001.md   # 還原測試用的正文
```
Expected: 印 `PRESERVED`；validate 顯示 `files: 4144  valid: 4144  errors: 0`。

- [ ] **Step 7: Commit**

```bash
git add scripts/build_content.py scripts/test_build_content.py
git commit -m "feat(pipeline): build_content preserves markdown body across rebuilds"
```

---

## Task 3: `gamesQuery.js` 查詢邏輯（純函式，TDD）

**Files:**
- Create: `src/lib/gamesQuery.js`
- Test: `src/lib/gamesQuery.test.js`

- [ ] **Step 1: 寫失敗測試 `src/lib/gamesQuery.test.js`**

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  normalize, searchGames, decadeOf, vendorsOf, applyFacets,
  sortGames, paginate, deriveFacets, toIndexRecord, NONE,
} from './gamesQuery.js';

const G = [
  { id:'cdg-1', title_zh:'仙劍奇俠傳1', title_aliases:['Chinese Paladin','仙剑奇侠传'], year:1995, developer:'大宇', publisher_tw:['大宇'], genre:'RPG', localization_level:'A' },
  { id:'cdg-2', title_zh:'三國志2', title_aliases:[], year:1991, developer:'KOEI', publisher_tw:['智冠'], genre:'SLG', localization_level:'B' },
  { id:'cdg-3', title_zh:'某遊戲', title_aliases:[], year:null, developer:null, publisher_tw:[], genre:null, localization_level:null },
];

test('normalize strips punctuation and case', () => {
  assert.equal(normalize('A-B C：D'), 'abcd');
});

test('searchGames matches title, english + simplified alias, empty=all', () => {
  assert.equal(searchGames(G, '仙劍').length, 1);
  assert.equal(searchGames(G, 'paladin').length, 1);
  assert.equal(searchGames(G, '仙剑').length, 1);
  assert.equal(searchGames(G, '').length, 3);
});

test('decadeOf', () => {
  assert.equal(decadeOf(1995), '1990s');
  assert.equal(decadeOf(2003), '2000s');
  assert.equal(decadeOf(null), null);
});

test('vendorsOf merges developer + publisher_tw', () => {
  assert.deepEqual(vendorsOf(G[1]), ['KOEI', '智冠']);
});

test('applyFacets: AND across facets, OR within, 未分類 bucket', () => {
  assert.equal(applyFacets(G, { genre:['RPG'] }).length, 1);
  assert.equal(applyFacets(G, { genre:['RPG','SLG'] }).length, 2);
  assert.equal(applyFacets(G, { vendor:['智冠'] }).length, 1);
  assert.equal(applyFacets(G, { genre:[NONE] }).length, 1);
  assert.equal(applyFacets(G, { genre:['RPG'], loc:['B'] }).length, 0);
});

test('sortGames year asc puts null last, desc reverses', () => {
  assert.deepEqual(sortGames(G,'year','asc').map(g=>g.id), ['cdg-2','cdg-1','cdg-3']);
  assert.deepEqual(sortGames(G,'year','desc').map(g=>g.id), ['cdg-3','cdg-1','cdg-2']);
});

test('paginate', () => {
  const r = paginate(G, 1, 2);
  assert.equal(r.items.length, 2);
  assert.equal(r.pages, 2);
  assert.equal(r.total, 3);
});

test('deriveFacets counts incl 未分類', () => {
  const f = deriveFacets(G);
  const genre = Object.fromEntries(f.genre.map(o => [o.value, o.count]));
  assert.equal(genre['RPG'], 1);
  assert.equal(genre[NONE], 1);
});

test('toIndexRecord keeps only index fields', () => {
  const r = toIndexRecord(G[0]);
  assert.deepEqual(
    Object.keys(r).sort(),
    ['developer','genre','id','localization_level','publisher_tw','title_aliases','title_zh','year']
  );
});
```

- [ ] **Step 2: 跑測試確認失敗**

Run: `npm test`
Expected: FAIL — 無法解析 `./gamesQuery.js`（模組不存在）。

- [ ] **Step 3: 實作 `src/lib/gamesQuery.js`**

```js
export const NONE = '未分類';

const PUNCT = /[\s\-_:：·・／/、，,.。！？!?'"“”()（）[\]【】~～]+/g;

export function normalize(s) {
  return (s || '').toLowerCase().replace(PUNCT, '');
}

export function searchGames(games, query) {
  const q = normalize(query);
  if (!q) return games;
  return games.filter(g =>
    normalize(g.title_zh).includes(q) ||
    (g.title_aliases || []).some(a => normalize(a).includes(q))
  );
}

export function decadeOf(year) {
  if (!year) return null;
  return `${Math.floor(year / 10) * 10}s`;
}

export function vendorsOf(g) {
  const v = [];
  if (g.developer) v.push(g.developer);
  for (const p of (g.publisher_tw || [])) v.push(p);
  return v;
}

function facetValues(g, facet) {
  if (facet === 'decade') { const d = decadeOf(g.year); return d ? [d] : [NONE]; }
  if (facet === 'genre') return g.genre ? [g.genre] : [NONE];
  if (facet === 'loc') return g.localization_level ? [g.localization_level] : [NONE];
  if (facet === 'vendor') { const v = vendorsOf(g); return v.length ? v : [NONE]; }
  return [];
}

export function applyFacets(games, selected) {
  return games.filter(g =>
    Object.entries(selected).every(([facet, vals]) =>
      !vals || vals.length === 0 || facetValues(g, facet).some(v => vals.includes(v))
    )
  );
}

export function sortGames(games, key, dir = 'asc') {
  const sign = dir === 'desc' ? -1 : 1;
  const cmp = {
    year: (a, b) => (a.year ?? Infinity) - (b.year ?? Infinity),
    title: (a, b) => a.title_zh.localeCompare(b.title_zh, 'zh-Hant'),
    vendor: (a, b) => (vendorsOf(a)[0] || '').localeCompare(vendorsOf(b)[0] || '', 'zh-Hant'),
  }[key] || (() => 0);
  return [...games].sort((a, b) => sign * cmp(a, b));
}

export function paginate(games, page, size = 50) {
  const total = games.length;
  const pages = Math.max(1, Math.ceil(total / size));
  const p = Math.min(Math.max(1, page || 1), pages);
  return { items: games.slice((p - 1) * size, p * size), total, pages, page: p };
}

export function deriveFacets(games) {
  const acc = { decade: new Map(), genre: new Map(), vendor: new Map(), loc: new Map() };
  const bump = (m, k) => m.set(k, (m.get(k) || 0) + 1);
  for (const g of games) {
    bump(acc.decade, decadeOf(g.year) || NONE);
    bump(acc.genre, g.genre || NONE);
    bump(acc.loc, g.localization_level || NONE);
    const vs = vendorsOf(g);
    if (vs.length) for (const v of new Set(vs)) bump(acc.vendor, v);
    else bump(acc.vendor, NONE);
  }
  const toSorted = m => [...m.entries()].sort((a, b) => b[1] - a[1]).map(([value, count]) => ({ value, count }));
  return { decade: toSorted(acc.decade), genre: toSorted(acc.genre), loc: toSorted(acc.loc), vendor: toSorted(acc.vendor) };
}

export function toIndexRecord(d) {
  return {
    id: d.id,
    title_zh: d.title_zh,
    title_aliases: d.title_aliases || [],
    year: d.year ?? null,
    developer: d.developer ?? null,
    publisher_tw: d.publisher_tw || [],
    genre: d.genre ?? null,
    localization_level: d.localization_level ?? null,
  };
}
```

- [ ] **Step 4: 跑測試確認通過**

Run: `npm test`
Expected: 全部 test PASS（10 個 test）。

- [ ] **Step 5: Commit**

```bash
git add src/lib/gamesQuery.js src/lib/gamesQuery.test.js
git commit -m "feat(site): pure games query module (search/facet/sort/paginate) with tests"
```

---

## Task 4: `games.json` 精簡索引端點（published-gated）

**Files:**
- Create: `src/pages/games.json.ts`

- [ ] **Step 1: 建立端點 `src/pages/games.json.ts`**

```ts
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { toIndexRecord } from '../lib/gamesQuery.js';

export const GET: APIRoute = async () => {
  const all = await getCollection('games', e => import.meta.env.PROD ? e.data.published : true);
  const records = all.map(e => toIndexRecord(e.data));
  records.sort((a, b) => (a.year ?? 9999) - (b.year ?? 9999));
  return new Response(JSON.stringify(records), {
    headers: { 'Content-Type': 'application/json' },
  });
};
```

- [ ] **Step 2: build 並驗證 dev 模式輸出全量**

Run: `npm run build && node -e "const a=require('./dist/games.json');console.log('count',a.length,'keys',Object.keys(a[0]).join(','))"`
Expected: `count 4144 keys id,title_zh,title_aliases,year,developer,publisher_tw,genre,localization_level`（dev/未設 PROD 時為全量；`astro build` 預設 `import.meta.env.PROD` 為 true → 此時應只含已發布筆數，目前為 0）。

  說明：`astro build` 期間 `PROD=true`，故 build 出的 `games.json` 只含 published（現為 0）。要看全量請用 `npm run dev` 後 `curl localhost:4321/games.json`。驗收以「結構正確 + gate 生效」為準：

Run: `npm run build && node -e "const a=require('./dist/games.json');console.log('published-only count',a.length)"`
Expected: `published-only count 0`（目前無已發布；上線前批次發布後此數會成長）。

- [ ] **Step 3: Commit**

```bash
git add src/pages/games.json.ts
git commit -m "feat(site): games.json compact index endpoint (published-gated)"
```

---

## Task 5: 單款詳情頁 `/games/[id]`

**Files:**
- Create: `src/components/DosBar.astro`, `src/components/Infobox.astro`, `src/pages/games/[id].astro`

- [ ] **Step 1: 建立 `src/components/DosBar.astro`**

```astro
---
const { path, right = '' } = Astro.props;
---
<div class="dosbar">
  <span class="dospath">C:\CDOSGAME\{path}\&gt;<span class="cursor"></span></span>
  {right && <span class="doscodes">{right}</span>}
</div>
```

- [ ] **Step 2: 建立 `src/components/Infobox.astro`**

```astro
---
const { g } = Astro.props;
const rows = [
  ['開發', g.developer],
  ['台灣代理', (g.publisher_tw || []).join('、') || null],
  ['內容語言', g.content_language],
  ['開發地區', g.developer_region],
  ['授權', g.license_status],
  ['容量', g.size],
  ['平台', g.platform_note],
  ['別名', (g.title_aliases || []).join('、') || null],
].filter(([, v]) => v);
const codes = (g.release_codes || []).map(rc => `${rc.issuer} ${rc.code}`).join('、');
const editions = (g.editions || []).map(e => e.name).join('、');
---
<div class="infobox-wrap">
  <table class="infobox">
    {rows.map(([k, v]) => <tr><th>{k}</th><td>{v}</td></tr>)}
    {codes && <tr><th>編號</th><td>{codes}</td></tr>}
    {editions && <tr><th>版本</th><td>{editions}</td></tr>}
  </table>
</div>
```

- [ ] **Step 3: 建立 `src/pages/games/[id].astro`**

```astro
---
import { getCollection, render } from 'astro:content';
import Base from '../../layouts/Base.astro';
import DosBar from '../../components/DosBar.astro';
import Infobox from '../../components/Infobox.astro';

export async function getStaticPaths() {
  const games = await getCollection('games', e => import.meta.env.PROD ? e.data.published : true);
  return games.map(e => ({ params: { id: e.data.id }, props: { entry: e } }));
}

const { entry } = Astro.props;
const g = entry.data;
const { Content } = await render(entry);
const hasBody = (entry.body || '').trim().length > 0;
const codeRight = g.catalog_id || (g.release_codes?.[0]?.code) || '';
const fandomUrl = g.references?.fandom
  ? `https://cn-dos-games.fandom.com/zh/wiki/${g.references.fandom}` : null;
---
<Base title={`${g.title_zh}｜中文 DOS 遊戲資料庫`}>
  <article class="game">
    <DosBar path={g.title_zh} right={`${g.id}${codeRight ? ' · ' + codeRight : ''}`} />
    <h1 class="game-title">{g.title_zh}{g.year && <span class="year">{g.year}</span>}</h1>
    <div class="chips">
      {g.genre && <span class="chip chip-genre">{g.genre}</span>}
      {g.localization_level && <span class="chip">{g.localization_level} 在地化</span>}
    </div>
    <div class="cover-placeholder">封面待補</div>
    <Infobox g={g} />
    <section class="prose">
      {hasBody ? <Content /> : <p class="muted">簡介待補</p>}
    </section>
    {(g.references?.omega || fandomUrl || Object.keys(g.external_links || {}).length > 0) && (
      <section class="sources">
        <h2>來源</h2>
        <ul>
          {g.references?.omega && <li><a href={g.references.omega} rel="nofollow">Omega 討論串</a></li>}
          {fandomUrl && <li><a href={fandomUrl} rel="nofollow">Fandom 條目</a></li>}
          {Object.entries(g.external_links || {}).map(([k, v]) => <li><a href={v} rel="nofollow">{k}</a></li>)}
        </ul>
      </section>
    )}
  </article>
</Base>
```

備註：若該 Astro 版本的 glob entry 無 `entry.body`，把 `hasBody` 改為 `const { Content, headings } = await render(entry); const hasBody = headings.length > 0 || /* 用 remarkPluginFrontmatter 或 entry.rendered?.html */`；最穩做法是改判 `entry.rendered?.html?.trim()`。先用 `entry.body`。

- [ ] **Step 4: build 驗證**

Run: `npm run build`
Expected: build 成功、無 error。（prod gate 下目前 0 已發布 → 0 詳情頁；下一步用 dev 實際看畫面。）

- [ ] **Step 5: dev 目視驗證**

Run: `npm run dev`，瀏覽器開 `http://localhost:4321/games/cdg-1564`
Expected: DOS 頂條（左路徑、右 `cdg-1564 · …`、游標閃）、襯線標題 + 年、chips、封面待補、infobox 欄位（null 欄省略）、「簡介待補」、來源外連（若有）。停掉 dev。

- [ ] **Step 6: Commit**

```bash
git add src/components/DosBar.astro src/components/Infobox.astro src/pages/games/[id].astro
git commit -m "feat(site): game detail page (DOS bar + infobox + body + sources)"
```

---

## Task 6: 目錄列表頁 `/games`（前端 island）

**Files:**
- Create: `src/pages/games/index.astro`

- [ ] **Step 1: 建立 `src/pages/games/index.astro`**

```astro
---
import Base from '../../layouts/Base.astro';
---
<Base title="目錄｜中文 DOS 遊戲資料庫">
  <div class="games-layout">
    <aside class="facets" id="facets"></aside>
    <div class="games-main">
      <div class="controls">
        <input id="search" type="search" placeholder="搜尋標題或別名…" />
        <select id="sort">
          <option value="year:asc">年份 ↑</option>
          <option value="year:desc">年份 ↓</option>
          <option value="title:asc">標題</option>
          <option value="vendor:asc">廠商</option>
        </select>
      </div>
      <div id="count" class="count"></div>
      <ul id="results" class="results"></ul>
      <div id="pager" class="pager"></div>
    </div>
  </div>

  <script>
    import { searchGames, applyFacets, sortGames, paginate, deriveFacets } from '../../lib/gamesQuery.js';

    const FACETS = [['decade','年代'],['genre','類型'],['vendor','廠商'],['loc','在地化']];
    const LIMIT = { decade: 99, genre: 99, loc: 99, vendor: 40 };
    let GAMES = [];
    let vendorFilter = '';
    const state = { q:'', sel:{decade:[],genre:[],vendor:[],loc:[]}, sort:'year:asc', page:1 };

    const esc = s => (s ?? '').toString().replace(/[&<>]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));

    function readURL(){
      const p = new URLSearchParams(location.search);
      state.q = p.get('q') || '';
      state.sort = p.get('sort') || 'year:asc';
      state.page = +(p.get('page') || 1);
      for (const [f] of FACETS) { const v = p.get(f); state.sel[f] = v ? v.split('|') : []; }
    }
    function writeURL(){
      const p = new URLSearchParams();
      if (state.q) p.set('q', state.q);
      if (state.sort !== 'year:asc') p.set('sort', state.sort);
      if (state.page > 1) p.set('page', state.page);
      for (const [f] of FACETS) if (state.sel[f].length) p.set(f, state.sel[f].join('|'));
      const qs = p.toString();
      history.replaceState(null, '', location.pathname + (qs ? '?' + qs : ''));
    }

    function compute(){
      let r = searchGames(GAMES, state.q);
      r = applyFacets(r, state.sel);
      const [k, d] = state.sort.split(':');
      return sortGames(r, k, d);
    }

    function render(){
      const filtered = compute();
      const { items, total, pages, page } = paginate(filtered, state.page, 50);
      state.page = page;
      document.getElementById('count').textContent = `${total} 款`;
      document.getElementById('results').innerHTML = items.map(g => `
        <li><a href="/games/${g.id}">
          <span class="r-title">${esc(g.title_zh)}</span>
          <span class="r-meta">${g.year ?? '—'} · ${esc(g.developer || g.publisher_tw[0] || '—')} · ${esc(g.genre || '—')} · ${g.localization_level || '—'}</span>
        </a></li>`).join('');

      const pg = document.getElementById('pager');
      pg.innerHTML = '';
      if (pages > 1) {
        const prev = mkBtn('上一頁', page > 1, () => { state.page--; render(); });
        const next = mkBtn('下一頁', page < pages, () => { state.page++; render(); });
        const mid = document.createElement('span');
        mid.textContent = ` ${page} / ${pages} `;
        pg.append(prev, mid, next);
      }
      renderFacets();
      writeURL();
    }

    function mkBtn(label, enabled, fn){
      const b = document.createElement('button');
      b.textContent = label; b.disabled = !enabled; b.onclick = fn;
      return b;
    }

    function renderFacets(){
      const opts = deriveFacets(GAMES);
      const host = document.getElementById('facets');
      host.innerHTML = '';
      for (const [key, label] of FACETS) {
        const sec = document.createElement('section');
        sec.className = 'facet';
        sec.innerHTML = `<h3>${label}</h3>`;
        if (key === 'vendor') {
          const vf = document.createElement('input');
          vf.className = 'vfilter'; vf.placeholder = '篩廠商…'; vf.value = vendorFilter;
          vf.oninput = e => { vendorFilter = e.target.value; renderFacets(); };
          sec.append(vf);
        }
        let list = opts[key];
        if (key === 'vendor' && vendorFilter)
          list = list.filter(o => o.value.includes(vendorFilter));
        for (const { value, count } of list.slice(0, LIMIT[key])) {
          const checked = state.sel[key].includes(value);
          const lab = document.createElement('label');
          lab.innerHTML = `<input type="checkbox" ${checked ? 'checked' : ''}> ${esc(value)} <span class="c">${count}</span>`;
          lab.querySelector('input').onchange = e => {
            if (e.target.checked) state.sel[key].push(value);
            else state.sel[key] = state.sel[key].filter(v => v !== value);
            state.page = 1; render();
          };
          sec.append(lab);
        }
        host.append(sec);
      }
    }

    document.getElementById('search').addEventListener('input', e => { state.q = e.target.value; state.page = 1; render(); });
    document.getElementById('sort').addEventListener('change', e => { state.sort = e.target.value; state.page = 1; render(); });

    (async () => {
      readURL();
      document.getElementById('search').value = state.q;
      document.getElementById('sort').value = state.sort;
      GAMES = await (await fetch('/games.json')).json();
      render();
    })();
  </script>
</Base>
```

- [ ] **Step 2: dev 目視驗證（含發布一筆以看到資料）**

```bash
/usr/bin/python3 scripts/publish.py cdg-1564 cdg-0211 cdg-0214    # 暫時發布幾筆以便 dev 看；dev 本就全看，prod 才需發布
```
Run: `npm run dev`，開 `http://localhost:4321/games`
Expected: 左側 facets（年代/類型/廠商[含篩廠商框]/在地化，各帶計數與未分類）、搜尋即時過濾、排序、分頁、結果計數；點一列進詳情；改動時網址 query 更新。試 `http://localhost:4321/games?decade=1990s` 應預套年代篩選。停掉 dev。

  （`publish.py` 的暫時發布只影響 prod gate，可於收尾還原：`/usr/bin/python3 scripts/publish.py --off cdg-1564 cdg-0211 cdg-0214` 後 `build_content`，或留待真正策展時統一處理。）

- [ ] **Step 3: Commit**

```bash
git add src/pages/games/index.astro
git commit -m "feat(site): /games browse list (search + facets + sort + paginate + URL sync)"
```

---

## Task 7: 首頁 `/`

**Files:**
- Modify: `src/pages/index.astro`（取代 Task 1 占位）

- [ ] **Step 1: 取代 `src/pages/index.astro`**

```astro
---
import Base from '../layouts/Base.astro';
import { getCollection } from 'astro:content';

const all = await getCollection('games');
const total = all.length;
const published = all.filter(e => e.data.published).length;
const decades = ['1980s', '1990s', '2000s'];
---
<Base title="中文 DOS 遊戲資料庫">
  <section class="hero">
    <h1>中文 DOS 遊戲資料庫</h1>
    <p>盡可能齊全、重考據的中文 DOS 時代遊戲結構化資料庫。</p>
    <p class="stats">已收錄 {total} 款 · 已發布 {published} 款</p>
  </section>
  <section class="entry">
    <a class="btn" href="/games">瀏覽全部</a>
    <button class="btn" id="random">隨機一款</button>
  </section>
  <section class="decades">
    {decades.map(d => <a href={`/games?decade=${d}`}>{d}</a>)}
  </section>
  <script>
    document.getElementById('random')?.addEventListener('click', async () => {
      const g = await (await fetch('/games.json')).json();
      if (g.length) location.href = `/games/${g[Math.floor(Math.random() * g.length)].id}`;
    });
  </script>
</Base>
```

備註：`getCollection('games')` 不過 gate，故 `total` 永遠是全量 4144（透明呈現「收錄 vs 已發布」），`published` 反映目前發布數。

- [ ] **Step 2: build 驗證**

Run: `npm run build`
Expected: build 成功；`dist/index.html` 含「已收錄 4144 款」。
Run: `grep -o '已收錄 4144 款' dist/index.html`
Expected: 印出 `已收錄 4144 款`。

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat(site): home page (stats + browse/random/decade entry points)"
```

---

## Task 8: 關於頁 `/about`

**Files:**
- Create: `src/pages/about.astro`

- [ ] **Step 1: 建立 `src/pages/about.astro`**

```astro
---
import Base from '../layouts/Base.astro';
---
<Base title="關於｜中文 DOS 遊戲資料庫">
  <article class="prose">
    <h1>關於本資料庫</h1>
    <p>「中文 DOS 遊戲資料庫」（cdosgame）盡可能完整收錄 DOS 時代（與周邊早期平台）的中文遊戲，重在齊全與考據，定位為百科／資料庫式工具書。資料為 git-backed 純文字檔，平台中立。</p>

    <h2>收錄準則</h2>
    <ul>
      <li>收錄有實際發行的遊戲；台灣產品導向（以台灣發行／代理為主）。</li>
      <li>中文化分級全收再用標記篩選：A 原生中文開發、B 官方中文版／代理中文化、D 僅包裝中文。</li>
      <li>缺資料以空值表示、不剔除；每筆力求可查證、附來源。</li>
    </ul>

    <h2>資料來源</h2>
    <p>主清單以青衫之友為骨幹，並交叉比對 rwv、Omega 數位典藏、Fandom（cn-dos-games）、骨灰集散地、軟體世界、OfflineList（cndosgames）等多源整合。各筆保留 provenance 與外部參考連結。</p>

    <h2>圖片與授權</h2>
    <p>v1 暫不收錄封面／截圖（多來源授權尚待釐清）；封面位置顯示「待補」。資料本身以考據與結構化欄位為主。</p>

    <p class="muted">本站為靜態站，內容持續增補。</p>
  </article>
</Base>
```

- [ ] **Step 2: build 驗證**

Run: `npm run build`
Expected: build 成功、`dist/about/index.html` 產生。

- [ ] **Step 3: Commit**

```bash
git add src/pages/about.astro
git commit -m "feat(site): about page (scope + sources + licensing)"
```

---

## Task 9: 收尾——全量驗證與一致性

**Files:**（無新檔；驗證 + 可能微調）

- [ ] **Step 1: 全測試 + 驗證 + build**

Run: `npm test && npm run validate && npm run build`
Expected: JS 測試全綠；`files: 4144  valid: 4144  errors: 0`；`astro build` 成功無 error。

- [ ] **Step 2: 還原測試期間的暫時發布（若有）**

```bash
/usr/bin/python3 scripts/publish.py --list
```
若 Task 6 留有暫時發布且不打算保留：`/usr/bin/python3 scripts/publish.py --off <那些 id>` 後 `/usr/bin/python3 scripts/build_content.py && npm run validate`。
（正式上線前的批次發布屬獨立策展步驟，不在本計畫。）

- [ ] **Step 3: 確認無殘留 Astro 預設樣式 / dist 不入版控**

```bash
grep -rn "astro" .gitignore || echo 'dist/' >> .gitignore
grep -q '^dist' .gitignore && echo 'dist ignored' || true
grep -q '^node_modules' .gitignore && echo 'node_modules ignored' || echo 'node_modules/' >> .gitignore
```
Expected: `dist/` 與 `node_modules/` 都在 `.gitignore`。

- [ ] **Step 4: Commit 收尾**

```bash
git add .gitignore
git commit -m "chore(site): gitignore dist; Phase 1 verification pass"
```

---

## Self-Review 對照（撰寫者已核）

- **Spec 覆蓋**：首頁→Task 7；`/games` 搜尋/facets/排序/分頁/URL→Task 3+6；詳情→Task 5；about→Task 8；`build_content` 正文保留→Task 2；`games.json`+發布閘→Task 4；視覺 token/DOS 條/零 Astro 預設→Task 1+5；缺值容錯→gamesQuery 未分類 + infobox 過濾空值（Task 3/5）；測試/驗收→各任務 + Task 9。`系列` facet 已於 spec 列為 Phase 2，故本計畫不含（一致）。
- **型別一致**：`gamesQuery.js` 匯出名稱（`searchGames/applyFacets/sortGames/paginate/deriveFacets/toIndexRecord/NONE/decadeOf/vendorsOf/normalize`）於 Task 3 定義，Task 4（`toIndexRecord`）與 Task 6（其餘）一致引用。`state.sel` 鍵 `decade/genre/vendor/loc` 與 `facetValues`／`FACETS` 一致。
- **無 placeholder**：每段含完整可貼上的程式碼與確切指令／預期輸出。
```
