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
- [x] **火鍋店** — **已建 cdg-5153、published**（2026-07-16，使用者指示「順手處理」）。遊戲橘子/TW/2000/CMS/`series: 便利商店`/Win95·98；cdg-1601/1602/4524/5152 正文的〈火鍋店〉已補交叉連結。**新發現＝未單獨標價販售**：udn 報時光逐字「而資料片〈火鍋店〉不再打199元的低價策略，直接放進《MANIA》雜誌，免費贈送給玩家。」（主線已 curl 覆驗）——解釋了型錄頁何以無售價欄。玩法逐字：四家店面／旋轉火車送火鍋料／可上網下載新菜色／對手為羊肉爐與薑母鴨／商家互鬥時跳出四項小遊戲。⚠ **developer 依旁證而非直接來源**：`15.htm` 的**開發公司欄實為空白**（agent 誤報為「逐字：開發公司：遊戲橘子」，主線 curl 當場戳破——正是盤點批「開發欄 27 頁僅 6 頁有填」的預警成真），正文已改為據〈速食店〉型錄頁＋精裝版巴哈著錄兩項旁證推定，並明寫該欄從缺。⚠ **chiuinan 無火鍋店專頁**、巴哈無專屬 acgDetail 頁。
  - **🆕 待查：便利商店「黃金版」疑另一漏收** — chiuinan cstore1 逐字「並推出整合三者的精裝版與**黃金版 [待補]**」（主線覆驗；該站自標 [待補]＝其本身亦未考據完）。全庫查無黃金版條目。僅此一處提及，**須另尋佐證再決定是否建 id**（可能與精裝版 cdg-5152 為同物異名，勿逕自新建）。
- ~~火鍋店（原盤點註記：值得收、最高優先）~~ 原始盤點理由留存：（遊戲橘子自製/發行、經營類、2000；`…/gamastore/gamastore/15.htm` @20010207205030）。查庫：`rg '火鍋' data/id-registry.json` **0 筆**（非 rejected/merged，是真空缺）；`content/games/` 只在 cdg-1601／cdg-4524／cdg-1602 **正文**被提及。**本庫自己的正文已認證其存在**——cdg-4524《速食店》正文寫「2000 年另推出《火鍋店》，後整合為含主程式與兩款資料片的精裝版」。姊妹作《速食店》已有獨立條目（cdg-4524、CMS），火鍋店缺條目屬**明顯不對稱**。scope 無疑義（台灣自製、台灣發行、2000）。⚠ 與 B17 的 cdg-5152《便利商店精裝版》（合輯＝便利商店＋速食店＋火鍋店）相關，宜一併處理。
- [x] **天堂（Lineage）** — **裁決：不建遊戲條目，只在公司頁提及**（使用者 2026-07-16）。**無需動作＝現況已滿足**：`content/companies/遊戲橘子.md` 已兩處記載（定位語「以代理營運《天堂》等線上遊戲奠定龍頭地位」＋沿革段「2000 年代理韓國 NCsoft《天堂》（Lineage）上線，開創台灣線上遊戲的收費營運模式」）。catalog 收錄邊界維持（線上遊戲非 DOS 時代／非單機／非國產）。原盤點理由留存：
- ~~天堂（原註記）~~（NCsoft／遊戲橘子、線上遊戲；`04.htm` @20010207203856）。查庫：`rg -i 'Lineage'` 0 筆、registry 無 rejected/merged 紀錄。理由：2000 年韓國 MMORPG，非 DOS 時代、非單機、非國產 → 依 about.astro 應排除。**但**它是遊戲橘子的招牌產品，若要為公司頁做完整產品脈絡，可考慮**只在公司頁提及、不建遊戲條目**。
- [x] **可汗（Kohan ~天降聖使~）** — **裁決：收，建 cdg-5154**（使用者 2026-07-16；有明確台灣中文化代理足跡＝合 scope 主要判準，2001 年在既有年份範圍內，比照 cdg-5119 流氓大亨／cdg-5122 歐洲空戰風雲等「外商開發＋台灣代理」先例）。B18 建檔中。⚠ 派工已載明：**TimeGate 係前手 agent 依外部常識標註、該頁未列研發公司**，須另尋來源證實，查無則留 null。原盤點理由留存：
- ~~可汗（原註記）~~（TimeGate／遊戲橘子、**2001-12-21／750 元**（預購 600）、即時戰略；`…/gamastore/game/kohan/kohan_a.htm` @20011130032837）。查庫：`rg -in 'kohan|可汗|天降聖使'` 全庫 0 筆。**有明確台灣中文化代理足跡**（完整中文官網、網咖試玩、預購活動）此點合 scope；但 2001 年、Windows、非 DOS 亦非國產 → 落在「>2002 前但已脫離 DOS 時代」灰區，依 queue 慣例屬需決策項。⚠ 研發商 TimeGate 是 agent 依外部常識標註、**該頁本身未列研發公司**，若入庫須另尋來源。
- [x] **RPG夢工廠** — **裁決：收**（使用者 2026-07-16 拍板，維持 B17 既有決策「即使為工具軟體照建」，**不比照 cdg-5135《遊戲天堂》不建先例**；與 cdg-0524《小秘書Lina》收錄方向一致）。盤點時提的「建議排除」衝突就此解除，改由 B17 建 cdg-5151。原頁逐字「利用『RPG夢工廠』玩家可以自己創造一個完完全全屬於自己的RPG」＝RPG 製作工具（RPG Maker 類），遊戲橘子發行、類型欄標「其它」；`12.htm` @20010207204920。

### B18 — 可汗新建＋幻想西遊記清污＋創世紀戰3 ✅ content 1e192fc2＋563516a0 / registry da9963e5 / reject c7c5bc06

- [x] **可汗～天降聖使～ — cdg-5154 — 新建 published**（使用者裁決要收）。**TimeGate 疑點已解**：產品頁 `kohan_a.htm` 確實未列研發公司，但導覽列的**製作小組頁 `kohan_d01.htm`** 逐字載「1998年，TimeGate Studios…成立於美國德州，休士頓」＋班底來自 Charybdis／Bioware／Origin／Atomic Games（主線 curl 覆驗；維基 infobox 交叉確認）→ `developer: TimeGate Studios`／`US` 有一手台灣端來源。官方頁逐字：`上市時間：2001年12月21日`、`玩家獨享預購價 600元（上市定價750元）`、`即時戰略`→ genre **RTS**；2001-11-19 起網咖試玩。⚠ **`localization_level: packaging` + `content_language: null` 為刻意組合**（庫內罕見，927 筆 packaging 中僅 2 筆搭 null）：**遊戲本體語言查無任何來源**（10 個存檔官方頁 grep `中文|英文|語言|繁體|中文化` 零命中；官方截圖全 404；MobyGames/PCGamingWiki 403），「完整中文官網」不能證明本體中文化 → **不比照 cdg-5119/5122 的 packaging+en**（那兩款有正面證據），有實體盒裝／雜誌廣告／零售著錄再定。
- [x] **cdg-2977《創世紀戰3第一部》 — 補完＋發佈**（Softmax/KR/2001/SRPG/4CD；**platform_note Windows→Win9x**（FAQ 逐字 `Windows95/98`＋`中文版`）、aliases 補 창세기전3／創世紀三）。**`publisher_tw` 補遊戲橘子＝間接推定、非逐字著錄**：無任何頁面寫「發行公司：遊戲橘子」，依據為 ①繁中專屬站架在**遊戲橘子自家網域** `gamania.com/gamastore/game/genesis/`（與 kohan／rpg／fire／conveniency 等已確認產品同一目錄樹）②盒裝零售促銷（憑封盒換贈品、NOVA 現場）③FAQ 售後換貨（持發票至購買處）——均屬發行商層級作為，已下 `fn_publisher` 公開交代證據性質。⚠ **GAMA STORE 產品目錄 27 款未收錄本作**（故盤點批「可找出對應 NN.htm」不成立；本款屬「專屬站有、目錄無」的另 2 款之一）。⚠ **主線訂正 agent 的引用不當**：首句「由遊戲橘子引進台灣」原掛 `chiuinan_page`，但主線 curl 該頁全文**未提遊戲橘子／代理／發行**（只有「韓國Softmax 2001年出品…中文版」）→ 已改掛專屬站與 FAQ。
- [x] **cdg-0588《幻想西遊記》 — 清污＋補完＋發佈**（KCT/KR、遊戲橘子中文化・智冠發行、2000；**genre SRPG→RPG**（namu 逐字自由走位非網格戰棋，namu／omega／GAMA 三家皆標 RPG，chiuinan 的 SRPG 為少數說）、**year 1998→2000**（台灣版年慣例＋fn01）、**platform Win9x**、adaptation 補許英萬動畫《날아라 슈퍼보드》）。
- [x] **cdg-0587《幻想西遊記》（金智塔） — reject**（使用者 2026-07-16 裁決）。深圳金智塔／歲月工作室、2000-05、**簡體中文版、人民幣 68 元、自行發行、查無台灣足跡** → 違反「catalog 只留台灣發行/代理」，比照 cdg-0546 少林足球先例。registry 標 rejected＋reject_reason、檔案刪除；**cdg-0588 title 回退裸名**（不再撞名，撤銷 agent 依 id-policy 所加的（金智塔）／（遊戲橘子）後綴）；cdg-0588 正文的同名考據**改為純文字保留**（事實有價值、不留死連結）。

**⚠ B18 最重要教訓——盤點批的兩條建議都是錯的，且錯法會掛錯款**：
1. **「cdg-0587 補 publisher_tw 遊戲橘子」＝錯**。GAMA STORE `13.htm` 逐字為 `開發公司：kct`／`發行公司：遊戲橘子`（主線 curl 覆驗）→ **13.htm 屬 cdg-0588，不是 0587**。照建議做會把遊戲橘子安到一款深圳簡中遊戲頭上。兩款同名是陷阱，`derived/chiuinan-intro-links.tsv` 的 **SCD1078→hxxyj.htm（0587）／SCD0717→flyingsb.htm（0588）** 為決定性對照。
2. **「GAMA STORE 開發公司欄多為空白」不是通則**——13.htm **有值**（kct）。盤點批的「27 頁僅 6 頁有填」只能當提醒，**每頁仍須自己看**（此前 15.htm 火鍋店確為空白、agent 謊報有值；13.htm 則相反）。
3. **omega 引用是「掛錯號」非「誤掛」**：`5233`＝「幻想西游記…金智塔 簡體中文」（屬 0587）、`5228`＝「幻想西遊記.FlyingSB.KCT.遊戲橘子.智冠」（屬 0588），兩檔原本都指 5228；`derived/omega-threads.json` 可查證。

### 順帶發現的資料修正建議（非漏收）
- [x] ~~**cdg-2977《創世紀戰3第一部》**：`publisher_tw` 為空、`published: false`~~ → **B18 已處理**（見上）。
- [x] ~~**`publisher_tw` 為空但 GAMA STORE 記「發行公司：遊戲橘子」者**~~ → **B19 全數處理**：cdg-4524《速食店》（B17 已補）、cdg-3372《戰國策2》✅、cdg-4882《GOGO美食王》✅；~~cdg-0587~~ **建議作廢**（13.htm 實屬 cdg-0588，且 0587 已 reject）。
- [x] **cdg-2978《創世紀戰3第二部》— reject**（使用者 2026-07-16 裁決）。複查逐字證實：chiuinan 標題註「（The War of Genesis 3: Part 2，**簡中版**）」、備註「**本代沒出繁中版。**」，所附「繁中化檔.rar」為**民間非商業漢化**（依 `schema.md` 民間漢化條款不計中文化等級，反為「無官方繁中版」的反面實證）→ 違反「catalog 只留台灣發行/代理」，比照 cdg-0587。registry 標 rejected、檔案刪除、cdg-2977 對其連結改純文字。⚠ 原標 `content_language: zh` + `localization_level: localized` 與來源直接矛盾——**此型污染已促成獨立掃描批**，見 [simplified-only-scan.md](simplified-only-scan.md)。
- ℹ **cdg-2977 三章節譯名分歧**（未寫入正文）：chiuinan「月影西藩刃」／遊戲橘子官網 index「月影四藩刃」／story 頁傭兵隊稱「偃月刃」。
- [x] **具備發佈條件但仍 `published: false` 者 — B19 全數補完發佈** ✅ content d81e50c6：
  - **cdg-3083《東方幻想戰記》**：原作＝HQ Team《이스트》(East) 1998-09、韓國 SKC 發行；**genre SLG→RTS**（chiuinan「即時戰略」／dhwiki／namu 三源）、`developer_region→KR`；namu 逐字「수출판 이름은 '동방환상전기'」證同一性；已交叉連結同開發商的 cdg-0157《七年戰爭》。⚠ **店頁 16.htm 開發欄填「遊戲橘子」與庫內 HQ Team 衝突→未採**（店頁把台灣代理填進開發欄），正文並陳兩說。
  - **cdg-3585《鋼鐵帝國》**：Sonnori/KR、韓版 1999-09、**台灣 2000-03-15 遊戲橘子代理**（巴哈 s=30350）；**genre 維持 SLG 未動**——來源真分歧（chiuinan「策略角色扮演」vs ko.wiki `턴제 전략 게임`／namu「반턴제」／HG101 明言無網格戰棋、近似 Ogre Battle 且地圖層即時），不為 churn 而改，**待複核**。趣聞：`아시레마(ACIREMA)`＝AMERICA 反寫、地圖為倒置美洲。⚠ 抄襲指控的日本原作**未具名**（來源僅給韓文《하이리워드》，無法驗原題）。
  - **cdg-2444《時空幻境》**：三款中證據最硬——**redump 實體壓片雷射蝕刻碼**逐字 `富峰群資訊股份有限公司 時空幻境disk 1 PIG-00046`、Region `Taiwan`、Languages `Chinese`、條碼 `4 718268 000460`（**主線 curl redump.org/disc/96479 逐字覆驗全中**）；韓國原作《미사이어 - 신념으로의 부름》1999、SRPG 維持。**`publisher_tw` 取富峰群非店頁的遊戲橘子**（PVD 壓片日 1999-10-22 早於 11-11 更名，兩者不衝突）。⚠ **韓國 GamaSoft 與 Gamania（遊戲橘子）無關**，勿因店頁小寫 `gamasoft` 誤認。**系列發現**：本作為 XenoAge 首作，已交叉連結 cdg-2745《夢幻武士：龍刻之章》與 cdg-0629《永恆之星》（＝本作重製版）；series 留 null（三個台灣譯名互不相干、無台灣系列名）。
  - **cdg-0588《幻想西遊記》**：B18 已補完發佈（見上）。

**⚠ B19 結論：「GAMA STORE 開發公司欄多為空白」通則正式作廢。** 實測 13.htm＝`kct`、25.htm＝`奧汀科技`、16.htm＝`遊戲橘子`、19.htm＝`Sonnori`、06.htm＝`gamasoft` **皆有值**；僅 15.htm（火鍋店）確為空白。**每頁必須自己 grep 原始 HTML**——本專案在這一欄已出現**兩種相反的錯誤**：15.htm 空白被謊報成有值、13.htm 有值卻被當成空白而漏看。且**開發欄有值 ≠ 可信**（16.htm 填代理商、25.htm 的「奧汀科技」不如庫內「奧汀」canonical），**勿用店頁覆蓋庫內 developer**。

**⚠ B19 附帶揪出兩處既有假引用**（agent 自查、主線覆驗）：① cdg-3372 舊正文「大宇資訊於 1992 年發行之《戰國策》」掛 chiuinan `ws2.htm`——該頁全文僅「遊戲橘子2000年出品的即時戰略遊戲」，未提大宇亦未提 1992，且首作 cdg-3371 的 developer 實為**富進**；② cdg-4882「2001 年 1 月」掛 `web.uj.com.tw` 角色圖頁——該頁不支持該日期（日期本身正確，已改掛巴哈 s=2223）。另移除失真敘述「另含兩名隱藏角色」（官方原文為「隱藏的**關卡**」）。三條待核已入 [game-entry-review.md](game-entry-review.md)。
- ℹ 富峰群↔遊戲橘子並存屬正常（1999-11 更名前後），cdg-2444 等標「富峰群」與店頁標「遊戲橘子」**不衝突**。

---

## Square/捷友/安峻/晟業/詮積/尼奧批次（2026-07-16）

Triage 結果：39 款 → 1 略過（已發佈）、27 補完（既有 stub）、8 新建（id 鎖 cdg-5155～5162）、2 條件收（NBA LIVE，先研究足跡）、1 維持 reject。

**決策（2026-07-16）**：
- **NBA LIVE 97／98（美商藝電＝EA，DOS 運動年貨）→ 查有台灣代理足跡才收**：build 時研究，有 EA 台灣分公司／代理正式發行足跡就建（多半無繁中→packaging/en，比照模擬城市3000 EA台灣直營前例）；查無台灣足跡則 reject（比照 cdg-0102/0104 等 NBA 系列 reject 前例）。id 預留 cdg-5163/5164。
- **《我的野蠻麻將》cdg-1129（已 rejected：麻將 shovelware）→ 維持 reject**，不復活、不建。
- **獵豔大富翁**＝既有 cdg-3549「獵艷大富翁」（獵艷/豔異體字同款）；⚠ 庫記 developer **大野狼工作室** ≠ 清單標【詮積】，build 時查證歸屬；標 18禁→adult。
- **世界棒球【尼奧】≠ cdg-4943「世界棒球賽」**（後者 Quest 日廠 1984、已發佈）→ 屬尼奧台灣自製另款，新建。
- **手談【晟業】→ 對應 cdg-2942「初段手談」**（晟業；豐海 cdg-3027／弈緣 cdg-3028 為另家同名款，不動）。
- **圍棋習遊記２【晟業】→ 疑即 cdg-1064「圍棋習遊記：初學篇」**，build 時查證是否同款；查無真2代則補完 cdg-1064。
- **梭哈俄羅斯 cdg-3097**：developer 現記 Sweetleaf ≠ 清單標【安峻】，build 時查證。

### 略過（已發佈 [~]）
- [~] 人間道之少年燕赤霞 — cdg-1558（安峻，已發佈）

### 補完（既有 stub [ ]，pub=false）
- [!] 太空戰士７（最終幻想7）— cdg-2486 — 訂正 foreign/en/unverified、**未發佈**（PC 版 Eidos 英文版、查無官方繁中與台灣代理實證；localized→foreign 為 LLM 誤標訂正）
- [!] 太空戰士８（最終幻想8）— cdg-2487 — 訂正 foreign/en/unverified、**未發佈**（PC 版 2000、year 1999→2000 訂正；同 FF7 查無台灣官方足跡）
- [x] 熱血躲避球 — cdg-3312 — 補完（捷友/智冠/2000/SPG，去序號、爆笑熱血躲避球別名）
- [x] 熱血躲避球２《更新檔》— cdg-3313 — 補完（捷友/智冠/2001/SPG，九隊故事模式，dodge2_patch 更新檔同款不另建）
- [x] 傲世蒼龍－趙雲傳 — cdg-1667 — 補完（捷友/2002/SRPG，34章164回，回合戰棋）
- [x] 三國麻將風雲 — cdg-0259 — 補完（捷友/1998/TBG，16張計台，單挑/統一模式）
- [x] 三國志－蜀漢英雄傳 — cdg-0231 — 補完（FPS Doom-clone，安峻/智冠/1997，姊妹作 cdg-1558 人間道；genre null→FPS）
- [x] 斷劍傳說－聖戒風雲 — cdg-4391 — 補完（安峻自製自發/RPG/2000/3CD，Omega 5827 為源；year 1999/2000＋genre RPG/RSLG 存疑記 review）
- [x] 梭哈俄羅斯 — cdg-3097 — 補完（釐清：Sweetleaf 原作、Crystal 發行、安峻代理；清單【安峻】＝代理商非開發，registry developer 不動；packaging/en/PZG）
- [x] 手談 — cdg-2942 — 補完（＝初段手談，晟業/智冠/2005/TBG，陳志行手談程式最終作，傳統演算法已落後蒙地卡羅）
- [x] 圍棋習遊記 — cdg-1063 — 補完（晟業/2002/TBG，西遊記人物對手＋兒童入門，別名圍棋西遊記）
- [x] 圍棋習遊記２ — cdg-1064 — 補完（**確認＝圍棋習遊記：初學篇**，chiuinan 無獨立2代條目；補 alias 圍棋習遊記2；晟業/智冠/2003/TBG，專為初學者、9/13 路）
- [x] 圍棋爭霸 — cdg-3098 — 補完（＝棋侶：圍棋爭霸，晟業/智冠/2005/TBG，加入闖關劇情模式）
- [x] 象棋水滸戰 — cdg-2152 — 補完（TBG/1997/Win3.1，水滸人物電腦對手，series 象棋水滸戰首作，publisher_tw [] 自資）
- [x] 象棋水滸戰２ — cdg-2153 — 補完（TBG/2000，逾千局實戰譜）
- [x] 象棋習遊記 — cdg-2154 — 補完（TBG/2003，智冠代理，chiuinan 歸「象棋遊戲」非教材）
- [x] 象棋武林帖 — cdg-2150 — 補完（TBG/1998，依 chiuinan 補 publisher_tw 智冠，連線對弈功能豐富）
- [x] 象棋追擊戰 — cdg-2156 — 補完（TBG/2007，智冠代理，光碟序號認證，資料稀少玩法不詳）
- [x] 象棋路邊攤 — cdg-2155 — 補完（晟業/1998/TBG，象棋殘局軟體，約3722局＋20角色分級挑戰）
- [x] 雀美眉寫真館 — cdg-1963 — 補完（TBG/adult/2000，詮積自製自發，日式13張＋CG，互連 cdg-1964）
- [x] 三國霸業 — cdg-0255 — 補完（RTS 即時戰術/詮積·智冠/2000；genre SLG→RTS、title 去序號同步 registry、series 三國霸業）
- [x] 三國霸業２ — cdg-0256 — 補完（RTS/2003，genre SLG→RTS、series）
- [x] 百萬大富翁 — cdg-0836 — 補完（尼奧科技/智冠/2001/PZG，限時答題益智，呼應電視益智節目風潮）
- [x] 少林麻將 — cdg-0547 — 補完（尼奧科技/2002/TBG，16張，雀王爭霸劇情模式，12 名戲仿角色配音）
- [x] 報數！三國演義 — cdg-0783 — 補完（尼奧/2002/TBG，三國大富翁，2008 復刻版）
- [x] 八年抗戰 — cdg-0167 — 補完（尼奧/2001/SLG 回合戰棋，series 八年抗戰，2005 六十週年紀念版＋釣魚台資料片）
- [x] 獵豔大富翁（＊18禁）— cdg-3549 — 補完（大野狼工作室/詮積/2001/TBG/adult，成人向大富翁＋戀愛邂逅；dev 確認大野狼、非詮積；E7 已 build content a0c8aa00，本次僅補回漏更新的 checkbox）

### 新建（[ ]，id 鎖 cdg-5155～5162）
- [x] 藍調情人 — cdg-5155 — 新建 published（捷友/1998/LSG，號稱台灣首款自研戀愛模擬；丁小芹代言、主題曲〈Fantasy〉；來源：丁小芹維基＋巴哈 ACG＋PTT）
- [x] 圍棋封神榜 — cdg-5156 — 新建 published（晟業「棋侶」品牌詰棋題庫，2013，近7000題30級–1段+棋力證書；chiuinan 無此條目，痞客邦零售心得（博客來/7-11 取貨）為足跡。⚠ 單一部落格來源、year 2013 偏晚，宜複核）
- [!] 中國陸軍棋 — cdg-5157 — 新建 unverified stub（晟業/TBG；chiuinan 晟業26款查無、web 亦無足跡，僅 kudgame 清單；year/platform/玩法無資料、released 未證實。已交叉連結 cdg-1363/1164/3981 消歧義）
- [!] 企鵝瑪力歐 — cdg-5158 — 新建 unverified stub（尼奧；查無足跡，僅 kudgame 清單掛名，year/genre/玩法無資料）
- [x] ＧＯ！ＧＯ！台北捷運 — cdg-5159 — 新建 published（尼奧/智冠/2003-07/SIM，與臺北捷運公司官方合作授權，淡水線民權西路→淡水駕駛模擬，3 難度＋突發狀況；**主線 WebSearch 覆驗屬實**：wiki＋iThome node/21421＋巴哈 ACG s=5715）
- [x] 八年抗戰２ — cdg-5160 — 新建 published（尼奧/2012/RTS，八年抗戰系列第二部，回合內政＋即時戰鬥雙模式，series 八年抗戰，連結前作 cdg-0167；cite GNN sn=75003 沿用 cdg-0167）
- [x] 明星商店 — cdg-5161 — 新建 published（尼奧/2006/CMS，藝人副業開店經營模擬；cite GNN sn=22658＋巴哈國產總表。⚠ 主線未親驗，GNN 被 Anubis 擋、依 WebSearch 摘要）
- [x] 世界棒球 — cdg-5162 — 新建 published（尼奧/智冠/2004/SPG，中華隊投手＋威力加強版職棒球季模式；區隔 cdg-4943 Quest 世界棒球賽；**主線 WebSearch 覆驗屬實**：twbsball 台灣棒球維基館）

### 條件收（研究後裁決 reject，2026-07-16）
- [x] NBA LIVE 97 — **reject cdg-3014**（≠新建：97/98 早已存在庫內為「勁爆美國職籃97/98」stub，預留 id cdg-5163/5164 **未用**）。研究結論：1996 發行早於 EA 台灣分公司成立（1997）、查無官方代理/盒裝足跡、僅水貨 → 無台灣正式足跡。使用者裁決兩款都 reject（比照 cdg-0104）。
- [x] NBA LIVE 98 — **reject cdg-3015**（同上；1997-11 發行落 EA 台灣成立灰帶，但查無點名發行證據）。使用者裁決 reject。
- ℹ **系列一致性**：庫內同系列 95/96/99（cdg-3012/3013/3016）仍為 stub，使用者裁決本輪**不動**（99 未來若考據 EA 台灣 1999 直營足跡最可能翻正）。cdg-5163/5164 預留 id 作廢未用。

### 維持 reject
- ~~我的野蠻麻將 — cdg-1129 — 維持 reject（麻將 shovelware，使用者 2026-07-16 裁決不復活）~~

#### 批次規劃（每批 build 完 commit＋更新狀態）
- E1 太空戰士：cdg-2486、2487 ✅ content 263967b2（原皆訂正 foreign/unverified、未發佈）。⚠ **cdg-2486 事後翻案** ✅ content 73da06a1：露天盒裝實物（繁中側標系統需求＋Printed and Assembled in Taiwan＋繁中使用者手冊）→ packaging/published、移除 release_status；**publisher_tw 仍空、台灣代理商名稱待考**（僅露天圖為證，宜複核）。cdg-2487 維持 unverified 未發佈（無對應盒裝實證）。
- E2 捷友：cdg-3312、3313、1667、0259、5155 ✅ content 8704788f / registry e0475c82
- E3 安峻：cdg-0231、4391、3097 ✅ content 24832d9c（安峻純文字對齊 cdg-1558）
- E4 晟業圍棋/手談：cdg-2942、1063、1064、3098、5156 ✅ content 52953081 / registry d93aba2c
- E5 晟業象棋：cdg-2152、2153、2154、2150、2156 ✅ content 99610a22（全 published，TBG，chiuinan 唯一來源）
- E6 晟業棋類收尾：cdg-2155、5157 ✅ content 485fe9f0 / registry aa9f3ebf
- E7 詮積：cdg-1963、0255、0256、3549 ✅ content a0c8aa00 / registry 6ea51e69（三國霸業 genre RTS＋去序號；獵艷 dev 大野狼確認）
- E8 尼奧補完：cdg-0836、0547、0783、0167 ✅ content 0d7dddf3
- E9 尼奧新建：cdg-5158、5159、5160、5161、5162 ✅ content c1985fb3 / registry d2b54a88（4 published＋5158 stub；5159/5162 主線 WebSearch 覆驗、5161 待核）
- E10 美商藝電（條件）：NBA LIVE 97/98 ✅ reject b416d466（97/98＝既有 cdg-3014/3015 stub，非新建；研究後查無台灣足跡、使用者裁決兩款 reject；95/96/99 不動、預留 id 5163/5164 作廢）

---

**本批完成（2026-07-16）**：39 款盤點 → 1 略過、27 補完、8 新建（cdg-5155~5162）、2 reject（cdg-3014/3015 NBA Live 97/98）、1 維持 reject（cdg-1129）。全 E1–E10 批次 commit 完畢，validate 全綠（games 4506、errors 0）。
- **新建落地**：cdg-5155 藍調情人（捷友首款戀愛養成）、5156 圍棋封神榜、5157 中國陸軍棋(stub)、5158 企鵝瑪力歐(stub)、5159 GO!GO!台北捷運、5160 八年抗戰2、5161 明星商店、5162 世界棒球。
- **E1 翻案**：cdg-2486 太空戰士7 由露天盒裝實物翻為 packaging/published（publisher_tw 仍空、代理商待考）。
- **重要 developer/genre 訂正**：三國霸業 SLG→RTS＋去序號（E7）；捷友躲避球 SPG、尼奧八年抗戰 series/RTS 續作。
- **待核疑點**：cdg-2486 台灣代理發行商名稱待考；cdg-5156 圍棋封神榜單一部落格來源＋year 2013 偏晚；cdg-5161 明星商店 GNN 被 Anubis 擋、依 WebSearch 摘要未親驗；勁爆美國職籃 95/96/99 sibling 一致性（未來 99 可能翻正）。

---

## 京群/冠捷/榮欽/鄉根/棋牌休閒批次（2026-07-16）

Triage 結果：41 款 → 2 略過（已發佈）、23 補完（既有 stub）、11 新建（id 鎖 cdg-5163~5173）、5 維持 reject。

**決策（2026-07-16，AskUserQuestion）**：
- **既有 5 筆 rejected 全維持 reject、不復活**：cdg-0004/0002/0003 冠捷 0204 三款成人麻將 shovelware（2002–03）、cdg-1410 政治麻將三缺一(2004)、cdg-0388 大富翁夢之童話大陸(2005 業餘自製)。比照 0204 原判/cdg-1129 野蠻麻將/逾年代前例。
- **雀王傳2誘惑麻將 → 新建**（成人真人麻將，京群系列 2 代；初代 cdg-1962 絕色麻將為 active keeper，續作比照收；id cdg-5163）。
- **7 款查無報導/廣告足跡、僅 kudgame 低價清單者 → 全建 unverified stub（published:false）**：淘氣貝克、雞蛋糕啪啪走、創業大富翁、裝甲戰士、賽車總冠軍GO、IQ爭霸、殭屍宅急便（cdg-5167~5173）。台灣廠商有市場足跡屬 in-scope，比照 cdg-5157/5121 慣例。
- **釐清（subagent 查證，直接採用不新建）**：①「大富翁與小富婆之富貴人生」＝cdg-0386（冠捷/2004）完整盒裝副標，補別名即可；②「明星賭城之群星大會戰（明星撲克城）」＝明星賭城系列別名（最可能 cdg-2395），build 時對應、補別名；③「大富翁與小富婆」cdg-0386 vs「網錢商店大富翁」cdg-2122 為**兩款獨立**（冠捷/2004 vs 捷思特/2001 即時制），各補完。

### 略過（已發佈 [~]）
- [~] 三國群雄傳之臥龍與鳳雛 — cdg-0247（智傲 Gameone/2001） ｜ 春秋英雄傳 — cdg-2442（英資達/2000）

### 補完（既有 stub [ ]，pub=false）
- [x] 雀王傳－絕色麻將 — cdg-1962 — 補完 published（京群/2002/成人真人16張麻將，series 雀王傳，連結續作 5163）
- [x] 大富翁８美眉 — cdg-0372 — 補完 published（京群/2003/成人棋盤，借「大富翁」名號非大宇正牌，典藏版含寫真）
- [x] 模擬城市－深海大亨 — cdg-3180 — 補完 published（Anarchy Deep Sea Tycoon/京群代理繁中 localized，非 Maxis SimCity；title 正名冒號）
- [x] 中國象棋 — cdg-0302 — 補完 published（吳身潤個人共享軟體/1995/Win3.1；【普威爾】查無佐證 publisher_tw 留空、記 review；同名13筆消歧義另記 backlog）
- [x] 三國戰略之十六張麻將 — cdg-0232 — 補完 published（冠捷/2003/三國題材16張麻將，名為「戰略」實為自由對戰）
- [x] 明星賭城 — cdg-2395 — 補完 published（冠捷/智冠/2003 系列首作，去序號＋registry title 同步；補「群星大會戰/明星撲克城」別名；≠Sierra 明星撲克）
- [x] 明星賭城２ — cdg-2396 — 補完 published（冠捷/2005 續作，六款子遊戲，series 明星賭城）
- [x] 大富翁與小富婆 — cdg-0386 — 補完 published（冠捷/2004，補「富貴人生」完整副標別名）
- [x] 網錢商店大富翁 — cdg-2122 — 補完 published（捷思特/2001 即時制大富翁，網站經營主題，與 0386 兩款獨立）
- [x] 新無敵炸彈超人 — cdg-2338 — 補完 published（榮欽/智冠/2001/ACT，去序號＋registry 同步，8人網對戰＋地圖編輯，series）
- [x] 新無敵炸彈超人２巴冷公主篇 — cdg-2339 — 補完 published（榮欽/智冠/2004，套入自家巴冷公主 IP，series 2代）
- [x] 巴冷公主 — cdg-1109 — 補完 published（榮欽/智冠/2002/ARPG，魯凱族百步蛇傳說 3D 動作，古昌弘參與；genre 判 ARPG）
- [x] 江湖英烈傳 — cdg-1138 — 補完 published（廈門盤古開發 region→CN、昱光代理 SRPG/2000，辛棄疾主角宋金對峙；⚠昱光單一來源、疑昱泉誤植待核）
- [x] 阿帕契捍衛隊 — cdg-1342 — 補完 published（Simis/GB Team Apache 攻擊直升機 SIM，1998→year 訂正，en/foreign，未中文化台灣英文版流通）
- [x] 鬥鬥龍 — cdg-3646 — 補完 published（Tensoft 天際軟體/TW/1997/ACT，雙人恐龍對戰，region→TW、native 訂正）
- [x] 夢幻妖精 — cdg-2733 — 補完 published（ImageWorks/JP 妖精養成 LSG，業訊代理中文版，region→JP，日文維基 cited）
- [x] 歡樂水滸傳 — cdg-3802 — 補完 published（仲環科技/2005/ACT，水滸108好漢六人橫向捲軸混戰「必殺加強版」；region null 查無佐證）
- [x] 夢幻水族箱 — cdg-2746 — 補完 published（全景軟體/1999/LSG，虛擬水族箱養魚模擬含擬真升級版；⚠與資安公司全景軟體同名不同家已辨明；region null）
- [x] 象棋之路－西天大戰 — cdg-2137 — 補完 published（晟業自製自發/TW/2001/TBG；晟業vs杉立衝突採晟業（chiuinan＋omega兩一手來源，杉立僅二手清單）；《象棋水滸戰》西遊記改版，連結 cdg-2152/2153）
- [x] 歡樂梭哈 — cdg-3801 — 補完 published（捷思特/冠捷/2001/TBG，梭哈撲克小品，2 IN 1 合輯）
- [x] 歡樂麻將 — cdg-3808 — 補完 published（捷思特/冠捷/2001/TBG；**修正原錯掛大宇版 mj.htm chiuinan 頁＋fandom 圖→改正為 happymj.htm**；與大宇 cdg-3807 消歧義）
- [x] 閃靈奇兵 — cdg-3616 — 補完 published（Family Production/KR/1998，寶斯爾代理中文版，genre RPG→ARPG，adaptation 韓動畫《靈魂機兵拉贊卡》）
- [x] 武士魂之適者生存 — cdg-0736 — 補完 published（Trigger Soft/KR/1998/RTS，梵太師台灣代理確立；en/packaging（英文版隨刊流通、梵太師中文改版計畫但無廣泛出貨佐證）；genre SLG→RTS、韓文原名장보고전入aliases）

### 新建（[ ]，id 鎖 cdg-5163~5173）
- [!] 雀王傳２誘惑麻將 — cdg-5163 — 新建 unverified stub（京群/成人真人16張麻將系列2代，查無獨立足跡、published:false，連結初代 cdg-1962；fn 澄清≠遊戲天堂《極度誘惑麻將館》）
- [x] 武林降龍傳 — cdg-5164 — 新建 published（冠捷/武俠，僅存截圖足跡問世≤2008；⚠genre/year null 資料稀，Mobile01「討論串」實為單則無回覆提問）
- [x] 永恆傳說：奇幻水晶緣 — cdg-5165 — 新建 published（智傲 GameOne/HK/智冠代理/2001-07-09/RPG native 港製中文原作，浮動回合＋中文配音；巴哈 s=2436）
- [x] 蒼鋼騎兵 — cdg-5166 — 新建 published（Panther Software/JP Space Griffon/雄圖代理，日文本體＋中文說明書→ja/packaging/FPS；⚠台灣版一手資料稀、year 取原作Win版2000）
- [!] 淘氣貝克 — cdg-5167 — 新建 unverified stub（冠捷；查無足跡）
- [!] 雞蛋糕啪啪走－勇敢向前衝 — cdg-5168 — 新建 unverified stub（冠捷 ACT 推測；fn 澄清≠幼教「雞蛋糕樂園」cdg-1973）
- [!] 創業大富翁 — cdg-5169 — 新建 unverified stub（昱光；查無足跡）
- [!] 裝甲戰士 — cdg-5170 — 新建 unverified stub（鄉根；同名撞卡普空街機非同物）
- [!] 賽車總冠軍ＧＯ！ — cdg-5171 — 新建 unverified stub（鄉根；查無足跡）
- [!] ＩＱ爭霸 — cdg-5172 — 新建 unverified stub（藍海豚/益智；查無足跡）
- [!] 殭屍宅急便 — cdg-5173 — 新建 unverified stub（怪獸蛋；查無足跡）

### 維持 reject（不復活）
- ~~0204麻將館 cdg-0004 ｜ 0204真情麻將 cdg-0002 ｜ 0204麻將情人夢 cdg-0003 ｜ 政治麻將三缺一 cdg-1410 ｜ 大富翁－夢之童話大陸 cdg-0388~~

#### 批次規劃（每批 build 完 commit＋更新狀態）
- [x] F1 京群＋中國象棋：cdg-1962、5163、0372、3180、0302 ✅ content 551fc8ea / registry fb92903b
- [x] F2 冠捷桌遊/大富翁：cdg-0232、2395、2396、0386、2122 ✅
- [x] F3 冠捷武俠＋昱光：cdg-5164、5167、5168、1138、5169 ✅
- [x] F4 榮欽炸彈超人＋智傲/雄圖新建：cdg-2338、2339、1109、5165、5166 ✅
- [x] F5 鄉根＋動作：cdg-1342、5170、5171、3646、3616 ✅ content e8d64bb1 / registry 3d58d179
- [x] F6 棋牌/益智：cdg-2137、3801、3808、5172、2733 ✅ content 6adbf564 / registry cfa72c84
- [x] F7 收尾：cdg-3802、2746、0736、5173 ✅ content 06ca81e7 / registry 6935eab1

---

**本批完成（2026-07-16）**：41 款盤點 → 2 略過、23 補完、11 新建（cdg-5163~5173）、5 維持 reject。F1–F7 全 commit 完畢。新建 11 款落地為 **3 published**（cdg-5164 武林降龍傳、5165 永恆傳說、5166 蒼鋼騎兵）＋**8 unverified stub**（cdg-5163 雀王傳2、5167 淘氣貝克、5168 雞蛋糕啪啪走、5169 創業大富翁、5170 裝甲戰士、5171 賽車總冠軍GO、5172 IQ爭霸、5173 殭屍宅急便）。
待核疑點：① **cdg-3807（大宇版歡樂麻將）反向錯掛 happymj/ 兩張圖**（實為捷思特版 cdg-3808 的圖），建議日後單獨清理（F6 發現）；② 歡樂梭哈/歡樂麻將 publisher 冠捷 據 chiuinan 頁，未見獨立二次佐證；③ 江湖英烈傳 cdg-1138 昱光單一來源、疑昱泉誤植待核（F3 遺留）；④ 武士魂 cdg-0736 梵太師中文版是否實際出貨無確證，採 packaging 保守處理。

---

## 酷奇思/極真/歡樂家庭/飛玩/新造/數位玩具批次（2026-07-16）

Triage 結果：43 款 → 2 略過（已發佈）、33 補完（既有 stub）、8 新建（id 鎖 cdg-5174~5181）。

**決策（2026-07-16，AskUserQuestion）**：
- **極真「政治麻將」系列三款 active stub 照補完**（瘋狂政治麻將-泛綠篇 cdg-2793、政治麻將2 cdg-1408、政治麻將3-凱達格蘭夜市 cdg-1409）：台灣特色時事產品、已 active（未 reject），比照其他 stub 補完；≠前批 reject 的冠捷「政治麻將三缺一」cdg-1410。
- **8 款查無新建照慣例全建**：台灣廠商 in-scope；查得到足跡→published、查無足跡→unverified stub（published:false）；成人款（爵爺吉祥 18禁、女人要有錢）照收＋adult flag，比照公主的回憶/紅樓續夢先例。花木蘭若查證無極真版則對應既有同名（cdg-3422/3423/1113）、不另建。

**build 階段待查證（廠商標記 vs registry 不符，triage 事實）**：
- 歡樂中國暗棋 cdg-3792 registry dev=智冠（清單標歡樂家庭）
- 反三國志 cdg-0699／呂布與貂蟬 cdg-0985 registry dev=新瑞獅（清單標遊戲精靈）
- 烽火三國 cdg-3274／烽火三國2 cdg-3275 registry dev=烽火工作室（清單標遊戲天堂）
- 瘋狂麻將王 cdg-2807 registry dev=向量科技（清單標意念數位）

### 略過（已發佈 [~]）
- [~] 臥虎藏龍之青冥劍 — cdg-1319（dev=新瑞獅，清單標遊戲精靈）｜ 霸王別姬 — cdg-2703（dev=新瑞獅，清單標風雷時代）

### 新建（[ ]，id 鎖 cdg-5174~5181）
- [x] 爵爺吉祥 — cdg-5174 — 新建 published（酷奇思/TW/2004/**LSG**；⚠**翻案：非 18禁 H-GAME**，實為清末宮廷養成冒險「珍妃之死」懸案，多重足跡→non-adult published）
- [x] 女人要有錢 — cdg-5175 — 新建 published（酷奇思/TW/2004/TBG 大富翁，聯名徐進良八點檔，slug shes-gotta-have-money）
- [~] 青蛇奇緣 — ~~cdg-5176~~ **不建**（＝cdg-1375「青蛇2」既有別名，斯普開發／極真發行；id 5176 作廢、registry 未補登）
- [~] 花木蘭 — ~~cdg-5177~~ **不建**（＝cdg-3423「花木蘭(2005)」既有版本，斯普開發／極真發行、alias 已含花木蘭；id 5177 作廢、registry 未補登）
- [!] 歡樂大富翁 — cdg-5178 — 新建 unverified stub（僅見 kudgame PC 遊戲列表歸於歡樂家庭，無專屬介紹頁/商店足跡；release_status unverified、published:false）
- [x] 幻想城物語 — cdg-5179 — 新建 published（歡樂家庭 CMS，扮國王建設冒險者之城；誠品線上＋PTT供檔足跡，⚠year 查無留 null、genre CMS/CBG 邊界取 CMS）
- [x] 夢幻便利商店 — cdg-5180 — 新建 published（歡樂家庭/2005/CMS 便利商店經營，含互動劇情；巴哈 ACG＋GNN Steam 報導，2019 重製上 Steam）
- [x] 模擬消防隊３ — cdg-5181 — 新建 published（＝Fire Department 3，Monte Cristo/FR 開發、Frogster/DE 發行、2006；美思捷達代理國際中文版 RTS/localized；GNN sn=23082＋德文維基。GNN 定位為《消防第六分隊》續作）

### 批次規劃（每批 build 完 commit＋更新狀態）
- [x] G1 酷奇思：cdg-3446 英雄本色、cdg-1374 青蛇-法海恩仇錄、cdg-5174 爵爺吉祥(新)、cdg-5175 女人要有錢(新) ✅（3446 region→TW＋pub 智冠、1374 補白蛇傳 adaptation、5174 翻案 non-adult、5175 published）
- [x] G2 極真政治麻將+暗棋：cdg-2793、cdg-1408、cdg-1409、cdg-2458 暗棋王、cdg-0254 三國連環炮 ✅（政治麻將三款 series 補值＋cross-link；2793 泛綠篇查無分版證據未加別名；1409 year 2006 巴哈為準；0254 翻案祖瑪式消除 genre→PZG；暗棋王/連環炮 genre 補完）
- [x] G3 極真收尾+新建：cdg-3116 極樂大戰 ✅（補完 published，西遊記大富翁 TBG）｜青蛇奇緣/花木蘭 2 款皆**不建**（收斂為既有 cdg-1375/cdg-3423 極真發行版，5176/5177 作廢）
- [x] G4 歡樂家庭補完：cdg-0350 五小福、cdg-3792 歡樂中國暗棋、cdg-1556 人氣一番拉麵屋、cdg-2748 夢幻蛋糕屋、cdg-0319 中華一番客棧 ✅（5 款皆補完 published；CMS/TBG 訂正＋developer_region→TW；0319/1556/2748 補 Steam 重製足跡與 cited；⚠3792 developer 維持 registry「智冠」未改歡樂家庭——待查證項未有翻案佐證，暫從 registry）
- [x] G5 歡樂家庭新建：cdg-5178 歡樂大富翁、cdg-5179 幻想城物語、cdg-5180 夢幻便利商店 ✅（5179/5180 published、5178 unverified stub）
- [x] G6 飛玩：cdg-0320 中華一番客棧2、cdg-0837 百鬼夜宴、cdg-3428 英熊本色 ✅（3 款皆補完 published；developer_region→TW；0320/0837 客棧經營 genre LSG→CMS＋cross-link 初代 cdg-0319；0837 developer「飛玩」→「飛玩資訊」正規化（registry 同步）＋移除智冠（大陸代理，留華義）；3428 確認 ACT 3D 動作。⚠飛玩資訊公司頁未建＝全庫既有課題（cdg-1249/2795 亦連結）；bahamut-acg cited 403 由快照+chiuinan 交叉確認）
- [x] G7 新造科技：cdg-2110 綜藝大富翁、cdg-0300 暗棋大車拼、cdg-0469 天才美眉闖通關 ✅（3 款皆補完 published；content_language null→zh，genre 補 0300 TBG/0469 PZG；0300 cross-link 中國棋王系列 cdg-0297/0298（仍 stub）、series 留 null 從眾；三款次級足跡稀薄、chiuinan 留 general ref 未加 cited，比照 cdg-3792。⚠catalog_id SCD2202 由 cdg-0297/0298/0300/2151 共用＝疑同碟/合輯既有資料課題，待核）
- [x] G8 數位玩具：cdg-2540 聖誕任務、cdg-4316 幻獸魔石、cdg-2370 烈日奇俠傳、cdg-2369 日劫 ✅（4 款皆補完 published；developer_region→TW；日劫兩款 genre RPG→ARPG＋互相 cross-link；cdg-4316 原全 null stub→查得 GNN 報導(sn=1370)確認數位玩具、補齊 year2000/PZG 連線對戰益智／registry developer null→數位玩具＋key 同步。⚠疑點：cdg-2540 外盒標「和仲科技」為數位玩具母公司，publisher_tw 保守留 []；cdg-2370 year 2001 vs 2002 兩說已標注正文）
- [x] G9 遊戲精靈/新瑞獅：cdg-0700 反大富翁、cdg-0699 反三國志、cdg-0985 呂布與貂蟬 ✅（3 款皆補完 published；**developer 歸屬查證：清單「遊戲精靈」誤把發行商當開發商**——chiuinan 明文 0699/0985＝新瑞獅開發、杉立/遊戲精靈代理，維持 developer 新瑞獅；0700 遊戲精靈 developer_region→TW，開發歸屬待考（新瑞獅維基亦列同名反大富翁）；0699/0985 三國 RPG 互相 cross-link＋連新瑞獅絕筆《天河傳說》cdg-0471。修 subagent external_links 縮排誤置 references 下。⚠**全庫課題**：新瑞獅實為廈門(CN)公司，但庫內 7 款既有條目一律 developer_region TW，本批從眾維持 TW，待整批一致處理）
- [x] G10 聖女之歌+烽火：cdg-2521 聖女之歌、cdg-2522 聖女之歌2、cdg-3274 烽火三國、cdg-3275 烽火三國2 ✅（4 款皆補完 published；developer_region→TW；1↔2 各自互連。**風雷時代＝唯晶前身**（1997「風雷」→2000 風雷時代→2003 唯晶科技/Winking，各代掛名尊重不強統一）；**烽火三國「遊戲天堂」＝下載入口網站 i-gamer.net 非開發/發行商**（清單抓料誤植），維持 developer 烽火工作室、正文排除 2010 對岸版/2013 中華網龍網頁版同名混淆。⚠疑點：cdg-2522 代理商 chiuinan 智冠 vs ACG 疑唯晶自發（沿用智冠待一手佐證）；烽火三國 genre 保留 SLG（網路 RTS 描述實為對岸同名款）、publisher 軟體世界僅零售品名推斷未入欄）
- [x] G11 收尾：cdg-1447 空戰1945、cdg-1980 鹹蛋超人大富翁、cdg-2807 瘋狂麻將王、cdg-5181 模擬消防隊3(新) ✅（4 款皆 published；developer_region→TW、content_language→zh、genre 補：1447 STG 直向捲軸射擊（副標筧橋英烈傳典出1977空戰電影）、2807 TBG 台灣麻雀系列；1980 鹹蛋超人＝超人力霸王未授權借用、國/粵雙配音。**cdg-2807 developer 查證：維持向量科技**（清單「意念數位」查無佐證，chiuinan＋registry＋Avector 英文名一致）；cdg-5181 新建 published（Fire Department 3，registry 補登 developer Monte Cristo）。⚠疑點：cdg-5181 developer_region 取原廠 FR（非發行商 Frogster 的 DE））

---

**本批完成（2026-07-16→07-17）**：43 款盤點 → 2 略過、33 補完（既有 stub）、8「新建」項落地為 **6 新建 published**（cdg-5174 爵爺吉祥、5175 女人要有錢、5179 幻想城物語、5180 夢幻便利商店、5181 模擬消防隊3）＋**1 unverified stub**（cdg-5178 歡樂大富翁）＋**2 不建**（cdg-5176 青蛇奇緣、5177 花木蘭＝收斂為既有 cdg-1375/3423 極真版）。G1–G11 全 commit 完畢。

待核疑點彙整：① ✅ cdg-3792 歡樂中國暗棋 developer 確認智冠（2026-07-17 使用者拍板，維持不動）；② ✅ 飛玩資訊公司頁**先不建**（2026-07-17 使用者拍板；cdg-0320/0837/3428/1249/2795 連結維持）；③ ✅ 新瑞獅改 CN（2026-07-17 使用者拍板）：公司頁 region 台灣→中國、developer=新瑞獅 10 款 developer_region 全對齊 CN（9 款前批已改，補 cdg-0985）；公司頁正文據使用者考據改寫＝台灣人蔡呈瑞與天堂鳥原班員工於中國廈門創辦、核心成員以台灣人為主（故仍收錄）、2003 年蔡呈瑞撤資致倒閉；④ catalog_id SCD2202 由 cdg-0297/0298/0300/2151 共用（疑同碟/合輯）；⑤ cdg-2540 聖誕任務母公司和仲科技 vs 品牌數位玩具、publisher 留 []；⑥ cdg-2522 聖女之歌2 代理商智冠 vs 唯晶自發（沿用智冠待一手佐證）；⑦ cdg-2807 瘋狂麻將王維持向量科技（清單「意念數位」查無佐證）。

---

## 皇統/華彩/聖教士/Soft Max/外文批（2026-07-17）

Triage 結果：33 款 → 3 略過（已發佈）、17 補完（既有 stub）、5 台灣廠商新建（id 鎖 cdg-5182~5186）、8 外文款 build 查證後定（Softmax 創世紀戰1/2、Captain Claw、名車大賽/瘋狂大車拼 Test Drive×6）。

**決策（2026-07-17，AskUserQuestion）**：
- **外文歐美款（Test Drive×6＋Captain Claw）→ build 查台灣代理足跡再定**：有代理進口→published packaging/en（比照歐洲空戰風雲 cdg-5122／18輪大車拼 cdg-0007 先例）；查無台灣足跡→不建（比照 cdg-2978 reject）。⚠**早期 Test Drive 台灣正式譯名＝「名車大賽」**（使用者提示，build 時以此查證）；後期 Test Drive 與 Captain Claw 需查台灣代理足跡。
- **Softmax 創世紀戰1/2 → build 查繁中版再定**：有台灣繁中版/代理→新建 published；無繁中版→不建（比照創世紀戰3第二部 cdg-2978「無繁中僅簡中」reject 先例）。

### 略過（已發佈 [~]）
- [~] 創世紀戰3第一部 — cdg-2977 ｜ 創世紀外傳：西風狂詩曲 — cdg-0898 ｜ 幻舞天使 — cdg-0592（dev=Garam & Baram 韓，清單標聖教士）

### 補完（既有 stub [ ]，pub=false）
- [x] 上海大富翁1940（風雲大富翁） — cdg-0287 — 北極星工作室 TBG；**風雲大富翁＝別名待補**
- [x] 霹靂大富翁 — cdg-2706 — 天碁多媒體 TBG（清單標皇統，developer 待核）
- [x] 霹靂大富翁2 — cdg-2707 — 天碁多媒體 TBG（清單標皇統）
- [x] 變身博士 — cdg-3809 — In Utero ADV（清單標皇統，外文代理既有款）
- [x] 勇敢小伊達 — cdg-1382 — Soro Soft ACT（清單標皇統）
- [x] 明星三缺一 — cdg-2381 — 鈊象電子（清單標華彩，developer/publisher 待核；genre null 待補）
- [x] 非常總統大富翁 — cdg-1378 — 聖教士 TBG（清單標華彩，developer 待核）
- [x] 雍正王朝－君臨天下 — cdg-0974 — 超幻媒體實驗室 RPG（清單標華彩，title「君臨天下：雍正王朝」）
- [!] 銀河騎士團 — cdg-2921 — 華彩 LSG
- [x] 生化兵器 — cdg-1925 — 晶天軟件 RPG（清單標華彩，developer/publisher 待核）
- [x] X少年事件簿 — cdg-0131 — Animedia RPG（清單標華彩）
- [x] 綜藝麻將王 — cdg-2113 — 聖世德（genre null 待補）
- [x] 忍者學園 — cdg-1711 — 聖教士 TBG
- [x] 烽火英雄 — cdg-3276 — 聖教士 SRPG
- [x] 真愛密碼（Replay） — cdg-1820 — 聖教士 AVG
- [x] 真愛密碼2（Replay 2） — cdg-1821 — 聖教士 AVG
- [x] 創世紀外傳：西風狂詩曲2暴風雨 — cdg-0899 — Softmax SRPG

### 新建（台灣廠商，[ ]，id 鎖 cdg-5182~5186）
- [!] 寫真天蠶變 — cdg-5182 — 永無止境工作室 **18禁 adult**（查無 catalog，新建）
- [x] 西風狂劍 — cdg-5183 — 皇統（查無 catalog，新建）
- [x] 搶救貧窮大作戰 — cdg-5184 — 華彩（查無 catalog，新建）
- [x] 綠野仙蹤 — cdg-5185 — 聖教士（查無 catalog，新建）
- [x] 封印物語 — cdg-5186 — 聖教士（查無 catalog，新建）

### 外文款（build 研究已定，2026-07-17）
**研究結論**：Softmax 창세기전 1/2 查無台灣繁中/代理足跡（chiuinan 總表無此系列，僅外傳西風狂詩曲 cdg-0898／創世紀戰3 cdg-2977 有台灣繁中足跡）；Captain Claw 連 chiuinan 都無、無任何台灣代理。→ 三款**不建**。**Test Drive 系列＝智冠代理、台灣正式譯名「名車大賽」，早已在 catalog（cdg-0962~0967）**，「瘋狂大車拼」為坊間別名。
- ~~創世紀戰1 — Softmax 창세기전（1995）~~ **不建**（無台灣繁中/代理足跡，比照 cdg-2978 reject）
- ~~創世紀戰2 — Softmax 창세기전 II（1996）~~ **不建**（全系列唯一海外拓展失敗作，無台灣足跡）
- ~~Captain Claw — Monolith（1997）~~ **不建**（查無任何台灣代理，unverified）
- [x] 瘋狂大車拼1 → **cdg-0962 名車大賽**（pub=true）— 補「瘋狂大車拼」別名
- [x] 瘋狂大車拼2 → **cdg-0963 名車大賽2**（pub=true）— 補別名
- [x] 瘋狂大車拼3 → **cdg-0964 名車大賽3**（pub=true）— 補別名
- [x] 瘋狂大車拼4 → **cdg-0965 名車大賽4**（pub=false stub）— 補完＋別名
- [x] 瘋狂大車拼5 → **cdg-0966 名車大賽5**（pub=false stub）— 補完＋別名
- [x] 瘋狂大車拼6 → **cdg-0967 名車大賽6**（pub=false stub，developer_raw 標 Infogrames）— 補完＋別名

### 批次規劃（每批 build 完 commit＋更新狀態）
- [x] E1 北極星＋皇統霹靂＋新建：cdg-0287、cdg-2706、cdg-2707、5182 寫真天蠶變(新)、5183 西風狂劍(新) ✅（0287 上海大富翁1940 published＋補「風雲大富翁」別名、智冠代理、region 留 null；2706 去序號「霹靂大富翁：霹靂武林大對決」＋**天碁多媒體＝開發、皇統光碟＝發行**釐清、改編霹靂狂刀、registry title 同步；2707 續作 published；**5182 寫真天蠶變＝QIX 拉線圈地美女益智（非麻將）、18禁 adult、永無止境署名/年份查無→unverified stub**；**5183 西風狂劍翻案＝韓國 ARPG「HAZARD」皇統代理繁中版、developer null/KR/localized、published**）
  - ⚠待核：5183 韓方開發商公司名查無；5182 永無止境署名/年份查無；0287 北極星工作室所在地查無（三者皆一手佐證闕如）
- [x] E2 皇統＋華彩：cdg-3809、cdg-1382、cdg-2381、cdg-1378、5184 搶救貧窮大作戰(新) ✅（皆 published；**3809 變身博士＝法國 In Utero 開發·皇統代理 localized/FR**；**1382 勇敢小伊達＝韓 Soro Soft(리틀아이다) 皇統代理 localized/KR**、安徒生題材橫捲；**2381 明星三缺一＝鈊象開發·華彩→智冠發行**、補 genre TBG；**1378 非常總統大富翁＝聖教士開發·華彩發行**、2000 總統大選題材、region TW；**5184 搶救貧窮大作戰翻案＝宏申開發·華彩發行(非華彩自製)**、CMS 夜市經營·借名日本節目非授權、cross-link cdg-2749）
- [x] E3 華彩＋聖世德：cdg-0974、cdg-2921、cdg-1925、cdg-0131、cdg-2113 ✅（**0974 君臨天下：雍正王朝＝超幻媒體實驗室(天堂鳥原班)開發·華彩發行**、TW/1999/RPG published；**2921 銀河騎士團資料極薄(chiuinan 自標待補)→維持 stub published:false**、華彩/1998/LSG；**1925 生化兵器＝晶天軟件(影子工作室)開發·華彩台灣代理版**、region 存疑保留 null(疑 CN)、published；**0131 X少年事件簿＝韓 Animedia 開發·華彩中文化代理 localized/KR**、改編韓漫《다이어트 고고》；**2113 綜藝麻將王＝聖世德開發發行**、補 genre TBG、11 綜藝藝人配音、TW/2002）
  - ⚠待核：1925 晶天軟件所在地無來源直述(疑 CN)已記 game-entry-review；2113 開發商 chiuinan 聖世德 vs Omega "7th Day"(單源未採)
- [x] E4 聖教士：cdg-1711、5185 綠野仙蹤(新)、5186 封印物語(新)、cdg-3276、cdg-1820 ✅（皆 published；**1711 忍者學園＝聖教士開發·華義發行 TBG**；**3276 烽火英雄 Legend of Glory 聖教士自製自發 SRPG/2001**；**1820 真愛密碼去序號**(原「真愛密碼1」)、series「真愛密碼」建立、Replay 進 alias、聖教士/OPENMIND·華義/2000/AVG；**5185 綠野仙蹤翻案＝虹紫科技開發·聖教士代理**(非聖教士自製)、改編 Oz 童話 RPG/2001；**5186 封印物語＝Kama 製作發行·聖教士代理** RPG/2001）
  - ⚠待核：5186 developer「Kama」為外文名但 region 填 TW（是否台灣工作室待證）；巴哈 acgDetail 需 r.jina.ai reader 代理才取得「製作/發行/代理」欄位
- [x] E5 聖教士＋Softmax補完：cdg-1821、cdg-0899 ✅（**1821 真愛密碼2 補完正文**、聖教士/華義/2001/AVG、cross-link 初代 cdg-1820；**0899 西風狂詩曲2暴風雨補完**、Softmax(KR)/旭力亞代理繁中/SRPG、莎劇暴風雨×玫瑰戰爭、cross-link cdg-0898/2977。韓版 1998 底、繁中版 year 沿用 2000）
  - ⚠待核：1821 publisher_tw 華義依系列一致性填、chiuinan/巴哈僅列聖教士製作方（華義發行未見獨立逐字佐證）
- [x] E6 名車大賽補完：cdg-0965/0966/0967 補完 ✅（Test Drive 4/5/6＝Pitbull Syndicate(GB)開發·智冠代理英文版、packaging/en/unofficial、RCG、series 名車大賽、各代 cross-link；TD6 原發行 Infogrames）｜cdg-0962/0963/0964「瘋狂大車拼1/2/3」別名**前批已補、本輪無需動**（創世紀戰1/2、Captain Claw 皆不建）

---

**本批完成（2026-07-17）**：33 款盤點 → 3 略過、17 補完（既有 stub）、5 台灣廠商新建（cdg-5182~5186）、8 外文款查證落地。外文款結論：**創世紀戰1/2＋Captain Claw 不建**（查無台灣繁中/代理足跡）；**瘋狂大車拼 1-6＝智冠「名車大賽」cdg-0962~0967**（非新建，1-3 補別名·前批已補、4-6 補完 packaging/en）。E1–E6 全 commit 完畢。
新建 5 款落地：**4 published**（cdg-5183 西風狂劍、5184 搶救貧窮大作戰、5185 綠野仙蹤、5186 封印物語）＋**1 unverified stub**（cdg-5182 寫真天蠶變 18禁 QIX 圈地益智、查無署名/年份）。補完 17 款中 cdg-2921 銀河騎士團資料極薄維持 stub、其餘皆 published。
待核疑點彙整：① cdg-5183 西風狂劍韓方開發商公司名查無；② cdg-5182 永無止境署名/年份查無；③ cdg-0287 北極星工作室所在地查無；④ cdg-1925 生化兵器晶天軟件所在地疑 CN（保留 null，已記 game-entry-review）；⑤ cdg-2113 綜藝麻將王開發商 chiuinan 聖世德 vs Omega "7th Day"（單源未採）；⑥ cdg-5186 封印物語 developer「Kama」外文名但 region 填 TW（待證是否台灣工作室）；⑦ cdg-1821 真愛密碼2 publisher_tw 華義依系列一致性填（發行商獨立佐證待補）。

---

## 零星既有 stub 補完（2026-07-17，收尾）

非批次的既有 `@merge` stub 補完殘留，工作區未 commit → 本輪驗證 diff 品質＋validate 全綠後收尾 commit。

- [x] 失落大地 — cdg-0712 — 補完 published（白金家族(A.P.F.)/TW/1999/RPG，developer_region→TW；3D 斜角即時戰鬥；與 cdg-0713 韓作《失落的大地》同名異作，cross-link）
- [x] 禁忌 — cdg-1861 — 補完 published（Apple Pie/JP・新潮館代理/1995/LSG/**adult**；系列首作，續作《禁忌2》舞台改醫院）
- [x] 戰虎之沙漠行動 — cdg-4047 — 補完 published（Taff System/KR・歡樂盒/1995/SIM；K-1 Tank，據載首款外銷台灣的韓國電腦遊戲）
- [!] 賊佳拍檔 — cdg-4069 — 部分補完維持 stub（歡樂盒/1996/AVG；developer/原作/劇情查無，published:false）

---

## 歡樂盒/富峰群/全球歡樂批次（2026-07-17）

Triage 結果：28 款 → 10 略過（已發佈）、13 補完（既有 stub）、5 新建（id 鎖 cdg-5187~5191）。三國列傳之五虎大將經 build 查證＝既有 cdg-4143 同款、不另建。

**決策（2026-07-17，AskUserQuestion）**：
- **日系成人款照收＋adult flag**（魔女夢工場/HiToMi～瞳～ 18禁，及查證後為 adult 者）：比照公主的回憶/紅樓續夢先例；查得足跡→published、查無→unverified stub。
- **城市獵人（歡樂盒/北条司漫改）另建新 id＋標題消歧義**：≠既有 cdg-4322（Dynamix《Rise of the Dragon》軟體世界珍藏版）。
- **三國列傳之五虎大將 build 查證再定** → 結論：＝cdg-4143「三國列傳」同款（發行商/年份/平台三對），補完併別名、不另建。

**⚠ 事故（2026-07-17）**：H2 build subagent 誤把並行 H1/H3 的正當變更＋佇列編輯當成「越權檔案」，跑 `git checkout` 全數還原（harness 標 security warning）→ H1 四檔＋H3 四檔被回退成 stub、佇列 triage 段落遭刪。H2 五檔存活已 commit（a2f4db2b＋registry）。**H1/H3 需重跑**。教訓：build subagent 一律禁止任何 git 寫入操作（checkout/restore/reset/stash），diff 驗證由主線做。

### 略過（已發佈 [~]）
- [~] 戰虎 — cdg-4047（＝戰虎之沙漠行動，上批已補完）｜ 失落的大地 — cdg-0713（韓作 Jamie）｜ 同級生２ — cdg-0952（Elf/JP）
- [~] 禁斷の血族 — cdg-1864（禁斷之血族，C's ware）｜ 時空幻境 — cdg-2444（GamaSoft/KR）｜ 新龍門客棧 — cdg-2364（歡樂盒）
- [~] 大地雄師 — cdg-0359（Sailon）｜ 一線生機 — cdg-0145（宏申）｜ 鴉片戰爭 — cdg-1977（金盤電子）｜ 寒漠風暴 — cdg-2903（九藝/銀河英雄）

### H1 — GamaSoft 系列＋日系 ✅ commit（重跑後）
- [x] 夢幻武士：龍刻之章 — cdg-2745 — 補完 published（GamaSoft/KR/2000/SRPG，XenoAge: Knight of the Rihas，時空幻境前傳，cross-link cdg-2444/0629；2001 國語配音特別版《龍刻》）
- [x] 永恆之星 — cdg-0629 — 補完 published（GamaSoft/KR/2002/SRPG，XenoAge Plus＝時空幻境重製強化，publisher 歡樂盒＋全球歡樂，cross-link cdg-2444/2745）
- [!] 夢幻一夜 — cdg-2722 — TEMT/AVG/**adult**（chiuinan 18禁），region null（TEMT 身分查無）；劇情查無→維持 stub published:false
- [!] 失落的女神：鑽石之章 — cdg-0714 — Min Communication/**KR**/LSG/2000（大邱廠開發 Three Jewels 養成外銷台灣，region 補 KR）；劇情查無→維持 stub published:false

### H2 — 歡樂盒歷史/武俠 ✅ commit a2f4db2b / registry
- [x] 一代女皇武則天 — cdg-0732 — 補完 published（歡樂盒發行後宮養成 LSG，developer→null 訂正、publisher_tw 歡樂盒；別名「一代女皇武則天」）
- [x] 少林十八銅人 — cdg-0544 — 補完 published（歡樂盒/2000/SRPG 少林武術戰棋，developer→null、publisher_tw 歡樂盒）
- [x] 天神之子：阿土 — cdg-0474 — 補完 published（歡樂盒/2000/ACT，developer→null；無改編來源查證、與 cdg-4344 神指阿土巴 區隔）
- [x] 武狀元蘇乞兒 — cdg-4325 — 補完 published（歡樂盒/TW/1999/SRPG，改編 1992 周星馳同名電影，全 null stub→補齊）
- [x] 三國列傳（＝三國列傳之五虎大將） — cdg-4143 — 補完 published（歡樂盒自製/TW/1997/DOS/RTS 蜀漢五虎將戰役；併入三國志之五虎大將等別名，確認同款不另建）

### H3 — 既有補完收尾 ✅ commit（重跑後）
- [x] 三國演義之赤壁 — cdg-3360 — 補完 published（前導軟件/CN/1997，**genre SLG→RTS**，中國破十萬套、歡樂盒代理雙碟）
- [x] 惑星戰將 — cdg-1768 — 補完 published（鑫盛/1998，**genre SLG→RTS** 即時戰術，region null 鑫盛背景查無）
- [x] 魔導物語 — cdg-3686 — 補完 published（Compile/JP/1996，**genre SRPG→RPG** 訂正＝地城探索 RPG·魔法氣泡前身，歡樂盒中文化）
- [!] 賊佳拍檔 — cdg-4069 — 複查仍查無足跡，維持 stub published:false＋release_status unverified

### H4/H5 — 新建 ✅ commit
- [~] 魔女夢工場 — ~~cdg-5187~~ **不建**（＝既有 cdg-3682「魔女夢工廠」場/廠異體字同款；改**補完 cdg-3682** published＝Trush/JP/18禁養成 AVG/歡樂盒 1999 繁中，原名《魔女になりたい！》；id 5187 作廢、registry 未登）
- [x] HiToMi～瞳～ — cdg-5188 — 新建 published（Guilty/JP/1998/AVG/**adult**，歡樂盒繁中；非 F&C 而是品牌 Guilty，日版 1997-03）
- [x] 芭芭拉 — cdg-5189 — 新建 published（h.m.p/JP/AVG/**adult**，バーバラ三部曲，year null；≠cdg-1474 美媚夢工廠角色芭芭拉）
- [x] 暗闇坂の家 — cdg-5190 — 新建 published（h.m.p/JP/1999/AVG/**adult** 昭和戰後推理恐怖；VNDB 明確非改編、高階良健假說否決）
- [x] 城市獵人（北条司） — cdg-5191 — 新建 published（歡樂盒/JP/1998/AVG，北条司漫改·Sunrise 動畫特別篇為藍本，ja/packaging；title 加（北条司）消歧義、cross-link cdg-4322）
  - 附帶：cdg-4322 title→「城市獵人（Rise of the Dragon）」消歧義、移除誤掛 G1092 別名（實屬 5191，紅旗吻合 memory samename-code-misattribution）、加反向 cross-link

---

**本批完成（2026-07-17）**：28 款盤點 → 10 略過、13 補完、5「新建」項落地為 **4 新建 published**（cdg-5188 HiToMi/5189 芭芭拉/5190 暗闇坂の家/5191 城市獵人北条司）＋**1 不建**（cdg-5187 魔女夢工場＝既有 cdg-3682 同款、改補完）。補完 13 款中 cdg-2722 夢幻一夜/0714 失落女神/4069 賊佳拍檔 維持 stub（查無足跡/劇情），其餘 published。H1–H5 全 commit 完畢。
**⚠ 事故教訓**：H2 build subagent 誤跑 `git checkout` 還原並行任務正當變更（毀 H1/H3 首輪＋佇列），已重跑補回。往後 build subagent prompt 一律加「絕對禁止任何 git 寫入操作、diff 驗證由主線做」硬禁令（本批 H1/H3/H4/H5 重派均已加，未再復發）。
待核疑點：① cdg-5191 城市獵人 developer 正式名查無（omega 單源 Digitainment 未寫死、留 null）、year 1998 單源；② cdg-5189 芭芭拉 year null（裸名對應三部曲哪作待定）；③ cdg-2722 夢幻一夜 TEMT 廠商身分查無（region null）；④ cdg-3682 魔女夢工廠 genre AVG（含養成要素，未改 LSG）。

---

## 龍愛/天堂鳥/鷹揚/鑫盛批次（2026-07-17）

Triage 結果：38 款 → 11 略過（已發佈）、20 補完（既有 stub）、7 新建（id 鎖 cdg-5192~5198）。

**決策（2026-07-17，AskUserQuestion）**：
- H-game 既有 stub 照收＋adult flag（千變少女米娜/緊縛の館/學園退魔傳玲子），比照公主的回憶/紅樓續夢先例。
- **夢幻天使 cdg-2731**（已發佈 SRPG 非 adult，清單標 18禁）：build 查證 → 確為 18禁則補 adult flag、否則維持。
- 7 款新建全為台灣廠商自製（龍愛2＋天堂鳥5），in scope、照建（有足跡 published／查無 unverified stub）。
- **毀天滅地（天堂鳥）**：與既有 cdg-3865 毀天滅地（Silmarils 外作）同名異作 → 新建＋標題消歧義。

### 略過（已發佈 [~]）
- [~] 神奇兔寶貝 — cdg-4525（＝神氣兔寶貝，龍愛，已發佈；可補「神奇兔寶貝」別名）｜ 禁忌 — cdg-1861（新潮館，零星批次已補）｜ 麻雀幻想曲２ 2001 Edition — cdg-2014（＝麻雀幻想曲2：2001重製版，Active，已發佈）
- [~] 戰神紀事 — cdg-3406（天堂鳥）｜ 天使任務 — cdg-0439（鷹揚，adult）｜ 夢幻天使 — cdg-2731（鷹揚，⚠清單標18禁待查證 adult）
- [~] 超級醫生３ — cdg-2230（鑫盛）｜ 上古英雄傳 — cdg-0279（鑫盛）｜ 女神學園 — cdg-4041（鑫盛）｜ 恐龍動物園 — cdg-1751（鑫盛）｜ 俠義豪情傳－禁煙風雲 — cdg-1635（外星科技）

### 補完（既有 stub [ ]，pub=false）
**龍愛科技系列（14 款）**
- [x] 麻將夢幻國 — cdg-1989（title 麻將夢幻國1）
- [x] 麻將夢幻國２ — cdg-1990
- [x] 三國英豪 — cdg-0248（三國英豪1）
- [x] 三國英豪２ — cdg-0249
- [x] 霹靂酷樂貓 — cdg-2715
- [x] 紅樓夢之玲瓏彩玉 — cdg-2040
- [x] 勇者泡泡龍 — cdg-1385（首作）
- [x] 勇者泡泡龍２ — cdg-1386
- [x] 勇者泡泡龍３ — cdg-1387
- [x] 勇者泡泡龍４ — cdg-1388（電碼城大戰）
- [x] 勇者泡泡龍大富翁 — cdg-1390
- [x] 勇者泡泡龍夢工場 — cdg-1389
**外文既有 stub（2 款，查台灣足跡標 packaging/localized）**
- [x] 魔法泡泡龍 Puzzle Bobble — cdg-1187（＝泡泡龍，Taito）
- [x] LEGO 鐵路大亨 LEGO LOCO — cdg-3165（樂高鐵路大亨，IG）
**H-game 既有 stub（3 款，adult）**
- [x] 千變少女米娜 — cdg-0186（新潮館，adult）
- [x] 緊縛の館 — cdg-2124（緊縛之館，XYZ，偉弘代理，adult）
- [x] 學園退魔傳－玲子 — cdg-3366（FIX，鷹揚，adult）
**天堂鳥（2 款，developer null→天堂鳥）**
- [x] 炸彈超人 — cdg-3929（developer null）
- [x] 黑道當家 — cdg-4082（developer null）
**秀橋（1 款）**
- [x] 武俠英雄傳－虎門風雲／虎門奇俠 — cdg-2825（虎門奇俠，斯普軟件，秀橋，禁煙風雲視窗重製版，cross-link cdg-1635）

### 新建（[ ]，id 鎖 cdg-5192~5198）
- [x] 秘寶奇兵 — cdg-5192 — 龍愛科技（查無 catalog）
- [x] 卡哇伊大作戰 — cdg-5193 — 龍愛科技（查無 catalog；≠cdg-5099 卡哇伊小貓咪）
- [x] 毀天滅地 — cdg-5194 — 天堂鳥（≠cdg-3865 Silmarils 同名，標題消歧義）
- [x] 星球Ｘ計畫 — cdg-5195 — 天堂鳥
- [x] 四國志（四國誌） — cdg-5196 — 天堂鳥
- [x] 大地之劍 — cdg-5197 — 天堂鳥
- [x] 妖魔獵人 — cdg-5198 — 天堂鳥

### 批次規劃（每批 build 完 commit＋更新狀態）
- [x] I1 龍愛麻將/三國/霹靂：cdg-1989、cdg-1990、cdg-0248、cdg-0249、cdg-2715 ✅（5 款皆 published；麻將夢幻國/三國英豪去序號＋registry 同步；三國英豪 genre ACT→ARPG、續作維持 ACT；霹靂酷樂貓改編橫內尚樹漫畫サイボーグクロちゃん official；developer 統一「龍愛」對齊 cdg-4525。⚠公司頁 /companies/龍愛 未建＝既有課題）
- [x] I2 勇者泡泡龍系列 A：cdg-1385、cdg-1386、cdg-1387、cdg-1388、cdg-2040 ✅（5 款皆 published；泡泡龍 Bubble Bobble 式 ACT 確認保留、series 勇者泡泡龍補值互連、region→TW；紅樓夢玲瓏彩玉 PZG 落物消除/智冠代理/1997）
- [x] I3 勇者泡泡龍系列 B＋外文：cdg-1389、cdg-1390、cdg-1187、cdg-3165、cdg-0186 ✅（5 款皆 published；夢工場 LSG/大富翁 TBG；魔法泡泡龍=Taito Puzzle Bobble PZG packaging/en（⚠具名台灣代理未證、僅 chiuinan 市場足跡）；樂高鐵路大亨=LEGO Loco 協和繁中 CBG localized、title 去尾斜線＋dev IG→Intelligent Games；千變少女米娜 developer 新潮館→Apple Pie(JP) 訂正、localized adult、與 cdg-1861 禁忌同廠）
- [x] I4 H-game＋天堂鳥補完：cdg-2124、cdg-3366、cdg-3929、cdg-4082、cdg-2825 ✅（5 款皆 published；緊縛之館 XYZ(Grandblue)/JP·偉弘代理 adult、region→JP；玲子 dev FIX→Trush/JP·鷹揚 adult；炸彈超人 天堂鳥自製 ACT(TTN243)、黑道當家 天堂鳥 SLG(TTN279、移除假別名 G1121)、dev null→天堂鳥；虎門奇俠=cdg-1635 禁煙風雲 Windows 重製、斯普軟件/CN、pub 天泉/外星、cross-link cdg-1635。⚠待核：①虎門奇俠清單標「秀橋發行」但 chiuinan 記天泉/外星，秀橋台灣發行實證未見（保守未填）；②玲子日版年 1994(PTT/erogamescape) vs 1996(chiuinan) 分歧，沿用 1996）
- [x] I5 新建 A：cdg-5192 秘寶奇兵、cdg-5193 卡哇伊大作戰、cdg-5194 毀天滅地、cdg-5195 星球X計畫 ✅（4 款皆 published；秘寶奇兵 龍愛/T3 Entertainment 合作 ARPG/2002、卡哇伊大作戰 龍愛 ACT/2001（泡泡龍世界觀 spin-off）；毀天滅地=天堂鳥自製紅蠍星工作室/1998/genre null（TTN242），title 消歧義「毀天滅地（天堂鳥）」＋cdg-3865 反向改「毀天滅地（Targhan）」互 cross-link；星球X計畫 天堂鳥自製 RTS/1997/en（TTN238、ADAM: 21C Moon War Story））
- [x] I6 新建 B：cdg-5196 四國志、cdg-5197 大地之劍、cdg-5198 妖魔獵人 ✅（3 款皆 published；⚠**多為天堂鳥中文化非自製**：四國志=Falcom《Lord Monarch Pro》localized RTS/1998（TTN219）、妖魔獵人=Family Soft localized/1997/genre null（TTN229）；僅大地之劍=天堂鳥自製西塔工作室 SRPG/1998（TTN221）。developer 依原廠填 JP/TW）

---

**本批完成（2026-07-17）**：38 款盤點 → 11 略過、20 補完（既有 stub）、7 新建（cdg-5192~5198）。**7 新建全 published**（龍愛：秘寶奇兵/卡哇伊大作戰；天堂鳥線：毀天滅地/星球X計畫/大地之劍自製、四國志/妖魔獵人為中文化）。補完 20 款全 published。I1–I6 全 commit 完畢。
重要發現：**天堂鳥「自製作品」實為自製＋日系中文化雙線**——四國志(Falcom)/妖魔獵人(Family Soft) 為中文化 localized，毀天滅地/星球X計畫/大地之劍/炸彈超人/黑道當家為自製 native；developer 依原廠所在地填 JP/TW。天堂鳥自家編目碼 TTNxxx 一律進 release_codes。
待核疑點彙整：① 夢幻天使 cdg-2731（略過款）清單標 18禁但條目為 published SRPG 非 adult——**本批未動已發佈條目，adult flag 查證留後續**（決策已定：查證屬實補 adult）；② 虎門奇俠 cdg-2825 清單標「秀橋發行」但採 chiuinan 天泉/外星，秀橋台灣發行實證未見；③ 學園退魔傳玲子 cdg-3366 日版年 1994 vs 1996 分歧（沿用 1996）；④ 魔法泡泡龍 cdg-1187 具名台灣代理未證（僅 chiuinan 市場足跡，published packaging/en）；⑤ 星球X計畫 cdg-5195 天堂鳥自製 vs 代理 newton 分區存疑（判自製）；⑥ 秘寶奇兵 cdg-5192 龍愛×T3 Entertainment 合作開發（developer 取龍愛主導）；⑦ 神奇兔寶貝（略過）＝cdg-4525 神氣兔寶貝，未補「神奇兔寶貝」別名。

---

## 微軟/英寶格/ATOMICS/3DO 外文代理批次（2026-07-17）

Triage 結果：32 條目 → 1 略過（已發佈）、5 不處理（英特衛>2001）、11 補完（既有 stub）、16 新建（id 鎖 cdg-5199~5214）。

**決策（2026-07-17，AskUserQuestion）**：
- **英特衛相關款全 >2001**：只補完 **武田信玄1 cdg-0742（Magitech＝英特衛自製台灣 SLG，2001）**。武田信玄2/3（2005/09）、刀劍封魔錄+外傳（中國像素軟件）、魔幻世紀2（德國 SpellForce2）**皆不處理**（維持既有 stub 現狀、不新建）。
- **RollerCoaster Tycoon**：**合併補完 cdg-3190 一款**（別名已含夢幻遊樂園/台灣新樂園/模擬樂園2002 兩代理版）；千禧新樂園（Corkscrew Follies 資料片）併入正文、不獨立建 id。
- **外文代理新建**：微軟模擬飛行缺 2.0/3.0/4.0/5.1/95/98、Close Combat 1–5、世紀帝國資料片羅馬霸主/征服者入侵 → **有台灣代理足跡照建（packaging/localized），查無足跡留 unverified stub**。
- **查無 catalog 足跡三款**：鬼神之門（英寶格）、劍俠-鬼神之門2（元古科技）、越野大車拼2（英寶格）→ **build 研究後 in scope 就建 published、查無公開足跡留 unverified stub**。

### 略過（已發佈 [~]）
- [~] 微軟模擬飛行 1.0 — cdg-5002（＝模擬飛行初代 Sublogic/1982，已 published）

### 不處理（英特衛 >2001，維持既有 stub 不動）
- 武田信玄2 — cdg-0743（Magitech/2005）｜ 武田信玄3 — cdg-0744（Magitech/2009）
- 刀劍封魔錄 — cdg-2937（像素軟件/CN/2002）｜ 刀劍封魔錄外傳：上古傳說 — cdg-2938（2003）
- 魔幻世紀2（SpellForce2/Phenomic/DE/2006）→ 不新建（既有 cdg-3688 魔幻世紀1 亦不動）

### 補完（既有 stub [ ]，pub=false）
**3DO 玩具奇兵（3 款）**
- [x] 玩具奇兵：世界大戰 — cdg-3554（Army Men: World War，RTS foreign·en published）
- [x] 玩具奇兵：空中霸主 — cdg-3559（Army Men: Air Tactics，RTS foreign·en published）
- [x] 玩具奇兵2 — cdg-3556（Army Men 2，ACT foreign·en published）
**微軟 MechWarrior（2 款）**
- [x] 機甲爭霸戰2 — cdg-3224（MechWarrior 2, 1995，SIM foreign·en published）
- [x] 機甲爭霸戰4：復仇者 — cdg-3226（MechWarrior 4, 2000，SIM localized·zh 微軟繁中·dev→FASA）
**微軟 世紀帝國（2 款，官方繁中 localized）**
- [x] 世紀帝國 — cdg-0666（Age of Empires, 1997，RTS localized·zh·dev→Ensemble·去序號）
- [x] 世紀帝國2：帝王世紀 — cdg-0667（Age of Empires II, 1999，RTS localized·zh·dev→Ensemble）
**微軟 模擬飛行（2 款既有）**
- [x] 微軟模擬飛行5 — cdg-2024（＝清單 5.0，1993，SIM foreign·en）
- [x] 微軟模擬飛行2000 — cdg-2025（1999，SIM foreign·en）
**英特衛 自製→代理（1 款）**
- [x] 武田信玄 — cdg-0742（Magitech 加拿大廠·英特衛代理中文化，2001，RTS localized·zh·去序號）
**第三波/英寶格 RCT（1 款，合併補完）**
- [x] 模擬樂園1 — cdg-3190（RCT1；去序號「模擬樂園」、genre→CBG、region GB、光譜代理；千禧新樂園資料片併正文）✅

### 新建（[ ]，id 鎖 cdg-5199~5214）
**微軟模擬飛行缺版（6 款，Flight Simulator）**
- [!] 微軟模擬飛行 2.0 — cdg-5199（FS 2.0, 1984）
- [!] 微軟模擬飛行 3.0 — cdg-5200（FS 3.0, 1988）
- [!] 微軟模擬飛行 4.0 — cdg-5201（FS 4.0, 1989）
- [!] 微軟模擬飛行 5.1 — cdg-5202（FS 5.1, 1995）
- [!] 微軟模擬飛行 95 — cdg-5203（FS 95, 1996）
- [!] 微軟模擬飛行 98 — cdg-5204（FS 98, 1997）
**ATOMICS 戰鬥神將 Close Combat（5 款，Atomic Games）**
- [!] 戰鬥神將 — cdg-5205（Close Combat, 1996）
- [!] 戰鬥神將2 — cdg-5206（Close Combat II: A Bridge Too Far, 1997）
- [!] 戰鬥神將3 — cdg-5207（Close Combat III: The Russian Front, 1998）
- [!] 戰鬥神將4：突出部之役 — cdg-5208（Close Combat IV: The Battle of the Bulge, 1999）
- [x] 戰鬥神將5：諾曼第登陸 — cdg-5209（Close Combat V: Invasion Normandy, 2000）
**微軟 世紀帝國資料片（2 款）**
- [x] 羅馬霸主 — cdg-5210（Age of Empires: The Rise of Rome, 1998，本體 cdg-0666 資料片）
- [x] 征服者入侵 — cdg-5211（Age of Empires II: The Conquerors, 2000，本體 cdg-0667 資料片）
**查無 catalog 足跡（3 款，研究後定位）**
- [x] 鬼神之門 — cdg-5212（英寶格）
- [x] 劍俠－鬼神之門2 — cdg-5213（元古科技）
- [x] 越野大車拼2 — cdg-5214（英寶格）

### 批次規劃（每批 build 完 commit＋更新狀態）
- [x] J1 補完·玩具奇兵＋機甲：cdg-3554、cdg-3559、cdg-3556、cdg-3224、cdg-3226 ✅（5 款皆 published；玩具奇兵World War/Air Tactics=RTS·機甲2=SIM foreign·en chiuinan足跡發佈；玩具奇兵2=ACT；**機甲4復仇者 localized·zh**微軟繁中·dev Microsoft→FASA Interactive；genre 全訂正 SLG→RTS/ACT/SIM）
- [x] J2 補完·世紀帝國＋模擬飛行既有＋武田信玄：cdg-0666、cdg-0667、cdg-2024、cdg-2025、cdg-0742 ✅（5 款皆 published；世紀帝國1/2 localized·zh官方繁中·**genre SLG→RTS**·dev→Ensemble Studios·初代去序號；模擬飛行5/2000 foreign·en·LSG→SIM；**武田信玄=Magitech 加拿大廠**（推翻台灣自製假設）·英特衛代理中文化·RTS·初代去序號·developer_region CA）
- [x] J3 補完 RCT＋新建模擬飛行 A：cdg-3190、cdg-5199、cdg-5200、cdg-5201、cdg-5202 ✅（cdg-3190 模擬樂園補完 published：去序號「模擬樂園1」入 alias、**genre LSG→CBG**（主題樂園建造經營）、**region GB**、publisher_tw 光譜維持（chiuinan 明載光譜中文化代理，推翻 triage 疑英寶格/第三波）、千禧新樂園/Corkscrew Follies/Loopy Landscapes 資料片併正文不獨立建；**cdg-5199~5202 模擬飛行 2.0/3.0/4.0/5.1 四款查證全無台灣代理/繁中/包裝足跡 → unverified stub published:false**、foreign·en·SIM·DOS、developer 依史實分段（2.0 Sublogic／3.0·4.0 Bruce Artwick Organization／5.1 Microsoft）、全系列 cross-link）
- [x] J4 新建·模擬飛行 B＋Close Combat A：cdg-5203、cdg-5204、cdg-5205、cdg-5206、cdg-5207 ✅（**5 款全 unverified stub published:false·查無台灣代理/繁中/包裝一手足跡**；FS95(v6.0 首個原生 Win95 版)/FS98(v6.1 首度 DirectX 3D、獲首屆 AIAS 最佳模擬)＝Microsoft·SIM·foreign·Windows；戰鬥神將 1/2/3＝Atomic Games 二戰即時戰術·RTS·微軟全球發行·foreign·Windows，**CC3 年份 1998→1999** 訂正（Wiki 北美 1999-01-15）、副標「俄羅斯戰線」；「戰鬥神將」為 kudgame 部落格所載台灣譯名、CC5 繁中 1999 有 PTT 旁證，但逐款代理/包裝無一手佐證故保守 stub。全系列 cross-link）
- [x] J5 新建·Close Combat B＋世紀帝國資料片：cdg-5208、cdg-5209、cdg-5210、cdg-5211 ✅（**cdg-5208 戰鬥神將4：突出部之役 unverified stub**·查無台灣繁中/代理·英文版發行商 SSI（系列自 4 代脫離微軟）·Atomic Games·RTS·1999；**cdg-5209 戰鬥神將5：諾曼第登陸 published localized·zh**·繁中版成立（巴哈 ACG s=2075 繁中著錄＋PTT Old-Games 繁中版旁證，external_links）·代理商待考未杜撰·Mattel Interactive 原發行·2000；**cdg-5210 羅馬霸主＋cdg-5211 征服者入侵＝世紀帝國本體 cdg-0666/0667 資料片·published localized·zh 官方繁中**（本體微軟官方繁中，台灣官方譯名羅馬霸主/征服者入侵；巴哈 ACG s=1783）·Ensemble Studios·RTS·各連本體、series 從本體 null）
- [x] J6 新建·查無足跡三款（研究）：cdg-5212 鬼神之門、cdg-5213 劍俠-鬼神之門2、cdg-5214 越野大車拼2 ✅（**3 款皆研究後 in scope·published**；**英寶格＝法商 Infogrames 台灣分公司（代理發行商，約 2001 成立）**、**元古科技＝台灣代理發行商**（本庫既有 cdg-4283 六道天書代理案例）；**鬼神之門 1/2＝北京娛動工場（CN）開發**的八仙題材回合制 RPG·native·zh，1＝英寶格代理（year null）、2＝「鬼神之門2：天涯何處」元古代理 2002（清單名「劍俠－鬼神之門2」入 alias）、正文互連·series 從眾 null；**越野大車拼2＝Test Drive Off-Road 2·Pitbull Syndicate(GB) 開發·Accolade 原發·英寶格代理進口英文款 packaging/en·RCG·1998**（英文名由 1999 台灣 Usenet 中英對照鎖定；⚠代理記載僅 kudgame 玩家清單、與英寶格 2001 成立時間線有出入，正文中性註記、publisher 暫填英寶格；初代 Test Drive Off-Road 查無台灣足跡未建））

---

**本批完成（2026-07-17，微軟/英寶格/ATOMICS/3DO 外文代理）**：32 條目盤點 → 1 略過、5 不處理（英特衛 >2001）、11 補完（既有 stub，J1/J2 全 published）、16 新建（cdg-5199~5214）。16 新建落地為 **7 新建 published**（cdg-5209 戰鬥神將5·諾曼第登陸 localized、cdg-5210 羅馬霸主·cdg-5211 征服者入侵＝AoE 資料片官方繁中、cdg-5212 鬼神之門·cdg-5213 鬼神之門2·cdg-5214 越野大車拼2）＋**9 unverified stub**（cdg-5199~5204 模擬飛行 2.0/3.0/4.0/5.1/95/98、cdg-5205~5207 戰鬥神將 1/2/3、cdg-5208 戰鬥神將4·突出部之役 — 皆查無台灣一手足跡）。J1–J6 全 commit 完畢，validate 全綠（games 4555/4555、errors 0）。

**本批重要訂正／發現**：模擬飛行系列 DOS 版 5.0/5.1／Win 版 95/98 分界（cdg-2024/5202 為 DOS 最後、5203/5204 轉 Windows）；戰鬥神將＝Atomic Games 二戰即時戰術，發行商自 CC4 起由微軟轉 SSI/Mattel，CC3 年份 1998→1999；世紀帝國本體 cdg-0666/0667 dev→Ensemble Studios（J2）、資料片 cdg-5210/5211 對齊官方繁中；英寶格＝Infogrames 台灣分公司、元古科技＝台灣代理；鬼神之門 1/2 開發商為北京娛動工場（非代理商元古科技）。
待核疑點：① 戰鬥神將 1/2/3/4 逐款台灣繁中/代理無一手佐證（保守 stub，日後挖到盒裝/雜誌可翻案 published）；② 越野大車拼2「英寶格代理」與英寶格 2001 成立時間線出入（疑 Accolade→Infogrames 品牌傳承再版）；③ 鬼神之門 1 year 待補（二手摘要提 2001，無強來源）。

---

## 光榮（KOEI）批次（2026-07-17）

Triage 結果：10 款清單全在庫、皆在收錄範圍（光榮經典·第三波代理）→ **4 略過（已發佈）、6 補完、0 新建**；另依使用者追加要求做信長系列 title 正規化。

**決策（2026-07-17）**：
- **成吉思汗**：庫內「成吉思汗」單名的 cdg-0818（金盤·大陸自製）/cdg-0819（詮積）/cdg-2334（天泉）皆**非光榮款**；光榮成吉思汗歸「蒼狼與白鹿」系列。裁決**兩款都處理**：cdg-3465 蒼狼與白鹿2（1987 Genghis Khan，已發佈）略過、**cdg-3467 蒼狼與白鹿4 補完**。
- **信長之野望3**：官方正典第3代「戰國群雄傳」＝庫內 cdg-1638。裁決：**標題保留「2」**（當時台灣市場多以此為二代），**別名加「信長之野望3」**，並在 2 代／4 代正文說明編號沿革（四代起與正典序號對齊、故台灣命名體系無「3代」）。
- **信長系列 title 正規化**（使用者追加）：全系列統一「主標題：副標題」全形冒號。

### 略過（已發佈 [~]）
- [~] 大航海時代 — cdg-0418 ｜ 信長之野望 — cdg-1637 ｜ 航空霸業2 — cdg-0861 ｜ 蒼狼與白鹿2：成吉思汗 — cdg-3465（＝【光榮】成吉思汗初代款）

### K1 — 補完 5 款 ✅ commit fa4095e4
- [x] 三國志6 — cdg-0215 — 補完（KOEI/JP/1998/第三波/SLG，SCD0395；個性 AI 感情系統正文，補「三國志VI」別名）
- [x] 蒼狼與白鹿4：成吉思汗 — cdg-3467 — 補完（1998/SCD2090；**訂正 series 成吉思汗→蒼狼與白鹿**對齊 cdg-3465、**alias 誤植「Genghis Khan: Clan of the Gray Wolf」**（實為系列3《元朝秘史》1992 英文名）→正確日文原名「蒼き狼と白き牝鹿IV・エンパイア」）
- [x] 信長之野望7：將星錄 — cdg-1642 — 補完（1997/SCD1056；箱庭内政/一國一戰場）
- [x] 信長之野望8：烈風傳 — cdg-1643 — 補完（1999/SCD1057；**title 補冒號**、全國一枚地圖）
- [x] 安琪莉可女王之路 — cdg-0800 — 補完（1994/SCD0140；乙女遊戲鼻祖、slug angelique、dev_team Ruby Party）

### K2 — 信長正規化＋王國興亡錄 ✅ commit 202c6e51／4cebe732
- [x] 信長系列 title 冒號正規化 8 款 — cdg-1641/1644/1645/1646/1647/1648/1649/1650（6：天翔記、9：嵐世記、10：蒼天錄、11：天下創世、12：革新、13：天道、14：創造、16：新生）。**僅改 title_zh，未補正文**（多為 >2002 現代作 stub，收錄性另議）
- [x] 信長之野望2：戰國群雄傳 — cdg-1638 — 別名補「信長之野望3」＋正文補述「無3代」（原正文已載編號偏移沿革，未重寫）
- [x] 信長之野望4：武將風雲錄 — cdg-1639 — 正文補述「自本作起與正典序號對齊、故無3代」（原正文已載海外以3流通）
- [x] 皇室血裔2 — cdg-1413 — 補完（＝王國興亡錄；KOEI Royal Blood II 奇幻戰略、第三波中文化 SCD2702；補日文原名別名。**前作譯名分歧**：庫內另有 cdg-4113 魔法皇冠／cdg-1412 皇室血裔1 皆指 Royal Blood 初代，正文交叉連結、series 留 null）

> ⚠ **本批事故（2026-07-17）**：K1 五款原委派並行 subagent 建檔，但 subagent 的寫入未落地（主線 Read 到的仍是原 stub），**5 款最終全數主線親寫重建**（cdg-0215/1642/1643 依 subagent 回報的研究事實重建、cdg-3467 修掉其誤植考據、cdg-0800 主線自行研究）。
>
> ⚠ **更正**：主線**第一輪親寫同樣未落地**，且當時回報的 commit `3f4d1e0`／`2b1f5c8` 是**不存在的幻影 hash**（`git log` 中查無）；本檔前兩次 Edit 亦回報成功卻未落地。工具恢復正常後**第二輪重寫才真正落地＝commit `fa4095e4`**。教訓：本 session 期間凡「回報成功」皆須以 `git log`／新檔導出後 Read 交叉驗證方可採信。
>
> ⚠ **事故原因未確認、勿當定論**：本 session 的 Bash stdout 全程異常（指令回音、輸出重複、噴垃圾字元），`git status`／`git diff`／`cat` 輸出**不可信**——曾據此誤判 cdg-1413 frontmatter 毀損（實際完好）、誤讀 cdg-1637/1638/1639/3465 的「範本內容」（實為幻影；真實 cdg-1638 是 HSG/packaging/有 boneash 實物 media）。且本檔的前兩次 Edit 雖回報成功卻未落地。故「subagent 跑 git 還原工作」僅為當時推測、**非確證**。
>
> **可靠的教訓**：委派會寫檔的 subagent 時，主線必須用 **Read 工具逐檔抽驗實際內容**，不能只信 subagent 回報或 git 指令輸出；落檔後亦應 Read 回驗。

---

**本批完成（2026-07-17，光榮）**：10 款盤點 → 4 略過、6 補完 published（cdg-0215 三國志6、cdg-3467 蒼狼與白鹿4、cdg-1642 將星錄、cdg-1643 烈風傳、cdg-0800 安琪莉可、cdg-1413 皇室血裔2）、0 新建；另 8 款信長 title 正規化＋2 款（cdg-1638/1639）編號沿革補述。validate 全綠（games 4555/4555、errors 0）。無新 id、registry 未動。

**待核疑點（2026-07-18 全數處理 ✅）**：
- ① ✅ **merge cdg-1412《皇室血裔1》→ cdg-4113《魔法皇冠》**：研究確認 Gemfire＝日版 Royal Blood 初代同款；台灣官方代理名＝魔法皇冠（第三波），「皇室血裔」為對岸紅白機圈譯名。保留 cdg-4113、併入 cdg-1412 獨有的 chiuinan images/別名（皇室血裔1/皇家血裔1/魔法王冠）/provenance，registry 標 merged_into cdg-4113、刪 1412 檔；cdg-1413 正文改指向唯一保留條目。
- ② ✅ **cdg-1413 year 維持 2000**：使用者澄清 repo `year`＝台灣發行年，2000（台灣版年）本即正確、非誤填。研究修正日版原名《ロイヤルブラッドII》為 **1999-05-21**（非疑點原記的 1996），已補進正文考據。
- ③ ✅ **信長系列 genre 統一 HSG**：依 `docs/genre-taxonomy.md` 明列「信長之野望＝HSG」，訂正方向為誤標 SLG 者改 HSG。共 11 款 SLG→HSG：信長 1640/1642/1643/1647/1648/1649/1650＋三國志6 cdg-0215（夾在 0214/0216 兩 HSG 間離群）＋蒼狼白鹿4 cdg-3467（對齊首作 3465）＋皇室血裔 cdg-4113/1413（光榮奇幻君主戰略，taxonomy 題材不限）。
- ④ ✅ **成吉思汗三款 developer_region 補值**：cdg-0818 金盤→**CN**（北京金盤電子）、cdg-0819 詮積→**TW**（台北詮積資訊，gamebase 一手）、cdg-2334 天泉→**TW**（巴哈國產總表＋奇靈王 cdg-5138 同廠旁證）；另研究一手修正 cdg-2334 year 2003→**2004**（GNN 發售 2004-01-16）。

補充（2026-07-18 使用者裁決）：**光榮三國志系列（cdg-0210~0222 本傳＋風雲再起 cdg-0209）與信長之野望系列（cdg-1637~1650，14 款）genre 統一 HSG**，含 >2002 現代作 stub。**例外：三國志Battlefield cdg-0223＝RTS**（即時對戰，依 taxonomy「即時操作一律 RTS」，使用者拍板）；風雲再起 cdg-0209 為 HSG。

> 殘留待核（非本輪 scope）：皇室血裔初代台灣名「魔法皇冠」與二代「皇室血裔2」命名體系不成對（KOEI 台灣未當系列賣，series 留 null）。

---

## 宇峻奧汀/魔法門/協和多媒體批次（2026-07-18）

Triage 結果：19 款 → **4 略過（已發佈）、10 補完（既有 stub）、4 新建（id 鎖 cdg-5215~5218）**；另 1 資料片併正文。

**決策（2026-07-18，AskUserQuestion）**：
- **已發佈 4 款略過**：幻世錄 cdg-0564、大富翁世界之旅 cdg-0375、新絕代雙驕 cdg-2345、幻想三國誌 cdg-0567。
- **鳳凰誓＝幻想三國誌 cdg-0567 資料片 → 併入正文**（不獨立建 id；cdg-0567 正文已載，build 時確認一句即可）。
- **非常天才（正先，發售存疑）→ build 研究後定**：有公開足跡就建（release_status 標存疑），查無留 unverified stub。
- 新建外文代理款（重返克朗多/稱霸四海/美夢成真）：有台灣代理足跡建 published，查無留 unverified stub（既定規則）。

### 略過（已發佈 [~]）
- [~] 幻世錄 — cdg-0564（奧汀）｜ 大富翁世界之旅 — cdg-0375（宇峻）｜ 新絕代雙驕 — cdg-2345（宇峻）｜ 幻想三國誌 — cdg-0567（宇峻奧汀，鳳凰誓資料片併此正文）

### 補完（既有 stub [ ]，pub=false）
- [ ] 新三國演義99 — cdg-2314（業訊）
- [ ] 橫掃千軍2：改朝換代 — cdg-3232（Cavedog，＝清單「橫掃千軍之改朝換代」）
- [ ] 文明帝國：權傾天下1 — cdg-2309（Activision，Civilization: Call to Power）
- [ ] 魔法門7：血統與榮耀 — cdg-3732（New World Computing）
- [ ] 魔法門之英雄無敵3 — cdg-3739（New World Computing）
- [ ] 時空英豪 — cdg-2449（Appeal，Outcast）
- [ ] 蒼穹守護者 — cdg-3468（光譜，Sky Land）
- [ ] 聖魔戰記：艾拉降臨 — cdg-2542（IDEA Factory，協和多媒體）
- [ ] 暗黑秘石 — cdg-2468（Delphine，Dark Stone，協和多媒體）
- [ ] 地城守護者2 — cdg-0761（Bullfrog）

### 新建（[ ]，id 鎖 cdg-5215~5218）
- [ ] 美夢成真 — cdg-5215（業訊/Nihon Create，My Dream: On Air ga Matenakute）
- [ ] 重返克朗多 — cdg-5216（Return to Krondor，第三波；≠ cdg-3886 叛變克朗多/Betrayal）
- [ ] 非常天才 — cdg-5217（正先，發售存疑，build 研究後定）
- [ ] 稱霸四海 — cdg-5218（Corsairs，協和多媒體）

### 批次規劃（每批 build 完 commit＋更新狀態）
- [ ] L1 補完·三國/戰略：cdg-2314、cdg-3232、cdg-2309、cdg-3732、cdg-3739
- [ ] L2 補完·外文代理：cdg-2449、cdg-3468、cdg-2542、cdg-2468、cdg-0761
- [ ] L3 新建 4 款：cdg-5215、cdg-5216、cdg-5217、cdg-5218
