import {json} from "@sveltejs/kit";
import myNavbarList from "$md/lists/myNavbarList.json";

export const GET = async function () {
  return json(myNavbarList);
};
