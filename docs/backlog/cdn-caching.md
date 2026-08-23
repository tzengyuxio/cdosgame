---
status: planned
created: 2026-08-23
---

# 靜態資產快取：脫離 GitHub Pages 的 10 分鐘上限

## 問題

PageSpeed Insights（行動版，2026-08-23）列出「使用有效的快取生命週期 — 預估可省下 505 KiB」。
成因單純：**GitHub Pages 對所有回應一律送 `cache-control: max-age=600`，且不開放自訂 header。**

```
$ curl -sI https://cdosgame.simagame.me/_astro/about.h0rdgzn2.css | grep cache
cache-control: max-age=600
```

吃虧最大的是本來最該長快取的兩類：

| 路徑 | 性質 | 現況 | 應該 |
|---|---|---|---|
| `/_astro/*` | 檔名含 content hash，內容一變檔名就變 | 600 秒 | `max-age=31536000, immutable` |
| `/media/**/*.webp` | 圖檔入庫後不再改動（改動＝換檔名） | 600 秒 | `max-age=31536000, immutable` |
| `/*.html` | 每次發佈都可能變 | 600 秒 | 短快取或 `must-revalidate`，維持現狀即可 |

回訪者每 10 分鐘就要重新驗證整站資產。首頁光圖片就約 174 KiB（已縮圖優化後），
條目頁的圖庫更多。

> 註：站內另一項「圖片傳送效能」已於 2026-08-23 解決（新增 160px `mini/` + `srcset`，
> 見 `docs/media.md` §品質建議）。本文件只談快取，兩者互不相干。

## 兩條路

### A. 域名前面掛 Cloudflare（低風險，建議先做）

`simagame.me` 的 DNS 改由 Cloudflare 託管，`cdosgame` 這筆記錄開橘雲（Proxied），
GitHub Pages 維持原樣當來源站。**repo 與 CI 完全不動。**

步驟：

1. Cloudflare 加入 `simagame.me`，把 registrar 的 NS 指到 Cloudflare 給的兩台。
2. 確認 `cdosgame` 的 CNAME 指向 GitHub Pages（`<user>.github.io`），狀態 Proxied。
3. SSL/TLS 模式設 **Full**（不要 Flexible，會造成重導循環）。
   GitHub Pages 那側維持 Enforce HTTPS。
4. 建 Cache Rules（Caching → Cache Rules）：
   - 規則一：`URI Path starts with "/_astro/"` → Cache eligibility: Eligible for cache，
     Edge TTL 1 年，Browser TTL 1 年。
   - 規則二：`URI Path starts with "/media/"` → 同上。
   - 其餘（HTML）不建規則，沿用預設。
5. 發佈後驗證：

   ```
   curl -sI https://cdosgame.simagame.me/_astro/<hash>.css | grep -i 'cache-control\|cf-cache-status'
   ```

   應看到長 `max-age` 與 `cf-cache-status: HIT`。

風險與注意：

- **DNS 轉移影響整個 `simagame.me`**，不只本站。其他子網域的記錄要先在 Cloudflare 補齊
  再切 NS，否則會斷。這是本方案唯一的真風險。
- Browser TTL 由 Cloudflare 覆寫，對已在使用者瀏覽器裡的舊 600 秒快取無效，要等它自然過期。
- 發佈後如需強制更新 HTML，用 Cloudflare 的 Purge Everything。

### B. 改部署到 Cloudflare Pages（一勞永逸，之後再說）

把部署目標換成 Cloudflare Pages，repo 加一個 `public/_headers`：

```
/_astro/*
  Cache-Control: public, max-age=31536000, immutable
/media/*
  Cache-Control: public, max-age=31536000, immutable
```

需要處理的：

- `.github/workflows/deploy.yml` 換成 `cloudflare/wrangler-action`，或改用 Cloudflare
  自己的 Git 整合。**注意保留 `fetch-depth: 0`** — JSON-LD 的 `dateModified` 與 sitemap
  `lastmod` 都靠逐檔 git 日期（見 `src/lib/gitdates.js`），淺 clone 會讓它們整批消失。
- `public/CNAME` 是 GitHub Pages 專用，搬家後失效，改在 Cloudflare 端設自訂網域。
- **檔案數是硬限制，且已經很緊**：Cloudflare Pages 單次部署上限 20000 檔，
  目前 `dist/` 實測 **15551 檔**（4359 頁 HTML ＋ 11178 個 webp ＋ 其餘）。
  隨著條目與掃描圖增加，這個數字只會往上。搬家前務必先 `find dist -type f | wc -l`
  重算，並想好逼近上限後的退路（例如圖檔改走 R2 或獨立圖床）。
- 總量 `public/media` 約 891 MiB（多數是全尺寸原圖；`thumb/` 110 MiB、`mini/` 37 MiB）。

## 建議順序

先 A（改 DNS 即可、可回復、不動 repo），量一次 PSI 確認那 505 KiB 消失。
真的要脫離 GitHub Pages 再評估 B，屆時先確認上面的檔案數上限。

## 相關

- 圖片尺寸策略：`docs/media.md`
- 本輪其他效能改動：GA 延到 idle、CSS inline、隱藏頁籤延後渲染（2026-08-23）
