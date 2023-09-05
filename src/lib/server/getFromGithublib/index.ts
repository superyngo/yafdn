import {fetchUser, fetchAllLabels, fetchAllDiscussions} from "./fetcher";
import {convertFrontMatter, convertPostsMetaList} from "./converter";
import {filterAll} from "./filter";
import type {DiscussionsType} from "./types";
const {login: owner, url: githubUrl, bio} = await fetchUser();
let originalDiscussions = await fetchAllDiscussions(owner);

export const getFromGithubIndex = {
  resetOriginalDiscussions: async () => await fetchAllDiscussions(owner),
  fetchAllLabels: async () => await fetchAllLabels(owner),
  fetchSortedDiscussions: async () => await filterAll(originalDiscussions),
  fetchPostsMD: (sortedDiscussionsPosts: DiscussionsType[]) =>
    convertFrontMatter(sortedDiscussionsPosts),
  fetchPostsMetaList: (postsMD: DiscussionsType[]) =>
    convertPostsMetaList(postsMD),
};

export const resetOriginalDiscussions = async () => {
  let originalDiscussions = await fetchAllDiscussions(owner);
};
export const fetchLabels = async () => await fetchAllLabels(owner);
export const fetchSortedDiscussions = async () =>
  await filterAll(originalDiscussions);
export {convertFrontMatter};
export {convertPostsMetaList};
