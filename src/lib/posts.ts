import { getCollection, type CollectionEntry } from "astro:content";
import { SECTIONS, type Section } from "../config";

export type Post = CollectionEntry<Section>;

// Newest first; posts published at the same moment fall back to title order.
const compare = (a: Post, b: Post) =>
  b.data.date.valueOf() - a.data.date.valueOf() || a.data.title.localeCompare(b.data.title);

export async function getPosts(section?: Section): Promise<Post[]> {
  const sections = section ? [section] : (Object.keys(SECTIONS) as Section[]);
  const posts = await Promise.all(sections.map((s) => getCollection(s)));
  return posts.flat().sort(compare);
}

export const postUrl = (post: Post) => `/${post.collection}/${post.id}/`;

export const slugify = (term: string) =>
  term.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^\p{L}\p{N}/_-]/gu, "");

const entities: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', "#39": "'", nbsp: " " };

export function stats(post: Post) {
  const text = (post.rendered?.html ?? "")
    .replace(/<\/(p|h\d|li|pre|div|blockquote|td|th)>|<br\s*\/?>/g, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&(amp|lt|gt|quot|#39|nbsp);/g, (_, e: string) => entities[e])
    .replace(/\s+/g, " ")
    .trim();
  return { text, minutes: Math.ceil(text.split(" ").length / 213) };
}

export async function getTags() {
  const tags = new Map<string, { slug: string; name: string; posts: Post[] }>();
  for (const post of await getPosts()) {
    for (const name of post.data.tags) {
      const slug = slugify(name);
      if (!tags.has(slug)) tags.set(slug, { slug, name, posts: [] });
      tags.get(slug)!.posts.push(post);
    }
  }
  return [...tags.values()].sort((a, b) => a.slug.localeCompare(b.slug));
}

const date = (options: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Kathmandu", ...options });

export const formatDate = (d: Date) => date({ dateStyle: "long" }).format(d);

export function formatShortDate(d: Date) {
  const parts = Object.fromEntries(
    date({ year: "numeric", month: "short", day: "2-digit" }).formatToParts(d).map((p) => [p.type, p.value]),
  );
  return `${parts.year} ${parts.month} ${parts.day}`;
}
