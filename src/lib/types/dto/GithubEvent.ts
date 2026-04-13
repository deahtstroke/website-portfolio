import { Code2, DeleteIcon, GitForkIcon, GitPullRequest, Heart, MessageSquare, PlusCircle, SquareSlashIcon, Star, type LucideIcon } from "@lucide/svelte";

export type GithubEventType =
	'CommitCommentEvent' |
	'CreateEvent' |
	'DeleteEvent' |
	'DiscussionEvent' |
	'ForkEvent' |
	'GollumEvent' |
	'IssueCommentEvent' |
	'IssuesEvent' |
	'MemberEvent' |
	'PublicEvent' |
	'PullRequestEvent' |
	'PullRequestReviewEvent' |
	'PullRequestReviewCommentEvent' |
	'PushEvent' |
	'ReleaseEvent' |
	'WatchEvent';

export interface GithubEvent {
	id: string;
	type: GithubEventType;
	repo: { name: string, url: string };
	payload: any;
	created_at: string;
}

const eventIcons: Partial<Record<GithubEventType, LucideIcon>> = {
	'PushEvent': Code2,
	'CreateEvent': PlusCircle,
	'DeleteEvent': DeleteIcon,
	'ForkEvent': GitForkIcon,
	'IssuesEvent': GitPullRequest,
	'IssueCommentEvent': GitPullRequest,
	'PullRequestEvent': GitPullRequest,
	'PullRequestReviewEvent': GitPullRequest,
	'PullRequestReviewCommentEvent': MessageSquare,
	'ReleaseEvent': Heart,
	'WatchEvent': Star,
}

export function getEventIcon(event: GithubEventType): LucideIcon {
	return eventIcons[event] === undefined ? SquareSlashIcon : eventIcons[event];
}
