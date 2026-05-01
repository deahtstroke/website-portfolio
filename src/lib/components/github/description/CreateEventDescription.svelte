<script lang="ts">
	import type { GithubEvent } from "$lib/types/dto/GithubEvent";
	import type { Snippet } from "svelte";

	let {
		ghEvent,
		repoSnippet,
	}: { ghEvent: GithubEvent; repoSnippet: Snippet<[repoName: string]> } =
		$props();
</script>

<p class="text-sm text-left">
	<span class="text-mauve">Daniel</span>
	{#if ghEvent.payload.ref_type === "repository"}
		<span class="text-text">created repository</span>
		{@render repoSnippet(ghEvent.repo.name)}
	{:else}
		<span class="text-text">created {ghEvent.payload.ref_type}</span>
		<span class="text-green">{ghEvent.payload.ref}</span>
		<span class="text-text">in</span>
		{@render repoSnippet(ghEvent.repo.name)}
	{/if}
</p>
