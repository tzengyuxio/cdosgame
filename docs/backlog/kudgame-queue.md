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

### 批次 2026-07-19e（第三波「遊戲休閒系列」目錄 G060–G091；西洋飛行/戰爭模擬＋光榮 SLG 中文版）

決策前置（已答）：Q1＝捍衛雄鷹3.0E G068 併註 cdg-3048（比照 Falcon Gold）；Q2＝任務片 G074 MIG29／G081 大黃蜂**都獨立建條**（比照 cdg-5285/5286），G074 sibling cdg-4914；Q3＝絕地戰士 G085 build 研究辨識 cdg-2097 vs cdg-2098 後補正確那款、另一款不動；Q4＝末世紀 G077／血網 G078 查無足跡→建 stub false。deterministic：G067＝G089 阿卡尼亞同款都掛 cdg-1337；G091 F-14 掛既有 cdg-4886；G084 2050 掛 cdg-5279。新 id 從 cdg-5288 起。

**[ ] 既有已發佈 → 補第三波遊戲休閒代理足跡（一句＋碼）**
- [x] 拿破崙（中文）— cdg-3042 — G060（KOEI；另有英文版 G005 同條）
- [x] 大海盜（黃金版）— cdg-4557 — G061（Pirates! Gold）
- [x] 三國志 III（中文版）— cdg-0212 — G063
- [x] 海獵鷹戰機 — cdg-4685 — G065（Harrier Combat Simulator）
- [x] 鐵路大亨（豪華版）— cdg-4558 — G069（Railroad Tycoon Deluxe）
- [x] 魔法皇冠（中文版）— cdg-4113 — G070
- [x] 元朝祕史（中文版）— cdg-3466 — G072
- [x] 黑暗王座（中文版）— cdg-2274 — G076（已有光碟世界足跡，若已提第三波則 skip）
- [x] 歐陸戰線（中文版）— cdg-3885 — G079
- [x] 伊忍道（中文版）— cdg-1586 — G082
- [x] 智聖鮮師（中文版）— cdg-3932 — G083（第三波自製）
- [x] 2050海底戰爭 — cdg-5279 — G084（c批已建，補 G084 碼/足跡）
- [x] 命運之手（中文版）— cdg-2934 — G086
- [x] 武將風雲錄（中文版）— cdg-1639 — G088
- [x] F-14艦隊防衛者 — cdg-4886 — G091（基礎版；c批 cdg-5283=黃金版，補足跡＋釐清命名避免與 5283 混淆）

**[ ] 既有款補註（併版本，不另開 id）**
- [x] 捍衛雄鷹3.0E — cdg-3048 — G068 併註 enhanced 版＋碼 53196G068（比照 Falcon Gold）

**[ ] 既有空 stub（published:false）→ 補完＋publish**
- [x] 阿卡尼亞傳說 — cdg-1337 — G067＋G089（含攻略本同款，Realms of Arkania 1）
- [x] 人類也瘋狂 — cdg-1560 — G080（The Humans）
- [x] 絕地戰士 — cdg-2097 — G085；辨識＝In Extremis(3WG085 相符)，補完 publish；cdg-2098(Total Mayhem/SCD2473)未動

**[ ] 新建（第三波代理，publish:true；查無足跡則 stub）**
- [x] F-15鷹式戰鬥機III — cdg-5288 — G066 — F-15 Strike Eagle III/MicroProse 1992
- [x] NFL美式足球教練俱樂部 — cdg-5289 — G071 — NFL Coaches Club Football/Dynamix
- [x] 銀河霸王 — cdg-5290 — G073 — 疑 Master of Orion/MicroProse（build 確認）
- [x] MIG29（任務片）— cdg-5291 — G074 — MiG-29: Deadly Adversary of Falcon 3.0/SpectrumHoloByte，sibling cdg-3048(非4914)
- [x] 歌劇魅影 — cdg-5292 — G075 — Phantom of the Opera（冒險）
- [x] 末世紀 — cdg-5293 — G077 — 查無足跡，stub false
- [x] 血網 — cdg-5294 — G078 — BloodNet/MicroProse 1993 RPG，publish true
- [x] 大黃蜂（任務片）— cdg-5295 — G081 — F/A-18 Hornet 資料片（主程式不在庫，獨立建）
- [x] 1942特遣艦隊 — cdg-5296 — G087 — Task Force 1942/MicroProse
- [x] 印地大賽車 — cdg-5297 — G090 — 疑 IndyCar Racing/Papyrus 1993（build 確認）

### 批次 2026-07-19f（第三波「遊戲休閒系列」G092–G116＋預告；與 b/c/d 批大量重疊，多為補 G-code 磁片足跡）

決策前置（已答）：Q1＝武士戰弈查無足跡→建 stub false；Q2＝可辨識原作者（光榮戰役 Fields of Glory／雷電 Raiden）補完發佈、其餘 unverified stub 維持只補足跡。deterministic：跨型錄同款 SKU（龍之封印/1942太平洋空戰）同條目並列磁片碼不拆款；G115 異星殖民篇維持併入 cdg-2583；G099 掛 cdg-4914；預告款補型錄連結。新 id cdg-5298。

**[ ] 既有款補 G-code 磁片足跡（release_codes＋provenance）**
- [x] 獨立戰爭（中文版）— cdg-3540 — G092
- [x] 大航海時代II（中文版）— cdg-0419 — G094
- [x] 項劉記（中文版）— cdg-3915 — G098
- [x] 三國志IV（中文版）— cdg-0213 — G100（＋預告 IV威力加強版同條）
- [x] 百戰水管工（中文版）— cdg-3842 — G105
- [x] 太閤立志傳（中文版）— cdg-0503 — G106
- [x] A列車4（中文版）— cdg-0040 — G108
- [x] 航空霸業II（中文版）— cdg-0861 — G110
- [x] 霸王傳（中文版）— cdg-1640 — G111
- [x] 龍之封印 — cdg-5269 — G096（跨SKU，並列磁片碼）
- [x] 米格廿九支點戰鬥機 — cdg-4914 — G099（MiG-29 Fulcrum，≠cdg-5291任務片）
- [x] 幽浮 — cdg-4209 — G101
- [x] 殖民帝國・美麗新世界 — cdg-4249 — G103（美麗新世界＝行銷副標非資料片）
- [x] 魔法大帝 — cdg-4276 — G104
- [x] 飛虎戰將 — cdg-5272 — G109
- [x] 楚留香傳奇（中文版）— cdg-3108 — G112
- [x] 運輸大亨 — cdg-2583 — G114（＋G115 異星殖民篇=Deluxe 火星圖檔擴充，併入）
- [x] 拂曉巡弋 — cdg-5274 — G116
- [x] 幽浮2－深海出擊 — cdg-0601 — 預告
- [x] 三國志英傑傳 — cdg-0229 — 預告

**[ ] 既有空 stub → 補完＋publish**
- [x] 光榮戰役 — cdg-4203 — G095 — Fields of Glory/MicroProse 1993（≠cdg-1155 Pacific Gunner）
- [x] 雷電 — cdg-2681 — G097 — Raiden/Seibu

**[ ] 既有未發佈 stub → 只補 G-code 足跡，維持 published:false**
- [x] 狂飆武士 — cdg-5270 — G107
- [x] 夢魘 — cdg-5248 — G113
- [x] 1942太平洋空戰 — cdg-5284 — G102（跨SKU 磁片碼）

**[ ] 新建**
- [x] 武士戰弈 — cdg-5298 — G093 — 查無足跡 stub false

### 批次 2026-07-19g（廠商雜牌批：立東／亞洲金磁片／松崗／終結者／新世界／電腦休閒世界／漢堂／熊貓等；56 款）

決策前置：多數既有。查無足跡→stub false；可辨識原作→補完/新建 publish。4 個 AMBIGUOUS 待答（見下 ★）。

**[~] 略過（已發佈、內文充實，抽驗即可）**
- [~] 聖城劫 — cdg-3897（安寶/精訊；立東為別代理，正文可補一句立東足跡）
- [~] 戰國群英 — cdg-4387（立東 Samurai，a 批已做）
- [~] 嬉笑春秋 — cdg-1095（松崗/博羽）
- [~] 波斯王子 — cdg-1189（終結者為廉價再版代理）
- [~] 春之石 — cdg-4955（Pinball Dreams；終結者再版）
- [~] 創世紀Ⅴ — cdg-2967（智冠＋終結者資訊）
- [~] 轟炸大隊 — cdg-4988（第三波＋精訊；終結者再版）
- [~] 信長之野望II 戰國群雄傳 — cdg-1638（新世界＝代理之一）
- [~] 魔域聖戰／戰神 — cdg-3399（同一條，新世界55＝電腦休閒世界「戰神」）
- [~] 忍者原人 — cdg-5230（電腦休閒世界，a 批已做）
- [~] 俠影記 — cdg-1628（智冠）
- [~] 黑暗之蠱 — cdg-2269（Cyberdreams Darkseed/智冠）
- [~] 羅賓漢 — cdg-3975（Sierra Conquests of the Longbow/軟世；電腦休閒世界再版）
- [~] 鐵路A計劃 — cdg-0039（Artdink A列車/智冠）
- [~] 決戰撲克 — cdg-4250（QQP/智冠）
- [~] 模擬城市2000 摩登都會 — cdg-3176（Maxis/智冠）
- [~] 大時代的故事 — cdg-3849（漢堂自製）
- [~] 火車大戰略 — cdg-4532（Silmarils/漢堂）
- [~] 王子傳奇 — cdg-0635（亞博克/漢堂）
- [~] 外星大富翁 — cdg-0704（LINEL/漢堂）
- [~] 西洋封神榜 — cdg-0891（Bitmap Brothers/漢堂＋智冠）
- [~] 武林奇俠傳 — cdg-0738（漢堂自製）
- [~] 風塵三俠之金箭使者 — cdg-1508（漢堂自製）
- [~] 夏日物語 — cdg-1701（KINOKO/漢堂）
- [~] 三國志武將爭霸2 — cdg-0227（熊貓）
- [~] 天才寶寶大進擊 — cdg-0467（熊貓）
- [~] 赤壁之戰 — cdg-3359（熊貓；勿混 3360 前導軟件）
- [~] 爆笑保齡球 — cdg-3331（熊貓）
- [~] 爆笑躲避球 — cdg-3332（熊貓）
- [~] 魔域傳說永恆之書 — cdg-3671（Falcom/歡樂盒）
- [~] 台北夢幻幾何 — cdg-0931（花與蝴蝶/資策科技）

**[ ] 補完既有短條/待發佈（published:false 或極短 → 補完＋publish）**
- [x] 射波 — cdg-3896（安寶/立東；擴寫＋dev 安寶vs安華爭議記 review）
- [x] 百戰小旅鼠2 — cdg-5229（Lemmings 2/DMA；publish）
- [x] 神勇毛毛蟲 — cdg-5231（Creepers/Destiny Software 1993；publish）
- [x] 太空魯賓遜 — cdg-3904（Robinson's Requiem/Silmarils 1994）
- [x] 永恆之門 — cdg-4153（Ishar 3/Silmarils 1994；系列＝無限之門）
- [x] 地下城主 — cdg-0758（FTL Dungeon Master 1987/松崗代理）
- [x] 妙探闖通關 大腳之謎 — cdg-1084（Sam & Max Hit the Road/LucasArts 1993）
- [x] 魔石堡 — cdg-3768（Stonekeep/Interplay 1995）
- [x] 風火跳棋2 — cdg-1513（倚天自製 1991）
- [x] 三角跳棋 — cdg-0268（船塢資訊自製 1990，孔明棋變體）
- [x] 終極航艦 — cdg-2079（Carrier Command/Realtime GB 1988；genre→RTS）
- [x] 回到大魔域 — cdg-1041（Neverending Story II/LinEL 瑞士 1990；region CH）
- [x] 龍魂 — cdg-3834（Dragon Spirit/Namco 1987）

**[ ] 新建（NOT FOUND；研究有原作→publish，查無→stub false）**
- [!] 魔法王國 — cdg-5299 — 立東，查無足跡 stub false（疑與魔法口袋 cdg-5093 混淆，待證）
- [!] 宇宙戰艦 — cdg-5300 — 亞洲金磁片03，查無足跡 stub false
- [!] 帝國生死鬥 — cdg-5301 — 松崗，查無足跡 stub false
- [x] 絕地大反攻2 — cdg-5302 — Star Wars: Rebel Assault II/LucasArts 1995，松崗，publish
- [x] 哈雷計畫 — cdg-5303 — The Halley Project/Mindscape 1985，終結者資訊，publish
- [x] 齊爾達傳說 — cdg-5304 — Zeliard/Game Arts 1990（非任天堂 Zelda），新世界38，publish
- [!] 短路小旅鼠 — cdg-5305 — 新世界61，查無定論 stub false
- [!] 火爆摔角 — cdg-5306 — 新世紀M003，查無 stub false
- [x] 帝國之光榮 — cdg-5307 — 資策科技台灣自製 SLG 1992（有續作II），publish

**[ ] AMBIGUOUS — 已答（決策已定）**
- [x] 龍之道（立東）— cdg-4280 補完＝Drakkhen(Infogrames 1989)＋掛立東，publish（判定同款，未新建）
- [!] 頑皮貓（亞洲金磁片16）— cdg-5308 新建 stub false（≠cdg-4159＝Alley Cat；4159 標題已改「頑皮貓（Alley Cat）」對稱消歧義）
- [x] 橫掃千軍（美商新美）— cdg-3231 補完 TA 本體(Cavedog 1997)＋掛美商新美(GT Interactive 台灣)＋publish
- [x] SUPER大戰略DOSV（琪珊）— cdg-2204 補完(SystemSoft/琪珊)＋publish；cdg-4030 merge→2204（同款確認）

## 相關檔案

- [kudgame-done-log.md](kudgame-done-log.md) — 完成史（已做完的 20 批，唯讀歸檔）
- [kudgame-followups.md](kudgame-followups.md) — 專案級後續待辦（建頁／補 alias／系列缺口）
- [game-entry-review.md](game-entry-review.md) — 逐條 cdg 欄位待核疑點的正主
