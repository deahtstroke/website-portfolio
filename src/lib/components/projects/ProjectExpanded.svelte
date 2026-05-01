<script lang="ts">
	import type { Project } from "$lib/types/Project";

	let { project }: { project: Project } = $props();

	function formatTitle(projectTitle: string): string {
		return projectTitle.toLowerCase().replaceAll(" ", "-").replace("_", "-");
	}

	function formatArr(l: string[]): string {
		return l.map((a) => a.toLowerCase()).join(",");
	}
</script>

<div class="bg-crust">
	<div class="px-4 py-1.5 flex items-center gap-2">
		<span class="text-xs text-overlay1">{formatTitle(project.title)}.toml</span>
		<a href="/projects" class="text-xs ml-auto hover:underline text-sapphire"
			>all projects ↗</a
		>
	</div>
</div>
{#if project.projectType === "contribution"}
	<div
		class="bg-mantle px-4 py-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm"
	>
		<span class="col-span-2 text-text/50">[Project]</span>
		<span class="text-text/50">name:</span>
		<span class="text-text"
			>{project.repoOwner}/{project.repoName} upstream</span
		>
		{#if project.areas}
			<span class="text-text/50">areas: </span>
			<p class="text-text">
				{formatArr(project.areas)}
			</p>
		{/if}
		<span class="text-text/50">role:</span>
		<span class="text-text">open-source contributor</span>
		<span class="text-text/50">github-url:</span>
		<a
			rel="noopener noreferrer"
			target="_blank"
			href="https://github.com/{project.repoOwner}/{project.repoName}"
			>{project.repoOwner}/{project.repoName}</a
		>
		<span class="text-text/50">language:</span>
		<span class="text-text">{project.primaryLanguage}</span>
		<span class="text-text/50">technologies:</span>
		<span class="text-text">{formatArr(project.technologies)}</span>
		{#if project.websiteUrl}
			<span class="text-text/50">URL:</span>
			<span class="text-text">{project.websiteUrl}</span>
		{/if}
	</div>
{:else if project.projectType === "project"}
	<div
		class="bg-mantle px-4 py-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm"
	>
		<span class="col-span-2 text text-text/50">[Project]</span>
		<span class="text-text/50">name:</span>
		<span class="text-text">{project.repoOwner}/{project.repoName}</span>
		{#if project.areas}
			<span class="text-text/50">areas: </span>
			<p class="text-text">
				{formatArr(project.areas)}
			</p>
		{/if}
		<span class="text-text/50">role:</span>
		<span class="text-text">developer/core-maintainer</span>
		<span class="text-text/50">github-url:</span>
		<a
			href="https://github.com/{project.repoOwner}/{project.repoName}"
			rel="noopener noreferrer"
			target="_blank">{project.repoOwner}/{project.repoName}</a
		>
		<span class="text-text/50">primary-language:</span>
		<span class="text-text">{project.primaryLanguage}</span>
		<span class="text-text/50">technologies:</span>
		<span class="text-text">{formatArr(project.technologies)}</span>
	</div>
{/if}
