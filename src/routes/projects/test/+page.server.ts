//updateList
//[{"title":"Snake Svelte","link":"https://superyngo.github.io/snake_svelte3/","imgName":"snakesvelte"},{"title":"Snake","link":"https://superyngo.github.io/snake_spaghetti_style_code/","imgName":"snakevanilla"},{"title":"Drag and drop","link":"https://superyngo.github.io/drangNdrop/","imgName":"dragdrop"},{"title":"Travel Maker","link":"https://superyngo.github.io/Travel-Maker/","imgName":"travelmaker"},{"title":"Color Picker","link":"https://superyngo.github.io/colorful_colour_picker/","imgName":"colorpocker"},{"title":"Quasar Framework copycat","link":"https://superyngo.github.io/quasar_framework_copycat/","imgName":"quasarcopycat"},{"title":"Badge Generator","link":"https://superyngo.github.io/badge_generator/","imgName":"badgegenerator"},{"title":"Taiwan Weather Report","link":"https://superyngo.github.io/Taiwan_weather_report/","imgName":"taiwanweather"},{"title":"Every Country Around The Map","link":"https://superyngo.github.io/countries_around_world/","imgName":"mapwithcountry"},{"title":"Weight Tracker","link":"https://superyngo.github.io/weight_tracker_Chart.js/","imgName":"weighttracker"},{"title":"Bill Splitter","link":"https://superyngo.github.io/bill_splitter_vue3/","imgName":"billspliter"},{"title":"Notebook","link":"https://superyngo.github.io/EasyNotebook_Vue3/","imgName":"easynotebook"},{"title":"Timer","link":"https://superyngo.github.io/timer_vue3/","imgName":"timer"},{"title":"To Do Renderer","link":"https://superyngo.github.io/to_do_list_with_renderer/","imgName":"todosrender"},{"title":"To Do","link":"https://superyngo.github.io/to_do_list/","imgName":"todos"}]

export const actions = {
  testPost: async ({request, fetch}) => {
    const data = await request.formData();
    const [queryName, queryString] = [
      data.get("queryName"),
      data.get("queryString"),
    ];

    fetch(`/api/getGithubList?${queryName}=${data.get("queryString")}`, {
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
