# 發行確定性（release_status）設計

> 日期：2026-06-28
> 狀態：已批准，待實作
> 範圍：schema 新增一個 flag 欄位 + 文件對齊。**不含站台展示／篩選層。**

## 問題

`scope.md` §5 把發行狀態當成**二元門檻**——「只收有實際發行的遊戲，未發行歸 vault」。但實際研究會遇到一條被遺漏的維度：**發行確定性**，而它有中間刻度容納不下：

| 情況 | 發行確定性 |
|------|-----------|
| 宣布開發，確定沒上市（自製流產） | 確定未發行 |
| 宣布代理，後來沒成（代理流產） | 確定未發行 |
| 有報導／廣告，但找不到實體（自製或代理） | 存疑 |
| 確認有實體（既有絕大多數款） | 已發行 |

二元門檻容納不下「存疑」這一格。

## 決策

**發行確定性是又一個「全收＋flag 篩」的維度，不是排除門檻。** 這與本庫核心原則一致——中文化程度、地域、自製/商業每個維度都用 flag 標記而非剔除，只有 §5 是全庫唯一的硬排除例外。本設計把這個例外收編進統一哲學。

具體三項決策：

1. **走「單一 catalog ＋ flag」（A 方案），不走「catalog ＋ 獨立清單」（C 方案）。**
   理由：C 把檔案位置／id 配置的邊界畫在最不確定的軸上（存疑↔確定未發行常隨研究翻動），狀態一翻就要遷檔、`id-registry.json` 留孤兒號。A 把這條軸降級成欄位值，翻動只改 frontmatter，id 穩定。

2. **catalog 邊界從「有實際發行」改成「有可考據的公開產品足跡」。**
   曾有名字、有報導／廣告／發行計畫者，無論最後上市與否都進 catalog 用 flag 標狀態；**純內部構想（無公開足跡）仍歸 vault〈幻之未發表遊戲〉敘事筆記**。新邊界（當年有沒有公開）遠比舊邊界（有沒有真上市）穩定。

3. **發行確定性用單一 enum 三值，不細分。** 細分留給正文敘述，enum 保持粗粒度好維護、也避免逼自己對每款做難查證的細判斷。

## Schema 變更

`schema/game.schema.mjs`，classification 區、`license_status` 附近（兩者都是 `*_status` 發行面向欄位）：

```js
// 發行確定性。released = 確認上市（既有 4507 款的預設）；
// unreleased = 有公開足跡但確認流產/未上市；unverified = 有報導/廣告但找不到實體佐證，存疑。
release_status: z.enum(["released", "unreleased", "unverified"]).default("released"),
```

**`default("released")`**：既有 4507 款都在舊「只收有實際發行」門檻下進來，預設 released 與既有斷言一致，**不必批次改檔**；只有新增的流產／存疑款才顯式標 `unreleased` / `unverified`。

### 正交性（不必再開欄位）

- **自製 vs 代理** 已被 `developer` / `publisher_tw` 表達。「自製流產」與「代理流產」共用同一個 `unreleased`，是誰流產看 developer/publisher 即知。
- **`release_codes` 的 `placeholder`** 是**單一編號**層級（某版本沒出、但本體有出，如轉珍藏版）；`release_status` 是**整款**層級。一款可以 `release_status: released` 同時底下有 placeholder 編號，兩層各管各的。
- **存疑佐證** 走既有 `footnotes` / `references` 機制：看到哪則廣告／報導、為何找不到實體，寫進正文＋引用，不另開欄位。

## 顯示標籤

`src/lib/labels.js`，比照 `LOC_LABELS` 的模式新增：

```js
// Human-readable labels for the release_status enum.
// released is the normal case and renders no badge — only the two exceptional
// states surface a label.
export const RELEASE_LABELS = {
  unreleased: '未發行',
  unverified: '發行存疑',
};

export const releaseLabel = v => RELEASE_LABELS[v] || '';
```

`released` 不給標籤（正常款，回傳空字串），只有兩個例外狀態顯字。

## 文件對齊（與 schema 同 commit 或緊接）

- **`scope.md`**：§5「發行狀態」從硬門檻改寫成 flag 維度（catalog 邊界＝有可考據的公開產品足跡；發行確定性用 `release_status` 三級）；§核心原則「分級不排除」補一句涵蓋這條新軸，讓四維度一致。「待 schema 階段對應的欄位」清單補 `release_status`。
- **`CLAUDE.md`**「專案是什麼」末段「本庫只收有實際發行的遊戲；未發行者歸…」要改，否則與新邊界矛盾。
- **`schema.md`**：欄位列表補 `release_status`。
- **`game-entry` skill**：提一句——新增款若流產／存疑，記得標 `release_status`（並把佐證寫進正文＋footnotes）。

## 明確排除（YAGNI）

- **站台展示／篩選不在本次範圍。** unreleased/unverified 款怎麼在站台呈現（badge、能否被篩掉）是另一個展示決策，且站台仍在變動；展示層另有 `published` gate（預設 false、逐筆審後上線）獨立把關。本次只做「能被記錄＋能驗證（`npm run validate`）」。
- **不細分 enum**（不拆「很可能有出/根本沒出」、不拆「完成未上市/半途喊停」）。
- **不遷移既有資料**（default released 即涵蓋）。

## 驗證

`npm run validate`（Zod 驗 content frontmatter）通過。新增欄位有 default，既有 4507 款不需改動即通過。
