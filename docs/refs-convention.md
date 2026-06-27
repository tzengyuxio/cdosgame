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
- **game 的 cited**：legacy 形式 `"標題": url` 的 key 即標題；keyed 形式 `key: { label, url }` 的 `label` 即標題。
- **external_links**：map 的 key 即顯示文字，填頁面標題。
- **其他實體**（companies/people…）：`references`/`external_links` 陣列項的 `title` 即顯示文字，填頁面標題。

民間漢化／中文化連結的歸屬依上節 SOP：**正文有提及** → `references`（被該句 `[N]` 引用、標 `cited`）；**正文未提及、純補充** → `external_links`。

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
- **keyed 物件 `{ key, text }`**：body 可用 `<sup class="cite" data-ref="<key>"></sup>` 引用，dynamic JS 自動編號（body 出現序）並建立雙向 backref。**Key 用 `fn01`、`fn02`… 編號形式**（不取語意名）——條目本地序號、避免跨條目重名與重命名負擔。`text` 內可內嵌 `<a>` 連到其他條目，站內路徑（`/games/...`、`/people/...`）會自動補 `BASE` 前綴（由 `CiteSections.astro` 的 `prefixBase` helper 處理；rehypeBaseLinks 不過 footnote 的 `set:html`）。

**雙形式可混用**：同一份 `footnotes` 可前段純字串、後段 keyed，順序決定列表編號（顯示 1, 2, 3…）。被引用者編號照樣由 body 出現序決定，與列表中位置無關。

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
