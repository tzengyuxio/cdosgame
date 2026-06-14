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

- 4 位（上限 9999）：遊戲量估 ~4,500–6,000，足夠；真超出才升位。
- 小型受控詞彙（平台、genre、region、localization_level）用**字串 enum**，不發 id。
- **關聯用 id 參照**：遊戲 frontmatter 之後以 `developer: cdc-NNNN`、`series: cds-NNNN` 連結；目前 developer 仍為字串，待建 company 表後做一次「字串→cdc id」正規化。

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

`data/id-registry.json`（每類實體一檔）是 id 的權威帳本，**append-only**、可人工審改。

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

可讀性用 `slug`（英文別名 slugify）；排序/篩選用 `year` 等欄位。**year 不入 id**（多筆缺年、且會校正→破壞穩定）。
