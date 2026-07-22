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

- [ ] **`/games` 篩選軸加入改編來源 facet**（2026-06-20，2026-07-22 收斂）：依 `adaptation.medium` 加 facet（漫畫改編／小說改編／布袋戲改編…）。`facetValues`（`src/lib/gamesQuery.js`）目前無 adaptation facet，須新增。**18禁 不做公開 facet**——`adult` facet 已存在但刻意只在 `astro dev` 出現（`games/index.astro:42` 的 `import.meta.env.DEV` 包住，供編輯者篩選、不上公開站），維持現狀。
- [ ] **改編作品瀏覽頁**（2026-06-20）：依 `adaptation.medium` 做 `/adaptations` 或「漫畫改編／小說改編／布袋戲改編…」瀏覽軸，類似 genres/years。
- [ ] **新增「角色」大類**（2026-06-28）：為遊戲角色建立獨立頁面。**歸屬未定**——可能成為與 games/companies/series 平行的新實體類型（`/characters/<名>`），也可能先掛在 `/topics` 下。需依 `docs/information-architecture.md` 規範決定 collection／路由／slug／聚合來源（角色↔遊戲關聯欄位），並評估資料量是否值得獨立大類。
- [ ] **tag 可點擊 → 同 tag 遊戲列表**（2026-07-11）：讓條目上的 tag 都變成可點擊連結，點擊後進入「有同一 tag 的遊戲列表頁」（filter 結果頁，如 `/tags/<tag>` 或 `/games?tag=<tag>`），**不必**像 `adnd` 那樣做成獨立 topic 頁面。多數 tag 只需純列表即可；少數重點 tag 才升級成有介紹的 topic。呼應「Tag 受控詞彙擴充候選」（`docs/backlog/tag-candidates.md`）。
- [ ] **遊戲條目正文結構規劃**（2026-06-28）：訂定一組常用 `## h2` 章節慣例，除現有「簡介／製作人員」外，候選有 世界觀、角色、攻略、祕技、花絮、開發 等。**需完整討論**：哪些該入條目、哪些可合併或排除（呼應現行「攻略／祕技不主動蒐集、避免膨脹成攻略本」原則）、章節順序與命名、是否分「核心章節 vs 選填章節」。定案後更新 `/game-entry` skill 的房屋風格。

## 資料

- [ ] **`catalog_id` → `chiuinan_id` 磁碟遷移收尾**（機制已落地 2026-07-22，原提 2026-06-22）：schema alias shim 已上線——`chiuinan_id` 為正名、in-memory 全部正規化，舊名 `catalog_id` 由 preprocess 相容接受（`schema/game.schema.mjs`）。新條目一律寫 `chiuinan_id`（skill 已更新）；磁碟上 4318 個舊檔仍是 `catalog_id`，**逐步遷移、不急於一次改**（碰到就改，或日後搭別的全庫 migration 一次 sed）。剩餘動作純屬可選清理：content md 舊鍵、registry `catalog_id` 欄與 `cat:` key 前綴（append-only、非 runtime 讀取，可永遠不動）。前端不顯示此欄，正確性已由 shim 保證。
  - 補佐證（2026-06-23）：cdg-1628《俠影記》的 `catalog_id: SWZ001` 一度被誤以為「智冠軟世界武俠系列」內部編號，研究後確認 SWZ 是 chiuinan 的跨廠商 catalog（SWZ002=Maxis《模擬螞蟻》、SWZ003=Artdink《A 列車 3》），與智冠無關——是「`catalog_id` 名稱誤導」的具體案例
- [ ] **game `slug` 欄位的去留**（2026-06-28）：schema 有 `slug`（英文別名 slugify，如 `a-10-tank-killer`），但全專案無任何處讀取，遊戲網址一律用 `id`（`/games/cdg-NNNN`）。兩個方向擇一：(a) **接成可讀網址／alias redirect**（`/games/a-10-tank-killer` → `cdg-NNNN`，SEO 友善但要處理唯一性、缺值、舊網址穩定）；(b) **確認用不到就從 schema 移除**，免得是個誤導性的死欄位。背景見 `docs/id-policy.md`「排序/顯示」段。
- [ ] 補新條目 metadata（合併進來的 developer/genre/content_language 多為 null）
- [ ] **成人款 `adult` 全面 sweep**（2026-06-20）：目前只回填了已查證 3 款；其他 galge/18禁 待全面標記。金瓶梅系列**已查**：cdg-2360/2361/2883 原已 `adult: true`；cdg-2011 已 rejected（2005 現代遊戲、範圍外）；cdg-3835「金瓶梅」（1997、CN developer、`publisher_tw: []` 空、無台灣足跡、published:false）**不宜逕標 adult**——它更像「簡中版掃描」該 reject 的對象，併入該項處理。
- [ ] OfflineList 新款正名：offlinelist 獨有款用 s2tw 自動繁名（`name_zh_hant` 草稿），少數字形誤選（撲克/彩球類）須人工正名；補 developer/region/genre
- [ ] 既有條目正名——兩個**命名判斷題**待定：cdg-1883「軒轅劍2外傳：楓之舞」是否正為「軒轅劍外傳 楓之舞」（原 note 即標「考慮」）；cdg-3737 現名「魔法門之英雄無敵」是否再補副標「：戰略任務」。（機械正名部分已完成，見 done-log）
- [ ] MobyGames 補英文原名/封面/年（需 API key）
- [ ] **廠商↔遊戲↔系列 對照校訂（使用者 2026-06-18 指出有不少錯誤，未急於處理）**：`developer`/`publisher_tw` 字串歸屬、`series` 前綴歸組（如三國志過度聚合外傳、成吉思汗併蒼狼與白鹿）等對照關係需人工複核校正；屬資料層校訂，與站台呈現機制無關
- [ ] **Tag 受控詞彙擴充候選**（2026-06-29）：已分析 920 款找出可成 tag 的跨切群集，集中於 **`docs/backlog/tag-candidates.md`**。優先 `sangoku`（三國，15 款）；`wuxia`（武俠）待定義範圍；`gold-box`、`apple2` 可選。
- [ ] **定義 `year` 對「代理款」的語意（原版年 vs 台灣發行年）**（2026-07-16）：schema 未明定，實務已分歧且**四個 agent 各自獨立撞到同一問題**。庫內既有先例傾向**原版年**（cdg-0898 西風狂詩曲＝韓版 1998、cdg-1548 餅乾夢工坊＝韓版 2000／台灣 2002 代理），但近批補完多沿用 chiuinan 的**台灣年**：cdg-1068 女傑（原版 1996／台灣 1999）、cdg-3486 西遊降魔錄（原版 1997/1998 兩說／台灣 1999）、cdg-3539 獅王傳說（韓版 1997-05／台灣 1998-08）、cdg-2520 聖天使學園（日版 1997／台灣 1999）。**建議**：先在 `schema.md` 定義語意（含「原版年不可考時 fallback 台灣年」的規則），再一次校正受影響的代理款；若改記原版年，上列各款需連動訂正。⚠ 另一併釐清 chiuinan 的已知病灶——該站常把台灣代理年誤記為「原廠出品年」（cdg-1068 實例：archive.org 證原版 1996，chiuinan 卻寫「Honorock 1999年出品」），但**非全站皆然**（cdg-3539／cdg-2520 頁面兩年分列清楚），逐款分辨不可一律套用。
- [ ] **`content/companies/旭力亞.md` 唯一來源不支撐內文**（2026-07-16）：該頁唯一引用為 Softmax 維基條（`zh.wikipedia.org/wiki/Softmax_(游戏开发商)`），但實抓全文未出現「旭力亞」，「台灣代理旭力亞」之說目前無來源支撐。另 `raw/kudgame-list.txt` 的【旭力亞】分組疑把「展略」混入（實測：《公主幻想曲》官網記展略科技(Info-Mission)代理、《少林足球》標題畫面亦為 Info-Mission），清查時一併釐清兩家關係。
- [ ] **掃描「只有簡中版、沒有繁中版」的條目**（2026-07-16）：疑有一批只出簡中版、從未在台發行的款被標成 `zh`+`localized`，依「catalog 只留台灣發行/代理」應 reject 或改標。**優先掃 `published: false`**（未經人工複核的 stub 是聚集地）。已連續踩到三筆並 reject：cdg-0587 幻想西遊記（金智塔）、cdg-2978 創世紀戰3第二部、cdg-0546 少林足球 → 屬系統性資料層問題。掃描起點、判準與陷阱集中於 **`docs/backlog/simplified-only-scan.md`**；適合獨立 session 做。
- [ ] **topic 頁納入 media pipeline**（2026-07-21）：`content/topics/*.md` 目前無 `media` 欄位、`[slug].astro` 也不渲染圖，`process_media.mjs` 的 coll 僅支援 games／companies／people／teams。首例 `content/topics/電腦休閒世界.md` 的型錄兩頁改以 body 內嵌 `<figure>` 處理，圖手動轉檔（≤1MP／webp／q82，另產 thumb）放 `public/media/topics/<slug>/`、原圖與手寫 manifest 放 `raw/media/topics/<slug>/`——因此不受 `validate` 檢查、也不進 triage 流程。topic 掛圖若變多，應比照其他實體頁把 topics 正式納入 media schema、模板與 pipeline。
- [ ] **「福旭」缺公司頁**（2026-07-22）：cdg-0162、cdg-1684、cdg-1925、cdg-3436、cdg-3906 掛此發行商但無 `content/companies/福旭.md`。《遊戲世界》169 期評測載《光闇紀事》「發行公司 福旭／代理經銷 智冠」，而該作 developer 為天堂鳥——福旭很可能是天堂鳥的關係企業，建頁時一併查證兩者關係。
- [ ] 廣告處理 — 評估與導入網站廣告（版位規劃、廣告聯播網選擇、與復古版面的視覺相容、隱私/同意聲明）（2026-06-20）

## 條目考據待複核

撰寫條目（`/game-entry`）時的考據／分類待決事項，已獨立到 **`docs/backlog/game-entry-review.md`**（寫新條目遇到類似事項 append 到該檔）。
