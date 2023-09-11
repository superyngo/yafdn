<script lang="ts">
  import type {LabelType} from "$lib/utils/types";
  export let labels: LabelType[];
  import Label from "./Labels/Label.svelte";
</script>

<ol>
  {#each labels as label}
    <Label {label} />
  {/each}
</ol>
