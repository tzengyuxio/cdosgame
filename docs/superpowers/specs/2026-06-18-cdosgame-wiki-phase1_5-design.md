# cdosgame 網站 Phase 1.5 — 百科化（互連 + hub 頁 + 外部連結）設計 spec

日期：2026-06-18　狀態：設計定稿（待寫實作計畫）　前置：Phase 1（核心遊戲站）已合併 main

## 1. 概述

Phase 1 做出了「可查詢的資料庫」，但目標是**可自由瀏覽、處處互連、像 Fandom/MobyGames 那樣能順著連結一直逛**的百科。Phase 1.5 補上百科感的本體：**把實體變連結、建 hub 頁、加相關區與分類、聚合分類外部連結**。

不重做 Phase 1，是在其上疊加。沿用發布閘（dev 全看、prod 只看 published）、混合風 + DOS 視覺、純手寫 CSS、無圖。

## 2. 目標與非目標

**目標**
- 詳情頁每個實體（廠商／類型／年份／系列／別名）皆可點 → 對應 hub 頁。
- Hub 頁：類型、年份、年代、廠商、系列——各列出旗下遊戲。
- 每款詳情有「相關」區（同系列／同廠商／同年）可 wander，及 wiki 式分類頁尾。
- MobyGames 式「外部連結」分區（介紹／百科／討論／…），含把青衫介紹連結補進資料。
- 新增 `series` 欄位並 seed 一批高信心系列。

**非目標（Phase 1.5 不做）**
- 遊戲 `developer`/`series` 字串→`cdc`/`cds` id 正規化（仍以字串聚合；id 化後續）。
- 廠商的客製內容頁／合併關係（軟體世界特製表、宇峻奧丁合併）——延後。
- 角色／製作人（`cdp`）頁、credits。
- 圖片自 host、攻略來源爬取（攻略外連分類先留位、有資料再填）。
- 留言／編輯貢獻機制（見 BACKLOG）。

## 3. 資料模型變更

### 3.1 新增 `series` 欄位
- `schema/game.schema.mjs`：加 `series: z.string().nullable().default(null)`（系列名字串；cds id 化後續）。
- `scripts/seed_series.py`（新）：讀 master，依正規化基底標題（沿用 `merge_sources` 的 `base()`/`group_key()` 概念，去編號/標點）分組，對 **≥2 款**的群組產生草稿系列名，輸出 `data/series-draft.json`。
- `data/series-decisions.json`（新，人工策展）：`{ "遊戲title_zh 或 群組key": "系列名" }`，先填高信心系列（仙劍奇俠傳、軒轅劍、三國志、炎龍騎士團、大富翁、金庸群俠傳…）。
- `build_content.py`：依 `series-decisions.json` 把 `series` 寫入 frontmatter（無對應則 null）。
- v1.5 ship 一批已確認系列；其餘 null（不顯示系列連結），漸進補。

### 3.2 青衫介紹連結補進資料
- `derived/chiuinan-screenshots.json`（2276 筆 `{title_zh, intro_url}`）→ 以 `title_zh` join master，補 `references.chiuinan = intro_url`。
- 落點：`build_master.py`（或 `build_content` 前的 enrich 步）新增此 join；schema `references` 加可選 `chiuinan: z.string().url().optional()`。
- 效益：約 2200+ 款獲得「介紹」外連。

### 3.3 外部連結的呈現模型（不大改 schema）
維持既有 `references{omega?,fandom?,chiuinan?}` + `external_links: record`，**於渲染時映射成分類**：

| 來源欄位 | 分類標籤 | 連結文字 |
|---|---|---|
| `references.chiuinan` | 介紹 | 青衫之友 介紹頁 |
| `references.fandom` | 百科 | Fandom 條目（`https://cn-dos-games.fandom.com/zh/wiki/<title>`）|
| `references.omega` | 討論 | Omega 討論串 |
| `external_links{label:url}` | 相關 | label（原樣）|

未來「攻略」分類＝新增 reference 類型或 external_links，不改本結構。

## 4. Hub 頁

各 hub 用 `getStaticPaths` 從 **gated** 的 `getCollection('games')` 推導 key、列出旗下遊戲（依年份排序），頁頂顯示計數。

| 路徑 | key 來源 | 內容 |
|---|---|---|
| `/genres/[genre]` | `genre` enum（11 類） | 該類型全部遊戲 |
| `/years/[year]` | `year`（1981–2024） | 該年遊戲 |
| `/decades/[decade]` | `decadeOf(year)`（1980s…） | 該年代遊戲 |
| `/companies/[name]` | `developer` ∪ `publisher_tw` 字串 | 該公司：開發 N 款／台灣發行 M 款（分區） |
| `/series/[series]` | `series` 欄位（已 seed 者） | 該系列各作（依年份） |

- URL 用 `encodeURIComponent`（中文 key 可入 URL）。
- 列表頁 `/games` 既有的廠商 facet 點擊維持「過濾 /games」；hub 頁是「專屬頁」入口（從詳情頁／分類頁尾進入）。
- 另建索引頁：`/genres`、`/years`、`/companies`、`/series` 列出所有 key（廠商本土／主要優先＋海外 A–Z，沿用 Phase 1 共識）。`/companies`、`/series` 為本次新增的「列表頁」。

## 5. 互連（把死文字變連結）

- **詳情頁 infobox**：`developer`→`/companies/<dev>`；`publisher_tw[]`→各自 `/companies/`；`genre`→`/genres/`；`series`→`/series/`；`year`→`/years/`；`developer_region`/`localization_level` 維持文字或連到篩選（v1.5 可只連 genre/year/company/series 四主軸）。
- **標籤 chips**：類型／系列 chip 變連結。
- **`/games` 列表列**：整列已是連向詳情的 `<a>`，**不在列內再放實體連結**（巢狀錨點非法）；列表頁的互連靠既有 facets。實體連結集中在詳情頁與 hub 頁。

## 6. 相關區（wander）

詳情頁底部（外部連結之上）加區塊，資料於 build 時由共享 helper 算：
- **同系列**：同 `series` 其他款（依年份）。
- **同廠商**：同 developer 或同 publisher_tw 其他款（取前 N，如 12，多則「查看全部」連 hub）。
- **同年**：同 `year` 其他款（取前 N，連 `/years/<y>`）。
無資料的區塊不顯示。

## 7. 分類頁尾

詳情頁最底 wiki 式分類列：`分類：<年>年遊戲 · <廠商> · <類型> · <系列>`，各為 hub 連結。缺項略。

## 8. 外部連結分區

詳情頁「外部連結」section，依 §3.3 映射分組顯示（介紹／百科／討論／相關）；每連結外開（`target=_blank rel="noopener nofollow"`）、附來源小標。整段在無任何外連時不顯示。

## 9. 共享查詢 helper

擴充 `src/lib/gamesQuery.js`（純函式、node:test 覆蓋）：
- `groupBy(games, keyFn)` 通用分組；
- `companiesOf`/沿用 `vendorsOf`；`seriesOf(g)=g.series`；
- `relatedFor(game, all)` → `{ sameSeries[], sameCompany[], sameYear[] }`（去掉自身、各截上限）；
- hub 索引建構：`distinctGenres/Years/Companies/Series(all)`（含計數，排序）。
Hub 頁與詳情頁於 Astro build 時呼叫這些 helper（吃 gated collection）。

## 10. 視覺

- **詳情頁改 wiki 雙欄**：左 article（標題、chips、簡介/考據正文、相關區、外部連結），右 infobox（連結化欄位）；窄螢幕單欄堆疊。
- **Hub 頁**：標題（如「大宇 的遊戲」）＋計數＋遊戲清單（密集列、連詳情）；廠商頁分「開發／台灣發行」兩區。
- 連結樣式：內部實體連結（藍、虛線底）；分類標籤沿用棕 chip；外部連結附 ↗ 與來源小標。沿用 Phase 1 token，新增最少量 CSS class。

## 11. 邊界與發布閘

- Hub `getStaticPaths` 從 gated 集合推導 → prod 只生成「有已發布成員」的 hub；dev 全有。
- 相關區／hub 成員清單同樣只含 gated 集合（prod 不外連到未發布詳情頁）。
- 缺值：無 series/無外連/無相關 → 該區不顯示。company key 用字串，注意同名歸併以字串相等為準（cdc 正規化後續）。

## 12. 測試／驗收

- `gamesQuery.js` 新 helper：node:test 覆蓋 `groupBy`、`relatedFor`（同系列/廠商/年、去自身、截上限）、distinct/計數。
- `seed_series.py`：對小樣本驗證分組（三國志1-6 同組、仙劍1-3 同組、不同名不同組）。
- chiuinan 介紹 join：驗證 references.chiuinan 數量級（~2200）、validate 全綠。
- `npm run build` 成功；temp-publish 一批後驗證：詳情頁有連結/相關/分類/外連、hub 頁生成且列出成員、互連可點達。
- playwright runtime 煙霧測試（詳情→廠商 hub→另一款→系列 hub，順著逛）。

## 13. 檔案結構（預估）

```
schema/game.schema.mjs              # +series, +references.chiuinan
scripts/seed_series.py              # 新：系列分組草稿
scripts/build_master.py 或 enrich   # +chiuinan intro join
scripts/build_content.py            # +series 寫入
data/series-draft.json              # 生成
data/series-decisions.json          # 人工策展（首批）
src/lib/gamesQuery.js               # +groupBy/relatedFor/distinct*；+test
src/lib/hubs.js (選)                # hub 索引建構（或併入 gamesQuery）
src/components/ExternalLinks.astro  # 外部連結分區
src/components/RelatedGames.astro   # 相關區
src/components/CategoryFooter.astro # 分類頁尾
src/pages/genres/index.astro + [genre].astro
src/pages/years/[year].astro  (+ /years index 選)
src/pages/decades/[decade].astro
src/pages/companies/index.astro + [name].astro
src/pages/series/index.astro + [series].astro
src/pages/games/[id].astro          # 改：互連 + 相關 + 分類 + 外連 + 雙欄
src/components/Infobox.astro        # 改：欄位連結化
src/styles/global.css               # +hub/wiki/link 樣式
```

## 14. 後續（Phase 2，本 spec 不含）

`cdc`/`cds` id 正規化、廠商客製內容頁與合併關係、角色/製作人、攻略來源爬取、圖片授權與自 host、留言/編輯貢獻。
