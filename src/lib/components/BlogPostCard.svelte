<script lang="ts">
	import type { Post } from "$lib/types/Post";

	let { post }: { post: Post } = $props();
</script>

<article
	class="group w-full grid grid-cols-[auto_6rem_1fr_auto] gap-x-2 rounded hover:bg-surface0 transition-all"
>
	<div
		class="shrink-0 self-stretch w-2"
		style="background: linear-gradient(180deg, hsl({post.colorStart}), hsl({post.colorEnd}))"
	></div>
	<div class="flex flex-col items-end gap-1 px-2 py-2 text-text">
		<span class="text-xs text-text"
			>{new Date(post.date).toLocaleString("default", { month: "long" })}</span
		>
		<span class="text-xs text-overlay2"
			>{new Date(post.date).getUTCFullYear()}</span
		>
	</div>
	<div class="flex flex-col gap-3 px-2 py-2">
		<h2 class="text-text text-sm">
			<a href="/blog/{post.slug}">{post.title}</a>
		</h2>
		<p class="text-subtext0 text-xs">{post.description}</p>
		<div class="flex gap-4 flex-wrap">
			{#each post.categories.slice(0, 4) as category}
				<span class="text-[0.65rem] sm:text-xs text-mauve"
					>{category.toLowerCase()}</span
				>
			{/each}
		</div>

		<div class="text-[0.65rem] sm:text-xs text-surface2 flex gap-4 flex-nowrap">
			{post.timeToRead} read
			<a
				href="/blog/{post.slug}"
				class="text-[0.65rem] sm:text-xs sm:self-end inline-flex items-center gap-2"
			>
				read<span>→</span>
			</a>
		</div>
	</div>
</article>
