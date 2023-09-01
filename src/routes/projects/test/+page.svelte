<script lang="ts">
  export let data;
</script>

<div>
  <a href="/projects/testApiWebhook">test</a>
  <form method="post" action="?/testPost">
    <p>
      <label for="queryName">queryName Input </label>
      <input id="queryName" type="text" name="queryName" autocomplete="on" />
    </p>
    <p>
      <label for="queryString">queryString Input </label>
      <textarea id="queryString" name="queryString" autocomplete="on" />
    </p>
    <button>submit</button>
  </form>
</div>
