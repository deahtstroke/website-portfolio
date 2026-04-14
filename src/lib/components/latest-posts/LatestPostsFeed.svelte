<script lang="ts">
	import type { Post } from "$lib/types/Post";
	import PostsFeedRow from "./PostsFeedRow.svelte";

	let { count = 4, posts = [] }: { count?: number; posts: Post[] } = $props();
</script>

<article class="border border-surface1 bg-mantle">
	<!-- Tab bar -->
	<div class="bg-crust border-b border-surface0 flex items-center px-3 text-xs">
		<h3
			class="px-4 py-2 text-text border-b-2 border-mauve cursor-default whitespace-nowrap"
		>
			posts.md
		</h3>
		<h3
			class="px-4 py-2 text-overlay1 border-b-2 border-transparent cursor-default whitespace-nowrap"
		>
			blog
		</h3>
	</div>

	<!-- Command line -->
	<p
		class="px-4 py-2 text-xs border-b border-border bg-surface overflow-hidden"
	>
		<span class="text-overlay0">$</span>
		<span class="text-green">cat</span>
		<span class="text-yellow">~/posts.md</span>
		<span class="text-overlay0">--latest={count}</span>
	</p>

	{#each posts as post, i}
		<div class="border-b border-surface0">
			<PostsFeedRow {post} index={i} />
		</div>
	{/each}
	<a
		href="/blog"
		class="w-full text-left px-4 py-3 border-surface0
             text-overlay1 flex items-center transition-colors duration-150
             hover:bg-surface0 hover:text-mauve"
	>
		<span
			class="select-none min-w-10 text-right pr-4 text-overlay0 text-xs shrink-0"
			>→</span
		>
		<span class="ml-3 text-xs">
			[→] view all posts
			<span class="text-overlay0">-- /blog</span>
		</span>
	</a>

	<div
		class="px-4 py-2 text-xs flex items-center gap-4 bg-crust border-t border-surface0 text-overlay0"
	>
		<span><span class="text-mauve">NORMAL</span></span>
		<span>4 blog posts loaded</span>
		<span class="ml-auto">click the '[+]' to expand</span>
	</div>
</article>
