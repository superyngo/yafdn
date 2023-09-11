<script>
  import Footer from "./Header/Footer.svelte";
  import Navitems from "./Header/Navitems.svelte";
  import ThemeToggle from "./Header/themeToggle.svelte";
</script>

<nav
  class="shrink-0 navbar p-4 z-40 grid border-2 duration-300
  h-1 grid-cols-3 hover:h-24 overflow-hidden
  sm:grid-cols-1 sm:w-52 sm:h-full hover:sm:h-full"
>
  <Navitems />
  <Footer />
</nav>
<ThemeToggle />

<style lang="postcss">
</style>
