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
	<span class="text-text">reviewd PR</span>
	<a
		href={ghEvent.payload.pull_request.html_url}
		class="text-sapphire hover:text-sky"
		rel="noopener norefeerrer"
		target="_blank">#{ghEvent.payload.pull_request.number}</a
	>
	<span class="text-text">in</span>
	{@render repoSnippet(ghEvent.repo.name)}
</p>
