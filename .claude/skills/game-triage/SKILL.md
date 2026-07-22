---
name: game-triage
description: Dispose of a cdosgame catalog entry that is NOT a standalone keeper — reject an out-of-scope title (學習/教材/工具軟體、兒童向 edutainment、無台灣足跡的純外文遊戲) or merge a duplicate into another id. Marks data/id-registry.json (append-only) and deletes/redirects the content file. Use when told to reject/剔除/排除/out of scope, or merge/合併/併入/重複條目 one or more cdg-NNNN. Triggers on "/game-triage", "reject", "剔除", "排除這幾筆", "merge", "合併重複".
argument-hint: <cdg-NNNN…（reject 或 merge 的 id 清單）>
allowed-tools: Bash, Read, Edit, Grep, Glob, WebSearch, WebFetch
---

# 條目退場／合併（cdosgame triage）

兩種「非撰寫」的條目處置：**reject**（範圍外剔除）與 **merge**（重複併入）。兩者都改 `data/id-registry.json`（append-only、**id 永不重用**）並刪除／重導 content 檔。**撰寫或補正文請改用 `game-entry`。**

**最高原則：刪之前先複查。** reject 是破壞性動作；照使用者清單「照單全刪」會誤殺被錯分類的真遊戲（實測：`Ultimate Ride` 是雲霄飛車模擬遊戲、一整組 edutainment 是有玩法的兒童冒險/解謎遊戲）。複查＝先證明「真的 out of scope」再動手。

## Spec 來源（先讀，勿在此重複）

- **收錄準則**：`scope.md`、`src/pages/about.astro`（台灣市場遊戲導向；外文無中文化代理→不收；純學習/教材/工具軟體→不收）。
- **id 政策**：`docs/id-policy.md`——`data/id-registry.json` append-only，`status` ∈ `active|rejected|merged`，id 絕不重新指派。
- **schema**：`schema.md`／`schema/game.schema.mjs`。

## 共同機制

- **registry 是唯一權威且 append-only**：改 `status`、加 `reject_reason`／`merged_into`，**絕不刪 registry entry、不重用 id**。
- **刪 content 檔＝丟垃圾桶**（`rm` 被 alias 成 trash，可復原）：`rm content/games/cdg-NNNN.md`（**不加 `-f`/`-rf` 旗標**，見 CLAUDE.md）。
- 落檔前 `git status`／`git diff` 對磁碟驗證，別憑印象回報。
- 全部處理完 `npm run validate` 要全綠（content 檔數應等量減少）。

> **⚠ 已知失敗模式：no-op 被誤判成「顯示問題」。** 實測過一次 80 分鐘、零產出的空轉：思考在規劃 reject 時撞到 `max_tokens`（單輪 thinking 吃滿 64000、`stop_reason:max_tokens`、沒送出任何 Edit/rm），**變更根本沒執行**；但下一輪把計畫當成已做，跑 validate/`git status` 看到「沒變」，卻誤判成「registry 顯示重複是顯示問題／git 沒追蹤到」而反覆重查。實情：磁碟全程自洽、registry 確認 tracked、validate 早報 `unique ids`，**沒有任何顯示 bug**。
> - **硬規則：** 改完後 `git status`／`validate` 若沒反映你的變更，**第一假設永遠是「我根本沒送出那個 Edit/rm」→ 直接重跑該動作**，絕不是「觀測工具壞了／顯示問題／git 沒追蹤」。registry 與 content 都在 git 追蹤內，改了就一定會顯示。
> - **預防：** 別在同一輪「長考複查 + 逐檔手 Edit」；先在**唯讀**回合把複查結論定下來（哪些 id 真的 reject/merge、理由），再用**確定性的短動作**逐一落地（一個 id 一輪：改 registry status → `rm` → 記下），讓每輪思考短到不會撞截斷。批量多筆時把 registry 標記 + 刪檔寫成一次性 `jq`/腳本跑，別讓模型逐檔手 Edit。

## A. reject（範圍外剔除）

### 1. 複查（最關鍵，別跳過）
- **逐款查定性**：這筆真的是「非遊戲／範圍外」嗎？批次多款 → 開**平行 research agent**（每 agent 2–3 款，查 chiuinan/MobyGames/Wikipedia），回傳「定性＋一句理由＋來源 URL」，自己再核對。
- **常見誤殺**（務必抓出來、勿刪）：
  - 被中文名或「學習/教育」字樣誤判為非遊戲，其實是**有玩法的遊戲**（雲霄飛車/經營模擬、edutainment 冒險/解謎）。
  - 標題像教材、實為某系列遊戲的一作。
- **⚠ 保留類 pre-check（後 2000 不等於一定 out）**：`about.astro` 有一類延伸收錄「**DOS 時代重要國產廠商在此之後的發行**」，具名**光譜（T-Time）**與**弘煜**。批次 reject 前先查候選有無 `developer: 光譜` 或 `publisher_tw` 含光譜 → **一律移出 reject 名單、保留**（即使後 2000、即使光譜只是代理外商作）；完整清單維護在 `derived/ttime-catalog.tsv`。**弘煜**同屬該類、尚待使用者確認是否比照，撞到先問。詳見 memory `keep-all-guangpu-ttime`。
- **範圍判準**（照 scope.md／about.astro）：非台灣市場、外文且無台灣中文化/代理足跡、純學習/教材/課程/工具軟體 → out；**兒童向 edutainment 即使具解謎/冒險玩法也 out**（使用者已定調，見 project memory `scope-edutainment-excluded`）。
- **判「無台灣足跡」前先確認台灣譯名**：庫內 `title_zh` 未必是當年通行譯名，用錯名字查必然落空（實測假陰性頭號成因，比來源 403 更常誤判）。詳見 memory `tw-title-variants-false-negative`。
- **邊界/政策不明 → 先問使用者**，別自作主張刪；使用者給的 reject 清單若含疑似真遊戲，回報並確認後再處理。

### 2. 斷鏈檢查
- `rg -l "cdg-NNNN" content/ --glob '!**/cdg-<NNNN>.md'`——有其他條目連入就先處理（PROD 對未發佈連結會自動退化，但 reject 是整筆消失，仍應確認無正文引用它）。

### 3. 落地
- registry：`status: "rejected"` ＋ `reject_reason: "out of scope: <是什麼>，<為何範圍外>"`（固定句式；比對既有 rejected 條目的措辭）。
- `rm content/games/cdg-NNNN.md`。
- `npm run validate`。

`reject_reason` 範例：
- `out of scope: 國小數學教材（資優數學），非遊戲`
- `out of scope: 兒童冒險解謎 edutainment（胖胖豬十萬個為什麼系列N），主要對象為兒童之學習向作品，非收錄範圍`
- `out of scope: Ultimate Ride: Disney's Coaster (2001)，外文 Windows 遊戲、2000 年後、無台灣中文化／代理發行足跡`

## B. merge（重複併入）

- 判定兩筆是**同一款**（非同名不同作——見 memory `samename-code-misattribution`：同中文名 fuzzy-merge 常把別款的貴/珍碼掛錯；紅旗＝foreign＋空 publisher 卻有碼）。
- **保留方**（通常資料較全或 id 較早）：把被併方的 `title_zh` 收進 `title_aliases`，補齊 provenance/來源。
- **被併方** registry：`status: "merged"` ＋ `merged_into: "cdg-<保留方>"`；`rm` 被併方 content 檔。
- 需要 URL 重導時比照 `docs/company-aliases.md` / `src/lib/company-aliases.js` 的機制。

## 批次與 commit

- **撈識別用 zsh 陣列**：Bash 工具實為 zsh，不對 `$var` 做空白分割——用 `ids=(2300 0798 …); for n in $ids; …`，不要 `ids="…"`（會被當單一元素）。
- **拆 logical commit**：reject/merge 與「寫條目」分開 commit；不順手 commit 批次外的既有改動（先 `git status` 看有沒有別人未完成的檔）。
- **混合改動的 `id-registry.json` 要拆 commit**：同一檔同時含「條目改動（新增/改標題）」與「reject/merge 標記」時，用 **v1/v2 重建法**——`jq` 把某一批 id 的 `status` 暫還原成 `active`（del `reject_reason`）產出 v1，先 stage/commit 條目那批；再還原完整 v2、stage 刪除檔＋registry、commit reject 那批。
- **index.lock 搶佔**：Xcode 等 git 索引程序會短暫佔用 `.git/index.lock` 使 commit 失敗——commit 改用單次 `git commit <pathspec…> -F <msg>`（一次鎖定窗口）並加重試迴圈，別逐檔 `git add`。
- 依 memory `review-before-push`：內容大批改動 commit 後**先不 push**，留未 push diff 供使用者 review。

## Out of Scope

- **撰寫/補正文** → `game-entry`（本 skill 只處理退場/合併，不寫內容）。
- 不主動擴大刪除範圍：只處理使用者指定的 id；批次外的不順手動。
- 資料層欄位校訂（非退場/合併）走 BACKLOG／專門批次。
