<script lang="ts">
	import type { Post } from "$lib/types/Post";
	import CommandLine from "../CommandLine.svelte";
	import PostsFeedRow from "./PostsFeedRow.svelte";

	let { posts = [] }: { posts: Post[] } = $props();
</script>

<article class="border border-surface1 bg-mantle">
	<!-- Tab bar -->
	<div
		class="bg-crust border-b border-surface0 flex items-center px-3 text-sm"
	>
		<h3
			class="px-4 py-2 text-text border-b-2 bg-surface border-mauve cursor-default whitespace-nowrap"
		>
			posts.md
		</h3>
		<h3
			class="px-4 py-2 text-overlay1 border-b-2
			border-transparent cursor-default whitespace-nowrap"
		>
			blog
		</h3>
	</div>

	<!-- Command line -->
	<CommandLine
		segments={[
			{ label: "cat", color: "green" },
			{ label: "~/posts.d", color: "yellow" },
			{
				label: `--latest=${posts.length}`,
				color: "overlay0",
			},
		]}
	/>

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
		<span class="ml-3 text-sm">
			[→] Click here to view all posts
		</span>
	</a>

	<div
		class="px-4 py-2 text-sm flex items-center gap-4 bg-crust border-t border-surface0 text-overlay0"
	>
		<span><span class="text-mauve">NORMAL</span></span>
		<span>4 blog posts</span>
		<span class="ml-auto">click the '[+]' to expand</span>
	</div>
</article>
