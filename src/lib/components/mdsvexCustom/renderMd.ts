import {compile, escapeSvelte} from "mdsvex";
import remarkUnwrapImages from "remark-unwrap-images";
import remarkToc from "remark-toc";
import rehypeSlug from "rehype-slug";
import shiki from "shiki";

export async function renderMd(mdraw: string) {
  return (
    await compile(mdraw, {
      highlight: {
        highlighter: async (code, lang = "text") => {
          // const highlighter = await shiki.getHighlighter({theme: "poimandres"});
          const html = code;
          return `${html}`;
        },
      },
      remarkPlugins: [remarkUnwrapImages, [remarkToc, {tight: true}]],
      rehypePlugins: [rehypeSlug],
    })
  ).code;
}
