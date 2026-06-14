# Backlog

想到但還沒要做的事。隨手記，不排優先序；要動工時再評估。

格式：`- [ ] 標題 — 一句說明`（完成或捨棄就刪掉或打勾）。

## 站台功能

- [ ] **使用者回饋 / 建議修改機制**（2026-06-15 提出）
  目標：讓使用者看到「想更新的部分」能回饋，最好能直接提供修改。本庫是 **git-backed 純文字 markdown**，所以幾種做法天然契合：
  - **編輯連結（最低成本）**：每頁放「在 GitHub 編輯此頁」連結，指向該 `content/games/cdg-NNNN.md`，使用者按了直接走 GitHub fork→PR 流程（考據/勘誤變成 PR，可審後合併）。
  - **建議修改表單**：輕量 issue 模板 / Giscus / utterances（用 GitHub Discussions/Issues 當留言後端，靜態站友善）。
  - **留言**：Giscus（GitHub Discussions）或 Disqus（較重、隱私差）。
  - **部分更改**：欄位級的「回報錯誤」按鈕 → 預填 issue（帶 id + 欄位）。
  考量：審核流程（呼應 `published` 閘與人工審核精神）、防濫用、與 `data/` 生成流程如何回灌（PR 改 content/ 還是改 derived/？content 是生成物，見 astro-handoff）。

## 資料

- [ ] 補新條目 metadata（191 筆合併進來的 developer/genre/content_language 多為 null）
- [ ] 審 review 佇列 `derived/merge-review.json`（58 筆未決 + 低信心）
- [ ] MobyGames 補英文原名/封面/年（需 API key）
