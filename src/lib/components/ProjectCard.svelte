<script lang="ts">
	import {
		LanguagesToColors,
		StatusToColors,
		type Project,
	} from "$lib/types/Project";
	import { ExternalLinkIcon, Github } from "lucide-svelte";

	let {
		project = {
			title: "",
			description: "",
			technologies: [],
			githubUrl: "",
			pinned: false,
			status: "active",
			primaryLanguage: "Go",
			projectType: "project",
		},
	}: { project?: Project } = $props();
</script>

<article class="group flex flex-col border border-border p-5">
	{#if project}
		<!-- Main content -->
		<div class="flex flex-1 flex-col gap-2 pb-3 mb-3 border-b border-surface0">
			<div class="flex gap-2 mb-3 uppercase tracking-widest font-bold">
				<span
					class="px-2 py-0.5 text-[0.65rem] border select-none rounded border-{LanguagesToColors[
						project.primaryLanguage
					]}
				text-{LanguagesToColors[project.primaryLanguage]}"
					>{project.primaryLanguage}</span
				>
				<span
					class="px-2 py-0.5 text-[0.65rem] border select-none rounded border-{StatusToColors[
						project.status
					]}
				text-{StatusToColors[project.status]}"
				>
					{project.status}
				</span>
			</div>
			<h3 class="text-sm text-text">
				{project.title}
			</h3>
			<p class="text-xs text-subtext0 leading-relaxed">
				{project.description}
			</p>

			<div class="flex flex-wrap gap-2">
				{#each project.technologies as tech}
					<span class="text-[0.65rem] text-overlay0 tracking-wider">
						#{tech}
					</span>
				{/each}
			</div>
		</div>

		<!-- Github and project links -->
		<div class="flex gap-3">
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
