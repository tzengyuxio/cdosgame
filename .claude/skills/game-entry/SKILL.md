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
- `genre`：22 個 v2 key 之一（**存 key、非中文名**，如 `SLG`／`RPG`／`HSG`）；7 group、各類定義與判準（HSG＝光榮/三國志 like、戀愛養成分 LSG/AVG 等）見 `docs/genre-taxonomy.md`。中文顯示名由 `src/lib/labels.js` 推導。
- `localization_level`：native／localized／packaging／foreign（依原生開發 vs 代理中文化）。
- `developer_region`：開發商所在地（TW/JP/…）——**會影響關聯區塊**（台灣開發商只列開發商）。
- `size`：數量前置；CD/DVD 雙版本用全形「／」、同版多片用「+」；**不寫純數字 MB／硬碟安裝量**。
- `platform_note`：作業系統平台（`無`=DOS、`Windows`…）。**18 禁不放這裡 → 用 `adult: true`**。
- `adaptation`：改編來源 `{medium, title, author?}`（漫畫/小說/電影…）。
- `staff[]`：`{role, name, person?}`；`person` 填有 /people 頁者的 slug。
- `series` / `dev_team`：字串，連到 `/series`、`/teams`。
- **系列初代標題不帶序號**：首作 `title_zh` 用作品名本身（如「巫術」「國王密使」「大富翁」），**不寫**「巫術1」「國王密使1」；續作才帶數字（巫術2、國王密使2…）。沿用既有 stub 時若初代被標成「…1」應一併訂正，原「…1」可留作 alias。
- **外文遊戲（無中文化）**：`localization_level: foreign`、`publisher_tw: []`、`content_language` 填原文（如 `en`）、`developer_region` 填原國別。
- **軟體世界 貴族版／平價版／珍藏版的外文重發**＝budget 重包裝英文版：標 `localization_level: packaging`＋`license_status: unofficial`＋`content_language: en`＋`publisher_tw`（軟體世界／智冠，沿用既有 sibling）；**僅在無任何台灣發行**（只靠雜誌介紹、水貨流通，如冰城傳奇初代）才用 `foreign`＋`publisher_tw: []`。
- **標題用半形阿拉伯數字**：系列序號寫半形（`宇宙傳奇2`、`冰城傳奇3`），副標分隔用全形冒號（`：`）。沿用舊 stub 常見全形數字（`宇宙傳奇２`），**一律改半形**，`data/id-registry.json` 同步。
- **`release_codes` 別從 `catalog_id` 推導**：`SWT/SWE/SCD…` 是來源側索引，**≠** 珍／貴 編號；珍／貴 release code 只來自 softworld 掃描（`provenance: softworld@boneash-scan`），查無就留空、**別捏造**（別把 `catalog_id: SWT284` 寫成 `珍284`）。
- **研究常挖出既有 frontmatter 誤植**（代理商張冠李戴、開發商國別、localization 等）——順手訂正；存疑處記 `docs/backlog/game-entry-review.md`。

### 4. 寫正文（房屋風格）
- 客觀、繁中、考據嚴謹的**百科散文體**，約 2 段；無行銷腔、無牽強比較、無未考據的「據說」。
- **⚠ 寫成流暢的百科散文，不要「考據筆記」的感覺**（使用者反覆糾正的重點）：嚴謹有據 ≠ 把考證過程寫進正文。避免——研究口吻（「經查／據考／考據顯示／資料顯示」）、過度堆砌來源比對、流水帳、反覆陳述同一資訊、破碎的條列式短句。改以通順敘述**直接陳述事實**，一段一重點、不重複，讀來像百科條目而非研究筆記。（真實的來源分歧仍依下方規則中性並陳，但點到為止、不連篇堆砌。）
- 開頭句型：`《Title》是[公司](/companies/X)於 YYYY 年推出的<類型>，…`；首作點明 `[系列](/series/Y)` 首作。
- 互連：台灣公司／系列／人物／團隊用內部連結（`/companies/…`、`/series/…`、`/people/…`、`/teams/…`）；**外國開發商（無對應頁）用純文字、不連 `/companies`**。
- 段落：① 定位（誰做、何時、類型、系列地位）；② 玩法/特色/歷史/續作/軼事。
- **用詞精確**：「參與」≠「擔綱／主導」，別誇大某人角色；斷言要有來源。
- **正文是百科內文、不是撰寫紀錄**——以下四類務必清掉（來源仍記 frontmatter `references`/`provenance`，正文只陳述事實）：
  1. **不點名資料來源**：散文別出現 chiuinan／青衫之友／Omega／巴哈姆特整理表／表格／站內／registry／Fandom／離線資料庫等；改直接陳述。有 `<sup class="cite">` 引用的保留標籤，只去掉散文裡的來源名。
  2. **刪編輯備忘**：待考／待補／仍待後續補充／暫保留差異待考／重複條目待合併／需分開著錄／補基本 metadata 等整句移除，收在最後一句可查證事實（別用「待補」收尾）。
  3. **裸 id／同名作框架**：`（cdg-XXXX）`、「不可混同／需分開著錄」→ 改自然 cross-link `[標題](/games/cdg-XXXX)` ＋中性的「為不同作品」。
  4. **刪除線／收錄狀態評註**：「以刪除線標示…收錄狀態待考」整段刪，保留中性事實即可（如「軟體世界珍藏版編號 珍XXX」）。
  - **真實的來源分歧保留為事實**（開發商／發行商／年代不同說法，如八爪魚 vs 騰圖、精訊 vs 智冠、品技 vs 台灣晶技）：改「亦有資料記為…／發行資訊有不同說法」的中性並陳，**不點名來源、不加「待考」**。
  - **來源分歧要標出處**：不同記法可中性並陳，但每個記法都應盡量用 `<sup class="cite" data-ref="..."></sup>` 各自標來源；採用理由、未決狀態寫進 progress/backlog，不寫進正文。
- **祕技／攻略等延伸區塊**（body 內的 `## 祕技`、`## 攻略`…）可加，但**建 entry 時不主動蒐集填入**——即使研究過程挖到祕技/攻略也先擱著，待使用者明確要求再補，避免條目膨脹成攻略本。

### 5. 引用與附錄（三段制，詳見 `docs/refs-convention.md`）
- **⚠ 研究用到的每個來源都要落進 `references`**——不論是 stub 既有的（chiuinan/fandom/omega…）或你研究時新查到的（維基、MobyGames、DOS Days、部落格考據…），一律補進 `references`（被正文逐句引用的標 `cited` 給 `[N]`，其餘列 general）。**不可只寫正文、不附來源**；正文寫完務必回頭核對每個事實是否有對應來源在 `references`。
  - **chiuinan 介紹頁**：分兩種情況——①**補既有 stub** 時，若 stub 已有 `references.chiuinan`（介紹頁 URL）就保留；若只有 `provenance: chiuinan@list-1.htm`（列表頁），代表該款出現在 chiuinan 列表，可從列表（list-1.htm）查該款是否連有專屬介紹頁、有就補進 `references.chiuinan`，只在列表無專屬頁則略過。②**新建（無 stub）** 的款，chiuinan 未收錄、`provenance` 也無 chiuinan，不必去找。
  - **⚠ 別只信 derived 的 `intro_todo`**：`derived/chiuinan-games.json` 的 `intro_todo: True` 只代表「尚未抓介紹頁」、**不代表沒有**。要實際抓 `list-1.htm`（693KB，curl 下來 grep 標題找 `href`）——外文遊戲介紹頁多在 `intro/eng/eXX/…`、中文遊戲在 `intro/ch/cXX/…`；即使列表標 `[待補]`／`[待重整]`，頁面通常仍有簡介、台灣代理、版本沿革等實質內容，可收進 `references.chiuinan`（完整 URL `https://chiuinan.github.io/game/game/<href>`）。本批 9 款外文作（幻想空間 6／地下創世紀 2／模擬城市）皆屬此情形。
- **⚠ 連結文字用「頁面標題」、不用站名**（ADR-003 / Daily 2026-06-22，詳見 `docs/refs-convention.md`「連結文字」節）：`chiuinan`/`fandom`/`omega` 沿用固定 label；其餘來源（wikipedia/mobygames/dosdays/部落格…）的 value 用物件 `{ url, title }`，`title` 填**實際抓取的頁面標題**（如「巫術VII：失落的迦地亞 - 維基百科，自由的百科全書」），不可用「維基百科」「痞客邦」這類站名。
- **參考資料**（`references`）＝內容來源；general 來源（chiuinan/fandom/omega…）自動列出、**不編號**。**某句需標來源** → 在 `references.cited` 加一筆（keyed：`<key>: { label, url }`，`label` 即標題；或 legacy：`"標題": url`），正文該句末接 `<sup class="cite" data-ref="<key>"></sup>`——**用 dynamic `data-ref`，不要手寫 `#cite-N`**；編號、backref、`#cite-N` 錨點全由系統自動產生。寫法、編號規則與範例見 `docs/refs-convention.md`〈編號規則〉〈frontmatter 寫法〉。
- **註釋**（`footnotes: ["純文字補充…"]`）＝**無連結**的說明，也可被 `[N]` 引用（編號接在 references 之後 `[k+1…]`）。
- **外部連結**（`external_links`）＝**非來源**的相關連結（重複、無法爬取、延伸備用），不編號。
- **「丟連結」SOP**：使用者貼連結時 → ① 讀內容 → ② 判斷是否據此改寫/增補正文 → ③ 依「**有沒有用作來源**」歸 `references`（被引用再標 cited 給 `[N]`）或 `external_links`。

### 6. 相依實體頁
連到的公司/系列/團隊/人物若尚無頁且值得補 → 建 `content/<kind>/<名>.md`（見 information-architecture.md、company-pages.md）。否則維持純文字即可（PROD 會自動退化未發佈連結）。

### 7. 驗證
`npm run validate`（Zod），修到全綠。

**發佈前自檢清單**（高遺漏項，逐條確認；散文容易漏，照此勾）：
- [ ] 每個正文事實都有對應 `references` 來源（無孤立斷言）
- [ ] 所有外部連結文字用「頁面標題」、非站名（chiuinan/fandom/omega 除外，用固定 label）
- [ ] 既有 stub 的 chiuinan 介紹頁已補進 `references.chiuinan`（新建無 stub 款免）
- [ ] cite 用 dynamic `data-ref`（非 `#cite-N`）
- [ ] 系列初代標題不帶序號（續作才帶數字）
- [ ] 正文是流暢百科散文、無「考據筆記」感（無研究口吻、無堆砌比對、無流水帳）

### 8. 發佈（只在被要求／確認完成時）
- `published: true` 才上 prod；有寫頁的相依實體（公司/系列/團隊/人物）要連帶發佈。
- 指向未發佈遊戲的連結在 PROD 會自動退化成純文字（rehype），**不必為補連結上架空白 stub**。
- 改 `published` 後本地重建要清 `node_modules/.vite` + `.astro` 才生效（見 project memory）。

## Out of Scope

- **勿跑 `build_content`**（已退役，會覆寫手改 frontmatter）。
- 勿順手批改既有款的非請求欄位（資料層校訂走 BACKLOG / 專門批次）。
- 研究與考據品質仍靠人判斷——本 skill 只固化流程與慣例，不保證內容正確。
