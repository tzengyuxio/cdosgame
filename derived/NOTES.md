# derived/ — 提煉筆記

從 `raw/` 提煉出的中間產物。raw 原封不動，提煉物放這裡。

## 檔案

- `chiuinan-games.json` — **原始層**：list-1.htm 解析的 3834 筆 + cgame/egame 補的 content_language/genre，保留 rating、publisher_original 等全部來源資料。
- `chiuinan-titles.txt` — chiuinan `list-2.txt` 的 3830 筆繁中標題（純清單，備查）。
- `rwv-games.json` — rwv `games.json` 正規化的 1898 筆。
- `omega-threads.json` / `fandom-games.json` / `boneash-games.json` — 次要來源清單（見 `cross-reference.md`）。
- `master-list.json` — **catalog 層**：以 chiuinan 為骨幹、台灣產品導向的精簡條目（含 localization_level、developer_region、publisher_tw、genre、rwv 封面、references；不含 rating/publisher_original）。
- `cross-reference.md` — 多來源覆蓋與重疊報告、合併 backlog。

產生流程：`parse_chiuinan.py` → `enrich_chiuinan.py` → `parse_extra_sources.py` → `build_master.py`（腳本在 `scripts/`）。

## 重大發現：chiuinan list-1.htm 是結構化總表

原以為只是標題清單，實則是一張**完整總表**，欄位：`遊戲名稱`(含英文別名) / `評價` / `年代` / `公司` / `大小` / `限制` / `編號`。

**填充率（共 3834 筆）**：developer 3834、year 3832、英文別名 2833、catalog_id 3401、rating 712。

**年份範圍 1981–2024**，其中 **563 筆 > 2004**——這是「中文 PC 遊戲總表」而非純 DOS。依 `scope.md` 收集邊界 2004，這些屬邊界外，先保留並可後續以 `year > 2004` 標記/篩除。

→ **策略定案**：主清單以 chiuinan 為骨幹，rwv 退為補封面 + 簡繁交叉 + 可玩性。

## 廠商拆分決定（使用者拍板 2026-06-13）

`公司` 欄實為「**開發商（原廠發行, 台灣代理）**」結構（2215/3834 含括號）。

**產品定位（關鍵）**：本 catalog 專注**台灣老遊戲**。原廠發行的遊戲與台灣中文化/代理包裝後的老遊戲是**兩個不同產品**——catalog 只需台灣發行/代理商，原廠發行留在原始層即可。

拆法（括號內以 CJK/Latin 區分）：
- `developer` — 括號前（裸值也歸此）
- `publisher_tw[]` — 括號內 CJK 條目 = 台灣發行/代理（catalog 相關）
- `publisher_original[]` — 括號內 Latin 條目 = 原廠發行（**僅原始層保留**）
- `vendor_raw` — 原文回溯

範例：`Ogdan (Epyx,智冠)` → developer=`Ogdan`, publisher_tw=`[智冠]`, publisher_original=`[Epyx]`。

**分層**：
- `chiuinan-games.json`（原始層）：保留 `developer` + `publisher_tw` + `publisher_original` + `rating`。
- `master-list.json`（catalog 層）：只留 `developer` + `publisher_tw`；**丟 publisher_original 與 rating**（評價依使用者指示不入 catalog，只當來源記錄）。

**⚠ 已知瑕疵**：裸值一律歸 developer（如 `大宇`）。原生作中 developer 即台灣主體，localization=A 仍判對；但若某筆只列台灣代理裸值會被誤標 developer。後續可細修。

## 三類遊戲分類設計（localization_level，使用者需求 2026-06-13）

需從資料面區分三類：原生中文開發 / 中文化 / 中文包裝代理。發現 chiuinan 自帶兩個可用軸：
- **content_language**：cgame*=中文遊戲(zh) / egame*=英文遊戲(en)，即遊戲內語言。
- **genre**：13 類（回合RPG…運動動作），從分類頁標題取得。

以 `content_language` × `developer` 國籍 × `publisher_tw` derive：

| level | 意義 | 條件 | 數量 |
|-------|------|------|------|
| A | 原生中文開發 | zh-content + 中文 developer | 1283 |
| B | 中文化遊戲 | zh-content + 外國 developer | 944 |
| D | 中文包裝代理（內仍英文）| en-content + 有 publisher_tw | 185 |
| foreign | 純外國（邊界外候選）| en-content + 無 publisher_tw | 394 |
| null | content_language 未知且 developer 非中文 | — | 1028 |

**content_language 回填（已實作）**：null 桶中 developer 為中文廠商者補判 A（basis `backfill: cjk-developer`），A 由 765→1283（+518）。剩 1028 為外國/無 developer，維持 null。

每筆附 `localization_basis` 說明判據（透明、可審）。**驗證**：仙劍/軒轅劍/風色幻想→A；KOEI 三國志/大航海→B；熊貓 三國志武將爭霸→A，皆正確。

**限制**：
- C（民間漢化）無法從 chiuinan derive。
- null 桶 1546 筆中 **518 筆 developer 為中文廠商**，可由 content_language 回填補判 A。
- 為 derive 啟發式（低信心），非人工核定；schema 階段可加 `localization_verified` 旗標。

## 開發地 developer_region（使用者需求 2026-06-13）

中文遊戲要記錄開發是台/港/中哪地。新增 `developer_region` 欄（catalog 層），靠策展對照表 `data/developer-regions.json`（會成長的領域知識）查 developer → 地區（TW/HK/CN/MO/JP/US/FR/GB/DE…）。

**雙重作用**：
1. 記錄開發者地區。覆蓋 1468/3834（TW 658 / JP 340 / US 326 / FR 74 / GB 30 / DE 15 / CN 15 / HK 10）。
2. **反向修正 localization**：CJK 名但實為日/美廠者（工畫堂=Kogado、TGL、KID…）原誤判 A，依 region 改判 B（basis `region-correction`），共修正 25 筆。A: 1283→1258，B: 944→969。

**限制**：
- null 2366（A 類中 586）。A 類 null 多為未收錄的小台廠（龍愛、鉅盛、宏申…），**未預設 TW** 以免掩蓋實際 HK/CN 原生作；待證據逐步補。
- 對岸/HK 原生作在 chiuinan（台灣向）本就少，多落在 rwv 的 ~1400 未重疊筆。
- 地區只標**開發商**；台灣發行/代理另記於 `publisher_tw`。

## rwv 簡繁配對現況（fuzzy 已實作）

三層比對（每筆標 `rwv_match`）：
- `exact`：opencc t2s + 正規化精確 — 420
- `edition`：剝 rwv 版本後綴（光盘版/加强版…）— 0（chiuinan 多帶數字，少觸發）
- `alt`：去數字後比對，**雙向唯一才接受**（防三國志N 系列誤配）— 9

**合計 429 / 1898 配中（封面 300）**。alt 抽查 7/9 正確（信長之野望5霸王傳→霸王传、惡魔城1→恶魔城），2 筆勉強（接龍→接龙777、戰棋→战棋4000，短通用名），可靠 `rwv_match:"alt"` 篩除。

**配對天花板 ≈ 430**：~1400 筆 rwv 與 chiuinan 完全不重疊（連去數字 base 都無），抽查為**對岸冷門簡中遊戲**（金瓶梅、中国球王、1830铁路公爵、3x3只眼…）。**根因是範圍差異**：rwv 偏對岸收錄、chiuinan 偏台灣，非 fuzzy 可解。rwv 封面只能覆蓋重疊區。

## 圖片收集（2026-06-14）

圖檔下載到本地供人工辨識（純資料難比對），**圖檔 gitignore 不進版控**，但每張的來源記錄在 manifest（committed）：

| 來源 | 圖檔位置（gitignored）| manifest（committed）| 張數 | 授權 |
|------|------|------|---:|------|
| rwv 封面 | `raw/rwv/img/<id>/cover.*` | `raw/rwv/img/covers-manifest.jsonl` | 1300 | 資產再散布有疑慮，**勿直接 host** |
| Fandom 主圖（title 畫面）| `raw/fandom/img/<title>.*` | `raw/fandom/img/images-manifest.jsonl` | 717 | CC-BY-SA，需署名 |

manifest 每行記 `local_path` / `source_(image_)url` / 來源頁 / 授權 / 抓取日。腳本 `scripts/fetch_rwv_covers.py`、`fetch_fandom_images.py`（皆冪等，curl 下載）。

## 下一步

1. ~~content_language 回填~~（已完成，+518 A）。
2. ~~rwv 模糊配對~~（已完成，429 配中／天花板 ~430）。
3. 補洞交叉源：維基〈中文DOS遊戲列表〉、MobyGames（英文原名/封面/年份）；chiuinan `intro/` 單款介紹頁；對岸冷門遊戲若要收，rwv 可獨立貢獻 ~1400 筆（簡中向，需另判 region）。
4. 擴充 `data/developer-regions.json`：A 類 586 筆 null 多為小台廠，逐步補。
5. ~~反推 schema~~（✅ 已定：`schema.md` + `schema/game.schema.mjs` Zod；產出 `content/games/*.md` 3834 款，`npm run validate` 全過）。

## 本地圖接進 catalog（2026-06-14）

master 每筆加 `images` 欄，指向本地已下載的圖（從各源 manifest 建，只列實際存在的檔）：
- `images.chiuinan`：截圖清單（≤3）；`images.rwv_cover`：封面；`images.fandom`：主圖。
- 覆蓋：chiuinan 2278 / fandom 458 / rwv 300；**2432 款（63%）至少一張**。
- 圖檔 gitignored，路徑可用於本地預覽；對外用前依各 manifest 的授權註記判斷。
