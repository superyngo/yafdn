// import {fileURLToPath} from "url";
// import dotenv from "dotenv";
// import type {Obj} from "$lib/utils/types";
// const __dirname = fileURLToPath(new URL(".", import.meta.url));
// dotenv.config({path: __dirname + ".env.development.local"});

import {createPool} from "@vercel/postgres";
const db = createPool();

const getUser = async function (targetEmail: string) {
  const data = await db.query(
    `
  SELECT * FROM "users"  
  WHERE email = $1
  `,
    [targetEmail]
  );
  return data.rows[0];
};

const signup = async function (
  username: string,
  email: string,
  saltPassword: Obj
) {
  const tryInsert = await db.query(
    `
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    ON CONFLICT (email) DO NOTHING;
    `,
    [username, email, saltPassword]
  );
  if (tryInsert.rowCount) return true;
  return false;
};

async function createSession(email: string) {
  const sessionId = crypto.randomUUID();
  const date = new Date();
  date.setDate(date.getDate() + 1);
  const insertSession = db.query(
    `
  INSERT INTO sessions(sessionid,email,expire)
  VALUES(
    $1,$2,$3
  )
  `,
    [sessionId, email, date]
  );
  return sessionId.toString();
}

async function deleteSession(sessionid: string) {
  const deleteSession = db.query(
    `
  DELETE FROM sessions
  WHERE sessionid = $1
  `,
    [sessionid]
  );
  return deleteSession.toString();
}

const getUserFromSession = async function (sessionid: string) {
  const data = await db.query(
    `
    SELECT u.name, s.email, s.sessionID
    FROM sessions s
    INNER JOIN users u ON s.email = u.email
    WHERE s.sessionID = $1;
  `,
    [sessionid]
  );
  return data.rows[0];
};

export const mbdb = {
  getUser,
  signup,
  createSession,
  getUserFromSession,
  deleteSession,
};
