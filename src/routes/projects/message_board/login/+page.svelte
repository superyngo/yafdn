<script lang="ts">
  import {enhance} from "$app/forms"; // Import the enhance action
  import {goto} from "$app/navigation";
  import {onMount} from "svelte";

  export let data;
  export let form;
  let loginAction = "login";
  let statusButtons;
  onMount(() => {
    statusButtons = [...document.querySelectorAll(".statusButton")];
    statusButtons[0].style.setProperty("filter", "brightness(0.9)");
  });

  function clickedButton(button: HTMLElement) {
    statusButtons.forEach((b) => {
      b.style.setProperty("filter", "");
    });
    button.style.setProperty("filter", "brightness(0.9)");
  }
</script>

<div class="container">
  <div class="wrapper">
    <div class="buttonWrapper">
      <button
        class="statusButton login"
        on:click={(e) => {
          loginAction = "login";
          clickedButton(e.target);
        }}>Login</button
      >
      <button
        class="statusButton"
        on:click={(e) => {
          loginAction = "signup";
          clickedButton(e.target);
        }}>sign up</button
      >
    </div>
    <form
      id="loginForm"
      action="?/"
      method="POST"
      use:enhance={({cancel}) => {}}
    >
      <div id="loginWrapper">
        <img class="logo" src="{data.url}/logo.png" alt="logo" />
        {#if loginAction === "signup"}
          <input
            required
            type="text"
            id="username"
            name="username"
            autocomplete="username"
            placeholder="username"
            value={form?.username ? form.username : ""}
          />
        {/if}
        <input
          required
          type="email"
          id="email"
          name="email"
          autocomplete="email"
          placeholder="email"
          value={form?.email ? form.email : ""}
        />
        {#if form?.noEmail && loginAction === "login"}
          <p class="warning">{form?.message}</p>
        {/if}
        {#if form?.emailExit && loginAction === "signup"}
          <p class="warning">{form?.message}</p>
        {/if}
        <input
          required
          type="password"
          id="password"
          name="password"
          autocomplete="current-password"
          placeholder="password"
          value={form?.password ? form.password : ""}
        />
        {#if form?.wrongPassword && loginAction === "login"}
          <p class="warning">{form?.message}</p>
        {/if}
        {#if form?.password2short && loginAction === "signup"}
          <p class="warning">{form?.message}</p>
        {/if}
        {#if loginAction === "login"}
          <button type="submit" formaction="?/login">login</button>
        {/if}
        {#if loginAction === "signup"}
          <button type="submit" formaction="?/signup">sign up</button>
        {/if}
      </div>
    </form>
  </div>
</div>

<style scoped>
  .logo {
    width: 72px;
    aspect-ratio: 1/1;
  }
  .container {
    display: grid;
    place-items: center;
    height: 100%;
  }
  .wrapper {
    border: 1px solid black;
    border-radius: 5px;
  }
  .buttonWrapper {
    display: flex;
    justify-content: space-around;
  }
  .statusButton {
    border-bottom: 1px solid black;
    flex-grow: 1;
    background: pink;
    &:hover {
      filter: brightness(0.9);
    }
  }
  .statusButton:nth-child(1) {
    border-right: 1px solid black;
  }

  #loginWrapper {
    display: grid;
    gap: 2px;
    place-items: center;
    padding: 1rem;
  }
  .warning {
    color: red;
  }
</style>
