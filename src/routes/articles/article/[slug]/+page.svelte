<script lang="ts">
  import {formatDate} from "$lib/utils";
  import Label from "$lib/components/label.svelte";
  export let data;
  const {metadata} = data.mdComp;
</script>

<!-- SEO -->
<svelte:head>
  <title>
    {metadata.title}
  </title>
  <meta property="og:type" content="article" />
  <meta property="og:title" content={metadata.title} />
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
  <svelte:component this={data.mdComp.default} />
</article>
