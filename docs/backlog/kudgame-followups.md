# kudgame 專案級後續待辦

kudgame 批次補完過程中揪出、**需獨立動作**的專案級待辦（建頁／補 alias／系列缺口等）。

⚠ 這裡**只收非逐條、需獨立動作**的事。逐條 cdg 的欄位待核疑點（開發商／發行商分歧、region、scope 等）請查 [game-entry-review.md](game-entry-review.md)；完成史見 [kudgame-done-log.md](kudgame-done-log.md)。

格式：`- [ ] 標題 — 一句說明`（完成就打勾或刪除）。

---

- [ ] cdg-3176 補「摩登都會」alias — 智冠中文版正名（SimCity 2000，rar 095）；款已 published，僅補別名
- [ ] 建 topic 頁「電腦休閒世界」— 比照 `content/topics/歐風軟體遊戲列表.md`；只列 025（決戰撲克 cdg-4250）／095（摩登都會 cdg-3176）兩筆有品號品項、不用 SWZ 表；完整編號表待從 Endless Fight 骨灰集散地掃描補
- [ ] series 頁缺口：`content/series/工人物語.md`、`content/series/聖魔大戰.md` 不存在卻有款指向 — 「有 series 值但無系列頁」為全庫常態，此二為 kudgame 批中揪出者，待補頁或釐清
- [ ] 中國棋王系列 cdg-0297／cdg-0298 仍為 stub、series 留 null — cdg-0300（暗棋大車拼）已 cross-link；catalog_id SCD2202 由 0297/0298/0300/2151 共用，疑同碟/合輯，待核

## 電腦休閒世界型錄圖待掛（2026-07-21）
- [ ] `raw/media/_hold/0493_電腦遊戲世界_No.108_1993-07/SSC_0138.jpg`、`SSC_0139.jpg` ＝「電腦休閒世界產品目錄」G001–G060 全型錄兩頁，應掛在 `/topics/電腦休閒世界`。目前 media pipeline 的實體頁僅支援 companies／people／teams，topics 無對應路徑，待 pipeline 支援後入庫。
- [ ] 型錄同頁證實編號體系為 G001–G060（盒背印作 NO.NN，同一序列），售價與類別齊全，可據以重寫 topic 表格。
