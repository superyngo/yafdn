import path from "path";
import {mkdirSync, promises, stat} from "fs";
import type {
  DiscussionsType,
  LabelsType,
  DiscussionsMetaListType,
} from "./types";
import {githubConfig} from "./githubConfig";
const {CONFIG_PATH, POST_PATH, PAGE_PATH, LIST_PATH} = githubConfig();

export const cleanAll = async () => {
  [POST_PATH, PAGE_PATH].forEach((path) => {
    stat(path, async (err, stats) => {
      if (err) {
        if (err.code === "ENOENT") {
          console.log(`${path} directory does not exist.`);
        } else {
          console.error("An error occurred:", err);
        }
      } else {
        if (stats.isDirectory()) {
          console.log(`${path} path deleted`);
          await promises.rm(path, {recursive: true});
        } else {
          console.log(`${path} path exists, but it is not a directory.`);
        }
      }
    });
  });
};

// export const writeLabelsList = async (labelsList: LabelsType[]) => {
//   const dir = path.join(LIST_PATH);
//   mkdirSync(dir, {recursive: true});
//   const p = path.resolve(dir, "labelsList.json");
//   await promises.writeFile(p, JSON.stringify(labelsList));
//   console.log("Labels list written");
// };

export const writePosts = async (list: DiscussionsType[]) => {
  const dir = path.join(POST_PATH);
  mkdirSync(dir, {recursive: true});
  await Promise.all(
    list.map(({number, body}) => {
      const p = path.resolve(dir, `${number}.md`);
      return promises.writeFile(p, body);
    })
  );
  console.log(`${list.length} posts written`);
};

export const writePages = async (list: DiscussionsType[]) => {
  const dir = path.join(PAGE_PATH);
  mkdirSync(dir, {recursive: true});
  await Promise.all(
    list.map(({title, body}) => {
      const p = path.resolve(dir, `${title}.md`);
      return promises.writeFile(p, body);
    })
  );
  console.log(`${list.length} pages written`);
};

export const writeEnv = async (config: Record<string, string>) => {
  const content = Object.entries(config)
    .map(([key, value]) => `BLOG_${key}=${value}`)
    .join("\n");
  return promises.writeFile(CONFIG_PATH, content);
};
