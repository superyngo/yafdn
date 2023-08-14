<script lang="ts">
  export let category: string;
  export let additionalCalss: string = "";
</script>

<span
  id={category}
  class="label text-xs font-semibold inline-block py-1 px-2 uppercase rounded
	text-yellow-100 bg-yellow-700 visited:text-yellow-300 hover:underline hover:bg-yellow-700
	uppercase last:mr-0 mr-1 text-center {additionalCalss}"
>
  {category}
</span>

<style lang="postcss">
  .pushed {
    filter: brightness(1.5);
  }
</style>
