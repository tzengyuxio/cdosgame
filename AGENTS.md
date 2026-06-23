# Repository Guidelines

## 專案結構與模組

本專案以 Astro 5 建置中文 DOS 遊戲資料庫。`content/` 是條目正本，依 `games/`、`companies/`、`series/`、`teams/`、`people/`、`topics/` 分類；遊戲檔名使用 `cdg-NNNN.md`。`schema/` 定義 Zod schema，`src/pages/` 放路由，`src/components/`、`src/layouts/`、`src/lib/` 與 `src/styles/` 分別放 UI、版型、共用邏輯與 CSS。公開資產位於 `public/`；來源原稿放 `raw/`，決策資料放 `data/`，設計說明放 `docs/`。

## 建置、測試與本機開發

- `npm install`：依 `package-lock.json` 安裝相依套件。
- `npm run dev`：啟動本機站台，預設為 `http://localhost:4321`。
- `npm test`：以 Node.js test runner 執行 `src/lib/**/*.test.js`。
- `npm run validate`：驗證所有 content frontmatter 是否符合 schema。
- `npm run build`：產生正式靜態站至 `dist/`；提交前應執行。
- `npm run preview`：預覽已完成的 production build。

`content/games/*.md` 自 v0.2.0 起是正本。不要執行已退役的 `scripts/build_content.py`，它會覆寫人工修改。

## 程式風格與命名

JavaScript、TypeScript、Astro 使用 2 空格縮排與分號，Python 使用 4 空格；沿用鄰近檔案的引號與排版。元件採 `PascalCase.astro`，函式與變數採 `camelCase`，測試命名為 `*.test.js`。新增內容類型前，先更新 `schema/<type>.schema.mjs`、`src/content.config.ts` 及相關文件。專案未配置獨立 linter；以測試、schema 驗證和 production build 為準。

## 測試準則

修改 `src/lib/` 時，新增相鄰的 Node `test()` 案例，涵蓋正常輸入、空值及排序／分組邊界。內容異動至少跑 `npm run validate`；頁面、schema 或建置設定異動另跑 `npm run build`。目前未設硬性 coverage 門檻，重點是為每個行為變更加入可重現的回歸測試。

## Commit 與 Pull Request

Commit 採 Conventional Commits 風格，例如 `feat(refs): add backlinks`、`fix(ui): correct heading indent`、`content(games): add verified entries`。每個 commit 聚焦單一邏輯變更，勿納入 `.DS_Store`、`node_modules/` 或未授權媒體。PR 應說明動機與變更範圍、列出驗證命令、連結相關 issue；視覺變更附前後截圖，內容考據則附來源或 provenance。
