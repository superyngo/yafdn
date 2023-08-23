import dotenv from "dotenv";
import {convertFrontMatter} from "./converter.js";
import {fetchUser, fetchAllDiscussions} from "./fetcher.js";
import {filterAll} from "./filter.js";
import {writePosts, writePages, writeEnv} from "./writer.js";

dotenv.config();

const {login: user, url: githubUrl, bio} = await fetchUser();
let list = await fetchAllDiscussions(user);

list = convertFrontMatter(list);
const allList = await filterAll(list);

const configList: string[][] = [
  ["PAGE_SIZE"],
  ["BLOG_NAME"],
  ["BIO", bio],
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
const config = allList.config[0] ? dotenv.parse(allList.config[0].body) : {};
config.NAME = user;
config.GITHUB_URL = githubUrl;
configList.forEach(([key, value]) => {
  const finalValue = config[key] || process.env[key] || value;
  if (!finalValue) return;
  config[key] = finalValue;
});
await writeEnv(config);

await writePosts(allList.posts);
await writePages(allList.pages);

console.log(`done`);
