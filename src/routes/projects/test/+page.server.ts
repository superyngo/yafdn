import {testPlus} from "$lib/server/testPlus";
// import {importJSON} from "$lib/server/serverUtils";

export const actions = {
  testPost: async ({request, fetch}) => {
    const data = await request.formData();
    const [queryName, queryString] = [
      data.get("queryName"),
      data.get("queryString"),
    ];

    await fetch(`/api/getGithubList?${queryName}=true`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Adjust the content type as needed
        // Other headers if required
      },
      body: queryString, // Convert your data to JSON format
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the JSON response
      })
      .then((data) => {
        console.log(data); // Process the response data
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
    return {success: queryName};
  },
  testApiWebhook: async ({request, fetch}) => {
    const data = await request.formData();
    const [queryName, queryString] = [
      data.get("queryName"),
      data.get("queryString"),
    ];

    await fetch(`/projects/testApiWebhook`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Adjust the content type as needed
        // Other headers if required
      },
      body: queryString, // Convert your data to JSON format
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the JSON response
      })
      .then((data) => {
        console.log(data); // Process the response data
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
    return {success: queryName};
  },
  testNumber: async ({request}) => {
    const num = Number((await request.formData()).get("testNumber"));
    const result = await testPlus(num);
    console.log("in actions:", result);
    return {testResult: result};
  },
};
// const json = await importJSON("src/md/lists/myNavbarOfGithubList.json");

export async function load() {
  const hi = "hi";
  return {hi};
}
