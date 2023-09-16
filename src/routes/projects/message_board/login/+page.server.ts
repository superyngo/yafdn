import {redirect, fail} from "@sveltejs/kit";
import {randomBytes, scryptSync} from "crypto";
import {mbdb} from "$lib/server/mbdb";

function saltHash(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hashedPassword = scryptSync(password, salt, 64).toString("hex");
  return {[salt]: hashedPassword};
}

export const actions = {
  async login({request, cookies}) {
    console.log("login");
    const form = await request.formData();
    const user = await mbdb.getUser(<string>form.get("email"));
    if (!user)
      return fail(403, {
        noEmail: "true",
        message: "This email is not signed up.",
      });
    // const salt = await JSON.parse(fetchUser.rows[0].password);
    const salt = Object.keys(user.password)[0];

    if (
      scryptSync(<string>form.get("password"), salt, 64).toString("hex") !=
      user.password[salt]
    )
      return fail(403, {
        wrongPassword: "true",
        message: "This password is wrong.",
      });
    cookies.set(
      "sessionid",
      await mbdb.createSession(<string>form.get("email")),
      {
        path: "/",
        maxAge: 60 * 60 * 24,
      }
    );
    cookies.set("mbStatusChange", "Logged in.", {path: "/"});
    throw redirect(303, "./");
  },
  async signup({request, cookies}) {
    console.log("signup");
    const form = await request.formData();
    if ((<string>form.get("password")).length < 12) {
      return fail(403, {
        password2short: true,
        message: "Password must be longer then 12 characters",
      });
    }
    const signup = await mbdb.signup(
      <string>form.get("username"),
      <string>form.get("email"),
      saltHash(<string>form.get("password"))
    );

    if (!signup)
      return fail(400, {
        emailExit: true,
        message: "Email address already exists",
      });

    cookies.set(
      "sessionid",
      await mbdb.createSession(<string>form.get("email")),
      {
        path: "/",
        maxAge: 60 * 60 * 24,
      }
    );
    cookies.set(
      "mbStatusChange",
      "Sign up succeeded. Now jump to Message Board",
      {path: "/"}
    );
    throw redirect(303, "./");
  },
  async logout({request, cookies}) {
    console.log("log out");
    const form = await request.formData();
    const sessionid = cookies.get("sessionid");
    if (sessionid) {
      mbdb.deleteSession(sessionid);
      cookies.delete("sessionid", {path: "/"});
      cookies.delete("user", {path: "/"});
      cookies.set("mbStatusChange", "Logged out.", {path: "/"});
    }
  },
};
export async function load({cookies}) {
  const sessionid = cookies.get("sessionid");
  if (sessionid) throw redirect(303, "./");
}
