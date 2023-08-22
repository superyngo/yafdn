<script lang="ts">
  export let labels;
  import Label from "./label.svelte";
</script>

<ol>
  {#each labels as label}
    <Label {label} />
  {/each}
</ol>
