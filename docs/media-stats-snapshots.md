# 圖片來源統計快照

定期記錄站上策展圖片（`public/media/` 與 content frontmatter 的 `media[]`）的來源、實體與 kind 分布，供日後比對成長與結構變化。**新的快照往下 append，不改舊快照。**

重跑指令（fish）：

```fish
# 來源分布（依 frontmatter media[].source）
rg -N '^\s+source:\s*' content --no-filename | sed 's/^ *source: *//' | sort | uniq -c | sort -rn

# kind 分布
rg -N '^\s+kind:\s*' content --no-filename | sed 's/^ *kind: *//' | sort | uniq -c | sort -rn

# 實體類型檔數／資料夾數（不含 thumb）
for d in games companies people teams topics
    printf "%-10s %5s files %4s dirs\n" $d (fd -e webp . public/media/$d -E thumb | count) (fd -td -d1 . public/media/$d | count)
end
```

---

## 2026-08-03

- 交付圖檔（`public/media/**/*.webp`，不含 `thumb/`）：**3693** 張
- frontmatter `media[]` 引用：**3690** 筆

### 來源分布

| source | 名稱 | 張數 | 佔比 |
| --- | --- | ---: | ---: |
| `boneash` | 骨灰集散地 | 2090 | 56.6% |
| `chiuinan` | 青衫之友交流網 | 962 | 26.1% |
| `scan` | 本站掃描 | 521 | 14.1% |
| `self` | 本站製作 | 50 | 1.4% |
| `ymdks` | 遊戲說明書數位化保存 | 31 | 0.8% |
| `kudgame` | 隱名 遊戲部落格 | 16 | 0.4% |
| `youtube` | YouTube | 7 | 0.2% |
| `mobygames` | MobyGames | 4 | 0.1% |
| `old-games.ru` | Old-Games.RU | 3 | 0.1% |
| `swf` | | 2 | — |
| `omega` | Omega 老遊戲討論區 | 2 | — |
| `lowscore` | | 1 | — |
| `bravehome` | 勇者之家 | 1 | — |

`data/media-sources.json` 註冊 17 個 source，其中 `bahamut`、`fandom`、`haruo`、`wikipedia` 尚未有圖實際使用。

### 實體類型

| 類型 | 圖檔數 | 資料夾數 |
| --- | ---: | ---: |
| games | 3666 | 1817 |
| companies | 18 | 7 |
| people | 3 | 1 |
| teams | 3 | 2 |
| topics | 3 | 2 |

遊戲有圖者 1817 款，佔 catalog 4507 款的 40%。

### kind 分布

| kind | 張數 | | kind | 張數 |
| --- | ---: | --- | --- | ---: |
| `title` | 954 | | `manual-cover` | 39 |
| `ad` | 684 | | `floppy` | 26 |
| `box-front` | 646 | | `credits` | 18 |
| `box-back` | 559 | | `poster` | 9 |
| `press` | 307 | | `other` | 8 |
| `box-spine` | 176 | | `package` | 6 |
| `manual` | 120 | | `key-visual` | 4 |
| `map` | 51 | | `photo` | 1 |
| `screenshot` | 41 | | `disc` | 1 |
| `bonus` | 40 | | | |

### 觀察

- 圖庫高度集中在兩個外站（boneash + chiuinan 共 82.7%）；自有掃描 521 張是唯一無授權疑慮、可長期依賴的部分。
- `screenshot` 僅 41 張而 `title` 有 954 張——截圖類幾乎只收標題畫面，遊戲內畫面近乎空白。
