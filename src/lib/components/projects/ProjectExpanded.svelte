<script lang="ts">
	import type { Project } from "$lib/types/Project";

	let { project }: { project: Project } = $props();

	function formatTitle(projectTitle: string): string {
		return projectTitle.toLowerCase().replaceAll(" ", "-").replace("_", "-");
	}
</script>

<div class="bg-crust">
	<div class="px-4 py-1.5 flex items-center gap-2bg-crust">
		<span class="text-xs text-overlay1">{formatTitle(project.title)}.toml</span>
		<a
			href={project.githubUrl}
			rel="noopener noreferrer"
			target="_blank"
			class="text-xs ml-auto hover:underline text-sapphire">Github ↗</a
		>
	</div>
</div>
