<script lang="ts">
	import { formatDate } from '$lib/utils';
</script>

<article>
	<hgroup class="duration-300">
		<h1 class="text-4xl leading-loose">關於我</h1>
		<!-- <p>posted at {formatDate('2023/8/3')}</p> -->
	</hgroup>

	<!-- post -->
	<div class="prose py-5 mx-auto duration-300">
		<slot />
	</div>
</article>
