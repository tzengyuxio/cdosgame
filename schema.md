# schema.md — 遊戲條目欄位定義

中文 DOS 遊戲 catalog 的欄位規格。**從實際收集到的資料反推**（schema-on-read），對齊 Astro Content Collections + Zod 的 build-time 驗證。

- 機器 schema：`schema/game.schema.mjs`（Zod，可直接搬進 Astro `src/content.config.ts`）。
- 儲存：**每款一個 Markdown 檔**於 `content/games/<id>.md`，結構欄位放 YAML frontmatter，簡介/評論放正文（目前正文待補）。
- 主鍵 `id`：不透明流水號 `cdg-NNNN`；命名空間、粒度、穩定性與重複處理見 **`docs/id-policy.md`**。對映帳本 `data/id-registry.json`（以 id 為主、append-only）。

## 欄位

| 欄位 | 型別 | 必填 | 說明 |
|------|------|:--:|------|
| `id` | string `cdg-\d{4,}` | ✓ | 穩定流水號（= 檔名）|
| `title_zh` | string | ✓ | 繁中主名 |
| `title_aliases` | string[] | | 別名/英文原名（預設 []）|
| `slug` | string \| null | | 網址用，英文別名 slugify；無則 null |
| `year` | int 1970–2030 \| null | | 發行年（收集到 2024；2004 後為收集邊界外）|
| `developer` | string \| null | | 開發商 |
| `developer_region` | enum \| null | | 開發地：`TW HK CN MO JP US FR GB DE KR` |
| `publisher_tw` | string[] | | 台灣發行/代理商（預設 []；原廠發行不入 catalog）|
| `content_language` | `zh`\|`en` \| null | | 遊戲內語言（chiuinan cgame/egame）|
| `genre` | enum \| null | | 11 類：回合/即時/策略角色扮演、冒險解謎、故事劇情、計策戰略、模擬養成、教育養成、大富翁、射擊打鬥、運動動作 |
| `localization_level` | `A`\|`B`\|`D`\|`foreign` \| null | | A 原生中文開發 / B 中文化 / D 中文包裝代理 / foreign 純外國 |
| `size` | string \| null | | 容量（如 `1CD (45.2)`）|
| `platform_note` | string \| null | | 平台/限制（如 `Windows，18禁`）|
| `catalog_id` | string \| null | | chiuinan **典藏庫**編號（SCD/JXP…，來源側索引，非廠商編號）|
| `license_status` | `official`\|`unofficial`\| null | | 台灣發行授權狀態。**預設 null（未考據）**；`unofficial`=未授權代理/水貨/盜版（如軟體世界貴族版系列）|
| `release_codes` | object[] | | **廠商自家發行編號**（各家機制不同）：`issuer`+`code`，選填 `status`（`released`/`placeholder`）/`note`。`placeholder`=保留未發行（轉珍藏版）|
| `editions` | object[] | | 同款多版本（載體/包裝/小增補）：`name` + 選填 `year`/`media`/`boxart`/`note`/`provenance`。粒度規則見 `docs/id-policy.md` |
| `cover` | string \| null | | rwv 封面檔名 |
| `images` | object | | 本地圖路徑：`chiuinan[]` / `rwv_cover` / `fandom`（gitignored，授權見各 manifest）|
| `references` | object | | 外連參考：`omega`（討論串）/ `fandom`（條目）|
| `external_links` | record<string,string> | | 其他外連（預設 {}）|
| `provenance` | string[] | ✓ | 來源標記（≥1），如 `chiuinan@list-1.htm` |
| `localization_basis` | string | | 分類判據（透明可審）|
| `rwv_source_id` / `rwv_match` | string / enum | | rwv 配對來源與層級（exact/edition/alt）|

## 設計原則

- **台灣產品導向**：catalog 只留台灣發行/代理（`publisher_tw`），原廠發行留在原始層 `derived/chiuinan-games.json`。
- **可空優先**：缺資料用 `null`/`[]`，不剔除條目（collect-first）。
- **可查證**：每筆 `provenance` ≥ 1；derive 欄位（localization）附 `*_basis`。
- **enum 可演進**：`genre`/`developer_region` 為受控詞彙，合併新來源時再擴充。

## 待擴充

- 正文（簡介/評論）：目前空，待從 omega/chiuinan intro/MobyGames 補。
- `slug`：僅英文別名者已填，中文遊戲多為 null，待人工/羅馬化補。
- C（民間漢化）等級：chiuinan 無法 derive，待他源。
