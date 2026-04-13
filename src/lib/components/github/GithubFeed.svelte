<script lang="ts">
	import type { GithubEvent } from "$lib/types/dto/GithubEvent";
	import { onMount } from "svelte";
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
			"https://api.github.com/users/deahtstroke/events?per_page=10&page=0",
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

{#snippet emptyActivity(index: number, width: string)}
	<div class="flex items-center gap-3 px-4 py-3">
		<span class="select-none min-w-10 text-right pr-4 text-border-hover">
			{String(index + 1).padStart(2, " ")}
		</span>
		<div
			class="h-3 rounded animate-pulse bg-surface1"
			style="width: {width}"
		></div>
	</div>
{/snippet}

<article class="border border-surface1 bg-mantle">
	<!-- Tab bar -->
	<div
		class="bg-background border-b border-border flex items-center px-3 text-xs"
	>
		<h3
			class="px-4 py-2 text-text border-b-2 border-highlight bg-surface cursor-default whitespace-nowrap"
		>
			activity.log
		</h3>
		<h3
			class="px-4 py-2 text-overlay1 border-b-2 border-transparent cursor-default whitespace-nowrap"
		>
			{GITHUB_USERNAME}
		</h3>
	</div>

	<!-- Command line -->
	<p class="px-4 py-2 text-xs border-b border-border bg-surface">
		<span class="text-body/25">$</span>
		<span class="text-success">gh</span>
		<span>api</span>
		<span class="text-warning">users/{GITHUB_USERNAME}/events/public</span>
		<span class="inline-block text-body/25">--page 0 --limit 10</span>
	</p>

	<!-- Main content from GH API -->
	{#if isLoading}
		{#each { length: INITIAL_AMOUNT } as _, i}
			{@render emptyActivity(i, skeletonWidth(i))}
		{/each}
	{:else}
		{#each events as event, i}
			<div class="border-b border-border">
				<GithubActivityRow {event} index={i} />
			</div>
		{/each}
	{/if}

	<!-- Status bar -->
	<div
		class="px-4 py-2 text-xs flex items-center gap-4 bg-ctp-crust border-t border-ctp-surface0 text-overlay0"
	>
		<span><span class="text-mauve">NORMAL</span></span>
		<span>10 events loaded</span>
		<span class="ml-auto">click the '[+]' to expand ;)</span>
	</div>
</article>
