# Frontmatter 邊角案例（game-entry 深度參考）

SKILL.md §3 的 traps 清單指向這裡。撞到對應情況時翻本檔取完整規則與範例；平時填基本欄位不需載入。欄位 enum 的唯一權威仍是 `schema.md`。

## 系列初代標題不帶序號

首作 `title_zh` 用作品名本身（如「巫術」「國王密使」「大富翁」），**不寫**「巫術1」「國王密使1」；續作才帶數字（巫術2、國王密使2…）。沿用既有 stub 時若初代被標成「…1」應一併訂正，原「…1」可留作 alias。

## 外文遊戲（無中文化）

`localization_level: foreign`、`publisher_tw: []`、`content_language` 填原文（如 `en`）、`developer_region` 填原國別。

## 軟體世界 貴族版／平價版／珍藏版的外文重發

＝budget 重包裝英文版：標 `localization_level: packaging`＋`license_status: unofficial`＋`content_language: en`＋`publisher_tw`（軟體世界／智冠，沿用既有 sibling）；**僅在無任何台灣發行**（只靠雜誌介紹、水貨流通，如冰城傳奇初代）才用 `foreign`＋`publisher_tw: []`。

## 標題用半形阿拉伯數字

系列序號寫半形（`宇宙傳奇2`、`冰城傳奇3`），副標分隔用全形冒號（`：`）。沿用舊 stub 常見全形數字（`宇宙傳奇２`），**一律改半形**，`data/id-registry.json` 同步。

## 同中文名不同款消歧義

譯名撞名（如 Golden Axe vs Tomahawk 都譯「戰斧」、Castlevania vs Dark Castle 都譯「惡魔城」、Blockbuster vs 中國製打磚塊）：兩筆標題都加**全形括號＋英文原名**（`戰斧（Tomahawk）`／`戰斧（Golden Axe）`、`打磚塊（Blockbuster）`），裸名留進 `title_aliases`、`id-registry` 的 `title_zh` 同步；已用序號區分的系列成員（惡魔城1/2/傳說）免。沿用 `下級生（日）` 既有慣例。正文側仍照 §4-3 自然 cross-link「為不同作品」。

## `release_codes`（珍／貴／平 NNN）查法＋誤植

碼**不在使用者清單裡** → 從 `derived/softworld-games.json` 用 `name_en` 反查（欄位 `code/series/name/name_en`）；**別從 `catalog_id` 推導**（`SWT/SWE/SCD…` 是來源側索引，`SWE0NN` 與 `貴0NN` 偶然吻合但不可靠——cdg-3726 SWE017 實為魔法門2），查無就留空、**別捏造**（別把 `catalog_id: SWT284` 寫成 `珍284`）。

⚠ **誤掛紅旗**：某 `foreign`＋`publisher_tw: []`（無台灣發行）卻掛著珍/貴碼 → 多半是 fuzzy-merge 依相同中文名誤抓別款的碼（戰斧/Golden Axe 誤掛 Tomahawk 的貴032）；用 softworld 反查該碼真正 `name_en`，不符就移除碼與連帶 `softworld@boneash-scan` provenance。

**多片上/下共用一碼＝單條目單碼**（Ultima V 貴057）；**同款先後收貴族版+珍藏版＝雙碼並列**（Manhunter 貴087+珍001）。

## 研究常挖出既有 frontmatter 誤植

代理商張冠李戴、開發商國別、localization 等——順手訂正；存疑處記 `docs/backlog/game-entry-review.md`。
