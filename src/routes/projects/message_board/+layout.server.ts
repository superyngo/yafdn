import {mbdb} from "$lib/server/mbdb";
import type {StatusChange} from "$lib/utils/types";

export async function load({cookies}) {
  let statusChange: StatusChange = cookies.get("mbStatusChange") || {};
  if ((<string>statusChange).length) {
    statusChange = {statusChange: true, message: statusChange};
    cookies.delete("mbStatusChange", {path: "/"});
  }

  const sessionid = cookies.get("sessionid");
  if (!sessionid) return {...(<{}>statusChange)};

  let user = cookies.get("user");
  if (user) {
    user = JSON.parse(user);
  } else {
    user = await mbdb.getUserFromSession(sessionid);
    cookies.set("user", JSON.stringify(user), {path: "/"});
  }

  return {user, ...(<{}>statusChange)};
}
