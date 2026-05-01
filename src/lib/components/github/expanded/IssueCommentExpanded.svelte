<script lang="ts">
	import type { GithubEvent } from "$lib/types/dto/GithubEvent";

	let { ghEvent }: { ghEvent: GithubEvent } = $props();
</script>

<div class="px-3 pt-1.5 text-sm text-body/50">
	<span class="text-warning pb-1">{ghEvent.type}</span>
	<div class="grid grid-cols-[auto_1fr] gap-x-5">
		<span class="text-body/50">├── id:</span>
		<span class="text-snippet">{ghEvent.id}</span>
		<span class="text-body/50">├── repo:</span>
		<span class="text-link-hover">{ghEvent.repo.name}</span>
		<span class="text-body/50">├── time:</span>
		<span class="text-subheading"
			>{new Date(ghEvent.created_at).toLocaleString()}</span
		>
		<span class="text-body/50">├── issue #:</span>
		<a
			class="text-subheading"
			href={ghEvent.payload.issue.html_url}
			rel="noopener noreferrer"
			target="_blank">{ghEvent.payload.issue.number}</a
		>
		<span class="text-body/50">└── comment:</span>
		<span class="text-highlight">{ghEvent.payload.comment.body}</span>
	</div>
</div>
