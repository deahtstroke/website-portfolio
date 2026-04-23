<script lang="ts">
	import { Mail, NotebookPen } from "lucide-svelte";
	import { formatDate } from "$lib/utils/DateUtils";
	import { type Snippet } from "svelte";
	import { type LayoutData } from "./$types";
	import { onMount } from "svelte";
	import { browser } from "$app/environment";

	onMount(async () => {
		if (browser) {
			const mermaid = (await import("mermaid")).default;

			mermaid.initialize({
				startOnLoad: true,
				theme: "dark",
				securityLevel: "loose",
			});

			await mermaid.run();
		}
	});

	let { children, data }: { children: Snippet; data: LayoutData } = $props();
</script>

<article class="max-w-3xl gap-4 mx-auto px-4 py-3 flex flex-col items-center">
	<header class="w-full flex flex-col gap-4 border-b border-neutral-800 pb-8">
		<a
			href="/blog"
			aria-label="Go back to blog posts"
			class="flex items-center flex-row gap-2 text-sm"
		>
			← Blog
		</a>
		<h1 class="text-2xl font-bold text-text">
			{data.metadata.title}
		</h1>
		<div class="flex flex-wrap gap-2">
			{#each data.metadata.categories as category}
				<span
					class="px-2 py-1 text-mauve text-[0.65rem] border rounded border-mauve"
					>{category}</span
				>
			{/each}
		</div>
		<p class="text-sm text-default">{data.metadata.description}</p>
		<div class="flex gap-5 items-center text-overlay1">
			<p class="text-xs text-overlay1">
				{data.metadata.timeToRead}
			</p>
			~
			<p class="text-xs text-overlay1">
				{formatDate(data.metadata.date)}
			</p>
		</div>
	</header>

	<!-- Content goes here -->
	<div class="prose w-full">
		{@render children()}
	</div>

	<footer class="flex flex-col gap-4">
		<div class="p-8 space-y-2">
			<h2 class="text-xl font-semibold text-bright text-center">
				Let's Work Together!
			</h2>
			<p class="text-default leading-relaxed text-center">
				If you enjoyed this article and are interested in collaborating, feel
				free to reach out. You can also explore more of my blog posts using the
				links below.
			</p>
			<div class="flex flex-col sm:flex-row sm:justify-center gap-2 pt-2">
				<a
					href="/contact"
					class="inline-flex items-center justify-center gap-2 px-6 py-2 bg-bg-default border border-border-default rounded text-bright hover:bg-bg-dark transition-colors"
				>
					<Mail class="h-4 w-4" />
					Contact Me
				</a>
				<a
					href="/blog"
					class="inline-flex items-center justify-center gap-2 px-6 py-2 bg-bg-default border border-border-default rounded text-bright hover:bg-bg-dark transition-colors"
				>
					<NotebookPen class="h-4 w-4" />
					More Blog Posts
				</a>
			</div>
		</div>
	</footer>
</article>
