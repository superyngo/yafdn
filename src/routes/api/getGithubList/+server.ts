import type {obj, GoogleSheetsEnv} from "$lib/types";
import {json} from "@sveltejs/kit";
import {GoogleSpreadsheet} from "google-spreadsheet";
import {google} from "googleapis";

//set parameters
const googleSheetsEnv = {
  docID: "1qiQk_cpa-2W26a3djoXJh_zR9Ay3CGphO01ceAf91zE",
  sheetID: 0,
};
const rowNames = ["title", "link", "imgName"];

const getGithubList = async function (
  googleSheetsEnv: GoogleSheetsEnv,
  rowNames: string[],
  reverse: boolean = true
) {
  const {docID, sheetID} = googleSheetsEnv;
  const scopes = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive.file",
  ];

  const jwt = new google.auth.JWT({
    email: process.env.Google_JWT_client_email,
    key: process.env.Google_JWT_private_key,
    scopes,
  });

  const doc = new GoogleSpreadsheet(docID, jwt);
  await doc.loadInfo();
  const sheet = doc.sheetsById[sheetID];
  const result: any[] = [];
  const rows = await sheet.getRows();
  rows.forEach((row) => {
    result.push(
      rowNames.reduce((obj, name) => {
        obj[name] = row.get(name);
        return obj;
      }, {} as obj)
    );
  });
  return reverse ? result.reverse() : result;
};

let myNavbarList: string[] = await getGithubList(googleSheetsEnv, rowNames);

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
