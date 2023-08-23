<script>
  import {page} from "$app/stores";
  import Error from "$md/pages/__error.md";
</script>

<h1>{$page.status} {$page.error.message}</h1>
<span class="text-4xl">⚠️</span>
<div class="prose py-5 mx-auto duration-300"><Error /></div>
