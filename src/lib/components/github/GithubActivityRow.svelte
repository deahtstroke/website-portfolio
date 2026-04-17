<script lang="ts">
	import { getEventIcon, type GithubEvent } from "$lib/types/dto/GithubEvent";
	import GithubActivityExpanded from "./GithubActivityExpanded.svelte";
	import GithubActivityDescription from "./GithubActivityDescription.svelte";
	import type { LucideIcon } from "@lucide/svelte";

	let { event, index }: { event: GithubEvent; index: number } = $props();

	let isExpanded: boolean = $state(false);

	const Icon: LucideIcon = $derived(getEventIcon(event.type));

	function getRelativeTime(time: string): string {
		const now: Date = new Date();
		const date: Date = new Date(time);
		const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

		const intervals = [
			{ label: "y", seconds: 31536000 },
			{ label: "mo", seconds: 2592000 },
			{ label: "w", seconds: 604800 },
			{ label: "d", seconds: 86400 },
			{ label: "h", seconds: 3600 },
			{ label: "m", seconds: 60 },
			{ label: "s", seconds: 1 },
		] as const;

		for (const interval of intervals) {
			const count = Math.floor(seconds / interval.seconds);
			if (count >= 1) {
				return `${count}${interval.label} ago`;
			}
		}
		return "just now";
	}
</script>

<button
	class="w-full grid grid-cols-[2rem_1fr_2rem] gap-x-4 px-3 items-center cursor-pointer transition-all duration-150 border border-l-2
	{isExpanded
		? 'border-l-highlight bg-surface'
		: 'border-l-transparent hover:border-l-highlight hover:bg-surface'}"
	onclick={() => (isExpanded = !isExpanded)}
>
	<p class="text-xs text-surface2 select-none">{index + 1}</p>
	<div class="flex flex-1 items-center py-3">
		<div class="flex flex-1 flex-col items-start">
			<div class="flex items-center gap-2">
				<Icon class="text-teal" size="12" />
				<p class="text-[0.60rem] sm:text-xs text-teal">
					{event.type}
				</p>
				<time
					datetime={event.created_at}
					class="text-[0.60rem] sm:text-xs text-secondary ml-auto"
					>{getRelativeTime(event.created_at)}</time
				>
			</div>
			<GithubActivityDescription ghEvent={event} />
		</div>
	</div>

	<span class="text-surface2 text-xs">
		{isExpanded ? "[-]" : "[+]"}
	</span>
</button>
{#if isExpanded}
	<GithubActivityExpanded ghEvent={event} />
{/if}
