<script lang="ts">
	let { index, width }: { index: number; width: string } = $props();
</script>

<div class="flex items-center gap-3 px-4 py-3">
	<span class="select-none min-w-10 text-right pr-4 text-border-hover">
		{String(index + 1).padStart(2, " ")}
	</span>
	<div
		class="h-3 rounded animate-pulse bg-surface1"
		style="width: {width}"
	></div>
</div>
