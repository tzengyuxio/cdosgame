# 遊戲條目撰寫任務 requirements

本檔彙整本輪「批次補寫／新建遊戲條目」的需求、慣例與進度，供接手與後續批次參照。
正式規格仍以 `.claude/skills/game-entry/`、`schema.md`、`docs/genre-taxonomy.md`、`docs/refs-convention.md` 為準；本檔只固化本輪實際套用的判準與待辦。

## 1. 任務目標

- 依使用者分批給出的清單，為 cdosgame 補寫既有 stub 的正文並發佈、或新建缺漏款。
- content 為 FROZEN 正本，**直接編輯 `content/games/cdg-NNNN.md`**，勿跑 `build_content`。
- 每款：定位 → 研究 → 填 frontmatter → 寫百科散文正文 → `npm run validate` → 發佈 → commit。

## 2. 工作流程

1. **定位**：`rg "title_zh: <名>" content/games` 找既有 id；系列款注意同名／序號干擾，用英文名或逐檔確認。
2. **研究**：多款開並行 general-purpose agent（每組 2–4 款相關），要求回傳「結構化事實＋來源 URL」，單一來源標記、查無不杜撰；主筆自行核對，不照抄 agent 摘要。
3. **撰寫**：改 frontmatter（照 schema enum）＋ 寫正文；Write 前需先用 Read 工具讀檔。
4. **驗證**：`npm run validate` 全綠（Zod）。
5. **發佈**：`published: true`；相依系列頁值得補則建 `content/series/*.md`。
6. **commit**：依批次分 commit，中文 Conventional Commits（`feat(content): …`）；預設不 push，留未 push diff 供 review。

## 3. 慣例規範（本輪實際套用）

### frontmatter / 分類
- `genre` 存 **key**（非中文名）。本輪用到：`SRPG` `TBG` `SLG` `LSG` `CMS` `AVG` `ADV` `ARPG`。
  - **TBG**＝大富翁／棋牌桌遊（富甲天下）。
  - **SLG**＝架空回合策略經營（殖民計劃、銀河天使的戀愛＋即時艦隊戰亦歸此）。
  - **CMS**＝商業實體經營（奇蹟餐廳＝餐廳經營，非 LSG）。
  - **LSG**＝養成／人生模擬；戀愛遊戲「有參數養成＋時間行動管理」→ LSG（天使小夜曲／戀曲、發明工坊 1/2）。
  - **AVG**＝純讀劇情選分支、養成成分輕（天使演唱會／協奏曲、交響樂之雨、音樂系新款）。
  - **ARPG**＝即時動作戰鬥＋成長（救世英豪＝Gothic）。
- `localization_level`：台灣原生開發＝`native`（大宇仙劍／軒轅劍、光譜自製）；代理中文化＝`localized`（工畫堂／Broccoli／Enlight／Gothic 各款）。
- `developer_region`：外國開發商所在地要補全（JP／DE／HK…）；enum 已含常見值。
- `publisher_tw`：只填**台灣代理／發行商**（可連 `/companies/*`）；外國開發商在正文用**純文字、不連** `/companies`。
- **18 禁**：用 `adult: true`（不寫進 `platform_note`）。
- `size`：CD/DVD 雙版本用全形「／」、同版多片用「+」。

### 標題
- **系列初代不帶序號**：`發明工坊`／`藍色天使隊`／`奇蹟餐廳`／`救世英豪` 的「1」移入 `title_aliases`。
- 續作帶半形序號；日文原名／英文名列入 `title_aliases`。

### 正文（房屋風格）
- 繁中百科散文體、約 2 段；**不要「考據筆記」感**（無「經查／據考」、無來源堆砌、無流水帳）。
- 開頭：`《Title》是[公司](/companies/X)於 YYYY 年推出的<類型>，…`。
- 台灣公司／系列／作品互連用內部連結；外國開發商純文字。
- 版本衍生（**更新檔／資料片／愛藏版／外傳**）原則上**併入母款正文**交代，不硬拆獨立條目（除非已有獨立 stub）。
  - 例：曹操傳＝三國立志傳3 資料片；烏鴉之夜／遺棄之神＝Gothic 2/3 資料片；交響樂之雨愛藏版。
- 來源分歧中性並陳、不點名來源、不寫「待考」。

### 引用（三段制）
- `references.chiuinan` 既有介紹頁保留；研究新用到的來源一律進 `references`。
- 被逐句引用者放 `references.cited`（keyed），正文接 `<sup class="cite" data-ref="<key>"></sup>`（dynamic，不手寫 `#cite-N`）。
- cited 的 `label` 用**實際抓取的頁面標題**（wikipedia/baha…），chiuinan/fandom/omega 用固定 label。

### 新建款
- 挑下一個未用 id（本輪＝ catalog 末端遞增），並在 `data/id-registry.json` 補登：
  `{"catalog_id":null,"developer":"…","keys":["t:<title>|<developer>"],"status":"active","title_zh":"…"}`。

### 既有 stub 訂正
- 研究挖出的 frontmatter 誤植（代理商、developer_region、genre、原名）順手訂正；存疑記 backlog。

## 4. 已完成批次

### 批次一 — 光譜自製（commit `71f76743`）
8 款補正文＋1 系列頁：
- 三國立志傳 1/2/3（`cdg-0236/0237/0238`；曹操傳資料片併入 3 代正文，與 KOEI《三國志曹操傳》cdg-4559 消歧義）
- 富甲天下 3/4/5（`cdg-0808/0809/0810`）、青少棒揚威記2（`cdg-1369`）、殖民計劃2（`cdg-1318`）
- 新增 `content/series/三國立志傳.md`
- 訂正：殖民計劃2 `LSG→SLG`；cdg-0238 `size→4CD／1DVD`

### 批次二 — 工畫堂／Broccoli／Enlight／Gothic 代理（commit `c2831190`）
21 款（18 既有補正文＋3 新建）：
- 天使系列 4：`cdg-0450/0442/0444/0449`
- 音樂系：交響樂之雨 `cdg-1282` ＋ 新建 精靈協奏曲 `cdg-4841`、百合二重奏 `cdg-4842`
- 發明工坊 4：`cdg-2811/2812/2813/2814`
- 藍色天使隊 2：`cdg-3476/3477`
- 奇蹟餐廳 2：`cdg-1304/1305`
- 銀河天使 2：`cdg-2892/2893`
- 救世英豪(Gothic) 3 ＋ 新建 4 中古傳奇(Arcania) `cdg-4843`：`cdg-2285/2286/2287`
- 訂正：天使演唱會代理商 `光譜→大宇`；奇蹟餐廳 `LSG→CMS`；天使小夜曲／戀曲 `AVG→LSG`；Gothic `RPG→ARPG`；`developer_region` 補 JP／DE；初代去序號
- 3 新建款已補登 `id-registry.json`

## 5. 待處理批次（批次三，進行中）

使用者清單（**尚未撰寫**；定位僅部分完成，待逐檔確認）：

| 清單項 | 代理／系列 | 現況（初步定位） | 備註 |
|---|---|---|---|
| 校園情聖３ | 松崗 | 待定位（`cdg-4560` 為「校園情聖」） | 系列 18 禁？待查 |
| 校園情聖 | 怡系列 | `cdg-4560`（既有） | 「怡系列」開發商待確認 |
| 性感尤物脫衣撲克 | 松崗 | 待定位 | **疑 18 禁 → `adult: true`** |
| 美少女夢工廠2 図鑑CG版 | 第三波 | `cdg-2360`「美少女夢工場2」 | 站內正名為「夢工**場**」；図鑑CG版為版本，併正文 |
| 卡通夢工廠（美少女夢工廠3外傳） | 松崗 | `cdg-2361`（既有） | **18 禁 → `adult: true`** |
| 笑傲江湖２３ 東方求敗 | 昱泉 | 待定位（`cdg-1052`＝笑傲江湖2） | 昱泉 3D 動作系列 |
| 笑傲江湖 online | 智冠 | `cdg-1051`「笑傲江湖online」 | 線上遊戲，注意收錄範圍 |
| 仙劍奇俠傳（愛藏版） | 大宇 | `cdg-4223`「仙劍奇俠傳」 | 愛藏版併母款正文；native |
| 新仙劍奇俠傳 | 大宇 | 待定位 | |
| 仙劍奇俠傳外傳－問情篇 | 大宇 | 待定位 | |
| 新仙劍奇俠傳網路版 | 大宇 | 待定位 | 線上版，注意範圍 |
| 仙劍奇俠傳貳 | 大宇 | 待定位 | |
| 仙劍奇俠傳三 | 大宇 | 待定位 | |
| 仙劍奇俠傳三外傳問情篇 | 大宇 | 待定位 | |
| 軒轅劍參 | 大宇 | 待定位 | |
| 軒轅劍參外傳－天之痕 | 大宇 | 待定位 | |
| 軒轅劍肆－黑龍舞黅雲飛 | 大宇 | 待定位 | |
| 軒轅劍外傳蒼之濤 | 大宇 | 待定位 | |
| 軒轅劍伍－一劍凌雲山海情 | 大宇 | 待定位 | |

**批次三注意事項：**
- **18 禁款**（卡通夢工廠、性感尤物脫衣撲克、校園情聖系列可能）→ 確認後填 `adult: true`。
- **線上／網路版**（笑傲江湖online、新仙劍網路版、軒轅劍online）→ 先確認收錄範圍（MMO 是否收、如何標）。
- **仙劍／軒轅劍為大宇原生旗艦系列**（`native`），多屬重點條目、應給足深度；既有 stub 可能已是詳細條目，補寫前先讀現況。
- **美少女夢工場正名**：站內用「場」非「廠」（見既有 commit／memory）；清單的「廠」對齊到「場」。
