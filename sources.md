# sources.md — 種子來源清單與可信度分級

> 策略：**先收料，再從收到的資料反推 schema**（collect-first，schema-on-read）。
> 本檔盤點每個來源：收什麼、可信度、可機器擷取程度、授權註記。
> 狀態：草稿（2026-06-13）。

## 分級定義

**可信度（credibility）**
- ★★★ 官方／權威：廠商官方、學術、維基（多人校對 + 引用）
- ★★ 社群協作：論壇典藏區、巴哈姆特考據文、Fandom wiki
- ★ 個人站／社群媒體：個人整理、IG/部落格（需交叉查證）

**可擷取性（scrapability）**
- 🟢 易：靜態 HTML / JSON / 有 API，可程式批次抓
- 🟡 中：需翻頁／逐主題抓，或編碼處理
- 🔴 難：需登入／動態渲染／反爬，多半人工或半自動

## 主要來源（你列的 7 個）

### 1. 青衫之友 — chiuinan.github.io/game ★★ 🟢
- **收什麼**：分類遊戲清單 + 基本資料，表格式。
- **結構**：純靜態 HTML（frameset）。內容頁在 `game/game/` 下：`cgame*.htm`（中文遊戲，依類型分頁）、`egame*.htm`、`list-1.htm`、`intro/`、`qa/`。
- **取法**：站源就是 GitHub repo `chiuinan/chiuinan.github.io`（`/game` 路徑）——**直接 clone 全量取得**，免逐頁爬。注意可能是 Big5 編碼。
- **價值**：清單 + 基本資料的高 CP 起點。

### 2. vvv.nde.tw/pcgame.php — 老遊戲攻略站 ★ 🟡
- **收什麼**：大量遊戲攻略。可當「遊戲清單」來源；攻略頁日後可作為本站每筆資料的「參考連結」。
- **坑**：**只有 http、且 HTTPS 憑證已過期**。WebFetch 會自動升級 HTTPS 而失敗，需用 `curl http://…`（或忽略憑證）抓。
- **價值**：清單 + 外部參考連結。

### 3. omega.idv.tw 數位典藏區（forumid=68）★★ 🟡
- **收什麼**：**每個主題 ≈ 一款遊戲**，含介紹與資料。
- **結構**：表格式主題列表（狀態｜主題｜作者｜人氣｜回覆…），`threadid` 參數，**約 37 頁**可系統遍歷。
- **取法**：先爬主題列表得清單，再逐 `threadid` 抓內文／圖。
- **價值**：清單 + 較深入的單款資料與圖片。

### 4. Instagram @haruo_retrogames ★ 🔴
- **收什麼**：貼文常介紹單款遊戲 + 提供遊戲照片。
- **坑**：IG 需登入／動態渲染，最難自動化（用 `web-access` skill 或人工存圖）。
- **價值**：介紹文字 + 高品質實體照片（封面/盒裝/說明書）。

### 5. cn-dos-games.fandom.com/zh ★★ 🟢
- **收什麼**：條目化 wiki，含 infobox（廠商/年代/類型等欄位）——**可參考它的欄位定義**來反推我們的 schema。
- **取法**：Fandom = MediaWiki，可走 API（`api.php`）批次取結構化資料。
- **授權**：Fandom 內容通常 CC-BY-SA，**再用需署名 + 同授權**，注意合規。

### 6. github.com/rwv/chinese-dos-games ★★ 🟢（資料）／⚠ 授權
- **收什麼**：`games.json` 已含 `zh-Hant` 名稱欄位，10k★ 專案。
- **取法**：直接讀 JSON，**當「目錄清單」初始種子**最方便。
- **⚠ 授權**：repo 掛 **GPL-3.0，但那是程式碼授權**；遊戲 `games.json` 資料與封面／ROM 資產的版權是另一回事，kickoff 已記其授權主張「被否決」。**匯入清單可、但封面/資產務必先確認版權再用**。

### 7. 骨灰集散地 boneash.oldgame.tw/Pc ★★ 🟡
- **收什麼**：依類型（動作/RPG/冒險…）分頁的遊戲介紹，敘述 + 圖片。
- **坑**：主頁偏敘述（PC 硬體史），清單在各類型子頁；有中文編碼亂碼問題（Big5）。
- **價值**：考據型介紹 + 圖片。

## 補充來源（額外找到）

### 8. 維基百科〈中文DOS遊戲列表〉★★★ 🟢
- 結構化列表，依廠商／類型組織，多人校對。可走 MediaWiki API。**最佳交叉比對／補洞清單**。CC-BY-SA，需署名。

### 9. 巴哈姆特 studentc《老Game 中文遊戲列表 v3.x》★★ 🟡
- 高度整理的分類清單（RPG/ACT/SLG/AVG/其他列表），含圖、引用骨灰集散地 + MobyGames + wiki。gamer.com.tw 需小心抓（半人工）。考據價值高。

### 10. MobyGames ★★★ 🟡
- 英文大型遊戲庫，含不少中文遊戲的發行年、廠商、封面、平台。有 API。**補英文原名／別名、發行資料、封面**的權威交叉源。

### 11. Internet Archive / MyAbandonware / AbandonwareDOS ★★ 🟡
- Abandonware 站，含下載、截圖、部分中繼資料。中文遊戲覆蓋較薄，但截圖/封面與發行資訊可用。

### 12. 廠商與維基條目（大宇/智冠/漢堂/精訊 等）★★★ 🟡
- 各廠商維基／官方頁的產品列表，**確認單一廠商出品清單**用，補洞與正名。

### 13. OfflineList 中文DOS遊戲圖鑑（archive.org/details/cndosgames）★★ 🟢
- **收什麼**：NashG 整理的 OfflineList 圖鑑，**724 款** DOS 中文遊戲，含廠商/年代/語言/地區欄位 + 截圖。
- **結構**：`Chinese Game Dat - DOS.zip` → OfflineList XML（已抓存 `raw/offlinelist/`，見其 PROVENANCE）；另有 `cndosgames_meta.sqlite`、年代分卷 7z（遊戲鏡像，有版權疑慮勿散布）。
- **取法**：`scripts/parse_offlinelist.py` 解 XML → `derived/offlinelist-games.json`（723 款，含簡/繁名+廠商+年代）；`location`/`language` 代碼實測全為常數（3/4）無鑑別力，已捨。
- **價值**：另一份獨立清單，**交叉比對／補洞**用。覆蓋分析：432 已在 master、真缺口 ~183（早期段 1992–1998，智冠/歡樂盒/松崗居多），詳見 `derived/cross-reference.md`。簡繁並存以繁體為主。
- 即 Fandom 頁「圖鑑」連結指向的同一 archive.org item。

### 14. Fandom 頁 External Links 連結集 ★ ～ ★★ 🟡
- `cn-dos-games.fandom.com/zh` 首頁底部 External Links 區，**一批日後找資料的起點站**。多為個人考據站／論壇／影片，覆蓋與深度不一，需逐站交叉查證。完整清單見下方「Fandom External Links 盤點」。

## Fandom External Links 盤點（2026-06-15）

來源：`cn-dos-games.fandom.com/zh/wiki/CN_DOS_Games_Wiki`（MediaWiki API 取，頁面 WebFetch 會 403）。已涵蓋者標註對應的既有來源。

**清單／考據**
- old-games.ru〈中文游戏列表〉— https://www.old-games.ru/wiki/Список_китайских_игр （俄站老遊戲庫，含中文遊戲清單）
- 巴哈〈中文游戏列表〉— https://forum.gamer.com.tw/C.php?page=1&bsn=60402&snA=102 （≈ 來源 9）
- 巴哈 home〈懷舊老Game：中文遊戲列表〉— https://home.gamer.com.tw/artwork.php?sn=5627530
- bangumi.tv — https://bangumi.tv/ （ACG 條目庫，可補日系移植作資料）
- kudgame〈pcgamelist〉— http://kudgame.blogspot.com/2014/07/pcgamelist.html

**個人考據站**
- 青衫之友 — https://chiuinan.github.io/game/ （= 來源 1，已抓）
- 骨灰集散地 — https://boneash.oldgame.tw/ （= 來源 7，已抓）
- 老頑固的窩（webarchive）— https://web.archive.org/web/20211031233352/http://oldgamehome.blog.fc2.com/
- 老頑固的第二個窩（webarchive）— https://web.archive.org/web/20240317071132/https://oldgamehome2.blog.fc2.com/
- 老頑固的第三個窩 — https://oldgamehome3.blog.fc2.com/
- ∮Ω奧米加空間∮ 數位典藏區 — https://omega.idv.tw/kdb120/forumdisplay.php?forumid=68 （= 來源 3，已抓）
- 喵喵笨兔の喵喵的家·遊戲天地 — http://vvv.lionfree.net/ （注意：與來源 2 的 vvv.nde.tw 不同站）
- Endless Fight — https://www.endlessfight.org/discuz/

**影片／社群媒體**
- B站 UP 踩死癩蛤蟆 — https://space.bilibili.com/13941349
- YouTube WERTA BEST（old games videos）— https://www.youtube.com/@IamWERTA

**遊戲合集／下載（⚠ 版權，僅查證用勿散布）**
- DOS 2182 個遊戲合集（PPX 1）— https://www.ppxclub.com/forum.php?mod=viewthread&tid=708510
- DOS 2182 個遊戲合集（PPX 2）— https://www.ppxclub.com/forum.php?mod=viewthread&tid=719959
- DOS 2182 個遊戲合集（oldman）— https://bbs.oldmantvg.net/thread-32581.htm
- Galgame 漢化補檔計畫 — https://kindhearted-belief-c76.notion.site/Galgame-34e83ad5794a4eb990b217b588f40961
- Archive.org Chinese DOS games collection — https://archive.org/details/cndosgames （= 來源 13）

## collect-first 的落地慣例（重要）

先收料不等於亂收。建議最小結構，確保日後比對得回來：

- `raw/<source-slug>/` 存各來源**原始**擷取物（HTML dump、JSON、圖片），按來源分目錄。
- 每筆／每批附 **provenance**：來源 URL、擷取日期、來源可信度級別。
- raw 與 derived 分離：raw 原封不動，提煉出的清單/欄位另存 `derived/`。
- **⚠ 刪檔陷阱**：本機 `rm`/`rmdir` 被 alias 成 trash 且對非空目錄照丟，raw 的 HTML/img 很容易被誤掃。清理時**只搬不刪**，要刪先確認 artifact 已搬妥。
- 若 raw 體積大或有版權疑慮（封面/ROM），考慮 gitignore raw 資產、只版控 derived 與 provenance。

## 擷取狀態（2026-06-14）

| 來源 | 狀態 | 產出 |
|------|------|------|
| chiuinan | ✅ 已抓+解析 | `derived/chiuinan-games.json`（骨幹 3834）|
| rwv | ✅ 已抓+配對 | `derived/rwv-games.json`；封面 300 已 join |
| omega 數位典藏區 | ✅ 37 頁已抓+解析 | `derived/omega-threads.json`（903）+ 參考連結 |
| Fandom | ✅ API 全量 | `derived/fandom-games.json`（732）+ 參考連結 |
| boneash | ✅ 9 類子頁已抓+解析 | `derived/boneash-games.json`（427，早期段）|
| OfflineList (cndosgames) | ✅ 已抓+解析+**整合** | `derived/offlinelist-games.json`（723）；615 款觸及（465 標 provenance、151 新款來源含 offlinelist）；base-match 40 筆人工裁決（38 併入/2 新增）；圖片 200 張 |
| vvv.nde.tw | ⏸ 擱置 | JS 動態清單，靜態抓不到；攻略連結待瀏覽器/人工 |
| 維基列表 | ❌ 不適用 | 專頁已不存在，改作單款條目參考 |
| MobyGames | ⏳ 待做 | 建議逐款查詢，待 schema 穩定 |
| Instagram | ⏳ 待做 | 登入/動態，人工或 web-access；價值在照片 |

詳見 `derived/cross-reference.md`。

## 下一步

1. ~~抓易擷取高價值清單源~~（chiuinan/rwv/omega/fandom/boneash 已完成）。
2. **新遊戲合併**：各源 master 沒有的候選（omega 556 / fandom 247 / boneash 316），需 fuzzy 複核 + scope 篩選 + region 標記後再併。
3. 逐款補介紹與圖片：MobyGames（英文原名/封面）、IG（實體照片）、omega 單篇內文。
4. 收到一定量後，從實際資料**反推 schema**（schema-on-read），再定 `schema.md`。
