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
      "status": "active"                          // active | merged | rejected
    }
  }
}
```

- id 一旦發出**永不重配**；標題/廠商校正只更新顯示欄位，不改 id。
- 比對靠 `keys[]`（多訊號）；`build_content` 重跑時用 keys 反查既有 id。

## 重複處理約定

1. **alias（同款多 key）**：發現某源條目其實是已存在遊戲 → 把其 key 加入該 id 的 `keys[]`，不發新號。
2. **edition（同款多版本）**：版本變體歸同 id 的 `editions[]`，不發新號。
3. **merge / tombstone（事後撞號）**：fuzzy 漏判先發了兩號、事後發現同款 → 保留**小號**為存活，大號條目設 `status:"merged"` + `merged_into:"cdg-小號"`；刪除被併的 content 檔；其 `keys[]` 經 `merged_into` 在 **build 時**用 keys 反查仍可解析（注意：**這是 build-time key 反查，非網址轉址**；merged id 的 `/games/cdg-NNNN` 站台不轉址，但這些 id 從未發佈、外部不會連到）。
4. **rejected（剔除、燒號）**：發過號、事後判定**不符 `scope.md` 收錄判準** → 設 `status:"rejected"`、刪除（或不建）content 檔；id **append-only 永不回收**，留為序列中的空號。最大宗是 **mod／改版／漢化補丁／修改器·工具／惡搞換皮**（依 `scope.md` §4 閘1，一律不收、不發 id；已誤發的設 rejected）；其次是過不了 §4 佐證／平台閘的業餘作品。

> ⚠ **mod 一律不發 id**：金庸群俠傳同人 mod（天書劫、蒼龍逐日…）這類**需掛商業本體才能跑**的改版，不是獨立作品 → 不收。若某 mod 知名到值得記，**附記在本體遊戲條目**裡，不另發 id。

### `merged` 與 `rejected` 的界線（別搞混）

兩個 status 回答**不同問題**，不是嚴重度梯度：

- `merged`＝**合法的去重退役**：是真遊戲、只是多源產生的重複 placeholder，資訊已併回主條目（保留 `merged_into` 指回 cdg-X）。**確認的重複停在 `merged`，不要標成 `rejected`。**
- `rejected`＝**不符 `scope.md` 判準的排除**：根本不該進庫（mod／超界／佐證不足）。

- **墓碑（registry 那筆小紀錄）必須留、只丟 content `.md`**：留它是為了保住「**id append-only 永不重配**」——刪掉墓碑會讓發號邏輯誤判該號為空號而重配。「廢棄 placeholder」＝丟 stub `.md`，不是刪 registry 紀錄。
- **`merged_into` 現為歷史麵包屑**：`build_content` 凍結（content 為正本）後，它原本「重匯入時把 key 導回主條目」的功能已不再作用，續留僅供回溯「這個重複併去了哪」。
- **罕見的 merged→rejected**：唯有同時發現「(1) 當初併錯、與主條目非同款 **且** (2) 它自己也不符判準」才成立（實為「先 un-merge 再 reject」）；翻牌前先確認該條目的 `keys[]`/別名沒有**唯一**掛在它身上（有就先搬回主條目），來龍去脈寫進 `reject_reason`。

## 排序/顯示

排序/篩選用 `year` 等欄位。**year 不入 id**（多筆缺年、且會校正→破壞穩定）。

game 另有 `slug` 欄位（英文別名 slugify，如 `a-10-tank-killer`），當初設想做可讀網址，但**目前未接線**——遊戲網址一律用 `id`（`/games/cdg-NNNN`），程式碼無任何處讀取 `data.slug`。此欄位的去留（接成 alias 路由 vs 移除）見 `BACKLOG.md`。
