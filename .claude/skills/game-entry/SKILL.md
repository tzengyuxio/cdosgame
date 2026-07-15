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
- 既有款：`rg -n "title_zh: <名>" content/games` 找 `cdg-NNNN`；**批次比對改用英文名/別名**（短中文名會誤中同名作與系列成員）。
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
- `release_status`：發行確定性，**預設 `released` 可省略**。流產／未上市標 `unreleased`、有報導/廣告但查無實體標 `unverified`（佐證寫進正文＋footnotes，別只標 enum）。收錄邊界＝有公開產品足跡即可（不限已上市）；見 `scope.md` §5。
- `size`：數量前置；CD/DVD 雙版本用全形「／」、同版多片用「+」；**不寫純數字 MB／硬碟安裝量**。
- `platform_note`：作業系統平台（`無`=DOS、`Windows`…）。**18 禁不放這裡 → 用 `adult: true`**。
- `adaptation`：改編來源 `{medium, title, author?}`（漫畫/小說/電影…）。
- `staff[]`：`{role, name, person?}`；`person` 填有 /people 頁者的 slug。**收錄範圍**（完整定義見 schema.md）：台灣研發團隊/人員為主 → 其次中國大陸與香港人員 → 再次為日本/歐美**知名人士**（赤井孝美、Trevor Chan、Sid Meier、竹井正樹 等）；外商作品的一般開發人員不入。**署名照 credit 原樣**，勿把假名/英文名漢字化（曾誤把 たかしあきら 寫成「高志明」、給 Trevor Chan 杜撰「陳嘉倫」「陳鶴鳴」）。
- `series` / `dev_team`：字串，連到 `/series`、`/teams`。
- **`catalog_id` vs `release_codes`（兩者別搞混，最常見誤填）**：
  - `catalog_id`（單一字串、可 null）＝**外部典藏／資料庫的交叉參照碼**（chiuinan 等站的 `SCD`／`SWT`／`JXD`／`3WZ`… 索引碼，供來源比對/去重，registry 以 `cat:<code>` 當 key）。**不是廠商自家編號**。
  - `release_codes[]`（`issuer`+`code`）＝**廠商自家在產品上標的發行/編目編號**：第三波型錄碼 `511000NNN`／`53196G`／`53197G`／`53185J`／`53186J`、包裝碼 `PC`／`710`（同流水號）、軟體世界 貴/珍/平版碼，**一律放這裡**（`issuer: 第三波` 等）。
  - ⚠ **型錄碼 `511000`／`53186J` 等一律進 `release_codes(issuer 第三波)`、不放 `catalog_id`**（16BIT 舊條目曾把 511000 放 catalog_id，已批次校正歸位）。第三波編號體系全貌見 `content/topics/第三波綜合軟體目錄.md` 附錄。
**⚠ 邊角案例 traps**（撞到再翻 **`references/frontmatter-gotchas.md`** 取完整規則與範例）：
- **系列初代標題不帶序號**（首作用作品名本身，續作才帶數字；舊 stub「…1」訂正、留 alias）
- **外文遊戲（無中文化）** 的 `foreign`＋`publisher_tw: []`＋原文/原國別 欄位組合
- **軟體世界 貴族/平價/珍藏版** 外文重發標 `packaging`＋`unofficial`（僅完全無台灣發行才用 `foreign`）
- **標題半形阿拉伯數字**（序號半形、副標全形冒號；舊 stub 全形一律改半形並同步 id-registry）
- **同中文名不同款消歧義**：加全形括號後綴，維度按決策鏈選——①外文款有知名英文原名→英文名；②否則→年份（西元四位）；③年份分不開→發行商；④再不行→平台/地區。撞名時**兩筆都加**、裸名進 `title_aliases`；消歧義 ≠ 版本命名。正本規則見 `docs/id-policy.md`〈同名消歧義〉
- **`release_codes`（珍/貴/平）查法＋誤掛紅旗**（softworld `name_en` 反查，**別**從 `catalog_id` 推；foreign＋空 publisher 卻有碼＝紅旗）
- **研究挖出既有 frontmatter 誤植** 順手訂正，存疑記 `docs/backlog/game-entry-review.md`

### 4. 寫正文（房屋風格）
- 客觀、繁中、考據嚴謹的**百科散文體**，約 2 段；無行銷腔、無牽強比較、無未考據的「據說」。
- **⚠ 寫成流暢的百科散文，不要「考據筆記」的感覺**（使用者反覆糾正的重點）：嚴謹有據 ≠ 把考證過程寫進正文。避免——研究口吻（「經查／據考／考據顯示／資料顯示」）、過度堆砌來源比對、流水帳、反覆陳述同一資訊、破碎的條列式短句。改以通順敘述**直接陳述事實**，一段一重點、不重複，讀來像百科條目而非研究筆記。（真實的來源分歧仍依下方規則中性並陳，但點到為止、不連篇堆砌。）
- 開頭句型：`《Title》是[公司](/companies/X)於 YYYY 年推出的<類型>，…`；首作點明 `[系列](/series/Y)` 首作。
- 互連：台灣公司／系列／人物／團隊用內部連結（`/companies/…`、`/series/…`、`/people/…`、`/teams/…`）；**外國開發商（無對應頁）用純文字、不連 `/companies`**。
- 段落：① 定位（誰做、何時、類型、系列地位）；② 玩法/特色/歷史/續作/軼事。
- **分節與 TOC（僅篇幅特長的旗艦條目）**：一般條目主敘事維持連續段落、**不分 `##`**（`##` 平時只給祕技/攻略等附加區塊）。唯有極長條目（如仙劍 cdg-1564）才分節，用**通用節標題**、避免「A與B」式合併標題：`開發`／`遊戲內容`（或 `玩法`）／`劇情`／`發行`／`市場反應`／`影響`，遊戲特有節可自訂（如 `Sega Saturn 版`）。首段（前言）不加標題。分節時可在前言後加內文 TOC：`<nav class="toc">` 包一個 markdown 清單（前後留空行才會被解析），錨點用各 heading 的 github-slugger id（CJK 保留原字、英數空格轉小寫連字號，如 `Sega Saturn 版`→`#sega-saturn-版`）。`.toc` 樣式已在 `src/styles/global.css`，SEO description 也已排除 `<nav>`。
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
  - **chiuinan 介紹頁**：分兩種情況——①**補既有 stub** 時，若 stub 已有 `references.chiuinan`（介紹頁 URL）就保留；若只有 `provenance: chiuinan@list-1.htm`（列表頁），代表該款出現在 chiuinan 列表，可 `grep` `derived/chiuinan-intro-links.tsv` 查該款是否連有專屬介紹頁、有就補進 `references.chiuinan`，只在列表無專屬頁則略過。②**新建（無 stub）** 的款，chiuinan 未收錄、`provenance` 也無 chiuinan，不必去找。
  - **⚠ 別只信 derived 的 `intro_todo`**：`derived/chiuinan-games.json` 的 `intro_todo: True` 只代表「尚未抓介紹頁」、**不代表沒有**。要拿介紹頁 URL 就 `grep` `derived/chiuinan-intro-links.tsv`（`catalog_id`／中文名 → `intro_url`，由 `scripts/build_chiuinan_intro_links.py` 從 list-1.htm 預解析、收 3834 款），**別再 curl 693KB 的 `raw/chiuinan/list-1.htm`**；TSV 查無再回頭抓原始列表——外文遊戲介紹頁多在 `intro/eng/eXX/…`、中文遊戲在 `intro/ch/cXX/…`；即使列表標 `[待補]`／`[待重整]`，頁面通常仍有簡介、台灣代理、版本沿革等實質內容，可收進 `references.chiuinan`（完整 URL `https://chiuinan.github.io/game/game/<href>`）。本批 9 款外文作（幻想空間 6／地下創世紀 2／模擬城市）皆屬此情形。
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
- **條目用到新 enum 值時，schema 擴充要同 commit**：若條目填了既有 enum 沒有的值（如 `developer_region: CA`），必涉及 `schema/game.schema.mjs`（+ `schema.md`）的擴充；**這兩者是同一筆邏輯改動，務必一起 commit**。只 commit content、把 schema 改動留在工作區，本機 `npm run validate` 仍會過（它讀工作區的 schema），但 CI build 用的是 committed schema → `InvalidContentEntryDataError` 紅燈。拆 commit 時尤其要查 `git status` 有沒有未帶上的 schema/* 改動。

## Out of Scope

- **勿跑 `build_content`**（已退役，會覆寫手改 frontmatter）。
- 勿順手批改既有款的非請求欄位（資料層校訂走 BACKLOG / 專門批次）。
- 研究與考據品質仍靠人判斷——本 skill 只固化流程與慣例，不保證內容正確。
