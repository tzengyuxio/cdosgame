# derived/ — 提煉筆記

從 `raw/` 提煉出的中間產物。raw 原封不動，提煉物放這裡。

## 檔案

- `chiuinan-games.json` — **原始層**：list-1.htm 解析的 3834 筆 + cgame/egame 補的 content_language/genre，保留 rating、publisher_original 等全部來源資料。
- `chiuinan-titles.txt` — chiuinan `list-2.txt` 的 3830 筆繁中標題（純清單，備查）。
- `rwv-games.json` — rwv `games.json` 正規化的 1898 筆。
- `master-list.json` — **catalog 層**：以 chiuinan 為骨幹、台灣產品導向的精簡條目（含 localization_level、publisher_tw、genre、rwv 封面；不含 rating/publisher_original）。

產生流程：`parse_chiuinan.py` → `enrich_chiuinan.py` → `build_master.py`（腳本在 `scripts/`）。

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
| A | 原生中文開發 | zh-content + 中文 developer | 765 |
| B | 中文化遊戲 | zh-content + 外國 developer | 944 |
| D | 中文包裝代理（內仍英文）| en-content + 有 publisher_tw | 185 |
| foreign | 純外國（邊界外候選）| en-content + 無 publisher_tw | 394 |
| null | content_language 未知 | 不在分類頁 | 1546 |

每筆附 `localization_basis` 說明判據（透明、可審）。**驗證**：仙劍/軒轅劍/風色幻想→A；KOEI 三國志/大航海→B；熊貓 三國志武將爭霸→A，皆正確。

**限制**：
- C（民間漢化）無法從 chiuinan derive。
- null 桶 1546 筆中 **518 筆 developer 為中文廠商**，可由 content_language 回填補判 A。
- 為 derive 啟發式（低信心），非人工核定；schema 階段可加 `localization_verified` 旗標。

## rwv 簡繁配對現況

opencc t2s 轉換 + 正規化精確比對：**417 / 1898 配中**（含封面 292）。

配對率偏低主因：**版本／編號命名不一致**——chiuinan 作「仙劍奇俠傳1」，rwv 作「仙剑奇侠传」「仙剑奇侠传光盘版/加强版/梦幻版」。屬 fuzzy / 版本感知比對的後續工作，非阻塞（rwv 封面為加分）。

## 下一步

1. content_language 回填：null 桶 518 筆 CJK-developer 可補判 A（純標題清單 list-1 未帶 c/e，但 developer 國籍 + 無英文原名是強訊號）。
2. 提升 rwv 配對：版本/編號歸一化的模糊比對（吃下 1/2/3、光盘版/加强版、新/外傳）。
3. 補洞交叉源：維基〈中文DOS遊戲列表〉、MobyGames（英文原名/封面/年份）；chiuinan `intro/` 單款介紹頁。
4. 量夠後反推 schema（已浮現 catalog 欄位：title_zh / title_aliases / year / developer / publisher_tw / content_language / genre / localization_level / size / platform_note / catalog_id / cover / external_links / sources）。
