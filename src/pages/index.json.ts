import { getPosts, postUrl, stats } from "../lib/posts";

// Search index used by /search/.
export async function GET() {
  const posts = await getPosts();
  return Response.json(posts.map((post) => ({ title: post.data.title, url: postUrl(post), text: stats(post).text })));
}
