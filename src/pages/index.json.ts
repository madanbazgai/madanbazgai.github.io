import { NOTES } from "../data/notes";
import { getPosts, postUrl, stats } from "../lib/posts";

// Search index used by /search/: every post, plus one entry per notes subject.
export async function GET() {
  const posts = await getPosts();
  const entries = posts.map((post) => ({ title: post.data.title, url: postUrl(post), text: stats(post).text }));
  const notes = NOTES.map((subject) => ({
    title: subject.title,
    url: `/notes/#${subject.slug}`,
    text: `${subject.description} ${subject.units.map((unit) => unit.label).join(" ")}`,
  }));
  return Response.json([...entries, ...notes]);
}
