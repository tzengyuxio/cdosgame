---
name: press-import
description: Batch-import scanned magazine press/ad clippings from raw/media/_inbox and enrich the matching game entries with the reporting. Reads each press scan, ingests the images via process_media, expands the entry body in house style with a magazine footnote citation, and produces a human-review list for developer/publisher conflicts. Use when the user drops magazine scans (檔名前 8 碼＝cdg-id) and asks to read the articles and補進條目. Triggers on "/press-import", "press 補條目", "報導補回條目", "雜誌掃描入庫", "電腦玩家掃描".
argument-hint: [刊物 或 cdg-NNNN…；預設處理整個 _inbox]
allowed-tools: Bash, Read, Edit, Glob, Grep, Task
---

# 雜誌報導掃描 → 補條目（cdosgame）

一批 `raw/media/_inbox/` 下的雜誌掃描（`press`＝編輯報導、`ad`＝廣告），把 **press 報導的內容讀出來、補進對應遊戲條目的正文**，並把圖入庫成 `media[]`。適合使用者一次丟一整批掃描（10～30 張）。

**檔名帶資訊**（見 `docs/media.md` §5.2）：`<cdg-id>__<kind>[-NN]__<source>__<刊名 期號>.<ext>`，例：`cdg-1799__press-01__scan__電腦玩家 第96期.jpg`。**前 8 碼 `cdg-NNNN` 即對應遊戲**。

## 定調（先讀，勿在此重複）

- **內容房屋風格一律走 skill `game-entry`**（正文散文體、cite 規則、frontmatter enum）。本 skill 只固化「批次 press 的節奏＋引用格式＋斷點＋踩坑」。
- **媒體入庫規範**：`docs/media.md`（kind `press` vs `ad` 的區別、caption 寫法、`process_media.mjs`）。
- **引用三段制**：`docs/refs-convention.md`（雜誌紙本＝無 url，用 **keyed footnote**，不進 `references`）。

## 流程（triage 精神：決策前置、重活委派、主線抽驗）

### 1. 盤點 inbox
```
ls raw/media/_inbox/ | rg -i press          # 有哪些 press、對應哪些 cdg-id
```
把 press 清單、對應條目的現況（`published`/`year`/`developer`/是否已有正文）用 `rg`/`sed` 快速掃一遍。**別整批 Read 圖進主線**（吃爆 context）。

### 2. 圖片入庫（先做，正文才有 press 圖可引）
```
node scripts/process_media.mjs            # PLAN：零副作用，確認解析無誤
node scripts/process_media.mjs --write     # APPLY：轉 WebP、寫 media[]、原圖歸檔、清 inbox
```
`--write` 是**整批** inbox（press＋ad 一起），fail-fast 且冪等。入庫後每個條目多一筆 `media[] { kind: press, source: scan, caption: "<刊名 期號>" }`。

### 3. 研究（平行 subagent，主線不吃圖）
每張 press 開一個 subagent（`Task`／`general-purpose`），**各讀 1 張圖**（資訊量大，1 對 1 最準）＋對應條目，**只回結構化事實、不寫檔、不 git**：

```
## cdg-NNNN 報導擷取
### 報導基本資料   （標題/類別/設計公司/國內發行/上市日/報導類型/撰稿人/期號頁碼）
### 與現有 frontmatter 的落差（逐欄：現值 → 報導值 → 建議）
### 正文可擴充要點（5–10 點，全出自此報導；標注哪些是主觀評語）
### 疑點／風險（衝突、需人工判斷、圖文是否相符）
```

主線核對回傳（subagent 摘要是「打算寫什麼」，不可照抄）。

### 4. 補條目（可續派同一批 subagent 改，或主線親改）
內容按 `game-entry` 房屋風格擴充正文，**外加本 skill 的三條引用格式**：

- **雜誌 footnote（keyed）**：在 `references:` 前加（已有 `footnotes:` 就 append）：
  ```yaml
  footnotes:
  - key: <刊物碼><期號>
    text: '〈報導標題〉，《刊名》第 N 期（年）「單元」，頁 X。'
  ```
  key 命名＝`<刊名縮寫><期號>[<語意後綴>]`（全小寫，同期多則加後綴如 `ad` 消歧義），縮寫對照表與規則見 `docs/refs-convention.md`「footnote key 命名」。常用：電腦玩家＝`ace`、軟體世界＝`swm`、新遊戲時代＝`sgm`、電腦遊戲世界＝`cgw`。
- **正文 cite**：每句出自報導的新增事實，句末 `<sup class="cite" data-ref="<key>"></sup>`。
- **press 圖說**：`media[]` 的 `kind: press` 那筆 `caption` 改成 `<刊名 期號>・<單元> p.<頁碼>`（例：`電腦玩家 第96期・先睹為快 p.121`）。

**內容鐵律**：
- **主觀評語（宣傳/評測語氣）不可當客觀事實**——用「報導稱／評為／據上市前報導」框住。
- **preview 是「預定」不是「實際」**：上市日、系統數據都是上市前宣稱值，措辭標明。
- **frontmatter 的 `developer`/`publisher_tw`/`year`/`genre` 一律不因單張 preview 而改**——台媒常把發行商誤植為設計公司（如 Psygnosis 之於 Surreal），且改動牽連 `localization_basis` 與公司頁歸屬。有出入**只列人工複查清單**，正文可中性並陳。

### 5. 收尾（主線統一，別靠 subagent）
```
npm run validate                          # Zod 驗 frontmatter
```
- **⚠ 踩坑：續派的 subagent 是從舊 transcript 恢復的，記憶中是「入庫前」的條目（沒有 media[]），常誤判「找不到 press 那筆」而漏改 caption。** 所以 **caption 與 footnote key 一律在主線用腳本統一設**，不信任 subagent 有沒有改到：
  ```bash
  # 統一 press caption（id→頁碼 map，冪等）
  typeset -A pages=(1799 121 0375 126 …)
  for id in ${(k)pages}; do
    perl -0777 -i -pe "s/(kind: press\n  source: scan\n  caption: )[^\n]*/\${1}電腦玩家 第96期・先睹為快 p.$pages[$id]/" content/games/cdg-$id.md
  done
  # 若 key 打錯，全庫替換（如 pcplayer96 → pcgamer96）
  for id in ${(k)pages}; do perl -i -pe 's/pcplayer96/pcgamer96/g' content/games/cdg-$id.md; done
  ```
- 逐筆 `git diff` 抽驗：正文品質、cite 密度、footnotes 位置、**沒刪既有考據**。

### 6. commit（拆邏輯單元）
1. `content(media): <刊名 期號>廣告與報導掃描入庫` — `public/media/**`＋`raw/media/**` manifest＋純 media[] 變更的 ad-only 條目。
2. `content(games): N 款補《刊名》第 N 期報導正文` — press 條目（正文＋press media[]）。

大批內容改動**先不 push**（見 memory `review-before-push`），交使用者用未 push diff review。

### 7. 交付「待人工複查」清單
把所有 subagent 回報的 frontmatter 衝突彙整成一張表（條目｜衝突欄位｜現值 vs 報導值），交使用者裁定。**這是本 skill 的關鍵產物**——正文已補完，但 developer/publisher 的真偽由使用者拍板。

## 斷點與規模
- 一批 press ≤ ~15 張可一輪跑完；更大批分批，安全斷點＝**入庫完＋一批 commit 完**。
- 主線 context 約 50% 時主動告知使用者此為乾淨斷點、建議 reset（狀態已在 git，優先 reset 勝過 compact）。
