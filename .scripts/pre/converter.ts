import dotenv from "dotenv";
dotenv.config();

import YAML from "yaml";
import {DiscussionsType, LabelsType} from "./types";

const postCategoryName = process.env.POST_CATEGORY || "posts";

const splitMdx = (mdx: string) => {
  const arr = mdx.split(/^(?:-{3}[\n\r]([\w\W]+?)[\n\r]-{3})/);
  if (arr.length === 1) return [mdx];
  const frontMatter = YAML.parse(arr[1].trim());
  return [arr[2], frontMatter];
};

export const convertFrontMatter = (list: DiscussionsType[]) =>
  list.reduce((newList: DiscussionsType[], node) => {
    if (
      node.category.name === postCategoryName &&
      !node.labels.nodes.some(
        (label, index, arr) => label.name === "isPublic" && arr.splice(index, 1) //filter out not public and spice the isPublic label
      )
    )
      return newList;

    const [md, originalFrontMatter] = splitMdx(node.body);

    if (originalFrontMatter) {
      Object.entries(originalFrontMatter).forEach(([key, value]) => {
        node[key] = value;
      });
      const date = new Date(node.publishedAt);
      node.year = date.getFullYear();
      node.month = date.getMonth() + 1;
      node.date = date.getDate();
    }

    const test: {[poverty: string]: any} = node;
    delete test.body;

    const frontMatterText = `---\n${YAML.stringify(node)}---\n`;
    node.body = frontMatterText + md;
    return [...newList, node];
  }, []);
