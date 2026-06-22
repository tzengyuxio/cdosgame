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

- 正文以 `<sup class="cite"><a href="#cite-N">[N]</a></sup>` 引用；`[N]` **依正文出現順序**從 1 連續編號——撰寫時把 `cited` 來源**按正文首次出現順序排列**（宣告順序＝顯示順序）。
- 同一來源被正文多次引用時，**沿用同一個 `[N]`**（例如某兩句都引同一篇 → 都標 `[2]`）。
- 「參考資料」段**全部編號**（求一致）：先被正文引用的 `cited` 來源 `[1..k]`（帶 `#cite-N` 錨點），再接自動收集的 general references（青衫之友／Fandom／Omega）`[k+1..]`（也編號，但無正文錨點）。
- `footnotes`（註釋）接在參考資料之後編號 `[k+m+1..]`；`external_links`（外部連結）不編號。
- ⚠ 未實作 wikipedia 的「一筆來源被多次引用時於該筆後標多個回指（^ a b）」——目前多次引用共用同一 `[N]`，回指僅指向該筆、不細分各引用點。

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
