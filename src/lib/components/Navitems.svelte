<script>
	import { config } from '$lib/config';
</script>

<div class="title navitem my-auto">
	<h3
		class="text-xl italic text-center
						sm:text-4xl"
	>
		<a href="/">{config.title}</a>
	</h3>
	<p class="text-center text-xs scale-75 sm:scale-100">{config.description}</p>
</div>
<ol class="navitem text-center my-auto sm:my-0 text-xs sm:text-base">
	<li class="sm:py-2 py-1"><a href="/articles"><strong>文</strong>章</a></li>
	<li class="sm:py-2 py-1"><a href="/workshop">作品</a></li>
	<li class="sm:py-2 py-1"><a href="/about">關於我</a></li>
</ol>
