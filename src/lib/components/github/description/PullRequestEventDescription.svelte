<script lang="ts">
	import type { GithubEvent } from "$lib/types/dto/GithubEvent";
	import type { Snippet } from "svelte";
	const prColor = (): string => {
		switch (ghEvent.payload.action) {
			case "opened":
				return "text-green";
			case "closed":
				return "text-red";
			case "merged":
				return "text-mauve";
			case "reopened":
				return "text-yellow";
			case "assigned":
				return "text-blue";
			case "unassigned":
				return "text-subtext0";
			case "labeled":
				return "text-lavender";
			case "unlabeled":
				return "text-subtext1";
			default:
				return "text-body";
		}
	};
	let {
		ghEvent,
		repoSnippet,
	}: { ghEvent: GithubEvent; repoSnippet: Snippet<[repoName: string]> } =
		$props();
</script>

<p class="text-xs text-left">
	<span class="text-mauve">Daniel</span>{" "}
	<span class="text-text">{ghEvent.payload.action} PR</span>
	<a
		class="text-peach"
		href={`${ghEvent.payload.pull_request.html_url}`}
		rel="noopener norefeerrer"
		target="_blank">#{ghEvent.payload.pull_request.number}</a
	>
	{#if ghEvent.payload.action === "assigned"}
		<span class="text-text">to</span>
		{#each ghEvent.payload.assignees as assignee, i}
			<a
				href={assignee.html_url}
				rel="noopener noreferrer"
				target="_blank"
				class="text-teal"
				>{assignee.login === "deahtstroke" ? "himself" : assignee.login}</a
			>
			{#if i < ghEvent.payload.assignees.length - 1}
				,&nbsp;
			{/if}
		{/each}
	{/if}
	<span class="text-text">in</span>
	{@render repoSnippet(ghEvent.repo.name)}
</p>
