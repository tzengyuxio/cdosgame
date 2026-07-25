---
status: done
created: 2026-07-25
completed: 2026-07-26
---

# 伊思儷成人遊戲條目批次 — HANDOFF

> ✅ **全部 35 款完成（2026-07-26）。** 末批 19 款已撰寫＋發佈，另建「豔鬼麻將」系列頁（cdg-3810/3811）。以下為歷史紀錄。

**任務**：把資料庫中所有 `developer: 伊思儷` 的條目（共 35 款，全為 18 禁成人遊戲、皆 stub）建立起來（撰寫正文＋補 genre＋發佈）。伊思儷是台灣成人遊戲廠商，2000 年代前期活躍。

**接手方式**：reset 後讀本檔，照下方「剩餘清單」逐批處理。已定調慣例見文末。**主要來源＝各款 references.chiuinan 介紹頁**（web 對成人遊戲著墨極少，青衫為唯一可靠來源）。研究委派 subagent（每 agent 5–6 款讀 chiuinan、回傳中性百科事實），主線寫正文＋validate＋commit。

## 已完成（16 款＋3 頁，commit 72dc42e8）

- **伊思儷公司頁**、**夢幻麻將館 系列頁**、**新官能教習 系列頁** 已建。
- 夢幻麻將館 1–9＋8續章：cdg-2760/2761/2762/2763/2764/2765/2766/2767/2768/2769（genre TBG、series 夢幻麻將館）
- 新官能教習 1–4：cdg-2329/2330/2331/2332（genre LSG、series 新官能教習）
- 新金瓶梅／真人版：cdg-2360/2361（LSG、adaptation 金瓶梅、互相 cross-link）

## 剩餘 19 款（待做）

| cdg | 標題 | 年 | 現 genre | 建議 genre | chiuinan intro |
|---|---|---|---|---|---|
| 0086 | H！神探 | 2002 | ADV | ADV | c21/hdetect.htm |
| 0356 | 大唐隸教傳 | 2005 | LSG | LSG | c33/dtlzz.htm |
| 0473 | 天狐16張 | 2003 | null | **TBG**(麻將) | c42/th16.htm |
| 0609 | 比基尼雀美眉 | 2003 | null | **TBG**(麻將) | c42/bjn.htm |
| 0865 | 艷鬼大富翁 | 2003 | TBG | TBG | c43/ygdfw.htm |
| 1020 | 嘿咻魔法娘 | 2004 | LSG | LSG | c33/hsmfn.htm |
| 1071 | 女生宿舍 | 2005 | AVG | AVG | c22/nsxs.htm |
| 1464 | 美女快打 | 2004 | FTG | FTG | c51/mnqd.htm |
| 1795 | 慾空間 | 2003 | null | **TBG?**(牌類，查) | c41/ykj.htm |
| 2730 | 夢幻大富翁：魔法大亂鬥 | 2003 | TBG | TBG | c43/mhrich.htm |
| 2740 | 夢幻撲克牌 大老二幻想曲 | 2003 | null | **TBG** | c41/oldtwo.htm |
| 2759 | 夢幻魔法牌之風月寶鑑 | 2003 | null | **TBG** | c41/mhmcard.htm |
| 2853 | 辛辣娛樂城 | 2001 | null | **TBG**(賭場) | c44/sina69.htm |
| 2854 | 辣妹五子棋 | 2001 | null | **TBG** | c41/lm5ch.htm |
| 3096 | 桃色幻想曲 | 2001 | null | **查**(c44) | c44/dg69.htm |
| 3120 | 極樂麻將 | 2002 | null | **TBG**(麻將) | c42/jlmj.htm |
| 3655 | 鬼惑 | 2004 | AVG | AVG | c22/gh.htm |
| 3810 | 豔鬼麻將1 | 2003 | null | **TBG**(麻將) | c42/ghostmj.htm |
| 3811 | 豔鬼麻將2：還陽記 | 2004 | null | **TBG**(麻將) | c42/ghostmj2.htm |

chiuinan URL 前綴：`https://chiuinan.github.io/game/game/intro/ch/`

**可考慮建系列頁**：豔鬼麻將（3810/3811）；「夢幻」牌類（大富翁/撲克/魔法牌）名義相近但未必同系列，依 chiuinan 判斷、勿硬湊。

## 已定調慣例（照做）

1. **frontmatter**：developer 伊思儷（已設）、`adult: true`（多數已設，缺的補上）、developer_region 免（伊思儷=台灣開發商，公司頁已建）。設 `genre`（見上表）、`catalog_id`→`chiuinan_id`（惰性遷移）、`published: true`。
2. **正文**：中性百科散文、勿露骨；1–2 段，開頭句「《X》是[伊思儷](/companies/伊思儷)於 YYYY 年推出的成人<類型>遊戲…」。來源為單一 chiuinan（general ref、自動列出），**內文不必逐句 `<sup cite>`**（單一來源、已在 references）。**勿寫「待補／考據過程」**，chiuinan 資訊少就只寫已知事實。
3. **改編作**加 `adaptation`（如風月寶鑑←紅樓夢？大唐隸教傳←？先查 chiuinan 再定）。
4. **genre 判準**：麻將/撲克/大老二/五子棋/大富翁/賭場→`TBG`；戀愛養成→`LSG`；視覺小說→`AVG`；點擊冒險→`ADV`；格鬥→`FTG`。存 key 非中文名。
5. **驗證**：`npm run validate` 全綠；每批 commit（content 一筆）；系列頁另 commit 或併入。
6. **發佈**：皆 `published: true`（都是有 chiuinan 足跡的實際產品）。

## 注意

- 伊思儷英文名各源不一（Islet/Eisliy…），公司頁未填 name_en，勿臆填。
- 部分 chiuinan 頁標「待補」（如新官能教習），資訊少屬正常，寫已知即可、勿硬湊。
