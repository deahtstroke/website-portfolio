<script lang="ts">
	import type { Project } from "$lib/types/Project";
	import { ExternalLinkIcon, Github } from "lucide-svelte";

	let {
		project = {
			title: "",
			description: "",
			technologies: [],
			githubUrl: "",
			pinned: false,
		},
	}: { project?: Project } = $props();
</script>

<article class="group flex flex-col border border-border">
	{#if project}
		<!-- Main content -->
		<div class="flex flex-1 flex-col p-6 gap-4">
			<h3 class="text-xl font-bold">
				{project.title}
			</h3>
			<p class="text-xs text-default leading-relaxed">
				{project.description}
			</p>

			<div class="flex flex-wrap gap-2">
				{#each project.technologies as tech}
					<span
						class="px-2 py-1 text-[10px] text-body uppercase tracking-wider bg-bg-default border border-border"
					>
						{tech}
					</span>
				{/each}
			</div>
		</div>

		<!-- Github and project links -->
		<div class="flex gap-3 p-6">
			<a
				href={project.githubUrl}
				target="_blank"
				rel="noopener noreferrer"
				class="flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider bg-bg-default border border-border-hover rounded text-default hover:bg-bg-dark transition-all duration-300 group/link"
			>
				<Github class="w-4 h-4" />
				<span>Source</span>
			</a>
			{#if project.websiteUrl}
				<a
					href={project.websiteUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider bg-bg-default border border-border-default rounded text-default hover:bg-bg-dark transition-all duration-300 group/link"
				>
					<ExternalLinkIcon class="w-4 h-4" />
					<span>Visit</span>
				</a>
			{/if}
		</div>
	{:else}{/if}
</article>
