import { defineCollection, type SchemaContext } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const schema = ({ image }: SchemaContext) =>
  z.object({
    title: z.string(),
    date: z.coerce.date(),
    // Used for search results and link previews, so keep it a real sentence under 160 characters.
    description: z.string().max(160),
    categories: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    cover: z.object({ image: image().or(z.url()), alt: z.string() }).optional(),
    // Listed under "Pinned Articles" on the home page.
    pinned: z.boolean().default(false),
  });

export const collections = {
  blog: defineCollection({ loader: glob({ base: "./src/content/blog", pattern: "**/*.md" }), schema }),
  notes: defineCollection({ loader: glob({ base: "./src/content/notes", pattern: "**/*.md" }), schema }),
};
