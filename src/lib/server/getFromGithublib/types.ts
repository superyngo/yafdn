import {Interface} from "readline";

export interface PageInfo {
  hasNextPage: boolean;
  endCursor?: string;
}

export interface FetchViewerType {
  viewer: {
    login: string;
    url: string;
    bio: string;
  };
}

export interface fetchPagesType<T> {
  repository: {
    [fetchName: string]: {
      pageInfo: PageInfo;
      nodes: T[];
    };
  };
}

export interface fetchPagesConfigType {
  fetchName: string;
  query: string;
  variables: {
    owner: string;
    REPOSITORY: string;
    [variable: string]: string | number | undefined | any[];
  };
}

export interface DiscussionObject {
  [propertyName: string]: DiscussionsType[];
}

export interface DiscussionsType {
  number: number;
  title: string;
  createdAt: string;
  publishedAt: string;
  lastEditedAt?: string;
  url: string;
  body: string;
  category: {
    name: string;
  };
  labels: {
    nodes:
      | {
          name: string;
          color: string;
        }[]
      | {
          name: string;
          color: string;
        }[];
  };
  year?: number;
  month?: number;
  date?: number;
  [property: string]: unknown;
}

export interface DiscussionsMetaListType
  extends Omit<DiscussionsType, "body"> {}

export interface LabelsType {
  name: string;
  color: string;
}
