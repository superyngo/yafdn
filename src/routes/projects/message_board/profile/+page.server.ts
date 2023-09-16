import {redirect} from "@sveltejs/kit";
export async function load({cookies}) {
  const sessionid = cookies.get("sessionid");
  if (!sessionid) {
    cookies.set("mbStatusChange", "Members Only, Please sign in first!", {
      path: "/",
    });
    throw redirect(303, "./");
  }
}
