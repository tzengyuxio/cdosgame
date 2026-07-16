---
status: open
created: 2026-07-16
---

# 掃描「只有簡中版、沒有繁中版」的條目（scope 複核）

庫內疑有一批**只出過簡體中文版、從未在台灣發行繁中版**的條目，卻被標成 `content_language: zh` + `localization_level: localized`，與來源自身的備註直接矛盾。依 CLAUDE.md「台灣產品導向（catalog 只留台灣發行/代理）」與 `src/pages/about.astro` 的收錄原則，這類應 **reject**（或至少改標），不該留在 catalog。

**掃描重點：優先針對 `published: false` 的條目**——未發佈款多半是尚未經人工複核的 stub，正是這類污染的聚集地；已發佈款經過複核，風險較低（但不保證，仍可二輪掃）。

適合獨立 session 做：範圍明確、機械性高、與 kudgame queue 的補完工作互不相干。

## 由來

2026-07-16 的 B18／B19 批次連續踩到兩筆，均經使用者裁決 reject：

- **cdg-0587《幻想西遊記》（金智塔）**——深圳金智塔／歲月工作室 2000-05，簡體中文版、人民幣 68 元、自行發行，查無台灣足跡。原標 `published: true` 待發佈。
- **cdg-2978《創世紀戰3第二部》**——chiuinan 標題逐字註「（The War of Genesis 3: Part 2，**簡中版**）」、備註逐字「**本代沒出繁中版。**」，但庫內標 `content_language: zh` + `localization_level: localized` + `publisher_tw: []`。

更早的同型先例：**cdg-0546《少林足球》**（簡中版、陸廠奧美電子發行、查無台灣足跡 → reject，2026-07-16）。

三筆各自獨立被發現，顯示這是**系統性的資料層問題、不是零星個案**。

## 掃描起點（建議做法）

1. **chiuinan 備註／標題的關鍵字**是最強訊號（該站對此標得相當明確）：
   - `簡中版`、`沒出繁中版`、`未出繁中版`、`簡體`、`繁中化檔`（＝民間漢化，反面訊號）
   - chiuinan 頁面是 **UTF-8**（不是 Big5，別 iconv）。優先讀 `derived/` 摘要（如 `derived/chiuinan-intro-links.tsv`），**不要** curl／grep 693KB 的 `raw/chiuinan/list-1.htm`。
2. **庫內矛盾組合**可直接用 `rg`／`jq` 撈候選：
   - `published: false` ＋ `publisher_tw: []` ＋ `localization_level: localized` → 高度可疑（宣稱中文化卻無台灣發行商）
   - `developer_region: CN` ＋ `publisher_tw: []`
3. **民間漢化不算中文化**：`schema.md` 明訂「民間漢化補丁：非商業發行，已不另立等級……改記在 `external_links`，本體標 `packaging`/`foreign`」。條目附「繁中化檔.rar」這類，恰是**沒有官方繁中版**的反面實證。

## 注意事項

- ⚠ **reject 前務必逐款複查**（`game-triage` skill 的最高原則）：chiuinan 有收錄 ≠ 台灣有發行；有 `catalog_id`（SCD 碼）也 ≠ 台灣發行（cdg-2978 就有 SCD0171）。
- ⚠ **簡中版 ≠ 一律 reject**：若查出該款**另有**台灣代理的繁中版或包裝代理足跡，就不是 out of scope，應改標而非剔除。
- **退場一律走 `game-triage` skill**（registry append-only、`status: rejected` ＋ `reject_reason` 固定句式、`rm` 檔案、斷鏈檢查）。
- **斷鏈檢查別漏**：cdg-0587／cdg-2978 都有其他條目正文連入，reject 後需把連結改為純文字（同名／續作的考據事實本身有保留價值）。
- 批量處理時把 registry 標記＋刪檔寫成一次性 `jq`／腳本，別逐檔手 Edit（見 `game-triage` skill 的 no-op 失敗模式警告）。

## 相關

- [kudgame-queue.md](kudgame-queue.md) — B18 的 reject 紀錄與教訓
- [game-entry-review.md](game-entry-review.md) — 個別條目的待複核項
