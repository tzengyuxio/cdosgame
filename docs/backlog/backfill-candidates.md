# 補完候選：有 chiuinan 介紹頁的未發佈中文款

**清單**：`derived/backfill-candidates.tsv`（415 款，2026-07-29）
**重跑**：`node scripts/scan_backfill_candidates.mjs`

## 這份清單是什麼

未發佈條目共 1382 款，其中 1020 款帶有 chiuinan 足跡。但「只有 catalog 碼」等於只知道青衫存過這一款、沒有可讀的內容；**有介紹頁連結才有實質資料可考據**。本清單即三個條件的交集：

- `published: false`
- `localization_level` ∈ {`native`, `localized`}——收錄核心的中文遊戲
- `references.chiuinan` 有介紹頁 URL

也就是「範圍內、有料可查、還沒寫」的一群，是挑補完批次時的第一順位。

## 分布

| 面向 | 分布 |
|---|---|
| 中文化程度 | 原生中文 208、中文化 207 |
| 年代 | 1980s 5、1990s 199、2000s 211 |
| 平台 | Windows 322、DOS 52、Win3.1/9x/XP 系 40、未標 1 |

## 使用注意

- **2000 年代那 211 款先過收錄判準再動筆**。近期多批 triage 已剔除大量 2000 年後 Windows 款；這份清單只看中文化程度與有無介紹頁，不含範圍判斷。
- **清單裡混有該 reject 的工具軟體**（如 cdg-0318 中英文輸入練習高手速成、cdg-1655 倉頡輸入法），撞到就走 `game-triage` 剔除，別硬寫。
- 撰寫流程與房屋風格一律走 skill `game-entry`；剔除走 `game-triage`。
- 清單是快照，處理過的條目重跑腳本後會自動消失（發佈後即不符條件）。
