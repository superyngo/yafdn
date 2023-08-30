import dotenv from "dotenv";
dotenv.config();

import fetch from "node-fetch";
import {
  DiscussionsType,
  fetchPagesType,
  FetchViewerType,
  fetchPagesConfigType,
  LabelsType,
} from "./types";

const githubGQLEndpoint = "https://api.github.com/graphql";
const REPOSITORY = process.env.REPOSITORY as string;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const fetchData = async <T>(query: string) => {
  try {
    const res = await fetch(githubGQLEndpoint, {
      method: "POST",
      headers: {
        Authorization: `bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json", // Add this header for JSON content
      },
      body: query,
    });
    const json: any = await res.json();
    return json.data as T;
  } catch (e: unknown) {
    console.error("Error:", e); // Log the error message
    throw new Error("Error fetching data."); // Rethrow the error
  }
};

export const fetchUser = async () => {
  console.log("fetching... user");
  const query = `{
    viewer {
      login
      url
      bio
    }
  }`;
  const user = (
    await fetchData<FetchViewerType>(JSON.stringify({query: query}))
  ).viewer;
  console.log("user:", user.login);
  return user;
};

export const fetchPages = async <T>(fetchConfig: fetchPagesConfigType) => {
  const {fetchName, query, variables} = fetchConfig;
  console.log(
    `fetching ${fetchName}... endCursor: ${variables.lastPageEndCursor}`
  );
  return (
    await fetchData<fetchPagesType<T>>(
      JSON.stringify({
        query: query,
        variables: variables,
      })
    )
  ).repository[fetchName];
};

export const fetchAllPages = async <T>(fetchConfig: fetchPagesConfigType) => {
  let list: T[] = [];
  while (true) {
    const {nodes, pageInfo} = await fetchPages<T>(fetchConfig);
    list = list.concat(nodes as T[]);
    if (!pageInfo.hasNextPage) break;
    fetchConfig.variables.lastPageEndCursor = pageInfo.endCursor;
  }
  console.log(`fetched ${list.length} ${fetchConfig.fetchName}`);
  return list;
};

export const fetchAllDiscussions = async (owner: string) => {
  const fetchName = "discussions";
  const variables = {
    owner,
    REPOSITORY,
    lastPageEndCursor: undefined,
  };
  const query = `
    query FetchDiscussionsWithIsPublicLabel($owner: String!, $REPOSITORY: String!, $lastPageEndCursor: String) {
      repository(owner: $owner, name: $REPOSITORY) {
        discussions(first: 100, after: $lastPageEndCursor, orderBy: {field: CREATED_AT, direction: DESC}) {
          pageInfo {
            hasNextPage
            endCursor
          }
          nodes {
            number
            title
            createdAt
            publishedAt
            lastEditedAt
            url
            body
            category {
              name
            }
            labels(first: 100) {
              nodes {
                name
                color
              }
            }
          }
        }
      }
    }
  `;
  const fetchConfig = {fetchName, query, variables};
  let list = await fetchAllPages<DiscussionsType>(fetchConfig);
  return list;
};

// export const fetchDiscussion = async (owner: string) => {
//   const fetchName = "discussion";
//   const variables = {
//     owner,
//     REPOSITORY,
//     discussionNumber: 13,
//   };
//   const query = `
//   query FetchDiscussionByNumber($owner: String!, $REPOSITORY: String!, $discussionNumber: Int!) {
//     repository(owner: $owner, name: $REPOSITORY) {
//       discussion(number: $discussionNumber) {
//         number
//         title
//         createdAt
//         publishedAt
//         lastEditedAt
//         url
//         body
//         category {
//           name
//         }
//         labels(first: 100) {
//           nodes {
//             name
//             color
//           }
//         }
//       }
//     }
//   }
// `;
//   const fetchConfig = {fetchName, query, variables};
//   let list = await fetchPages<DiscussionsType>(fetchConfig);
//   return list;
// };

export const fetchAllLabels = async (owner: string) => {
  const fetchName = "labels";
  const variables = {
    owner,
    REPOSITORY,
    lastPageEndCursor: undefined,
  };
  const query = `
  query GetRepositoryLabels($owner: String!, $REPOSITORY: String!) {
    repository(owner: $owner, name: $REPOSITORY) {
      labels(first: 100) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          name
          color
        }
      }
    }
  }
`;
  const fetchConfig = {fetchName, query, variables};
  let list = await fetchAllPages<LabelsType>(fetchConfig);
  return list.reduce((newList: LabelsType[], label) => {
    return label.name === "isPublic" ? newList : newList.concat(label);
  }, []);
};
