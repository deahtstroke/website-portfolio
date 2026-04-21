<script lang="ts">
	import Metadata from "$lib/components/Metadata.svelte";
	import { siGithub } from "simple-icons";

	const languages: Record<string, string> = {
		java: "peach",
		go: "sky",
		lua: "blue",
		bash: "green",
		python: "red",
		c: "teal",
		typescript: "mauve",
	};

	const libraries: Record<string, string> = {
		svelte: "peach",
		"spring boot": "green",
		react: "sapphire",
		"node.js": "teal",
		"cobra/viper": "yellow",
		containerd: "lavender",
		bubbletea: "mauve",
	};

	const tools: Record<string, string> = {
		git: "subtext0",
		docker: "sapphire",
		linux: "yellow",
		containerd: "lavender",
		postgresql: "blue",
		redis: "red",
		"gh-actions": "text",
	};

	const systems: string[] = [
		"Distributed Systems",
		"Linux Kernel",
		"Container runtimes",
	];

	const theory: string[] = [
		"Programming Languages",
		"Compiler Design",
		"Interpreters",
		"Abstract Syntax Trees",
		"Parsers",
	];

	const infra: string[] = [
		"Observability",
		"Networking",
		"Kubernetes",
		"Deployment Pipelines",
		"CI/CD",
		"DevOps",
	];

	let current: string = $state("languages");
</script>

<Metadata
	title="About – Daniel Villavicencio | Developer & Blogger"
	description="Learn more about Daniel Villavicencio, a passionate software engineer and
	technical blogger. Discover his projects, skills, and areas of expertise in both frontend
	and backend development."
	ogTitle="About – Daniel Villavicencio | Developer & Blogger"
	ogDescription="Learn more about Daniel Villavicencio, a passionate software engineer and
	technical blogger. Discover his projects, skills, and areas of expertise in both frontend
	and backend development."
	ogUrl="https://danielvm.dev/about"
	ogImage="https://danielvm.dev/manatee.png"
	ogType="website"
/>

<!-- Interest block of markup -->
{#snippet interest(title: string, interests: string[], color: string = "mauve")}
	<div class="flex flex-col gap-2 items-start text-xs">
		<h3 class="tracking-widest uppercase text-{color}">{title}</h3>
		<div class="flex gap-2 items-center flex-wrap">
			{#each interests as i}
				<span
					class="px-1.5 py-0.5 border rounded border-{color} text-{color} text-xs"
					>{i}</span
				>
			{/each}
		</div>
	</div>
{/snippet}

<!-- Button for switching between programming languages, tools, and frameworks -->
{#snippet skillsButton(label: string, state: string, fn: () => void)}
	<button
		onclick={fn}
		class="px-4 py-2 text-text cursor-pointer whitespace-nowrap border-b-2 {current ===
		state
			? 'border-b-2 border-mauve bg-surface'
			: 'border-transparent hover:bg-surface hover:border-mauve'}"
	>
		{label}
	</button>
{/snippet}

<main
	class="flex flex-col items-center gap-10 min-w-0 max-w-3xl mx-auto px-4 py-8 sm:py-10"
>
	<section class="flex flex-col gap-4 items-start mb-3">
		<h1 class="text-3xl mb-2 text-mauve font-bold tracking-tight">About Me</h1>
		<p class="text-sm text-text">
			My name is Daniel and I build the stuff underneath the stuff. I am into
			container runtimes, low-level computer science stuff and recently I've
			been contributing to open-source projects. A quote from a very good friend
			that really highlights why I like to deep-dive into topics I don't know
			about is: Rome wasn't built in a day. I am a very curious individual on
			how and why systems work, naturally this is what drew me to make many of
			my own personal projects and contribute to high-profile projects such as
			Docker: I want to understand how they work.
		</p>
		<p class="text-sm text-text">
			Also, I really like <span class="text-sky">manatees</span>.
		</p>
	</section>

	<!-- Skills, tools, and frameworks -->
	<article class="w-full">
		<div class="w-full mb-2 flex items-center gap-2">
			<h3 class="text-xs text-overlay0 font-medium tracking-widest uppercase">
				Skills
			</h3>
			<div class="flex-1 bg-surface0 h-px"></div>
			<p class="text-xs text-overlay0">stuff I use</p>
		</div>
		<section class="w-full border border-surface1 bg-mantle">
			<div
				class="flex flex-nowrap gap-1 w-0 min-w-full px-3 text-xs bg-crust border-b border-border overflow-x-auto"
			>
				{@render skillsButton(
					"languages.md",
					"languages",
					() => (current = "languages"),
				)}
				{@render skillsButton(
					"frameworks.md",
					"libraries",
					() => (current = "libraries"),
				)}
				{@render skillsButton("tools.md", "tools", () => (current = "tools"))}
			</div>
			<div class="px-3 py-2 bg-mantle text-white flex flex-wrap gap-2">
				{#if current === "languages"}
					{#each Object.entries(languages) as [language, color]}
						<span
							class="px-1.5 py-px border rounded border-{color} text-sm text-{color}"
						>
							{language}
						</span>
					{/each}
				{:else if current === "libraries"}
					{#each Object.entries(libraries) as [library, color]}
						<span
							class="px-1.5 py-px border rounded border-{color} text-sm text-{color}"
						>
							{library}
						</span>
					{/each}
				{:else}
					{#each Object.entries(tools) as [tool, color]}
						<span
							class="px-1.5 py-px border rounded border-{color} text-sm text-{color}"
						>
							{tool}
						</span>
					{/each}
				{/if}
			</div>
		</section>
	</article>

	<!-- Topics of interest -->
	<article class="w-full">
		<div class="w-full mb-5 flex items-center gap-2">
			<h3 class="text-xs text-overlay0 font-medium tracking-widest uppercase">
				Interests
			</h3>
			<div class="flex-1 bg-surface0 h-px"></div>
			<p class="text-xs text-overlay0">stuff i like</p>
		</div>
		<section class="w-full flex flex-col gap-4">
			<!-- Systems Programming -->
			{@render interest("systems programming", systems, "teal")}
			<!-- CompSci Theory -->
			{@render interest("theory", theory, "mauve")}
			<!-- Infrastructure -->
			{@render interest("infra", infra, "peach")}
		</section>
	</article>

	<!-- Where to find me -->
	<article class="w-full">
		<div class="w-full mb-5 flex items-center gap-2">
			<h3 class="text-xs text-overlay0 font-medium tracking-widest uppercase">
				Find me
			</h3>
			<div class="flex-1 bg-surface0 h-px"></div>
			<p class="text-xs text-overlay0">my socials</p>
		</div>
		<section class="w-full flex gap-4">
			<a
				href="https://www.github.com/deahtstroke"
				rel="noopener noreferrer"
				target="_blank"
				class="group px-3 py-1.5 rounded bg-surface1 text-sm text-text border border-border flex items-center gap-2 hover:text-mauve hover:border-mauve"
			>
				<span class="h-4 w-4 fill-text group-hover:fill-mauve"
					>{@html siGithub.svg}</span
				>
				Github</a
			>
		</section>
	</article>
</main>
