# 中文 DOS 遊戲資料庫（cdosgame）

盡可能完整收錄 DOS 時代（與周邊早期平台）**中文遊戲**的結構化資料庫——偏百科／工具書，重在**齊全**與**考據**，台灣產品導向。

🔗 **線上瀏覽：https://tzengyuxio.github.io/cdosgame/**

## 是什麼

- 每款遊戲一個純文字檔（`content/games/cdg-NNNN.md`，YAML frontmatter + 考據正文），git-backable、可開放 PR 貢獻。
- 以 [Astro](https://astro.build/) Content Collections + Zod 驗證建置為靜態站，部署於 GitHub Pages。
- 除遊戲外，另有廠商、系列、開發團隊、人物等實體頁，彼此交叉連結。

## 收錄原則

- 每筆可查證、附 provenance（來源出處）。
- 台灣產品導向：catalog 只留台灣發行／代理的版本。
- 缺資料用 `null` 標記、不剔除；存疑處標明待考、不杜撰。
- 中文化分級：原生中文／中文化／中文包裝／外文（`localization_level`）。

## 開發

```bash
npm install
npm run dev        # 本機預覽 (http://localhost:4321)
npm run validate   # 用 Zod 驗證所有 content frontmatter
npm run build      # 產生靜態站到 dist/
```

推送到 `main` 會由 GitHub Actions 自動建置並部署到 GitHub Pages。

> 開發狀態：v0.2.0 起 `content/games/*.md` 為正本、直接編輯（早期的 pipeline 已退役）。撰寫條目的流程與房屋風格見 `.claude/skills/game-entry/`；資料架構見 `docs/information-architecture.md`。

## 資料來源與授權

內容綜合自公開的遊戲說明書、考據部落格、維基百科、青衫之友、Fandom 等，並逐筆標註出處。封面與截圖等圖片資產有版權限制、未納入版控。
