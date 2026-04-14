<script lang="ts">
	import Metadata from "$lib/components/Metadata.svelte";
	import type { PageProps } from "./$types";
	import { Github } from "lucide-svelte";
	import GithubFeed from "$lib/components/github/GithubFeed.svelte";
	import LatestPostsFeed from "$lib/components/latest-posts/LatestPostsFeed.svelte";

	let { data }: PageProps = $props();

	const GITHUB_URL: string = "https://www.github.com/deahtstroke";
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

<main class="max-w-3xl mx-auto px-4 py-8 sm:py-10">
	<header class="mb-10">
		<section class="flex items-end w-full justify-between gap-4 flex-wrap">
			<div class="flex flex-col gap-4">
				<h1 class="text-3xl text-mauve font-bold tracking-tight cursor-blink">
					Daniel
				</h1>
				<p class="text-sm">
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

		<section class="mt-5 pt-5 border-t border-surface0">
			<p class="text-sm text-ctp-subtext1 leading-relaxed max-w-3xl">
				Systems software engineer focused on container runtimes, low-level
				networking, and open-source infrastructure. Contributor to
				<a
					href="https://github.com/moby/moby"
					target="_blank"
					rel="noopener noreferrer"
					class="text-ctp-blue hover:underline">moby</a
				>
				and related projects.
			</p>
			<a
				href="/about"
				class="inline-block mt-3 text-xs text-ctp-overlay1 hover:text-ctp-mauve transition-colors"
			>
				Read more →
			</a>
		</section>
	</header>

	<!-- Github Activity -->
	<section class="mb-3">
		<div class="w-full mb-2 flex items-center gap-2">
			<h2 class="text-xs text-overlay0 font-medium tracking-widest uppercase">
				Recent Activity
			</h2>
			<div class="flex-1 bg-surface0 h-px"></div>
			<p class="text-overlay0 text-xs">my github activity</p>
		</div>
		<GithubFeed />
	</section>

	<!-- Blog Posts -->
	<section class="mt-10 mb-3">
		<div class="w-full mb-2 flex items-center gap-2">
			<h2 class="text-xs text-overlay0 font-medium tracking-widest uppercase">
				Latest posts
			</h2>
			<div class="flex-1 bg-surface0 h-px"></div>
			<a
				href="/blog"
				class="group text-xs text-mauve sm:text-overlay0 hover:text-mauve transition-all"
			>
				<span
					class="inline-block transition-transform group-hover:translate-x-1"
					>→</span
				>
				/blog</a
			>
		</div>
		<LatestPostsFeed posts={data.posts} />
	</section>
</main>
