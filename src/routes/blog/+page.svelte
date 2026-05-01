<script lang="ts">
	import BlogPostCard from "$lib/components/BlogPostCard.svelte";
	import Metadata from "$lib/components/Metadata.svelte";
	import type { Post } from "$lib/types/Post";
	import type { PageProps } from "./$types";

	const InitialTagAmount: number = 5;

	type BlogSorting = "newest" | "oldest";

	let { data }: PageProps = $props();

	let results: Post[] = $derived.by(() => {
		return data.posts
			.filter((p) => {
				if (selectedTag === "all") {
					return true;
				} else {
					let allLower = p.categories.map((c) => c.toLowerCase());
					return allLower.includes(selectedTag);
				}
			})
			.filter((p) => {
				if (query === "") {
					return true;
				} else {
					return (
						p.title.toLowerCase().includes(query.toLowerCase()) ||
						p.description.toLowerCase().includes(query.toLowerCase())
					);
				}
			})
			.sort((a, b) => {
				return sorting === "oldest"
					? new Date(a.date).getTime() - new Date(b.date).getTime()
					: new Date(b.date).getTime() - new Date(a.date).getTime();
			});
	});

	let tagFrequencies: string[] = $derived(
		Object.entries(
			data.posts
				.flatMap((post) => post.categories)
				.reduce(
					(acc, tag) => {
						acc[tag] = (acc[tag] ?? 0) + 1;
						return acc;
					},
					{} as Record<string, number>,
				),
		)
			.sort((a, b) => b[1] - a[1])
			.map(([tag]) => tag),
	);

	let showAllTags: boolean = $state(false);
	let selectedTag: string = $state("all");
	let query: string = $state("");
	let sorting: BlogSorting = $state("newest");
</script>

<Metadata
	title="Blog – DanielVM | Software Projects & Development Insights"
	description="Explore Daniel Villavicencio's technical blog featuring software projects, development insights, and practical coding tutorials. Learn about full-stack engineering, distributed systems, and best practices."
	ogTitle="Blog – DanielVM | Software Projects & Development Insights"
	ogDescription="Explore Daniel Villavicencio's technical blog featuring software projects, development insights, and practical coding tutorials. Learn about full-stack engineering, distributed systems, and best practices."
	ogUrl="https://www.danielvm.dev/blog"
	ogImage="https://www.danielvm.dev/manatee.png"
	ogType="website"
/>

{#snippet tag(
	name: string,
	value: string,
	fn: () => void,
	defaultColor: string = "overlay0",
)}
	<button
		onclick={fn}
		class="px-2 py-1 text-xs border rounded cursor-pointer
		{selectedTag === value
			? `text-mauve bg-surface0 border-mauve`
			: `text-${defaultColor} border-${defaultColor} hover:bg-mantle hover:text-subtext0`}"
		>{name}
	</button>
{/snippet}

{#snippet tags(start: number, end: number)}
	{#each tagFrequencies.slice(start, end) as tagName}
		{@render tag(
			tagName,
			tagName.toLowerCase(),
			() => (selectedTag = tagName.toLowerCase()),
		)}
	{/each}
{/snippet}

<main class="flex flex-col items-center gap-10 max-w-3xl mx-auto px-4 py-8">
	<!-- Hero section -->
	<section class="flex flex-col gap-4 items-start">
		<h1 class="text-3xl mb-2 text-mauve font-bold tracking-tight">Blog</h1>
		<p class="text-base text-text">
			My own writing on systems programming, containers, programming languages
			and whatever I'm obsessing over this month. You'll also find some rambles
			here and there.
		</p>
	</section>

	<!-- Search bar and filters -->
	<section class="w-full">
		<div
			class="flex items-center px-3 py-2 mb-3 gap-2 border border-surface0 rounded bg-mantle"
		>
			<span class="text-mauve text-sm select-none">/</span>
			<input
				class="flex-1 bg-transparent border-0 text-base text-text placeholder:text-overlay0 focus:outline-none"
				placeholder="search posts..."
				bind:value={query}
			/>
			<span class="text-overlay0 text-sm select-none tabular-nums"
				>{results.length} / {data.posts.filter((p) => p.published).length}</span
			>
		</div>
		<div class="flex items-center gap-2 flex-wrap mb-3">
			{@render tag("All", "all", () => (selectedTag = "all"))}
			{#if showAllTags}
				{@render tags(0, tagFrequencies.length - 1)}
				{@render tag(
					"- Show less",
					"less",
					() => (showAllTags = false),
					"subtext0",
				)}
			{:else}
				{@render tags(0, InitialTagAmount)}
				{@render tag(
					"+ Show more",
					"more",
					() => (showAllTags = true),
					"subtext0",
				)}
			{/if}
		</div>

		<!-- Sorting oldest and newest -->
		{#snippet sortingButton(val: BlogSorting)}
			<button
				onclick={() => {
					if (val === "newest") {
						sorting = "newest";
					} else {
						sorting = "oldest";
					}
				}}
				class="rounded px-3 py-1.5 cursor-pointer {sorting === val
					? 'text-text bg-surface0'
					: 'text-surface2 bg-transparent'}"
				>{val === "newest" ? "Newest" : "Oldest"}</button
			>
		{/snippet}

		<div class="flex gap-2 text-xs">
			{@render sortingButton("newest")}
			{@render sortingButton("oldest")}
		</div>
	</section>
	<div class="flex flex-col gap-2 items-start">
		{#each results as post}
			<BlogPostCard {post} />
		{/each}
	</div>
</main>
