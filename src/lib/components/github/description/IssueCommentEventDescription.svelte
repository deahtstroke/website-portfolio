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
	<span class="text-mauve">Daniel</span>{" "}
	<span class="text-text">commented on issue</span>
	<a
		href={ghEvent.payload.issue.html_url}
		class="text-peach hover:text-yellow"
		rel="noopener norefeerrer"
		target="_blank">#{ghEvent.payload.issue.number}</a
	>
	<span class="text-text">in</span>
	{@render repoSnippet(ghEvent.repo.name)}
</p>
