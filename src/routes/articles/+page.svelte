<script lang="ts">
  import {onMount} from "svelte";
  import Articles from "$lib/components/Articles.svelte";
  import Labels from "$lib/components/labels.svelte";
  export let data;

  onMount(() => {
    if (data.queryCategory) {
      const selectedCategory = document.getElementById(data.queryCategory);
      const clickEvent = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      });
      selectedCategory && selectedCategory.dispatchEvent(clickEvent);
    }
  });

  let selectedCategories: string[] = [];
  function setSelectedCategories(e: MouseEvent) {
    if (e.target.className === "clearButton") {
      return clearFilter();
    }
    if (e.target.tagName != "SPAN") return;
    if (e.target.className.match("pushed")) {
      e.target.classList.remove("pushed");
      const spliced = [...selectedCategories];
      spliced.splice(selectedCategories.indexOf(e.target.textContent), 1);
      selectedCategories = [...spliced];
    } else {
      e.target.classList.add("pushed");
      selectedCategories = [...selectedCategories, e.target.textContent];
    }
  }
  function clearFilter() {
    const labels = document.querySelectorAll(".label");
    labels.forEach((l) => l.classList.remove("pushed"));
    selectedCategories = [];
  }

  let postList;
  $: {
    const temp = data.postList.filter((p) =>
      p.categories.some((c) => selectedCategories.includes(c))
    );
    postList = temp[0] ? temp : data.postList;
  }
</script>

<div class="wrapper flex flex-col gap-2 sm:flex-row-reverse h-full">
  <div class="labels">
    <button
      class="wrapper grow-0 sm:w-48 pushed"
      on:click={(e) => setSelectedCategories(e)}
    >
      <Labels
        data={{
          categories: data.categories,
        }}
      />
      <button class="clearButton">clear</button>
    </button>
  </div>

  <div class="postList wrapper grow">
    {#if postList[0]}
      <Articles data={{postList}} />
    {/if}
  </div>
</div>
