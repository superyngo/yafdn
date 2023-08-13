<script lang="ts">
  import Articles from "$lib/components/Articles.svelte";
  import Labels from "$lib/components/labels.svelte";
  export let data;
  let selectedCategories: string[] = [];
  function setSelectedCategories(e: MouseEvent) {
    if (e.target.tagName != "SPAN") return;
    if (e.target.className.match("pushed")) {
      e.target.classList.remove("pushed");
      console.log(selectedCategories.indexOf(e.target.textContent));
      const spliced = [...selectedCategories];
      spliced.splice(selectedCategories.indexOf(e.target.textContent), 1);
      console.log(spliced);
      selectedCategories = [...spliced];
    } else {
      e.target.classList.add("pushed");
      selectedCategories = [...selectedCategories, e.target.textContent];
    }
  }
  //{slug: 'first-post4', metadata: {…}, categories: Array(3)}
  let postList;
  $: {
    const temp = data.postList.filter((p) =>
      p.categories.some((c) => selectedCategories.includes(c))
    );
    postList = temp[0] ? temp : data.postList;
  }
</script>

<div class="wrapper flex flex-col gap-2 sm:flex-row-reverse h-full">
  <button
    class="wrapper grow-0 sm:w-48 pushed"
    on:click={(e) => setSelectedCategories(e)}
  >
    <Labels
      data={{
        categories: data.categories,
      }}
    />
  </button>
  <div class="wrapper grow">
    {#if postList[0]}
      <Articles data={{postList}} />
    {/if}
  </div>
</div>
