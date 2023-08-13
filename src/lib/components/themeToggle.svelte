<script lang="ts">
	import { onMount } from 'svelte';
	let darkMode;
	onMount(() => (darkMode = document.documentElement.className === 'dark'));
	function handleSwitchDarkMode() {
		darkMode = !darkMode;
		localStorage.setItem('theme', darkMode ? 'dark' : 'light');
		darkMode
			? document.documentElement.classList.add('dark')
			: document.documentElement.classList.remove('dark');
	}
</script>

<div>
	<input checked={darkMode} on:click={handleSwitchDarkMode} type="checkbox" id="theme-toggle" />
	<label for="theme-toggle" />
</div>

<style lang="postcss">
	#theme-toggle {
		@apply invisible;
	}

	#theme-toggle + label {
		@apply inline-block cursor-pointer absolute rounded-full duration-300 
						h-5 w-5 bottom-12 left-5 z-40
						sm:h-8 sm:w-8 sm:bottom-8;
	}

	#theme-toggle:not(:checked) + label {
		@apply bg-amber-400;
	}

	#theme-toggle:checked + label {
		@apply bg-transparent;
		box-shadow: inset -18px -16px 1px 1px #ddd;
	}
</style>
