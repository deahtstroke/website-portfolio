<script lang="ts">
	import type { Post } from "$lib/types/Post";
	import { trimDescription } from "$lib/utils/StringUtils";
	import { formatDate } from "$lib/utils/DateUtils";

	let { post }: { post: Post } = $props();
</script>

<article class="flex flex-col gap-2">
	<h3>{post.title}</h3>
	<h4 class="text-xs text-warning">Published {formatDate(post.date)}</h4>
	<p>{trimDescription(post.description)}</p>
	<a class="text-snippet" href="/blog/{post.slug}">Read more -></a>
</article>
