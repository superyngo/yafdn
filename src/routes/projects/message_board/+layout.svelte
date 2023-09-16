<script lang="ts">
  import {afterUpdate} from "svelte";
  import {invalidateAll} from "$app/navigation";
  export let data;

  afterUpdate(() => {
    if (data.statusChange) {
      alert(data.message);
      invalidateAll();
    }
  });
</script>

<slot><!-- optional fallback --></slot>
