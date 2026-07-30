# 圖片入庫操作手冊（`_hold` → `_inbox` → 站上）

本文講**日常怎麼操作**。設計理由與取捨見 `docs/backlog/media-triage-pipeline.md`，
媒體規範（kind 控制詞彙、授權、路徑）見 `docs/media.md`。

## 全貌

```
raw/media/_hold/<來源資料夾>/     ← 你人工挑好的圖丟這
        ↓  node scripts/triage_media.mjs        識圖、命名、搬移
raw/media/_inbox/                 ← 已確定 cdg 的圖
        ↓  node scripts/process_media.mjs        轉 WebP、寫 media[]、歸檔
public/media/games/cdg-NNNN/      ← 站上顯示
```

`triage_media` 只管前半段，`process_media` 完全不變。

## 一次標準流程

### 0. 丟圖

`raw/media/_hold/<來源資料夾>/`。資料夾名自由，但**建議帶刊名與期號**
（`軟體世界_第082期_1996年1月號`），腳本會用它推來源、期號與 caption。
檔名隨你，若你已知道是哪款遊戲，**在檔名尾巴加上遊戲名**（`262_P261_新毀滅巫師.jpg`）
——腳本會直接查 registry 對到 cdg，省下一次讀圖。

### 1. 掃描（不動任何檔案）

```fish
node scripts/triage_media.mjs
```

輸出按狀態分組。空資料夾靜默略過；`--write` 才會實際動檔。

### 2. 讓 AI 讀圖

```fish
node scripts/triage_media.mjs worklist
```

產出 `derived/media-ocr/worklist.json`，列出所有讀圖能推進的檔（未識別、缺 kind、
候選多個），附資料夾來源提示。把它交給 Claude：

> 讀 worklist 裡的圖，對每張寫回 sidecar（cdg、kind、source、caption、OCR 全文、
> 抽得到的 facts）。

AI 用 `set` 子命令回寫：

```fish
node scripts/triage_media.mjs set af6060e348f4 --cdg cdg-2336 --kind ad --source boneash
```

### 3. 你裁決剩下的

`ambiguous`（多個候選）與 AI 沒把握的，你自己定。兩條路都行：

- **直接改檔名**（Finder 裡做）—— 檔名是合法輸入，重跑腳本會以檔名為準回寫 sidecar
- `set` 子命令 —— 批量時較快

### 4. 落地

```fish
node scripts/triage_media.mjs --write     # 寫 sidecar、改名、移進 _inbox
node scripts/process_media.mjs             # DRY-RUN 檢查
node scripts/process_media.mjs --write     # 實際入庫
```

搬進 `_inbox` 的檔名末尾會多一個 `__~<遊戲名>` 欄位——**給你核對用的註記**，
入庫時整欄丟棄、不會進 caption：

```
cdg-1982__press-04__boneash__軟體世界 第63期__~鹿鼎記之皇城爭霸.jpg
```

派錯款一眼就看得出來（`cdg-1982` 對不上圖的內容）。你也可以在後面接自己的備忘
（`__~鹿鼎記之皇城爭霸 這張存疑`），或整個欄位改寫；`~` 開頭的欄位一律不入庫。
要改真正的 caption 仍是改前面那個圖說欄位。

DRY-RUN 末尾會列出「**同 kind 已有圖**」的條目——同一則廣告在別期重刊很常見，
機器分不出來，你（或派個 agent）把新圖與 `public/media/games/<id>/` 既有的同 kind 圖
逐張目視比對，重複的就從 `_inbox` 刪掉再入庫。

### 5. 補條目

補正文時**讀 sidecar 而不是重讀圖**：

```fish
# 哪些條目有圖但還沒補內容（沒有 targets 的 skip 檔會自然被排除）
jq -r 'select(.enrich=="pending") | .sha256 as $h | .targets[] | "\(.coll)/\(.slug)\t\($h)\t\(.kind)"' \
  derived/media-ocr/*.json | sort

# 某條目的 OCR 全文（一張圖若供多筆條目使用，這裡只有一份）
jq -r 'select(any(.targets[]; .slug=="cdg-2336")) | .ocr' derived/media-ocr/*.json

# 某條目的所有圖與抽出的硬資訊
jq -r 'select(any(.targets[]; .slug=="cdg-2336")) | {sha256, page, facts}' derived/media-ocr/*.json
```

補完把 `enrich` 改掉：`done`（有補）／`nothing-useful`（讀了但無可用資訊）。
留 `pending` 的才是待辦。

## 一圖多用（targets）

一張圖常要出現在多筆條目：一頁雜誌介紹三款遊戲、一張廣告同時屬於遊戲頁與開發團隊頁。
sidecar 因此是 **一張圖（一個 hash、一份 OCR）→ `targets[]`**：

```json
"targets": [
  { "coll": "games", "slug": "cdg-0367",   "kind": "ad",    "source": "scan", "caption": "電腦玩家 第96期" },
  { "coll": "teams", "slug": "狂徒創作群", "kind": "other", "source": "scan", "caption": "大富翁4 廣告・成員簽名與徵才啟事" }
]
```

腳本據此**產生 N 份 `_inbox` 檔**（各自配序號），`process_media` 與 schema 都不用改。
每個 target 的 `kind` 與 `caption` 可以不同——公司頁那套 `games: [cdg-…]` 聚合做不到這件事，
因為它共用同一筆 media。

實體上仍是複製（站上 `public/media/` 各存一份，與既有 7 組重複圖一致），
但複製由機器產生、來源只有一份，不會各處漂移。

加 target：

```fish
node scripts/triage_media.mjs sync                      # 先讓 sidecar 落地
node scripts/triage_media.mjs set <hash> --add teams/狂徒創作群 --kind other --caption "…"
```

若 `_hold` 裡本來就有同一張圖的多個複本（byte 相同），腳本會把它們併成一組，
搬移時**一個檔對一個 target**；target 比檔案多就複製，檔案比 target 多則多的移到
`_hold/_extra/`——**不刪任何檔**。

## 狀態與檔名

| status | 檔名前綴 | 意思 | 下次跑會怎樣 |
|---|---|---|---|
| `resolved` | `cdg-NNNN__` | 已對到條目、欄位齊 | 移進 `_inbox` |
| `needs-kind` | （原檔名） | 對到條目，但 kind／source 未定 | 進 worklist |
| `ambiguous` | （原檔名） | 多個候選 | 進 worklist，待你裁決 |
| `unk` | `unk__` | 讀過，registry 查無 | **自動重查 registry** |
| `pending-vision` | （原檔名） | 尚未讀圖 | 進 worklist |
| `skip` | `skip__` | 非遊戲／不入庫／已處理過 | 永久略過 |

byte 相同的複本不是錯誤，會併成同一張圖的多個 target（見上節）。

其他子命令：

```fish
node scripts/triage_media.mjs sync                          # 只寫 sidecar，不動圖檔
node scripts/triage_media.mjs mark --from pending-vision --to skip [--write]
node scripts/triage_media.mjs show <hash>
```

命名慣例（`__` 分隔，沿用 `process_media`）：

```
未識別  262_P261_新毀滅巫師.jpg
查無    unk__ad__scan__新毀滅巫師.jpg              ← 無序號
不入庫  skip__軟體世界第4期發行目錄.jpg
已識別  cdg-2336__ad-01__boneash__軟體世界 第82期.jpg  ← 有序號
進 inbox cdg-2336__ad-01__boneash__軟體世界 第82期__~新毀滅巫師.jpg  ← `~` 欄＝註記，不入庫
```

## 三個要記住的點

**1. 不要自己把檔案搬進 `_inbox`。** 改完檔名跑 `--write` 讓腳本搬。你手動搬的話
sidecar 仍記著舊狀態，補條目時反查不到 OCR，圖進得去但資訊斷了。

**1b. 檔名優先於 sidecar。** 檔名已是結構化格式（`cdg-…__kind__source__caption`）時，
`set --caption` 會在下次掃描被檔名蓋回去——因為檔名代表你的人工裁決。要改這種檔的
欄位就**直接改檔名**；`set` 適用於還沒有結構化檔名的圖（或用來加 target）。

**2. `unk` 會自我消化。** sidecar 存了 `title_guess`，每次執行都免費重查 registry。
所以「資料庫後來才有這款」不需要你標記，下次跑自動對上。因此
**`unk` 清單同時是「該補建條目」的線索池**——雜誌掃描是發現漏收遊戲的主要管道。

**3. 序號由腳本配。** `-01`／`-02` 依 `public/media/games/cdg-NNNN/` 既有檔案分配，
不要自己編。（實測：`_hold` 裡一個手動命名為 `ad-01` 的檔，目標資料夾其實已有
`ad-01`、`ad-02`，腳本自動改配 `ad-03`——手動編號會被 `process_media` 靜默覆蓋。）

## 來源資料夾對照表

`data/media-source-dirs.json`：資料夾名 → `{ source, publication, issue, date }`。

- key 是自由字串，**可多對一**（簡寫、別名各給一筆，如 `軟世60期1994年3月號`）
- `source` 必須是 `data/media-sources.json` 的合法 code（`scan`、`boneash`…），
  指**誰數位化的**，不是刊物。刊物寫 `publication`／`issue`，腳本據此組 caption
- `source: null` = 待你確認，該資料夾的圖不會被移進 `_inbox`
- 沒登記的資料夾會列在報表末尾提醒建檔

> ⚠ `data/media-sources.json`（無 `-dirs`）是**另一個檔**：source code → 名稱／URL 的
> 站台共用權威表，schema 驗證與 `src/lib/media.js` 都吃它，不要混用或覆寫。

## sidecar

`derived/media-ocr/<sha256 前 12 碼>.json`，gitignored（OCR 全文可重生）。

以**內容 hash** 為鍵，所以檔案改名、搬移都不會失聯，也不會重複讀圖。
重新裁切／重掃會產生新 hash＝視為新圖，需重讀一次。
