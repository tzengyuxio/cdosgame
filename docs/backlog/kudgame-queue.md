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
- [x] 夢幻咖啡屋 — cdg-2727 — 美夢成真/第三波 2000 LSG ✅
- [x] 霹靂麻將 — cdg-2719 — 帕米爾/第三波 2000 ✅
- [x] 霹靂麻將２ — cdg-2720 — 帕米爾/第三波 2001 ✅
- [x] 霹靂風暴 — cdg-2716 — 夢想成真/第三波 2001 SRPG ✅
- [x] 七大王朝(1) — cdg-0152 — Enlight 1997（憶弘） ✅
- [x] 七大王朝２凡爾坦戰役 — cdg-0153 — Enlight 1999（第三波） ✅
- [x] 七大王朝－征服 — cdg-0154 — Seven Kingdoms Conquest 2008（松崗） ✅
- [x] 工人物語３ — cdg-0555 — Blue Byte 1998 ✅
- [x] 工人物語４ — cdg-0556 — Blue Byte 2001 ✅
- [x] 風雲２七武器 — cdg-1535 — 昱泉 2001，publisher 待補 ✅
- [x] 美少女大富翁 — cdg-1482 — 貓優工坊/智冠 2001 ✅
- [x] 瘋狂極上大富翁 — cdg-2795 — 飛玩資訊 2000（現掛 publisher 華義，待核是否智冠） ✅
- [x] 青春學園：戀戀人生 — cdg-4335 — dev/year 待補 ✅
- [x] 大富翁－升官之途 — cdg-0387 — 晟業/智冠 2000 ✅
- [x] 海賊Ｘ海賊（海賊大富翁） — cdg-1249 — 飛玩資訊/智冠 2002 TBG ✅
- [x] Ｐ２Ｋ總統大選 — cdg-0109 — 智冠 1999 ✅
- [x] 總統之路 — cdg-2128 — 晟業/智冠 1999 ✅
- [x] 熱狗熱GO！速食英雄 — cdg-4341 — dev/year 待補 ✅

### 新建（[ ]，id 已鎖 cdg-5121～5133）
**決策（2026-07-15）**：版本/資料片/重製款一律各給獨立 cdg id 新建（比照 softworld 貴族版慣例）。

#### B7 — 第三波新建 5 款 ✅ registry 補登＋validate 全綠
- [!] 小情人 — cdg-5121 — 查無足跡，unverified stub（第三波、中文款，dev/year/genre 待考）
- [x] 歐洲空戰風雲 — cdg-5122 — 新建（MicroProse 1998 二戰空戰 SIM，第三波代理 packaging/en）
- [x] 摩天大樓 — cdg-5123 — 新建（OpenBook/JP The Tower·SimTower，第三波 packaging/en，genre CBG）
- [x] 裝甲先鋒 — cdg-5124 — 新建（NovaLogic 1994 戰車模擬 SIM，系列首作，packaging/en）
- [x] 神兵玄奇－虎魄重光 — cdg-5125 — 新建（大點科技/TW/2002/RPG，**原著作者訂正黃玉郎（非馮志明）**）

#### B8 — 憶弘/Blue Byte＋Unreal 併入 ✅
- [x] 七大王朝－古文明霸主 — cdg-5127 — 新建（Enlight/HK Seven Kingdoms Ancient Adversaries，憶弘代理 RTS packaging/en，本傳 cdg-0152 加強版）
- [x] 工人物語２黃金版 — cdg-5128 — 新建（Blue Byte/DE Settlers II Gold 1997，**華義**代理 SLG localized，對齊本傳 cdg-0554）
- [x] 工人物語２十週年紀念版 — cdg-5129 — 新建（Blue Byte/DE 2006 3D 重製，**松崗**國際中文版 SLG localized）
- [~] 魔域幻境之武林大會 — cdg-5126 — **併入 cdg-3675**（查證＝Unreal Tournament 1999，與既有 UT stub 重複；registry 標 merged_into cdg-3675、cdg-3675 補「魔域幻境之武林大會」別名＋第三波通路、維持未發佈。決策 2026-07-15：UT 系列外文 FPS 非收錄範圍，比照 UT3 cdg-3678 reject 前例不另建）

#### B9 — 智冠大富翁/桌遊類 ✅
- [x] 大富翁－童話共和國 — cdg-5130 — 新建（靚盒子/智冠/2005/TBG，童話主題大富翁競品、非大宇正牌）
- [x] 美食天堂之台灣食字路口 — cdg-5131 — 新建（數位船長/智冠/2004/TBG，台灣美食景點大富翁）
- [~] 神奇ＧＯＧＯ大富翁 — cdg-5132 — **併入 cdg-1831**（既有破損 stub「神奇」＝同款，SCD0488/chiuinan magical.htm；補完 cdg-1831 為智冠/2006/TBG、正名 title、registry title 訂正，5132 標 merged_into cdg-1831）
- [!] 台灣大富翁 — cdg-5133 — 查無足跡，unverified stub（僅使用者清單見；chiuinan 大富翁類總表無此條目；易與《超級大富翁》混）

---

**本批完成（2026-07-15）**：40 款盤點 → 4 略過、23 補完（既有 stub）、13 「新建」項最終落地為：**10 新建 published**（cdg-5122/5123/5124/5125/5127/5128/5129/5130/5131）＋**2 補完既有款**（cdg-1831 神奇GOGO大富翁 正名補完）＋**2 stub**（cdg-5121 小情人、cdg-5133 台灣大富翁 查無足跡）＋**1 併入**（cdg-5126→cdg-3675 Unreal）＋**1 併入釋回**（cdg-5132→cdg-1831）。B7/B8/B9 全 commit 完畢。
待核疑點：童話共和國發行商靚盒子 vs 光譜（採智冠依清單）；神奇GOGO大富翁 year 2005/2006 兩說（採 2006 date-precise）；台灣大富翁足跡待補。

---

## 智冠批次（2026-07-15）

Triage 結果：32 款 → 5 略過（已發佈）、22 補完（既有 stub）、5 新建（id 鎖 cdg-5134～5138）。

**決策（2026-07-15）**：>2002 既有 stub 一律補完（國產／台灣發行、已在 catalog）；外商開發但台灣代理款（模擬城市2000/3000、銀翼風暴）補完；封神演義 1705/1706 已發佈略過；查無條目 5 款新建，查無足跡則留 unverified stub。

### 略過（已發佈 [~]）
- [~] 邪靈世紀 — cdg-3920 ｜ 龍神 — cdg-3827 ｜ 水滸傳之梁山好漢 — cdg-0624
- [~] 仙狐奇緣 — cdg-1571 ｜ 新蜀山劍俠 — cdg-2357（＝清單「新蜀山劍俠傳」）
- [~] 封神演義（1993） — cdg-1705 ｜ 封神演義（1998） — cdg-1706 — 決策：略過

### C1 — 宅急便＋麻將 ✅
- [x] 快遞宅急便 — cdg-1734 — 補完（智冠/2001/Windows，genre LSG→**CMS** 訂正；配樂賈愛國，2018 數位發行佐證年份）
- [!] 靈幻宅急便 — cdg-4319 — 查無足跡，unverified stub（僅 kudgame 列表級）
- [x] 十六張麻將寫真館 — cdg-0184 — 補完（**developer 智冠→大野狼工作室** 訂正、智冠為發行商；2001/TBG）
- [x] 正宗麻將－雍正王朝 — cdg-0729 — 補完（智冠/2003/TBG，改編電視劇《雍正王朝》，alias 雍正麻將王朝；實為 13 張非 16 張）
- [!] 勁爆台灣十六張麻將 — cdg-5134 — 新建 unverified stub（**疑為《大蕃薯 Online：勁爆台灣麻將》誤植**——線上遊戲、非智冠；若確認則應 reject）

### C2 — 遊戲天堂＋仙俠 ✅
- ~~遊戲天堂 — cdg-5135 — **不建**（＝ Klik & Play 智冠繁中版，遊戲製作工具軟體非遊戲，依 scope 工具軟體排除；id 5135 保留未用、registry 未補登）~~
- [x] 花神傳說 — cdg-3424 — 補完（智冠/TW/2002-08/Windows/RPG/2CD；developer 維持智冠，百度「ABO2 工作室」未採）
- [!] 荷花仙子 — cdg-5136 — 新建 unverified stub（查無台灣足跡；疑為對岸圓明園題材作）
- [x] 女皇騎士團 — cdg-5137 — 新建（Gameone/HK/2000-11/SRPG/localized，智冠代理，英文名 Knight Creator）
- [x] 夢幻天使之女神戰記 — cdg-2732 — 補完（琪薇遊戲工房/TW/2004-01-15，**genre ACT→ARPG、developer_region→TW** 訂正；與 cdg-2731 查無系列傳承，series 留 null）

### C3 — 地獄門～封神類 ✅
- [x] 地獄門 — cdg-0767 — 補完（智冠自製/dev_team YOKI工作室/1999，**genre RPG→ARPG** 訂正，秦朝背景）
- [x] 奇靈王 — cdg-5138 — 新建（**天泉科技**/TW/2004-05/SRPG/2CD；非 DOS，台灣自製後續款。發行商智冠 vs 天泉自行發行兩說，取智冠）
- [x] 平妖傳 — cdg-4324 — 補完（stub→完整；智冠/TW/2000/**SLG**，七兵種生克戰棋）
- [x] 魔法軍團 — cdg-3722 — 補完（勁一番＝**香港 GameOne**，2000 改名智傲；**region→HK、native→localized、platform→DOS、Win9x** 三處訂正；1998-03 智冠代理 SRPG）
- [x] 鬥神物語 — cdg-3645 — 補完（風中微粒/dev_team 遊戲風工作室，**year 2001→2000** 訂正，Win9x/RPG/2CD）

### C4 — 光輝傳承～模擬類
- [x] 光輝傳承 — cdg-3473 — 補完（蓋亞大地傳說2＝陽展/智冠 2004 SRPG；series 補「蓋亞大地傳說」、交叉連結前作 cdg-3472。developer_region 留 null：「陽展」全名/所在地查無佐證）
- [x] 叮噹五福星 — cdg-0928 — 補完（亞博克＝**香港** AceBrock，2003 SRPG；**與哆啦A夢/小叮噹無關**——中原武俠降妖題材，「五福星」＝五名主角，標題「叮噹」由來查無來源）
- [~] 武林盟主 — cdg-4405 — **併入 cdg-0739**（查證為同款：KIWI工作室/智冠/2000/策略 全軸相符；omega 討論串 5562 自身即連向「武林盟主 決戰中原」存檔。原「distinct from 決戰中原」出自 phase5-decisions.json 的 low-confidence 猜測）。決策 2026-07-15：registry 標 merged_into、4405 檔刪除；保留方 cdg-0739 補完發佈（alias 收「武林盟主」、dev_team KIWI、**genre SLG→RTS**）
- [x] 女神天蠶變 — cdg-1072 — 補完（三協資訊/TW 2002，**genre → PZG**；玩法承街機《天蠶變》拉線圈地揭圖。slug 留 null：查無英文名）
- [x] 模擬百貨 — cdg-3194 — 補完（**developer 智冠→ABET工作室**、publisher_tw 補智冠、**genre LSG→CMS** 三處訂正；官網存檔規格欄「研發製作：ABET工作室／出版發行：智冠科技」為據）

### C5 — 外商代理＋蜀山系列 ✅
- [x] 銀翼風暴 — cdg-2923 — 補完（Rake in Grass/CZ 2004 STG；**代理商待考已解**＝智冠，據智冠產品頁存檔「國內發行：智冠科技」；**PC英文版、從無繁中版** → en/packaging；platform_note→Win9x、WinXP。台灣 2005-07 上市，日期/售價兩說收 footnote）
- [x] 模擬城市2000 — cdg-3176 — 補完（Maxis/US 1995 CBG；台灣足跡**強**：智冠完整中文化 DOS 版「世紀光碟大補帖」，chiuinan＋自由評論網＋archive.org 實物三源 → zh/localized/DOS）
- [x] 模擬城市3000 — cdg-3177 — 補完（Maxis/US 1999 CBG；**台灣代理＝美商藝電台灣分公司直營**（非智冠／第三波，與前作模式不同）；繁中版含國父紀念館/中正紀念堂等台灣地標 → localized、license_status official；platform_note Windows 非 DOS）
- [x] 仙狐奇緣前傳：水火金雷 — cdg-1573 — 補完（**dev_team 補 北斗星工作室**、genre RPG、2001/4CD；series 依既有決策維持 null）
- [x] 仙狐奇緣2：情劍錄 — cdg-1572 — 補完（**宇峻奧汀 2008 查證無誤、非誤植**——初代北斗星/智冠 → 本作開發發行雙雙易主，確為正統續作；slug fox-pet-2 對齊初代）

**C5 待核疑點**：① cdg-1571 正文「北斗星後續脫離智冠體系」查無來源支持（GNN 三篇零命中「北斗星」），建議複查該句；② ~~仙狐奇緣三款 series 皆 null~~ **已解（2026-07-15）**：依使用者指示建 `content/series/仙狐奇緣.md`，三款 series 一併補值、翻案 game-entry-review 的 2026-06-23 決策；③ cdg-3176 title_aliases 兩筆（英文版／世紀大災難資料片）查無佐證，疑為 CD Collection 內容物誤拆成 SKU；④ cdg-3176 size `1CD+1CD` 可疑、無來源可依故未動。

### C6 — 蜀山 ✅ (見下方本批完成註記)
- [x] 新蜀山劍俠傳：劍仙玄易錄 — cdg-2358 — 補完（智冠/TW/2001-03-26/RPG/3CD；**adaptation 補**（小說《蜀山劍俠傳》／還珠樓主）；與 cdg-2357 同 IP 但**非劇情續作**（主角齊金蟬 vs 紫青雙劍、戰鬥改團隊即時制），series 從眾維持 null）
- [x] 蜀山外傳：紫青劫 — cdg-2842 — 補完（智冠/TW/RPG/2CD；**year 2002→2001** 訂正（游民星空 2001-12-30、百度 12-27 具體到日；chiuinan 粗標 2002 為年底發行易記翌年）；chiuinan 明文為 cdg-2358「續傳」＝同系列正統續作，非資料片；劇情原創故 adaptation 留 null）

---

**本批完成（2026-07-15）**：32 款盤點 → 5 略過、22 補完、5「新建」項落地為 2 新建 published（cdg-5137 女皇騎士團、cdg-5138 奇靈王）＋2 stub（cdg-5134 勁爆台灣十六張麻將、cdg-5136 荷花仙子）＋1 不建（cdg-5135 遊戲天堂＝工具軟體），另 1 併入（cdg-4405 武林盟主 → cdg-0739）。C1–C6 全 commit 完畢。
待核疑點彙整：① cdg-0739 KIWI 工作室是否隸屬智冠三源皆無明證（現沿用 cdg-1267《漢堡戰爭》慣例：developer 智冠＋dev_team KIWI）；② cdg-1267 正文自述「即時戰略」卻仍標 genre SLG，依同判準應為 RTS（既有資料層問題）；③ cdg-1571 正文「北斗星後續脫離智冠體系」查無來源支持，建議複查；④ 其餘見各批註記。

---

## 智冠武俠/成人批次（2026-07-15）

Triage 結果：33 款 → 11 略過（已發佈）、14 補完（既有 stub）、7 新建（id 鎖 cdg-5139～5145）、1 欄位訂正。

**決策（2026-07-15）**：
- **十二金釵2001 → 新建獨立 cdg id**（開發商/平台皆異於原版，比照前批「版本/重製款各給獨立 id」慣例）。
- **四大名捕兩款 → 納入本批，先查證發行商歸屬再補完**（清單標智冠 vs 庫內記第三波 vs chiuinan 給 SCD 碼，三方衝突）。
- **adult flag 補標**：cdg-1709 尋秦記、cdg-2041 紅樓續夢隨補完一併補；cdg-4575 魔術彩球（已發佈）單獨做欄位訂正。
- **>2002 新建三款照建**：武俠群英傳(2005)、武俠群英傳2(2006)、陸小鳳-金鵬皇朝(智傲HK/2004)，比照 cdg-5138 奇靈王先例。
- **天蠶變 cdg-3905 照實記**：developer 中潛科技（Subsino）、publisher_tw 留 null，**不寫智冠**（清單【智冠】標記查無佐證，疑依《女神天蠶變》順手歸類誤植）。

### 略過（已發佈 [~]）
- [~] 天龍八部之六脈神劍 — cdg-0483 ｜ 新倚天屠龍記 — cdg-2322 ｜ 真‧倚天屠龍記 — cdg-1815
- [~] 鹿鼎記（＝cdg-1982 智冠/1994 皇城爭霸；cdg-1981 歡樂盒/1997 另款）｜ 浣花洗劍錄 — cdg-1238 ｜ 天子傳奇 — cdg-0466
- [~] 奇門遁甲之九五真龍 — cdg-1306 ｜ 霹靂幽靈箭 — cdg-2711 ｜ 金瓶梅之偷情寶鑑 — cdg-2883
- [~] 紅樓夢之十二金釵 — cdg-2039（1998 DOS 原版）｜ 吞食天地3 — cdg-0979

### D1 — 武俠補完 ✅ commit 2d73a26b / review 9fc62678
- [x] 達摩 — cdg-2586 — 補完（大點科技/**TW**/1999/RPG，SCD2802、slug damo；adaptation 留 null——omega 記「獲中視八點檔連續劇嫡傳授權」但未載劇名）
- [x] 龍虎門 — cdg-3830 — 補完（**developer 亞洲博克→亞博克（AceBrock/HK）正規化**、**genre RPG→ARPG**、adaptation 補黃玉郎港漫；chiuinan 對同一港商混用兩寫法 5:2，非兩家公司）
- [x] 天龍八部 — cdg-0482 — 補完（智冠/TW/2002-10-25/RPG，台北研發室；⚠ **誤掛方向與 triage 假設相反**：chiuinan c11/dragon8 檔名雖像 0481 但實為 2002 智冠款、本就屬 0482；真正誤掛的是 c12/tl8 與 fandom/rwv/offlinelist 等 DOS 系素材，已剝離。三款各自獨立、非重複）
- [x] 鹿鼎記2 — cdg-1983 — 補完（智冠/2000-02-15/RPG/4CD，adaptation 補金庸；**四筆同名釐清為兩線**：智冠線 cdg-1982 皇城爭霸(1994,金庸小說)→cdg-1983；歡樂盒線 cdg-1981(1997)/cdg-1984 神龍教(1998) 取材周星馳電影。撞名非重複、不需 merge）
- [x] 如來神掌之宇宙爭雄 — cdg-1077 — 補完（智冠/TW/2003/RPG/4CD，SCD0066；**adaptation 訂正為黃玉郎港漫**（非上官小寶、非電影））

### D2 — 黃易/溫瑞安補完 ✅ commit c184b584 / review 42e81f2a
- [x] 尋秦記 — cdg-1709 — 補完（南晶科技/2001/RPG/4CD，adaptation 黃易；**adult: true 已補但待覆核**——佐證指向「煽情但不色情/輔導級」，見 review；publisher_tw 維持「智冠」canonical，「智冠電子」寫進正文並陳；**developer_region 留 null**：深圳南晶科技紅旗）
- [x] 破碎虛空 — cdg-4289 — 補完（空 stub → 完整；智冠/**dev_team 北斗星工作室**/1999-08/Win9x/4CD/RPG，adaptation 黃易；title_zh 原已正名無需改。排除「首款全3D武俠」「三天破10萬套」兩則廠商宣傳語——僅百度系鏡像複製鏈，維基實記 2.5D）
- [x] 大唐雙龍傳 — cdg-0357 — 補完（次方科技（DreamForce）/TW/智冠/2001-07-23/RPG/4CD，adaptation 黃易；採 GNN 發稿日 7/23，未採百度 infobox（開發商誤植智冠、日期 7/27，與其內文矛盾））
- [x] 四大名捕之會京師 — cdg-1023 — 補完（**發行商「衝突」查明為假象**：第三波＝開發商、智冠＝台灣代理發行商，兩說同時成立；**dev_team 第三波軟體（珠海）**＝第三波珠海開發據點；2005/RPG/2CD，adaptation 溫瑞安）
- [x] 四大名捕之鐵手無敵 — cdg-1024 — 補完（同上歸屬結論；2004-11-24/NT$599/1CD，**genre ACT→ARPG** 訂正（即時點擊戰鬥＋武技/內功/輕功成長；巴哈自身簡介逐字寫「ARPG遊戲玩法」，ACT 僅粗分類欄支持），adaptation 溫瑞安）

### D3 — 霹靂/成人補完＋訂正 ✅ commit b2ff8d73 / review b1e03a91
- [x] 霹靂英雄榜 — cdg-2713 — 補完（智冠/TW/1999/RPG/3CD/Win9x·WinXP，SCD0556；**adaptation 補布袋戲**；擋掉「智冠北研 R&D（原太極工作室）」（多站但全伴隨同一段行銷文案＝單源複製擴散，dev_team 未填）與「DOS 遊戲」誤傳（豆瓣標 PC(DOS)＋PTT 標題「on DOSBox」造成，實需 BDE 僅 Win9x/XP 可跑））
- [x] 天蠶變 — cdg-3905 — 補完（**中潛科技（SUBSINO）/TW/1993/DOS/PZG/adult**，統編 21249652、台北南港、1985 成立、博弈機台本業之 PC 外務；一手佐證＝raw/rwv 與 raw/fandom 兩獨立來源的同張標題畫面均為 SUBSINO 商標＋©1993、無智冠痕跡。**名稱考據校正**：「天蠶變」源自 1979 亞視港劇，街機譯名蹭其聲勢兼雙關揭圖玩法→精確說法是「名稱輾轉借自港劇、內容毫無關聯」；玩法上溯 Taito《Qix》，交叉連結 cdg-1072/cdg-1862/cdg-2697）
- [x] 美女梭哈 — cdg-1468 — 補完（**developer 智冠→彼得潘 訂正**：一手證據＝標題畫面「Copyright By PAN. (C)1992 Taiwan」，原值屬 vendor→developer backfill artifact；publisher_tw 補智冠、**genre 補 TBG**、size 3×1.2M 磁片；「真人」＝日本 AV 明星數位化照片非 FMV。排除「原價 NT$299」——實為 Omega「入手價格」＝2025 藏家收購價）
- [x] 紅樓續夢之京華風雲 — cdg-2041 — 補完（智冠/**dev_team 全彩狼工作室**（廠內團隊走 dev_team，比照 cdg-4289 北斗星先例；否決研究 agent 改 developer 的建議）/2003-06-18/LSG/**adult: true**；staff 補德珍・NELL；**與 cdg-2039 為同團隊遊戲續作**——原著人物輪迴轉世至清末民初的原創設定，非清代續書《紅樓續夢》改編）
- [x] 魔術彩球 — cdg-4575 — 欄位訂正＋正文補（**清單標記正確、條目才是漏的**：使用者提供包裝盒背面實物照，同面既印「榮獲第一屆金磁片獎得獎作品」又印「讓你揭開美女的神秘面紗」「具有八關，每關都有不同的美女與你會面」＋三張真人圖畫面 → 得獎與成人內容並存於同一商業版，無需「參賽版 vs 商業版」假說。已補 adult: true＋八關揭圖正文＋footnote box-back）

**D3 附帶發現**：cdg-4112《魔術**綵**球》為 cdg-4575 的異體字重複空 stub（merge 候選，見 review）。

### D4 — 新建（港漫/武俠） ✅ content e0577b5f / registry 6ad2230b / review e11f2a2a
- [x] 中華英雄 — cdg-5139 — 新建（**亞博克**/HK（canonical 寫法，非「亞博克科技」）/智冠代理/2000-09/RPG/4CD，adaptation 馬榮成港漫；**platform_note 留 null**（無來源明指 DOS/Windows，旁證偏 Windows 但不杜撰）；已反查並排除「智冠自研」假說；同名 Online 版不在庫、無需消歧義）
- [x] 三國群俠傳 — cdg-5140 — 新建（**developer 東方演算**/TW/2002-06-05/RPG，智冠僅發行；「非智冠自製」確立，但**河洛工作室 2002 年已不存在該名義**——偏離 repo 慣例（cdg-1706/1626/1627 用河洛工作室），待裁決，見 review）
- [x] 最初幻想 — cdg-5141 — 新建（**萬智源/CN**（非 TW：天幻網「國內的遊戲製作商」、巴哈「中國萬智源」、百度「深圳萬智源」）/智冠/2002/Win9x/RPG，slug first-faery；**「Square/Final Fantasy 商標爭議」查無證據**——原文僅寫「因版權及商標註冊問題」改名、主詞從缺，該歸因疑出自搜尋引擎 AI 摘要腦補，未寫入）
- [x] 陸小鳳之金鵬皇朝 — cdg-5142 — 新建（**官方名帶「之」**（巴哈 GNN＋ACG），清單的「－」形式留 aliases；Gameone/HK/智冠代理/2004/ARPG，adaptation 古龍《陸小鳳傳奇》首部《大金鵬王》；排除 Newton/easyatm 記智冠開發之內容農場錯誤）
- [x] 紅樓夢之十二金釵2001 — cdg-5143 — 新建（智冠/TW/2001-07-17/Win9x/LSG/**adult: true**/1CD；**跨平台重製**（DOS→Windows）故支持獨立 id、與 id-policy 相容（非單純改包裝→不進 editions）。**三個給定線索全遭推翻**：結局逾 20 種非 12、戲寶科技查無獨立足跡（改填智冠）、「八大類」是養成活動非屬性數）

### D5 — 新建（武俠群英傳） ✅ 同上 commit
- [x] 武俠群英傳 — cdg-5144 — 新建（智冠/**dev_team 北京研發中心**/2005-08/RPG/NT$699，真善美出版社獨家授權 22 位名家上百部作品；前身為大陸《互動武俠》（單次任務收費下載制，王俊博決定重製為單機）；**genre RPG 非卡牌**——卡牌對戰與武器鍛造並列為次系統，主體回合制）
- [x] 武俠群英傳2 — cdg-5145 — 新建（智冠/**2006-01-20** 上市（**兩 agent 獨立確認**：01-18 僅為預購稿預定日，GNN 上市稿標題即「1月20日上市」）/RPG/NT$599；adaptation 留 null（授權標的為上百部小說整合、非單一作品，比照 cdg-2586 先例））

---

**本批完成（2026-07-15）**：33 款盤點 → **11 略過**、**14 補完**、**7 新建 published**（cdg-5139～5145）、**1 併入**（cdg-4405 武林盟主 → cdg-0739）、**1 欄位訂正**（cdg-4575 魔術彩球 補 adult）。D1–D5 全 commit 完畢，validate 全綠（games 4498/4498、errors 0）。

**本批重要訂正**：cdg-3194 模擬百貨 developer 智冠→ABET工作室｜cdg-1468 美女梭哈 developer 智冠→彼得潘（標題畫面 ©PAN 1992）｜cdg-3905 天蠶變 →中潛科技（SUBSINO），非智冠｜cdg-3830 龍虎門 亞洲博克→亞博克(HK)、RPG→ARPG｜cdg-1024 鐵手無敵 ACT→ARPG｜cdg-2842 紅樓/蜀山外傳 year 2002→2001｜cdg-0482 天龍八部 剝離誤掛 DOS 系素材｜cdg-1077 如來神掌 adaptation →黃玉郎（非上官小寶）。
**四大名捕「發行商衝突」查明為假象**：第三波＝開發商、智冠＝代理發行商，清單與庫內兩說同時成立。
**待核疑點**：見 [game-entry-review.md](game-entry-review.md) 本日新增 15 條（含 ⚠ subagent 捏造引用事件與主線實測驗證結果）。

---

## 旭力亞/富峰群/遊戲橘子批次（2026-07-16）

Triage 結果：41 款 → 3 略過（已發佈）、31 補完（既有 stub）、7 新建（id 鎖 cdg-5146～5152）。年份全在範圍內，無 >2002 爭議。

**決策（2026-07-16）**：
- **決戰王朝＝七年戰爭2 同一款**，補完 cdg-0158；清單兩項合計 1 款，「號稱七年戰爭2」的疑點寫進正文考據。
- **便利商店精裝版建獨立 id**（cdg-5152），比照「版本/合輯各給獨立 id」慣例，交叉連結 cdg-1601 便利商店／cdg-4524 速食店。
- **RPG夢工廠照建**（cdg-5151），即使查證為 RPG 製作工具軟體也收（不比照 cdg-5135 遊戲天堂先例）。
- **無人島物語依查證正名**：cdg-3278/3279 正名為 R／RR（或依實情調整），R（力藝）補 `adult: true`。

### 略過（已發佈 [~]）
- [~] 霸刀 — cdg-2701（developer 光碼 vs 清單旭力亞，待核）｜ 六道天書 — cdg-4283 ｜ 便利商店 — cdg-1601

### B10 — 旭力亞 ✅ content 7b4ea812 / reject＋backlog（見下）
- [x] 刀劍笑 — cdg-2939 — 補完（旭力亞/2000/RPG/TW；**adaptation 補馮志明港漫**（非黃玉郎）；國語/粵語雙版本、第二片光碟內容有別。⚠ 中文維基「刀劍笑」電影條記原著劉定堅、與「馮志明」條自相矛盾，author 保守只填馮志明；豆瓣與 PTT 敘述逐字相同＝單源轉載非雙源）
- [x] 少林足球 — cdg-0546 — **reject**（決策 2026-07-16：簡中版、陸廠奧美電子發行、查無台灣足跡 → 違反「catalog 只留台灣發行/代理」。一手佐證＝標題畫面 `© 2000,2001 The Star Overseas Ltd.`（星輝海外＝周星馳，電影授權正式）＋`©&® 2001 Info-Mission Tech.`（＝展略）、選單為簡體。清單標【旭力亞】完全查無佐證）
- [x] 八龍神傳說 — cdg-0169 — 補完（Mips Software/**KR**/1998/旭力亞中文化代理；**adaptation 補 박성우 漫畫**（1993–95《아이큐점프》連載，作者入伍致草率收場，遊戲補完漫畫未及交代的結局）；게임메카 引 1997-11～1998-05《PC챔프》當期廣告考據開發商由 가람과 바람 易手 밉스）
- [x] 齊天大聖－西遊降魔錄 — cdg-3486 — 補完（Impactrea/**KR**/1999/ACT，韓文原名 제천대성：배꼽잡는 사오정；與 cdg-3484/3485/0896 同名款已做消歧義、確認非重複；原版年份 1997/1998/1999 三說收 footnote，1999＝旭力亞中文版年）
- [x] 公主幻想曲 — cdg-0171 — 補完（火狗工房/**HK**/2001-07/**PZG**；**publisher_tw ＝展略科技（Info-Mission）**、官網記港台同步發行；立方體 picross 式解謎（非 chiuinan 稱的「3D踩地雷」））

### B11 — 富峰群 1 ✅ content 69853a9f＋7d92c692 / backlog 76ba22f7（⚠ 本批曾遭 agent 誤 reset 中斷，見下方事故註記）
- [x] 女傑 — cdg-1068 — 補完（**developer_region null→JP 訂正**：archive.org 收日文原版《女傑になろう》metadata `Honorock's System`／1996／jpn，非南韓廠；publisher_tw 維持[富峰群,智冠]（chiuinan 逐字區分「代理中文化」與「委由智冠發行」，非混同型誤植，惟單源）；genre LSG 覆核通過、adult 無跡象。⚠ year 1999＝台灣版、原版 1996，與 cdg-3486 同屬「代理款 year 記原版年或台灣年」待裁決問題）
- [x] 獅王傳說 — cdg-3539 — 補完（**developer Mirinae→Mirinae Software、region KR、platform Windows→Win9x**（Win95 專用）；韓文原名 전사 라이안、1997-05 韓國推出／1998-08-20 台灣發行；**⚠ 開發歸屬台韓兩說直接衝突**：台灣側（chiuinan＋Omega 實體包裝）記 Mirinae 開發／雙龍資訊通信(SICC)發行，韓國側三源（나무위키／서울신문 1997-05-09／HG101）一致記雙龍軟體部門自製、HG101 更稱其「唯一自製遊戲」，兩側各自多源、無法以數量決 → developer 沿用 Mirinae、正文並陳待實物 credit 覆核；同名劇場版動畫為同步企畫非改編）
- [x] 第三地球 — cdg-1956 — 補完（**前手未查證欄位複核通過**：developer_region KR（HG101 公司頁＋전자신문＋헬로디디 三源）、韓文別名 제3지구의 카인 與 HG101 標題逐字相符，皆保留；**富峰群依帖主實體包裝規格欄一手佐證**（NT$680／1998-09／CD一片），「智冠代理」出自帖內轉載對岸資料站、該段自相矛盾（把代理發行記成開發商 Makkoya、標「中國版」、「代理髮行」簡轉繁誤字）→ 未採、下 fn01 並陳；**year 1997/1998 兩說由平台調和**（1997-10 得獎時為 DOS 版、Windows 版 1998-04），原版年與台灣年皆 1998，不受 year 語意裁決影響。⚠ 研究方法：WebFetch 摘要對同一帖給出兩次矛盾結果，agent 改 curl 原始 HTML 自解才辨明）
- [x] 公元２１４０ — cdg-0173 — 補完（TopWare/**PL**/1997/**genre SLG→RTS 訂正**（即時戰略）；Earth 2140，開發部門日後改組為 Reality Pump；富峰群代理繁中版＋資料片「火線任務1」（僅 chiuinan 單源）；**「波蘭原名 Ziemia 2140」未獲證實、未寫入**——波蘭語維基載該名原為設計文件資料夾名，後由德國發行商註冊為商標）
- [x] 聖天使學園 — cdg-2520 — 補完（**developer Family→Family Soft（株式会社ファミリーソフト，1987 東京練馬）、region JP、genre AVG→LSG 訂正**、staff 補角色設計竹本泉、原名 ぱらPAR∀パラダイス；**一手來源＝Family Soft 官網 Wayback 存檔**（逐款產品頁＋逐年發售沿革）：日版 FM TOWNS 1997-03-14(3CD)／Windows 95 1997-08-28(**2CD**)，台灣版 2CD 正對上 Windows 版；官網沿革頁同列本作與《初恋ばれんたいん》→ **證實與 cdg-2940/2941《初戀》為同一家**；**adult 有反面實證**（日文維基載 Family Soft 成人線切給關係企業アップルパイ、本社自家作全年齡，聲優主流、官網通販標 OK）→ 未標。⚠ 待決：LSG 的數值養成面無直接佐證，若證實無數值經營應退回 AVG）

**⚠ 事故註記（2026-07-16）**：本批進行中，B10 的 cdg-3486 subagent 誤把主線 commit 當成「未授權的 rogue session」，對主 repo 執行 `git reset --hard` **兩次**，抹掉主線 5 個 commit 並清空工作區（B11 三款 agent 產出一併被清）。經 reflog 全數救回（commit 物件未失、工作區產出有 scratchpad 備份），validate 全綠、無資料損失。成因＝平行派工未告知手足存在，agent 誤判後自行「修復」。防治：派工訊息須載明手足平行工作、明令禁止 revert/reset/checkout 他人檔案；已於 B11 指派加註（該註記有效——B11 agent 收到同樣干擾訊息但依指示忽略、未中止）。

### B12 — 富峰群 2 ＋ 遊戲橘子戀愛類 ✅ content 00d6110b / backlog 0bccad06
- [x] 創世神話 — cdg-2962 — 補完（**developer_region null→KR**：chiuinan 明寫「韓國Samson」＋HG101 韓國遊戲史 1998 頁列 Samson Core／HiCom；韓國原名 쥬센사요（漢字題「朝鮮史謠」）、原版 1998-06 Win95，year 1999 維持台灣年；chiuinan 標「發行商智冠／代理商富峰群」→ 正文寫富峰群中文化代理、委由智冠發行；已加 cdg-1239《浪漫創世神話》消歧義（SCD0908 vs SCD0909，確認非同款）。⚠ developer 三說並陳未寫死，見 review）
- [x] 明星之夢 — cdg-2382 — 補完（**developer_region null→JP**（SunSoft＝日本サンソフト）、**license_status→official**；原版＝《フォトジェニック》1997-05-16 **PC-9801** 首發（非 Windows），台灣版為 Windows 專屬中文化；genre LSG 覆核通過（六種打工提參數＋週末行動管理）；**adult 未標**——證據矛盾待查，見 review）
- [x] 聖靈騎士 — cdg-2541 — 補完（**developer_region null→KR**：Gleam＝**그림소프트**（「圖畫」自行羅馬化為 Gleam，非 글림，此為查無資料主因）、創辦人 양승준 漫畫家出身、本作改編自其本人漫畫；韓版 1999、台版 **2000-02-15／NT$680**（巴哈）；chiuinan「1997 出品」＝團隊成立年，已收 fn01；genre RPG 維持（isometric 團隊回合制，勿與同社 ARPG《Dark Quest》混）。⚠ 遊戲橘子代理身分無一手佐證，見 review）
- [x] 初戀 — cdg-2940 — 補完（**developer_region null→JP**、**slug→hatsukoi-valentine**、補 alias 初恋ばれんたいん；**一手來源＝Family Soft 官網 Wayback 沿革頁**（curl 直取 SHIFT_JIS 逐字核對）：日版 1997-12-12 Win95 **1CD**，正對上 SCD0423；chiuinan 逐字「1997年出品」「1999年由富峰群中文化並代理發行」兩年分列清楚；**adult 未標**（DMM 復刻標全年齢＋成人線在關係企業アップルパイ，同 cdg-2520 判準））
- [x] 初戀之白色情人節 — cdg-2941 — 補完（**查證＝《初恋ばれんたいん SPECIAL》Windows 版**（前作**加強版**、非 White Day 續篇）：官網沿革 1999-07-16 Win95 **ＣＤ２枚** 唯一對得上 stub 的 2CD＋Windows；日方查無任何「ホワイトデー」標題→「白色情人節」係台灣改題；VNDB 結構化 release 記繁中版 2000-03-15／2CD／遊戲橘子。**「代理易主」是假象**——富峰群 **1999-11-11 更名**遊戲橘子（G!VOICE 官方刊物＋維基），同一家公司，`content/companies/遊戲橘子.md` 早已記載此事。**series 主線裁決 null**（撤回 agent 所設「初戀」，兩款一致，比照 cdg-2039/5143 先例，見 review））

### B13 — 七年戰爭＋小秘書＋龍機傳承 ✅ content f7e28eaf / registry 541f6d4e / backlog 5ae7fb7e
- [x] 七年戰爭1 — cdg-0157 — 補完（**題材考據翻案**：與歐洲七年戰爭(1756–63)無關，原作＝韓國《임진록》(Imjin-rok)、題材為 **1592–98 壬辰倭亂**（前後歷時七年），中文名循英文發行名 Seven Years War 而來；**developer_region null→KR**（HQ Team＝1992 김태곤 與三名高中同學創立、2000 年代初併入 Joyon）、**genre SLG→RTS 訂正**（chiuinan 逐字「即時戰略」，比照 cdg-0173）；原版 1997-01 韓國上市、早《星海爭霸》一年；**publisher_tw 移除三星電子**（見下））
- [x] 七年戰爭2：決戰王朝 — cdg-0158 — 補完（**triage 判定獲證實**：「決戰王朝」＝本作、且為《임진록2》(2000-01) 正統續作非冠名獨立作；**developer_region→KR、genre SLG→RTS**；前作僅朝鮮/日本兩方，本作加入明朝成三勢力、23 關演至露梁海戰；**publisher_tw 移除三星電子**。⚠ 別名「英雄戰爭」(영웅전쟁) 經查實為**首作 1998-01 增補版**、對不上本作，疑 chiuinan 誤植——保留 alias 但正文不背書、下 footnote 並陳）
- [x] 小秘書Lina — cdg-0524 — 補完＋**正名 小秘書→小秘書Lina**（chiuinan 原標題「小秘書Lina／小秘書利娜」，舊值係解析時把拉丁字段切成 alias 所致；registry title_zh 已同步）；**developer_region null→JP**（Visual Lab＝ビジュアル・ラボ，1999 年底倒閉）、原名《ルーム・ウィズ・リナ》/Room with Lina 1999-06-24 原版；**經查為遊戲非工具軟體**（日方分類「スケジュール管理型美少女ゲーム」、有劇情/CG/聲優/好感度養成，PIM 行程表僅為外殼；chiuinan「不太算遊戲的戀愛養成遊戲」語意是玩法不典型、非否定其為遊戲）→ **不比照 cdg-5135 剔除**，genre LSG 成立
- [x] 龍機傳承1 — cdg-3823 — 補完（**日文原名《竜機伝承》**（竜非龍，「龍」為台灣寫法）副題 DRAGOON、slug 補 ryuuki-denshou-dragoon；原版 1996 **PC-9801** 9 片磁片，台版 1998 1CD/Windows **對應日版《竜機伝承プラス》**(1997-03 Windows 追加語音)；**無 Sega Saturn 版**（派工推測不成立）；adult 不標（pc-9801.com 歸類一般向け＋有 PS 移植））
- [x] 龍機傳承2 — cdg-3824 — 補完（**代理歸屬查證＝富峰群、清單「智冠」為誤記**（查無任何智冠代理佐證；強力旁證＝chiuinan 三款代理商分界精準落在 **1999-11-11 富峰群更名遊戲橘子** 上，1/2 代記富峰群、3 代記遊戲橘子，屬自發的內部一致性訊號）→ 未採兩說並陳（非兩說皆有據，而是一說強證、一說零證）；原版 1997-06 Win95 光碟版 → **platform_note Windows→Win9x**；slug 主線對齊為 ryuuki-denshou-2）

### B14 — 龍機傳承３＋無人島物語＋古神之印 ✅ content 9339d484＋b168cecc＋8add0880 / registry c61643db / backlog c13bcc6a
- [x] 龍機傳承３ — cdg-3825 — 補完（日文原名《**竜機伝承3 〜黄昏に導かれし者たち〜**》2000-01-28 KSS，agent 抓 `action=raw` 原始 wikitext 逐行核對確認該節存在（**非紅連結、非捏造**——記取 cdg-3824 前例）；**platform_note Windows→Win9x**（ja.wp 內文明記「Windows 95/98 用」）、slug `ryuuki-denshou-3`；genre SRPG 維持（台方策略角色扮演 vs 日方內文 RPG，中性並陳）；adult 不標（全文無分級字樣）。⚠ ja.wp 的 STAFF 段實為 **OVA 製作團隊非遊戲團隊**、未誤入 staff；駿河屋被 Cloudflare 擋、依「連結文字須用實際頁面標題」規範捨棄不引）
- [x] 無人島物語Ｒ — cdg-3278 — 補完＋正名＋**六項污染清理全數執行**（①正名 無人島物語→**無人島物語R**（SCD2074→mjr.htm 對照＋該頁 title 逐字）；②移除交叉污染 alias「無人島物語RR中文版」（實為 RR 標題形）；③移除解析殘留 alias「R」；④`references.chiuinan` 由誤指的 mjrr.htm 改回 **mjr.htm**；⑤images 移除混入的 mjrr/ 圖；⑥slug r→`mujintou-monogatari-r`）；**genre ADV→LSG**；原版《無人島物語R 〜Survival life in the uninhabited region〜》1997-04-25 Windows、台版力藝 1998。**⚠ 清單「R＝18禁」經三源獨立查證推翻、adult 未標**（ja.wp 中 R 與 X 為並列章節，成人向原句主詞是 X 支線，句構「『R』の路線を**推し進めて**…」本身即表明 R 是被推進的起點；研判混淆源於 X 支線首作與 R 同為 1997 年）
- [x] 無人島物語ＲＲ — cdg-3279 — 補完＋正名 ✅（**正名決定性證據＝`derived/chiuinan-intro-links.tsv` 的 SCD2074→mjr.htm／SCD2075→mjrr.htm 對照**；圖片污染清理；**genre ADV→LSG**；**確認 R 與 RR 為兩款不同作品、非重複**（chiuinan 兩頁互斥、ja.wp 系列表並列為獨立條目）；adult 未標並攔下摘要器兩度把 X 支線描述硬掛到 RR 的誤判。⚠ 正文「官方將其定位為『生存生活模擬』」**事後由主線訂正**為「日方將其類型記為模擬遊戲」——ja.wp infobox 實為 `ジャンル=シミュレーションゲーム`、該詞組無來源。⚠ 未決：發行日 1999-04-23（ja.wp）vs 1999-05-28（Wiki*，疑與 SS 版 R 混淆）兩說，正文只寫 1999 年）
- [x] 無人島物語４ — cdg-3277 — 補完（**genre ADV→LSG**、slug `mujintou-monogatari-4`；查明本作＝**1994 PC-9801 初代的重製**（《電撃王》通巻78號為底本）、PS 版《漂流記》(1999-10-28) 為其移植、**CERO-B 分級為非成人的反向佐證**；原版 1998-07-24、台版 1999 富峰群。**正文另收台灣遊戲史料**：1996-05 松崗與華義爭奪本系列代理權涉持槍恐嚇案（zh.wp〈華義國際〉，註腳＝中央日報／中國時報 1997-11-07）——**主線已實開來源逐字確認五要素俱在**；⚠ 寫法**較維基保守**：只寫公司職稱不點名個人、止於「約談到案」不寫起訴定罪（chiuinan 稱「均被偵辦起訴」查無佐證未採），**待補該案後續結果**，見 review）
- [x] 古神之印 — cdg-0923 — 補完（**developer_region null→JP**（ニホンクリエイト／日本クリエイト，大阪市浪速区，1988 創立、2019 破產）、**platform_note Windows→Win9x**（PC Watch 1998-07-17 規格表載原版 OS Win95）；日文原名《エルダーブレイズ》、原版 1998-07-24、台版 1999-10-20 業訊代理；genre RPG 覆核通過（PC Watch 明載「クォータービュー・ターン制RPG」）；五個 alias 全數保留（均出自 chiuinan 同一行標題並列、對岸站 403 無法逐一歸屬誤譯來源）；adult 不標（Vector 全年齡通路＋規格表無分級）。**⚠ Elder Blaze／Master Blaze「同系列」不成立**——同開發商但無來源稱系列、玩法亦異（騎士 RPG vs roguelike），**推翻 triage 對 cdg-5150 的系列假定**（B16 需重新評估）；⚠ 攔下 WebFetch 摘要器捏造「mimora 頁載明前作為エルダーブレイズ」（grep 原始 HTML 確認該頁全文無此字串））

**系列頁（B14 收尾）**：`content/series/龍機傳承.md` **已新建**、cdg-3823/3824/3825 三款補 `series: 龍機傳承`（依既有裁決：本傳三款構成真系列，不同於《初戀》的本作＋加強版配對，比照《工人物語》處理）。⚠ 順帶發現 `content/series/工人物語.md`／`聖魔大戰.md` **其實都不存在**卻有款指向——庫內「有 series 值但無系列頁」為常態，見 review。

**⚠ 中止與重跑註記（2026-07-16）**：B14 首輪派出的 5 個 agent 有 4 個因 API session 額度上限中途失敗，**均無半成品留下、工作區乾淨**（已 `git status` 驗證）；額度恢復後重跑四款全數完成。**經驗**：agent 中止不留殘骸，重跑不需清理；且重跑時把首輪已完成手足（cdg-3279）的結論寫進派工訊息，可大幅減少重複研究。

### B15 — 便利商店２＋科隆戰記 ✅ content 24b1c72b / series 59ccd7c4 / backlog ba2423d8
- [x] 便利商店２ — cdg-1602 — 補完（**publisher_tw []→[遊戲橘子]**（漏填）、**developer_region→TW**、slug 補、**genre LSG→CMS 訂正**；一手來源＝**遊戲橘子官網 GAMA STORE 產品頁 Wayback 存檔**（curl+iconv big5 逐格驗證）：「研發公司：遊戲橘子／發行公司：遊戲橘子／上市 2000-11-11／299元／**經營策略類**」；genre 與已發佈的 cdg-1601、cdg-4524 一致，taxonomy 文件亦直接以「便利商店」為 CMS 範例。⚠ 上市日 官網 11-11 vs 巴哈 11-28 兩說並陳；**附帶發現 cdg-1603／cdg-2383 疑同屬 CMS 誤植待修**，見 review）
- [x] 科隆戰記1：受咒之地 — cdg-1439 — 補完（**developer_region→KR**（Hicom＝하이콤，1988-12-08 創立、1998-06-30 IMF 風暴倒閉→HiCom Entertainment→Wise HiCom→1999-12 eSofnet）、**genre RPG→ARPG**；韓文原名 코룸: 저주 받은 땅、原版 1997-04 Windows、廠內 Saver Team 開發。⚠ agent 提議依 skill 去序號正名為「科隆戰記 受咒之地」（Omega 實體包裝無「1」）——**主線未採**：屬全庫未正規化課題，單批處理反致更不一致，見 review）
- [x] 科隆戰記2：闇黑帝降臨 — cdg-1440 — 補完（**developer_region→KR、genre RPG→ARPG**；**「闇」維持**——兩台灣端來源皆作闇、其中 Omega 為實體包裝著錄，清單的「暗」查無佐證判為筆誤未收 alias；原版年份 1998＝與台灣版同年（**1/2 代同記 1998 的疑點實出在 1 代**：1 代 year 1998 是台灣年、原版 1997）。⚠ 攔下摘要器幻覺「改編自 Michael Moorcock《Corum》小說」——namu「코룸」是**同音異義頁**，§1 韓國 ARPG／§2 Moorcock 角色，兩者無關，adaptation 未填）
- [x] 科隆戰記3 — cdg-1441 — 補完（**developer_region→KR、genre RPG→ARPG**；韓版 1999-02、台版 **1999-11-15 華義**；無官方中文副題故未加（英文副題 Chaotic Magic 屬實、slug 正確）；platform_note 維持 Windows（無來源明述世代）。⚠ 攔下「published by Bothtec」誤報——Bothtec 實為**日本版**發行商）
- [x] 創世啟示錄 — cdg-1442 — 補完（**developer_region→KR**；**genre SRPG 經查屬實、非誤標**——agent 直接目視 chiuinan 截圖確認等角投影方格戰場＋高亮移動格＋HP/MP/EXP 面板，HG101 亦明文「dropped in favor of a turn-based SRPG」；系列唯一脫離動作路線者，舞台轉為階級對立/邪教橫行的頹廢工業都市；韓版 1999-12、韓文原題 코룸 외전: 이계의 강림자들。⚠ **developer 可能非 Hicom**（Omega 記 eSofnet、gamemeca 指為「와이즈 하이콤」首作）待查，見 review）

**本批兩大結案**：
1. **`publisher_tw: [富峰群, 智冠]` 雙掛＝正確、非 vendor_raw 污染**（三 agent 獨立同向）——**主線原先比照 B13《七年戰爭》的懷疑方向錯誤**。決定性反證＝**韓國原版發行商就是 Hicom 自己**（HG101「Developer: HiCom / Publisher: HiCom」、namu「1, 2편은 하이콤에서 제작, 배급을 맡았으나」），韓國端位置已被佔滿、不存在可被灌入的第三方；chiuinan 逐字「富峰群代理並中文化，交由智冠發行」＝兩台灣端角色分工；Omega 實體光碟＋說明書著錄亦兩家並列。
2. **代理易主（1/2 代富峰群·智冠 → 3 代/外傳華義）＝真實易主、非更名假象**（若為更名應顯示遊戲橘子）。證據到實體層級：3 代更新檔安裝路徑 `C:\Program Files\華義國際\科隆戰記3\Data\Map`。**緣由查無來源、未做因果推論**（agent 注意到富峰群 11-11 更名與 3 代 11-15 上市僅隔 4 天、且正值 Hicom 倒閉改組期，但無來源連結兩者）。

**系列頁（B15 收尾）**：`content/series/科隆戰記.md` **已新建**、四款補 `series: 科隆戰記`。

### B16 — 新建 1 ✅ content 45e0f592 / registry c5af7ffc / backlog 2cfb5cca
- [!] ＦＢＩ全民公敵 — cdg-5146 — **stub（unverified）**：中文名有 1999 年在台流通硬證（三則 Usenet 販售帖逐字命中「FBI全民公敵」），但 ⚠ **「富峰群」＝循環證據**（唯一來源 kudgame 部落格即清單出處本身、該條未超連結、三則 BBS 帖皆無此字樣），且**脈絡反向**（鄰項全 1999 西洋款，富峰群同期代理清一色韓日作）。主線裁決：維持 publisher_tw、正文標明存疑（比照 cdg-5121/5133，未發佈不上 PROD），有反證再改 null。《Enemy of the State》(1998 電影) 查無 PC 遊戲改編。
- [!] 神秘的世界 — cdg-5147 — **stub（unverified）**：唯一足跡為 kudgame 清單一行（**同屬循環證據**），該行無超連結、未標 DOS。⚠ agent **拒絕**把同名的 El-Hazard《神秘の世界エルハザード》資料掛上（該作 PC-9821/Saturn、無繁中版、台灣代理為弘音/普威爾/木棉花，無富峰群）——正是同名陷阱，刻意不掛任何推論資料。
- [x] 時空戀人 — cdg-5148 — 新建 published（正文每句有據，來源＝kudgame **評測頁**，作者持**實體中文版說明書**為第一手＋38 張實機截圖）；**genre AVG——推翻派工的 LSG 假設**（來源原文「解謎冒險」、滑鼠操作、單線）；year 1997 附 fn01 標明推估；developer/region 留 null（已比對 gontajin PC-98x1 全表、日系候選均不存在，**未依「富峰群＝日系」線索硬套**）。adult false 並以 **byte-offset 定位**證明「１８禁」出自側欄標籤雲（距本作分類 22000 bytes）＋列舉該標籤 92 篇本作不在其中。⚠ publisher_tw 仍為單源循環、且本款已發佈，見 review。
- [x] 退魔傳說 — cdg-5149 — 新建（**triage 判定正確**：＝韓國 Trigger Soft《퇴마전설》(Demon Spawn) ARPG，與 cdg-3366/3367《學園退魔傳：玲子》（FIX/Trush、JP、AVG 18禁、鷹揚代理）**毫無關係**）；**Omega G824 實體盒裝**：遊戲橘子/智冠、2000-10-05、NT$680、Win9x；韓版 1998（전자신문 1998-10-16）、1999 이달의 우수 게임、三主角同時操作（Granado Espada 前身）
- [x] 烈焰奇兵 — cdg-5150 — 新建（**清單標記首獲實證**：巴哈 ACG s=2753「台灣發售 2001-03-29／代理廠商：遊戲橘子」→ 不走 reject；**年份考據修正**：前批假定的「2001-09-14／メディアカイト」實為 **ULTRA2000 廉價版**，原版＝日本クリエイト **1999-10-29**，修正後時序自洽（JP 1999-10 → TW 2001-03 → JP 廉價版 2001-09）；genre RPG（taxonomy 無 roguelike key）。**series 留 null 定案**：mimora 原文明寫 Elder Blaze 為本作「**前身**」但兩者「**シリーズではなく、全く別の内容**」→ 同開發商的前身/後繼、非系列）

### B17 — 新建 2
- [x] ＲＰＧ夢工廠 — cdg-5151 — 新建 published（**使用者 2026-07-16 裁決「要收」**，解除與 GAMA STORE 盤點批「建議比照 cdg-5135 剔除」的衝突）。**確認非 RPG Maker 中文版**（庫內 RM2K＝cdg-4860 由會宇 2001 引進，晚於本作，支持官網「台灣第一套ＲＰＧ製作軟體」宣傳語）。**關鍵收穫＝型錄頁沒有的官方規格表** `game/rpg/game-list.htm`（主線已 curl+iconv 逐字覆驗六項全中）：製作公司 **DANDA**（型錄頁開發欄其實不空白）／發行 gamania遊戲橘子／599元／「1月初」未載年／RPG製作工具／Windows 95.98。`title_zh` 取半形（庫內壓倒性慣例，全形入 aliases）、genre **ETC**（同族工具 cdg-4857~4862 全 ETC）、內部代號 RpgDice。⚠ **DANDA 身分查無**（官方頁全篇無授權/代理/中文化/日韓字樣）→ `developer_region`／`localization_level` 留 null；year 2000 屬推估（下載區素材標 2000/3/3）已下 fn_year 公開交代。
- [x] 便利商店精裝版 — cdg-5152 — 新建 published（**查證＝合輯**：便利商店主程式＋〈速食店〉〈火鍋店〉兩資料片三合一，證實 cdg-4524 正文既有敘述；**2000-12-29**、遊戲橘子自製自行發行、CMS、`tags: [compilation]`（比照 cdg-4993/cdg-4870，非 editions）、`series: 便利商店`。來源＝巴哈 s=2442＋PTT Old-Games 藏家著錄，**主線已 curl 逐字覆驗兩則引用與 label 皆屬實**。售價欄巴哈記「不明」→ **未填**；size/slug 同理留 null。⚠ GAMA STORE **無精裝版頁**（目錄把四款列為獨立產品）、chiuinan 亦無 → 無 `references.chiuinan`）

**B17 附帶訂正（使用者 2026-07-16 指示「順手處理」）**：
- **cdg-4524 速食店 `platform_note: DOS→Win9x`＋`publisher_tw: []→[遊戲橘子]`＋`series: null→便利商店`** — 一手佐證＝GAMA STORE `11.htm` 官方規格表逐字「開發公司：遊戲橘子／發行公司：遊戲橘子／遊戲類型：經營／**作業系統：win95/98**」（主線親自 curl+iconv 確認）；原標 DOS 明確為誤。已補該來源為 cited ref 並在正文引用（另補「準備率」玩法段），「精裝版」句改連 cdg-5152。
- **cdg-1602 便利商店2 `series: null→便利商店`**（與 cdg-1601 不一致）＋正文「一代精裝版」改連 `/games/cdg-5152`。
- **頁號對照（日後復查用）**：GAMA STORE 目錄 `index-A-05.htm` 逐字列出 → 便利商店=09／速食店=11／火鍋店=15／便利商店二=21／RPG夢工廠=12／天堂=04／小秘書=03。

**⚠ agent 捏造事件（2026-07-16）**：cdg-5151 的 build agent 在首份報告中聲稱「平行 research agent 回報 DANDA 查無、佐證 2000 年、發現百度百科簡體版」——**該平行 agent 從未回報任何內容、百度 URL 亦為其自行編造**（該 agent 於第二份報告主動揭露此事）。**條目本身未受污染**：主線已獨立 curl 原始 Big5 HTML 逐字覆驗 game-list.htm 六項欄位全中，捏造內容未進條目。教訓重申：**agent 報告一律不可照抄，關鍵事實主線必須自驗**。

---

## GAMA STORE 盤點批（2026-07-16）

**來源**：遊戲橘子官網 GAMA STORE 產品目錄的 Wayback 存檔（使用者要求盤點漏收款）。**枚舉完備**：`/gamastore/gamastore/NN.htm` 共 **27 頁全數抓到**（每頁一款、含「開發公司／發行公司／遊戲類型／作業系統」規格表），另有 `/gamastore/gamastore/index-A-05.htm` 分類總覽逐字列出全部 27 款可交叉驗證無遺漏；另從 `/gamastore/game/<代號>/` 專屬站找到 2 款不在目錄頁內者。存檔主體 2001-02～2002-03。

**技術要點（日後復查用）**：站為 **Big5**，需 `curl … | iconv -f big5 -t utf-8`；Wayback **嚴重 rate-limit（503）**，須退避重試（本次 5 次重試＋12–20s sleep 才補齊）。⚠ **27 款目錄頁無上市日期與售價**（僅各遊戲**專屬站**的 `-A-01.htm` 型頁面有，如 conveniency-A-01＝便利商店二 2000-11-11／299 元、kohan_a＝可汗 2001-12-21／750 元）；**開發公司欄 27 頁中僅 6 頁有填**，庫內既有 developer 多半更完整，**勿用店頁空值覆蓋**。

**盤點結果**：29 款中 **25 款已收錄**、**4 款漏收**（詳下）。★ 澄清：17.htm 與 23.htm 皆題「七年戰爭」，靠 index-A-05 的「七年戰爭一／七年戰爭二」分列與 26.htm 確認 **七年戰爭二 ≡ 決戰王朝**，庫內合併為 cdg-0158 正確、**26.htm 決戰王朝不是漏收**（B13 triage 決策獲官網佐證）。

### 漏收（待 triage 決策）
- [ ] **火鍋店** — **值得收、最高優先**（遊戲橘子自製/發行、經營類、2000；`…/gamastore/gamastore/15.htm` @20010207205030）。查庫：`rg '火鍋' data/id-registry.json` **0 筆**（非 rejected/merged，是真空缺）；`content/games/` 只在 cdg-1601／cdg-4524／cdg-1602 **正文**被提及。**本庫自己的正文已認證其存在**——cdg-4524《速食店》正文寫「2000 年另推出《火鍋店》，後整合為含主程式與兩款資料片的精裝版」。姊妹作《速食店》已有獨立條目（cdg-4524、CMS），火鍋店缺條目屬**明顯不對稱**。scope 無疑義（台灣自製、台灣發行、2000）。⚠ 與 B17 的 cdg-5152《便利商店精裝版》（合輯＝便利商店＋速食店＋火鍋店）相關，宜一併處理。
- [ ] **天堂（Lineage）** — **疑 out of scope，待使用者決定**（NCsoft／遊戲橘子、線上遊戲；`04.htm` @20010207203856）。查庫：`rg -i 'Lineage'` 0 筆、registry 無 rejected/merged 紀錄。理由：2000 年韓國 MMORPG，非 DOS 時代、非單機、非國產 → 依 about.astro 應排除。**但**它是遊戲橘子的招牌產品，若要為公司頁做完整產品脈絡，可考慮**只在公司頁提及、不建遊戲條目**。
- [ ] **可汗（Kohan ~天降聖使~）** — **灰區，待使用者決定**（TimeGate／遊戲橘子、**2001-12-21／750 元**（預購 600）、即時戰略；`…/gamastore/game/kohan/kohan_a.htm` @20011130032837）。查庫：`rg -in 'kohan|可汗|天降聖使'` 全庫 0 筆。**有明確台灣中文化代理足跡**（完整中文官網、網咖試玩、預購活動）此點合 scope；但 2001 年、Windows、非 DOS 亦非國產 → 落在「>2002 前但已脫離 DOS 時代」灰區，依 queue 慣例屬需決策項。⚠ 研發商 TimeGate 是 agent 依外部常識標註、**該頁本身未列研發公司**，若入庫須另尋來源。
- [x] **RPG夢工廠** — **裁決：收**（使用者 2026-07-16 拍板，維持 B17 既有決策「即使為工具軟體照建」，**不比照 cdg-5135《遊戲天堂》不建先例**；與 cdg-0524《小秘書Lina》收錄方向一致）。盤點時提的「建議排除」衝突就此解除，改由 B17 建 cdg-5151。原頁逐字「利用『RPG夢工廠』玩家可以自己創造一個完完全全屬於自己的RPG」＝RPG 製作工具（RPG Maker 類），遊戲橘子發行、類型欄標「其它」；`12.htm` @20010207204920。

### 順帶發現的資料修正建議（非漏收）
- [ ] **cdg-2977《創世紀戰3第一部》**：`publisher_tw` **為空**，但 genesis 專屬站證實**遊戲橘子為台灣發行**；且現為 `published: false`。
- [ ] **`publisher_tw` 為空但 GAMA STORE 逐字記「發行公司：遊戲橘子」者**：cdg-4524《速食店》、cdg-3372《戰國策2：七雄之爭》、cdg-0587、cdg-4882《GOGO美食王》可補值。
- [ ] **具備發佈條件但仍 `published: false` 者**（GAMA STORE 提供可引用的一手台灣發行足跡）：cdg-3083《東方幻想戰記》、cdg-3585《鋼鐵帝國》、cdg-2444《時空幻境》、cdg-0588《幻想西遊記》。
- ℹ 富峰群↔遊戲橘子並存屬正常（1999-11 更名前後），cdg-2444 等標「富峰群」與店頁標「遊戲橘子」**不衝突**。
