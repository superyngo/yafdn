import {getPostsList, getCategoriesList} from "$lib/database/";
export async function load() {
  const categories = await getCategoriesList();
  const postList = await getPostsList(categories);
  return {postList, categories};
}
