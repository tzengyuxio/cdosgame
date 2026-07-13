# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 專案是什麼

「中文 DOS 遊戲資料庫」（cdosgame）——盡可能完整收錄 DOS 時代（與周邊早期平台）中文遊戲的**結構化資料庫**。

核心定位：偏百科／資料庫式工具書，重在**齊全**與**考據**，不是版面。資料是 git-backable 的純文字檔，餵給 Astro 靜態站，也可能進 wiki 或開放 PR 貢獻。

- 規格來源（必讀）：vault 的 `中文 DOS 遊戲資料庫 kickoff.md`（`~/Documents/Obsidian Vault/`）；底稿 `中文 DOS 遊戲的終極寶典.md`、主筆記 `台灣中文 DOS 遊戲百科.md`。
- 分工：本庫收**有可考據公開產品足跡**的遊戲（有名字/報導/廣告/發行計畫即收），發行確定性用 `release_status` 標（見 `scope.md` §5）；純內部構想（無公開足跡）歸 vault 的 `幻之未發表遊戲.md`。

## 目前狀態

> 🧊 **FROZEN（v0.2.0 起，2026-06）：content/games/*.md 為正本，直接編輯。** `build_content` 退役、不要再跑（會覆寫手改的 frontmatter）。改資料＝直接改 `content/games/cdg-NNNN.md`，驗證跑 `npm run validate`。新增款＝手建 `content/games/cdg-NNNN.md`（手選下一個未用 id，並在 `data/id-registry.json` 補登）。

完整現狀（catalog 4507 款、schema 定案、Astro 站已上線、發布閘等）見 project memory `project-state`。收料/合併/freeze 的**歷史 pipeline** 見 `docs/pipeline-history.md`（已退役，僅供回溯）。

**日常工作都是「直接編檔」**：補年代/開發商（外部如 MobyGames）、genre 分類、考據正文（body）、圖片、修少數 LLM 誤判。**撰寫/補一則遊戲條目**（研究→填 frontmatter→寫正文→引用/附錄→驗證→發佈）的完整流程、房屋風格、易錯點見 skill `.claude/skills/game-entry/`，直接打 `/game-entry <遊戲名|cdg-NNNN>` 觸發。

## 關鍵慣例

- **頁面/資料架構（新增頁面類型前必讀）**：`docs/information-architecture.md`（站上有哪些頁面類型 games/companies/series/teams/people/events/topics、slug 與路由通則、跨實體連結方式）。公司頁細則見 `docs/company-pages.md`、遊戲 id 規則見 `docs/id-policy.md`。
- **schema 是唯一權威**：欄位定義與所有 enum（含 `localization_level`、`genre`）一律以 `schema.md` + `schema/game.schema.mjs`（Zod）為準，勿在別處另記一份（易 drift）。genre 分類判準另見 `docs/genre-taxonomy.md`。
- **收錄範圍**：時間/平台、中文化分級、自製vs商業、地域等判準均已定案，見 `scope.md`。
- **raw（原封）/ derived（提煉）/ content（catalog）** 三層；raw 圖檔與 `node_modules` gitignored，manifest 與 content md 進版控。收料落地慣例（provenance、刪檔陷阱）見 `sources.md` 末段。
- **id 穩定**：`data/id-registry.json` append-only，key 用 catalog_id 或 title+developer（不用會變動的 year）。
- 驗證 `npm run validate`（Zod 驗 content frontmatter）；統計 `npm run stats`（`-- --content` / `--images` / `--completeness`）。

**原則：每筆可查證、附 provenance；台灣產品導向（catalog 只留台灣發行/代理）；缺資料用 null 不剔除。**

## 研究流程與大檔查法

研究會把大量外部內容（WebFetch/WebSearch、`raw/` 傾印、平行 agent 回傳）帶進 context。以下做法讓主線保持精簡、落檔可靠：

- **研究進 subagent、主線不讀原始傾印**：大量抓網頁／讀 `raw/` 的研究用 Task／subagent 做，只回傳「結構化事實＋來源 URL」，主線核對後才寫。原始網頁／大 HTML 留在 subagent 的 context，主線不必載入。研究 subagent 只需 web＋唯讀工具，不給寫檔／`git push`。
- **讀 derived 摘要，不 curl 大傾印**：要 chiuinan 介紹頁連結時，`grep` **`derived/chiuinan-intro-links.tsv`**（catalog_id／中文名 → intro_url），**不要**去 curl／grep 693KB 的 `raw/chiuinan/list-1.htm`。其他大 `raw/` 傾印同理，優先讀 `derived/` 摘要；需要新摘要就先寫個 `scripts/` 預處理腳本產到 `derived/`，再讀。
- **大檔用 jq/rg 查、勿整檔 Read**：`data/id-registry.json`（約 1MB／4.5 萬行）等大檔不要用 `Read`/`cat` 整檔載入 context——會佔滿一大塊 context 且沒必要。查單筆用 `jq '.ids["cdg-NNNN"]'`、找位置用 `rg -n`、看小段用 `sed -n 'A,Bp'`、改單筆用 `Edit` 精準 old_string。檔案本身不慢（jq 全解析 0.02s），瓶頸只在「整檔進 context」，別為此改資料結構。
- **落檔前用 git 驗證**：宣稱「完成」前跑 `git status`／`git diff` 看實際改了什麼，別憑印象回報（長 session 尤其）。改完 `genre` 等 enum 欄位後，跑 `npm run validate` 或 `Read` 回該行確認實際寫入值（曾有 `genre: TAB` 這種無效值寫入卻漏掉）。

## 來源與授權

種子來源盤點/分級/狀態見 `sources.md`（cn-dos-games.fandom.com、巴哈姆特、PTT old-games、對岸老遊戲站、archive.org/abandonware、廠商官方/維基、中文遊戲史專書等）。

⚠ **授權風險**：`rwv/chinese-dos-games` 的 `games.json` 含 `zh-Hant` 名稱、可當匯入起點，但其授權主張**在查證中被否決**；匯入 `games.json` 或封面資產前，務必先確認 license 與再散布的版權風險。
