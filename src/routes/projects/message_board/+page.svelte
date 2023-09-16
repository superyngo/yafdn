<script lang="ts">
  import {enhance} from "$app/forms"; // Import the enhance action
  const __url = "/projects/message_board";
  export let data;
</script>

<div>Hello,{data.user?.name || "Stranger"}!</div>

<div class="logPanel">
  <a href={__url + "/login"}>login</a>

  <form action={__url + "/login?/logout"} method="POST" use:enhance>
    <input type="hidden" name="url" value={__url} />
    <button>log out</button>
  </form>
</div>
{JSON.stringify(data)}
