import type {DiscussionsType, DiscussionObject} from "./types";
import {githubConfig} from "./githubConfig";
const {POST_CATEGORY, CONFIG_CATEGORY, PAGE_CATEGORY} = githubConfig;

export const filterAll = (list: DiscussionsType[]) => {
  console.log("start sorting");
  const sortedList = list.reduce(
    (newList: DiscussionObject, md) => {
      newList[md.category.name].push(md);
      return newList;
    },
    {
      [CONFIG_CATEGORY]: [],
      [POST_CATEGORY]: [],
      [PAGE_CATEGORY]: [],
    }
  );
  console.log("finished sorting");
  return sortedList;
};

// export const findConfig = (list: DiscussionsType[]) => {
//   const configText = list.find(
//     (e) => e.category.name === CONFIG_CATEGORY && e.title === "index"
//   )?.body;

//   if (!configText) return {};

//   return dotenv.parse(configText);
// };

// export const filterPage = (list: DiscussionsType[]) => {
//   const pages = list.filter((e) => e.category.name === PAGE_CATEGORY);
//   console.log(`filtered pages: ${pages.map(({title}) => title).join(", ")}`);
//   return pages;
// };

// export const filterPost = (list: DiscussionsType[]) => {
//   const posts = list.filter((e) => e.category.name === POST_CATEGORY);
//   console.log(`filtered posts: ${posts.length}`);
//   return posts;
// };
