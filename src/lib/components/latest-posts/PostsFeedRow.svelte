<script lang="ts">
	import type { Post } from "$lib/types/Post";
	import { formatDate } from "$lib/utils/DateUtils";

	let isExpanded: boolean = $state(false);

	let { post, index }: { post: Post; index: number } = $props();

	function formatTag(tag: string): string {
		return tag.replaceAll(" ", "_").toLowerCase();
	}
</script>

<button
	class="w-full grid grid-cols-[2rem_1fr_2rem] gap-x-4 px-3 py-3 items-center cursor-pointer transition-all duration-150 border border-l-2 {isExpanded
		? 'border-l-mauve bg-surface'
		: 'border-l-transparent hover:border-l-mauve hover:bg-surface'}"
	onclick={() => (isExpanded = !isExpanded)}
>
	<p class="text-xs text-surface2 select-none">{index + 1}</p>
	<div class="flex flex-col flex-wrap gap-2 justify-start">
		<h3 class="text-sm text-text text-left font-light">{post.title}</h3>
		<time
			datetime={post.date}
			class="text-[0.60rem] sm:text-xs text-overlay0 text-left"
			>{formatDate(post.date)}</time
		>
		<div class="flex flex-wrap items-center gap-2">
			{#each post.categories as tag}
				<span class="text-mauve text-[0.65rem] font-mono"
					>@{formatTag(tag)}</span
				>
			{/each}
		</div>
	</div>

	<span class="text-surface2 text-xs">
		{isExpanded ? "[-]" : "[+]"}
	</span>
</button>
{#if isExpanded}
	<div class="mx-4 mb-3 rounded bg-crust border border-surface0">
		<div
			class="px-3 py-1.5 flex items-center gap-2 border-b border-surface0 bg-mantle"
		>
			<span class="text-xs text-overlay1"> excerpt </span>
			<a
				href={`/blog/${post.slug}`}
				class="text-xs ml-auto hover:underline text-sapphire">Read more ↗</a
			>
		</div>
		<p class="px-4 py-3 text-xs text-subtext1 leading-relaxed">
			{post.description}.
		</p>
	</div>
{/if}
