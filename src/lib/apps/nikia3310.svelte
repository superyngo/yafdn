<script lang="ts">
  import Snake3310 from "./snake3310.svelte";
</script>

<div class="phone relative h-full m-auto border-4">
  <img class="phoneImage m-auto" src="/Nokia_3310.png" alt="" />
  <div class="screen border-4 absolute">
    <Snake3310 controlHeight="0px" canvasWidth={30} canvasHeight={20} />
  </div>
</div>

<style lang="postcss">
  .phone {
    width: fit-content;
    max-height: 100%;
  }
  .phoneImage {
    max-height: 100%;
  }
  .screen {
    inset: 26% 15% 52%;
    border: 2px solid black;
    background-color: aqua;
    border-radius: 5% 5% 15% 15%;
  }
</style>
