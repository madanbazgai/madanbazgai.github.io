import { getCollection, type CollectionEntry } from "astro:content";
import { SECTIONS, type Section } from "../config";

export type Post = CollectionEntry<Section>;
export type Taxonomy = "tags" | "categories";

// Same ordering Hugo used: weight first, then newest, then title.
const compare = (a: Post, b: Post) =>
  (a.data.weight ?? Infinity) - (b.data.weight ?? Infinity) ||
  b.data.date.valueOf() - a.data.date.valueOf() ||
  a.data.title.localeCompare(b.data.title);

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
  const words = text.split(" ").filter(Boolean);
  return {
    text,
    words: words.length,
    minutes: Math.ceil(words.length / 213),
    summary: words.length > 70 ? `${words.slice(0, 70).join(" ")}...` : text,
  };
}

export async function getTerms(taxonomy: Taxonomy) {
  const terms = new Map<string, { slug: string; name: string; posts: Post[] }>();
  for (const post of await getPosts()) {
    for (const name of post.data[taxonomy]) {
      const slug = slugify(name);
      if (!terms.has(slug)) terms.set(slug, { slug, name, posts: [] });
      terms.get(slug)!.posts.push(post);
    }
  }
  return [...terms.values()].sort((a, b) => a.slug.localeCompare(b.slug));
}

export const termPaths = async (taxonomy: Taxonomy) =>
  (await getTerms(taxonomy)).map(({ slug, name, posts }) => ({ params: { term: slug }, props: { name, posts } }));

const date = (options: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Kathmandu", ...options });

export const formatDate = (d: Date) => date({ dateStyle: "long" }).format(d);

export function formatShortDate(d: Date) {
  const parts = Object.fromEntries(
    date({ year: "numeric", month: "short", day: "2-digit" }).formatToParts(d).map((p) => [p.type, p.value]),
  );
  return `${parts.year} ${parts.month} ${parts.day}`;
}
