# 軟體世界版本清單 — 批次撰寫 kick-off

把一份「一行一款」的清單（如 `SW-貴族版list.txt`／`SW-珍藏版list.txt`／`SW-平價版list.txt`，格式 `中文名, "English Name"`）餵給新 session 的 Claude Code，請它**分批、自動接續**地補建遊戲條目。

## 用法

開新 session，把下面整段複製貼上，並把 `<檔案路徑>` 換成你的 txt。CC 每次只做**一個 batch** 就停；想繼續就 reset session 後重貼同一段（它會自動跳過已完成的、從下一款接續），或直接回「再做一批」。

## 設計重點（為何這樣分批）

- **可重入**：靠「英文名 → `derived/softworld-games.json` 反查 release 碼 → 檢查 content 是否已 `published: true` 且含該碼」判斷完成度，reset 後重貼即自動接續，不必記行號。
- **防 context 爆炸雙保險**：①每 session 只做一個 batch 就停；②研究全部外包給平行 research agent，重內容不進主 context。
- **自動調量**：batch 大小由 CC 視款項難度自行縮放（冷門難考據款多就調小）。
- 相關慣例已在 skill `game-entry`（§3 release 碼反查、同名消歧義、誤掛紅旗）與專案 memory（`softworld-edition-batch`、`samename-code-misattribution`）。

---

## Kick-off prompt（複製以下整段）

```text
請接手「軟體世界版本清單」的遊戲條目批次撰寫工作。

【資料來源】<檔案路徑>，一行一款，格式如 `中文名, "English Name"`（同 SW-貴族版list.txt）。

【開工前必做】
1. 用 Skill 載入 `game-entry`（其 §3 已含 release code 反查法、同名消歧義、誤掛紅旗）。
2. 本專案 memory 的 `softworld-edition-batch`、`samename-code-misattribution` 會自動喚起，照其流程與紅旗辦。

【判斷進度（可重入，reset 後自動接續）】
逐行用英文名到 `derived/softworld-games.json` 反查 release code（貴/珍/平 NNN），再到 `content/games` 檢查該款是否已有 `published: true` 且 release_codes 含該碼的條目。已完成的跳過，從第一個未完成處接續。

【一次只做一個 batch（防 context 爆炸的核心規則）】
- batch 大小你自行決定，建議 10–14 款；若清單款項偏冷門、需大量查證，往下調到 8。
- 重內容一律丟平行 research agent（每次開 3–4 個 general-purpose agent、每 agent 3–4 款），要求回傳：結構化事實＋來源 URL＋實際頁面標題、原始發行年 vs 首個 DOS 版年分清、dev＋國別 ISO、是否為「美版改名」（歐/日原作換名）。研究內容留在子 agent，不要把整頁抓進主 context。MobyGames 對 WebFetch 回 403 屬正常。
- 依研究結果：比對既有 stub 分流（fill 既有 / augment 已發佈補碼 / 新建）→ 填 frontmatter（照 schema enum）＋寫 2 段百科散文正文（房屋風格、無考據筆記腔）＋補 references（每事實有來源）＋必要時消歧義/dedup/schema REGIONS 擴充 → 更新 `data/id-registry.json`（新 id append、改名同步）→ 跑 `npm run validate` 到全綠（0 errors）。

【batch 做完就停】
1. 輸出精簡總結表（欄位：release 碼｜中文/英文名｜cdg-NNNN｜genre｜處理方式），＋本次特殊判斷（消歧義、誤植訂正、美版改名、存疑記 backlog 等）。
2. 明確停下，不要自動接下一個 batch。 提醒我：建議 reset session 後重貼這段 kickoff，你會自動偵測已完成、從下一款接續；若我回「再做一批」才繼續。

【全程規則】
- 缺料用 null 不杜撰；單一來源的斷言寧可省略或記 `docs/backlog/game-entry-review.md` 待查證。
- 不要 commit（除非我明講）；改完留未 push diff 供我 review。
- rwv 封面等 raw 圖片路徑/gitignored 圖片不要寫進 frontmatter。

請先讀檔，用一行回報「共 N 款、已完成 M 款、這次處理第 X–Y 行的 K 款」，接著直接開始這一個 batch。
```
