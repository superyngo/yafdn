<script lang="ts">
  export let data;
  import Label from "./label.svelte";
</script>

<ol>
  {#each data.categories as category}
    <Label {category} />
  {/each}
</ol>
