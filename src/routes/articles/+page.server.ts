import {getPostsList, getCategoriesList} from "$lib/database/";
export async function load({url}) {
  const categories = await getCategoriesList();
  const postList = await getPostsList(categories);
  const queryCategory = url.searchParams.get("category");
  return {postList, categories, queryCategory};
}
