// Zod schema for a topic / 專題附屬頁 (content/topics/*.md). Filename = 中文 slug,
// route /topics/<slug>. Curated long-form pages attached to an entity
// (company/series/…) via `parent` (the entity join-key string used in game data).
import { z } from "zod";

export const topicSchema = z.object({
  name_zh: z.string(),
  published: z.boolean().default(true),   // topics 直出；預設顯示
  aliases: z.array(z.string()).default([]),
  parent: z.string().optional(),          // 所屬實體 join key（如 大宇）；母頁據此列出專題
  parent_type: z.enum(["company", "series", "team", "person", "event"]).default("company"),
  summary: z.string().optional(),
  // optional auto-aggregation: route lists games matching these adaptation filters
  // (永遠最新、零維護)。可在 body 策展前言之後自動渲染收錄清單。
  list_games: z.object({
    adaptation_author: z.string().optional(),
    adaptation_title: z.string().optional(),
    adaptation_medium: z.string().optional(),
  }).optional(),
  // 註釋 (footnotes): plain-text notes, no url; cited inline as [N]. See docs/refs-convention.md.
  footnotes: z.array(z.string()).default([]),
  references: z.array(z.object({ title: z.string().optional(), url: z.string().url(), cited: z.boolean().optional() })).default([]),
  external_links: z.record(z.string(), z.string().url()).default({}),
});

export default topicSchema;
