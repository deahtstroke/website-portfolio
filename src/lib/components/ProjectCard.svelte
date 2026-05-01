<script lang="ts">
	import {
		LanguagesToColors,
		StatusToColors,
		type Project,
	} from "$lib/types/Project";

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
	}: { project: Project } = $props();

	function formatTag(tag: string): string {
		return tag.replaceAll(" ", "_").toLowerCase();
	}
</script>

<article class="group flex flex-col border border-border p-5">
	<!-- Main content -->
	<div class="flex flex-1 flex-col gap-2 pb-3 mb-3 border-b border-surface0">
		<div class="flex gap-2 mb-3 uppercase tracking-widest font-bold">
			<span
				class="px-2 py-0.5 text-xs border select-none rounded border-{LanguagesToColors[
					project.primaryLanguage
				]}
				text-{LanguagesToColors[project.primaryLanguage]}"
				>{project.primaryLanguage}</span
			>
			<span
				class="px-2 py-0.5 text-xs border select-none rounded border-{StatusToColors[
					project.status
				]}
				text-{StatusToColors[project.status]}"
			>
				{project.status}
			</span>
		</div>
		<h3 class="text-base text-mauve">
			{project.title}
		</h3>
		<p class="text-sm text-text leading-relaxed">
			{project.description}
		</p>

		<div class="flex flex-wrap gap-2">
			{#each project.technologies as tech}
				<span class="text-xs text-overlay0 tracking-wider">
					#{formatTag(tech)}
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
			class="group flex items-center gap-1 px-2 py-1 text-sm text-surface2"
		>
			<span class="text-blue hover:underline"
				>{project.repoName}/{project.repoOwner} ↗</span
			>
		</a>
		<!-- TODO: add a website link for projects with website links -->
	</div>
</article>
