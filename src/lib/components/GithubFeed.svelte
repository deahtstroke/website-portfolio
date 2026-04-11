<script lang="ts">
	import type { GithubEvent } from "$lib/types/dto/GithubEvent";
	import { onMount } from "svelte";
	import GithubActivityEmpty from "./GithubActivityEmpty.svelte";
	import GithubActivityRow from "./GithubActivityRow.svelte";

	const GITHUB_USERNAME = "deahtstroke";
	const INITIAL_AMOUNT = 10;

	let events: GithubEvent[] = $state([]);
	let isLoading: boolean = $state(true);

	onMount(async () => {
		let data: GithubEvent[] = await getGithubActivity();
		isLoading = false;
		events = data.map((item) => ({
			id: item.id,
			type: item.type,
			repo: {
				name: item.repo.name,
			},
			payload: item.payload,
			created_at: item.created_at,
		}));
	});

	async function getGithubActivity(): Promise<GithubEvent[]> {
		const res = await fetch(
			"https://api.github.com/users/deahtstroke/events?per_page=15&page=2",
		);

		if (!res.ok) {
			throw new Error("Github API failed");
		}
		return res.json();
	}

	function skeletonWidth(i: number): string {
		return `${40 + ((i * 17 + 31) % 40)}%`;
	}
</script>

<article class="border border-surface1 bg-mantle">
	<!-- Tab bar -->
	<div
		class="bg-background border-b border-border flex items-center px-3 text-xs"
	>
		<h3
			class="px-4 py-2 text-ctp-text border-b-2 border-highlight bg-surface cursor-default whitespace-nowrap"
		>
			activity.log
		</h3>
		<h3
			class="px-4 py-2 text--overlay1 border-b-2 border-transparent cursor-default whitespace-nowrap"
		>
			{GITHUB_USERNAME}
		</h3>
	</div>

	<!-- Command line -->
	<div
		class="px-4 py-2 text-xs flex flex-wrap items-center gap-2 border-b border-border bg-surface"
	>
		<p class="text-body/25">$</p>
		<p class="text-success">gh</p>
		<p>api</p>
		<p class="text-warning">users/{GITHUB_USERNAME}/events/public</p>
		<p class="inline-block text-body/25">--page 1 --limit 10</p>
	</div>
	{#if isLoading}
		{#each { length: INITIAL_AMOUNT } as _, i}
			<GithubActivityEmpty index={i} width={skeletonWidth(i)} />
		{/each}
	{:else}
		{#each events as event, i}
			<div class="border-b border-border">
				<GithubActivityRow {event} index={i} />
			</div>
		{/each}
	{/if}
</article>
