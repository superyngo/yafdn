import {json} from "@sveltejs/kit";
let status = "stay";
let response = 0;
export async function GET(request) {
  const query = request.url.searchParams.get("query");
  if (query === "alter") {
    status = "alter";
  }
  if (status === "alter") {
    response++;
    status = "stay";
  }
  return json(response + "");
}
export async function POST(request) {
  const query = request.url.searchParams.get("postData");
  let response = query;
}
