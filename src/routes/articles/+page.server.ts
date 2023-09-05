import {importJSON} from "$lib/server/serverUtils";

export async function load({fetch, url}) {
  const queryLabel = url.searchParams.get("label");

  if (import.meta.env.MODE === "development") {
    const postList = importJSON("src/md/lists/postsMetaList.json");
    const labels = importJSON("src/md/lists/labelsList.json");
    return {postList, labels, queryLabel};
  } else {
    const labels = await (
      await fetch("/api/getFromGithub?query=labelsList")
    ).json();
    const postList = await (
      await fetch("/api/getFromGithub?query=postsMetaList")
    ).json();
    return {postList, labels, queryLabel};
  }
}
