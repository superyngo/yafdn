export const prerender = true;
import {myStore} from "$lib/stores/myStore";
// export const ssr = false;

export async function load({url}) {
  return {
    url: url.pathname,
  };
}
// console.log("envp", envp.env);
