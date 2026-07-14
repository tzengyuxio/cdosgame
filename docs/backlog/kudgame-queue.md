# kudgame 批次補完佇列

批次補完/新建遊戲條目的**進度佇列＋檢閱清單**。搭配 CLAUDE.md〈批次補完工作流〉使用。

**怎麼用**：一次把一整批遊戲名貼給 Claude（20–30 款也行），它先做 triage、把要你決定的事一次問完並填進此檔，再分批（每 5 款）build。你只需在 triage 階段回答判斷、在 Claude 提示時說「繼續 kudgame queue」。

**狀態圖例**：
- `[x]` 完成（補完或新建，已 publish）
- `[~]` 略過（已存在且已發佈，無需處理）
- `[!]` 建 stub（查無足跡，unverified、留白待考）
- `[ ]` 待處理（triage 過、等 build）
- `[?]` 卡住（需你決定，備註寫原因；決定後才轉 `[ ]`）

格式：`- [狀態] 遊戲名 — cdg-NNNN — 一句備註`。待考細節寫進 [game-entry-review.md](game-entry-review.md)，此檔只記狀態。

---

## 會宇批次（2026-07-15）

### 批次 1
- [x] 黑金企業 — cdg-2281 — 補完（System 3 Mob Rule，首作去序號、LSG→CBG）
- [x] 黑金企業2 — cdg-2282 — 補完（台灣專屬重製、LSG→CBG）
- [x] 大決戰 — cdg-5107 — 新建（ESOFNET 韓 RTS）
- [x] 哇哩咧炸彈人 — cdg-5108 — 新建（大眾軟件 陸 ACT）
- [!] 台灣爆笑麻將 — cdg-5109 — 查無足跡，unverified stub

### 批次 2
- [x] 神劍傳說 — cdg-1827 — 補完（developer YoYo Games→team AMOS 訂正）
- [x] 黑鷹傳奇 — cdg-2283 — 補完（北京八爪魚，殺氣沖天續作）
- [x] 時間之輪 — cdg-5110 — 新建（Legend FPS）
- [x] 機甲帝國 — cdg-5111 — 新建（Charybdis RTS）
- [x] 星際開拓者 — cdg-5112 — 新建（Egosoft 太空模擬，英文版 packaging/en）

### 批次 3
- [x] 18輪大車拼 — cdg-0007 — 復活 reject 條目（Synetic，會宇代理進口 packaging/en）
- [x] 天空之鷹：艾爾賽特任務 — cdg-0476 — 補完（工畫堂，genre LSG→SLG）
- [x] 天燎怒火 — cdg-0472 — 補完（O3 Games 太空 RTS，SLG→RTS）
- [x] 風之探索者 — cdg-1507 — 補完（Gruppo One 確認日本廠，year→2000）
- [x] 銀河創世紀2 — cdg-5113 — 新建（Digital Reality Imperium Galactica II）

### 批次 4
- [x] 神奇堆堆樂：動感積木 — cdg-1836 — 補完（ZOI 南韓，空間解謎 PZG）
- [x] 戰爭與和平 — cdg-5114 — 新建（金洪恩 韓 RTS）
- [x] 烏龍道士 — cdg-5115 — 新建（Orange Soft 韓 RPG，머털도사）
- [x] 波利魔特之千年幻想 — cdg-5116 — 新建（烏龍道士2）
- [~] 逐鹿中原之隋唐群英傳 — cdg-2569 — 前批已發佈，略過

---

## 華義/第三波/EVA/櫻花大戰批次（2026-07-15）

Triage 結果：40 款中 14 款已發佈（略過）、20 款既有 stub 待補完、6 款需新建。

### 略過（已發佈 [~]）
- [~] 劍俠情緣 — cdg-2986 ｜ 沉默的艦隊 — cdg-1171 ｜ 戀愛物語：魔法學園 — cdg-1803
- [~] 夢幻西餐廳 — cdg-2749 ｜ 三千年食堂 — cdg-2750 ｜ 快打旋風2 TURBO — cdg-2212
- [~] 噗噗闖通關 — cdg-1021 ｜ 灌籃金剛 — cdg-1276 ｜ 楚留香傳奇之血海飄香 — cdg-3108
- [~] 大野風雲 — cdg-0426 ｜ 艦隊防禦者 — cdg-4886 ｜ 小兵立大功 — cdg-4165
- [~] 大富翁總動員：瘋狂模擬戰 — cdg-0384 ｜ 大富翁總動員2：童話狗仔隊 — cdg-0385

### B1 — 金山劍俠情緣＋沉默的艦隊 ✅ commit db7f8e9b
- [x] 劍俠情緣2 — cdg-2987 — 補完（金山軟件/會宇，2000/Windows/ARPG，南宋續作）
- [x] 新劍俠情緣 — cdg-2323 — 補完（初代視窗重製，year→2001）
- [x] 劍俠情緣外傳：月影傳說 — cdg-2988 — 補完（智冠代理，year→2001，AVG+ARPG）
- [x] 沉默的艦隊2 — cdg-1172 — 補完（System Soft Alpha/光譜，2006，SLG→SIM）
- [x] 戀愛物語 — cdg-1802 — 補完（FUJITSU/華義，1997，LSG）

### B2 — 戀愛物語＋夢幻西餐廳 ✅ commit 98cf1627
- [x] 戀愛物語2 — cdg-1804 — 補完（FUJITSU/華義，1999，Eberouge2 正統續作，「更新檔」＝光碟附修正檔）
- [x] 夢幻西餐廳：媚力夜總會 — cdg-2751 — 補完（PSD/JP，日作めざせキャバクラ王，CMS）
- [x] 夢幻西餐廳：決戰全台灣 — cdg-2752 — 補完（華義自製/TW，CMS）
- [x] 夢幻西餐廳2：挑戰全世界 — cdg-2753 — 補完（PSD/JP，二代正統續作，CMS）
- [x] 夢幻西餐廳2：美國星期五餐廳 — cdg-2754 — 補完（華義自製/TW，CMS）

**決策（2026-07-15）**：光譜／華義／第三波／大宇 → 補完＋新建；**英特衛且 >2001 → reject／不建**。公主的回憶（華義 H-game）收錄。EVA鋼鐵 cdg-2317 研究後判斷拆分。

英特衛 >2001 退場：鋼鐵戀人新章／特別篇（未進 catalog，直接不建）；櫻花大戰4 cdg-3241（既有 → game-triage reject）。

### B3 — EVA 新世紀福音戰士 ✅ commit 2518d78e / registry d940293a
- [x] 綾波育成計劃 — cdg-2316 — 補完（GAINAX/華義，2001，LSG）
- [x] 機密檔案 — cdg-2315 — 補完（developer→CyberFront，光譜/2008/AVG）
- [x] 鋼鐵 Girl Friend — cdg-2317 — 收斂訂正（初代 GAINAX/華義/1997，剝離英特衛 2nd）
- [x] 碇真嗣育成計劃 — cdg-5117 — 新建（GAINAX/光譜/2004/LSG）
- ~~鋼鐵戀人新章 — 英特衛 >2001 → 不建~~

### B4 — 新建＋夢幻模擬戰 ✅ commit 186755c6 / registry f8e88719
- ~~鋼鐵戀人特別篇 — 英特衛 >2001 → 不建~~
- [x] 夢幻模擬戰1 — cdg-2741 — 補完（Career Soft/第三波，2001，SRPG）
- [x] 夢幻模擬戰2 — cdg-2742 — 補完（Career Soft/第三波，2001，SRPG）
- [x] 夢幻模擬戰3 — cdg-2743 — 補完（Career Soft/遊戲橘子·依星，2000，SRPG）
- [x] 公主的回憶 — cdg-5118 — 新建（Cocktail Soft/華義/2000/RPG/adult）

### B5 — 櫻花大戰 ✅ commit 02719dde / registry aa33f710 / reject 013a1b24
- [x] 櫻花大戰1 — cdg-3238 — 補完（SEGA/第三波·大新，2001，AVG）
- [x] 櫻花大戰2：願君平安 — cdg-3239 — 補完（2002，AVG）
- [x] 櫻花大戰3：巴黎在燃燒嗎 — cdg-3240 — 補完（第三波·大新，2003；**大宇未見佐證**）
- [x] 櫻花大戰4：戀愛吧少女 — cdg-3241 — reject（英特衛 2007，>2001）
- [x] 流氓大亨 — cdg-5119 — 新建（Gangsters: Organized Crime／Hothouse／第三波，packaging·en）

### B6 — 流氓大亨2 ✅ commit eb8bcf1c / registry c681fc66
- [x] 流氓大亨2 — cdg-5120 — 新建（Gangsters 2: Vendetta／Hothouse／第三波，2001，SLG，packaging·en）

---

**本批完成（2026-07-15）**：40 款盤點 → 14 略過、19 補完、4 新建（cdg-5117 碇真嗣育成、cdg-5118 公主的回憶、cdg-5119 流氓大亨、cdg-5120 流氓大亨2）、1 reject（cdg-3241）、2 不建（英特衛鋼鐵戀人新章/特別篇）。全 6 批 commit 完畢。
待核疑點：櫻花大戰3「大宇」代理未見佐證（採 chiuinan 第三波·大新）；系列首作 title_zh 帶序號（櫻花大戰1、劍俠情緣2 等）未正規化，屬全庫既有課題。

---

## 第三波/憶弘/松崗/BLUE BYTE/智冠批次（2026-07-15）

Triage 結果：40 款 → 4 略過（已發佈）、23 補完（既有 stub）、13 新建。

### 略過（已發佈 [~]）
- [~] 太平天國－天下一統 — cdg-0487 ｜ 工人物語(1) — cdg-0553 ｜ 風雲之天下會 — cdg-1534 ｜ 老夫子大富翁 — cdg-1495

### 補完（既有 stub [ ]，pub=false）
- [x] 太空小蜜蜂 — cdg-0496 — 第三波 Space Invaders（Z-Axis 1999，SCD2318；群中選 publisher=第三波 者） ✅
- [x] 秦殤 — cdg-1443 — 目標軟件/第三波 2002 RPG ✅
- [x] 烽火連天 — cdg-4218 — War Wind（SSI/DreamForge RTS），publisher 待補第三波 ✅
- [x] 獸神世紀 — cdg-3553 — 加亞/第三波 2000 ✅
- [x] 艾薩克外傳：陽光少年遊 — cdg-3417 — 大點科技 1999 ✅
- [ ] 夢幻咖啡屋 — cdg-2727 — 美夢成真/第三波 2000 LSG
- [ ] 霹靂麻將 — cdg-2719 — 帕米爾/第三波 2000
- [ ] 霹靂麻將２ — cdg-2720 — 帕米爾/第三波 2001
- [ ] 霹靂風暴 — cdg-2716 — 夢想成真/第三波 2001 SRPG
- [ ] 七大王朝(1) — cdg-0152 — Enlight 1997（憶弘）
- [x] 七大王朝２凡爾坦戰役 — cdg-0153 — Enlight 1999（第三波） ✅
- [x] 七大王朝－征服 — cdg-0154 — Seven Kingdoms Conquest 2008（松崗） ✅
- [x] 工人物語３ — cdg-0555 — Blue Byte 1998 ✅
- [x] 工人物語４ — cdg-0556 — Blue Byte 2001 ✅
- [x] 風雲２七武器 — cdg-1535 — 昱泉 2001，publisher 待補 ✅
- [ ] 美少女大富翁 — cdg-1482 — 貓優工坊/智冠 2001
- [ ] 瘋狂極上大富翁 — cdg-2795 — 飛玩資訊 2000（現掛 publisher 華義，待核是否智冠）
- [ ] 青春學園：戀戀人生 — cdg-4335 — dev/year 待補
- [ ] 大富翁－升官之途 — cdg-0387 — 晟業/智冠 2000
- [ ] 海賊Ｘ海賊（海賊大富翁） — cdg-1249 — 飛玩資訊/智冠 2002 TBG
- [ ] Ｐ２Ｋ總統大選 — cdg-0109 — 智冠 1999
- [ ] 總統之路 — cdg-2128 — 晟業/智冠 1999
- [ ] 熱狗熱GO！速食英雄 — cdg-4341 — dev/year 待補

### 新建（[ ]，id 已鎖 cdg-5121～5133）
**決策（2026-07-15）**：版本/資料片/重製款一律各給獨立 cdg id 新建（比照 softworld 貴族版慣例）。
- [ ] 小情人 — cdg-5121 — 第三波
- [ ] 歐洲空戰風雲 — cdg-5122 — European Air War（MicroProse 1998），第三波
- [ ] 摩天大樓 — cdg-5123 — 第三波（The Tower / SimTower 待核）
- [ ] 裝甲先鋒 — cdg-5124 — 第三波
- [ ] 神兵玄奇－虎魄重光 — cdg-5125 — 第三波（馮志明漫畫改編）
- [ ] 魔域幻境之武林大會 — cdg-5126 — 第三波
- [ ] 七大王朝－古文明霸主 — cdg-5127 — Seven Kingdoms Ancient Adversaries（憶弘）
- [ ] 工人物語２黃金版 — cdg-5128 — Settlers II Gold（Blue Byte）
- [ ] 工人物語２十週年紀念版 — cdg-5129 — Settlers II 10th Anniversary 2006 remake（Blue Byte）
- [ ] 大富翁－童話共和國 — cdg-5130 — 智冠
- [ ] 美食天堂之台灣食字路口 — cdg-5131 — 智冠
- [ ] 神奇ＧＯＧＯ大富翁 — cdg-5132 — 智冠
- [ ] 台灣大富翁 — cdg-5133 — 智冠
