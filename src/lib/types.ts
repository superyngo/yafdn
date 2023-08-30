export type Post = {
  number: number;
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  lastEditedAt: string;
  url: string;
  labels: string[];
};

export type Module = {default: {}; metadata: {}};
