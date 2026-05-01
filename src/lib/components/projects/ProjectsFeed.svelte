<script lang="ts">
	import type { Project } from "$lib/types/Project";
	import CommandLine from "../CommandLine.svelte";
	import ProjectRow from "./ProjectRow.svelte";

	let { projects }: { projects: Project[] } = $props();
</script>

<article class="border border-surface1 bg-mantle">
	<!-- Tab bar -->
	<div class="bg-crust border-b border-surface0 flex items-center px-3 text-sm">
		<h3
			class="px-4 py-2 text-text border-b-2 border-mauve bg-surface cursor-default whitespace-nowrap"
		>
			projects.toml
		</h3>
		<h3
			class="px-4 py-2 text-overlay1 border-b-2 border-transparent cursor-default whitespace-nowrap"
		>
			backend
		</h3>
	</div>

	<!-- Command line -->
	<CommandLine
		segments={[
			{ label: "ls", color: "green" },
			{ label: "~/projects", color: "yellow" },
			{ label: "--sort=status --count=4", color: "overlay1" },
		]}
	/>

	<!-- Content -->
	{#each projects as project, i}
		<div class="border-b border-border">
			<ProjectRow {project} index={i} />
		</div>
	{/each}

	<a
		href="/projects"
		class="w-full text-left px-4 py-3 border-surface0
             text-overlay1 flex items-center transition-colors duration-150
             hover:bg-surface0 hover:text-mauve"
	>
		<span class="ml-3 text-sm"> [→] Click here to view all projects </span>
	</a>

	<div
		class="px-4 py-2 text-sm flex items-center gap-4 bg-crust border-t border-surface0 text-overlay0"
	>
		<span><span class="text-mauve">NORMAL</span></span>
		<span>{projects.length} projects</span>
		<span class="ml-auto">click the '[+]' to expand</span>
	</div>
</article>
