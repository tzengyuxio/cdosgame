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

### 批次 2026-07-19（軟體世界／雜誌廣告批，全 publish:true；查無足跡則簡短 stub 待補）

決策前置：本批皆有雜誌廣告/內文依據；找不到網路資料就寫簡短條目、標明待網站作者補；全部 `published: true`。

**[~] 略過（已發佈、內文充實）**
- [~] 暗黑秘石 — cdg-2468 — Darkstone/Delphine/協和，已發佈
- [~] 模擬城市2000 — cdg-3176 — 已發佈
- [~] 羅宋杜鵑窩 — cdg-3575 — 已發佈
- [~] 馬場大亨 — cdg-3620 — 已發佈（軟體世界 Image #5 可補圖）
- [~] 忍者原人 — cdg-5230 — Joe & Mac，已發佈（電腦休閒世界）

**[ ] 補完既有 stub（published:false → 補完＋publish）**
- [x] 南極冰怪 — cdg-0199 — Prisoner of Ice/Infogrames，智冠·軟體世界，中文訊息中文語音，Image #3（軟世82期）
- [ ] 銀色彈珠檯 — cdg-2926 — Silverball/EPIC，新藝代理發行
- [ ] 燃燒的野球5 — cdg-3324 — Hardball 5/Accolade，軟體世界·智冠，Image #4（軟世82期）
- [x] 諸神的黃昏 — cdg-3339 — Interstel，電腦休閒世界獨家代理
- [x] 上古神兵 — cdg-3895 — 電腦休閒世界獨家代理，中英雙語，CGW全美戰略榜首；軟世54期(1993/9)廣告。★Q1決：與「中古戰史」同款，正文記錄中古戰史（軟世48期1993/3）為早期廣告譯名/別名，不另開 id
- [x] 龍穴歷險記3 — cdg-4083 — Dragon's Lair III，電腦休閒世界獨家代理，卡通動作
- [x] 天命之戰 — cdg-4117 — Battles of Destiny，電腦休閒世界，中英雙語
- [ ] 熱血小毛球 — cdg-4252 — Fury of the Furries，金天才資訊·台灣晶技
- [ ] 戰國群英 — cdg-4387 — Samurai: The Way of the Warrior，立東，戰略

**[ ] 新建**
- [ ] 鐵甲戰士 — new — Rise of the Robots/Mirage，金天才資訊·台灣晶技
- [ ] 原星戰紀：邊境防衛戰 — new — Protostar: War on the Frontier，電腦休閒世界
- [ ] 異形軍團 — new — Xenocide，第三波，動作
- [ ] 歐戰風雲 — new — 資策科技
- [ ] 北非決戰 — new — 資策科技
- [ ] 魔神鍋 — new — Super Cauldron，漢堂，Titus 1992
- [ ] 阿拉伯歷險 狐狸精 — new — 漢堂，Titus 1992
- [ ] 全球效應 — new — Global Effect，電腦休閒世界
- [x] ~~中古戰史~~ — ★Q1決：併入上古神兵 cdg-3895 作別名，不另開 id
- [ ] 爆笑海底城 — new — 電腦休閒世界
- [ ] 決戰保齡球 — new — 九藝資訊，運動，84年3月預定，Image #1（軟世70+71期）
- [ ] 妖局 十六張麻將王 — new — 軟體世界，博弈
- [ ] 夢幻占星館 — new — KIWI，Image #2（軟世70+71期），娛樂占卜工具程式。★Q2決：收錄、publish:true

## 相關檔案

- [kudgame-done-log.md](kudgame-done-log.md) — 完成史（已做完的 20 批，唯讀歸檔）
- [kudgame-followups.md](kudgame-followups.md) — 專案級後續待辦（建頁／補 alias／系列缺口）
- [game-entry-review.md](game-entry-review.md) — 逐條 cdg 欄位待核疑點的正主
