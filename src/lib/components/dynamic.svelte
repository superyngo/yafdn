<script lang="ts">
	import { compile, escapeSvelte } from 'mdsvex';
	import remarkUnwrapImages from 'remark-unwrap-images';
	import remarkToc from 'remark-toc';
	import rehypeSlug from 'rehype-slug';
	// import shiki from 'shiki';

	const compiledResponse = compile(
		`
   # test


    `,
		{
			highlight: {
				highlighter: async (code, lang = 'text') => {
					// const highlighter = await shiki.getHighlighter({ theme: 'poimandres' });
					const html = escapeSvelte(highlighter.codeToHtml(code, { lang }));
					return `${html}`;
				}
			},
			remarkPlugins: [remarkUnwrapImages, [remarkToc, { tight: true }]],
			rehypePlugins: [rehypeSlug]
		}
	);
	console.log(compiledResponse);
</script>

<div>{@html compiledResponse.code}</div>
