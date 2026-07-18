# kudgame 批次補完佇列

批次補完/新建遊戲條目的**進度佇列**（只放當輪待處理批次）。搭配 CLAUDE.md〈批次補完工作流〉使用。

**怎麼用**：一次把一整批遊戲名貼給 Claude（20–30 款也行），它先做 triage、把要你決定的事一次問完並填進此檔，再分批（每 5 款）build。你只需在 triage 階段回答判斷、在 Claude 提示時說「繼續 kudgame queue」。

**狀態圖例**：
- `[x]` 完成（補完或新建，已 publish）
- `[~]` 略過（已存在且已發佈，無需處理）
- `[!]` 建 stub（查無足跡，unverified、留白待考）
- `[ ]` 待處理（triage 過、等 build）
- `[?]` 卡住（需你決定，備註寫原因；決定後才轉 `[ ]`）

格式：`- [狀態] 遊戲名 — cdg-NNNN — 一句備註`。待考細節寫進 [game-entry-review.md](game-entry-review.md)，此檔只記狀態。

---

## 目前佇列

**目前無待處理批次。** 新一批 triage 時在此新增（每批一個 `## 標題`，逐款 `- [狀態] …`）。

## 相關檔案

- [kudgame-done-log.md](kudgame-done-log.md) — 完成史（已做完的 20 批，唯讀歸檔）
- [kudgame-followups.md](kudgame-followups.md) — 專案級後續待辦（建頁／補 alias／系列缺口）
- [game-entry-review.md](game-entry-review.md) — 逐條 cdg 欄位待核疑點的正主
