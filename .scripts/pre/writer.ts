import dotenv from "dotenv";
dotenv.config();

import path from "path";
import {mkdirSync, promises, stat} from "fs";
import {DiscussionsType, LabelsType} from "./types";

const configPath = process.env.CONFIG_PATH || "./.env.local";
const postPath = process.env.POST_PATH || "./src/md/posts";
const pagePath = process.env.PAGE_PATH || "./src/md/pages";
const ListPath = process.env.LIST_PATH || "./src/md/lists";

export const cleanAll = async () => {
  [postPath, pagePath].forEach((path) => {
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

export const writeLabelsList = async (labelsList: LabelsType[]) => {
  const dir = path.join(ListPath);
  mkdirSync(dir, {recursive: true});
  const p = path.resolve(dir, "labelsList.json");
  await promises.writeFile(p, JSON.stringify(labelsList));
  console.log("Labels list written");
};

export const writePostsMetaList = async (list: DiscussionsType[]) => {
  const PostsMetaList = structuredClone(list) as {[property: string]: any}[];
  PostsMetaList.sort((a, b) => {
    return (
      new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
    );
  });
  PostsMetaList.forEach((li) => {
    delete li.body;
  });
  const dir = path.join(ListPath);
  mkdirSync(dir, {recursive: true});
  const p = path.resolve(dir, "postsMetaList.json");
  await promises.writeFile(p, JSON.stringify(PostsMetaList));
  console.log("PostsMetaList list written");
};

export const writePosts = async (list: DiscussionsType[]) => {
  const dir = path.join(postPath);
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
  const dir = path.join(pagePath);
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
  return promises.writeFile(configPath, content);
};
