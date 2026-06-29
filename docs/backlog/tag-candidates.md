---
status: open
created: 2026-06-29
---

# Tag 候選（受控詞彙擴充）

`tags`（schema `TAGS`）是**跨系列、跨廠商的受控標記**，經 topic `list_games.{tag}`
自動聚合成專題（landing page＝該 tag 的手寫 topic）。新增 tag = 改 `schema/game.schema.mjs`
的 `TAGS` + `src/lib/labels.js` 的 `TAG_LABELS` + 回填各款 `tags` + 建 `content/topics/<名>.md`
（含 `list_games.tag`），同一 commit 完成。

**判準**：不與 `series`（單值）、`genre`（22 類）、`adaptation`（medium/title/author，金庸改編已走
adaptation_author）重複；要是「共享 IP／設定／引擎／平台世代」這類事實性跨切群集。

現有：`adnd`（顯示「龍與地下城」）＝ AD&D 授權作，23 款。

掃描基準：已發表 920 款（2026-06-29）。

## 建議新增（乾淨、價值高）

- [ ] **三國題材 `sangoku`（顯示「三國」）— 最推薦**
  嚴格抓 title/series 即 15 款，跨 KOEI（三國志系列 8）、智冠（三國演義／吞食天地 5）、奧汀（2）；
  放寬到內文（赤壁、群雄…）更多。典型共享歷史設定、跨廠商，與 adnd 同類。建議優先實作。

## 需先定義範圍

- [ ] **武俠 `wuxia`（顯示「武俠」）— 高價值但邊界模糊**
  粗估 40~56 款（智冠 17、漢堂、大宇…）。動手前須先界定：含不含仙俠？只收原創武俠還是連武俠
  改編一起？與金庸改編（adaptation）會部分重疊。**待使用者拍板定義再做。**

- [ ] **SSI Gold Box `gold-box`（顯示「金盒」）— 考據向、adnd 子集**
  23 款 adnd 中 13 款屬 SSI Gold Box 引擎線。乾淨的事實性子分類，但與 adnd 高度重疊，屬錦上添花。

- [ ] **Apple II 國產 `apple2`（顯示「Apple II 國產」）**
  目前僅 3 款（精訊，1985–87，`platform_note: Apple II`）。量小，但對應「關於」頁延伸收錄第一條，
  可讓那批延伸收錄變成可瀏覽集合。低成本、可選。

## 不做成 tag（維持現狀）

- 棒球/職棒（13）、麻將（14）、大富翁桌遊（30）、高爾夫 → 本質是 **genre**（SPG／TBG），做 tag 會與 genre 重複。
- 金庸 → 已由 `adaptation_author` + 專題「金庸改編遊戲」涵蓋。
- 二戰（~21）→ 多為外文空戰/潛艇模擬重發，與「台灣產品導向」較遠、邊界鬆，優先度低。
