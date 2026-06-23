# 圖片／媒體管理規範（content media）

本文定調站上**策展圖片**（盒裝、說明書、廣告、截圖…）的存放、命名、授權、處理與頁面呈現。

> 區分兩種圖：
> - **來源抓取圖**（既有）：`raw/<來源>/img/`，gitignored，只有 manifest 進版控，**不部署、不顯示**，是「我們本地有這些源圖」的 provenance 紀錄（frontmatter 的 `images{ chiuinan, rwv_cover, fandom }`）。
> - **策展媒體**（本文主題）：人工挑選、標好來源、轉成 WebP、**進版控並隨站部署、會顯示**（frontmatter 的 `media[]`）。策展媒體常由來源抓取圖或自行掃描衍生而來。

## 0. 定調（已拍板）

- **存放**：策展圖進 repo `public/media/`，隨 GitHub Pages 部署。
- **授權**：百科慣例——**標註出處即顯示**；每張圖強制附 `source` 與（可得時）`credit`／`source_url`。僅收「合理使用＋註明出處」可接受的圖；明顯不可用者不上。
- **格式**：**原圖存檔（archival）＋ 交付用 WebP**（全圖＋縮圖）。截圖用無損／近無損；掃描照片用 lossy q≈80。

## 1. 兩層：archive vs delivery

| 層 | 路徑 | 版控 | 部署 | 用途 |
|---|---|---|---|---|
| **delivery（交付）** | `public/media/games/cdg-NNNN/*.webp` | ✅ 進版控 | ✅ | 站上實際顯示 |
| **archive（存檔）** | `raw/media/games/cdg-NNNN/`（原始高解析 PNG/JPG） | gitignore（比照 raw）；附 committed manifest | ❌ | 重出圖、保真 |

archive 非必要，但建議保留原始掃描，日後可重壓不同尺寸／格式。

## 2. 目錄與命名

- **一款一資料夾**：`public/media/games/cdg-NNNN/`。
- **檔名 = `<kind>[-NN].webp`**；縮圖放 `thumb/` 子夾、**同名**。
- 多張同類用 `-01`、`-02`（zero-pad，依頁序／邏輯序）。
- 全小寫、kebab-case，不含中文／空白（中文資訊放 frontmatter 的 `caption`）。

### `kind` 控制詞彙（對應你列的類別）

控制詞彙、顯示標籤與類別分組見 `src/lib/media.js`（`KIND_LABELS`、`CATEGORIES`）為單一真實來源；以下表為對照：

| kind | 顯示標籤 | 分組 | 說明 |
|---|---|---|---|
| `box-front` | 包裝封面 | 盒裝 | 通常即封面 |
| `box-back` | 包裝背面 | 盒裝 | |
| `box-spine` | 包裝側面 | 盒裝 | |
| `package` | 包裝 | 盒裝 | 整套擺拍、外盒以外配件合照 |
| `disc` | 光碟 | 光碟／磁片 | |
| `floppy` | 磁片 | 光碟／磁片 | |
| `manual-cover` | 說明書封面 | 說明書 | |
| `manual` | 說明書內頁 | 說明書 | 多頁用 `manual-01…` |
| `ad` | 廣告 | 廣告 | 雜誌廣告等 |
| `title` | 標題畫面 | 截圖 | |
| `screenshot` | 遊戲畫面 | 截圖 | 多張用 `screenshot-01…` |
| `logo` | 標誌 | 標誌 | 公司頁 |
| `product` | 產品 | 產品 | 公司頁 |
| `building` | 辦公室 | 照片 | 公司頁 |
| `portrait` | 人物照 | 照片 | 人物頁 |
| `photo` | 照片 | 照片 | 人物頁 |
| `other` | 圖片 | 其他 | 海報、貼紙、周邊… |

**分組內排序**：先看 `order`（顯式），再看 kind 在分組 `kinds[]` 中的位置（box-front 前於 box-back 前於 box-spine；title 前於 screenshot），最後按 src 檔名 fallback。

### 範例

```
public/media/games/cdg-1564/
├── box-front.webp
├── box-back.webp
├── box-spine.webp
├── disc.webp
├── manual-cover.webp
├── manual-01.webp
├── manual-02.webp
├── ad-01.webp
├── title.webp
├── screenshot-01.webp
├── screenshot-02.webp
└── thumb/
    ├── box-front.webp
    ├── screenshot-01.webp
    └── …（與上對應、同名）
```

## 3. Frontmatter（schema 擴充）

在 `schema/game.schema.mjs` 的 game schema 新增：

```js
media: z.array(z.object({
  src: z.string(),                 // 檔名，相對於 public/media/games/<id>/，如 "box-front.webp"
  kind: z.enum([
    "box-front","box-back","box-spine","package","disc","floppy",
    "manual-cover","manual","ad","title","screenshot","other",
  ]),
  caption: z.string().optional(),  // 中文圖說
  source: z.string(),              // 來源代碼（必填）：見 data/media-sources.json；渲染時展開為名稱＋連結
  source_url: z.string().url().optional(),  // 單張特定頁 URL（覆寫 registry 的站台 URL）
  credit: z.string().optional(),   // 提供者／攝者
  cover: z.boolean().optional(),   // 標記為封面（infobox/OG 用）；至多一張
  slot: z.enum(["hero"]).optional(),// 粗略槽位：hero=正文頂；其餘留待擴充
  order: z.number().optional(),    // 同類別內排序（小→前），不給則依檔名
  gallery: z.boolean().optional(), // false=不列入底部圖庫（通常因已在正文嵌入）
})).default([]),
```

- **封面決定順序**（`coverOf()` in `src/lib/media.js`）：
  1. `media[]` 中 `cover: true` 的那張（即便 `gallery: false` 也照用）。
  2. 否則從**未被 `gallery: false` 隱藏**的項目中，依 kind 優先序找第一張：
     `box-front` → `title` → `manual-cover` → `logo` → `portrait` → `ad`。
  3. 都沒有 → infobox 顯示「封面待補」佔位。
  - 設計：`ad` 排在 `logo` / `portrait` 之後，避免公司或人物頁有 ad 時把 ad 當門面；`gallery: false` 的 ad（如第三波代理光榮廣告，因已聚合到多遊戲頁、企業頁不再單獨呈現）也不會被偷渡成 og:image。供 infobox 縮圖與 `og:image`。
- **`source` 是代碼**（如 `boneash`），渲染時查 `data/media-sources.json` 展開為「骨灰集散地」＋連結；未登錄則原樣顯示。`source_url` 可覆寫成單張的特定頁網址。
- **必填欄位**：`src`/`kind`/`source`。`validate` 會擋掉缺 `source`、`src` 檔案不存在、或多於一張 `cover` 的情況。
- 既有 `cover`（字串）與 `images{}` 維持為來源 provenance 紀錄，**新顯示邏輯只看 `media[]`**；舊 `cover.png` 之類（指向 raw）不再用於顯示，逐步以 `media[]` 取代。

## 4. 頁面呈現

三種呈現方式，可並用：

1. **infobox 封面**：cover 縮圖取代現有「封面待補」佔位，點擊開 lightbox。
2. **底部「媒體」圖庫（預設、主力）**：正文下方一個 section，依類別分組（盒裝／說明書／廣告／截圖／其他）的縮圖 grid；點縮圖開 **lightbox** 看全圖。**未被特別擺位的圖一律自動落到這裡**，零維護。
   - 每張縮圖以 `<figure class="media-card">` 包：上為點擊用的 `<button class="media-thumb">` + `<img>`，下為 `<figcaption class="media-cap">` 顯示圖說（**縮圖點開前可見**）。
   - 圖說字串 = `m.caption || KIND_LABELS[m.kind]`（媒體 helper `galleryCaption` 在 `src/lib/media.js`）；沒有手寫 caption 時，自動以 kind 標籤代用（如「包裝封面」「標題畫面」），不再留白。Lightbox 顯示與此一致。
   - infobox 封面下方的 figcaption 與 cover lightbox 採另一個 helper `coverFigcaption`：永遠以 kindLabel 開頭、有 caption 才以「・」附在後（`包裝封面・1995 初版盒裝`）；讓讀者隨時能辨識是哪種圖（封面／標題畫面／說明書封面／廣告…）。
3. **正文嵌入（維基式右浮動圖）**：把編輯上重要的圖放進文章某段旁，見下方「擺位機制」。

### 擺位機制（指定某張圖放某個位置）

由粗到細三層：

| 機制 | 放哪 | 怎麼標 |
|---|---|---|
| **封面** | infobox（＋og:image） | `media[]` 那筆加 `cover: true`；不給則 `coverOf` 自動沿 priority 鏈找（box-front → title → manual-cover → logo → portrait → ad，跳過 `gallery: false`）|
| **粗略槽位／排序** | 正文頂、或調類別內順序 | `slot: "hero"`（置頂大圖）、`order: N`（同類排序） |
| **正文任意位置** | 文章中任一段旁 | 在 `.md` 正文寫 `![圖說](media:screenshot-01){align=right}` |

**`media:` 正文嵌入語法**：由 rehype 外掛（比照站上既有 `rehypeBaseLinks`）把 `media:<src>` 解析成該款 `public/media/games/<id>/<src>`、包成 `<figure>`＋圖說，依 `{align=right|left|center}` 浮動。外掛從內容檔路徑讀出 `cdg-NNNN`，正文只需寫短檔名。被嵌入的圖若設 `gallery: false` 則不再重複出現在底部圖庫（預設仍保留）。

### 其他

- **og:image**：該款有 cover 時，`/games/[id]` 的 OpenGraph 圖改用該封面（無則維持站台預設圖）——社群預覽與 AEO 更佳。
- **授權呈現**：圖說與 lightbox 顯示「來源：〔展開後的來源名〕」（可點），滿足「標註出處」定調。
- **類別專屬強化（可選）**：盒裝 front／back／spine 並排成組；說明書多頁做翻頁 viewer；截圖橫向 carousel。非必要，先以分類 grid 為準。

## 5. 交付流程（你給圖 → 我入庫）

### 5.1 收件夾（inbox）

把原圖丟進 **`raw/media/_inbox/`**（gitignored）。我處理時會：轉 WebP＋縮圖→`public/media/games/<id>/`、原圖搬到 archive `raw/media/games/<id>/`（登 manifest）、更新該款 `.md` 的 `media[]`、**清空 inbox**。

> **可反覆交付、不必清空**：inbox 永遠代表「待處理」。你每次丟新圖即可——我處理完會把原圖移到 archive、把 inbox 清乾淨，所以下次它本來就是空的。已入庫的不會被重複處理。

### 5.2 怎麼標 kind／來源／圖說 —— 用「檔名」帶資訊

檔名格式（欄位以 `__` 雙底線分隔）：

```
<cdg-id>__<kind>[-NN]__<source>[__<圖說>].<ext>
```

- `<cdg-id>`：`cdg-1564` 或省略前綴的 `1564`。
- `<kind>`：第 2 節控制詞彙；多張同類用 `-01`、`-02`。
- `<source>`：**來源代碼**（見 5.4），如 `boneash`、`haruo`、`self`。
- `<圖說>`：選填，中文可，過長就省略、改用對話告訴我或寫進 5.3 的 sidecar。
- `<ext>`：png／jpg／webp 皆可。

範例：
```
cdg-1564__box-front__boneash.png                 → 盒裝正面，來源 骨灰集散地
cdg-1564__manual-01__haruo__角色設定頁.jpg        → 說明書內頁1，來源 哈魯歐，附圖說
1564__screenshot-01__self.png                     → 自行截圖
cdg-1564__title__self__cover.png                  → 標題畫面，且指定為封面（末欄寫 cover）
```

- **指定封面**：預設用 `box-front`；要改用別張，檔名末欄加 `cover`（如上）。
- **替代寫法（懶得打 kind 在檔名）**：用子資料夾分款——`_inbox/cdg-1564/box-front__boneash.png`，id 由資料夾名取得。

### 5.3 圖說／來源的其他提供方式

- **最簡**：放檔名末欄（見上）。
- **批次**：在 inbox 放一個 `captions.txt`（`檔名 = 圖說` 每行一筆），或直接在對話裡列給我。
- **覆寫單張來源 URL**：在對話告知，我寫進 `media[].source_url`。

### 5.4 來源簡碼（registry）

來源用**短碼**，由 `data/media-sources.json` 展開為「全名＋網址」，前端顯示時自動帶連結：

```json
{ "boneash": { "name": "骨灰集散地", "url": "https://…" },
  "haruo":   { "name": "哈魯歐遊戲廳", "url": "https://…" },
  "self":    { "name": "自行掃描／截圖", "url": null } }
```

- 你只要寫 `boneash`／`haruo`，渲染就展開成「骨灰集散地」「哈魯歐遊戲廳」並附對應網址。
- 新來源 → 在 `data/media-sources.json` 加一筆即可（一處改、全站套用）。未登錄的代碼會原樣顯示並提醒補登。

### 5.5 公司／人物的圖，以及「一圖涵蓋多款」的代理廣告

公司與人物**沿用同一套 `media[]`**，差別：

| | 路徑 | kind 詞彙 | 封面（infobox） | 交付 |
|---|---|---|---|---|
| 公司 | `public/media/companies/<公司名>/` | `logo`／`building`／`product`／`ad`／`other` | `logo` | `_inbox/companies/<公司名>/<kind>__<來源>…` |
| 人物 | `public/media/people/<人名>/` | `portrait`／`photo`／`other` | `portrait` | `_inbox/people/<人名>/<kind>__<來源>…` |

（slug 是中文名，所以用**子資料夾**交付，不放進扁平檔名。）

**一張廣告涵蓋多款代理遊戲**（如一張第三波廣告含多款光榮中文版）：圖只存**一份**在發行商名下，並在該筆 `media[]` 標 `games: [cdg-…]`：

```yaml
# content/companies/第三波.md
media:
- src: ad-koei-01.webp
  kind: ad
  source: boneash
  caption: 第三波代理光榮遊戲中文版廣告
  games: [cdg-0906, cdg-0907, cdg-0908]
```

效果：此圖同時出現在**第三波公司頁**的「廣告」區，並**自動聚合到 cdg-0906/0907/0908 三款遊戲頁**的「廣告」區（不複製檔案、來源標註一致）。`process_media.mjs` 會在 `ad` 類旁提示補 `games`。

## 6. 格式與品質

- **WebP 交付**（理由見下）；**原圖存檔**於 archive 層。
- **尺寸上限**：全圖面積上限約 **1 百萬像素（1 MP）**——超過才等比縮（`magick … -resize "1000000@>"`，不放大）；夠看、夠 zoom，又不讓 repo 膨脹。
- **品質建議**：
  - 截圖（DOS 256 色／像素）→ WebP **無損或近無損**（檔案本就很小）。
  - 盒裝／說明書／廣告（照片、掃描）→ WebP **lossy q≈80**。
  - 縮圖 → 寬約 **360px**、q≈75，放 `thumb/`。
- **工具**：`cwebp` 或 `magick`（兩者皆已安裝）；自動化規劃為 `scripts/process_media.mjs`（待實作，過渡期手動）。

> **WebP vs tinified JPG**：同畫質 WebP 通常小 25–35%，且支援透明與無損（截圖划算）；tinified JPG 僅勝在古董相容性，對本站無意義。原始掃描以原格式存 archive，交付一律轉 WebP。

## 7. 版控與檔案大小

- WebP 體積小（盒掃 q80 約 50–150KB、縮圖約 10–20KB），**直接 commit 即可**。
- `.gitignore`：`raw/media/` 比照 raw gitignore；`public/media/` 進版控。
- **若日後圖庫膨脹**才考慮 Git LFS——但注意：GitHub Pages 需在 Actions 的 `actions/checkout` 設 `lfs: true` 才會把 LFS 內容部署出去（否則只拿到指標檔）。非必要先不導入。

## 8. 實作待辦（follow-up，本文僅規範、尚未實作）

- [ ] `schema/game.schema.mjs`：加 `media[]`（含 `slot`/`order`/`gallery`/`cover`）。
- [ ] `data/media-sources.json`：來源簡碼 registry（已建初版，URL 待補）。
- [ ] `scripts/validate_content.mjs`：檢查 `media[].src` 檔案存在、`source` 必填且在 registry 內、至多一張 `cover`。
- [ ] rehype 外掛：解析正文 `media:<src>{align=…}` 嵌入語法（從內容檔路徑取 id）。
- [ ] 元件：`Gallery.astro`（分類 grid）＋ lightbox（輕量 JS）＋ infobox 封面；`/games/[id]` 的 `og:image` 改用 cover；圖說展開來源簡碼。
- [ ] 腳本：`scripts/process_media.mjs`（讀 `raw/media/_inbox/` → 依檔名解析 id/kind/source/caption → WebP 全圖＋縮圖入 `public/media/games/<id>/` → 原圖搬 archive＋manifest → 印出／寫入 `media[]` 片段 → 清空 inbox）。
- [ ] `CLAUDE.md` 關鍵慣例加一行指向本文。
- [x] 公司／人物 `media[]`（logo/portrait→infobox、圖庫、lightbox）；多款代理廣告以 `games:[…]` 聚合到各遊戲頁（見 §5.5）。
