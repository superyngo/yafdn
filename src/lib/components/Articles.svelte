<script lang="ts">
  import {formatDate} from "$lib/utils";
  export let data;
</script>

<ol>
  {#each data.postList as post}
    <a href="/articles/article/{post.slug}">
      <li
        class="p-6 border border-gray-200 rounded-lg mb-3 shadow duration-300
        hover:bg-gray-400
        dark:hover:bg-yellow-400"
      >
        <p class="">
          {post.metadata.title}
        </p>
        <p>{formatDate(post.metadata.date)}</p>
        <p>{post.metadata.description}</p>
      </li>
    </a>
  {/each}
</ol>
