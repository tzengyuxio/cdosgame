# 交叉比對報告（多來源覆蓋）

各次要來源與主清單 master（chiuinan 骨幹，3834 筆繁中）的重疊狀況。比對方式：opencc t2s 轉簡 + 正規化精確比對（保守，"新" 可能含簡繁/命名差異造成的假新）。狀態：2026-06-14。

## 來源清單與覆蓋

| 來源 | 取得 | 筆數 | 在 master | master 沒有（新候選）| 備註 |
|------|------|---:|---:|---:|------|
| chiuinan | repo clone | 3834 | — | — | 骨幹（總表 + 分類頁）|
| rwv | games.json | 1898 | 429 | ~1400 | 偏對岸簡中；封面 300 |
| omega 數位典藏區 | 37 頁 scrape | 903 | 347 | 556 | 標題含 dev/代理/版本；threadid 參考連結 |
| Fandom cn-dos-games | API allpages | 732 | 485 | 247 | 簡中、帶年份；偏對岸 |
| boneash 骨灰集散地 | 9 類子頁 | 427 | 111 | 316 | 英/中名 + 年代；偏 **1983–1996 早期**段 |
| OfflineList cndosgames | archive.org DAT | 723 | 432 | 291（真缺口 ~183）| 簡中、帶廠商/年代；偏 **1985–1999** 早期段，含光榮等對岸引進 |

## 已整合進 master

- **參考連結**：omega 325、fandom 460（合計 693 筆 master 帶 `references`）。後續可作站台「參考資料」外連。
- 年份：master 已 3832/3834 自帶，故各源年份僅作交叉驗證、未覆寫。

## OfflineList（cndosgames）整合細節（2026-06-15）

`scripts/parse_offlinelist.py` 解析 `raw/offlinelist/` DAT → `derived/offlinelist-games.json`（723 款，欄位：簡中 `name` / 繁中 `name_zh_hant` / `publisher` / `year` / `image_number`）。location/language 代碼全為常數（3/4）無鑑別力，已捨。

**覆蓋分析**（沿用 build_master 的繁→簡正規化精確比對）：
- **432 已在 master**（exact 412 / alt 19 / edition 1）。
- **291 raw-new**，但保守精確比對灌水嚴重，細分：
  - `numbering` 21：系列首作裸名 vs master 帶編號（如 `軒轅劍` ↔ `軒轅劍1`）。
  - `subtitle` 4：OfflineList 帶副標（如 `拂曉攻擊-決戰中國海之役` ↔ master `拂曉攻擊`）。
  - `substr` 83：標題與 master 某筆互為子字串，疑似同款命名詳略差異。
  - **`absent` 183：master 完全無痕跡 = 真缺口**。集中 1992–1998，廠商以智冠(31)/歡樂盒(17)/松崗(13)/天堂鳥(10)/華義(9) 為主，含光榮《蒼狼與白鹿》《項劉記》等對岸引進。
- 真正待併量級 ≈ 183，但 merge_sources 的 fuzzy guard（編輯距離 + base/edition group）會再吸收一批假新。

**已整合（2026-06-15）**：OfflineList 升為一級來源，接進 build_master + merge_sources。
- **provenance 標註**：build_master 對到 **427 款** master 補 `offlinelist@cndosgames`（即「該款資料在 OfflineList 中存在」）；其中 **56 款**接上 OfflineList 截圖。
- **新條目**：merge_sources 信任規則加入 `("offlinelist" in srcs and year)`（比照 boneash）。經跨源去重 + fuzzy guard 後，accept **75 筆**含 offlinelist 的高信心新款（55 fandom+offlinelist 雙源、19 offlinelist 獨有、1 +rwv）→ catalog 3834+191 → **4100**。決策記於 `data/merge-decisions.json`。
- 新款 provenance 用 `offlinelist@merge`（merge 路徑），matched 用 `offlinelist@cndosgames`（build_master 路徑），比照 fandom 既有慣例。
- 圖片：`scripts/fetch_offlinelist_images.py` 下載全 **200 張 PNG（39 MB，101 款）** 到 `raw/offlinelist/img/`（gitignored + manifest），依 `imageNumber` join。

**base-match 人工裁決（2026-06-15）**：`merge_sources` 判為 `base-matches` 的 40 筆 offlinelist 候選，經 `data/offlinelist-basematch-worklist.md` 人工裁決 → `data/basematch-decisions.json`，由 `merge_sources.apply_basematch()` 套用：
- **38 併入既有**（系列首作裸名 = 既有編號款，補 `offlinelist@cndosgames` + 簡名 alias + 截圖；繁名維持既有）。
- **2 新增**（愛之物語2/3，catalog 無對應編號款）。catalog 4100 → **4102**。
- ⚠ 教訓：worklist 的「既有近似款」用 base（去數字）索引，**漏列帶副標的手足**（如「勇者鬥惡龍2：邪惡神官哈根」base 含副標），一度誤判 7 筆為新款而重複；複核後改判併入。**日後 fuzzy 批次的 worklist 需改用 prefix/contains 比對列出副標手足。**

**fuzzy-near-master 人工裁決（2026-06-17，第二批）**：`merge_sources` 判為 `fuzzy-near-master`（編輯距離 ≤2）的 120 筆 offlinelist 候選，經 `data/offlinelist-fuzzy-worklist.md` 人工裁決（已採前述教訓，worklist 用 prefix/contains 列出副標手足、清單截斷 6 筆、`◀` 標猜測指向）→ 決策併入 `data/basematch-decisions.json`：
- **64 併入既有**（含大量「簡/繁」ROM dump 變體如 仙劍奇俠傳 簡/繁、數字變體 三國志II=三國志2、副標標點差 之↔- 等；補 `offlinelist@cndosgames` + 簡名 alias）。
- **40 新增**（早期真缺口，如 俠客遊2、大戰略II、帝國的光榮II、鐵血聯盟[Jagged Alliance]）。
- **第二輪收尾**（`data/offlinelist-fuzzy-round2-worklist.md`）：第一輪 15 筆留 `?` 經複核 → 14 併入（字形/標點差的疑同款，如 暗棋侏羅紀=侏儸紀、美國的噩夢=惡夢、軒轅劍2 簡/繁=cdg-1882）+ 1 新增（永恆之門，≠永恆之星）；第一輪暫列新增的 3 筆（英雄戰記/銀河守衛團/瘋狂麻將）經複核維持新增；`天使們的午後 合集2` 改為收錄（合集，發表閘預設 false，上架時再定）。
- 合計 catalog 4102 → **4144**；basematch 決策 160 筆（append 44 / merge 116）。
- 6 筆 note 帶**既有條目正名提示**（炎龍騎士團II黃金城之謎[秘→謎]、軒轅劍外傳楓之舞、魔法門之英雄無敵：戰略任務、黃飛鴻鐵雞鬥蜈蚣等），未自動套用，記入 BACKLOG。

**命名原則：繁簡並存以繁體為主。** master 為繁中骨幹，已匹配的 432 款 canonical 仍用 master 繁名，OfflineList 簡名僅作 alias/考據。真缺口的新候選輸出已附 `name_zh_hant`（opencc s2tw 字形轉換）作繁體首選名、簡名留 alias；但 s2tw 對遊戲標題偶有字形誤選（如「金樸克」應為撲克、「魔術綵球」應為彩球），故 `name_zh_hant` 為**待覆核草稿**，併入時須人工正名。

## 待決：新遊戲合併 backlog

各源「新」候選合計上千，但**需先過濾與判斷**，不宜直接灌入：
- **簡繁/命名假新**：保守精確比對會把命名差異算成新，需 fuzzy 複核。
- **in-scope 判斷**：omega/fandom 含教育軟體、對岸冷門簡中遊戲、非遊戲條目，要依 `scope.md` 篩。
- **region 標記**：對岸/早期遊戲併入時需補 region（這正是 rwv/fandom/boneash 相對 chiuinan 的互補價值）。
- boneash 補早期段（XT/AT 1983–1996），與 chiuinan 互補性最高。

## 圖片來源結論

- **青衫之友截圖**：⭐ **最強圖源**。repo 內每款 intro 頁附截圖資料夾；對映出 **2241 款 master 遊戲、8556 張**（`derived/chiuinan-screenshots.json`，每筆含 intro URL + 截圖 URL 清單）。每款多為 1–3 張，少數含全攻略（最多 406 張）。尚未下載——待定範圍（代表性 N 張 vs 全部）。
- **rwv 封面**：1300 張已下載（`raw/rwv/img/`，gitignored，manifest 記源）。
- **Fandom 主圖**：717 張已下載（`raw/fandom/img/`，CC-BY-SA）。
- **omega 內頁**：⛔ **不適合補圖**。抽樣 15 篇僅 2 篇有圖（外連 imgur，易失效），產出率 ~13%。omega 是文字討論區，價值在**標題 metadata + 討論連結**（`viewthread.php`），非圖片。

## 未處理來源

- **MobyGames**：⛔ 網站被 **Cloudflare 擋（403）** 無法爬；官方 **API 需 key**（無 key 回 401）。要做必須提供 MobyGames API key，之後可逐款查英文原名/封面/發行資料（免費層有 rate limit）。
- **Instagram @haruo_retrogames**：登入/動態渲染，靜態無法擷取。標為**人工或 web-access skill**，價值在實體照片。
- **vvv.nde.tw**：FB widget + JS 動態載入清單，靜態抓不到；攻略為主。日後用瀏覽器或人工取攻略連結作參考來源。
- **維基〈中文DOS遊戲列表〉**：專頁已不存在；維基改作單款條目參考。

## 修正記錄

- omega 參考連結 `read.php`（已失效 404）→ `viewthread.php`（200 OK）。`derived/omega-threads.json` 與 master 的 `references.omega` 已重建。
