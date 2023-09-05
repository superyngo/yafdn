import YAML from "yaml";
import type {DiscussionsType, LabelsType} from "./types";
import {githubConfig} from "./githubConfig";
const {POST_CATEGORY} = githubConfig;

const splitMdx = (mdx: string) => {
  const arr = mdx.split(/^(?:-{3}[\n\r]([\w\W]+?)[\n\r]-{3})/);
  if (arr.length === 1) return [mdx];
  const frontMatter = YAML.parse(arr[1].trim());
  return [arr[2], frontMatter];
};

export const convertFrontMatter = (list: DiscussionsType[]) => {
  console.log("start converting FrontMatter");
  list = list.reduce((newList: DiscussionsType[], node) => {
    //filter out not public and spice the isPublic label
    if (
      node.category.name === POST_CATEGORY &&
      !node.labels.nodes.some(
        (label, index, arr) => label.name === "isPublic" && arr.splice(index, 1)
      )
    )
      return newList;

    const [md, originalFrontMatter] = splitMdx(node.body);

    //set FrontMatter from body
    originalFrontMatter &&
      Object.entries(originalFrontMatter).forEach(([key, value]) => {
        node[key] = value;
      });

    //add time slug
    const date = new Date(node.publishedAt);
    node.year = date.getFullYear();
    node.month = date.getMonth() + 1;
    node.date = date.getDate();

    const test: {[poverty: string]: unknown} = node;
    delete test.body;
    const frontMatterText = `---\n${YAML.stringify(test)}---\n`;

    node.body = frontMatterText + md;
    return [...newList, node];
  }, []);
  console.log("finished converting FrontMatter");
  return list;
};

export const convertPostsMetaList = (list: DiscussionsType[]) => {
  const PostsMetaList = structuredClone(list) as {[property: string]: any}[];
  PostsMetaList.sort((a, b) => {
    return (
      -new Date(a.publishedAt).getTime() + new Date(b.publishedAt).getTime()
    );
  });
  PostsMetaList.forEach((li) => {
    delete li.body;
  });
  return PostsMetaList;
};
