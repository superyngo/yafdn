<script>
	import Footer from './Footer.svelte';
	import Navitems from './Navitems.svelte';
	import ThemeToggle from '$lib/components/themeToggle.svelte';
</script>

<nav
	class="shrink-0 navbar p-4 z-40 grid border-2 duration-300
  h-24 grid-cols-3
  sm:grid-cols-1 sm:w-52 sm:h-full"
>
	<Navitems />
	<Footer />
</nav>
<ThemeToggle />

<style lang="postcss">
</style>
