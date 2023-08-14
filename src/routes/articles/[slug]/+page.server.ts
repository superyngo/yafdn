import {compile, escapeSvelte} from "mdsvex";
import remarkUnwrapImages from "remark-unwrap-images";
import remarkToc from "remark-toc";
import rehypeSlug from "rehype-slug";
import {getHighlighter} from "shiki";

const mdsvexoption = {
  highlight: {
    highlighter: async (code: string, lang = "text") => {
      const highlighter = await getHighlighter({
        theme: "github-dark",
      });
      const html = escapeSvelte(highlighter.codeToHtml(code, {lang}));
      return `${html}`;
    },
  },
  remarkPlugins: [remarkUnwrapImages, [remarkToc, {tight: true}]],
  rehypePlugins: [rehypeSlug],
};

async function renderMd(mdraw: string) {
  return (await compile(mdraw, mdsvexoption)).code;
}

import {createPool} from "@vercel/postgres";
import {error} from "@sveltejs/kit";
const db = createPool();
// import {renderMd} from "/src/lib/components/mdsvexCustom/renderMd";
export async function load({params}) {
  try {
    const {
      content: mdraw,
      metadata,
      categories,
    } = (
      await db.query(
        `
		SELECT content,metadata,categories FROM posts WHERE slug = $1`,
        [params.slug]
      )
    ).rows[0];
    const html = await renderMd(mdraw);
    // const html = mdraw;
    metadata.categories = categories;
    return {html, metadata};
  } catch (e) {
    throw error(404, `Can't find page ${params.slug}`);
  }
}
