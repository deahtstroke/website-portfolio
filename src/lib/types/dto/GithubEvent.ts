import { GitBranchMinusIcon, GitBranchPlusIcon, GitCommitHorizontalIcon, GitForkIcon, GitPullRequest, Package, SquareSlash, Tag, type LucideIcon } from "@lucide/svelte";

type GithubEventType =
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

export interface EventMeta {
	icon: LucideIcon;
	description: string;
	color: string;
}

export function getEventMetadata(event: GithubEvent): EventMeta {
	switch (event.type) {
		case 'PushEvent':
			return {
				icon: GitCommitHorizontalIcon,
				description: `Pushed commit ${event.payload.head.slice(0, 10)} to ${event.repo.name}`,
				color: 'text-success'
			};
		case 'CreateEvent':
			if (event.payload.ref_type == 'branch') {
				return {
					icon: GitBranchPlusIcon,
					description: `Created a branch named ${event.payload.ref} in repository ${event.repo.name}`,
					color: 'text-success'
				};
			} else if (event.payload.ref_type == 'tag') {
				return {
					icon: Tag,
					description: `Created tag ${event.payload.ref} in repository ${event.repo.name}`,
					color: 'text-section'
				};
			} else {
				return {
					icon: Package,
					description: `Created a repository named ${event.payload.ref}`,
					color: 'text-section'
				};
			}
		case 'DeleteEvent':
			if (event.payload.ref_type == 'branch') {
				return {
					icon: GitBranchMinusIcon,
					description: `Deleted branch ${event.payload.ref}`,
					color: 'text-error',
				};
			} else {
				return {
					icon: Tag,
					description: `Deleted tag ${event.payload.ref}`,
					color: 'text-warning'
				}
			};
		case 'ForkEvent':
			return {
				icon: GitForkIcon,
				description: `Forked ${event.payload.forkee}`,
				color: 'text-snippet'
			};
		case 'IssueCommentEvent':
			return {
				icon: GitPullRequest,
				description: `Commented on issue #${event.payload.issue.number} in ${event.repo.name}`,
				color: 'text-title',
			};
		case "PullRequestReviewCommentEvent":
			return {
				icon: GitPullRequest,
				description: `Commented on a code review on PR #${event.payload.pull_request.number} in ${event.repo.name}`,
				color: 'text-title',
			}
		default:
			return {
				icon: SquareSlash, description: "Unknown action but! He did something today :)",
				color: 'text-body'
			}
	}
}
