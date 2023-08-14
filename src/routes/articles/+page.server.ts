export async function load({fetch, url}) {
  // const categories = await getCategoriesList();
  const postList = await (await fetch("/api/getPostsList")).json();

  const categories = postList.reduce((catSet, p) => {
    // catSet = catSet || new Set();
    p.categories.forEach((cat) => catSet.add(cat));
    return catSet;
  }, new Set());

  const queryCategory = url.searchParams.get("category");

  return {postList, categories, queryCategory};
}
