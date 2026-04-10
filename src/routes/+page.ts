import type { PageLoad } from "./$types";
import getPosts from "$lib/posts/posts";

// Get the top 3 most recent posts
export const load: PageLoad = async () => {
	const posts = getPosts().splice(0, 3);
	return { posts: posts }
}
