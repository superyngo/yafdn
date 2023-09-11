<script>
  import "../app.css";
  import Header from "$lib/components/Sites/Header.svelte";
  import PageTransition from "$lib/components/Sites/PageTransition.svelte";
  import {config} from "$lib/utils/config";
  export let data;
</script>

<!-- SEO -->
<svelte:head>
  <title>
    {config.title}
  </title>
  <meta property="og:type" content="article" />
  <meta property="og:title" content={config.title} />
</svelte:head>

<main class="absolute w-full h-full flex flex-col-reverse sm:flex-row">
  <Header />
  <section
    class="contentWrapper grow overflow-auto p-1
	sm:p-10"
  >
    <PageTransition url={data.url}>
      <slot />
    </PageTransition>
  </section>
</main>

<style lang="postcss">
</style>
