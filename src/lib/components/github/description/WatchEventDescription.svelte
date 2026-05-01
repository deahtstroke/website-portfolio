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
	<span class="text-text">starred</span>
	{@render repoSnippet(ghEvent.repo.name)}
</p>
