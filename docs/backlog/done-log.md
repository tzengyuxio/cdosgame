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
- [x] **統一廠商名稱「富士通」／「FUJITSU」**（2026-07-22）：cdg-1802/1803/1804/3369 的 `developer` 由 FUJITSU 收斂為「富士通」（cdg-0074、4864 原已是中文），registry 鏡像同步。**訂正（同日稍後）**：當初誤判「無公司頁、不需 alias」——實則有 `content/companies/FUJITSU.md`（name_zh 富士通），改名遊戲 vendor 後頁面 id 對不上，造成「富士通」vendor 連到不存在的頁。已將公司頁 `FUJITSU.md → 富士通.md`、`COMPANY_ALIASES` 補 `FUJITSU: '富士通'`（舊網址 redirect）。教訓：改 vendor 字串前先查有無對應公司頁（含英文檔名）。
- [x] **`publisher_tw` 誤收非台灣發行商：奧美電子**（2026-07-16 → 結案 2026-07-22）：奧美電子是中國大陸簡中發行商，被機械映射進 `publisher_tw`。清查 3 款結果**全有台灣發行足跡、皆不 reject**，已移除誤填的奧美：cdg-0768 地面控制→台灣《戰略高手》(2000-08-30，代理未坐實，publisher_tw 清空)、cdg-0769 地面控制2→台灣繁中《戰略高手2》(2004-07-29，斐凡迪環球)、cdg-1418 皇帝→台灣《模擬中國》(2002-10-15，松崗)。台灣譯名補進 alias。三款仍為 published:false stub（正文待補）。⚠ 對照：同 artifact 曾致 cdg-0546《少林足球》reject，但少林足球確實查無台灣足跡、與這三款不同。

## 站台功能（續）

- [x] **`/companies` 索引納入已發佈 profile**（2026-06-20 → 結案 2026-07-22）：原以為多家 profile 公司因遊戲數 0 而缺席索引，Python 實查為誤——智冠/第三波等各有 60–393 款已發佈遊戲、本就在索引（早期先建範例頁、待 vendor 欄回填後即自然出現，屬已消解的歷史殘留）。唯一真正「有頁、0 遊戲」的 `遊戲新幹線`（智冠 2002 線上遊戲子公司、作品全為後 2000 線上遊戲、不在 DOS catalog）已刪頁（帝技爺如.md 的連結改純文字）。目標歸零，index 聚合機制不需改；若日後又出現 profile-before-games 頁再議。
- [x] **cdg-2940/2941《初戀》系列 `developer_region` 補 JP**（2026-07-16 → 結案 2026-07-22）：兩款 `developer_region` 均已為 JP（Family Soft＝株式会社ファミリーソフト，1987 東京練馬）。附帶的「富峰群公司頁」亦有定論——`COMPANY_ALIASES` 已 `富峰群: '遊戲橘子'`，依既定政策前身名只做 redirect、不建獨立頁，無剩餘動作。
- [x] **既有條目正名——機械正名部分**（結案 2026-07-22）：cdg-0977「吞食天地1三國外傳」→去編號「吞食天地三國外傳」；cdg-3265「黃金城之秘」→「黃金城之謎」；cdg-2261「黃飛鴻－鐵雞鬥蜈蚣」→破折號改全形冒號。（尚存 cdg-1883／cdg-3737 兩命名判斷題，仍在 BACKLOG 待使用者定調。）
- [x] **大宇長產品目錄表遷成 `/topics`**（2026-06-20 → 結案 2026-07-22）：`content/topics/大宇資訊產品目錄.md` 已建（`parent: 大宇`、含 G/A 系列目錄），topics collection＋頁面（`src/pages/topics/[slug].astro`、`index.astro`）已實作（全庫 17 個 topic），`大宇.md` 已不再內嵌目錄表；公司頁 `[name].astro` 自動列出 `parent==該公司` 的 topic（「專題／延伸條目」），不需手動回連。backlog 舊述「topics 尚未落地」已過時。
- [x] **廠商／人物頁的數量篩選**（2026-06-28 → 結案 2026-07-22）：`CountFilter.astro`（分段控制：全部／3款+／5款+／10款+，預設 3）即「只顯示有 N 筆以上」的最簡版，已上線於 `/companies` 與 `/people` 兩個索引頁。

## 站台功能（續2）

- [x] **遊戲列表的廠商欄並列製作／出版**（2026-06-28 → 結案 2026-07-22）：新增 `vendorLabel(g)`（`src/lib/labels.js`）——`developer`≠`publisher_tw[0]` 時顯示「製作／發行」（斜線、製作在前，如「Artdink／第三波」），相同或缺一則顯示單一。套用於 `GameList.astro`（SSR 分類/年代/公司列表）與 `games/index.astro`（/games client 篩選列表）。18禁 facet 仍 dev-only（另項）。build 通過、43 測試全綠。
