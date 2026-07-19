---
status: pending
created: 2026-07-19
source: press-import（raw/media/_inbox 電腦玩家96＋軟體世界多期批次）
---

# ad 廣告硬事實擷取（press-import 續辦）

2026-07-19 一批 inbox 掃描已跑完 press-import 的**入庫＋press 正文**兩步：
- 圖片入庫：62 條目 69 圖（56 ad + 13 press）已 `process_media --write`，inbox 已清空。commit `dafdcda4`（media 入庫）、`715c051e`（12 款 press 正文），**未 push**。
- press 13 張報導已補正文＋keyed footnote＋caption。

**本檔待辦＝剩下 56 張 ad 廣告的「硬事實擷取」**（使用者決策：ad 只入庫＋擷取客觀硬事實，純宣傳語氣不寫）。

## 做法（接手時照跑）

1. ad 圖已入庫，**原圖在 `raw/media/games/cdg-NNNN/*ad*`**、webp 在 `public/media/games/cdg-NNNN/ad-*.webp`；刊物期號見各條目 `media[]` 的 caption。
2. **分批**（每 6–8 款）開 subagent 讀 1 張 ad 原圖＋對應條目，**只回報條目目前缺、而廣告能佐證的客觀事實**：上市確認／售價／台灣代理／系統需求／版本（貴族版等）／發行日。**主觀宣傳語一律不採**。
3. 主線核對後補正文（房屋風格走 skill `game-entry`）：
   - 每句廣告新增事實句末加 `<sup class="cite" data-ref="<KEY>"></sup>`。
   - footnote key：電腦玩家96＝`pcgamer96`；軟體世界＝`softworld<期>`（如 `softworld48`）。**先查該條目是否已有既存 footnote key（如 fn01/fn-ad），有就沿用、別新造 dangling**。
   - footnote 定義與 media caption 一律**主線統一設**（subagent 不碰 frontmatter），`npm run validate` 後檢查無 dangling cite（validate 本身不抓 dangling）。
4. **優先**處理 stub／缺 year／缺 publisher_tw 的條目；已完整的條目若廣告加不了新客觀事實，**ad 只入庫、正文不動**（勿為補而補）。
5. frontmatter 的 developer/publisher/year/genre **不因單張廣告更動**，有出入只列複查清單。
6. commit 拆：`content(games): N 款補廣告硬事實`。未 push。

## 進度

- **2026-07-19 批 1（7 款）**：cdg-0199（早前已於 fn01 引軟體世界82期廣告，正文不動）、cdg-0640 cdg-0712 cdg-0761 cdg-0864 cdg-0902 cdg-1068 已補 `pcgamer96` footnote＋硬事實 cite。validate 通過。

- **2026-07-19 批 2（6 款）**：cdg-1134 cdg-1417 cdg-1620 cdg-2229 cdg-2242 cdg-2314 已補 footnote＋硬事實 cite（1620＝軟體世界82期 `softworld82`，餘 `pcgamer96`）。validate 通過。

### frontmatter 複查（批 2，只列不改）

- cdg-2229：`publisher_tw: []` 空，廣告標「代理發行：**生圓國際**」→ 應補 publisher_tw 生圓國際。
- cdg-2314：`developer: 業訊`，廣告除 PROPILOT（業訊）外另見 **TEAM A.SEED**、**yumap** 團隊 logo → developer 恐誤判（業訊或為純發行），待複查。

- **2026-07-19 批 3（6 款）**：cdg-2357 cdg-2468 cdg-2542 cdg-2733 cdg-2925 cdg-2926 已補 footnote＋硬事實 cite（2357＝軟體世界82期 `softworld82`／90期無新事實，2926＝軟體世界60期 `softworld60`，餘 `pcgamer96`）。validate 通過。

### frontmatter 複查（批 3，只列不改）

- cdg-2357：`publisher_tw: []` 空，兩張廣告發行主體皆智冠科技（軟體世界）→ 應補 publisher_tw 智冠；`developer: 智冠` 僅發行掛名、實際開發團隊未明，待複查。
- cdg-2468：職業名單出入——廣告列「戰士、盜賊、僧侶、祭司、女巫……8 大角色」，正文作「戰士、法師、盜賊、僧侶」四職×男女＝八名 → body 內容待複查。

- **2026-07-19 批 4（6 款）**：cdg-3176 cdg-3232 cdg-3274 cdg-3277 cdg-3324 已補 footnote＋硬事實 cite（3176＝軟體世界60期 `softworld60`／3324＝軟體世界82期沿用既存 `fn01`／餘 `pcgamer96`）。cdg-3190 廣告事實已於既存 `fn01` 涵蓋且正文完整，**ad 只入庫、正文不動**。validate 通過、無 dangling cite。

### frontmatter 複查（批 4，只列不改）

- cdg-3232：`publisher_tw: []` 空，廣告刊「第三波資訊」為台灣代理發行、宏碁 Acer TWP 在 GT Interactive 再授權下經銷 → 應補 publisher_tw 第三波（正文已述、frontmatter 待訂）。
- cdg-3274：`publisher_tw: []` 空，廣告標「總經銷 光固流通（LiSound）／全球代理 CDSOFT」→ 與正文原有「以軟體世界的品名於零售通路流通」說法衝突（後者無出處，已於本次改寫移除該句、改採廣告經銷資訊）；publisher_tw 是否採光固流通待訂。封面主視覺署名「李志清 九九」。

- **2026-07-19 批 5（6 款）**：cdg-3339 cdg-3436 cdg-3468 cdg-3556 cdg-3620 cdg-3732 已補 footnote＋硬事實 cite（3339＝軟體世界48期 `softworld48`／3436＝軟體世界90期 `softworld90`／3620＝軟體世界82期 `softworld82`／餘 `pcgamer96`）。validate 通過、無 dangling cite。

### frontmatter 複查（批 5，只列不改）

- cdg-3436：`publisher_tw` 現作「天堂鳥」，廣告分工為「天堂鳥資訊企劃製作／福旭國際股份有限公司銷售發行」→ 是否補 publisher_tw 福旭國際待訂。
- cdg-3468：`publisher_tw: []` 空，廣告發行商標「光譜資訊（副廠牌 T-Time）」→ 應補 publisher_tw 光譜。
- cdg-3556：`publisher_tw: []` 空，廣告代理發行「歐樂影視國際股份有限公司」（playerhouse.com.tw，疑與 cdg-3732 之「歐樂」同源）→ 應補 publisher_tw 歐樂影視國際。
- cdg-3339：`publisher_tw` 現作「智冠」，body 已述「智冠旗下電腦休閒世界」代理，廣告一致（電腦休閒世界獨家代理、Aisa Recording 台港製造）；無衝突，僅記錄。

- **2026-07-19 批 6（6 款）**：cdg-3739 cdg-4069 cdg-4083 cdg-4117 cdg-4252 已補 footnote＋硬事實 cite（4069＝軟體世界82期 `softworld82`／4083＝軟體世界48期 `softworld48`／4117＝軟體世界50期 `softworld50`／4252＝軟體世界60期改寫既存 `fn01`／3739＝`pcgamer96`）。cdg-3895（兩張 ad-01/48期＋ad-02/54期）廣告事實已於既存 `fn01`＋正文完整涵蓋（中古戰史→上古神兵改名、中英雙語、電腦休閒世界代理）→ **正文不動**。validate 通過、無 dangling cite。

### frontmatter 複查（批 6，只列不改）

- cdg-3895：`content_language: zh`，但兩張廣告與正文均述「中英雙語版本」→ content_language 是否改 zh+en 待訂；publisher_tw 現作智冠，廣告為「電腦休閒世界獨家代理／Asia Recording 台港製造」（電腦休閒世界＝智冠旗下，非衝突）。
- cdg-4117：`content_language: zh`，廣告標「中英雙語版本」（正文亦已述）→ content_language 待訂。
- cdg-4083／cdg-4117：publisher_tw 智冠，廣告僅見「電腦休閒世界獨家代理／Asia Recording」無智冠字樣（同 3339 型態，電腦休閒世界＝智冠旗下，非衝突，僅記錄）。
- cdg-4069：developer 仍為 null——廣告未揭露開發商／製作團隊。

### frontmatter 複查（批 1，只列不改）

- cdg-0640：`publisher_tw` 現作「億弘」，廣告全名「**憶弘**國際股份有限公司」（憶，心字旁）→ 用字待訂。
- cdg-0712：`publisher_tw: []` 空，廣告由**美商藝電（EA）**刊登發行（developer 白金家族維持）→ 是否補 EA。
- cdg-0761：`publisher_tw: []` 空，正文已述美商藝電發行 → 應補 `publisher_tw` 美商藝電。
- cdg-1068：`developer_region: JP`，廣告標「Honorock's Systems.（**韓國**）」與條目日本考據衝突；條目已有 archive.org／日本流通一手佐證支持日本說，**維持日本**，僅記錄。

## 56 張 ad 待處理清單（55 條目，cdg-3895 有兩張）

電腦玩家96 與軟體世界（第48/50/54/60/82/90 期等）混合，刊期見各條目 caption：

cdg-0199 cdg-0640 cdg-0712 cdg-0761 cdg-0864 cdg-0902 cdg-1068 cdg-1134 cdg-1417 cdg-1620 cdg-2229 cdg-2242 cdg-2309 cdg-2314 cdg-2357 cdg-2449 cdg-2468 cdg-2542 cdg-2733 cdg-2925 cdg-2926 cdg-3176 cdg-3190 cdg-3232 cdg-3274 cdg-3277 cdg-3324 cdg-3339 cdg-3436 cdg-3468 cdg-3556 cdg-3620 cdg-3732 cdg-3739 cdg-3895 cdg-4069 cdg-4083 cdg-4117 cdg-4252 cdg-4391 cdg-5155 cdg-5215 cdg-5216 cdg-5218 cdg-5224 cdg-5230 cdg-5232 cdg-5233 cdg-5234 cdg-5238 cdg-5239 cdg-5240 cdg-5241 cdg-5243 cdg-5245

> 註：2309/2449/3190/5215/5238 同時是本批 press（正文已充實），其 ad 廣告優先度低。

## press 批遺留的待人工複查（已於 2026-07-19 裁定完畢）

- cdg-5244 夢幻占星館：`publisher_tw` 改 `[]`（出版公司未定）。✅
- cdg-4387 戰國群英：正文已改「已知台灣由立東代理」、footnote 待查證措辭已移除。✅
- cdg-2449 時空英豪：移除硬體需求描述（P3／P200MMX），正文以遊戲內容為主。✅
- cdg-5215 美夢成真：「經紀公司雜誌編輯」與「記者」無實質出入，維持不改。✅
