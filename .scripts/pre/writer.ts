import path from "path";
import {mkdirSync, promises} from "fs";
import {DiscussionsType} from "./types";

const configPath = process.env.CONFIG_PATH || "./.env.local";
const postPath = process.env.POST_PATH || "./src/posts.md";
const pagePath = process.env.PAGE_PATH || "./src/routes/_page";

export const writePosts = async (list: DiscussionsType[]) => {
  const dir = path.join(postPath);
  mkdirSync(dir, {recursive: true});
  await Promise.all(
    list.map(({number, body}) => {
      const p = path.resolve(dir, `${number}.md`);
      return promises.writeFile(p, body);
    })
  );
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
};

export const writeEnv = async (config: Record<string, string>) => {
  const content = Object.entries(config)
    .map(([key, value]) => `BLOG_${key}=${value}`)
    .join("\n");
  return promises.writeFile(configPath, content);
};
