# 資訊架構（IA）規範

本文定調 cdosgame 站台「**有哪些頁面類型、各自的路由與 slug 怎麼定、彼此如何連結**」。
新增任何一種頁面（人物、團隊、事件、附屬長文…）前先讀本文，照既定規則做，避免 slug／路由各自為政。

細部規範分流：公司頁撰寫見 [`company-pages.md`](company-pages.md)；遊戲 id 規則見 [`id-policy.md`](id-policy.md)；本文管「跨類型的架構通則」。

---

## 一、兩種頁面性質

站上的頁面分兩大性質，先分清楚一個東西屬於哪種，再套對應規則：

| 性質 | 是什麼 | 內容來源 | 例 |
|---|---|---|---|
| **聚合型實體** | 有獨立身分、會被很多遊戲關聯的「名詞」 | 路由由 game 欄位聚合產生；`content/<type>/<名>.md` 為**選填 overlay**；頁面自動列出關聯遊戲 | 公司、系列、團隊、人物、事件 |
| **專題附屬頁** | 掛在某實體底下的**自由長文頁**（太長／格式特殊，從母頁獨立出來） | 一篇手寫 md，內容自由（表格／考據／來源圖／勘誤） | 大宇產品目錄、智冠貴族版珍藏版一覽 |

判斷法：**「會不會被很多遊戲當欄位值反覆指到」**——會（developer/series/dev_team/staff…）→ 聚合型實體；不會、是針對某母頁的一篇補充長文 → 專題附屬頁。

---

## 二、slug 與路由通則（所有類型共用）

### slug 規則

- **遊戲用 `cdg-NNNN` 編號**（唯一例外）——因為遊戲量最大、標題最易變動，見 [`id-policy.md`](id-policy.md)。
- **其餘所有實體與專題頁，slug 一律用「中文正名」**（與既有 companies/series 一致），連結時 `encodeURIComponent`。
- **同名消歧**：撞名時 slug 加括號限定，如 `王世昌(大宇)`、`王世昌(漢堂)`；其他名稱進 `aliases` 供搜尋。
- 改 slug（正名）＝會斷舊網址，須補 Astro redirect（見「待議」）。故 slug 一旦發佈盡量別改。

### 路由集合 ＝ 聚合(game 欄位) ∪ collection 既有 md 檔

聚合型實體的頁面要存在於**兩種來源的聯集**：

1. 從 game 欄位聚合出的值（如所有出現過的 developer 字串）；
2. `content/<type>/` 底下實際存在的 md 檔。

> ⚠ 現行 `companies`/`series` 的 `getStaticPaths` **只**從 games 聚合，導致「沒有對應遊戲的 md 不生頁」。新類型一定需要聯集（沒掛在任何遊戲的代言人、純新聞事件），故把**聯集**訂為通則，並回頭補上 companies/series。

### 保留命名空間（避免日後撞路由）

```
/games  /companies  /series  /teams  /people  /events  /topics
/genres  /years  /decades                       （純瀏覽軸，非實體）
```

不同命名空間下可有同名 slug（一間公司與一個人同名 → `/companies/X` 與 `/people/X` 互不干擾）。

各實體有索引頁（hub）：`/companies`、`/series`、`/genres`、`/people`…。其中 **`/people` 刻意不掛上方 nav**，僅供知道網址者直接開啟（人物資料尚在補完、暫不主動曝光）；其餘 hub 才進 nav。日後若要公開人物列表，於 `Base.astro` nav 補連結即可。

---

## 三、實體類型對照

| 類型 | collection | 路由 | slug | 聚合來源（game 欄位） | 狀態 |
|---|---|---|---|---|---|
| 遊戲 | `games` | `/games/cdg-NNNN` | cdg 編號 | — | ✅ 已上線 |
| 公司 | `companies` | `/companies/<名>` | 中文公司字串 | `developer`, `publisher_tw` | ✅ 已上線（14 家） |
| 系列 | `series` | `/series/<名>` | 中文系列字串 | `series` | ✅ 已上線（10） |
| 團隊 | `teams` | `/teams/<名>` | 中文團隊字串 | `dev_team` | ✅ 已上線（DOMO小組） |
| 人物 | `people` | `/people/<名>` | 中文正名 | `staff[].name`（＋選填 `staff[].person`） | ✅ 已上線（蔡明宏、鮑弘修） |
| 事件/獎項 | `events` | `/events/<名>` | 中文正名 | （初期無，由 event md 反向掛） | 🔜 規範已定 |
| 專題附屬頁 | `topics` | `/topics/<slug>` | 中文正名 | （非聚合，手寫） | 🔜 規範已定 |

---

## 四、各類型細則

### games（既有）
見 schema 與 [`id-policy.md`](id-policy.md)。其餘類型多半從 game 的欄位聚合而來。

### companies / series（既有）
見 [`company-pages.md`](company-pages.md)。模式：路由聚合自 game 欄位 ＋ 選填 md overlay ＋ 自動列關聯遊戲。

### teams（團隊／工作室）
- 公司**內部**開發小組或掛名工作室，如 DOMO小組、狂徒創作群。
- 與 companies **同模式**：`content/teams/<團隊名>.md`，路由 `/teams/<團隊名>`，聚合來源＝game 的 `dev_team`。
- frontmatter 至少：`name_zh`、`parent_company`（所屬公司字串，與公司頁互連）、選填 `aliases`/`founded`/`references`。
- 與 company 是**附屬關係**：公司頁自動列出「旗下團隊」（query teams where parent_company==本公司），團隊頁回連母公司。
- 沒必要開頁的團隊：`dev_team` 留字串、不建 md 即可（overlay 為選填）。

### people（人物）
- 收錄：知名開發者、製作人，以及**與遊戲產業相關者**（代言人、參與製作的藝人…）。
- `content/people/<中文正名>.md`，路由 `/people/<中文正名>`。
- 與遊戲的連結兩種，可並用：
  - **製作人員**：遊戲 `staff[].name` 即顯示名；人物頁聚合「`staff[].name` 命中本人」的遊戲。日後可加選填 `staff[].person`（指向人物 slug）做精準連結，避免同名誤聚。
  - **非製作人員關係**（代言、客串）：沒進 staff，靠人物 md 的 `featured_games` 反向掛。
- frontmatter 建議：`name_zh`、`aliases`（含英文名/藝名）、選填 `roles`（如 程式/美術/音樂/製作人/代言人）、`affiliations`（關聯公司）、`featured_games`、`references`/`external_links`。

### events（事件／活動／獎項）
- 收錄：產業活動與獎項（金磁片獎…）、值得立詞條的新聞事件。
- `content/events/<中文正名>.md`，路由 `/events/<中文正名>`。
- 初期沒有 game 欄位指向 event，關聯由 **event md 反向列**（`featured_games`、關聯公司/人物）；body 寫經過、逐年得獎等。
- 無正名的新聞事件：slug 用簡潔中文短名（如 `大宇1996改組`）。
- 待 events 量大、需從遊戲端反查時，再評估給 game 加 `events: []` 欄位（見「待議」）。

### topics（專題附屬頁）★ 案例 2 的解法
- **用途**：某實體（多為公司）有冗長、各家格式不一的補充資料，長到不該塞進母頁——獨立成一頁，從母頁連過去。類比：wiki 因出場人物太多而獨立的「某某小說人物列表」。
- `content/topics/<中文slug>.md`，路由 `/topics/<中文slug>`（**扁平**，不做 URL 巢狀；歸屬靠 frontmatter，不靠路徑）。
- **內容自由**：純表格、表格＋考據文、或單純長介紹文皆可；可含資料來源掃描圖、資料出入/勘誤說明。body 就是手寫 markdown。
- frontmatter：
  - `title`（頁標題）
  - `parent`（所屬實體字串，如 `大宇資訊`）＋ `parent_type`（`company`/`series`/…，預設 `company`）——母頁據此自動列出「專題」連結；無單一母頁的跨主題專題可省略 `parent`，僅見於 `/topics` 索引。
  - 選填 `featured_games`（要自動帶出遊戲卡列時用）、`references`/`external_links`。
- **母頁整合**：公司頁（及其他實體頁）渲染一個「**專題／延伸條目**」區塊，列出 `parent` 指向自己的 topics。
- 例：`/topics/大宇資訊產品目錄`、`/topics/智冠貴族版珍藏版一覽`，均 `parent: 大宇資訊`／`parent: 智冠科技`。
- ⚠ **不另做 `/lines` 自動聚合**：貴族版/珍藏版這類即使 `release_codes` 可程式聚合，仍以手寫 topic 呈現（要時可在 body 內嵌自動表格元件，但頁面性質是策展長文，非純 facet）。

---

## 五、跨實體連結（關聯方向）

| 關聯 | 機制 | 方向 |
|---|---|---|
| 遊戲 ↔ 公司 | game `developer`/`publisher_tw` 字串 | 雙向（公司頁聚合） |
| 遊戲 ↔ 系列 | game `series` 字串 | 雙向 |
| 遊戲 ↔ 團隊 | game `dev_team` 字串 | 雙向 |
| 遊戲 ↔ 人物 | game `staff[].name`（＋選填 `staff[].person`）／人物 md `featured_games` | 雙向 |
| 公司 ↔ 團隊 | 團隊 md `parent_company` | 雙向（公司頁列旗下團隊） |
| 公司/實體 ↔ 專題 | topic md `parent` | 雙向（母頁列專題） |
| 實體 ↔ 事件 | event md `featured_games`/關聯欄位 | 目前單向（event→實體） |

通則：**能用 game 既有字串聚合的就聚合（雙向自動）；不能的就在「較少量、手寫」的那一端用欄位反向掛**（topic/event/people overlay）。

---

## 六、發佈閘

- 遊戲有 `published` 逐筆閘（量大、需人工審）。
- **手寫實體與專題頁（companies/series/teams/people/events/topics）一律直出、不設逐筆閘**——量少、皆人工撰寫，與現行 companies/series 一致。

---

## 七、頁底區塊（全站一致）

所有類型共用 `src/components/RefSection.astro` 渲染**參考資料（References）**與**外部連結（External Links）**，皆顯示文字標題、空則不顯示。frontmatter 欄位統一為 `references`（{title,url}[]，遊戲為 typed map）與 `external_links`（{標籤:url}）。詳見 [`company-pages.md`](company-pages.md) 頁底區塊一節。

---

## 八、待議 / future

1. **slug 改名 redirect**：正名時用 Astro redirects 保留舊網址，尚未建置。
2. **`staff[].person` 精準連結**：人物連結初期靠 `staff[].name` 字串聚合，同名會誤聚；量大後再導入 person id。
3. **game `events: []` 欄位**：events 需從遊戲端反查時再加，初期反向掛即可。
4. **專題頁的來源掃描圖**：圖檔沿用 `raw/**/img/`（gitignored）＋ manifest 慣例，站上呈現方式（如封面待補 placeholder）另議。
5. **companies/series 路由補聯集**：把「∪ md 檔」通則回頭套用到既有兩類（目前僅 game 聚合）。

---

## 附：新增一個頁面類型的 checklist

1. 判定性質：聚合型實體 or 專題附屬頁（見第一節）。
2. 取一個命名空間（更新第二節保留清單）。
3. 定 slug 規則（預設＝中文正名；同名加括號）。
4. 建 collection：`content/<type>/`，schema 抽到 `schema/<type>.schema.mjs`，於 `src/content.config.ts` 引入，並確認 `scripts/validate_content.mjs` 涵蓋（`npm run validate` 應驗到）。
5. 建頁面 `src/pages/<type>/[slug].astro`：路由＝聚合(game 欄位) ∪ md 檔；overlay 用 `getEntry`。
6. 接 `RefSection` 頁底區塊。
7. 在母頁（如公司）加「自動列出附屬項目」的區塊。
8. 更新本文對照表狀態，必要時補 memory。
