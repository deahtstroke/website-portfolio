<script lang="ts">
	import type { GithubEvent } from "$lib/types/dto/GithubEvent";
	import PushEventExpanded from "./expanded/PushEventExpanded.svelte";

	let { ghEvent }: { ghEvent: GithubEvent } = $props();
</script>

{#if ghEvent.type == "PushEvent"}
	<PushEventExpanded {ghEvent} />
{/if}
