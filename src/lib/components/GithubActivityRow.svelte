<script lang="ts">
	import {
		getEventMetadata,
		type EventMeta,
		type GithubEvent,
	} from "$lib/types/dto/GithubEvent";
	import GithubActivityExpanded from "./GithubActivityExpanded.svelte";

	let { event, index }: { event: GithubEvent; index: number } = $props();

	let isExpanded: boolean = $state(false);

	let Meta: EventMeta = $derived(getEventMetadata(event));
	$effect(() => {
		console.log(`${Meta.description} ${Meta.color}`);
	});

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
	class="w-full gap-x-4 flex items-center cursor-pointer transition-all duration-150 border border-l-2
	{isExpanded
		? 'border-l-highlight bg-surface'
		: 'border-l-transparent hover:border-l-highlight hover:bg-surface'}"
	onclick={() => (isExpanded = !isExpanded)}
>
	<p class="text-xs select-none pl-4">{String(index + 1).padStart(2, " ")}</p>
	<div class="flex flex-1 items-center py-4 pr-3">
		<div class="flex flex-1 flex-col items-start">
			<div class="flex items-center gap-2">
				<div class="flex items-center gap-1">
					<Meta.icon class={Meta.color} size="10" />
					<p class="text-[0.60rem] sm:text-xs {Meta.color}">
						{event.type}
					</p>
				</div>
				<time
					datetime={event.created_at}
					class="text-[0.60rem] text-xs text-secondary ml-auto"
					>{getRelativeTime(event.created_at)}</time
				>
			</div>
			<p class="text-xs sm:text-sm text-left">
				<span class="text-link-hover">Daniel</span>{" "}
				<span class="text-body">{Meta.description}</span>
				<a
					href={`https://www.github.com/${event.repo.name}`}
					rel="noopener norefeerrer"
					target="_blank">{event.repo.name}</a
				>
			</p>
		</div>
		<span class="text-secondary text-xs">
			{isExpanded ? "[-]" : "[+]"}
		</span>
	</div>
</button>
{#if isExpanded}
	<GithubActivityExpanded ghEvent={event} />
{/if}
