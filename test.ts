import fetch from "node-fetch";
import dotenv from "dotenv";
import path from "path";
import {mkdirSync, promises} from "fs";

dotenv.config();
const githubGQLEndpoint = "https://api.github.com/graphql";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPOSITORY = process.env.REPOSITORY;

const query = {
  user: `
  {
    viewer {
      login
      url
      bio
    }
  }`,
  schema: `
query IntrospectionQuery {
  __schema {
    types {
      name
    }
  }
}
`,
  labels: ``,
};

const user = await fetch(githubGQLEndpoint, {
  method: "POST",
  headers: {
    Authorization: `bearer ${GITHUB_TOKEN}`,
  },
  body: JSON.stringify({query}),
})
  .then((res) => res.json())
  .then((json) => json.viewer.login);

const fetchData = async (query: string) => {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${GITHUB_TOKEN}`,
    },
    body: JSON.stringify({query}),
  });
  const json: any = await res.json();
  if (json.errors) {
    throw new Error(JSON.stringify(json.errors, null, 2));
  }
  return json.data;
};

const Schema = await fetchData(query.schema);
const graphqlPath = path.join("./GraphQL.schema");
promises.writeFile(graphqlPath, JSON.stringify(Schema));
