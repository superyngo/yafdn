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

export type Module = {default: Obj; metadata: Obj};

export interface Obj {
  [property: string]: string;
}
export type GoogleSheetsEnv = {
  docID: string;
  sheetID: number;
};

export type LabelType = {
  name: string;
  color: string;
};
