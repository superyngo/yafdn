export const actions = {
  testPost: async ({request, fetch}) => {
    const data = await request.formData();
    console.log("form Action", data.get("testInput"));

    fetch(`/api/getGithubList?test=${data.get("testInput")}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Adjust the content type as needed
        // Other headers if required
      },
      body: JSON.stringify(data), // Convert your data to JSON format
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
  },
};

export async function load() {
  const hi = "hi";
  return {hi};
}
