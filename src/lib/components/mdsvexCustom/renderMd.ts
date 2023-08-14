import {compile, escapeSvelte} from "mdsvex";
import remarkUnwrapImages from "remark-unwrap-images";
import remarkToc from "remark-toc";
import rehypeSlug from "rehype-slug";
// import {getHighlighter} from "shiki";

const mdsvexoption = {
  // highlight: {
  //   highlighter: async (code: string, lang = "text") => {
  //     const highlighter = await getHighlighter({
  //       theme: "dark-plus",
  //     });
  //     const html = escapeSvelte(highlighter.codeToHtml(code, {lang}));
  //     return `${html}`;
  //   },
  // },
  remarkPlugins: [remarkUnwrapImages, [remarkToc, {tight: true}]],
  rehypePlugins: [rehypeSlug],
};

export async function renderMd(mdraw: string) {
  return (await compile(mdraw, mdsvexoption)).code;
}
