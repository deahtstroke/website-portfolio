<script lang="ts">
	import type { GithubEvent } from "$lib/types/dto/GithubEvent";
	import { onMount } from "svelte";
	import GithubActivityRow from "./GithubActivityRow.svelte";
	import CommandLine from "../CommandLine.svelte";

	const GITHUB_USERNAME = "deahtstroke";
	const FETCH_AMOUNT = 30;
	const DISPLAY_AMOUNT = 5;
	const EVENTS_URL = `https://api.github.com/users/deahtstroke/events?per_page=${FETCH_AMOUNT}&page=0`;

	let events: GithubEvent[] = $state([]);
	let isLoading: boolean = $state(true);

	let { pageNumber = 0 }: { pageNumber?: number; count?: number } = $props();

	onMount(async () => {
		let data: GithubEvent[] = await fetchGithubActivity();
		isLoading = false;

		const nonPushEvents = data.filter((gh) => gh.type !== "PushEvent");
		const pushEvents = data.filter((gh) => gh.type === "PushEvent");

		// group by day and repo
		const grouped = Object.groupBy(pushEvents, (key) => {
			return `${key.created_at.slice(0, 10)}|${key.repo.name}`;
		});

		const mergedPushEvents = Object.entries(grouped).map(([group, items]) => {
			const groupItems = items!;
			const latest = groupItems?.reduce((a, b) =>
				a.created_at > b.created_at ? a : b,
			);

			return {
				id: `push-${group}`,
				type: "PushEvent",
				repo: { name: latest.repo.name, url: latest.repo.url },
				payload: latest.payload,
				created_at: latest.created_at,
				commitCount: groupItems.length,
			};
		});

		events = [...mergedPushEvents, ...nonPushEvents].sort(
			(a, b) =>
				new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
		);
	});

	async function fetchGithubActivity(): Promise<GithubEvent[]> {
		const res = await fetch(EVENTS_URL);

		if (!res.ok) {
			throw new Error(`Github API failed: ${res}`);
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
	<div class="bg-crust border-b border-border flex items-center px-3 text-sm">
		<h3
			class="px-4 py-2 text-text border-b-2 border-mauve bg-surface cursor-default whitespace-nowrap"
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
	<CommandLine
		segments={[
			{ label: "gh", color: "green" },
			{ label: "api", color: "text" },
			{ label: `users/${GITHUB_USERNAME}/events/public`, color: "yellow" },
			{
				label: `--page=${pageNumber} --limit=${DISPLAY_AMOUNT}`,
				color: "overlay1",
			},
		]}
	/>

	<!-- Main content from GH API -->
	{#if isLoading}
		{#each { length: FETCH_AMOUNT } as _, i}
			{@render emptyActivity(i, skeletonWidth(i))}
		{/each}
	{:else}
		{#each events.slice(0, DISPLAY_AMOUNT) as event, i}
			<div class="border-b border-border">
				<GithubActivityRow {event} index={i} />
			</div>
		{/each}
	{/if}

	<!-- Status bar -->
	<div
		class="px-4 py-2 text-sm flex items-center gap-4 bg-crust border-b border-surface0 text-overlay0"
	>
		<span><span class="text-mauve">NORMAL</span></span>
		<span>{events.length} events</span>
		<span class="ml-auto">click the '[+]' to expand</span>
	</div>
</article>
