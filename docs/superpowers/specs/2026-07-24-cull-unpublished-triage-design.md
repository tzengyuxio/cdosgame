# 未發佈條目淘汰 sweep — 設計

## 問題

content/games 有 1795 筆 `published: false`（總 4266）。其中 1714 為 stub（正文 <50 字），
逐筆研究補完是長期戰。第一步先**淘汰不該收的、縮小母體**，再談逐批補完。

## 目標

用便宜訊號把「疑似該淘汰」撈成候選桶，高精度桶批次核准、高風險桶逐筆抽驗，
決策前置，交給 `game-triage` skill 執行 reject/merge。

## 四桶（按精度高→低、便宜→貴排序）

| # | 桶 | 偵測訊號 | 精度 | 審查 |
|---|---|---|---|---|
| 1 | 學習/教材/工具 | 標題關鍵字（學習/教學/百科/字典/打字/教材…）+ 已知 edutainment | 高 | 批次核准，邊界逐筆 |
| 2 | post-2000 非重要 | `year>2002` 且 publisher 不在代表廠商白名單 | 中 | 逐筆快掃（巴冷公主類要留） |
| 3 | 無台灣足跡純外文 | developer_region 非華語圈 + `publisher_tw` 空 + 無 chiuinan intro | 低 | **逐筆抽驗**（譯名用錯會假陰） |
| 4 | 重複/同款合併 | `scripts/triage_fuzzy.py` fuzzy 比標題（另跑，非 scan 內建） | 低 | **逐筆**（同名撞號掛錯貴/珍碼） |

## 流程

1. `scripts/scan_cull_candidates.mjs`：掃 1795 筆，每筆標命中訊號，輸出
   `derived/cull-candidates.tsv`（id/title/year/dev/region/pub/signals/建議）。主線只讀摘要。
2. `docs/backlog/cull-queue.md`：進度佇列（狀態圖例＋已決策），斷點可 reset 後「繼續 cull queue」接手。
3. 逐桶用 `AskUserQuestion` 分片拍板；桶 1 整批 approve，桶 3/4 附證據逐筆問。
4. 確認 reject/merge → `game-triage` skill（registry append-only 記 reason、刪檔/redirect），
   commit 拆 content／registry 兩筆並更新 queue。

## 護欄

- 桶 3/4 一律逐筆抽驗、不整批殺。
- scan 若對母體設上限，`log` 出被略過的，不靜默截斷。
- 精度取向高精度優先（寧漏撈、不誤殺），母體大寧可多跑幾輪。
- 內容慣例走 skill `game-triage`；本 sweep 只固化「分桶＋決策前置＋斷點」。
