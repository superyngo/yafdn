import {defineMDSveXConfig as defineConfig} from "mdsvex";
import remarkUnwrapImages from "remark-unwrap-images";
import remarkToc from "remark-toc";
import rehypeSlug from "rehype-slug";
import {escapeSvelte} from "mdsvex";
import {getHighlighter} from "shiki";

const config = defineConfig({
  extensions: [".md", ".svx"],
  layout: {
    _: "src/lib/components/mdsvexCustom/mdsvex.layout.svelte",
  },
  highlight: {
    highlighter: async (code, lang = "text") => {
      const highlighter = await getHighlighter({theme: "poimandres"});
      const html = escapeSvelte(highlighter.codeToHtml(code, {lang}));
      return `{@html \`${html}\` }`;
    },
  },
  remarkPlugins: [remarkUnwrapImages, [remarkToc, {tight: true}]],
  rehypePlugins: [rehypeSlug],
  smartypants: {
    dashes: "oldschool",
  },
});

export default config;
