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

## 已整合進 master

- **參考連結**：omega 325、fandom 460（合計 693 筆 master 帶 `references`）。後續可作站台「參考資料」外連。
- 年份：master 已 3832/3834 自帶，故各源年份僅作交叉驗證、未覆寫。

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
