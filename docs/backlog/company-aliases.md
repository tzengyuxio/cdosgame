---
status: open
created: 2026-06-25
---

# 公司別名 → canonical 頁 redirect 候選

機制已就緒：精選表 `src/lib/company-aliases.js`（alias → canonical id），同時驅動
`astro.config.mjs` 的 redirect 與 `companies/[name].astro` 的 getStaticPaths 歸屬。
**新增一筆 = 在精選表加一行**即可（舊網址自動導向、別名發行的遊戲自動歸 canonical）。

挑要做的就從下面搬進精選表；做完從本檔劃掉。

## 已啟用
- [x] 世紀縱橫 → 貳碼科技

## A. 單純改名／別名（低風險，可直接加進精選表）
- [ ] 微波軟體 → 微波
- [ ] 精訊資訊 → 精訊
- [ ] 第三波文化事業 → 第三波
- [ ] Soft-World → 智冠
- [ ] 歡樂盒資訊 → 歡樂盒
- [ ] Softstar → 大宇
- [ ] 松崗電腦圖書 → 松崗
- [ ] 新艺（簡體）→ 新藝
- [ ] FunYours → 弘煜
- [ ] 華義國際 → 華義
- [ ] Gamania → 遊戲橘子
- [ ] C&E → 全崴
- [ ] Hosen / Horng Shen → 宏申
- [ ] GDAN / 佳帝安有限公司 → 佳帝安
- [ ] 台灣光榮綜合資訊（含全名）/ Koei Taiwan → 台灣光榮
- [ ] 光榮 / Koei / コーエー / 光榮特庫摩 → KOEI
- [ ] 第三波文化事業 → 第三波

## B. 需人工裁決（衝突或撞到既有頁，精選表先別加）
- [ ] `UserJoy`：同時被**宇峻奧汀**與**宇峻**宣告為 alias → 要決定指向哪一個（或不做）。
- [ ] `富進`：是遊戲橘子的 alias，但富進本身是獨立公司頁 → 釐清是否為同一實體。
- [ ] `帝技爺如` / `台灣TGL` / `TGL`：帝技爺如與 TGL 互相把對方當 alias，且兩者皆有獨立頁 → 釐清正本。
- [ ] 宇峻 / 奧汀 / 宇峻奧汀：三者合併關係，決定 canonical 與是否互相 redirect。

## 注意
- 精選表**不要**塞會撞到既有公司頁 id 的別名（會蓋掉那頁），程式無額外防呆。
- 同一別名只能指一個 canonical。
