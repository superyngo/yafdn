<script lang="ts">
  import {page} from "$app/stores";
  export let data;
  export let form;
  console.log("form", form);

  async function test(event: Event) {
    const formEl = event.target as HTMLFormElement;
    const newForm = new FormData(formEl);
    const response = await fetch(formEl.action, {
      method: "POST",
      body: newForm,
    });
    form = await response.json();
    formEl.reset();
  }
</script>

<div>
  <a href="/projects/testApiWebhook">test</a>
  <form method="POST" action="?/testApiWebhook">
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
  <form on:submit|preventDefault={test}>
    <input type="hidden" name="testname" value="testvalue" />
    <input type="text" />
    <button>test</button>
  </form>
  <form method="POST" action="?/testNumber">
    <input type="number" name="testNumber" />
    <button>submit number</button>
    {#if form?.testResult}
      <p>{form.testResult}</p>
    {/if}
  </form>
</div>
<div>
  {#if form?.testApiWebhook}
    {form.testApiWebhook}
  {/if}
</div>
