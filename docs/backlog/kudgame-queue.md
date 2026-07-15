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

### D3 — 霹靂/成人補完＋訂正
- [ ] 霹靂英雄榜 — cdg-2713 — 補完（智冠/1999/RPG，SCD0556）
- [ ] 天蠶變 — cdg-3905 — 補完（**中潛科技 Subsino/1993/DOS/adult**；Gals Panic 山寨劃線圈地脫衣遊戲，與黃鷹小說同名無關；**不寫智冠**）
- [ ] 美女梭哈 — cdg-1468 — 補完（智冠/1992/adult 已標，別名 Stud Poker，SWZ011；缺 genre 與正文）
- [ ] 紅樓續夢之京華風雲 — cdg-2041 — 補完（智冠/2003/LSG，SCD0220；**補 adult: true**）
- [ ] 魔術彩球 — cdg-4575 — **欄位訂正**（1990/智冠/PZG 已發佈；僅補 adult: true，別名 X-ROCK／Rockin' Magic Ball）

### D4 — 新建（港漫/武俠）
- [ ] 中華英雄 — cdg-5139 — 新建（亞博克科技/智冠代理/2000/RPG，馬榮成港漫改編；**非**中華網龍《中華英雄 Online》）
- [ ] 三國群俠傳 — cdg-5140 — 新建（**河洛工作室（東方演算）**研發/智冠發行/2002/RPG）
- [ ] 最初幻想 — cdg-5141 — 新建（萬智源/智冠/2002-09-18/RPG；原名 FIRST FANTASY，商標問題改 First Faery）
- [ ] 陸小鳳－金鵬皇朝 — cdg-5142 — 新建（**智傲 Gameone/HK**/智冠代理/2004-10-28/ARPG，developer_region HK）
- [ ] 紅樓夢之十二金釵2001 — cdg-5143 — 新建（**戲寶科技**/智冠/2001-07-17/Windows/adult；cdg-2039 的重製典藏版，賈寶玉養成 AVG、八屬性 12 結局，正文需交叉連結原版）

### D5 — 新建（武俠群英傳）
- [ ] 武俠群英傳 — cdg-5144 — 新建（智冠自研/2005/Windows/RPG，真善美授權、卡牌對戰）
- [ ] 武俠群英傳2 — cdg-5145 — 新建（智冠/2006-01-18/Windows/RPG）
