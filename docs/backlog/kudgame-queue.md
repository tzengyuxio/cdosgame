# kudgame 批次補完佇列

批次補完/新建遊戲條目的**進度佇列＋檢閱清單**。搭配 CLAUDE.md〈批次補完工作流〉使用。

**怎麼用**：一次把一整批遊戲名貼給 Claude（20–30 款也行），它先做 triage、把要你決定的事一次問完並填進此檔，再分批（每 5 款）build。你只需在 triage 階段回答判斷、在 Claude 提示時說「繼續 kudgame queue」。

**狀態圖例**：
- `[x]` 完成（補完或新建，已 publish）
- `[~]` 略過（已存在且已發佈，無需處理）
- `[!]` 建 stub（查無足跡，unverified、留白待考）
- `[ ]` 待處理（triage 過、等 build）
- `[?]` 卡住（需你決定，備註寫原因；決定後才轉 `[ ]`）

格式：`- [狀態] 遊戲名 — cdg-NNNN — 一句備註`。待考細節寫進 [game-entry-review.md](game-entry-review.md)，此檔只記狀態。

---

## 會宇批次（2026-07-15）

### 批次 1
- [x] 黑金企業 — cdg-2281 — 補完（System 3 Mob Rule，首作去序號、LSG→CBG）
- [x] 黑金企業2 — cdg-2282 — 補完（台灣專屬重製、LSG→CBG）
- [x] 大決戰 — cdg-5107 — 新建（ESOFNET 韓 RTS）
- [x] 哇哩咧炸彈人 — cdg-5108 — 新建（大眾軟件 陸 ACT）
- [!] 台灣爆笑麻將 — cdg-5109 — 查無足跡，unverified stub

### 批次 2
- [x] 神劍傳說 — cdg-1827 — 補完（developer YoYo Games→team AMOS 訂正）
- [x] 黑鷹傳奇 — cdg-2283 — 補完（北京八爪魚，殺氣沖天續作）
- [x] 時間之輪 — cdg-5110 — 新建（Legend FPS）
- [x] 機甲帝國 — cdg-5111 — 新建（Charybdis RTS）
- [x] 星際開拓者 — cdg-5112 — 新建（Egosoft 太空模擬，英文版 packaging/en）

### 批次 3
- [x] 18輪大車拼 — cdg-0007 — 復活 reject 條目（Synetic，會宇代理進口 packaging/en）
- [x] 天空之鷹：艾爾賽特任務 — cdg-0476 — 補完（工畫堂，genre LSG→SLG）
- [x] 天燎怒火 — cdg-0472 — 補完（O3 Games 太空 RTS，SLG→RTS）
- [x] 風之探索者 — cdg-1507 — 補完（Gruppo One 確認日本廠，year→2000）
- [x] 銀河創世紀2 — cdg-5113 — 新建（Digital Reality Imperium Galactica II）

### 批次 4
- [x] 神奇堆堆樂：動感積木 — cdg-1836 — 補完（ZOI 南韓，空間解謎 PZG）
- [x] 戰爭與和平 — cdg-5114 — 新建（金洪恩 韓 RTS）
- [x] 烏龍道士 — cdg-5115 — 新建（Orange Soft 韓 RPG，머털도사）
- [x] 波利魔特之千年幻想 — cdg-5116 — 新建（烏龍道士2）
- [~] 逐鹿中原之隋唐群英傳 — cdg-2569 — 前批已發佈，略過
