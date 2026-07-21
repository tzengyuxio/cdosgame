# 《遊戲世界》169／180 期掃描補條目

> ✅ **已完成（2026-07-22）**：80 個條目全數補完，16 批全部 commit。
> 本檔保留作業方法供日後其他期別／其他雜誌的掃描補條目沿用。

《遊戲世界》第 169 期（1998 年 8 月）與第 180 期（1999 年 7 月）的 135 張掃描已入庫，
分批把報導／廣告的內容補進對應遊戲條目。本檔記**怎麼跑**與**待裁決事項**。

## 進度怎麼查（別手動維護清單）

```fish
# 還沒補正文的條目（有遊戲世界的圖、但沒有 cgw footnote）
for f in (rg -l "caption: 遊戲世界" content/games/)
    rg -q "key: cgw1(69|80)" $f; or basename $f .md
end | sort

# 跑到第幾批
git log --oneline --grep="batch [0-9]*/16"
```

總量 80 個條目，每批 5 款。各批的決策理由寫在該批的 commit message 裡，要回溯看那裡。

## 每批怎麼跑

**1. 派 5 個 subagent，一個條目一個**（各改各的檔，不衝突）。prompt 範本見下節。

**2. 主線抽驗**（subagent 回報的是「打算做什麼」，不可照抄）：

```fish
npm run validate                                    # 必須全綠
rg -o '。<sup class="cite" data-ref="cgw1(69|80)' content/games/cdg-XXXX.md   # 應為 0：cite 要在句號前
rg -n "售價|定價|元整" content/games/cdg-XXXX.md      # 應為空
```

**3. 主線補 caption 的「單元」**——**這步一定要主線做**，`press-import` skill 明載踩坑：
續派的 subagent 記憶停在入庫前，交給它們一定漏改。把 subagent 回報的單元名填進去：

```
caption: 遊戲世界 第180期 p.55  →  caption: 遊戲世界 第180期・強檔預報 p.55
```

常見單元：`採購指南`、`強檔預報`、`遊戲評論`；廣告一律寫 `廣告`。

**4. commit**（一批一筆，訊息寫清楚該批的判斷與衝突處理）。

## subagent prompt 範本

以下規則是前四批逐步校準出來的，**照抄別省**：

```markdown
你在 /Users/user/works/cdosgame（中文 DOS 遊戲資料庫）補一則條目的正文。

目標條目：content/games/cdg-NNNN.md
掃描原圖：raw/media/games/cdg-NNNN/ 底下的 .jpg（檔名含刊名期號與頁碼）

## 步驟
1. 先讀規範：.claude/skills/game-entry/SKILL.md 與 docs/refs-convention.md。
2. 讀 content/games/cdg-NNNN.md 了解現有內容。
3. 讀 raw/media/games/cdg-NNNN/ 的每一張掃描圖（Read 工具，絕對路徑），逐字讀出可用資訊。
4. 把來源帶來的新資訊寫進正文並加引用。

## 引用格式
- frontmatter 的 `references:` 前加 `footnotes:`（已有就 append）：
  footnotes:
  - key: cgw169
    text: '〈報導標題〉，《遊戲世界》第 169 期（1998 年 8 月），「單元名」，頁 N。'
  169 期＝1998 年 8 月、180 期＝1999 年 7 月（看檔名）。
  報導用 `cgw169`／`cgw180`；廣告用 `cgw169ad`／`cgw180ad`，各自一則 footnote。
- **cite 標籤放在句號【之前】**：`……敵我同時行動<sup class="cite" data-ref="cgw169"></sup>。`

## 內容鐵律
- **不要寫售價**。
- 主觀評語（宣傳詞、評測語氣）不可當客觀事實，用「報導稱」「廣告稱」框住。
- 上市前預報的上市日、規格是「預定」不是「實際」，措辭標明。
- **frontmatter 的 developer／year／genre 不因單張雜誌報導而改**；有出入只在回報中列出。
- **例外**：若 `publisher_tw` 為空 `[]` 而廣告／報導明確印有發行商（如智冠、軟體世界
  標誌），可直接填入（智冠體系一律填 `智冠`）。若署名的是**工作室**（河洛工作室、
  Dream Maker、太極工作室…），填 `dev_team:`、不動 `developer`。
- **若報導講的是本作的另一個版本**（重製版、資料片、他家重出、中英文改版），
  不要混進主敘事——依 SKILL.md 的「`## 版本` 區塊」規範，在正文末尾用清單記錄。
- **公司動態**（遷址、徵才、改名啟事）不寫進遊戲正文——那屬公司頁，只在回報中提出。
- 不刪既有考據，只增補。
- **不要動 `media:` 的 caption**（主線統一處理）。
- 正文禁寫考據過程／編輯筆記。
- **published 判準**：正文僅來自單一則上市前預報 → 維持 `false`；有其他佐證，
  或來源本身是上市後報導／廣告 → 可設 `true`。

## 禁止
- **絕對不要執行任何 git 指令**。
- 不要改其他條目的檔案。

## 回報（結構化，簡短）
- 每張圖：標題／單元名（或「廣告」）／頁碼／類型／所載設計公司・發行商・上市日
- 與現有 frontmatter 的落差（現值 → 報導值 → 建議），以及你實際改了哪些欄位
- 正文新增哪幾點、published 設成什麼
- 疑點／風險
```

## 已定案的判斷（別重問）

- **頁碼**：掃描序號 `SSC_NNNN` ≠ 印刷頁碼。169 期偏移 0、180 期偏移 +2（各驗過兩張實體頁）。
  檔名裡的 `封面裡`／`封底裡` 不是頁碼（曾誤算成 p.2／p.998／p.226-1000，已修）。
- **footnote key**：《遊戲世界》與《電腦遊戲世界》共用縮寫 `cgw`（見 `docs/refs-convention.md`）。
- **published**：單一上市前預報 → false；有實體發行旁證（盒裝零售照等）→ true。
- **廣告可作發行商證據**：廣告是廠商付錢刊的，印著智冠／軟體世界即可補 `publisher_tw: 智冠`。
- **外國廠商命名**：遊戲畫面 > 包裝盒 > 報導廣告；通用名 > 漢字 > 英文。
  見 `docs/company-pages.md`「廠商名稱怎麼定」。

## 待裁決／後續

- [ ] **cdg-0795 風雷組 vs 風雷工作室**：廣告署「風雷組」，條目用「風雷工作室」。
      已定調用工作室（同單位不同時期稱呼），若日後查到正式名再統一。
- [ ] **超商通路 topic**（`content/topics/超商通路.md`，`published: false`）：
      後續批次若再遇到帶 7-ELEVEN／全家／萊爾富／太極標誌的廣告，補進該檔的實例。
- [x] **cite 位置全庫正規化**的前置條件已解除：本輪補條目已全部 commit，可以動工了（項目本體在 `BACKLOG.md`）。
