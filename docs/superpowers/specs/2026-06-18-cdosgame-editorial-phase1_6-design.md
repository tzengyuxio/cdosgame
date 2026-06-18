# cdosgame Phase 1.6 — 編輯內容機制 + 版面重設計 設計 spec

日期：2026-06-18　狀態：設計定稿（mockup 已確認）　前置：Phase 1.5（百科化）已合併 main

## 1. 概述

Phase 1.5 互連通了，但頁面骨感、缺「人寫的內容」，仍像資料庫。Phase 1.6 解決三點：**首頁空、廠商頁=純 table、系列索引=tag 牆**。做法：建**公司／系列編輯內容機制**（手寫簡介疊在自動聚合上，先做機制、資料後補）＋**版面文章化／卡片化重設計**。沿用發布閘、混合風 + DOS、純 CSS、無圖。

## 2. 目標與非目標

**目標**
- 公司／系列頁：文章式（簡介＋infobox＋代表作＋作品清單）；有寫簡介就疊上、沒寫走模板。
- 首頁：策展 landing（經典系列／主要廠商／年代／類型卡片入口）。
- 系列／廠商／類型索引：卡片化、有層次，取代 tag 牆。
- 機制完整、不必先寫完所有簡介（seed 1–2 個示範即可）。

**非目標**
- 不寫滿所有公司／系列簡介（資料後補，漸進）。
- 不做 cdc/cds id 正規化、公司合併關係、角色頁、圖片、留言（後續）。
- `三國志` 等前綴系列的細拆留待 series-decisions 漸進處理。

## 3. 資料模型：公司／系列編輯內容集合（新）

兩個**可選**的 Astro content collection，**以實體字串為 id**（= 遊戲資料中的 developer/publisher 字串、series 名），用於與自動聚合 join：

- `content/companies/<name>.md`
  - frontmatter：`name_zh`（顯示名，可與 id 不同，如 id「大宇」顯示「大宇資訊」）、`aliases?: string[]`、`name_en?`、`founded?: number`、`region?`、`website?: url`、`featured_series?: string[]`、`featured_games?: string[]`（cdg id 或標題）。
  - body：公司簡介／沿革（markdown，永不被覆寫）。
- `content/series/<name>.md`
  - frontmatter：`name_zh`、`aliases?`、`lead_developer?`、`summary?`（一句，給索引卡片）。
  - body：系列簡介。

**join**：頁面用實體字串（developer/series 名）查對應 content entry（`id === name`）；查無 → 走純模板（只有自動聚合）。檔名用實體字串（中文檔名 OK）。schema 於 `content.config.ts` 定義（Astro 的 z）。

seed 示範：`content/companies/大宇.md`、`content/series/仙劍奇俠傳.md`（證明機制；其餘後補）。

## 4. 衍生 helper（供卡片／首頁）

擴充 `src/lib/gamesQuery.js`（node:test）：
- `yearRange(games)` → `{min,max}|null`（系列／公司年代範圍）。
- `topValue(games, keyFn)` → 出現最多的值（系列的主廠商 = 成員中最常見 developer）。
- 首頁／索引的「top N」用既有 `distinctValues`。

## 5. 頁面重設計

### 5.1 首頁 `/`（策展 landing）
資料驅動、免手寫：
- Hero：站名＋一句定位＋統計（X 款 · N 系列 · M 廠商）＋隨機探索。
- **經典系列**：seed 的 16 系列（或依款數）卡片（名＋年代範圍＋款數＋前幾款連結）。
- **主要廠商**：`distinctValues(vendorsOf)` 取 top ~12，膠囊帶款數。
- **依年代**：1980s/90s/2000s（帶數）。
- **依類型**：11 genre chips。

### 5.2 廠商頁 `/companies/[name]`（文章式）
- DosBar：`C:\CDOSGAME\COMPANIES\<name>\>`。
- 左 main：h1（content 的 `name_zh` 或 name）＋小字（name_en · 開發 N · 代理 M）＋**簡介**（content body，有才顯示）＋**代表作**（content `featured_games`，無則略）＋**開發（N）**清單＋**台灣發行／代理（M）**清單（雙欄密集）。
- 右 infobox：英文名、成立、地區、代表系列、作品數、官網（皆來自 content frontmatter，有才顯示；作品數恆顯示）。
- 無 content 檔 → 只有 h1 + 兩個清單（等同現狀但版型一致）。

### 5.3 系列頁 `/series/[series]`（文章式）
- h1 系列名＋款數；**簡介**（content body，有才顯示）；infobox（主廠商[derive]、年代範圍、款數、content frontmatter 補充）；成員清單（依年份）。

### 5.4 系列索引 `/series`（卡片）
每系列一張卡：名＋主廠商（derive）＋年代範圍＋款數＋`summary`（content frontmatter，有才顯示）。grid 卡片，非 tag 牆。

### 5.5 廠商索引 `/companies`（分層）
- **主要廠商**：top ~24（依款數）膠囊／卡片。
- **全部**：其餘依款數的精簡清單（避免 1466 筆平鋪 tag 牆）。

### 5.6 類型索引 `/genres`（卡片）
11 類，每類卡片（名＋款數＋代表作幾款），非裸連結。

## 6. 視覺

沿用混合風 + DOS token；新增卡片（`.scard`）、膠囊（`.vend`）、文章雙欄（沿用 `.game-wiki` 體系或新增 `.entity-*`）、雙欄密集清單（`columns:2`）。純手寫 CSS。

## 7. 邊界與發布閘

- 公司／系列頁 getStaticPaths 仍從 **gated 遊戲集合**推導（prod 只含有已發布成員者）。content overlay 為可選查找。
- 首頁統計／卡片用 gated 集合（prod 數字反映已發布）。
- 缺 content → 模板；缺欄位 → 該列略。

## 8. 測試／驗收

- 新 helper `yearRange`/`topValue` node:test。
- content collections schema 驗證（seed 檔通過）。
- build 成功；temp-publish 後驗證：有 seed 的公司頁顯示簡介＋infobox 補充；無 seed 的走模板；首頁卡片成形；系列索引為卡片。
- playwright：首頁 → 經典系列卡 → 系列頁（有簡介）→ 主廠商 → 公司頁（大宇，有簡介＋infobox）。

## 9. 檔案結構（預估）

```
src/content.config.ts                 # 改：+companies, +series collections + schemas
content/companies/大宇.md             # seed 示範
content/series/仙劍奇俠傳.md          # seed 示範
src/lib/gamesQuery.js                 # +yearRange/topValue (+test)
src/components/EntityInfobox.astro    # 公司/系列 infobox
src/components/SeriesCard.astro / CompanyCapsule.astro（或內聯）
src/pages/index.astro                 # 改：策展 landing
src/pages/companies/[name].astro      # 改：文章式 + content overlay
src/pages/companies/index.astro       # 改：分層卡片
src/pages/series/[series].astro       # 改：文章式 + content overlay
src/pages/series/index.astro          # 改：卡片
src/pages/genres/index.astro          # 改：卡片
src/styles/global.css                 # +card/capsule/entity/columns 樣式
```

## 10. 後續（不含）

寫滿公司／系列簡介；cdc/cds id 化、公司合併、角色頁、圖片、留言、攻略來源。
