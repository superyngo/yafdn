export async function load({fetch}) {
  const gitHubList = await (await fetch("/api/getGithubList")).json();
  return {gitHubList};
}
