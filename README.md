# 中文 DOS 遊戲資料庫（cdosgame）

盡可能完整收錄 DOS 時代（與周邊早期平台）**中文遊戲**的結構化資料庫——偏百科／工具書，重在**齊全**與**考據**，台灣產品導向。

🔗 **線上瀏覽：https://cdosgame.simagame.me/**

## 是什麼

- 每款遊戲一個純文字檔（`content/games/cdg-NNNN.md`，YAML frontmatter + 考據正文），git-backable、可開放 PR 貢獻。
- 以 [Astro](https://astro.build/) Content Collections + Zod 驗證建置為靜態站，部署於 GitHub Pages。
- 除遊戲外，另有廠商、系列、開發團隊、人物、主題等實體頁，彼此交叉連結。
- 封面、廣告、地圖、攻略等掃描圖片建有 media 圖庫（已版控的縮圖在 `public/media/`，原圖另存）。

## 目前規模

截至 2026 年 7 月底（v0.7.0）：

- **遊戲** 已發佈考據正文 2558 款（涵蓋於 catalog 全部 3941 款已知／候選條目之中，其餘待補）
- **實體頁** 廠商 48、系列 46、團隊 3、人物 29、主題 18
- **圖片** 2476 張（1086 款遊戲，約 479 MB）

（數字隨進度變動，最新值跑 `npm run stats`。）

## 收錄原則

- 每筆可查證、附 provenance（來源出處）。
- 台灣產品導向：catalog 只留台灣發行／代理的版本。
- 缺資料用 `null` 標記、不剔除；存疑處標明待考、不杜撰。
- 中文化分級：原生中文／中文化／中文包裝／外文（`localization_level`）。
- 發行確定性以 `release_status` 標（已發行／未發行／發行存疑）；有公開產品足跡但未上市的作品亦收錄，條目頁以標籤標明。
- 發行年預設記台灣發行年；採用其他依據時以 `year_basis` 標明來由，只知約略年則標 `year_precision`。
- 條目的著錄規則（標題定名、欄位對應、各項標記）另見站上的[編輯凡例](https://cdosgame.simagame.me/about/conventions)，以及 `docs/id-policy.md`。

## 開發

```bash
npm install
npm run dev        # 本機預覽 (http://localhost:4321)
npm run validate   # 用 Zod 驗證所有 content frontmatter
npm run stats      # 內容／圖片／完整度統計總覽
npm run build      # 產生靜態站到 dist/
```

推送到 `main` 會由 GitHub Actions 自動建置並部署到 GitHub Pages。

> 開發狀態：v0.2.0 起 `content/games/*.md` 為正本、直接編輯（早期的 pipeline 已退役）。撰寫條目的流程與房屋風格見 `.claude/skills/game-entry/`；資料架構見 `docs/information-architecture.md`。

## 資料來源與授權

內容綜合自公開的遊戲說明書、雜誌掃描、考據部落格、維基百科、青衫之友、Fandom 等，並逐筆標註出處。站上顯示的策展圖片（`public/media/`）依百科慣例標註來源後使用，每張都記 `source`；來源站抓取的原圖與掃描原檔僅留在本機 `raw/`、不納入版控。
