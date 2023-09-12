import {json} from "@sveltejs/kit";
import type {Post, Module} from "$lib/utils/types";

async function getPosts() {
  let posts: Post[] = [];

  const paths = import.meta.glob(`/src/md/posts/*.md`, {eager: true});
  for (const path in paths) {
    const file: Module = paths[path] as Module;
    const slug = path.split("/").at(-1)?.replace(".md", "") as string;
    if (file && typeof file === "object" && file.metadata) {
      const post = {...file.metadata, slug} as Post;
      posts.push(post);
    }
  }
  posts = posts.sort(
    (first, second) =>
      new Date(second.publishedAt).getTime() -
      new Date(first.publishedAt).getTime()
  );
  return posts;
}
export async function GET() {
  const posts = await getPosts();
  return json(posts);
}
