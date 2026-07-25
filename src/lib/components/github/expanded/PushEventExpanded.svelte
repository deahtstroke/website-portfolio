<script lang="ts">
	import type { GithubEvent } from "$lib/types/dto/GithubEvent";

	let { ghEvent }: { ghEvent: GithubEvent } = $props();
</script>

<div class="px-15 pt-1.5 text-xs bg-mantle">
	<div class="grid grid-cols-[auto_1fr] gap-x-5 gap-y-2">
		<span class="text-warning col-span-2">{ghEvent.type}</span>
		<span class="text-body/50">repo:</span>
		<span class="text-link-hover">{ghEvent.repo.name}</span>
		<span class="text-body/50">time:</span>
		<span class="text-subheading"
			>{new Date(ghEvent.created_at).toLocaleString()}</span
		>
		<span class="text-body/50">refs:</span>
		<span class="truncate text-highlight">{String(ghEvent.payload.ref)}</span>
		<span class="text-body/50">HEAD:</span>
		<span class="truncate text-highlight">{String(ghEvent.payload.head)}</span>
		<span class="text-body/50">previous:</span>
		<span class="truncate text-highlight">{String(ghEvent.payload.before)}</span
		>
	</div>
</div>
