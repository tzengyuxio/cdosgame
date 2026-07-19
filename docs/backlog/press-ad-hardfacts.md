---
status: pending
created: 2026-07-19
source: press-import（raw/media/_inbox 電腦玩家96＋軟體世界多期批次）
---

# ad 廣告硬事實擷取（press-import 續辦）

2026-07-19 一批 inbox 掃描已跑完 press-import 的**入庫＋press 正文**兩步：
- 圖片入庫：62 條目 69 圖（56 ad + 13 press）已 `process_media --write`，inbox 已清空。commit `dafdcda4`（media 入庫）、`715c051e`（12 款 press 正文），**未 push**。
- press 13 張報導已補正文＋keyed footnote＋caption。

**本檔待辦＝剩下 56 張 ad 廣告的「硬事實擷取」**（使用者決策：ad 只入庫＋擷取客觀硬事實，純宣傳語氣不寫）。

## 做法（接手時照跑）

1. ad 圖已入庫，**原圖在 `raw/media/games/cdg-NNNN/*ad*`**、webp 在 `public/media/games/cdg-NNNN/ad-*.webp`；刊物期號見各條目 `media[]` 的 caption。
2. **分批**（每 6–8 款）開 subagent 讀 1 張 ad 原圖＋對應條目，**只回報條目目前缺、而廣告能佐證的客觀事實**：上市確認／售價／台灣代理／系統需求／版本（貴族版等）／發行日。**主觀宣傳語一律不採**。
3. 主線核對後補正文（房屋風格走 skill `game-entry`）：
   - 每句廣告新增事實句末加 `<sup class="cite" data-ref="<KEY>"></sup>`。
   - footnote key：電腦玩家96＝`pcgamer96`；軟體世界＝`softworld<期>`（如 `softworld48`）。**先查該條目是否已有既存 footnote key（如 fn01/fn-ad），有就沿用、別新造 dangling**。
   - footnote 定義與 media caption 一律**主線統一設**（subagent 不碰 frontmatter），`npm run validate` 後檢查無 dangling cite（validate 本身不抓 dangling）。
4. **優先**處理 stub／缺 year／缺 publisher_tw 的條目；已完整的條目若廣告加不了新客觀事實，**ad 只入庫、正文不動**（勿為補而補）。
5. frontmatter 的 developer/publisher/year/genre **不因單張廣告更動**，有出入只列複查清單。
6. commit 拆：`content(games): N 款補廣告硬事實`。未 push。

## 56 張 ad 待處理清單（55 條目，cdg-3895 有兩張）

電腦玩家96 與軟體世界（第48/50/54/60/82/90 期等）混合，刊期見各條目 caption：

cdg-0199 cdg-0640 cdg-0712 cdg-0761 cdg-0864 cdg-0902 cdg-1068 cdg-1134 cdg-1417 cdg-1620 cdg-2229 cdg-2242 cdg-2309 cdg-2314 cdg-2357 cdg-2449 cdg-2468 cdg-2542 cdg-2733 cdg-2925 cdg-2926 cdg-3176 cdg-3190 cdg-3232 cdg-3274 cdg-3277 cdg-3324 cdg-3339 cdg-3436 cdg-3468 cdg-3556 cdg-3620 cdg-3732 cdg-3739 cdg-3895 cdg-4069 cdg-4083 cdg-4117 cdg-4252 cdg-4391 cdg-5155 cdg-5215 cdg-5216 cdg-5218 cdg-5224 cdg-5230 cdg-5232 cdg-5233 cdg-5234 cdg-5238 cdg-5239 cdg-5240 cdg-5241 cdg-5243 cdg-5245

> 註：2309/2449/3190/5215/5238 同時是本批 press（正文已充實），其 ad 廣告優先度低。

## press 批遺留的待人工複查（已於 2026-07-19 裁定完畢）

- cdg-5244 夢幻占星館：`publisher_tw` 改 `[]`（出版公司未定）。✅
- cdg-4387 戰國群英：正文已改「已知台灣由立東代理」、footnote 待查證措辭已移除。✅
- cdg-2449 時空英豪：移除硬體需求描述（P3／P200MMX），正文以遊戲內容為主。✅
- cdg-5215 美夢成真：「經紀公司雜誌編輯」與「記者」無實質出入，維持不改。✅
