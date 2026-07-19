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
- [x] Last Dynasty — cdg-5261 — The Last Dynasty/Coktel 1995（unverified）
- [x] 3D Ultra Pinball — cdg-5262 — Dynamix 1995（unverified）
- [x] Lost in Town — cdg-5263 — Urban Runner/Coktel 1996（unverified）
- [x] The Daedalus Encounter — cdg-5264 — Mechadeus/Virgin 1995（unverified）
- [x] 警察故事V－霹靂小組 — cdg-5265 — 警察故事5：霹靂小組 Police Quest: SWAT/Sierra 1995（unverified）
- [x] 機甲神兵II－空中武力 — cdg-5266 — 機甲神兵2：空中武力 EarthSiege 2/Dynamix 1996（unverified）
- [!] 南北戰爭 — cdg-5267 — 原作未證(unverified stub)，SLG
- [x] 第七訪客II－第十一小時 — cdg-5268 — 第七訪客2：第十一小時 The 11th Hour/Trilobyte 1995（unverified）
- [x] 幻想空間合集 — cdg-5255 — Larry Greatest Hits/Sierra 1994
- [x] 空戰英雄精典合集 — cdg-5256 — Aces Collector's Edition/Dynamix 1995
- [x] 古靈精怪大冒險 — cdg-5257 — Woodruff and the Schnibble/Coktel Vision 1994（與 cdg-0926 不同款）

★型錄檔 content/topics/第三波綜合軟體目錄.md「原裝光碟精品系列」為權威足跡：已發行款(53186JNNN)標 release_status:released＋release_codes；「預告」款(幽魂/GK II 已補完，其餘機甲神兵任務片除外)標 release_status:unverified。已發行有碼：機甲神兵任務片 J062、大君主戰役 J064、失落的伊甸園 J065、鐵血殺手 J066、幻想空間合集 J044、空戰英雄合集 J061、古靈精怪大冒險 J063。預告款：Wild Blue Yonder I/II、宇宙傳奇VI、Last Dynasty、3D Ultra Pinball、Lost in Town、Daedalus、警察故事V、機甲神兵II、南北戰爭、第七訪客II。

### 批次 2026-07-19c（第三波「光碟世界」目錄，進口/代理；packaging＋第三波＋多 en）

決策前置（已答）：Q1＝捍衛雄鷹光碟黃金版(Falcon Gold)註記在 cdg-3048 不另開 id；Q2＝黃金版獨立款(F-14艦隊防衛者/1942太平洋空戰)一律新開 id；Q3＝既有已發佈 8 款補一句第三波光碟世界代理/黃金版足跡。內容完整 publish:true，查無足跡 stub false。新 id 從 cdg-5269 起（16 款）。

**[~] 既有已發佈 → 補第三波光碟足跡（一句代理/黃金版註記）**
- [x] 黑暗王座 — cdg-2274 — Lands of Lore
- [x] 決戰大魔域 — cdg-1152 — Return to Zork
- [x] 殖民帝國 — cdg-4249 — Colonization
- [x] 太空大富翁 — cdg-4527 — Gazillionaire
- [x] 幽浮2－深海出擊 — cdg-0601 — X-COM: Terror from the Deep
- [x] 雷電 — cdg-2681 — Raiden；原為空stub，補最小正文＋足跡（仍 published:false）
- [x] 楚留香傳奇（中文版）— cdg-3108 — 楚留香傳奇之血海飄香
- [x] 捍衛雄鷹（光碟黃金版）— cdg-3048 — Falcon Gold＝Falcon 3.0 CD 再版，註記於此

**[ ] 既有空 stub（published:false）→ 補完＋publish**
- [x] 幽浮 — cdg-4209 — X-COM: Enemy Unknown / UFO Defense
- [x] 運輸大亨 — cdg-2583 — Transport Tycoon
- [x] 魔法大帝 — cdg-4276 — 魔法帝國 Master of Magic（別名已含魔法大帝）
- [x] 銀河飛龍－統一大業 — cdg-2919 — ST:TNG A Final Unity
- [!] 夢魘 — cdg-5248 — 原作查無（Noctropolis/Dark Eye/Shivers 皆無據），維持 stub false — 上一批已建 stub，本批補

**[ ] 新建（第三波代理，publish:true；查無足跡則 stub）**
- [x] 龍之封印 — cdg-5269 — Dragonsphere/MicroProse 1994，碼53186J031 released publish（辨識中高信心）
- [!] 狂飆武士 — cdg-5270 — 碼53186J041 released但原作未確認，stub false
- [!] 星戰風雲 — cdg-5271 — 碼53186J042；疑Star Crusader(GameTek/Take-Two 1994)未證，stub false
- [x] 飛虎戰將 — cdg-5272 — Flying Tigers/Ticsoft 1994，碼53186J045 released publish
- [R] 太空小英豪 — cdg-5273 — SpaceKids(Evryware/MicroProse 1994) 兒童edutainment，SCOPE reject 不建檔，registry記rejected
- [x] 拂曉巡弋 — cdg-5274 — Dawn Patrol/Rowan-Empire 1994，碼53186J068 released publish
- [!] 星艦傳奇 — cdg-5275 — 疑Starlord/Third Millennium 1993(中信心)，型錄預告 unverified stub
- [!] 謀略王子 — cdg-5276 — Machiavelli the Prince/Holistic 1995，預告 unverified stub
- [!] 比薩大亨 — cdg-5277 — Pizza Tycoon/Cybernetic-MicroProse 1994，預告 unverified stub
- [!] 齊柏林飛船 — cdg-5278 — Zeppelin: Giants of the Sky/Ikarion 1994，預告 unverified stub
- [x] 2050海底戰爭 — cdg-5279 — Subwar 2050/Particle Systems 1993，碼53186J048 released publish
- [!] Nerves of Steel — cdg-5280 — Rainmaker/Merit 1995 FPS，型錄預告 unverified stub
- [!] Narvester — cdg-5281 — 確為 Harvester(DigiFX/Merit 1996)，型錄以Narvester列預告 unverified stub
- [!] Top Gun — cdg-5282 — Top Gun: Fire at Will(SpectrumHoloByte 1996)，預告 unverified stub
- [x] F-14艦隊防衛者（黃金版）— cdg-5283 — Fleet Defender Gold/MicroProse，型錄碼53186J047 released publish
- [!] 1942太平洋空戰（光碟黃金版）— cdg-5284 — 1942 Pacific Air War Gold/MicroProse 1994，預告 unverified stub

### 批次 2026-07-19d（第三波「遊戲休閒系列」目錄，磁片時代代理主力；碼 53196GNNN。多為光榮 KOEI 歷史 SLG 中文版與西洋中文化大作）

決策前置（已答）：Q1＝任務片（戰虎行動、無敵飛狼任務片）**獨立建條**（比照 cdg-5251 機甲神兵任務片），主程式互 sibling 連結；Q2＝彈子檯 cdg-3025 vs cdg-4173 於 build 階段研究後決定合併或分立；Q3＝跳躍小頑童查無足跡→**建 stub published:false**；Q4＝四川省 cdg-4086 併入 cdg-1032（game-triage）。既有已發佈款補一句第三波遊戲休閒代理足跡（碼）。新 id 從 cdg-5285 起。權威足跡＝content/topics/第三波綜合軟體目錄.md〈遊戲休閒系列〉表。

**[ ] 既有已發佈 → 補第三波遊戲休閒代理足跡（一句＋碼）**
- [x] 三國志 II／三國志 II（中文版）— cdg-0211 — G001/G020（中日文同條）
- [x] 成吉思汗／成吉思汗（中文版）— cdg-3465 — G003/G040
- [x] 信長之野望 II — cdg-1638 — G004
- [x] 大航海時代／大航海時代（中文版）— cdg-0418 — G006/G050
- [x] 將族（中文版）— cdg-2147 — G007（光譜 象棋大師3）
- [x] 奇人黑桃 2（中文版）— cdg-1295 — G013
- [x] 沙丘魔堡（中文版）— cdg-1174 — G015（Cryo Dune）
- [x] 文明帝國 — cdg-2303 — G016
- [x] 精典俄羅斯方塊 — cdg-2107 — G017（Tetris Classic）
- [x] 超級俄羅斯方塊 — cdg-2186 — G018（Super Tetris；勿混 cdg-2187）
- [x] 巫術七代 — cdg-1105 — G024（Wizardry 7）
- [~] 水滸傳 — cdg-3901 — G002；⚠cdg-3901=軟體世界版(非第三波)，足跡歸 cdg-0621，型錄 G002→0621 維持不改
- [x] 水滸傳（中文版）— cdg-0621 — G031（天命之誓 中文版）
- [x] 巫術六代（中文版）— cdg-1104 — G032
- [x] 沙丘魔堡 II — cdg-1175 — G035（Westwood Dune II）
- [x] 凱蘭迪亞傳奇（中文版）— cdg-2933 — G042
- [x] 三界諭－邦沛之謎（中文版）— cdg-0202 — G046
- [x] 信長之野望（中文版）— cdg-1637 — G053；比照 cdg-1638：publisher 併列第三波＋加中文版足跡＋release_code 53196G053，型錄 G053→cdg-1637 已連
- [x] 四川省III（中文版）— cdg-1032 — G058

**[ ] 既有空 stub（published:false）→ 補完＋publish**
- [x] B17 飛行堡壘 — cdg-0045 — G038 — Vektor Grafix B-17 Flying Fortress 1992（勿混 cdg-0044 Mighty 8th）
- [x] 世紀金冠軍 — cdg-4197 — G048 — MicroProse World Circuit/F1GP（勿混 cdg-0403 GP2）
- [x] 彈子檯 — cdg-3025 — G049 — Littlewing Tristan；複查確認 cdg-4173「3D立體彈子檯」為同款(oldgame.tw 來源原配 Tristan)，已 merge→cdg-3025
- [x] 腦筋急轉彎 — cdg-2151 — G056 — 新造科技 象棋殘局經典

**[ ] 新建（第三波代理，publish:true；查無足跡則 stub）**
- [x] 捍衛雄鷹 3.0（任務片）—戰虎行動 — cdg-5285 — G030 — Falcon 3.0: Operation Fighting Tiger，sibling cdg-3048
- [x] 無敵飛狼（任務片）— cdg-5286 — G044 — Gunship 資料片，sibling cdg-3912
- [x] 跳躍小頑童 — cdg-5287 — G055 — 查無足跡，stub published:false 待考

**[ ] 合併（game-triage）**
- [x] 四川省III 天府之國 — cdg-4086 → 併入 cdg-1032

## 相關檔案

- [kudgame-done-log.md](kudgame-done-log.md) — 完成史（已做完的 20 批，唯讀歸檔）
- [kudgame-followups.md](kudgame-followups.md) — 專案級後續待辦（建頁／補 alias／系列缺口）
- [game-entry-review.md](game-entry-review.md) — 逐條 cdg 欄位待核疑點的正主
