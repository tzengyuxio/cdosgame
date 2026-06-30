// Shared curated-media item shape for games / companies / people (see docs/media.md).
import { z } from "zod";

export const COMPANY_MEDIA_KINDS = ["logo", "building", "product", "ad", "press", "other"];
export const PERSON_MEDIA_KINDS = ["portrait", "photo", "other"];

// mediaArray(kinds, { games }) → Zod array. `games: true` adds an optional
// `games: [cdg-…]` field, for an image (e.g. a 代理 ad) that features several
// titles and is stored once on the publisher but surfaced on each game page.
export function mediaArray(kinds, { games = false } = {}) {
  return z.array(z.object({
    src: z.string(),
    kind: z.enum(kinds),
    caption: z.string().optional(),
    source: z.string(),
    source_url: z.string().url().optional(),
    credit: z.string().optional(),
    cover: z.boolean().optional(),
    slot: z.enum(["hero"]).optional(),
    order: z.number().optional(),
    gallery: z.boolean().optional(),
    ...(games ? { games: z.array(z.string()).optional() } : {}),
  })).default([]);
}
