import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { gameSchema } from '../schema/game.schema.mjs';

const games = defineCollection({
  // Force entry id = filename (cdg-NNNN). Default generateId uses the frontmatter
  // `slug`, which is non-unique here (e.g. "d", "x") and would collide/drop entries.
  loader: glob({
    pattern: '*.md',
    base: './content/games',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: gameSchema,
});

export const collections = { games };
