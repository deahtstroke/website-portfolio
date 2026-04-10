<script lang="ts">
	import { formatDate } from "$lib/utils/DateUtils";
	import type { Post } from "$lib/types/Post";
	import { trimDescription } from "$lib/utils/StringUtils";

	let { post } = $props<{
		post: Post;
	}>();
</script>

<article class="flex flex-col sm:flex-row gap-6 sm:items-center">
	<!-- Thumbnail -->
	<a href="/blog/{post.slug}" class="sm:w-48 sm:h-36 shrink-0">
		<div
			class="w-full h-36 text-white rounded-lg overflow-hidden bg-linear-to-br
				from-primary/20 to-accent/20 flex items-center justify-center
				border border-border transition-colors font-mono text-bright"
			style="background: linear-gradient(135deg, hsl({post.colorStart}), hsl({post.colorEnd}))"
		>
			{post.thumbnailText}
		</div>
	</a>
	<div class="flex-1 flex flex-col gap-2">
		<h2 class="text-2xl font-semibold text-bright">{post.title}</h2>
		<h3 class="text-sm text-default/60">
			Published {formatDate(post.date)}
		</h3>
		<p class="text-default">{trimDescription(post.description)}</p>
		<a href="/blog/{post.slug}" class="text-sm inline-flex items-center gap-2">
			Read more <span>→</span>
		</a>
	</div>
</article>
