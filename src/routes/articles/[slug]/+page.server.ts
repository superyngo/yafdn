import {createPool} from "@vercel/postgres";
import {error} from "@sveltejs/kit";
const db = createPool();

import {renderMd} from "$lib/components/mdsvexCustom/renderMd";

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
    metadata.categories = categories;
    return {html, metadata};
  } catch (e) {
    throw error(404, `Can't find page ${params.slug} `);
  }
}
