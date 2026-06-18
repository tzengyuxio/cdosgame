import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { gameSchema } from '../schema/game.schema.mjs';

const games = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/games' }),
  schema: gameSchema,
});

export const collections = { games };
