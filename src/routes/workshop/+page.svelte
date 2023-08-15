<script lang="ts">
  import Snake from "$lib/apps/snake.svelte";

  const list = [
    {title: "Snake", href: "/workshop/snake", img: "/workshop/snake.png"},
    {
      title: "Notkia 3310",
      href: "/workshop/Notkia3310",
      img: "/workshop/snake3310.png",
    },
  ];
</script>

<div class="wrapper">
  <ol class="flex">
    {#each list as li}
      <li class="w-64">
        {li.title} <a href={li.href}> <img src={li.img} alt="" /></a>
      </li>
    {/each}
  </ol>
</div>
