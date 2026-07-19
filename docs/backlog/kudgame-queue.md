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
- [x] 銀色彈珠檯 — cdg-2926 — Silverball/EPIC，新藝代理發行
- [x] 燃燒的野球5 — cdg-3324 — Hardball 5/Accolade，軟體世界·智冠，Image #4（軟世82期）
- [x] 諸神的黃昏 — cdg-3339 — Interstel，電腦休閒世界獨家代理
- [x] 上古神兵 — cdg-3895 — 電腦休閒世界獨家代理，中英雙語，CGW全美戰略榜首；軟世54期(1993/9)廣告。★Q1決：與「中古戰史」同款，正文記錄中古戰史（軟世48期1993/3）為早期廣告譯名/別名，不另開 id
- [x] 龍穴歷險記3 — cdg-4083 — Dragon's Lair III，電腦休閒世界獨家代理，卡通動作
- [x] 天命之戰 — cdg-4117 — Battles of Destiny，電腦休閒世界，中英雙語
- [x] 熱血小毛球 — cdg-4252 — Fury of the Furries，金天才資訊·台灣晶技
- [x] 戰國群英 — cdg-4387 — Samurai: The Way of the Warrior，立東，戰略

**[ ] 新建**
- [x] 鐵甲戰士 — new — Rise of the Robots/Mirage，金天才資訊·台灣晶技
- [x] 原星戰紀：邊境防衛戰 — new — Protostar: War on the Frontier，電腦休閒世界
- [x] 異形軍團 — new — Xenocide，第三波，動作
- [x] 歐戰風雲 — new — 資策科技
- [x] 北非決戰 — new — 資策科技
- [x] 魔神鍋 — new — Super Cauldron，漢堂，Titus 1992
- [x] 阿拉伯歷險 狐狸精 — new — 漢堂，Titus 1992
- [x] 全球效應 — new — Global Effect，電腦休閒世界
- [x] ~~中古戰史~~ — ★Q1決：併入上古神兵 cdg-3895 作別名，不另開 id
- [x] 爆笑海底城 — new — 電腦休閒世界
- [x] 決戰保齡球 — new — 九藝資訊，運動，84年3月預定，Image #1（軟世70+71期）
- [x] 妖局 十六張麻將王 — new — 軟體世界，博弈
- [x] 夢幻占星館 — new — KIWI，Image #2（軟世70+71期），娛樂占卜工具程式。★Q2決：收錄、publish:true

### 批次 2026-07-19b（第三波「原裝光碟精品」目錄，進口西洋遊戲；packaging＋第三波代理＋en）

決策前置：全批第三波原裝光碟進口，在收錄範圍（thirdwave-early-imports 慣例）。Q1決＝合集款建獨立條目；Q2決＝古靈精怪大冒險 build 階段研究確認同款/新款。內容完整 publish:true，查無足跡 stub false。新 id 從 cdg-5246 起。

**[~] 已存在且已發佈（有正文 ~330 字，抽驗即可）**
- [~] 機甲神兵 — cdg-4664 — 機甲神兵：地球防衛戰 EarthSiege
- [~] 國王密使VII — cdg-1049 — 國王密使7：沒有王子的新娘
- [~] 大競技場 — cdg-4666 — 機甲神兵：大競技場 Battledrome
- [~] 奇妙大百科II — cdg-1297

**[ ] 空 stub 需補完（published:false、正文 0 字）**
★triage 更正：Gabriel Knight＝狩魔獵人（非幽魂）；Phantasmagoria＝幽魂。
- [x] 凱蘭迪亞傳奇III — cdg-2935 — 瑪爾寇的復仇 Westwood
- [x] 幽魂 — cdg-0607 — Phantasmagoria（Sierra/Roberta Williams 1995），非 Gabriel Knight
- [x] Gabriel Knight II — cdg-3529 — 狩魔獵人2：心魔 The Beast Within（sibling cdg-3528 狩魔獵人：原罪 已發佈 localized）

（cdg-0608 Phantasmagoria 2 非本清單款，暫不處理）

**[ ] 新建（第三波代理，publish:true；查無足跡則 stub）**
- [!] 勁爆美國職棒 — cdg-5246 — 抽驗是否＝cdg-3004 勁爆美國棒球(Triple Play)，否則新建
- [!] 海底英雄 — cdg-5247
- [!] 夢魘 — cdg-5248
- [x] 異星特警 — cdg-5249 — Creature Shock/Argonaut 1994
- [x] 雲絲頓賽車 — cdg-5250 — NASCAR Racing/Papyrus 1994 — Winston/NASCAR 賽車
- [x] 機甲神兵--任務片 — cdg-5251 — EarthSiege Expansion Pack/Dynamix 1995
- [!] 大君主戰役 — cdg-5252 — 原作未證(released stub)；疑 Warlords II，見 review
- [x] 失落的伊甸園 — cdg-5253 — Lost Eden/Cryo 1995
- [!] 鐵血殺手 — cdg-5254 — 原作未證(released stub)
- [!] Wild Blue Yonder I — cdg-5258 — 軍機互動紀錄光碟/Digital Ranch 1994（預告 unverified）
- [!] Wild Blue Yonder II — cdg-5259 — Digital Ranch 1995（預告 unverified）
- [x] 宇宙傳奇6 — cdg-5260 — Space Quest 6/Sierra 1995（release_status unverified，第三波預告）
- [ ] Last Dynasty — new
- [ ] 3D Ultra Pinball — new — Sierra
- [ ] Lost in Town — new
- [ ] The Daedalus Encounter — new — FMV
- [ ] 警察故事V－霹靂小組 — new — Police Quest: SWAT（承 cdg-4649 警察故事4）
- [ ] 機甲神兵II－空中武力 — new — EarthSiege 2/空中武力
- [ ] 南北戰爭 — new — Civil War 主題
- [ ] 第七訪客II－第十一小時 — new — The 11th Hour（注意 第七訪客 7th Guest 本身未收）
- [x] 幻想空間合集 — cdg-5255 — Larry Greatest Hits/Sierra 1994
- [x] 空戰英雄精典合集 — cdg-5256 — Aces Collector's Edition/Dynamix 1995
- [x] 古靈精怪大冒險 — cdg-5257 — Woodruff and the Schnibble/Coktel Vision 1994（與 cdg-0926 不同款）

★型錄檔 content/topics/第三波綜合軟體目錄.md「原裝光碟精品系列」為權威足跡：已發行款(53186JNNN)標 release_status:released＋release_codes；「預告」款(幽魂/GK II 已補完，其餘機甲神兵任務片除外)標 release_status:unverified。已發行有碼：機甲神兵任務片 J062、大君主戰役 J064、失落的伊甸園 J065、鐵血殺手 J066、幻想空間合集 J044、空戰英雄合集 J061、古靈精怪大冒險 J063。預告款：Wild Blue Yonder I/II、宇宙傳奇VI、Last Dynasty、3D Ultra Pinball、Lost in Town、Daedalus、警察故事V、機甲神兵II、南北戰爭、第七訪客II。

## 相關檔案

- [kudgame-done-log.md](kudgame-done-log.md) — 完成史（已做完的 20 批，唯讀歸檔）
- [kudgame-followups.md](kudgame-followups.md) — 專案級後續待辦（建頁／補 alias／系列缺口）
- [game-entry-review.md](game-entry-review.md) — 逐條 cdg 欄位待核疑點的正主
