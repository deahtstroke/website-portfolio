<script lang="ts">
	import type { Project } from "$lib/types/Project";
	import ProjectRow from "./ProjectRow.svelte";

	let { projects }: { projects: Project[] } = $props();
</script>

<article class="border border-surface1 bg-mantle">
	<!-- Tab bar -->
	<div class="bg-crust border-b border-surface0 flex items-center px-3 text-xs">
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
	<p
		class="px-4 py-2 text-xs border-b border-border bg-surface overflow-hidden"
	>
		<span class="text-overlay0">$</span>
		<span class="text-green">ls</span>
		<span class="text-yellow">~/projects</span>
		<span class="text-text/25">--sort=status</span>
	</p>

	<!-- Content -->
	{#each projects as project, i}
		<div class="border-b border-border">
			<ProjectRow {project} index={i} />
		</div>
	{/each}
</article>
