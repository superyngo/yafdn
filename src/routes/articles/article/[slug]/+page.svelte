<script lang="ts">
  import {formatDate} from "$lib/utils";
  import Label from "$lib/components/label.svelte";

  import {onMount} from "svelte";

  export let data;
  const {html, metadata} = data;
  onMount(() => {
    const preElements = document.querySelectorAll("pre");
    const mdrawTextareat = document.querySelector("#mdraw");
    mdrawTextareat.style.height = mdrawTextareat.scrollHeight + 10 + "px";

    preElements.forEach((element) => {
      element.removeChild(element.firstChild);
      element.removeChild(element.lastChild);
    });
  });
</script>

<!-- SEO -->
<svelte:head>
  <title>
    {metadata.title}
  </title>
  <meta property="og:type" content="article" />
  <meta property="og:title" content={metadata.title} />
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.23.0/themes/prism.min.css"
    integrity="sha512-tN7Ec6zAFaVSG3TpNAKtk4DOHNpSwKHxxrsiw4GHKESGPs5njn/0sMCUMl2svV4wo4BK/rCP7juYz+zx+l6oeQ=="
    crossorigin="anonymous"
  />
</svelte:head>

<!-- title -->
<hgroup class=" duration-300">
  <h1 class="text-4xl leading-loose">{metadata.title}</h1>
  <p>posted at {formatDate(metadata.date)}</p>
</hgroup>

<!-- tags -->
{#each metadata.categories as category}
  <a href="/articles?category={category}">
    <Label {category} />
  </a>
{/each}
<article class="prose py-5 mx-auto">
  <div>{@html html}</div>
  <div class="mdrawContainer grid place-content-center">
    <textarea
      id="mdraw"
      rows="4"
      class="w- p-2.5 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="Write your markdown here..."
      oninput="this.style.height = this.scrollHeight+10 + 'px'"
    >
      {data.mdraw}
    </textarea>
  </div>
</article>

<style lang="postcss">
  #mdraw {
    min-width: 607px;
    height: fit-content;
    resize: true;
  }
</style>
