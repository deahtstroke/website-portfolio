<script lang="ts">
	import type { GithubEvent } from "$lib/types/dto/GithubEvent";
	import type { Snippet } from "svelte";

	let {
		ghEvent,
		repoSnippet,
	}: { ghEvent: GithubEvent; repoSnippet: Snippet<[repoName: string]> } =
		$props();
</script>

<p class="text-xs sm:text-sm text-left">
	<span class="text-mauve">Daniel</span>{" "}
	<span class="text-text">pushed commit</span>
	<span class="text-peach">{ghEvent.payload.head.slice(0, 10)}</span>
	<span class="text-text">to</span>
	{@render repoSnippet(ghEvent.repo.name)}
</p>
