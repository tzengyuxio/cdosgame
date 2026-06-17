# Astro 站台開發須知（handoff）

開 Astro 站台前必讀。資料庫已就緒（4144 款），這份記錄踩坑與接法。

## 現狀快照

- **catalog**：`content/games/cdg-NNNN.md`，**4144 款**，YAML frontmatter，全數通過 Zod。
- **schema**：`schema/game.schema.mjs`（Zod）+ `schema.md`（欄位文件）。
- **id 規則**：`docs/id-policy.md`（cd<type>-NNNN、一 id 一款、registry 真相）。
- **pipeline**：`build_master → merge_sources --write → build_content`（見 CLAUDE.md）。

## ⚠ 最大的坑：content/ 是「生成物」，不是手寫

`content/games/*.md` 由 `scripts/build_content.py` 從 `derived/master-list.merged.json` **整檔生成**（含 frontmatter 與空白正文）。**重跑會覆寫整個檔，包括正文。**

→ 若 Astro 要放編輯性內容（簡介/評論/考據），**不要直接寫進 `content/games/*.md` 正文**，否則下次重跑被清掉。三個選項，開站前先決定：
1. **凍結生成**：合併完成後不再跑 build_content，content/ 變手動維護的真相。（簡單，但失去可重生）
2. **正文分離**：編輯內容放另一處（如 `content/notes/cdg-NNNN.md` 或 frontmatter 的 `summary` 欄），build_content 只管結構欄位、保留/不碰正文。需改 build_content 成「merge 而非覆寫正文」。
3. **build_content 保留正文**：改成讀舊檔正文、只更新 frontmatter。（推薦，保留可重生 + 可編輯）

**建議選 2 或 3**，並在動 Astro 前先改好 build_content，免得辛苦寫的簡介被洗掉。

## ⚠ 圖片是 gitignored — 全新 clone 沒有圖

`raw/**/img/` 全部 gitignore（rwv 封面 40MB、chiuinan 截圖 430MB、fandom 33MB）。frontmatter 的 `images.*` / `cover` 指向這些**本機路徑**，**新環境 clone 後不存在**。

→ 站台圖片策略（開站前決定）：
- 來源在各 manifest（`raw/*/img/*-manifest.jsonl`）有 URL，可重新下載或直連。
- **授權**（公開顯示前務必確認）：
  - rwv 封面：**再散布有疑慮**，勿直接 host。
  - Fandom 圖：CC-BY-SA，需**署名**。
  - chiuinan 截圖：個人站、無明示授權。
- 安全做法：站台先**不公開圖**或只連原站；要自 host 先解決授權。

## Astro Content Collections 接法

`schema/game.schema.mjs` 用標準 `zod`。Astro 用 `astro:content` 的 `z`：

```ts
// src/content.config.ts
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { gameSchema } from '../../schema/game.schema.mjs';  // 或把 schema 複製/改 import
export const collections = {
  games: defineCollection({ loader: glob({ pattern: '*.md', base: './content/games' }), schema: gameSchema }),
};
```
- `gameSchema` 形狀可直接用；若 import 'zod' 與 'astro:content' 的 z 衝突，把 schema 內容複製進 config 用 astro 的 z（欄位定義不變）。
- frontmatter 已對齊 schema，`astro build` 會用同一份規則驗。

## 發布閘 published（dev 全看、prod 只看已發布）

- 每筆有 `published` 欄（預設 **false**）。狀態存在 **`data/publish-state.json`**（生成物外，重跑不重置），由 `build_content` 寫進 frontmatter。
- 逐筆審核後 flip：`python3 scripts/publish.py cdg-0001 cdg-0042 ...`（`--off` 取消、`--list` 列出）→ 再跑 `build_content`。
- **Astro 過濾**：prod build 只收 `published === true`，dev 顯示全部。例：
  ```ts
  const all = await getCollection('games');
  const visible = import.meta.env.PROD ? all.filter(e => e.data.published) : all;
  ```
- 目前 4144 筆**全為 false**（沒東西會上 prod，直到你逐步審核發布）。要整批發佈已驗證的骨幹可一次寫進 publish-state.json。

## 資料特性（UI 要能容錯）

- **大量 null**：~310 筆合併新條目的 developer/content_language/genre 多為 null；舊條目部分欄位也 null。UI 與篩選要處理缺值。
- **可篩維度**：`localization_level`(A/B/D/foreign/null)、`developer_region`、`content_language`、`genre`、`license_status`、`year`(含 >2004 收集邊界外)。
- **收集 ≠ 展示**：scope 定義收集到 2004+，但要不要全展示是站台決定（可用 year 篩）。
- `references`（omega/fandom 外連）、`release_codes`（軟體世界編號）可做考據展示。

## 重生指令備忘

```
python3 scripts/build_master.py
python3 scripts/merge_sources.py --write      # 讀 data/merge-decisions.json
python3 scripts/build_content.py              # 優先讀 master-list.merged.json
npm run validate
```

## 待辦（非阻塞）

- review 佇列 `derived/merge-review.json` 還有 ~2106 筆低信心候選，日後可再審（`review_merge.py`）。
- 新條目 metadata 補完（developer/genre/content_language）。
