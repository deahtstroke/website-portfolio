<script lang="ts">
	import type { Project, ProjectStatus } from "$lib/types/Project";
	import ProjectExpanded from "./ProjectExpanded.svelte";

	let { project, index }: { project: Project; index: number } = $props();

	let isExpanded: boolean = $state(false);

	const statusColor: Record<ProjectStatus, string> = {
		active: "green",
		maintained: "blue",
		wip: "yellow",
		archived: "overlay1",
	};

	const languageColor: Record<string, string> = {
		Java: "yellow",
		Go: "sapphire",
		Lua: "blue",
		Typescript: "mauve",
	};
</script>

<button
	class="w-full grid grid-cols-[2rem_1fr_2rem] gap-x-4 px-3 items-center cursor-pointer transition-all duration-150 border border-l-2 {isExpanded
		? 'border-l-mauve bf-surface'
		: 'border-l-transparent hover:border-lmauve hover:bg-surface'}"
	onclick={() => (isExpanded = !isExpanded)}
>
	<p class="text-sm text-surface2 select-none">{index + 1}</p>
	<div class="flex-1 flex items-center py-3">
		<div class="flex flex-1 flex-col items-start gap-2">
			<div class="flex w-full items-start gap-4">
				<p class="text-base text-left flex-1">{project.title}</p>

				<p
					class="px-1.5 py-px border rounded border-{languageColor[
						project.primaryLanguage
					]} bg-surface text-xs text-{languageColor[project.primaryLanguage]}"
				>
					{project.primaryLanguage}
				</p>
				<p
					class="px-1.5 py-px border rounded border-{statusColor[
						project.status
					]} bg-surface text-xs text-{statusColor[project.status]}"
				>
					{project.status}
				</p>
			</div>
			<p class="text-overlay0 text-sm text-left">{project.description}</p>
			<div class="flex items-center gap-2 flex-wrap">
				{#each project.technologies.slice(0, 3) as technology}
					<span class="text-xs text-mauve">@{technology}</span>
				{/each}
			</div>
		</div>
	</div>
	<span class="text-surface2 text-sm">
		{isExpanded ? "[-]" : "[+]"}
	</span>
</button>
{#if isExpanded}
	<ProjectExpanded {project} />
{/if}
