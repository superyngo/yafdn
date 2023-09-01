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

export type Module = {default: obj; metadata: obj};

export interface obj {
  [property: string]: string;
}
export type GoogleSheetsEnv = {
  docID: string;
  sheetID: number;
};
