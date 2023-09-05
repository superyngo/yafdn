import {json} from "@sveltejs/kit";
export async function POST({request}) {
  const formData = await request.formData();
  const data: Data = {
    success: false,
    errors: {},
  };
  return json(data);
}

export async function GET({request}) {
  return json({GET: "GET"});
}
