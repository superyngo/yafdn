import {readFile} from "fs/promises";
import {error} from "@sveltejs/kit";
import path from "path";

export async function importJSON(jsonpath: string) {
  try {
    const json = await JSON.parse(
      await readFile(await path.resolve(jsonpath), "utf8")
    );
    return json;
  } catch (e) {
    throw error(403, "import json Failed");
  }
}
