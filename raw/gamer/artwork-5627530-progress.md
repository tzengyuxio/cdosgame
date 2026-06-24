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

## 下一批起點

下一次從第 121 個實際遊戲列開始：`明日之星`（鷹揚，1995-03-20）。

## 查證筆記

- 2026-06-23：改用 GitHub raw 讀取 chiuinan 來源頁，比 `chiuinan.github.io` 直接頁面穩定。URL 形如 `https://raw.githubusercontent.com/chiuinan/chiuinan.github.io/master/game/game/intro/ch/.../*.htm`。
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
