import YAML from "yaml";
import {DiscussionsType} from "./types";

const splitMdx = (mdx: string) => {
  const arr = mdx.split(/^(?:-{3}[\n\r]([\w\W]+?)[\n\r]-{3})/);
  if (arr.length === 1) return [mdx];
  const frontMatter = YAML.parse(arr[1].trim());
  if (!frontMatter.isPublic) return [null, null];
  return [arr[2], frontMatter];
};

export const convertFrontMatter = (list: DiscussionsType[]) =>
  list.reduce((newList: DiscussionsType[], node) => {
    const [md, originalFrontMatter] = splitMdx(node.body);
    if (!md) return newList;

    const frontMatter = {
      number: node.number,
      title: node.title,
      publishedAt: node.publishedAt,
      lastEditedAt: node.lastEditedAt,
      url: node.url,
      labels: node.labels.nodes,
      ...originalFrontMatter,
    };

    const frontMatterText = `---\n${YAML.stringify(frontMatter)}---${
      originalFrontMatter ? "" : "\n"
    }`;

    return [...newList, {...node, body: `${frontMatterText}${md}`}];
  }, []);
