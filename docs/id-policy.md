# id 規則（id policy）

本資料庫所有實體 id 的命名、穩定性、粒度與重複處理約定。**id 是準永久的**，改動成本高，故規則先立。

## 命名空間：`cd<類型>-NNNN`

`cd` = 專案 cdosgame；類型字母 + 4 位零補流水號。**不透明**（不編碼年份/地區/來源等會變動的事實）。

| 實體 | 前綴 | 說明 |
|------|------|------|
| 遊戲 game | `cdg-NNNN` | 主實體 |
| 廠商 company | `cdc-NNNN` | 開發商與發行商共用一張表；角色（開發/發行/代理）記在遊戲端，非 company id |
| 系列 series | `cds-NNNN` | 仙劍系列、軒轅劍系列… |
| 人物 person | `cdp-NNNN` | 製作人/作曲… （未來）|

> ⚠ **現況（實作落差，2026-06）：只有 `cdg-NNNN` 實際發號。** `cdc`/`cds`/`cdp`
> 是當初規劃、**未實行**。companies/series/people/teams/topics 改採**「中文正名」當
> 檔名兼網址 slug**（如 `content/companies/新藝.md` → `/companies/新藝`），不發 id、
> frontmatter 也無 `id:` 欄位——因為它們是**聚合型實體**：路由由 game frontmatter 的
> 字串欄位（`developer`/`series`/`staff[].name`…）聚合產生，md 檔僅為選填 overlay。
> 非 game 實體的 slug／路由／消歧規則以 [`information-architecture.md`](information-architecture.md)
> §二為準（slug＝中文正名，撞名加括號）。本文以下的 registry／粒度／重複處理規則目前
> **只實際套用於 game**。

- 4 位（上限 9999）：遊戲量估 ~4,500–6,000，足夠；真超出才升位。
- 小型受控詞彙（平台、genre、region、localization_level）用**字串 enum**，不發 id。
- **關聯用 id 參照**（**規劃，未實行**）：原設想遊戲 frontmatter 以 `developer: cdc-NNNN`、`series: cds-NNNN` 連結；目前 developer／series 仍為**中文字串**，且 cdc/cds 未發號，「字串→cdc id」正規化**未做**（亦無近期計畫）。

## 粒度：一 id = 一款「遊戲作品」

版本/載體/包裝差異**不另發 id**，收進該遊戲的 `editions[]`；只有**實質改變**才是不同 id。

| 情況 | 同 id？ |
|------|:--:|
| DOS 版 vs Windows 版（內容大致相同或小幅追加）| ✅ |
| 磁片版 vs 光碟版（同期不同載體）| ✅ |
| 光碟典藏版/綺麗版（改包裝、加語音等小增補）| ✅ |
| 原版 vs 中文版（在地化）| ❌ |
| 仙劍 vs 新仙劍（重製：重繪美術、重做迷宮、系統強化）| ❌ |
| 美術重繪/風格大改/內容差異大 | ❌ |

**判準**：載體／包裝／小增補 → 同 id（當 edition）；重製／重繪／在地化／實質內容改變 → 不同 id。
灰色地帶（如「加强版」）**保守歸同 id 並標記待人工複核**。

## 穩定性：registry 是唯一真相

`data/id-registry.json`（**目前僅 game 一檔**；當初設想「每類實體一檔」，但 cdc/cds/cdp 未發號故未建）是 id 的權威帳本，**append-only**、可人工審改。

結構（以 id 為主）：
```
{
  "_meta": {...},
  "ids": {
    "cdg-0001": {
      "title_zh": "...", "developer": "...", "catalog_id": "...",
      "keys": ["cat:SCD0136", "rwv:...", ...],   // 解析到此 id 的所有 key（含別名）
      "status": "active"                          // 或 "merged"
    }
  }
}
```

- id 一旦發出**永不重配**；標題/廠商校正只更新顯示欄位，不改 id。
- 比對靠 `keys[]`（多訊號）；`build_content` 重跑時用 keys 反查既有 id。

## 重複處理約定

1. **alias（同款多 key）**：發現某源條目其實是已存在遊戲 → 把其 key 加入該 id 的 `keys[]`，不發新號。
2. **edition（同款多版本）**：版本變體歸同 id 的 `editions[]`，不發新號。
3. **merge / tombstone（事後撞號）**：fuzzy 漏判先發了兩號、事後發現同款 → 保留**小號**為存活，大號條目設 `status:"merged"` + `merged_into:"cdg-小號"`；刪除被併的 content 檔；其 `keys[]` 經 `merged_into` 轉址仍可解析。

## 排序/顯示

排序/篩選用 `year` 等欄位。**year 不入 id**（多筆缺年、且會校正→破壞穩定）。

game 另有 `slug` 欄位（英文別名 slugify，如 `a-10-tank-killer`），當初設想做可讀網址，但**目前未接線**——遊戲網址一律用 `id`（`/games/cdg-NNNN`），程式碼無任何處讀取 `data.slug`。此欄位的去留（接成 alias 路由 vs 移除）見 `BACKLOG.md`。
