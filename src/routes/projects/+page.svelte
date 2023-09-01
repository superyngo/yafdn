<script lang="ts">
  export let data;
  // console.log(JSON.stringify(data));

  const list = [
    {title: "Snake", href: `${data.url}/snake`, img: `${data.url}/snake.png`},
    {
      title: "Notkia 3310",
      href: `${data.url}/Notkia3310`,
      img: `${data.url}/snake3310.png`,
    },
    // {
    //   title: "Test",
    //   href: `${data.url}/test`,
    //   img: `${data.url}/testApiWebhook.png`,
    // },
  ];

  const {gitHubList} = data;
</script>

<main>
  <div class="wrapper">
    <ol class="flex flex-wrap justify-center gap-4">
      {#each list as li}
        <li class="w-64">
          {li.title} <a href={li.href}> <img src={li.img} alt={li.title} /></a>
        </li>
      {/each}
    </ol>
  </div>

  <h1 class="text-xl m-5">Hosted on github</h1>

  <div class="wrapper">
    <ol class="flex flex-wrap justify-center gap-4">
      {#each gitHubList as li}
        <li class="w-64">
          {li.title}
          <a href={li.link} target="_blank">
            <img
              src={`${data.url}/github/${li.imgName}.png`}
              alt={li.title}
            /></a
          >
        </li>
      {/each}
    </ol>
  </div>
</main>
