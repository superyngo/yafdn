<script lang="ts">
  export let data;
  console.log(data);
</script>

<div>
  <a href="/projects/testApiWebhook">test</a>
  <form method="post" action="?/testPost">
    <label for="testInput">TEST Input </label>
    <input id="testInput" type="text" name="testInput" autocomplete="on" />
    <button>submit</button>
  </form>
</div>
