import type {obj, GoogleSheetsEnv} from "$lib/utils/types";
import {json} from "@sveltejs/kit";
import {GoogleSpreadsheet} from "google-spreadsheet";
import type {GoogleSpreadsheetRow} from "google-spreadsheet";
import {google} from "googleapis";
import {env} from "$env/dynamic/private";
// import {writeFile} from "fs/promises";

//set parameters
const googleSheetsEnv = {
  docID: "1qiQk_cpa-2W26a3djoXJh_zR9Ay3CGphO01ceAf91zE",
  sheetID: 0,
};

const getGithubList = async function (
  googleSheetsEnv: GoogleSheetsEnv,
  reverse: boolean = true
) {
  //設定docID及sheetID
  const {docID, sheetID} = googleSheetsEnv;
  const scopes = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive.file",
  ];

  //設定服務帳號帳密
  const jwt = new google.auth.JWT({
    email: env.Google_JWT_client_email,
    key: env.Google_JWT_private_key,
    scopes,
  });

  //載入sheet及Header Row
  const doc = new GoogleSpreadsheet(docID, jwt);
  await doc.loadInfo();
  const sheet = doc.sheetsById[sheetID];
  await sheet.loadHeaderRow(); // Load the header row
  const headerRow = sheet.headerValues;

  //將資料寫入result
  const result: any[] = [];
  const rows = await sheet.getRows();
  rows.forEach((row: GoogleSpreadsheetRow) => {
    result.push(
      headerRow.reduce((obj, name) => {
        obj[name] = row.get(name);
        return obj;
      }, {} as obj)
    );
  });
  return reverse ? result.reverse() : result;
};

let myNavbarList: string[] = await getGithubList(googleSheetsEnv);

// await writeFile(
//   "src/md/lists/myNavbarOfGithubList.json",
//   JSON.stringify(myNavbarList, null, 2)
// );

export async function GET(request) {
  return json(myNavbarList);
}

export async function POST({url, request}) {
  let response;
  const queryName = url.searchParams.get("updateProjectList");
  const data = JSON.parse(await request.text());
  if (queryName) {
    myNavbarList = data;
    response = {
      status: "success",
      message: "Update successfully",
    };
  } else {
    response = {
      status: "success",
      message: "No update data",
    };
  }
  return json(response);
}

//data.get("testInput")
