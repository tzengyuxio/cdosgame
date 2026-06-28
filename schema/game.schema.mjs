// Zod schema for a Chinese DOS game catalog entry.
//
// Portable to Astro Content Collections: in src/content.config.ts do
//   import { z, defineCollection } from 'astro:content';
//   import { gameSchema } from '../../schema/game.schema.mjs';
//   export const collections = { games: defineCollection({ type: 'content', schema: gameSchema }) };
// (Astro re-exports zod, so the shape below transfers unchanged.)
import { z } from "zod";
import { mediaArray } from "./media.schema.mjs";

export const REGIONS = ["TW", "HK", "CN", "MO", "JP", "US", "CA", "FR", "GB", "DE", "KR", "IE"];
// Genre taxonomy v2 — 22 keys in 7 groups (see docs/genre-taxonomy.md). Frontmatter
// stores the stable KEY; display names + group membership live in src/lib/labels.js.
export const GENRES = [
  "ACT", "FTG", "STG", "FPS", "RCG", "SPG", "SIM",   // 動作
  "RPG", "ARPG", "SRPG",                              // 角色扮演
  "ADV", "AVG", "AADV",                               // 冒險
  "SLG", "HSG", "RTS",                                // 策略
  "CBG", "CMS", "LSG",                                // 模擬經營
  "PZG", "TBG",                                       // 益智桌遊
  "ETC",                                             // 其他
];

// curated media kinds (see docs/media.md)
export const MEDIA_KINDS = [
  "box-front", "box-back", "box-spine", "package",
  "bonus", "poster",
  "disc", "floppy", "manual-cover", "manual", "ad",
  "title", "screenshot", "other",
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

  // 發行確定性 (release certainty). released = 確認上市 (default for the existing
  // catalog); unreleased = 有公開足跡但確認流產/未上市; unverified = 有報導/廣告但
  // 找不到實體佐證, 存疑. 自製 vs 代理 already encoded by developer/publisher_tw, so
  // both流產 cases share `unreleased`. Game-level — orthogonal to release_codes.placeholder
  // (that is edition-level). See docs/superpowers/specs/2026-06-28-release-status-design.md.
  release_status: z.enum(["released", "unreleased", "unverified"]).default("released"),

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
  // curated, deployed image library (see docs/media.md). Files live in
  // public/media/games/<id>/<src>; `source` is a code resolved via
  // data/media-sources.json.
  media: mediaArray(MEDIA_KINDS),
  // 註釋 (footnotes): plain-text explanatory notes (no url), cited inline as [N]. See docs/refs-convention.md.
  footnotes: z.array(z.union([z.string(), z.object({ key: z.string(), text: z.string() })])).default([]),
  references: z.object({
    // auto-collected source pages → 參考資料 段 as general references (no [N]).
    omega: z.string().url().optional(),
    fandom: z.string().optional(),
    chiuinan: z.string().url().optional(),
    // inline-cited sources → 參考資料 段. Two accepted shapes (see docs/refs-convention.md):
    //   legacy: { "label": "url" }                  — label doubles as the data-ref key
    //   keyed:  { "shortkey": { label, url } }       — short key for prose data-ref="shortkey"
    cited: z.record(z.union([
      z.string().url(),
      z.object({ label: z.string(), url: z.string().url() }),
    ])).optional(),
  // other general source keys (wikipedia/mobygames/gamer_table/…) → 參考資料 段 (no [N]).
  // value: a URL string, or an object { url, title?, retrieved? }.
  }).catchall(z.union([
    z.string().url(),
    z.object({ url: z.string().url() }).passthrough(),
  ])).default({}),
  external_links: z.record(z.string().url()).default({}),

  // provenance & derivation metadata
  provenance: z.array(z.string()).min(1),
  localization_basis: z.string().optional(),
  rwv_source_id: z.string().optional(),
  rwv_match: z.enum(["exact", "edition", "alt"]).optional(),
});

export default gameSchema;
