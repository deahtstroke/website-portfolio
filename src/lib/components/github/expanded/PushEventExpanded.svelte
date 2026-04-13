<script lang="ts">
	import type { GithubEvent } from "$lib/types/dto/GithubEvent";

	let { ghEvent }: { ghEvent: GithubEvent } = $props();
</script>

<div class="px-10 pt-1.5 text-xs sm:text-sm text-body/50">
	<span class="text-warning pb-1">{ghEvent.type}</span>
	<div class="grid grid-cols-[auto_1fr] gap-x-5">
		<span class="text-body/50">├── id:</span>
		<span class="text-snippet">{ghEvent.id}</span>
		<span class="text-body/50">├── repo:</span>
		<span class="text-link-hover">{ghEvent.repo.name}</span>
		<span class="text-body/50">├── time:</span>
		<span class="text-subheading"
			>{new Date(ghEvent.created_at).toLocaleString()}</span
		>
		<span class="text-body/50">├── HEAD:</span>
		<span class="truncate text-highlight">{String(ghEvent.payload.head)}</span>
		<span class="text-body/50">└── previous:</span>
		<span class="truncate text-highlight">{String(ghEvent.payload.before)}</span
		>
	</div>
</div>
