<script lang="ts">
	import type { GithubEvent } from "$lib/types/dto/GithubEvent";

	let ghUrl: string = "https://github.com/";
	let { ghEvent }: { ghEvent: GithubEvent } = $props();
</script>

<div class="mb-3">
	<div
		class="px-3 py-1.5 flex items-center gap-2 border-b border-surface bg-background"
	>
		<p class="text-xs text-body/50">details</p>
		<a
			href={ghUrl + ghEvent.repo.name}
			target="_blank"
			rel="noopener noreferrer"
			class="text-xs ml-auto">open ↗</a
		>
	</div>
	<div class="px-3 pt-1.5 text-xs sm:text-sm text-body/50">
		<p class="text-warning pb-1">{ghEvent.type}</p>
		<div class="grid grid-cols-[auto_1fr] gap-x-5">
			<p class="text-body/50">├── id:</p>
			<span class="text-snippet">{ghEvent.id}</span>
			<p class="text-body/50">├── repo:</p>
			<span class="text-link-hover">{ghEvent.repo.name}</span>
			<p class="text-body/50">├── time:</p>
			<span class="text-subheading"
				>{new Date(ghEvent.created_at).toLocaleString()}</span
			>
			<p class="text-body/50">└── HEAD:</p>
			<span class="text-highlight"
				>{String(ghEvent.payload.head).slice(0, 7)}</span
			>
		</div>
	</div>
</div>
