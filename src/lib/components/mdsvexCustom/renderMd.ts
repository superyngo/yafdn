console.log("step1");
import {compile, escapeSvelte} from "mdsvex";
import remarkUnwrapImages from "remark-unwrap-images";
import remarkToc from "remark-toc";
import rehypeSlug from "rehype-slug";
import shiki from "shiki";
console.log("step2");

export async function renderMd(mdraw: string) {
  return (
    await compile(mdraw, {
      // highlight: {
      //   highlighter: async (code, lang = "text") => {
      //     console.log("step3");

      //     const highlighter = await shiki.getHighlighter({theme: "poimandres"});
      //     const html = escapeSvelte(highlighter.codeToHtml(code, {lang}));
      //     return `${html}`;
      //   },
      // },
      remarkPlugins: [remarkUnwrapImages, [remarkToc, {tight: true}]],
      rehypePlugins: [rehypeSlug],
    })
  ).code;
}
