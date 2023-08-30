import {GoogleSpreadsheet} from "google-spreadsheet";
import {google} from "googleapis";
import {readFile, writeFile} from "fs/promises";

interface obj {
  [property: string]: string;
}
type GoogleSheetsEnv = {
  docID: string;
  sheetID: number;
  credentialsPath: string;
};

export async function getGithubList(
  googleSheetsEnv: GoogleSheetsEnv,
  rowNames,
  reverse: boolean = true
) {
  const {docID, sheetID, credentialsPath} = googleSheetsEnv;

  const creds = JSON.parse(await readFile(credentialsPath, "utf8"));

  const scopes = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive.file",
  ];

  const jwt = new google.auth.JWT({
    email: creds.client_email,
    key: creds.private_key,
    scopes,
  });

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
  return reverse ? result.reverse() : result;
}

export async function writeList(obj: {path: string; list: obj[]}) {
  const {path, list} = obj;
  await writeFile(path, JSON.stringify(list));
}
