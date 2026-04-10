<script lang="ts">
	import BlogPostCard from "$lib/components/BlogPostCard.svelte";
	import Metadata from "$lib/components/Metadata.svelte";
	import type { PageProps } from "./$types";

	let { data }: PageProps = $props();
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

<main
	class="bg-bg-default flex flex-col items-center px-8 pb-8 gap-8 sm:gap-12"
>
	<section class="flex flex-col gap-6 items-center py-12">
		<h1 class="text-5xl md:text-7xl text-bright font-semibold">Blog</h1>
		<p class="text-lg text-default text-center">
			Technical writing and development insights on projects I'm currently
			working on
		</p>
	</section>
	<section class="max-w-6xl relative flex flex-col gap-6 items-center">
		<div class="grid gap-12">
			{#each data.posts as post}
				<BlogPostCard {post} />
			{/each}
		</div>
	</section>
</main>
