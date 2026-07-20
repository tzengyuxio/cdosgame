---
status: in-progress
created: 2026-07-20
---

# 圖片入庫前處理：media triage pipeline

把「人工挑圖 → 查 cdg → 改名 → 入 `_inbox` → `process_media`」這條流程中最耗人力的
**識圖與命名**自動化，並讓 AI 讀圖的結果（OCR、抽出的硬資訊）落成可重用的檔案，
避免補條目時重讀一次圖。

## 問題

現行流程（見 `docs/media.md` §5）在 `process_media` 之前是純人工：使用者一張張看圖、
查出 cdg-id、按 `<cdg-id>__<kind>__<source>__<caption>` 改名，才丟進 `_inbox`。

痛點有三：

1. **識圖結果沒有落檔**。AI 讀圖同時服務三件事（判斷 cdg、決定 kind、充實條目），
   但只存在於 context，所以步驟順序會飄，且補條目時要重讀一次圖。
2. **撞號要人腦處理**。`press-01` / `press-02` 的序號得先看目標資料夾既有到幾號。
3. **雜誌掃描裡查無對應的遊戲會消失**。那些其實是「該補建條目」的線索，
   目前只能靠使用者記憶。

## 設計

### 三層職責

| 層 | 產物 | 誰做 |
|---|---|---|
| **識圖** | sidecar JSON（OCR 全文、候選 cdg、kind、抽出的 facts） | AI（讀圖，唯一一次） |
| **命名／搬移** | `_hold` 改名 → `_inbox` | 腳本（撞號自解） |
| **歸檔** | `public/media/`＋`media[]`＋archive | `process_media.mjs`（既有，不變） |

**腳本不讀圖**——Node 沒有視覺能力。腳本負責掃描、雜湊、對照 registry、改名搬移，
並輸出一份「需要讀圖」的 worklist 交給 AI；AI 讀完用 `set` 子命令回寫 sidecar。

### sidecar：以內容 hash 為鍵

`derived/media-ocr/<sha256 前 12 碼>.json`，一圖一檔。

用 binary hash 當鍵，因此**檔案改名、搬移都不會失聯**，也天然做到不重讀。
hash 只在入口算，後續靠 manifest 維持對應，不重算。
（重新裁切／重掃會產生新 hash＝視為新圖，可接受。）

```json
{
  "sha256": "a3f9c2b81e04",
  "source_dir": "軟體世界_第082期_1996年1月號",
  "originals": ["262_P261_新毀滅巫師.jpg"],
  "status": "resolved",
  "targets": [
    { "coll": "games", "slug": "cdg-1783", "kind": "ad", "source": "boneash", "caption": "軟體世界 第82期" }
  ],
  "title_guess": "新毀滅巫師",
  "candidates": [{ "cdg": "cdg-1783", "title": "新毀滅巫師", "confidence": 0.92 }],
  "page": "P261",
  "ocr": "……全文……",
  "facts": { "publisher": "第三波", "price": 1290, "release": "1996-01" },
  "enrich": "pending"
}
```

`ocr` 全文與 `facts` 是補條目階段的輸入，取代重讀圖。

### 一圖多用：`targets[]`

一張圖常屬於多筆條目（一頁介紹三款遊戲；一張廣告同屬遊戲頁與開發團隊頁）。
sidecar 因此是「一張圖 → N 個 target」，每個 target 各有自己的 `kind`／`caption`。

不走 schema 聚合（公司頁的 `games: [cdg-…]`）的理由：那是「一筆 media 顯示在多處」，
kind 與 caption 共用一份，**表達不了 kind 不同的需求**（大富翁4 廣告在遊戲頁是 `ad`、
在狂徒創作群頁是徵才啟事）。而「一頁三款」更沒有 owner 實體可掛。

實體複製維持現狀（站上已有 7 組重複圖），但複製改由腳本從單一 sidecar 產生，
不再手工維護，也終於有地方記載「這幾個檔是同一張」。

### 狀態機

| status | 意思 | 檔名前綴 | 下次執行 |
|---|---|---|---|
| `pending-vision` | 尚未讀圖 | （原檔名） | 交給 AI 讀圖 |
| `resolved` | 已對到條目 | `cdg-NNNN__` | 移進 `_inbox` |
| `unk` | 讀過，registry 查無 | `unk__` | **自動重查 registry**（免費，不讀圖） |
| `ambiguous` | 多個候選 | `unk__` | 同上，並列進待解清單 |
| `skip` | 非遊戲／不入庫 | `skip__` | 永久略過 |

`unk` 會**自我消化**：sidecar 存了 `title_guess`，每次執行都重查一次 registry，
所以「資料庫後來有了這款」不需要使用者做任何標記，下次跑就自動對上。

### 命名慣例

```
未識別  （原檔名，如 262_P261_新毀滅巫師.jpg）
查無    unk__ad__scan__新毀滅巫師.jpg          ← 無序號
不入庫  skip__軟體世界第4期發行目錄.jpg
已識別  cdg-1783__ad-01__boneash__軟體世界第82期.jpg   ← 有序號，可進 _inbox
```

**`unk__` 不帶序號**：`-01` 是「該遊戲的第幾張」，不知道是哪款之前編號沒有意義，
硬編會在解出 cdg 後跟目標資料夾既有編號撞號。序號由腳本在解出 cdg 的當下、
看過 `public/media/games/cdg-NNNN/` 才配。

`unk` 而非 `cdg-0000`：後者會被 `normId()` 解析成合法 id、污染 `cdg-\d{4}` 的
搜尋空間（registry 查詢、按 id 統計的腳本都會誤撈）。`unk` 在任何 grep 裡都不會被誤認。

### 檔名是合法的輸入管道

每次執行都做全量 reconcile：重算 hash 找到 sidecar，**若檔名資訊與 sidecar 不一致，
以檔名為準**（那代表使用者的人工裁決）。因此使用者有兩條介入路徑：

- 直接改檔名（Finder 裡做，符合既有習慣）
- 開 review 頁點選（批量時較快）

兩條都收斂到 sidecar，不會有一條讓資訊斷掉。**使用者不要自己把檔案搬進 `_inbox`**
——改完檔名重跑腳本，讓它回寫 sidecar 後自己搬，否則 sidecar 仍記著 `unk`，
補條目時反查不到 OCR。

### 資料夾＝來源先驗

`_hold/<來源資料夾>/` 這層一次給了三件從圖上難以可靠讀出的資訊：

1. `source`（誰數位化的）——`docs/media.md` 強制欄位
2. `kind` 的強先驗（雜誌夾裡只會是 `press` 或 `ad`，二選一遠比 20 選 1 準）
3. `caption` 前半（刊名＋期號）

資料夾名走**自由字串＋對照表** `data/media-source-dirs.json`（多對一，容別名；`source` 須是既有
`data/media-sources.json` 的合法 code，那份是站台共用的權威表、勿混用），
沒對到的當提示字串餵給 AI 並提示建檔。不強制固定格式——來源不只雜誌
（拍賣截圖、網友提供、自藏掃描），硬套格式必有例外。

檔名結構**只在單一資料夾內成立**（不同掃描者慣例不同：有的帶頁碼 `094_P93`、
有的純流水號 `SSC_0030`），因此 `page` 欄位 parse 得到才記、允許 null，
排序 fallback 到字典序。

## 實作步驟

- [x] 1. `scripts/triage_media.mjs` — 掃描／雜湊／reconcile／registry 對照／改名搬移
- [x] 2. `docs/media-triage.md` — 操作文件
- [ ] 3. `scripts/serve_media_review.mjs` — 邊看圖邊裁決的 review 頁（抄 `serve_review_state.mjs` 骨架）
- [ ] 4. `process_media.mjs` manifest 增記 hash（撞號已由 `triage_media` 配號解掉；
      但 `process_media` 本身仍會在 `outFull` 已存在時**靜默跳過**，值得補一行警告）
- [ ] 5. `press-import` skill 改讀 sidecar 而非重讀圖
- [ ] 6. `unk` 待解清單接進 kudgame queue（雜誌掃描是發現漏收遊戲的主要管道）

3 之後是「確認 1、2 的識圖準確率可接受」才做，不預先實作。

## 已知邊界

- 空資料夾＝已處理完清空，靜默略過。
- 非遊戲檔（工具軟體、學習軟體）標 `skip`，但 OCR 仍保留——部分本身有考據價值
  （如軟體世界發行目錄頁）。
- `derived/media-ocr/` 整個 gitignore（OCR 全文是可重生的中間產物）。目前**未**產出
  committed manifest——`process_media` 已有 per-entity `manifest.jsonl` 記 `original` 檔名，
  等步驟 4 補上 sha256 就能串起 sidecar，不必另立一份。
- `allocSeq` 有狀態：同一次執行不可對同一 target 呼叫兩次（會各吃掉一個序號）。
  路徑在建 row 時算好存進 `r.paths`，報表與搬移共用。
