# 引用三段制（References Convention）

全站條目（games 與 companies/people/teams/topics 等實體）頁尾統一三段，對齊維基百科
Notes / References / External links。決策見 ADR-003。渲染元件：`src/components/CiteSections.astro`
（底層）、`src/components/EntityRefs.astro`（非 game 實體的 array → CiteSections 轉接）、
`src/components/ExternalLinks.astro`（game 的 typed map → CiteSections 轉接）。

## 三段定義

| 段 | 欄位 | 內容 | 連結 | 可被正文 `[N]` 引用 |
|---|---|---|---|---|
| **註釋** | `footnotes` | 文字補充說明（太細不便放正文）；可內嵌 `<a>` 連結到站內其他條目 | 站內連結可 | ✅ |
| **參考資料** | `references` | 構成內容的**來源** | 有 | ✅（標 `cited` 的） |
| **外部連結** | `external_links` | **非來源**：重複資料、因版權/無法爬取而未收入、留作日後補充 | 有 | ❌ |

判斷一條連結放哪：**有沒有用作內容來源**——用作來源（含據此改寫/增補正文）→ `references`；
非來源、重複、或無法爬取但想留存 → `external_links`。

## 連結文字（label）

**所有外部連結的顯示文字一律用「該頁面的標題」，不用站名**（決策見 ADR-003 / Daily 2026-06-22）。例如某痞客邦文章應顯示「老遊戲介紹 - 御封戰將」（文章標題），而非「痞客邦」。

- **game 的 general references**：`chiuinan`/`fandom`/`omega` 三個自動來源沿用固定 label（「青衫之友 介紹頁」「Fandom 條目」「Omega 討論串」）；**其餘來源 key**（wikipedia/mobygames/dosdays/部落格…）的 value 用物件 `{ url, title }`，`title` 為頁面標題，渲染即以 `title` 為連結文字。建立條目時應實際抓取頁面標題填入，不可用站名代替。
- **game 的 cited**：legacy 形式 `"標題": url` 的 key 即標題；keyed 形式 `key: { label, url }` 的 `label` 即標題。keyed 形式可再加選用 `note`（純文字），渲染於連結**之後、外部**——連結文字只含 `label`（頁面標題），`note` 用來補充出處說明（如「本文收錄於《軟體世界》104 期」），不進連結。
- **external_links**：map 的 key 即顯示文字，填頁面標題。
- **其他實體**（companies/people…）：`references`/`external_links` 陣列項的 `title` 即顯示文字，填頁面標題。

民間漢化／中文化連結的歸屬依上節 SOP：**正文有提及** → `references`（被該句 `[N]` 引用、標 `cited`）；**正文未提及、純補充** → `external_links`。

## cite 標籤的位置

**`<sup class="cite">` 一律放在句號【之前】**：`……敵我同時行動<sup class="cite" data-ref="cgw169"></sup>。`
不是 `……敵我同時行動。<sup class="cite" data-ref="cgw169"></sup>`。

- 連續多個 cite 同樣整組放在句號前：`……內容<sup …a></sup><sup …b></sup>。`
- 句中（非句末）的 cite 緊接被引述的詞句即可，不涉本規則；引號、括號、分號前的 cite 保持原樣。
- 全庫已於 2026-07-22 正規化（翻轉 3071 處）。日後新寫的條目直接照此格式，不需再批次處理。

## 編號規則

- **正文 cite 編號**：每個 `<sup class="cite" data-ref="…">` 引用點**按 body 出現順序遞增** `[1][2][3]…`，每個點各一個號——即使多處 `data-ref` 指向同一個 ref/footnote，也遞增、不共用同號。
- **列表編號（顯示用）**：每個章節 (`<ol class="refs">`) 各自從 `1` 起算、與正文 cite 編號**脫鉤**。即「參考資料」列出的 1、2、3… 與「註釋」列出的 1、2、3… 都是該章節內部的計數，**不**反映該項在正文裡的 cite 編號。
- **連結關係**：正文 `[N]` 透過 `data-ref="<key>"` ↔ 列表 `<li data-key="<key>">` 對應；list item 的 DOM id 為 `cite-fn-N`（註釋）或 `cite-ref-N`（參考資料）。正文 sup 的 DOM id 為 `citeref-N`（N 為 body 出現序）。
- **Backref**（列表項回指正文）：dynamic JS 在每個被引用的 list item 開頭插入 `<sup class="backref">`：
  - 只被引用一次 → 單一 `^`（連回該唯一引用點）
  - 被引用多次 → `^ 1 2 3`，每號連回對應 body 出現位置
- **general references**（自動來源 `omega`/`fandom`/`chiuinan` 等、未被正文 cite）與 `external_links` 不參與 backref，列表中也不顯示 `^`。
- **`:target` 高亮**：正文 cite 跳到列表項時 li 黃底閃一下；按 backref 回正文時 sup 亦同。同一 anchor 連點兩次的重複觸發由 `cite-flash` JS handler 強制 reflow 處理（`src/components/CiteSections.astro` 末段）。

**實作位置**：`src/components/CiteSections.astro` 內嵌的 module script。掃 `sup.cite[data-ref]`、依出現序編號、依 `data-key` 建 backref。靜態 fallback 用 `<li value>` 顯示列表編號、用 `:target` 高亮，並由 JS 追加 `cite-flash` class retrigger 動畫。

## frontmatter 寫法

**game**（`references` 維持 typed map）：

```yaml
footnotes:
  - 年份依包裝盒標示，與維基略有出入          # 純字串（legacy 形式，不可由 data-ref 引用）
  - key: fn01                                   # keyed 形式：body 可用 data-ref="fn01" 連到此筆
    text: '兩寫法各有依據，疑為同一人之異寫。可內嵌 <a href="/games/cdg-1701">站內連結</a>。'
references:
  chiuinan: https://...      # 自動來源 → 參考資料（general，無號）；沿用固定 label「青衫之友 介紹頁」
  fandom: 神雕侠侣 (1997)     # 同上，固定 label「Fandom 條目」
  wikipedia:                 # 其他來源（wikipedia/wikipedia_zh/mobygames/dosdays/部落格…）→ general 參考資料（無號）
    url: https://...
    title: 巫術VII：失落的迦地亞 - 維基百科，自由的百科全書  # ← 連結文字用「頁面標題」，不可用站名（見下「連結文字」規範）
  cited:                     # 被正文 [N] 引用 → 參考資料（編號）
    "銀狐〈開發回憶〉": https://...          # legacy：key 即 label（標題）
external_links:
  "民間漢化補丁（站方說明頁）": https://...   # 正文未提及、純補充連結才放這裡；正文有提及→改 cited
```

**其他實體**（`references` 為陣列，被引用者標 `cited: true`；footnotes 同樣支援雙形式）：

```yaml
footnotes:
  - 補充說明
  - { key: fn01, text: '可內嵌 <a href="...">連結</a>' }
references:
  - title: 巴哈姆特 大宇歷史介紹   # 被正文引用 → [1]
    url: https://...
    cited: true
  - title: 維基百科             # general reference → 無號
    url: https://...
external_links:
  "官方網站": https://...
```

**Footnote 兩種形式**：
- **純字串**（legacy）：無 key，無法被 `<sup class="cite" data-ref="…">` 引用；單純放在「註釋」段、不參與 backref。多用於不需 body cite 的純背景補充。
- **keyed 物件 `{ key, text }`**：body 可用 `<sup class="cite" data-ref="<key>"></sup>` 引用，dynamic JS 自動編號（body 出現序）並建立雙向 backref。**Key 命名見下「footnote key 命名」**。`text` 內可內嵌 `<a>` 連到其他條目，站內路徑（`/games/...`、`/people/...`）會自動補 `BASE` 前綴（由 `CiteSections.astro` 的 `prefixBase` helper 處理；rehypeBaseLinks 不過 footnote 的 `set:html`）。

## footnote key 命名

`key` 僅供正文 `data-ref` 對應與同源多次引用共用，**條目本地作用域**（跨條目不共享、不衝突），只需在單一條目內可預測、可辨識。判準是**該來源有沒有天然穩定的識別碼**：

- **有天然識別碼者用語意化 key**：雜誌／刊物來源（掃描報導、廣告、產品目錄等指向具體刊物者）的天然識別碼＝刊名＋期號，故 `key = <刊名縮寫><期號>[<語意後綴>]`，全小寫。同刊同期多則靠後綴消歧義（如廣告 `ad`）。例：`swm70`、`ace96`、`ace96ad`、`cgw124`。**不加 `fn_` 前綴**、不用純序號——這類 key 在 diff／review 時自證來源（`press-import` 全靠 diff 抓錯引），語意化好認、好重用。
- **無天然識別碼者用序號 key**：版權年份、標題畫面字樣、包裝標示等不指向具體外部刊物的一次性註腳，本無可辨識碼，用 `fn01`、`fn02`… 本地序號即可，避免硬湊語意名與重命名負擔。

**刊名縮寫對照**（新刊物在此增列，勿在條目自創縮寫如 `sw`/`swf`/`softworld`）：

| 刊物 | 縮寫 | 備註 |
|---|---|---|
| 電腦玩家 | `ace` | 單一代碼（早期報頭即 ACE，貼合 DOS 時代）；只給期號即可，不分期 |
| 軟體世界 | `swm` | |
| 新遊戲時代 | `sgm` | |
| 電腦遊戲世界／遊戲世界 | `cgw` | 同一刊物不同時期名稱，共用單一縮寫 |

**雙形式可混用**：同一份 `footnotes` 可前段純字串、後段 keyed，順序決定列表編號（顯示 1, 2, 3…）。被引用者編號照樣由 body 出現序決定，與列表中位置無關。

## 雜誌 NostaLib 連結

提到雜誌時，連到 NostaLib（懷舊圖書館）該期頁面。URL 為確定式：`https://nostalibrary.tzengyuxio.me/magazines/<code>/no.<NNN>`，`<code>` 即上表縮寫（swm/ace/sgm/cgw）。**文字期號不補零、URL 補零**（`第40期` → `no.040`）；合刊用連字號（`第70+71期` → `no.070-071`）；特殊期號 `試刊號` → `no.000`、`創刊號` → `no.001`。helper（`magazineIssueUrl`／`magazineHref`）見 `src/lib/magazine-links.js`。個別期號是否確實存在於 NostaLib 未自動驗證，有疑慮者可在 footnote 手寫完整 URL 覆蓋。

**落點政策——連結只放「來源層」，靠既有機制去重：**

- **footnote（主要落點）**：雜誌 footnote 就是來源，把 `《刊名》第 N 期` 片段包成 `<a href="…/no.NNN">《刊名》第 N 期</a>`（footnote `text` 走 `set:html`、支援內嵌 `<a>`；外部連結由 `CiteSections.astro` 自動補 `target="_blank" rel="noopener nofollow"`，撰寫時不必手寫 target）。keyed footnote 天然去重：同 key 被正文多句引用，連結只出現一條。
- **內文不連**：正文提到雜誌，句末已有 `<sup class="cite">[N]` 指向該（已連結）footnote，內文再內嵌 URL 是重複又雜亂。
- **caption 連結只在 lightbox（放大圖）**：`media[].caption` 裡的「刊名＋期號」由 `src/lib/magazine-links.js` 的 `magazineHref` 在建置時解析，掛在縮圖 button 的 `data-mag-url`／`data-mag-label`；**縮圖 caption 維持純文字**，使用者點開放大後 lightbox 才把 caption 那行的「刊名＋期號」片段就地變成連結（不另起「雜誌：」行、不重複）。這樣 grid 不散連結、一次只現當前圖那條。**不需在 caption 手寫 `<a>`**。lightbox caption **一律連**（解析到刊名期號就連，不管該期在 footnote 有沒有連過——兩者不同介面、不同語意，lightbox 一次只顯示一張，不構成重複）。解析器容忍 `《》`、可選「第」、無空格、合刊 `N+M`；新 caption 盡量寫成 `刊名 第N期・單元 p.頁碼` 以利解析。

## 「丟連結」工作流程（SOP）

收到新連結時：

1. **讀取內容**（defuddle / WebFetch 等）。
2. **判斷是否據此改寫或增補正文**——有用的考據就寫進 body，關鍵斷言句末加 `[N]`。
3. **決定歸屬**：用作內容來源（含據此改寫者）→ `references`（被逐句引用再標 `cited` 並給 `[N]`）；非來源、重複、或無法爬取但想留存 → `external_links`。

重複連結檢查：執行 `npm run check:duplicate-links` 可掃描 `content/games` 中同一遊戲條目內的 `references` 與 `external_links` URL 重複。

## 來源分歧的引用

同一事實若有不同記法（如發行年、開發商、發行商、平台），正文可中性並陳，但每個記法都應盡量各自標出來源：

```markdown
發行年有 1994 年<sup class="cite" data-ref="source_a"></sup>與 1995 年 1 月 1 日<sup class="cite" data-ref="source_b"></sup>兩種記法。
```

對應來源放在 `references.cited`；若只是解釋採用哪個值、哪些仍待考，寫進進度檔或 backlog，不放進條目正文。正文避免只寫「有兩種記法」卻不標明各自依據。

## 備註

- 維基的「Further reading（延伸閱讀／出版物書目）」段暫不引入，需要時再加。
- 早期 entries 曾用手寫 `<a href="#cite-N">[N]</a>` 的 manual 模式，已全部遷移至 dynamic mode（`data-ref="key"`）。新增條目一律走 dynamic。
- 列表 DOM id 命名 `cite-fn-N` / `cite-ref-N` 分 namespace，避免兩段都從 1 起算時 id 衝突。正文 sup 用 `citeref-N`（runtime 由 JS 賦值，與列表 id 命名也分開）。
