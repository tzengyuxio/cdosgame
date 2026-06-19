# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 專案是什麼

「中文 DOS 遊戲資料庫」（cdosgame）——盡可能完整收錄 DOS 時代（與周邊早期平台）中文遊戲的**結構化資料庫**。

核心定位：偏百科／資料庫式工具書，重在**齊全**與**考據**，不是版面。資料設計成**平台中立**——是 git-backable 的純文字檔案，日後可餵給 Astro 靜態站，也可能進 wiki 或開放 PR 貢獻。

延續 Obsidian vault 既有底稿：
- 規格來源（必讀）：`~/Documents/Obsidian Vault/中文 DOS 遊戲資料庫 kickoff.md`
- 內容底稿：`中文 DOS 遊戲的終極寶典.md`（目前僅構想，條目待補）
- 主筆記：`台灣中文 DOS 遊戲百科.md`
- 分工：本庫只收**有實際發行**的遊戲；未發行者歸 `幻之未發表遊戲.md`。

## 目前狀態

> 🧊 **FROZEN（v0.2.0 起，2026-06）：content/games/*.md 為正本，直接編輯。** collect-first
> 完成、review 佇列清空（2105→0）、來源 enrich 已榨乾。**`build_content` 退役、不要再跑**
> （會覆寫手改的 frontmatter）。pipeline scripts 與 `data/*-decisions.json`、`overrides.json`
> 原地保留為歷史/考據紀錄。改資料＝直接改 `content/games/cdg-NNNN.md`；驗證仍跑 `npm run validate`。
> 新增款＝手建 `content/games/cdg-NNNN.md`（手選下一個未用 id，並在 `data/id-registry.json` 補登）。

**策略（已完成）：collect-first（先收料，再反推 schema）。** 已從來源站抓清單/資料/圖片到本地，比對拼湊主清單，反推出正式 schema，並整合所有來源候選。

進度：
1. `scope.md` — 收錄準則（✅ 已拍板）
2. `sources.md` — 來源盤點/分級/狀態（✅）；`derived/cross-reference.md` — 多源覆蓋報告
3. `schema.md` + `schema/game.schema.mjs`（Zod）— ✅ schema-on-read 定案
4. `content/games/cdg-NNNN.md` — ✅ **4507 款 catalog**（每款一檔，YAML frontmatter，Astro Content Collections 佈局），全數通過 Zod 驗證
5. 來源合併 review 佇列 — ✅ **2105→0 全部裁決**（accept/merge/reject/append；過程見 git 史與 `derived/phase5-*-decisions.json`）→ **FROZEN**

下一步全是「直接編檔」的活：補年代/開發商（外部如 MobyGames）、genre 分類、考據介紹（body）、圖片、修少數 LLM 誤判。

### Pipeline（🧊 已退役 / 歷史參考，**勿再跑 `build_content`**）

> 以下為 freeze 前的生成流程，保留供考據回溯。**v0.2.0 起 content 為正本，重跑 `build_content` 會覆寫手改。** 若真要重建（極少數情況），須確認尚無手改 frontmatter。

`scripts/`：`parse_chiuinan` → `enrich_chiuinan` → `parse_extra_sources` / `parse_softworld` / `parse_offlinelist` → `map_chiuinan_screenshots` → `build_master`（產 `derived/master-list.json`）→ `merge_sources --write`（讀 `data/merge-decisions.json`，產 `derived/master-list.merged.json` + `merge-review.json`）→ `build_content`（讀 merged 優先，產 `content/games/*.md` + `data/id-registry.json`）。
合併審閱：`review_merge.py`（互動 CLI，決策存 `data/merge-decisions.json`）。
**手動新增款（來源整併層）**：在 `data/basematch-decisions.json` 加一筆 `"<候選名>": {"action":"append","fields":{…}}`，`fields` 給**新款**的初始 frontmatter 欄位（`title_aliases`/`year`/`developer`/`publisher_tw`/`genre`/`localization_level`/`license_status`/`release_codes`/`external_links`/`provenance`…），由 `merge_sources.apply_basematch()` 套用——用於「來源已有但被 fuzzy guard 擱在 review 佇列」或要自訂編號/外連的**新**款（如 cdg-4154 中國之心）。`action` 另有 `merge`（把候選併入既有 id：`{"action":"merge","target":"cdg-NNNN","prov":"<src>@merge"}`，候選名加為 target 的 alias，`prov` 記來源、預設 `offlinelist@cndosgames`）/`reject`（剔除、出 review 佇列）。append 比 merge 先處理，故 merge 可指向 append 新建的 id。此檔是 base-match 比對決策，**不要拿來改既有款的欄位**。triage 工具 `triage_basematch.py`（讀 merge-review 的 `base-matches-N-master`，算系列號是否已存在，產 `derived/basematch-triage.md` worklist + `basematch-phase3-draft.json` 草案）。
**補既有款的 frontmatter（如外部連結）**：用 `data/overrides.json`，**以 id 為鍵**：`{"cdg-NNNN": {"external_links": {…}, …}}`，由 `build_content` 套用（與 `publish-state.json` 同模式、生成物之外、重跑不掉）；`external_links` 併入既有 map、其他欄位覆寫（如 cdg-1263 滅）。直接改 `content/games/*.md` 的 frontmatter 會被 `build_content` 重生覆寫（正文會保留），所以要持久就走 overrides。
改完跑 `merge_sources --write → build_content → npm run validate`（純改 `overrides.json` 可只跑 `build_content → npm run validate`）。
圖片：`fetch_rwv_covers` / `fetch_fandom_images` / `fetch_chiuinan_screenshots` / `fetch_offlinelist_images`（下載到 `raw/**/img/`，gitignored，附 manifest）。
驗證：`npm run validate`（Zod 驗 content frontmatter）。

### 關鍵慣例

- **raw（原封）/ derived（提煉）/ content（catalog）** 三層；raw 圖檔與 `node_modules` gitignored，manifest 與 content md 進版控。
- **id 穩定**：`data/id-registry.json` append-only，key 用 catalog_id 或 title+developer（不用會變動的 year）。
- 收料落地慣例（provenance、刪檔陷阱）見 `sources.md` 末段。

**原則：每筆可查證、附 provenance；台灣產品導向（catalog 只留台灣發行/代理）；缺資料用 null 不剔除。**

## 範圍界定（待決議的維度）

寫 `scope.md` 時逐一決定並記錄判準，這些都還沒拍板：
- **時間／平台**：純 DOS，還是往前收 Apple ][ / PC-98、往後收 Windows 3.1/95 中文遊戲？以「年代」還是「能在 DOS/早期 PC 跑」為界？
- **中文化定義**（關鍵，**已定案**）：用 `localization_level` 欄位分級，schema enum 為 **`native` / `localized` / `packaging` / `foreign`**（顯示標籤見 `src/lib/labels.js`；值由 `build_master.classify_localization()` derive）：
  - `native` 原生中文：原生中文開發（大宇、智冠、漢堂、精訊…）
  - `localized` 中文化：官方中文版／代理中文化
  - `packaging` 中文包裝：僅包裝／說明書中文，遊戲內仍英文
  - `foreign` 外文遊戲：收錄但無中文化
  - ⚠ 草案曾列「C 民間漢化補丁」，**已捨棄**——非商業發行，不另立等級；民間漢化補丁改記在 `external_links`（遊戲本體依包裝情況標 `packaging` 或 `foreign`，如 cdg-4154 中國之心）。
- **地域**：台／港／中／星馬？簡繁？
- **自製 vs 商業**：同人／自製收不收？

## 資料 Schema 草案

以寶典既列欄位（發行年、廠商、類型、平台需求、簡介、評價、截圖）為基礎擴充：

```
id / title(中) / title_aliases(英、別名、原名) / year / vendor / developer /
genre / platform_requirements / region / language / localization_level /
summary / review / screenshots / sources[](來源 + 可信度分級) / completeness
```

格式須**利於 build-time 驗證**——對齊 Astro 的 Content Collections + Zod（每筆資料一個檔，schema 用 Zod 驗）。

## 種子來源（待盤點分級可信度）

寫 `sources.md` 時至少評估，並標出哪些可機器擷取、哪些需人工：
cn-dos-games.fandom.com（先看它收了哪些、欄位怎麼定）、巴哈姆特、PTT old-games、對岸老遊戲站、archive.org / abandonware、各廠商官方／維基資料、中文遊戲史專書文章。

⚠ **授權風險**：`rwv/chinese-dos-games` 的 `games.json` 已含 `zh-Hant` 名稱欄位、可當匯入起點，但其授權主張**在查證中被否決**。匯入 `games.json` 或封面資產前，務必先確認 license 與再散布的版權風險。
