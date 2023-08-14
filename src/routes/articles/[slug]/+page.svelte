<script lang="ts">
  import {formatDate} from "$lib/utils";
  import Label from "$lib/components/label.svelte";

  export let data;
  const {html, metadata} = data;
</script>

<!-- SEO -->
<svelte:head>
  <title>
    {metadata.title}
  </title>
  <meta property="og:type" content="article" />
  <meta property="og:title" content={metadata.title} />
  <!-- <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.23.0/themes/prism.min.css"
    integrity="sha512-tN7Ec6zAFaVSG3TpNAKtk4DOHNpSwKHxxrsiw4GHKESGPs5njn/0sMCUMl2svV4wo4BK/rCP7juYz+zx+l6oeQ=="
    crossorigin="anonymous"
  /> -->
</svelte:head>

<!-- title -->
<hgroup class=" duration-300">
  <h1 class="text-4xl leading-loose">{metadata.title}</h1>
  <p>posted at {formatDate(metadata.date)}</p>
</hgroup>

<!-- tags -->
{#each metadata.categories as category}
  <Label {category} />
{/each}
<article class="prose py-5 mx-auto">
  <div>{@html html}</div>
</article>
