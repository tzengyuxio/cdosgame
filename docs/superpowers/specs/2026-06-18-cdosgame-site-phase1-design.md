# cdosgame 網站 Phase 1 — 核心遊戲站 設計 spec

日期：2026-06-18　狀態：設計定稿（待寫實作計畫）

## 1. 概述

把已就緒的 4144 款 catalog（`content/games/cdg-NNNN.md`，Zod 驗證）做成可瀏覽、可搜尋、可篩選的靜態站（Astro）。**分階段**：本 spec 只涵蓋 **Phase 1＝核心遊戲站**；公司（cdc）／系列（cds）實體頁屬 **Phase 2**，另開 spec。

**發布模式**：同一套程式碼，**dev 看全部、prod 只看 `published===true`**（沿用既有 `data/publish-state.json` 發布閘）。骨架本身即漸進審核視圖。

## 2. 目標與非目標

**Phase 1 目標**
- 訪客能搜尋／篩選／瀏覽全部遊戲，看單款結構化資料與（若有）考據正文。
- 為「人寫的考據內容」打對地基：`build_content` 重跑不再洗掉正文。
- 視覺自成一格（混合風 + DOS 點綴），**不帶任何 Astro 預設樣式**。

**非目標（Phase 1 不做）**
- 公司／系列**專屬頁面**與 cdc/cds 實體、合併關係、客製公司表 → Phase 2。
- `系列` facet（需 cds 資料）→ Phase 2。
- 圖片自 host（授權未解）→ 之後。
- 即時全文搜尋服務（前端 JSON 篩選已足夠）。
- 將遊戲 `developer` 字串正規化為 `cdc-NNNN` → Phase 2 清理。

## 3. 架構總覽

- **Astro 靜態站**，Content Collections 載入 `content/games/*.md`，schema 用 `schema/game.schema.mjs` 的 `gameSchema`。
- **靜態生成**：首頁、`/about`、每款詳情 `/games/cdg-NNNN`。
- **前端互動**：`/games` 列表頁載入精簡索引 `games.json`，於瀏覽器做搜尋／篩選／排序／分頁（純 vanilla JS，無前端框架）。
- **發布閘**統一在資料來源處過濾：詳情頁 `getStaticPaths` 與 `games.json` 端點都用
  `import.meta.env.PROD ? e.data.published : true`。

```
content/games/*.md ──(getCollection, published-gated)──┐
                                                        ├─→ /games/cdg-NNNN.astro  (靜態詳情)
                                                        ├─→ /games.json            (精簡索引端點)
                                                        └─→ index.astro / about    (靜態)
                                 games.json ──(fetch)──→ /games 前端列表（搜尋/篩選/排序/分頁）
```

## 4. 資料層與 pipeline 變更

### 4.1 `build_content.py`：保留正文（必做地基）
現況：整檔生成（frontmatter + 空白正文），重跑覆寫整檔。
變更：寫檔前**若該 `cdg-NNNN.md` 已存在，讀出其 frontmatter 之後的正文 body 並原樣保留**，只重寫 frontmatter 區塊。新檔正文留空。
- 解析：以第一組 `---\n…\n---\n` 切出 frontmatter 與 body。
- 退役（orphan/改名）：id 變動時舊檔移除、新檔空白正文（罕見，可接受；記於 commit）。
- 驗收：對已有手寫正文的檔重跑 `build_content`，正文不變、frontmatter 更新。

### 4.2 `games.json` 精簡索引（Astro 端點）
`src/pages/games.json.ts`：用 `getCollection`（published-gated）輸出陣列，每筆僅含列表/搜尋所需欄位：
`{ id, title_zh, title_aliases, year, developer, publisher_tw, genre, localization_level }`
- 單一真相＝collection；prod／dev 自動依發布閘產不同內容。
- 量級：dev 全量約數百 KB，可直接前端載入。

### 4.3 發布閘現狀
目前 4144 筆 `published` 全 false → **prod build 會是空站**。dev 是 Phase 1 的工作／展示視圖。上線前需以既有 `scripts/publish.py`／批次寫 `publish-state.json` 發布一批（例如已驗證的 chiuinan 骨幹）——屬**上線前策展步驟，非 Phase 1 建置範圍**。

## 5. 頁面規格

### 5.1 `/` 首頁
- Hero：站名 + 一句定位（「中文 DOS 遊戲資料庫——盡可能齊全、重考據」）。
- 收錄統計：X 款已收錄 / Y 款已發布。
- 入口：**隨機一款**、**依年代瀏覽**（1980s/90s/2000s → 連到帶 year 篩選的 `/games`）。
- 註：「最近發布」需發布時間戳，目前無此欄 → Phase 1 不做。

### 5.2 `/games` 目錄列表（前端互動）
- **搜尋框**：即時比對 `title_zh` + `title_aliases`（正規化：去標點、小寫、簡繁/全半形容錯沿用既有 helper 精神）。
- **Facets**（年代 · 類型 · 廠商 · 在地化等級）：
  - 同一 facet 內多選＝OR；跨 facet＝AND。
  - 廠商＝`developer` ∪ `publisher_tw`（字串），列出現次數高者，長尾可搜尋。
  - 每個 facet 含「**未分類**」桶（篩 null，兼作待補清單）。
  - 點廠商即套用該廠商篩選（Phase 1 無專屬頁）。
- **排序**：年份（升/降）、標題、廠商。
- **分頁**：每頁 50 筆 + 上/下頁 + 結果計數；文字密集條列（無縮圖）。
- 每列：標題 / 年 / 廠商 / 類型 / 在地化等級 → 連往詳情。
- 無結果與全 null 欄位需優雅顯示（「—」）。
- **URL query 同步**：`/games` 從網址 query 讀初始篩選/搜尋/排序狀態，並在互動時更新網址（深連結用）。供首頁「依年代瀏覽」、廠商點擊等帶參數進入，亦利於分享。

### 5.3 `/games/cdg-NNNN` 單款詳情（靜態）
- **DOS 頂條**（樣式 3）：左 `C:\CDOSGAME\{title_zh}\>` + 閃爍游標；右 `cdg-NNNN · {catalog_id 或 release code}`（dim）。
- 標題（襯線）+ 年份；標籤 chips：類型、在地化等級。
- **Infobox 表**：開發 `developer`、台灣代理 `publisher_tw`（join）、內容語言、開發地區、授權 `license_status`、容量 `size`、平台 `platform_note`、別名 `title_aliases`、編號 `release_codes`、版本 `editions[]`。每個缺值列省略或顯「—」。
- **封面**：區位佔位「封面待補」。
- **正文考據**：render markdown body；無則「簡介待補」。
- **來源**：`references`（omega/fandom）、`external_links` 外連；`provenance` 可低調呈現。

### 5.4 `/about` 關於（靜態）
收錄準則（scope.md 精要）、資料來源分級（sources.md 精要）、授權與圖片說明、連回 repo。

## 6. 視覺設計

**混合風**：百科可讀性打底 + 復古點綴。**完全自寫 CSS，不引入任何 Astro starter／預設主題樣式。**

設計 token（暫定，實作可微調）：
- 色：底 `#fffdf9`、文字 `#2b2b2b`、次要 `#999`、邊框 `#e3ddd0`；強調琥珀 `#ffb000`（DOS 條）、連結/系列暖棕 `#a8612a`；DOS 條底 `#0c0c0c`/`#1a1a1a`。
- 字：標題襯線 `Georgia, 'Songti TC', serif`；內文 `-apple-system, 'PingFang TC', sans-serif`；等寬 `'Courier New', ui-monospace`（DOS 條 + id/編號）。
- 元件：infobox 表格、tag chips、DOS 頂條（游標 blink 動畫）、密集列表列。
- 響應式：手機單欄；infobox 與列表在窄螢幕堆疊。

## 7. 缺值與容錯

- 全欄位 nullable：詳情省略空列、列表顯「—」、facet 設「未分類」。
- 4144 筆前端載入需順暢：`games.json` 精簡 + 分頁；搜尋/篩選為純記憶體運算。
- prod 可能 0 已發布 → 站可正常 build 出空列表（不報錯）。

## 8. 測試／驗收

- `npm run validate` 仍全綠（4144、0 錯誤）。
- `build_content` 正文保留：對含手寫正文的樣本檔重跑，body 不變。
- `astro build` 成功；prod 僅生成 published 詳情頁、dev 生成全部。
- 手動：搜尋命中（含英文別名/簡繁）、facets 組合（含未分類）、排序、分頁、詳情 null 欄位優雅、DOS 頂條與樣式呈現符合 mockup。

## 9. 新增檔案結構（預估）

```
astro.config.mjs
package.json                 # 加 astro 依賴
src/
  content.config.ts          # games collection（gameSchema；若 zod×astro:content z 衝突則內聯 schema）
  layouts/Base.astro
  components/                 # DosBar / Infobox / GameRow / Facets / SearchBox …
  pages/
    index.astro
    about.astro
    games/index.astro        # 列表 + 前端 <script> island
    games/[id].astro         # 詳情，getStaticPaths（published-gated）
    games.json.ts            # 精簡索引端點（published-gated）
  styles/global.css          # 自寫 token + 元件樣式
public/                      # favicon 等
scripts/build_content.py     # 修改：保留正文
```

## 10. Phase 2 預告（本 spec 不含）

公司（cdc）／系列（cds）實體：`content/companies/cdc-NNNN.md`、`content/series/cds-NNNN.md` 集合（frontmatter 結構化 + body 自由客製表格）、id-registry、seed 腳本 + worklist 覆核、公司合併（predecessors/successors）、專屬頁（自訂內容疊加自動衍生遊戲清單）、`系列` facet、遊戲 `developer/series` 字串→cdc/cds 正規化。
