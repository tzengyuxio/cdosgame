---
name: game-entry
description: Write or complete one cdosgame game entry (content/games/cdg-NNNN.md) — research the game, fill frontmatter per the Zod schema, write a 考據式 encyclopedia body in house style with cross-links and citations, validate, and (when asked) publish. Use when adding a new game or filling/fixing a stub's 正文. Triggers on "/game-entry", "寫條目", "補正文", "撰寫遊戲條目", "complete game entry", "補這款".
argument-hint: <遊戲名 或 cdg-NNNN>
allowed-tools: Bash, Read, Write, Edit, Glob, Grep, WebSearch, WebFetch
---

# 撰寫遊戲條目（cdosgame）

一則條目 = 一個 `content/games/cdg-NNNN.md`（YAML frontmatter + 正文）。目標是**百科考據式**條目：齊全、可查證、台灣產品導向。content 為 FROZEN 正本，**直接編輯**（勿跑 `build_content`，會覆寫手改）。

## Spec 來源（先讀，勿在此重複）

- **`schema.md`**：欄位定義與所有 enum（唯一權威，照它填）。
- **`CLAUDE.md`** / `docs/id-policy.md`：專案規則、id 政策。
- **既有 ~49 篇已發佈正文**：房屋風格範本（`rg -l '^published: true' content/games` 取樣讀 2–3 篇）。
- **`docs/information-architecture.md`、`docs/company-pages.md`**：實體頁規範。

## Behavior

### 1. 定位或建檔
- 既有款：`rg -n "title_zh: <名>" content/games` 找 `cdg-NNNN`。
- 新款：挑下一個未用 id，並在 `data/id-registry.json`（append-only）補登（見 CLAUDE.md / id-policy）。

### 2. 研究（web，缺料用 null 不杜撰）
來源：維基百科、巴哈姆特、PTT Old-games、青衫之友（chiuinan）、Fandom、bangumi、開發商官網、可信考據部落格/Threads。
查：發行年、開發商＋所在地、台灣發行商、類型、平台、系列、製作人員、改編/18禁、關鍵事實（銷量、里程碑、軼事）。多源交叉驗證。
- **批次多款** → 開平行研究 agent（每 agent 2–3 款），要求回傳「結構化事實＋來源 URL」，自己再核對（subagent 摘要不可照抄）。
- **單一來源的斷言寧可省略或標記**，不寫死：如僅一處說某人是製作者，就先別填 `staff`、改記 `docs/backlog/game-entry-review.md` 待查證。

### 3. 填 frontmatter（照 `schema.md` enum，勿自創）
易錯處速記（完整定義仍以 schema.md 為準）：
- `genre`：10 類控制詞彙之一（角色扮演／戰略角色扮演／冒險解謎／故事劇情／策略／城市建造／模擬養成／教育養成／桌遊棋牌／格鬥／運動動作）。
- `localization_level`：native／localized／packaging／foreign（依原生開發 vs 代理中文化）。
- `developer_region`：開發商所在地（TW/JP/…）——**會影響關聯區塊**（台灣開發商只列開發商）。
- `size`：數量前置；CD/DVD 雙版本用全形「／」、同版多片用「+」；**不寫純數字 MB／硬碟安裝量**。
- `platform_note`：作業系統平台（`無`=DOS、`Windows`…）。**18 禁不放這裡 → 用 `adult: true`**。
- `adaptation`：改編來源 `{medium, title, author?}`（漫畫/小說/電影…）。
- `staff[]`：`{role, name, person?}`；`person` 填有 /people 頁者的 slug。
- `series` / `dev_team`：字串，連到 `/series`、`/teams`。
- **外文遊戲（無中文化）**：`localization_level: foreign`、`publisher_tw: []`、`content_language` 填原文（如 `en`）、`developer_region` 填原國別。
- **研究常挖出既有 frontmatter 誤植**（代理商張冠李戴、開發商國別、localization 等）——順手訂正；存疑處記 `docs/backlog/game-entry-review.md`。

### 4. 寫正文（房屋風格）
- 客觀、繁中、考據語氣，約 2 段；無行銷腔、無牽強比較、無未考據的「據說」。
- 開頭句型：`《Title》是[公司](/companies/X)於 YYYY 年推出的<類型>，…`；首作點明 `[系列](/series/Y)` 首作。
- 互連：台灣公司／系列／人物／團隊用內部連結（`/companies/…`、`/series/…`、`/people/…`、`/teams/…`）；**外國開發商（無對應頁）用純文字、不連 `/companies`**。
- 段落：① 定位（誰做、何時、類型、系列地位）；② 玩法/特色/歷史/續作/軼事。
- **用詞精確**：「參與」≠「擔綱／主導」，別誇大某人角色；斷言要有來源。

### 5. 引用與附錄（三段制）
- 某句需來源 → 加 `references.cited: {"來源標籤": "https://…"}`，句末接 `<sup class="cite"><a href="#cite-N">[N]</a></sup>`；**N 從 1 起、依 cited 宣告順序**。
- chiuinan/fandom/omega 自動進「參考資料」，不必手動。
- 精選延伸連結 → `external_links`。
- 附錄三段＝**註釋**（cited `[N]`）／**參考資料**（來源頁）／**外部連結**。

### 6. 相依實體頁
連到的公司/系列/團隊/人物若尚無頁且值得補 → 建 `content/<kind>/<名>.md`（見 information-architecture.md、company-pages.md）。否則維持純文字即可（PROD 會自動退化未發佈連結）。

### 7. 驗證
`npm run validate`（Zod），修到全綠。

### 8. 發佈（只在被要求／確認完成時）
- `published: true` 才上 prod；有寫頁的相依實體（公司/系列/團隊/人物）要連帶發佈。
- 指向未發佈遊戲的連結在 PROD 會自動退化成純文字（rehype），**不必為補連結上架空白 stub**。
- 改 `published` 後本地重建要清 `node_modules/.vite` + `.astro` 才生效（見 project memory）。

## Out of Scope

- **勿跑 `build_content`**（已退役，會覆寫手改 frontmatter）。
- 勿順手批改既有款的非請求欄位（資料層校訂走 BACKLOG / 專門批次）。
- 研究與考據品質仍靠人判斷——本 skill 只固化流程與慣例，不保證內容正確。
