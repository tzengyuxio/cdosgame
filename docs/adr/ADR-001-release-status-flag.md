# ADR-001：發行確定性用 flag、catalog 邊界改「有公開產品足跡」

- 日期：2026-06-28（決策）／2026-07-23（轉為 ADR）
- 狀態：已採納
- 影響：`schema/game.schema.mjs`（`release_status` 欄位）、`scope.md` §5、`src/lib/labels.js`（`RELEASE_LABELS`）

## 背景

`scope.md` §5 原本把發行狀態當成**二元硬門檻**——「只收有實際發行的遊戲，未發行歸 vault」。這是全庫唯一的硬排除例外（中文化程度、地域、自製/商業各維度都用 flag 標記而非剔除）。

但實際研究常遇到二元門檻容納不下的中間刻度：宣布開發/代理後流產（確定未發行）、有報導或廣告但找不到實體（存疑）。把邊界畫在「有沒有真上市」這條最不確定的軸上，會逼得研究一有翻動就要遷檔、`id-registry.json` 留孤兒號。

## 決策

**發行確定性收編為「全收＋flag 篩」的維度，不再是排除門檻。** 三項具體決策：

1. **走「單一 catalog ＋ flag」（A 方案），否決「catalog ＋ 獨立清單」（C 方案）。** C 把檔案位置／id 邊界畫在最不穩定的軸上，狀態一翻就要遷檔並留孤兒 id；A 把這條軸降級成 frontmatter 欄位值，翻動只改欄位、id 穩定。
2. **catalog 邊界從「有實際發行」改成「有可考據的公開產品足跡」。** 曾有名字、報導、廣告或發行計畫者，無論最後上市與否都進 catalog 用 flag 標狀態；純內部構想（無公開足跡）仍歸 vault〈幻之未發表遊戲〉。新邊界（當年有沒有公開）比舊邊界（有沒有真上市）穩定得多。
3. **`release_status` 用單一 enum 三值，不細分。** `released`（default，涵蓋既有全部款、不必批次改檔）／`unreleased`（有足跡但確認流產）／`unverified`（有報導廣告但查無實體，存疑）。細分留給正文敘述＋`footnotes`/`references` 佐證，enum 保持粗粒度好維護。

## 影響

- schema 新增有 default 的 `release_status`，既有款不需遷移即通過 `npm run validate`。
- `scope.md` §5 與核心原則「分級不排除」對齊四維度；catalog 只留有公開足跡者。
- `src/lib/labels.js` 的 `RELEASE_LABELS` 只對 `unreleased`/`unverified` 兩個例外狀態顯標籤，`released` 不顯。
- 明確 YAGNI 排除：站台展示／篩選另屬展示決策（另有 `published` gate 把關），不在本決策範圍；不細分 enum；不遷移既有資料。

## 已否決的替代方案

- **C 方案（catalog ＋ 獨立未發行清單）**：把 id 邊界綁在最會翻動的軸上，狀態變更即需遷檔、留孤兒號，維護成本高。
- **維持二元硬門檻**：容納不下「存疑」這格，且會把有公開足跡的流產款排除在資料庫外，與「齊全考據」定位相悖。
