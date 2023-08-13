<script lang="ts">
  console.log("step1");
  import {formatDate} from "$lib/utils";
  import Label from "$lib/components/label.svelte";

  export let data;
  console.log("step2", data);
  const {html, metadata} = data;
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
  <Label {category} />
{/each}
<article class="prose py-5 mx-auto">
  <div>{@html html}</div>
</article>
