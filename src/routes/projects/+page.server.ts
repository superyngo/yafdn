import {importJSON} from "$lib/server/serverUtils";

export async function load({fetch}) {
  if (import.meta.env.MODE === "development") {
    const gitHubList = importJSON("src/md/lists/myNavbarOfGithubList.json");
    return {gitHubList};
  } else {
    const gitHubList = await (await fetch("/api/getMyNavbar")).json();
    return {gitHubList};
  }
}
