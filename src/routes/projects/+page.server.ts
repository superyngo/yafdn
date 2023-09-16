// import {importJSON} from "$lib/server/serverUtils";
import {myStore} from "$lib/stores/myStore";

export async function load({fetch}) {
  // if (import.meta.env.MODE === "development") {
  //   const gitHubList = importJSON("src/md/lists/myNavbarOfGithubList.json");
  //   return {gitHubList};
  // } else {
  myStore.gitHubList = await (await fetch("/api/getMyNavbar")).json();
  return {gitHubList: myStore.gitHubList};
  // }
}
