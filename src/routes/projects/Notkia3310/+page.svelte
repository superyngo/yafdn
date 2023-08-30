<script lang="ts">
  import Snake3310 from "$lib/apps/snake3310.svelte";
</script>

<div
  class="absolute inset-0"
  on:touchstart={(e) => {
    e.preventDefault();
  }}
/>
<Snake3310 controlHeight="0px" canvasWidth={30} canvasHeight={20} />
