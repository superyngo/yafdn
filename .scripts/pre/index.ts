import dotenv from "dotenv";
dotenv.config();

import {convertFrontMatter} from "./converter.js";
import {fetchUser, fetchAllDiscussions, fetchAllLabels} from "./fetcher.js";
import {filterAll} from "./filter.js";
import {
  cleanAll,
  writePosts,
  writePages,
  writeEnv,
  writeLabelsList,
  writePostsMetaList,
} from "./writer.js";

await cleanAll();

const {login: owner, url: githubUrl, bio} = await fetchUser();
const Labels = await fetchAllLabels(owner);
let Mds = await fetchAllDiscussions(owner);
Mds = convertFrontMatter(Mds);

const sortedMds = await filterAll(Mds);

const config = sortedMds.config[0]
  ? dotenv.parse(sortedMds.config[0].body)
  : {};
const configList: string[][] = [
  ["PAGE_SIZE"],
  ["BLOG_NAME"],
  ["BIO", bio],
  ["OWNER", owner],
  ["GITHUB_URL", githubUrl],
  ["EMAIL"],
  ["TWITTER"],
  ["DOMAIN"],
  ["DESCRIPTION"],
  ["KEYWORDS"],
  ["REPOSITORY"],
  ["LANGUAGE"],
  ["COMMENT"],
  ["TIMEZONE"],
];
configList.forEach(([key, value]) => {
  const finalValue = config[key] || process.env[key] || value;
  if (!finalValue) return;
  config[key] = finalValue;
});

await writeEnv(config);
await writeLabelsList(Labels);
await writePostsMetaList(sortedMds.posts);
await writePosts(sortedMds.posts);
await writePages(sortedMds.pages);

console.log(`done`);
