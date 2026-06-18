import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro:content';
import { gameSchema } from '../schema/game.schema.mjs';

// Force entry id = filename (not the frontmatter slug, which is non-unique for games;
// for companies/series the filename IS the entity string used to join to game data).
const fileId = ({ entry }) => entry.replace(/\.md$/, '');

const games = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/games', generateId: fileId }),
  schema: gameSchema,
});

const companies = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/companies', generateId: fileId }),
  schema: z.object({
    name_zh: z.string(),
    aliases: z.array(z.string()).default([]),
    name_en: z.string().optional(),
    founded: z.number().optional(),
    region: z.string().optional(),
    website: z.string().url().optional(),
    featured_series: z.array(z.string()).default([]),
    featured_games: z.array(z.string()).default([]),
  }),
});

const series = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/series', generateId: fileId }),
  schema: z.object({
    name_zh: z.string(),
    aliases: z.array(z.string()).default([]),
    lead_developer: z.string().optional(),
    summary: z.string().optional(),
  }),
});

export const collections = { games, companies, series };
