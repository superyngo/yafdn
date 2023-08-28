<script lang="ts">
  import {formatDate} from "$lib/utils";
  import Label from "$lib/components/label.svelte";
  import Giscus from "@giscus/svelte";
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
  <p>posted at {formatDate(metadata.publishedAt)}</p>
</hgroup>

<!-- tags -->
{#each metadata.labels.nodes as label}
  <a href="/articles?label={label.name}" class="mr-1 last:mr-0">
    <Label {label} />
  </a>
{/each}
<article class="prose py-5 mx-auto">
  <svelte:component this={data.mdComp.default} />
</article>

<Giscus
  id="comments"
  repo="superyngo/yafdn"
  repoId="R_kgDOKGhedw"
  category="Announcements"
  categoryId="DIC_kwDOKGhed84CYobY"
  mapping="pathname"
  strict="0"
  term="Welcome to @giscus/svelte component!"
  reactionsEnabled="1"
  emitMetadata="0"
  inputPosition="top"
  theme="light"
  lang="en"
  loading="lazy"
/>
