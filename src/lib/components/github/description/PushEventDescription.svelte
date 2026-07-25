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
	<span class="text-mauve">Daniel</span>{" "}
	<span class="text-text">pushed</span>
	<span class="text-red"
		>{ghEvent.commitCount}
		{#if ghEvent.commitCount! > 1}
			<span>commits</span>
		{:else}
			<span>commit</span>
		{/if}
	</span>
	<span class="text-text">to</span>
	{@render repoSnippet(ghEvent.repo.name)}
</p>
