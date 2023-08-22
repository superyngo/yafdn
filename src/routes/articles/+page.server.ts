export async function load({fetch, url}) {
  // const categories = await getCategoriesList();
  const postList = await (await fetch("/api/getPostsList")).json();

  const labels = postList.reduce((catSet, p) => {
    // catSet = catSet || new Set();
    p.labels.forEach((cat) => catSet.add(cat));
    return catSet;
  }, new Set());

  const queryLabel = url.searchParams.get("label");

  return {postList, labels, queryLabel};
}
