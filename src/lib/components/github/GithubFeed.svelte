<script lang="ts">
	import type { GithubEvent } from "$lib/types/dto/GithubEvent";
	import { onMount } from "svelte";
	import GithubActivityRow from "./GithubActivityRow.svelte";
	import CommandLine from "../CommandLine.svelte";

	const GITHUB_USERNAME = "deahtstroke";
	const INITIAL_AMOUNT = 5;

	let events: GithubEvent[] = $state([]);
	let isLoading: boolean = $state(true);

	let { pageNumber = 0, count = 5 }: { pageNumber?: number; count?: number } =
		$props();

	onMount(async () => {
		let data: GithubEvent[] = await getGithubActivity();
		isLoading = false;
		events = data.map((item) => ({
			id: item.id,
			type: item.type,
			repo: {
				name: item.repo.name,
				url: item.repo.url,
			},
			payload: item.payload,
			created_at: item.created_at,
		}));
	});

	async function getGithubActivity(): Promise<GithubEvent[]> {
		const res = await fetch(
			`https://api.github.com/users/deahtstroke/events?per_page=${INITIAL_AMOUNT}&page=0`,
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
			{ label: `--page=${pageNumber} --limit=${count}`, color: "overlay1" },
		]}
	/>

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
		class="px-4 py-2 text-sm flex items-center gap-4 bg-crust border-b border-surface0 text-overlay0"
	>
		<span><span class="text-mauve">NORMAL</span></span>
		<span>{events.length} events</span>
		<span class="ml-auto">click the '[+]' to expand</span>
	</div>
</article>
