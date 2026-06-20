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

- [ ] **`/companies` 索引納入已發佈 profile**（2026-06-20）：目前廠商索引由「有已發佈遊戲的廠商」驅動，導致已 `published` 但尚無已發佈遊戲的公司頁（智冠/華義/天堂鳥/歡樂盒/精訊/第三波）不出現在索引、只能靠直連到達。考慮把索引改成 union「已發佈遊戲聚合 ∪ 已發佈 company md」（count 可能為 0，需處理呈現）。同理 people/teams 目前無索引頁。
- [x] **設計專屬的 404 page**（2026-06-20）：`src/pages/404.astro` 完成——CRT 終端風（掃描線/磷光/暗角）＋ DOS 錯誤訊息＋ base-aware 復原連結。
- [ ] **大宇長產品目錄表遷成 `/topics`**（2026-06-20）：`content/companies/大宇.md` 內嵌的 G/A 系列產品目錄表很長，依 IA 規範（`docs/information-architecture.md`）應遷成 `/topics/大宇資訊產品目錄`，公司頁改放「專題」連結。需先實作 `topics` 類型（events/topics 尚未落地）。

## 資料

- [ ] 補新條目 metadata（合併進來的 developer/genre/content_language 多為 null）
- [x] 併 OfflineList：465 款標 provenance、新款入 catalog（→4102）、200 張圖已下載；base-match 40 筆人工裁決完（38 併/2 新增，`derived/offlinelist-basematch-worklist.md`）
- [ ] OfflineList 新款正名：offlinelist 獨有款用 s2tw 自動繁名（`name_zh_hant` 草稿），少數字形誤選（撲克/彩球類）須人工正名；補 developer/region/genre
- [ ] 既有條目正名（worklist note 拾遺）：cdg-0977「吞食天地1三國外傳」應正為「吞食天地 三國外傳」（無第2作不需編號）；類似初代裸名 vs N1 編號可一併清。fuzzy 第二批 note 補：cdg-3265「炎龍騎士團2：黃金城之秘」應為「…黃金城之謎」（秘→謎）；cdg-1883「軒轅劍2外傳：楓之舞」考慮正為「軒轅劍外傳 楓之舞」；cdg-3737「魔法門之英雄無敵1」副標「：戰略任務」；cdg-2261「黃飛鴻－鐵雞鬥蜈蚣」去破折號
- [x] 併 OfflineList fuzzy 批（2026-06-17）：120 + 第二輪 18 筆經 `derived/offlinelist-fuzzy-worklist.md` / `…-round2-worklist.md` 裁決 → 78 併/41 新增/1 合集（→4144）。worklist 已改用 prefix/contains 列副標手足（採前批教訓）。第一輪暫列新增、第二輪複核維持新增：英雄戰記(≠cdg-3445)、銀河守衛團(≠cdg-2894)、瘋狂麻將(≠cdg-2807)；合集 天使們的午後 合集2 已收（發表時再定上架）
- [x] review queue 全數清空（freeze v0.2.0，2026-06）：merge-review.json 2105→0、58 筆未決一併裁決，過程見 git 史與 `derived/phase5-*-decisions.json`
- [ ] MobyGames 補英文原名/封面/年（需 API key）
- [ ] **廠商↔遊戲↔系列 對照校訂（使用者 2026-06-18 指出有不少錯誤，未急於處理）**：`developer`/`publisher_tw` 字串歸屬、`series` 前綴歸組（如三國志過度聚合外傳、成吉思汗併蒼狼與白鹿）等對照關係需人工複核校正；屬資料層校訂，與站台呈現機制無關
- [x] 編輯內容 seed（2026-06-18）：11 廠商 + 10 系列簡介（web 查證 draft，`content/companies/*.md`、`content/series/*.md`）；含新增系列 明星志願/美少女夢工場/成吉思汗(蒼狼與白鹿)/天使帝國。簡介為 draft 待使用者校訂
