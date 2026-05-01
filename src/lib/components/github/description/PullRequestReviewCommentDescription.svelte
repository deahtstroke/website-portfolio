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
	<span class="text-text">commented on a review for PR</span>
	<span class="text-teal">#{ghEvent.payload.pull_request.number}</span>
	<span class="text-text">in</span>
	{@render repoSnippet(ghEvent.repo.name)}
</p>
