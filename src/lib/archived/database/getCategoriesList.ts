import {createPool} from "@vercel/postgres";
const db = createPool();

export async function getCategoriesList() {
  const {rows: categories} = await db.query(`SELECT * FROM unique_categories;`);

  return categories.map((o) => o.unique_category);
}
