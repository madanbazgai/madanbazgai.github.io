import type { APIContext } from "astro";
import { SITE } from "../../config";
import { getPosts, postUrl } from "../../lib/posts";

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" })[c]!);

// RSS feed of blog posts.
export async function GET({ site }: APIContext) {
  const items = (await getPosts("blog")).map((post) => {
    const link = new URL(postUrl(post), site).href;
    return `<item><title>${escape(post.data.title)}</title><link>${link}</link><guid>${link}</guid><pubDate>${post.data.date.toUTCString()}</pubDate><description>${escape(post.data.description)}</description></item>`;
  });
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${escape(SITE.title)} blog</title><link>${site}</link><description>${escape(SITE.description)}</description>${items.join("")}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
