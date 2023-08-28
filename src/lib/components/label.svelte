<script lang="ts">
  export let label: string;
  export let additionalCalss: string = "";
</script>

<span
  id={label.name}
  class="label text-xs font-semibold inline-block py-1 px-2 uppercase rounded
	hover:underline uppercase last:mr-0 mr-1 text-center {additionalCalss} "
  style="background: #{label.color}"
>
  {label.name}
</span>

<style lang="postcss">
  .pushed {
    filter: brightness(1.5);
    scale: 1.1;
    border: 1px solid gray;
  }
</style>
