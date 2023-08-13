<script lang="ts">
  import {formatDate} from "$lib/utils";
  import Label from "$lib/components/label.svelte";

  export let data;
  const {html, metadata} = data;
  console.log(data);
</script>
