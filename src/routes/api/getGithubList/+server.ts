import {GoogleSpreadsheet} from "google-spreadsheet";
import {google} from "googleapis";
import type {GoogleSheetsEnv} from "$lib/types";
import {json} from "@sveltejs/kit";
import {readFile, stat, access, constants} from "fs/promises";

const googleSheetsEnv = {
  docID: "1qiQk_cpa-2W26a3djoXJh_zR9Ay3CGphO01ceAf91zE",
  sheetID: 0,
  credentialsName: "mynavbar-393901-c3c3f910dfec",
};
const rowNames = ["title", "link", "imgName"];

interface obj {
  [property: string]: string;
}

async function loadSavedCredentialsIfExist(credentialsName: string) {
  try {
    const path = `src/lib/.credentials/${credentialsName}.json`;
    const creds = JSON.parse(await readFile(path, "utf8"));
    return creds;
  } catch (err) {
    return null;
  }
}

async function getGithubList(googleSheetsEnv: GoogleSheetsEnv) {
  const {docID, sheetID, credentialsName} = googleSheetsEnv;

  const creds = await loadSavedCredentialsIfExist(credentialsName);

  const scopes = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive.file",
  ];

  const jwt = new google.auth.JWT({
    email: creds?.client_email || process.env.JWT_client_email,
    key: creds?.private_key || process.env.JWT_private_key,
    scopes,
  });
  console.log(jwt);

  const result: any[] = [];

  const doc = new GoogleSpreadsheet(docID, jwt);
  await doc.loadInfo();
  const sheet = doc.sheetsById[sheetID];
  const rows = await sheet.getRows();
  rows.forEach((row) => {
    result.push(
      rowNames.reduce((obj, name) => {
        obj[name] = row.get(name);
        return obj;
      }, {} as obj)
    );
  });
  return result.reverse();
}

export const GET = async function () {
  return json(await getGithubList(googleSheetsEnv));
};
