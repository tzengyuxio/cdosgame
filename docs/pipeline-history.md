# Pipeline 歷史（🧊 已退役 / 僅供回溯）

> 本文記錄 freeze 前的生成流程，保留供考據回溯。**v0.2.0 起（2026-06）content/games/*.md 為正本，重跑 `build_content` 會覆寫手改。** 若真要重建（極少數情況），須先確認尚無手改 frontmatter。日常編輯請直接改 `content/games/cdg-NNNN.md`，見 CLAUDE.md 與 skill `game-entry`。

## 生成流程

`scripts/`：`parse_chiuinan` → `enrich_chiuinan` → `parse_extra_sources` / `parse_softworld` / `parse_offlinelist` → `map_chiuinan_screenshots` → `build_master`（產 `derived/master-list.json`）→ `merge_sources --write`（讀 `data/merge-decisions.json`，產 `derived/master-list.merged.json` + `merge-review.json`）→ `build_content`（讀 merged 優先，產 `content/games/*.md` + `data/id-registry.json`）。

合併審閱：`review_merge.py`（互動 CLI，決策存 `data/merge-decisions.json`）。

**手動新增款（來源整併層）**：在 `data/basematch-decisions.json` 加一筆 `"<候選名>": {"action":"append","fields":{…}}`，`fields` 給**新款**的初始 frontmatter 欄位（`title_aliases`/`year`/`developer`/`publisher_tw`/`genre`/`localization_level`/`license_status`/`release_codes`/`external_links`/`provenance`…），由 `merge_sources.apply_basematch()` 套用——用於「來源已有但被 fuzzy guard 擱在 review 佇列」或要自訂編號/外連的**新**款（如 cdg-4154 中國之心）。`action` 另有 `merge`（把候選併入既有 id：`{"action":"merge","target":"cdg-NNNN","prov":"<src>@merge"}`，候選名加為 target 的 alias，`prov` 記來源、預設 `offlinelist@cndosgames`）/`reject`（剔除、出 review 佇列）。append 比 merge 先處理，故 merge 可指向 append 新建的 id。此檔是 base-match 比對決策，**不要拿來改既有款的欄位**。triage 工具 `triage_basematch.py`（讀 merge-review 的 `base-matches-N-master`，算系列號是否已存在，產 `derived/basematch-triage.md` worklist + `basematch-phase3-draft.json` 草案）。

**補既有款的 frontmatter（如外部連結）**：用 `data/overrides.json`，**以 id 為鍵**：`{"cdg-NNNN": {"external_links": {…}, …}}`，由 `build_content` 套用（與 `publish-state.json` 同模式、生成物之外、重跑不掉）；`external_links` 併入既有 map、其他欄位覆寫（如 cdg-1263 滅）。直接改 `content/games/*.md` 的 frontmatter 會被 `build_content` 重生覆寫（正文會保留），所以要持久就走 overrides。

改完跑 `merge_sources --write → build_content → npm run validate`（純改 `overrides.json` 可只跑 `build_content → npm run validate`）。

## 圖片抓取

`fetch_rwv_covers` / `fetch_fandom_images` / `fetch_chiuinan_screenshots` / `fetch_offlinelist_images`（下載到 `raw/**/img/`，gitignored，附 manifest）。
