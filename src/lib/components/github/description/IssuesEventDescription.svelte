<script lang="ts">
	import type { GithubEvent } from "$lib/types/dto/GithubEvent";
	import type { Snippet } from "svelte";

	let {
		ghEvent,
		repoSnippet,
	}: { ghEvent: GithubEvent; repoSnippet: Snippet<[repoName: string]> } =
		$props();
</script>

<p class="text-xs text-left">
	<span class="text-mauve">Daniel</span>
	<span class="text-text">{ghEvent.payload.action} issue</span>
	<span class="text-peach">#{ghEvent.payload.issue.number}</span>
	<span class="text-text">in</span>
	{@render repoSnippet(ghEvent.repo.name)}
</p>
