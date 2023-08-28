<script lang="ts">
  import {onMount} from "svelte";
  import Articles from "$lib/components/Articles.svelte";
  import Labels from "$lib/components/labels.svelte";
  export let data;
  onMount(() => {
    if (data.queryLabel) {
      const selectedLabel = document.getElementById(data.queryLabel);
      const clickEvent = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      });
      selectedLabel && selectedLabel.dispatchEvent(clickEvent);
    }
  });

  let selectedLabels: string[] = [];
  function setSelectedLabels(e: MouseEvent) {
    if (e.target.className === "clearButton") {
      return clearFilter();
    }
    if (e.target.tagName != "SPAN") return;
    if (e.target.className.match("pushed")) {
      e.target.classList.remove("pushed");
      const spliced = [...selectedLabels];
      spliced.splice(selectedLabels.indexOf(e.target.textContent), 1);
      selectedLabels = [...spliced];
    } else {
      e.target.classList.add("pushed");
      selectedLabels = [...selectedLabels, e.target.textContent];
    }
  }
  function clearFilter() {
    const labels = document.querySelectorAll(".label");
    labels.forEach((l) => l.classList.remove("pushed"));
    selectedLabels = [];
  }

  let postList;
  $: {
    const filterPostList = data.postList.filter((p) =>
      p.labels.nodes.some((c) => selectedLabels.includes(c.name))
    );
    postList = filterPostList[0] ? filterPostList : data.postList;
  }
</script>

<div class="wrapper flex flex-col gap-2 sm:flex-row-reverse h-full">
  <div class="labels">
    <button
      class="wrapper grow-0 sm:w-48 pushed"
      on:click={(e) => setSelectedLabels(e)}
    >
      <Labels labels={data.labels} />
      <button class="clearButton">clear</button>
    </button>
  </div>

  <div class="postList wrapper grow">
    {#if postList[0]}
      <Articles data={{postList}} />
    {/if}
  </div>
</div>
