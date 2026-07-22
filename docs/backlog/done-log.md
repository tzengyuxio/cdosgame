# Backlog 完成史（封存）

從根 `BACKLOG.md` 結案後搬來的項目，保留結果指紋供回溯 pipeline／決策時查閱。唯讀歸檔，git history 為正本。

> 註：kudgame 佇列的完成史另在 `kudgame-done-log.md`。

## 站台功能

- [x] **設計專屬的 404 page**（2026-06-20）：`src/pages/404.astro` 完成——CRT 終端風（掃描線/磷光/暗角）＋ DOS 錯誤訊息＋ base-aware 復原連結。

## 資料

- [x] 併 OfflineList：465 款標 provenance、新款入 catalog（→4102）、200 張圖已下載；base-match 40 筆人工裁決完（38 併/2 新增，`derived/offlinelist-basematch-worklist.md`）
- [x] 併 OfflineList fuzzy 批（2026-06-17）：120 + 第二輪 18 筆經 `derived/offlinelist-fuzzy-worklist.md` / `…-round2-worklist.md` 裁決 → 78 併/41 新增/1 合集（→4144）。worklist 已改用 prefix/contains 列副標手足（採前批教訓）。第一輪暫列新增、第二輪複核維持新增：英雄戰記(≠cdg-3445)、銀河守衛團(≠cdg-2894)、瘋狂麻將(≠cdg-2807)；合集 天使們的午後 合集2 已收（發表時再定上架）
- [x] review queue 全數清空（freeze v0.2.0，2026-06）：merge-review.json 2105→0、58 筆未決一併裁決，過程見 git 史與 `derived/phase5-*-decisions.json`
- [x] 編輯內容 seed（2026-06-18）：11 廠商 + 10 系列簡介（web 查證 draft，`content/companies/*.md`、`content/series/*.md`）；含新增系列 明星志願/美少女夢工場/成吉思汗(蒼狼與白鹿)/天使帝國。簡介為 draft 待使用者校訂
- [x] **統一廠商名稱「富士通」／「FUJITSU」**（2026-07-22）：cdg-1802/1803/1804/3369 的 `developer` 由 FUJITSU 收斂為「富士通」（cdg-0074、4864 原已是中文），registry 鏡像同步。無 `content/companies/富士通.md`、developer 非連結實體，故不需 alias redirect。
- [x] **`publisher_tw` 誤收非台灣發行商：奧美電子**（2026-07-16 → 結案 2026-07-22）：奧美電子是中國大陸簡中發行商，被機械映射進 `publisher_tw`。清查 3 款結果**全有台灣發行足跡、皆不 reject**，已移除誤填的奧美：cdg-0768 地面控制→台灣《戰略高手》(2000-08-30，代理未坐實，publisher_tw 清空)、cdg-0769 地面控制2→台灣繁中《戰略高手2》(2004-07-29，斐凡迪環球)、cdg-1418 皇帝→台灣《模擬中國》(2002-10-15，松崗)。台灣譯名補進 alias。三款仍為 published:false stub（正文待補）。⚠ 對照：同 artifact 曾致 cdg-0546《少林足球》reject，但少林足球確實查無台灣足跡、與這三款不同。
