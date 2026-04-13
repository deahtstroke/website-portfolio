<script lang="ts">
	import Metadata from "$lib/components/Metadata.svelte";
	import ProjectCard from "$lib/components/ProjectCard.svelte";
	import {
		getRepoMetadata,
		projectData,
		getPinnedProjects,
	} from "$lib/data/projects";
	import type { PageProps } from "./$types";
	import BlogPostSmall from "$lib/components/BlogPostSmall.svelte";
	import { Github } from "lucide-svelte";
	import GithubFeed from "$lib/components/github/GithubFeed.svelte";

	let { data }: PageProps = $props();

	const GITHUB_URL: string = "https://www.github.com/deahtstroke";

	let enrichedRepoMetadata = $state(getRepoMetadata(projectData));
</script>

<Metadata
	title="DanielVM – Software Projects, Blog & Insights"
	description="Explore Daniel Villavicencio's portfolio of software projects, blog posts, and development insights. Learn more about his insights in full-stack technologies."
	ogTitle="DanielVM – Software Projects, Blog & Insights"
	ogDescription="Explore Daniel Villavicencio's portfolio of software projects, blog posts, and development insights. Learn more about his insights in full-stack technologies."
	ogUrl="https://www.danielvm.dev"
	ogImage="https://www.danielvm.dev/manatee.png"
	ogType="website"
/>

<main class="max-w-3xl mx-auto px-4 py-12 sm:py-16">
	<section>
		<div class="flex items-center gap-2 mb-6">
			<span class="text-body">~/</span>
			<span class="text-subheading">deahtstroke</span>
			<span class="text-body">on</span>
			<span class="text-success">main</span>
		</div>
	</section>

	<section class="flex items-end w-full justify-between gap-4 mb-12 flex-wrap">
		<div>
			<h1
				class="text-3xl sm:text-4xl font-bold mb-1 tracking-tight cursor-blink"
			>
				Daniel
			</h1>
			<p class="text-sm mt-3">
				Developer / Builder / Things that work / I like Manatees
			</p>
		</div>
		<a
			href={GITHUB_URL}
			target="_blank"
			rel="noopener noreferrer"
			class="github-link flex items-center gap-2 text-sm px-3 py-2 border border-border rounded"
		>
			<Github size="16" />
			My Github
		</a>
	</section>

	<!-- Github Activity -->
	<section class="mb-3">
		<div class="w-full mb-2 flex items-center gap-2">
			<h2 class="text-xs text-body/50 font-medium tracking-widest uppercase">
				Recent Activity
			</h2>
			<div class="flex-1 bg-body/50 h-px"></div>
			<p class="text-body/50 text-xs">my github activity</p>
		</div>
		<GithubFeed />
	</section>

	<!-- Blog Posts -->
	<section
		class="relative w-full max-w-5xl px-8 py-4 flex flex-col items-start gap-6"
	>
		<h2 class="text-xl">Blog Posts</h2>
		<p class="text-text">
			Technical writing regarding development and projects I'm currently
			working/researching.
		</p>
		{#each data.posts as post}
			<BlogPostSmall {post} />
		{/each}
	</section>

	<!-- Projects -->
	<section
		class="relative w-full max-w-5xl px-8 py-4 flex flex-col items-start gap-6"
	>
		<h2 class="text-xl">My Projects</h2>
		<p class="text-base">
			Some of the most recent projects I've recently worked on and/or I'm
			currently maintaining.
		</p>
		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
			{#await enrichedRepoMetadata}
				{#each [1, 2, 3] as _}
					<ProjectCard />
				{/each}
			{:then projects}
				{#each getPinnedProjects(projects) as project}
					<ProjectCard {project} />
				{/each}
			{/await}
		</div>
	</section>

	<section
		class="relative w-full max-w-5xl px-8 py-4 flex flex-col items-start gap-6"
	>
		<h2 class="text-xl">About Me</h2>
	</section>
	<section
		class="relative w-full max-w-5xl px-9 py-4 grid grid-cols-2"
	></section>
</main>
