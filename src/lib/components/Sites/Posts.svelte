<script lang="ts">
  import {formatDate} from "$lib/utils/utils";
  export let data: {[property: string]: any};
</script>

<ol>
  {#each data.postList as post}
    <a href="/posts/{post.year}/{post.month}/{post.date}/{post.number}">
      <li
        class="p-6 border border-gray-200 rounded-lg mb-3 shadow duration-300
        hover:bg-gray-400
        dark:hover:bg-yellow-400"
      >
        <p class="text-xl">
          {post.title}
        </p>
        <p>posted on {formatDate(post.publishedAt)}</p>
        {#if post.description}
          <p class="text-sm">{post.description}</p>
        {/if}
      </li>
    </a>
  {/each}
</ol>
