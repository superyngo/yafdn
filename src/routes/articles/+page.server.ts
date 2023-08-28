import postList from "$md/lists/postsMetaList.json";
import labels from "$md/lists/labelsList.json";

export async function load({fetch, url}) {
  const queryLabel = url.searchParams.get("label");

  return {postList, labels, queryLabel};
}
