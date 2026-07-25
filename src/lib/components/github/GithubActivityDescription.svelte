<script lang="ts">
	import type {
		GithubEvent,
		GithubEventType,
	} from "$lib/types/dto/GithubEvent";
	import type { Component, Snippet } from "svelte";

	import IssueCommentDescription from "./description/IssueCommentEventDescription.svelte";
	import PullRequestEventDescription from "./description/PullRequestEventDescription.svelte";
	import PushEventDescription from "./description/PushEventDescription.svelte";
	import WatchEventDescription from "./description/WatchEventDescription.svelte";
	import CreateEventDescription from "./description/CreateEventDescription.svelte";
	import DeleteEventDescription from "./description/DeleteEventDescription.svelte";
	import PullRequestReviewCommentDescription from "./description/PullRequestReviewCommentDescription.svelte";

	let { ghEvent }: { ghEvent: GithubEvent } = $props();

	type DescriptionComponent = Component<{
		ghEvent: GithubEvent;
		repoSnippet: Snippet<[repoName: string]>;
	}>;

	const descriptions: Partial<Record<GithubEventType, DescriptionComponent>> = {
		PushEvent: PushEventDescription,
		CreateEvent: CreateEventDescription,
		PullRequestEvent: PullRequestEventDescription,
		PullRequestReviewCommentEvent: PullRequestReviewCommentDescription,
		WatchEvent: WatchEventDescription,
		IssueCommentEvent: IssueCommentDescription,
		DeleteEvent: DeleteEventDescription,
	};

	// Description component to render if key exists in `descriptions` for
	// passed ghEvent prop
	const Description: DescriptionComponent | undefined = $derived(
		descriptions[ghEvent.type],
	);
</script>

<!-- Reuses some markup for the repository link -->
{#snippet repoSnippet(repoName: string)}
	<a
		class="text-subtext hover:text-subtext1"
		href={`https://www.github.com/${repoName}`}
		rel="noopener norefeerrer"
		target="_blank">{repoName}↗</a
	>
{/snippet}

{#if Description}
	<Description {ghEvent} {repoSnippet} />
{/if}
