import {
  fetchUser,
  fetchAllLabels,
  fetchAllDiscussions,
} from "$lib/server/getFromGithublib/fetcher";
import {
  convertFrontMatter,
  convertPostsMetaList,
} from "$lib/server/getFromGithublib/converter";
import {filterAll} from "$lib/server/getFromGithublib/filter";
import type {
  DiscussionObject,
  DiscussionsType,
  DiscussionsMetaListType,
  LabelsType,
} from "$lib/server/getFromGithublib/types";

import {json} from "@sveltejs/kit";

const {login: owner, url: githubUrl, bio} = await fetchUser();
let originalDiscussions = await fetchAllDiscussions(owner);
let Labels = await fetchAllLabels(owner);

let sortedDiscussions: DiscussionObject,
  postsMD: DiscussionsType[],
  postsMetaList: DiscussionsMetaListType[];

const init = async function (obj = {reset: false}) {
  if (obj.reset) {
    originalDiscussions = await fetchAllDiscussions(owner);
    Labels = await fetchAllLabels(owner);
  }
  sortedDiscussions = filterAll(originalDiscussions);
  postsMD = convertFrontMatter(sortedDiscussions.posts);
  postsMetaList = convertPostsMetaList(postsMD);
};
await init();

export async function GET({url}) {
  const queryString = url.searchParams.get("query");
  switch (queryString) {
    case "labelsList":
      return json(Labels);
    case "sortedDiscussions":
      return json(sortedDiscussions);
    case "postsMD":
      return json(postsMD);
    case "postsMetaList":
      return json(postsMetaList);
    default:
      return json("no query");
  }
}
