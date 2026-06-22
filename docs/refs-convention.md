# 引用三段制（References Convention）

全站條目（games 與 companies/people/teams/topics 等實體）頁尾統一三段，對齊維基百科
Notes / References / External links。決策見 ADR-003。渲染元件：`src/components/CiteSections.astro`
（底層）、`src/components/EntityRefs.astro`（非 game 實體的 array → CiteSections 轉接）、
`src/components/ExternalLinks.astro`（game 的 typed map → CiteSections 轉接）。

## 三段定義

| 段 | 欄位 | 內容 | 連結 | 可被正文 `[N]` 引用 |
|---|---|---|---|---|
| **註釋** | `footnotes` | 純文字補充說明（太細不便放正文） | 無 | ✅ |
| **參考資料** | `references` | 構成內容的**來源** | 有 | ✅（標 `cited` 的） |
| **外部連結** | `external_links` | **非來源**：重複資料、因版權/無法爬取而未收入、留作日後補充 | 有 | ❌ |

判斷一條連結放哪：**有沒有用作內容來源**——用作來源（含據此改寫/增補正文）→ `references`；
非來源、重複、或無法爬取但想留存 → `external_links`。

## 編號規則

- 正文以 `<sup class="cite"><a href="#cite-N">[N]</a></sup>` 引用。
- `[N]` 是單一連續序列：**先 `references` 中被引用的項 `[1..k]`，再 `footnotes` `[k+1..]`**。
- 只有「被引用的」才編號：`references` 中沒標 `cited` 的（general references，如自動收集的青衫之友／Fandom／Omega）只列出、**不編號**；`external_links` 永不編號。

## frontmatter 寫法

**game**（`references` 維持 typed map）：

```yaml
footnotes:
  - 年份依包裝盒標示，與維基略有出入
references:
  chiuinan: https://...      # 自動來源 → 參考資料（general，無號）
  fandom: 神雕侠侣 (1997)
  cited:                     # 被正文引用 → 參考資料 [N]，依宣告順序
    "銀狐〈開發回憶〉": https://...
external_links:
  "民間漢化補丁": https://...
```

**其他實體**（`references` 為陣列，被引用者標 `cited: true`）：

```yaml
footnotes:
  - 補充說明
references:
  - title: 巴哈姆特 大宇歷史介紹   # 被正文引用 → [1]
    url: https://...
    cited: true
  - title: 維基百科             # general reference → 無號
    url: https://...
external_links:
  "官方網站": https://...
```

## 「丟連結」工作流程（SOP）

收到新連結時：

1. **讀取內容**（defuddle / WebFetch 等）。
2. **判斷是否據此改寫或增補正文**——有用的考據就寫進 body，關鍵斷言句末加 `[N]`。
3. **決定歸屬**：用作內容來源（含據此改寫者）→ `references`（被逐句引用再標 `cited` 並給 `[N]`）；非來源、重複、或無法爬取但想留存 → `external_links`。

## 備註

- 維基的「Further reading（延伸閱讀／出版物書目）」段暫不引入，需要時再加。
- game 的 51 個既有 `references.cited` 條目沿用 `#cite-N`（從 1），不需改動。
