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

## 下一批起點

下一次從第 61 個實際遊戲列開始：`三國演義２`（智冠，1996-08-15）。

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
