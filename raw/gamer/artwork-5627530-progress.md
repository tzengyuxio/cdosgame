# 巴哈姆特中文 DOS 遊戲列表處理進度

來源表格：`raw/gamer/artwork-5627530-table.md`  
來源網址：https://home.gamer.com.tw/artwork.php?sn=5627530

## 處理規則

- 以表格中的實際遊戲列為單位，略過分類列與空白分隔列。
- 每次處理 10 筆；若本地已有條目，補足年份、發行公司、來源、發行代碼或正文。
- 無論本地是否已有條目，撰寫或擴寫正文前都必須查外部來源；不可只依表格、既有 metadata 或模型內部知識補內容。
- 若本地無條目，再另行上網查證後新增 `content/games/cdg-*.md` 與 `data/id-registry.json`。
- 若只能查到「待補」級別資料，正文只寫可被來源支持的基本事實，其他內容標為待考或不寫。
- 本表格來源在條目 `provenance` 記為 `gamer@artwork-5627530`。
- 表格中的刪除線軟體世界編號視為「來源對收錄狀態有保留」；若站內軟體世界目錄已列該編號，先保留 release code，並在正文註明待考。

## 已處理

| 序 | 表格名稱 | 條目 | 處理狀態 | 備註 |
| --- | --- | --- | --- | --- |
| 1 | 笑傲江湖 | `content/games/cdg-1876.md` | 已補 | 補精確日期 1993-03-29、來源。 |
| 2 | 射鵰英雄傳 | `content/games/cdg-1707.md` | 已補 | 補精確日期 1993-10-20、來源。 |
| 3 | 倚天屠龍記 | `content/games/cdg-1656.md` | 已補 | 補精確日期 1994-04-20、來源。 |
| 4 | 鹿鼎記之皇城爭霸 | `content/games/cdg-1982.md` | 已補 | 主標題由「鹿鼎記1：皇城爭霸」改為「鹿鼎記之皇城爭霸」；原名保留 alias。 |
| 5 | 神鵰俠侶 | `content/games/cdg-1857.md` | 已補 | 補精確日期 1997-10-19、來源。 |
| 6 | 天龍八部之六脈神劍 | `content/games/cdg-0483.md` | 已補 | 補正文、改編資訊、來源；表格註明為 Windows 版。 |
| 7 | 金庸快打 | `content/games/cdg-2862.md` | 已補 | 補正文、改編資訊、來源；珍316 保留並註明待考。 |
| 8 | 金庸群俠傳 | `content/games/cdg-2865.md` | 已補 | 補精確日期 1996-11-15、來源。 |
| 9 | 絕代雙驕 | `content/games/cdg-2089.md` | 已補 | 補正文、古龍改編資訊、來源。 |
| 10 | 鹿鼎記 | `content/games/cdg-1981.md` | 已補 | 補正文、改編資訊、來源；與智冠《鹿鼎記之皇城爭霸》區分。 |
| 11 | 天龍八部 | `content/games/cdg-0481.md` | 已補 | 查 chiuinan 原始頁；補 3D 斜角、團隊即時戰鬥、速度問題。 |
| 12 | （鹿鼎記２）神龍教 | `content/games/cdg-1984.md` | 已補 | 查 chiuinan 原始頁；修正為改編周星馳電影，補團隊回合制與版本資訊。 |
| 13 | 楚留香傳奇——血海飄香 | `content/games/cdg-3108.md` | 已補 | 查 chiuinan 原始頁與 Fandom；補冒險解謎、滑鼠操作與來源評語。 |
| 14 | 西遊記外傳 | `content/games/cdg-0897.md` | 已補 | 查 chiuinan 原始頁與 9imx；補 2D 團隊回合制，既有 9imx 內容保留。 |
| 15 | 西遊記 | `content/games/cdg-0893.md` | 已補 | 查 chiuinan 原始頁；補 Golden Axe 類型、三主角、7 關與難度條件。 |
| 16 | 西遊記齊天大聖篇 | `content/games/cdg-0896.md` | 已補 | 查 chiuinan 原始頁；來源仍待補，只寫基本操作與環境備註。 |
| 17 | 齊天大聖 | `content/games/cdg-3484.md` | 已補 | 查 chiuinan 原始頁；保留品技/台灣晶技差異待考，補操作資訊。 |
| 18 | 封神演義 | `content/games/cdg-1705.md` | 已補 | 查 chiuinan 原始頁；記錄精訊代理與表格智冠發行差異待考。 |
| 19 | 封神榜 | `content/games/cdg-1703.md` | 已補 | 查 chiuinan 原始頁；補操作、密碼保護與速度備註。 |
| 20 | 隋唐群雄傳 | `content/games/cdg-1367.md` | 已補 | 查 chiuinan 原始頁；既有正文與來源描述一致，補精確日期與來源。 |
| 21 | 隋唐演義 | `content/games/cdg-1365.md` | 已補 | 查 chiuinan 原始頁；來源內容稀少，補精確月份與表格來源。 |
| 22 | 水滸傳之梁山英雄 | `content/games/cdg-0623.md` | 已補 | 查 chiuinan 原始頁；補劇情起點、主要角色與三人隊伍資訊。 |
| 23 | 水滸英雄傳之火之魂 | `content/games/cdg-0626.md` | 已補 | 查 chiuinan 原始頁；表格八爪魚／騰圖與站內騰圖記法差異待考。 |
| 24 | 校園水滸傳 英雄少年 | `content/games/cdg-3090.md` | 已補 | 查 chiuinan 原始頁；補精確日期與表格來源。 |
| 25 | 水滸傳之梁山好漢 | `content/games/cdg-0624.md` | 已補 | 查 chiuinan 原始頁；來源內容稀少，只補 Windows、光碟音樂與相容性備註。 |
| 26 | 聊齋誌異之幽谷傳奇 | `content/games/cdg-1960.md` | 已補 | 查 chiuinan 原始文字檔；補精確日期、故事與戰鬥形式。 |
| 27 | 金瓶梅之偷情寶鑑 | `content/games/cdg-2883.md` | 已補 | 查 chiuinan 原始頁；補精確日期與表格來源。 |
| 28 | 玉蒲團之浪史奇觀 | `content/games/cdg-0745.md` | 已補 | 查 chiuinan 原始文字檔；補精確日期、圖片與來源。 |
| 29 | 俠客英雄傳 | `content/games/cdg-1617.md` | 已補 | 查 chiuinan 原始頁；補精確日期與表格來源。 |
| 30 | 俠客英雄傳３ | `content/games/cdg-1618.md` | 已補 | 查 chiuinan 原始頁；補精確日期與表格來源。 |
| 31 | 武狀元 黃飛鴻 | `content/games/cdg-0741.md` | 已補 | 查 chiuinan 原始文字檔；補正文、日期、來源與珍251待考。 |
| 32 | 黃飛鴻 鐵雞鬥蜈蚣 | `content/games/cdg-2261.md` | 已補 | 查 chiuinan 原始文字檔；補精確日期、玩法概述與來源。 |
| 33 | 萬里長城之邊城奇俠 | `content/games/cdg-3463.md` | 已補 | 查 chiuinan 原始文字檔；補精確日期、玩法限制與來源。 |
| 34 | 麒麟傳說之大禹治水 | `content/games/cdg-3464.md` | 已補 | 查 chiuinan 原始文字檔；以站內主名「萬里長城之麒麟傳說」更新，表格名加入 alias。 |
| 35 | 俠影記 | `content/games/cdg-1628.md` | 已補 | 查 chiuinan 原始頁；補精確日期與表格來源。 |
| 36 | 搖滾少林系列之七俠五義３Ｄ | `content/games/cdg-3926.md` | 已補 | 查銀狐文章與軟體世界目錄；補開發發行、類型、正文與珍297待考。 |
| - | 搖滾少林系列之台灣英雄廖添丁３Ｄ | - | 跳過 | 表格整列刪除並註明未做出來，不視為實際遊戲列。 |
| 37 | 新蜀山劍俠─紫青雙劍錄 | `content/games/cdg-2357.md` | 已補 | 查 chiuinan 原始頁；更新較完整的 canonical 條目，另有 `cdg-4053` 重複條目待合併。 |
| 38 | 人間道之少年燕赤霞 | `content/games/cdg-1558.md` | 已補 | 查 chiuinan 原始頁；補 FPS 類型、語言、版本與更新檔資訊。 |
| 39 | 天外劍聖錄 | `content/games/cdg-0465.md` | 已補 | 查 chiuinan 原始文字檔；表格日期 1993-02-20 與既有 1992 記法差異待考。 |
| 40 | 武林奇俠傳 | `content/games/cdg-0738.md` | 已補 | 查 chiuinan 原始頁；補精確日期與玩法評述。 |
| 41 | 浪淘英雄之決戰皇陵 | `content/games/cdg-1160.md` | 已補 | 站內主名為「決戰皇陵」；查 chiuinan 與智樂堂作品清單，補表格別名、日期與來源。 |
| 42 | 風塵三俠─金箭使者 | `content/games/cdg-1508.md` | 已補 | 查 chiuinan 與智樂堂作品清單；補精確日期、來源與戰鬥／評述。 |
| 43 | 江湖外傳 | `content/games/cdg-1136.md` | 已補 | 查 chiuinan；表格、Fandom 與 chiuinan 均支持 1993，將年份由 1994 改為 1993。 |
| 44 | 武林爭霸之英雄帖 | `content/games/cdg-4056.md` | 已補 | 未找到可用非 chiuinan gameplay 來源；依表格、Fandom、Offlinelist 補最小 metadata。 |
| 45 | 楚漢之爭 | `content/games/cdg-3106.md` | 已補 | 查 chiuinan 與智冠金磁片獎脈絡；補正文、表格名 alias、貴233。 |
| 46 | 楚漢之爭２赤龍反撲 | `content/games/cdg-3107.md` | 已補 | 查 chiuinan；補正文與表格來源，電腦玩家 1992-09 評析仍待實物查證。 |
| 47 | 大明英雄傳 | `content/games/cdg-0398.md` | 已補 | 查 chiuinan；補精確日期、表格名 alias 與珍246待考。 |
| 48 | 奇門遁甲之九五真龍 | `content/games/cdg-1306.md` | 已補 | 查 chiuinan 與智冠金磁片獎脈絡；補版本日期差異與第四屆金磁片獎資訊。 |
| 49 | 劉伯溫傳奇 | `content/games/cdg-2984.md` | 已補 | 查 chiuinan 原始文字檔；補精確日期、正文與來源。 |
| 50 | 春秋爭霸傳 | `content/games/cdg-2440.md` | 已補 | 查 chiuinan 與 PTT Old-Games 系統介紹；補表格來源 provenance。 |
| 51 | 春秋爭霸傳２問鼎天下 | `content/games/cdg-2441.md` | 已補 | 查 chiuinan 與既有 PTT/Newton 脈絡；更新 source-backed canonical，另有 `cdg-4528` 重複條目待合併。 |
| 52 | 蕩寇雄師 | `content/games/cdg-4065.md` | 已補 | 未找到可用 gameplay 來源；依巴哈表格與既有合併來源補最小 metadata。 |
| 53 | 西楚霸王項羽 | `content/games/cdg-0890.md` | 已補 | 查 chiuinan 與既有 omega 來源；補精確日期與表格 provenance。 |
| 54 | 天師鍾馗 | `content/games/cdg-3908.md` | 已補 | 巴哈表格連到 Archive.org 天堂鳥合集；未找到可用 gameplay 來源，僅補最小 metadata。 |
| 55 | 大唐英雄傳 | `content/games/cdg-0353.md` | 已補 | 查 chiuinan 原始頁確認 1997 盤古／仕積版；與 2003 昌哲同名作 `cdg-0354` 分開。 |
| 56 | 花木蘭 | `content/games/cdg-3422.md` | 已補 | 查 chiuinan 與 Archive.org；確認為 1998 盤古／仕積版，與 2005 極真同名作及《巾幗英雄花木蘭》分開。 |
| 57 | 太平天國 | `content/games/cdg-0486.md` | 已補 | 查 chiuinan 與既有 Fandom/RWV；補精確日期與表格 provenance。 |
| 58 | 大宋英豪岳飛傳 | `content/games/cdg-0360.md` | 已補 | 查 chiuinan 與 Archive.org；修正為紅螞蟻製作、智冠發行，補正文。 |
| 59 | 江南才子唐伯虎 | `content/games/cdg-1133.md` | 已補 | 既有正文已充分；補表格來源 provenance，registry 開發者改為太極工作室。 |
| 60 | 三國演義 | `content/games/cdg-0233.md` | 已補 | 既有銀狐與軟體世界來源保留；補巴哈表格 provenance。 |
| 61 | 三國演義２ | `content/games/cdg-0234.md` | 已補 | 查 chiuinan 與維基系列頁；補表格來源 provenance、光碟版型態。 |
| 62 | 吞食天地–三國外傳 | `content/games/cdg-0977.md` | 已補 | 查 chiuinan；補精確日期、表格別名、珍129 與表格來源。 |
| 63 | 吞食天地Ⅱ | `content/games/cdg-0978.md` | 已補 | 查既有 Fandom 與 chiuinan txt 路徑；補精確日期、珍209 與表格來源。 |
| 64 | 風雲天下三國篇 | `content/games/cdg-3855.md` | 已補 | 查 Fandom 與 Archive.org 入口；依表格補至通科技研發、智冠發行、珍317，正文保守處理。 |
| 65 | 龍騰三國 | `content/games/cdg-3833.md` | 已補 | 查 chiuinan 與 Fandom；依表格校正為太極工作室研發、智冠發行，補正文與表格來源。 |
| 66 | 三國英雄傳 | `content/games/cdg-0250.md` | 已補 | 查 chiuinan 與 Fandom；依表格/Fandom 校正為紅螞蟻工作室研發、智冠發行，補正文。 |
| 67 | 三國風雲 | `content/games/cdg-0257.md` | 已補 | 既有正文充分；補表格來源 provenance 與精確日期 1996-12-30。 |
| 68 | 三國志：武將爭霸 | `content/games/cdg-0226.md` | 已補 | 既有正文充分；補表格來源 provenance 與精確日期 1993-07-05。 |
| 69 | 三國志：武將爭霸２ | `content/games/cdg-0227.md` | 已補 | 既有正文充分；補表格來源 provenance 與精確日期 1995-02-20。 |
| 70 | 赤壁之戰 | `content/games/cdg-3359.md` | 已補 | 查 chiuinan 與 Fandom；補正文、表格來源，保留 1994/1995 發行年差異說明。 |
| 71 | 雄霸天下三國篇 | `content/games/cdg-1965.md` | 已補 | 查 chiuinan/Fandom/Omega；補正文、表格來源 provenance、表格名 alias 與精確日期。 |
| 72 | 臥竜伝（臥龍傳） | `content/games/cdg-1320.md` | 已補 | 查 Fandom 與既有 chiuinan；補正文、表格來源與 1995／1995-06 上旬出版預告差異 cite。 |
| 73 | 劉備傳 | `content/games/cdg-3875.md` | 已補 | 既有正文充分；補表格來源 provenance、精確日期 1998-08-15、語言/平台/載體欄位。 |
| 74 | 軒轅劍 | `content/games/cdg-1881.md` | 已補 | 既有正文充分；補表格來源 provenance 與精確日期 1990-10-13。 |
| 75 | 軒轅劍２ | `content/games/cdg-1882.md` | 已補 | 既有正文充分；補表格來源 provenance 與精確日期 1994-02-08。 |
| 76 | 軒轅劍外傳楓之舞 | `content/games/cdg-1883.md` | 已補 | 既有正文充分；補表格來源 provenance、表格名 alias 與精確日期 1995-01-06。 |
| 77 | 仙劍奇俠傳 | `content/games/cdg-1564.md` | 已補 | 既有地標正文充分；補表格來源 provenance 與精確日期 1995-07-07。 |
| 78 | 劍俠情緣 | `content/games/cdg-2986.md` | 已補 | 查 chiuinan、Fandom 與維基系列頁；補正文、表格來源 provenance 與精確日期 1997-04-03。 |
| 79 | 勇者鬥惡龍 | `content/games/cdg-1391.md` | 已補 | 既有正文充分；補表格來源 provenance。 |
| 80 | 勇者鬥惡龍２ | `content/games/cdg-1392.md` | 已補 | 補表格來源 provenance；正文以 cite 標出 1990 與 1991 兩種發行年記法。 |
| 81 | 勇者鬥惡龍３ | `content/games/cdg-1393.md` | 已補 | 既有正文充分；補表格來源 provenance、表格別名與 1993 外流版本說明 cite。 |
| 82 | Sorcerian 魔界歷險 | `content/games/cdg-3758.md` | 已補 | 補正文、表格來源 provenance、珍048 與英文 MS-DOS 版脈絡。 |
| 83 | Dragon Slayer: The Legend Of Heroes 英雄傳說Ⅰ龍的傳人 | `content/games/cdg-3434.md` | 已補 | 補正文、表格來源 provenance、天堂鳥 1996-09-15 發行資訊。 |
| 84 | Dragon Slayer: The Legend Of Heroes II 英雄傳說Ⅱ屠龍戰記 | `content/games/cdg-3435.md` | 已補 | 補正文、表格來源 provenance、天堂鳥 1996-10-15 發行資訊。 |
| 85 | 屠龍戰記 | `content/games/cdg-4540.md` | 已補 | 使用者補充為韓國 Dot & Bit《Darkness／다크니스》，歡樂盒代理預告、ARPG；實際是否出片待查。 |
| 86 | 英雄傳說Ⅲ白髮魔女 | `content/games/cdg-3436.md` | 已補 | 補正文、表格來源 provenance、天堂鳥 1996-12-27 發行資訊。 |
| 87 | 英雄傳說Ⅳ朱紅血 | `content/games/cdg-3437.md` | 已補 | 主標題由「朱紅雪」改為天堂鳥 DOS 版常用「朱紅血」；「朱紅雪／朱紅的淚」保留 alias 與正文差異說明。 |
| 88 | Revival Xanadu 雷諾尼都紀事（迷城的國度） | `content/games/cdg-3873.md` | 已補 | 主標題定為「雷諾尼都紀事」；「迷城國度／迷城的國度」移入 alias，補 Falcom／天堂鳥 metadata、正文與表格來源 provenance。 |
| 89 | Revival Xanadu II Remix 雷諾尼都紀事Ⅱ賞金獵人 | `content/games/cdg-4446.md` | 已補 | 補 Falcom／天堂鳥 metadata、正文與表格來源 provenance；中文 DOS 版資料稀少，正文保守處理。 |
| 90 | Brandish（撼天神塔）復活邪魔 | `content/games/cdg-1796.md` | 已補 | 補正文、表格來源 provenance 與 Brandish 原作脈絡；`cdg-4095` 空 stub 待合併。 |
| 91 | Brandish 2（撼天神塔２）魔界重現 | `content/games/cdg-1797.md` | 已補 | 補正文、表格來源 provenance、改 genre 為 ARPG。 |
| 92 | Brandish 3（撼天神塔３）魔誡 | `content/games/cdg-1798.md` | 已補 | 補正文、表格來源 provenance、改 genre 為 ARPG。 |
| 93 | Brandish VT 撼天神塔VT | `content/games/cdg-1800.md` | 已補 | 以較完整的 `cdg-1800` 為正本，主標題改「撼天神塔VT：犧牲者之塔」；`cdg-4138` 空 stub 待合併。 |
| 94 | 撼天神塔４長眠之塔 | `content/games/cdg-1799.md` | 已補 | 補正文、表格來源 provenance、改 genre 為 ARPG；與 VT 的重製／改題關係記入正文。 |
| 95 | 八女神物語 | `content/games/cdg-0165.md` | 已補 | 既有正文充分；補表格來源 provenance 與精確日期 1994-12-15。 |
| 96 | 八女神物語２ | `content/games/cdg-0166.md` | 已補 | 既有正文可用；補表格來源 provenance 與精確日期 1996-09-15。 |
| 97 | 七英雄物語 | `content/games/cdg-0163.md` | 已補 | 既有正文充分；補表格來源 provenance 與精確日期 1995-01-15。 |
| 98 | 七英雄物語２ | `content/games/cdg-0164.md` | 已補 | 補正文、developer_region/localization 修正、表格來源 provenance 與精確日期 1996-06-10。 |
| 99 | Amaranth III 阿曼尼斯傳說３ | `content/games/cdg-1347.md` | 已補 | 補正文、developer_region、表格來源 provenance 與精確日期 1995-06-10。 |
| 100 | Amaranth KH 阿曼尼斯開國啟示錄：革命 | `content/games/cdg-4075.md` | 已補 | 補 FUGA／幸福鴨 metadata、正文與表格來源 provenance；中文代理版細節稀少，保守處理。 |
| 101 | Amaranth 3D 亞瑪蘭斯 | `content/games/cdg-1346.md` | 已補 | 主標題改「亞瑪蘭斯」、slug 修正；補正文、表格來源 provenance，正文並陳 1998?／1999 兩種年分記法。 |
| 102 | Farland Story 古大陸物語 | `content/games/cdg-0915.md` | 已補 | 既有正文充分；補表格來源 provenance 與精確日期 1995-10-10，registry 主名去初代序號。 |
| 103 | 古大陸物語２雅克王的遠征 | `content/games/cdg-0916.md` | 已補 | 補正文、series、表格來源 provenance 與精確日期 1996-05-01。 |
| 104 | 古大陸物語４銀翼傳承 | `content/games/cdg-0917.md` | 已補 | 補正文、series、表格來源 provenance 與精確日期 1997-07-16。 |
| 105 | 古大陸物語５毀滅天鏡 | `content/games/cdg-0918.md` | 已補 | 補正文、series、表格來源 provenance 與精確日期 1998-06-15；表格「毀滅天鏡」保留 alias。 |
| 106 | 古大陸物語８勇者鬥狂神 | `content/games/cdg-0919.md` | 已補 | 補正文、series、表格來源 provenance 與精確日期 1997-04-15；Windows 版。 |
| 107 | 超時空英雄傳說 | `content/games/cdg-2172.md` | 已補 | 既有正文充分；補表格來源 provenance 與精確日期 1996-04-10。 |
| 108 | 超時空英雄傳說２復仇魔神 | `content/games/cdg-2173.md` | 已補 | 既有正文充分；補表格來源 provenance、publisher 與精確日期 1996-12-20。 |
| 109 | 超時空英雄傳說２外傳北方密使 | `content/games/cdg-2174.md` | 已補 | 既有正文充分；補表格來源 provenance、publisher、alias 與精確日期 1998-02-15。 |
| 110 | 美少女夢工場 | `content/games/cdg-1477.md` | 已補 | 正本為 `cdg-1477`「美少女夢工廠」；year 改採台灣中文版 1992，補表格來源 provenance 與精確日期 1992-09-20。 |
| 111 | 美少女夢工場２ | `content/games/cdg-1478.md` | 已補 | 補正文、series、表格來源 provenance；year 改採台灣中文版 1994，補精確日期 1994-04-02。 |
| 112 | 瘋狂醫院 | `content/games/cdg-2802.md` | 已補 | 依表格改為龍翔製作、精訊發行；補表格來源 provenance 與精確日期 1993-09-20。 |
| 113 | 瘋狂醫院２超級醫生 | `content/games/cdg-2803.md` | 已補 | 既有正文充分；補表格來源 provenance、表格名 alias 與精確日期 1995-01-01。 |
| 114 | 超級醫生３ | `content/games/cdg-2230.md` | 已補 | 補表格來源 provenance 與精確日期 1998-09-28；正文並陳精訊首發與歡樂盒再版。 |
| 115 | 卒業～Graduation～ | `content/games/cdg-0191.md` | 已補 | 既有正文充分；補表格來源 provenance 與台灣版 1995-05 記法。 |
| 116 | 卒業旅行 | `content/games/cdg-0195.md` | 已補 | 補表格來源 provenance；year 改採 1996，正文保守說明台灣中文版發行時間記法。 |
| 117 | 同級生２ | `content/games/cdg-0952.md` | 已補 | 既有正文充分；補表格來源 provenance、表格名 alias 與 1995-12 記法。 |
| 118 | 轉校生 | `content/games/cdg-1896.md` | 已補 | 補表格來源 provenance 與精確日期 1995-10-15；移除未查證傳聞，改與《天使們的午後～轉校生～》自然區分。 |
| 119 | 天使們的午後～轉校生～ | `content/games/cdg-0440.md` | 已補 | 補表格來源 provenance、alias 與精確日期 1995-06-16。 |
| 120 | 明星志願 | `content/games/cdg-2386.md` | 已補 | 既有正文充分；補表格來源 provenance、publisher 與精確日期 1995-03-10；registry 主名去初代序號。 |
| 121 | 明日之星 | `content/games/cdg-2378.md` | 已補 | 既有正文充分；補表格來源 provenance 與精確日期 1995-03-20；registry 主名去初代序號。 |
| 122 | 明日之星２ | `content/games/cdg-2379.md` | 已補 | 既有正文充分；補表格來源 provenance、表格日期 1997-04-15 與正文日期 cite。 |
| 123 | 誕生～Debut～ | `content/games/cdg-3338.md` | 已補 | 既有正文充分；補表格來源 provenance、表格名 alias 與台灣版 1995-07 記法。 |
| 124 | POWER DoLLS 特勤機甲隊 | `content/games/cdg-3502.md` | 已補 | 補表格來源 provenance；year 改採華義中文版 1995，正文標 1995-06-13 與原作 1994。 |
| 125 | POWER DoLLS 2 特勤機甲隊２ | `content/games/cdg-3503.md` | 已補 | 既有正文充分；補表格來源 provenance 與精確日期 1995-12-15。 |
| 126 | POWER DoLLS 2 DASH 特勤機甲隊２資料片 | `content/games/cdg-3504.md` | 已補 | 補表格來源 provenance 與表格名 alias；正文並陳 1996 與 1995-09-10 兩種發行時間記法。 |
| 127 | 聖少女戰隊 | `content/games/cdg-2528.md` | 已補 | 既有正文充分；補表格來源 provenance、表格日期 1994-12、DOS 平台欄位；registry 主名去初代序號。 |
| 128 | 聖少女戰隊Ⅱ | `content/games/cdg-2529.md` | 已補 | 既有正文充分；補表格來源 provenance、表格名 alias、精確日期 1995-07-10 與 DOS 平台欄位。 |
| 129 | 聖少女戰隊Ⅲ | `content/games/cdg-2530.md` | 已補 | 既有正文充分；補表格來源 provenance、表格名 alias、1996-10 記法與 DOS 平台欄位。 |
| 130 | 天使角力賽（摔角天使） | `content/games/cdg-4087.md` | 已補 | 既有正文可用；補表格來源 provenance、精確月份 1993-05 與引用來源。 |
| 131 | 擂台美少女（摔角天使３） | `content/games/cdg-3064.md` | 已補 | 補表格來源 provenance、alias、精確日期 1994-08-09 與 Wrestle Angels 3 原作資訊。 |
| 132 | 灰石傳奇～魔界之泉～ | `content/games/cdg-3755.md` | 已補 | 補正文、developer_region、表格來源 provenance、表格名 alias 與 1995-06 台灣版記法。 |
| 133 | 魔界之泉Ⅱ動亂的魔都 | `content/games/cdg-3756.md` | 已補 | 補正文、developer_region、表格來源 provenance、表格名 alias 與 1996-08 台灣版記法。 |
| 134 | 鋼鐵騎士團 | `content/games/cdg-3593.md` | 已補 | 主標題去初代序號；補正文、developer_region、表格來源 provenance 與 1996-03 台灣版記法。 |
| 135 | 鋼鐵騎士團２ | `content/games/cdg-3594.md` | 已補 | 補正文、developer_region、表格來源 provenance 與精確日期 1996-12-05。 |
| 136 | 龍騎士３ | `content/games/cdg-3831.md` | 已補 | year 改採台灣版 1995；補表格來源 provenance、1CD/DOS 欄位與精確日期 1995-01-20。 |
| 137 | 龍騎士４ | `content/games/cdg-3832.md` | 已補 | 補表格來源 provenance、1CD/DOS 欄位、表格名 alias 與精確日期 1996-04-10。 |
| 138 | 銀河英雄傳說３ＳＰ | `content/games/cdg-2904.md` | 已補 | 主標題改「銀河英雄傳說III SP」；補正文、表格來源 provenance 與精確日期 1994-12-16。 |
| 139 | 銀河英雄傳說４ＥＸ（微波 DOS 版） | `content/games/cdg-2905.md` | 已補 | 補表格來源 provenance、表格名 alias 與精確日期 1995-12-15；registry 主名補 EX。 |
| 140 | 銀河英雄傳說４ＥＸ（大宇 Windows 版） | `content/games/cdg-2906.md` | 已補 | 補表格來源 provenance、表格名 alias 與 1997-09 台灣版記法；registry 主名補 EX。 |
| 141 | 七笑拳 | `content/games/cdg-0161.md` | 已補 | 既有正文充分；補表格來源 provenance 與 1990-07 發行記法。 |
| 142 | 夏日物語 | `content/games/cdg-1701.md` | 已補 | 既有正文充分；補表格來源 provenance 與精確日期 1992-09-20，registry developer 改 KINOKO。 |
| 143 | 真紅的殺意 | `content/games/cdg-1824.md` | 已補 | 既有正文充分；補表格來源 provenance 與 1993-05 發行記法。 |
| 144 | 新七顆龍珠 | `content/games/cdg-4390.md` | 已補 | 依表格與既有 Omega 索引補鴻峻、1994-03、RPG、非正式授權與基本正文；與 `cdg-4031` 關係待查。 |
| 145 | 天地無用 魎皇鬼 | `content/games/cdg-0461.md` | 已補 | 補表格來源 provenance；正文並陳 1994-11-11 與 1996 兩種台灣版發行時間記法。 |
| 146 | 超時空要塞 | `content/games/cdg-2176.md` | 已補 | 查 chiuinan 原始頁；補正文、developer_region、動畫改編、表格來源 provenance 與精確日期 1995-04-20。 |
| 147 | 科學小飛俠 | `content/games/cdg-1430.md` | 已補 | 查 chiuinan 原始頁；genre 由 SRPG 改 AVG，補正文、表格來源 provenance 與精確日期 1995-08-10。 |
| 148 | 3x3 EYES ～三隻眼變成～ | `content/games/cdg-0269.md` | 已補 | 確認為三隻眼第一作；補 developer_region、改編資訊、正文、表格來源 provenance 與 1996-02 記法。 |
| 149 | 蜥蜴超人 | `content/games/cdg-2845.md` | 已補 | 既有正文充分；補表格來源 provenance、chiuinan reference 與 1996-07 發行記法。 |
| 150 | 天使帝國 | `content/games/cdg-0445.md` | 已補 | 既有正文充分；補表格來源 provenance 與精確日期 1993-04-15，registry 主名去初代序號。 |
| 151 | 天使帝國２ | `content/games/cdg-0446.md` | 已補 | 既有正文充分；補表格來源 provenance 與精確日期 1994-09-15。 |
| 152 | 魔法世紀 | `content/games/cdg-3706.md` | 已補 | 既有正文充分；補 chiuinan reference、表格來源 provenance 與 1993-11 記法。 |
| 153 | 魔法世紀２ | `content/games/cdg-3707.md` | 已補 | 既有正文充分；補 chiuinan reference、表格來源 provenance 與精確日期 1994-12-25。 |
| 154 | 炎龍騎士團─邪神的封印 | `content/games/cdg-3264.md` | 已補 | 既有正文充分；補表格來源 provenance 與精確日期 1994-05-20，registry 主名去初代序號。 |
| 155 | 炎龍騎士團２黃金城之謎 | `content/games/cdg-3265.md` | 已補 | 既有正文充分；補表格來源 provenance 與精確日期 1995-07-12，registry「秘」改「謎」。 |
| 156 | 炎龍騎士團外傳─風之紋章 | `content/games/cdg-3266.md` | 已補 | 查 chiuinan 原始頁；year 改採表格 1998，補正文、表格來源 provenance 與精確日期 1998-01-28。 |
| 157 | 台海防衛戰 | `content/games/cdg-0933.md` | 已補 | 既有正文充分；補表格來源 provenance 與 1992-05 記法。 |
| 158 | 銀河艦隊 | `content/games/cdg-2901.md` | 已補 | 查 chiuinan 原始頁；補正文、表格來源 provenance 與 1992-08 記法。 |
| 159 | 飛翔傳說 | `content/games/cdg-1543.md` | 已補 | 既有正文充分；補表格來源 provenance 與精確日期 1993-08-25。 |
| 160 | 亂世伏魔錄 | `content/games/cdg-0325.md` | 已補 | 查 chiuinan 原始頁；補正文、表格來源 provenance 與 1993-03 記法，registry developer 改精訊。 |
| 161 | 性感戰士 | `content/games/cdg-1747.md` | 已補 | 既有正文充分；補表格來源 provenance，正文並陳 1993-10 與 1993-11 兩種發行月份記法。 |
| 162 | 叢林戰爭 | `content/games/cdg-0703.md` | 已補 | 既有正文可用；補表格來源 provenance 與精確日期 1994-03-20。 |
| 163 | 邪神大地 | `content/games/cdg-2593.md` | 已補 | 查 chiuinan 原始頁；補表格來源 provenance、正文與精確日期 1994-08-15。 |
| 164 | 光明戰史 | `content/games/cdg-1676.md` | 已補 | 查 chiuinan 原始文字檔；補正文、表格來源 provenance 與精確日期 1995-03-20。 |
| 165 | 突擊！美少女 | `content/games/cdg-1449.md` | 已補 | 站內主名為「突擊美少女」；查 chiuinan 原始文字檔，補表格題名 alias、正文與來源。 |
| 166 | 米蘭斯紀事之聖域傳奇 | `content/games/cdg-2816.md` | 已補 | 查 chiuinan 原始頁；補正文與表格來源，移除誤掛的軟體世界珍138資訊（該編號屬智冠《聖域傳說》）。 |
| 167 | 創世聖戰 | `content/games/cdg-2979.md` | 已補 | 查 chiuinan 原始頁；補表格來源 provenance、developer_region、正文與精確日期 1996-02-10。 |
| 168 | Psychic War 銀河超能力戰記 | `content/games/cdg-3992.md` | 已補 | 查軟體世界貴族版目錄與 Cosmic Soldier 系列資料；補 Kogado Studio、智冠／軟體世界發行資訊、正文與表格來源。 |
| 169 | 銀河帝國傳 | `content/games/cdg-2895.md` | 已補 | 既有正文充分；補表格來源 provenance 與精確日期 cite。 |
| 170 | 聖域傳說 | `content/games/cdg-2516.md` | 已補 | 既有正文可用；補表格來源 provenance，正文並陳 chiuinan 1991 與表格 1992-02-20 兩種記法。 |
| 171 | 如來金剛拳傳奇 | `content/games/cdg-1078.md` | 已補 | 既有正文可用；補表格來源 provenance、第二屆金磁片獎佳作與 1992-05-20 cite。 |
| 172 | Bible Builder／聖經（中文版） | `content/games/cdg-2539.md` | 已補 | 查 chiuinan 原始頁；主條目保留「聖經啟示錄」，補表格題名 alias、智冠代理、珍256、正文與 1994-01-06 記法。 |
| 173 | 魔眼封印 | `content/games/cdg-4125.md` | 已補 | 依表格、軟體世界珍藏版目錄、Fandom/RWV 圖像來源補 metadata 與最小正文；珍261 在軟體世界目錄中可見。 |
| 174 | 決戰 核爆38°線 | `content/games/cdg-4544.md` | 已補 | 本地未有既存條目，新增最小條目與 registry；目前只據表格可確認名稱、智冠與約 1994，實際上市狀態另待雜誌原件或實物補證。 |
| 175 | 大銀河物語 | `content/games/cdg-0427.md` | 已補 | 查 chiuinan 原始頁；來源內容為待補級別，補表格來源 provenance、精確日期與最小正文。 |
| 176 | 馬場大亨 | `content/games/cdg-3620.md` | 已補 | 既有正文充分；補表格來源 provenance 與 1996-01-10 cite。 |
| 177 | 烈焰鋼狼傳 | `content/games/cdg-3270.md` | 已補 | 查 chiuinan 原始頁；補表格來源 provenance、正文與 1996-02-15 cite，保留珍334。 |
| 178 | 霹靂幽靈箭 | `content/games/cdg-2711.md` | 已補 | 查 chiuinan 原始頁；補霹靂國際合作、布袋戲改編、正文與 1997-07-15 cite。 |
| 179 | 英雄戰記 德亞斯的邪念 | `content/games/cdg-3445.md` | 已補 | 查 chiuinan 原始頁與 Omega 索引；正文並陳富國／大嘉代理發行與表格智冠發行記法。 |
| 180 | 軒轅聖戰錄 | `content/games/cdg-1894.md` | 已補 | 既有正文充分；補表格來源 provenance 與 1997-10-31 cite。 |
| 181 | 大戰略 | `content/games/cdg-0389.md` | 已補 | 初代主標題去序號；查 chiuinan 原始頁，正文並陳 1991 與 1992-04-20 兩種發行時間記法。 |
| 182 | 大戰略Ⅱ | `content/games/cdg-0390.md` | 已補 | 主標題改為「大戰略II：世界戰役篇」，表格名列 alias；正文並陳 1993 與 1994 兩種發行時間記法。 |
| 183 | 大時代的故事 | `content/games/cdg-3849.md` | 已補 | 既有正文充分；補表格來源 provenance 與 1992-10-15 cite。 |
| 184 | 魔宮救美 寶石陣 | `content/games/cdg-4079.md` | 已補 | 依表格、漢堂產品目錄、Fandom/RWV 合併來源補漢堂代理、PZG、GFC023 與最小正文；開發商仍留 null。 |
| 185 | 勇者傳說 | `content/games/cdg-1383.md` | 已補 | 查 chiuinan 原始頁與 Omega；補亞博克 HK、正文、表格來源 provenance 與 1994-03-20 cite。 |
| 186 | 王子傳奇 | `content/games/cdg-0635.md` | 已補 | 既有正文可用；補表格來源 provenance、精確日期與 chiuinan cite。 |
| 187 | 鬼馬小英雄 | `content/games/cdg-3660.md` | 已補 | 既有正文可用；補表格來源 provenance、精確日期與 chiuinan cite。 |
| 188 | 時空異變 | `content/games/cdg-2448.md` | 已補 | 查 chiuinan 原始文字檔；補表格來源 provenance、精確日期，移除正文待考語氣，改中性並陳宏申資訊記法。 |
| 189 | 異域奇兵 諸神的狙殺 | `content/games/cdg-1939.md` | 已補 | 查 chiuinan 原始頁與 Omega 索引；補表格題名 alias、來源與正文，移除正文查無記載語氣。 |
| 190 | 末日寶典 | `content/games/cdg-3070.md` | 已補 | 既有正文充分；補表格來源 provenance、精確日期與 chiuinan cite。 |
| 191 | 魔境大冒險 | `content/games/cdg-3681.md` | 已補 | 查 chiuinan 原始頁；補傑克豆、PZG、正文、表格來源 provenance 與 1995? 記法。 |
| 192 | 小沙彌 | `content/games/cdg-3919.md` | 已補 | 依表格補傑克豆與 1996-10-15，Fandom 圖像來源另標華義；正文並陳兩種來源記法。 |
| 193 | 三界諭─邦沛之謎 | `content/games/cdg-0202.md` | 已補 | 既有正文充分；補表格題名 alias、表格來源 provenance 與 1993-06-23 cite。 |
| 194 | 大野風雲 | `content/games/cdg-0426.md` | 已補 | 查 chiuinan 原始文字檔；補正文、表格來源 provenance，正文並陳 1993 與 1994-01-21 兩種發行時間記法。 |
| 195 | 智聖鮮師 | `content/games/cdg-3932.md` | 已補 | 移除正文「難查證」語氣；補表格來源 provenance、1994-08-20 cite 與第三波目錄 catalog。 |
| 196 | Lunatic Dawn Ⅱ／俠客遊２ | `content/games/cdg-1620.md` | 已補 | 查 chiuinan 原始頁；確認中文名雖似初代但為 Lunatic Dawn 2，補正文與表格來源。 |
| 197 | Silent Hunter／獵殺潛航 | `content/games/cdg-3545.md` | 已補 | 主標題去初代序號；genre 改 SIM，補正文、表格來源 provenance 與 1996-02-29 cite。 |
| 198 | Tomb Raider／古墓奇兵 | `content/games/cdg-0906.md` | 已補 | 更新 1996 初代條目 `cdg-0906`，補表格題名 alias、正文、表格來源與第三波代理資訊。 |
| 199 | 魔空霸傳 | `content/games/cdg-3772.md` | 已補 | 既有正文充分；補表格來源 provenance 與 1997-08 cite。 |
| 200 | 伊甸風暴 | `content/games/cdg-1588.md` | 已補 | 查 chiuinan 原始頁；genre 改 RTS，補正文、表格來源 provenance 與 1998-05-15 cite。 |
| 201 | 飛鷹騎士 | `content/games/cdg-1544.md` | 已補 | 查 chiuinan 原始文字檔；補精訊代理、正文、表格來源 provenance 與 1994-01-20 cite。 |
| 202 | 聖獸傳說 | `content/games/cdg-4039.md` | 已補 | 既有 Omega 正文可用；補表格來源 provenance、1994-08-15 cite，移除正文個人評語。 |
| 203 | 恐龍世紀 | `content/games/cdg-1750.md` | 已補 | 查 chiuinan 原始文字檔；補表格來源 provenance、精確日期與來源 cite。 |
| 204 | 高校魔影 | `content/games/cdg-3637.md` | 已補 | 查 chiuinan 原始文字檔；補表格來源 provenance、1994-12-15 cite，正文略收斂。 |
| 205 | 精靈物語 | `content/games/cdg-2822.md` | 已補 | 查 chiuinan 原始文字檔；補正文、表格來源 provenance 與 1995-07-10 cite。 |
| 206 | 夢幻天使 | `content/games/cdg-2731.md` | 已補 | 查 chiuinan 原始頁；補正文、表格來源 provenance 與 1995-08-10 cite。 |
| 207 | 魔法公主大冒險 | `content/games/cdg-3711.md` | 已補 | 查 chiuinan 原始文字檔；補正文、表格來源 provenance 與 1995-09-24 cite。 |
| 208 | 天使任務 | `content/games/cdg-0439.md` | 已補 | 查 chiuinan 原始文字檔；補成人 RPG 正文、DOS 平台、表格來源與 1996-02-15 cite。 |
| 209 | 終極任務Z | `content/games/cdg-4064.md` | 已補 | 依表格與 Fandom 圖像來源補鷹揚、SRPG、正文與來源；歡樂盒標記保留為差異。 |
| 210 | 上帝 | `content/games/cdg-0281.md` | 已補 | 查 chiuinan 原始頁；補正文、表格來源 provenance 與 1996-09-15 cite，說明歡樂盒 Win95 版。 |
| 211 | 上古英雄傳 | `content/games/cdg-0279.md` | 已補 | 查 chiuinan 原始頁；補 developer_region、表格來源 provenance 與 1997? cite。 |
| 212 | 女神學院 | `content/games/cdg-4041.md` | 已補 | 站內主名為「女神學園」；依表格與 Fandom/RWV 補鑫盛、LSG、正文、表格題名 alias 與 1997-09-15 cite。 |
| 213 | 恐龍動物園 | `content/games/cdg-1751.md` | 已補 | 查 chiuinan 原始頁；補 developer_region、CMS、智冠發行記法、正文與 1998-07-15 cite。 |
| 214 | 大兵日記 | `content/games/cdg-3846.md` | 已補 | 查 Omega 與 Archive；補新藝、LSG、1CD、正文、表格來源與 1994-07-20 cite。 |
| 215 | 絕地 眾神之詛咒 | `content/games/cdg-2094.md` | 已補 | 既有正文充分；補表格來源 provenance、表格題名日期與 chiuinan cite。 |
| 216 | 魔獸大戰略 | `content/games/cdg-3881.md` | 已補 | 既有正文可用；補佳帝安 registry、表格來源 provenance、1993-12-21 cite，移除主觀程式評語。 |
| 217 | 魔武王 | `content/games/cdg-3704.md` | 已補 | 既有正文充分；補表格來源 provenance 與 1994-09-20 cite。 |
| 218 | 郎牙棒與劉星鎚之魔島大冒險 | `content/games/cdg-4545.md` | 已補 | 本地未有既存條目，依表格新增最小條目與 registry；未找到第二來源。 |
| 219 | 狂龍傳 | `content/games/cdg-3526.md` | 已補 | 查 chiuinan 原始文字檔；補正文、表格來源，正文並陳漢堂與佳帝安兩種記法。 |
| 220 | 精靈幻界 | `content/games/cdg-2821.md` | 已補 | 查 chiuinan 原始文字檔；補世紀縱橫台灣發行記法、正文、表格來源與 1995-03-15 cite。 |
| 221 | 中國 | `content/games/cdg-0295.md` | 已補 | 既有正文充分；補表格來源 provenance、精確日期 1995-03-20 與 cite。 |
| 222 | 赤日 | `content/games/cdg-4070.md` | 已補 | 依表格與 Fandom 圖像來源補世紀縱橫、SLG、英文名 Blood Sun、正文與表格來源。 |
| 223 | 聖戰物語 | `content/games/cdg-4147.md` | 已補 | 依表格、Fandom 與 RWV 補吳氏工坊、世紀縱橫、SLG、正文；發行時間保留 1997 與 1996 兩種記法。 |
| 224 | 聖光島 | `content/games/cdg-3898.md` | 已補 | 既有 Omega 正文充分；補表格題名 alias、表格來源與世紀縱橫 1997-09-15 發行記法。 |
| 225 | Psy 幽記 | `content/games/cdg-3841.md` | 已補 | 依表格、Fandom 與 RWV 補華義、RPG、表格題名 alias、正文；發行時間保留 1996 與 1993-01-01 兩種記法。 |
| 226 | 美國的惡夢 | `content/games/cdg-1452.md` | 已補 | 既有 chiuinan 正文可用；補表格來源 provenance 與 1994 cite。 |
| 227 | CRW metal jacket／鎮暴特遣隊 | `content/games/cdg-3930.md` | 已補 | 查 My Abandonware；補 Team Kikai、華義、SLG、英文別名、正文與 1995-11-10 cite。 |
| 228 | 鐵甲旗艦 ATRAGON | `content/games/cdg-4142.md` | 已補 | 依表格與 Fandom 圖像來源補 Movic、華義、RPG、英文別名、正文與 1996-02-10 cite。 |
| 229 | 沉默的艦隊 | `content/games/cdg-1171.md` | 已補 | 主標題去初代序號，保留「沉默的艦隊1」 alias；查 chiuinan 與維基，補模擬類型、改編、正文與 1996-04 cite。 |
| 230 | Schwarzschild EX／鐵鎖的星群 | `content/games/cdg-4074.md` | 已補 | 查 chiuinan；補表格題名 alias、表格來源、劇情概述與華義台灣版 cite。 |

## 下一批起點

下一次從第 231 個實際遊戲列開始：`Q女天使學院`（華義代理，1996-12-20）。

## 查證筆記

- 2026-06-23：改用 GitHub raw 讀取 chiuinan 來源頁，比 `chiuinan.github.io` 直接頁面穩定。URL 形如 `https://raw.githubusercontent.com/chiuinan/chiuinan.github.io/master/game/game/intro/ch/.../*.htm`。
- 第 221–230 筆：`赤日`、`聖戰物語`、`PSY幽記`、`鐵甲旗艦`的公開文字資料很少，本批只寫表格、Fandom 圖像來源與 RWV 可支持的基本資訊；`鎮暴特遣隊`另有 My Abandonware 可支持 Team Kikai、華義與玩法題材。
- `鹿鼎記2：神龍教`：chiuinan 寫明劇情改編自周星馳同名電影，且大量使用電影片段；不要標成小說改編。
- 歡樂盒《鹿鼎記》與《鹿鼎記2：神龍教》雖直接取材周星馳電影，但電影源於金庸《鹿鼎記》。為讓它們出現在 `金庸改編遊戲` 自動列表，`adaptation.medium` 記為 `電影`，`adaptation.author` 仍記為 `金庸`。
- 歡樂盒《絕代雙驕》chiuinan 寫明取材劉德華主演的電影版本，並使用電影人物圖像；`adaptation.medium` 記為 `電影`，`adaptation.author` 記為 `古龍`。
- 專題 `金庸改編遊戲` 以 `adaptation.author: 金庸` 自動收錄，文字已調整為「金庸武俠小說及其衍生影視作品」，不再限定只有直接小說改編。
- `封神演義`（cdg-1705）：chiuinan 記為鼎康 1993、精訊代理；巴哈姆特表格記為鼎康製作、智冠發行。保留差異待考。
- `齊天大聖`（cdg-3484）：chiuinan/registry 記為品技 1994；巴哈姆特表格記為 1995、台灣晶技。保留差異待考。
- 第 1–10 筆回補查證：`天龍八部之六脈神劍`、`金庸快打`、`絕代雙驕`、`鹿鼎記`、`鹿鼎記之皇城爭霸` 均已抓取 chiuinan GitHub raw 頁並校正正文；可用一般 chiuinan URL 記於各條目 `references.chiuinan`。
- `水滸英雄傳：火之魂`（cdg-0626）：巴哈姆特表格記為八爪魚工作室製作、騰圖發行；站內既有 metadata 與 chiuinan 記為騰圖聯合電子。保留差異待考。
- `隋唐演義`（cdg-1365）與 `水滸傳之梁山好漢`（cdg-0624）：chiuinan 來源正文仍標示待補，條目只補可查證的基本資訊，不硬寫玩法細節。
- `金瓶梅之偷情寶鑑`（cdg-2883）與 `玉蒲團之浪史奇觀`（cdg-0745）：chiuinan 來源均確認為成人／情色遊戲；既有 `adult: true` 保留。
- `搖滾少林系列之台灣英雄廖添丁３Ｄ`：巴哈姆特表格整列刪除並註明未做出來，本進度不列為實際遊戲項目。
- `新蜀山劍俠─紫青雙劍錄`：站內 `cdg-2357` 與 `cdg-4053` 疑似重複；本次更新較完整、已有 chiuinan 來源的 `cdg-2357`，`cdg-4053` 待後續合併或移除。
- `天外劍聖錄`：chiuinan 記漢堂 1992 年出品，巴哈姆特表格列 1993-02-20；目前 metadata 年份維持 1992，正文記錄差異待考。
- `搖滾少林之七俠五義`：銀狐文章可支持艾生資訊脈絡、英文名與宣傳爭議；完整玩法仍缺專屬攻略來源，暫不硬寫細節。
- 第 41–50 筆開始，先搜尋非 chiuinan 來源，再用 chiuinan 補 gameplay／版本細節。可用外部來源包含：智樂堂維基頁的漢堂時期作品清單、智冠科技維基頁的金磁片獎段落與《軟體世界》第 56 期來源、PTT Old-Games 的《春秋爭霸傳》系統介紹。
- `武林爭霸之英雄帖`（cdg-4056）：未找到可用 gameplay 來源；只依巴哈表格、Fandom 與 Offlinelist 補最小 metadata，正文明確註記待補。
- `江湖外傳`（cdg-1136）：既有條目 year 為 1994，但巴哈表格、Fandom 與 chiuinan 均指向 1993，本次改為 1993。
- `楚漢之爭`（cdg-3106）：站內主名仍為 `楚漢之爭1`；表格與一般初代名稱為 `楚漢之爭`，本次加入 alias 並在正文說明。
- `春秋爭霸傳2問鼎天下`：站內 `cdg-2441` 與 `cdg-4528` 疑似重複；本次更新已有 chiuinan、Offlinelist 與 catalog id 的 `cdg-2441`，`cdg-4528` 待後續合併。
- `大唐英雄傳`：`cdg-0353` 為 1997 盤古軟件／仕積資訊版；`cdg-0354` 為 2003 昌哲科技版，雖同名但不可合併。
- `花木蘭`：`cdg-3422` 為 1998 盤古軟件／仕積資訊版；`cdg-3423` 為 2005 極真科技同名作；`cdg-1113` 則是新資訊科技《巾幗英雄花木蘭》。
- `蕩寇雄師`、`天師鍾馗`：本批未找到可用非 chiuinan gameplay 資料，僅依巴哈表格與既有資料庫來源補最小 metadata，不硬寫玩法。
- `風雲天下三國篇`：巴哈表格記為至通科技研發、智冠發行；Fandom 記為智冠開發/發行且類型為動作。本站本次依表格補至通科技與智冠分工，正文中性並陳來源差異。
- `龍騰三國`：巴哈表格記為太極工作室研發、智冠發行；既有 registry/frontmatter 原記智冠。本站本次依表格補太極工作室與智冠分工；「太極工作室」歸屬仍見 `docs/backlog/game-entry-review.md` 既有待考項。
- `三國英雄傳`：巴哈表格與 Fandom 均支持紅螞蟻工作室研發、智冠發行；chiuinan 僅記智冠出品。本次改 developer 為紅螞蟻工作室、publisher_tw 為智冠。
- `赤壁之戰`：chiuinan/Fandom 與既有資料庫採 1994，巴哈表格採 1995-01-01。本次 metadata 維持 1994，正文記錄發行年差異。
- `臥龍傳`：Fandom/既有 metadata 採 1995；巴哈表格註記《軟體世界》1995 年 5 月號寫 6 月上旬出版。本次 metadata 維持 1995，正文以 cite 並陳。
- `勇者鬥惡龍2`：正本為 `cdg-1392`（標題含「邪惡神官哈根」）；`data/id-registry.json` 另有 `cdg-4103` active entry 但無 content 檔，疑為重複或孤兒 registry 記錄，待後續清理。
- 第 85 筆「屠龍戰記」：使用者後續更正，並非《英雄傳說2：屠龍戰記》，而是韓國 Dot & Bit《Darkness／다크니스》的台灣代理預告名稱，歡樂盒代理、動作角色扮演。台灣發售狀態依雜誌線索仍待查。
- `英雄傳說4：朱紅血`：既有條目原主名「朱紅雪」，巴哈表格與天堂鳥 DOS 版脈絡採「朱紅血」；本次主名改「朱紅血」，「朱紅雪／朱紅的淚」保留 alias。
- `Brandish`：`cdg-1796` 為正本；`cdg-4095`「復活邪魔」為同款空 stub，待後續 merge。
- `Brandish VT`：`cdg-1800` 有 chiuinan 圖與 catalog，作正本；`cdg-4138`「撼天神塔VT」為空 stub，待後續 merge。
- `Amaranth KH`：表格記幸福鴨代理、1996-08-15；既有 `cdg-4075` 僅有 Fandom merge，中文代理版劇情／系統細節仍待補。
- `Amaranth 3D／亞瑪蘭斯`：既有 chiuinan/metadata 記 1999，巴哈表格記 1998?；metadata 暫維持 1999，正文並陳。
- `美少女夢工場`：本批表格列的是精訊代理初代；正本為 `cdg-1477`「美少女夢工廠」。`cdg-1476` 目前主名也是「美少女夢工場」但實為 Princess Maker Q 空 stub，後續可另案正名。
- `瘋狂醫院`：巴哈表格記「龍翔製作、精訊發行」，既有條目原記精訊開發。本次採表格製作／發行分工；龍翔實體與精訊關係待補佐證。
- `轉校生`：既有正文含天堂鳥代理權轉移傳聞，缺可引用來源，本次移除正文傳聞並記 backlog。
- `新七顆龍珠`：本批依表格補 `cdg-4390`；站內另有 `cdg-4031`「七顆龍珠」空 stub，且 Fandom 圖像來源題名為 New 7 Dragon Balls／七顆龍珠，兩者是否應合併仍待實物或實機標題比對。
- `3x3 EYES ～三隻眼變成～`：表格第 148 筆對應 `cdg-0269` 第一作；`cdg-0270` 為吸精公主、`cdg-0271` 為轉輪王幻夢，`cdg-3839`「3x3隻眼」疑為空的合併來源 stub。
- `突擊！美少女`：表格題名含驚嘆號，但站內與 chiuinan 均作「突擊美少女」；本次保留站內主名，將表格題名列入 alias。
- `米蘭斯紀事：聖域傳奇`：既有條目誤承接軟體世界珍138與 `softworld@boneash-scan`，但珍138屬智冠《聖域傳說》（cdg-2516）。本次移除該錯誤 release code，兩款以正文 cross-link 區分。
- `銀河超能力戰記`：表格記智冠代理，軟體世界目錄記貴族版175；目前條目正文中性並陳兩種台灣發行記錄，`license_status` 暫改 null，避免把智冠代理記錄一併標成 unofficial。
- `小沙彌`：巴哈表格列傑克豆、1996-10-15；Fandom 圖像來源檔名／來源 URL 標示 HWAEI 華義、RPG。metadata 暫採表格傑克豆，正文與 cite 保留華義標記差異。
- `大野風雲`：chiuinan 記第三波 1993，巴哈表格記 1994-01-21；metadata 採表格年份 1994，正文並陳差異。
- `Lunatic Dawn Ⅱ／俠客遊２`：chiuinan 記原作 1994、第三波 1996 中文化代理；巴哈表格列 1994。條目 year 保留原作年份，正文補第三波中文化時間。
- `Tomb Raider／古墓奇兵`：本批對應 1996 初代 `cdg-0906`；`cdg-0905` 是 2013 重啟作，不應合併或改動。
- `終極任務Z`：巴哈表格列鷹揚、1996-03-10；Fandom 圖像來源標 GameBox 歡樂盒、SRPG。metadata 暫採鷹揚開發／出品，正文與 cite 保留歡樂盒標記差異。
- `上帝`：chiuinan 記鷹揚 1996 DOS 原版，2000 年歡樂盒 Win95 版內容與 DOS 版相同；巴哈表格列鷹揚、1996-09-15。本次正文並陳原版與歡樂盒版。
- `女神學院`：站內正本 `cdg-4041` 主名為「女神學園」，巴哈表格列「女神學院」與鑫盛，Fandom 圖像來源標歡樂盒、SIM；本次 metadata 採鑫盛製作，歡樂盒保留為來源差異。
- `恐龍動物園`：chiuinan 記鑫盛 1997 開發、1998 鷹揚代理；巴哈表格列鑫盛製作、智冠發行、1998-07-15。正文並陳兩種發行記法，metadata publisher_tw 暫列鷹揚與智冠。
- `郎牙棒與劉星鎚之魔島大冒險`：未找到本地條目、Fandom/RWV/Offlinelist/chiuinan/Omega 或一般網頁命中；本次只依巴哈表格新增最小條目 `cdg-4545`。不可拆成《魔島大冒險》。
- `狂龍傳`：chiuinan 與既有 metadata 記漢堂 1996；巴哈表格列佳帝安、1996-04-10。metadata 暫維持漢堂，正文以 cite 並陳。
- `精靈幻界`：chiuinan 記 YOKI 1995，巴哈表格列世紀縱橫、1995-03-15。本次保留 YOKI developer，補世紀縱橫為台灣發行記法。
