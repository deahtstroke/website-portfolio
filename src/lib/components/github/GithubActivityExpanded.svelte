<script lang="ts">
	import type { GithubEvent } from "$lib/types/dto/GithubEvent";
	import CreateEventExpanded from "./expanded/CreateEventExpanded.svelte";
	import EmptyEventExpanded from "./expanded/EmptyEventExpanded.svelte";
	import IssueCommentExpanded from "./expanded/IssueCommentExpanded.svelte";
	import PushEventExpanded from "./expanded/PushEventExpanded.svelte";

	const GH_URL = "https://www.github.com/";
	let { ghEvent }: { ghEvent: GithubEvent } = $props();
</script>

<div class="mb-3">
	<div
		class="px-3 py-1.5 flex items-center gap-2 border-b border-border bg-crust"
	>
		<p class="text-xs text-body/50">details</p>
		<a
			href={GH_URL + ghEvent.repo.name}
			target="_blank"
			rel="noopener noreferrer"
			class="text-xs ml-auto hover:underline">open ↗</a
		>
	</div>

	{#if ghEvent.type == "PushEvent"}
		<PushEventExpanded {ghEvent} />
	{:else if ghEvent.type == "IssueCommentEvent"}
		<IssueCommentExpanded {ghEvent} />
	{:else if ghEvent.type === "CreateEvent"}
		<CreateEventExpanded {ghEvent} />
	{:else}
		<EmptyEventExpanded />
	{/if}
</div>
