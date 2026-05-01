<script lang="ts">
	interface CmdSegment {
		label: string;
		color: string;
	}
	let { segments }: { segments: CmdSegment[] } = $props();
</script>

<p
	class="flex gap-2 flex-wrap px-4 py-2 text-sm border-b border-border bg-surface"
>
	<span class="text-pink">$</span>
	{#each segments as segment}
		<span class="text-{segment.color}">{segment.label}</span>
	{/each}
</p>
