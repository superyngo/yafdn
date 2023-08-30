import {getGithubList, writeList} from "./helpers.js";

const googleSheetsEnv = {
  docID: "1qiQk_cpa-2W26a3djoXJh_zR9Ay3CGphO01ceAf91zE",
  sheetID: 0,
  credentialsPath: "../.credentials/mynavbar-393901-c3c3f910dfec.json",
};

const rowNames = ["title", "link", "imgName"];

const myNavbarList = await getGithubList(googleSheetsEnv, rowNames);

await writeList({
  path: "../../src/md/lists/myNavbarList.json",
  list: myNavbarList,
});
