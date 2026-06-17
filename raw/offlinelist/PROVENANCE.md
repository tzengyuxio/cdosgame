# Provenance: OfflineList 中文DOS遊戲圖鑑（cndosgames）

- **來源**：https://archive.org/details/cndosgames （by NashG）
  - DAT：https://archive.org/download/cndosgames/OfflineList-cDOSgames/datas/Chinese%20Game%20Dat%20-%20DOS.zip
  - 圖片：https://archive.org/download/cndosgames/OfflineList-cDOSgames/imgs/Chinese%20Games%20-%20DOS/
  - 另有 `cndosgames_meta.sqlite`（492KB）、`cndosgames_meta.xml`（archive.org item metadata）
- **取得**：curl，2026-06-15；解開 zip 得 `Chinese Game Dat - DOS.xml`（OfflineList 格式，UTF-8）。
- **版本**：datVersion 20230721。
- **可信度**：★★（個人整理的 OfflineList 圖鑑，含截圖與廠商/年代/語言/地區欄位）。

## 內容

- **724 款** `<game>`，OfflineList XML 格式。每筆欄位：
  - `imageNumber`（對應 imgs 下截圖編號）、`releaseNumber`、`title`（簡中）、
    `publisher` / `sourceRom`（廠商，簡中）、`location`（地區代碼）、`language`（語言代碼）、
    `comment`（發行年）、`saveType`、`romCRC`、`duplicateID`。
- `<configuration>` 段含 location/language 代碼對照、廠商搜尋預設等。
- imgs 下有 192+ PNG 截圖（gitignored；需時依 imageNumber 重抓）。

## 用途

- **交叉比對／補洞清單**：另一份獨立整理的 724 款清單，可與 chiuinan/fandom/omega 等 master 比對，
  找各源未覆蓋的候選；簡中 → 繁中需轉換對齊。
- DAT 內含 `location`（台/港/中等地區）與 `language` 代碼，對 region/content_language 標記有參考價值。
- 尚未納入 pipeline；如要 ingest，寫 `scripts/parse_offlinelist.py` 解析此 XML → `derived/offlinelist-games.json`。
