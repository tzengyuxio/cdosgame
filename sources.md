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

## collect-first 的落地慣例（重要）

先收料不等於亂收。建議最小結構，確保日後比對得回來：

- `raw/<source-slug>/` 存各來源**原始**擷取物（HTML dump、JSON、圖片），按來源分目錄。
- 每筆／每批附 **provenance**：來源 URL、擷取日期、來源可信度級別。
- raw 與 derived 分離：raw 原封不動，提煉出的清單/欄位另存 `derived/`。
- **⚠ 刪檔陷阱**：本機 `rm`/`rmdir` 被 alias 成 trash 且對非空目錄照丟，raw 的 HTML/img 很容易被誤掃。清理時**只搬不刪**，要刪先確認 artifact 已搬妥。
- 若 raw 體積大或有版權疑慮（封面/ROM），考慮 gitignore raw 資產、只版控 derived 與 provenance。

## 下一步

1. 先抓「易擷取且高價值」的清單來源建初始目錄：rwv `games.json`、chiuinan repo、維基列表。
2. 三方比對去重，拼出主清單（title 中/英 + 廠商 + 年）。
3. 再逐款從 omega 典藏區、骨灰集散地、IG、攻略站補介紹與圖片。
4. 收到一定量後，從實際資料**反推 schema**（schema-on-read），再定 `schema.md`。
