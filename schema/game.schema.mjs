// Zod schema for a Chinese DOS game catalog entry.
//
// Portable to Astro Content Collections: in src/content.config.ts do
//   import { z, defineCollection } from 'astro:content';
//   import { gameSchema } from '../../schema/game.schema.mjs';
//   export const collections = { games: defineCollection({ type: 'content', schema: gameSchema }) };
// (Astro re-exports zod, so the shape below transfers unchanged.)
import { z } from "zod";

export const REGIONS = ["TW", "HK", "CN", "MO", "JP", "US", "FR", "GB", "DE", "KR"];
export const GENRES = [
  "回合角色扮演", "即時角色扮演", "策略角色扮演", "冒險解謎", "故事劇情",
  "策略", "模擬養成", "教育養成", "桌遊棋牌", "格鬥", "運動動作",
];

export const gameSchema = z.object({
  // identity
  id: z.string().regex(/^cdg-\d{4,}$/),
  // publish gate: false = visible in dev only, excluded from the production site.
  // Stored in data/publish-state.json (survives content regeneration); flipped
  // per-entry after human review. Default false (nothing publishes unreviewed).
  published: z.boolean().default(false),
  title_zh: z.string().min(1),
  title_aliases: z.array(z.string()).default([]),
  slug: z.string().nullable().default(null),

  // release facts
  year: z.number().int().min(1970).max(2030).nullable(),
  developer: z.string().nullable(),
  developer_region: z.enum(REGIONS).nullable(),
  // in-house development team/sub-studio, e.g. 大宇's DOMO小組 / 狂徒創作群
  dev_team: z.string().nullable().default(null),
  publisher_tw: z.array(z.string()).default([]),

  // classification
  content_language: z.enum(["zh", "en"]).nullable(),
  genre: z.enum(GENRES).nullable(),
  localization_level: z.enum(["native", "localized", "packaging", "foreign"]).nullable(),
  series: z.string().nullable().default(null),
  // content rating: true = 成人/限制級 (18禁). DOS-era TW predates the GSRR levels,
  // so a simple flag suffices.
  adult: z.boolean().default(false),
  // adaptation source when the game is based on another work (漫畫/小說/電影/布袋戲…)
  adaptation: z.object({
    medium: z.enum(["漫畫", "小說", "電影", "電視劇", "布袋戲", "動畫", "傳說", "桌遊", "遊戲", "其他"]),
    title: z.string(),
    author: z.string().optional(),
  }).nullable().default(null),

  // chiuinan-sourced descriptors
  size: z.string().nullable(),
  platform_note: z.string().nullable(),
  catalog_id: z.string().nullable(),            // chiuinan archive ref (SCD/JXP...)

  // authorization of the Taiwan distribution. null = 未考據 (default, since much is
  // unclear); unofficial = 未授權代理/水貨/盜版 (e.g. 軟體世界 貴族版 series).
  license_status: z.enum(["official", "unofficial"]).nullable().default(null),

  // publisher's OWN product numbers (each company numbers differently). e.g.
  // 軟體世界 貴090. status=placeholder marks a reserved-but-not-released code
  // (轉珍藏版: planned for 貴族版, actually shipped as 珍藏版).
  release_codes: z.array(z.object({
    issuer: z.string(),
    code: z.string(),
    status: z.enum(["released", "placeholder"]).optional(),
    note: z.string().optional(),
  })).default([]),

  // editions: one id = one game work; media/packaging/minor variants live here
  // (different id only for remakes, art redraws, localization — see docs/id-policy.md)
  editions: z.array(z.object({
    name: z.string(),                          // e.g. 光碟典藏版 / 磁片版 / Windows版
    year: z.number().int().min(1970).max(2030).nullable().optional(),
    media: z.string().optional(),              // 磁片 / CD / DVD ...
    boxart: z.string().optional(),             // local image path
    note: z.string().optional(),              // what differs (added voice, etc.)
    provenance: z.array(z.string()).optional(),
  })).default([]),

  // development credits (role + person), hand-curated
  staff: z.array(z.object({
    role: z.string(),                            // e.g. 程式製作 / 美工設計 / 音樂製作
    name: z.string(),                            // credited name (may be a 署名代號, e.g. T.M.H.)
    person: z.string().optional(),               // canonical /people slug when name is an alias/代號
  })).default([]),

  // media & links
  cover: z.string().nullable().default(null),
  images: z.object({
    chiuinan: z.array(z.string()).optional(),
    rwv_cover: z.string().optional(),
    fandom: z.string().optional(),
  }).default({}),
  references: z.object({
    omega: z.string().url().optional(),
    fandom: z.string().optional(),
    chiuinan: z.string().url().optional(),
  }).default({}),
  external_links: z.record(z.string().url()).default({}),

  // provenance & derivation metadata
  provenance: z.array(z.string()).min(1),
  localization_basis: z.string().optional(),
  rwv_source_id: z.string().optional(),
  rwv_match: z.enum(["exact", "edition", "alt"]).optional(),
});

export default gameSchema;
