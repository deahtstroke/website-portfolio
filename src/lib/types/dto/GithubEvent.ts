import { GitBranchMinusIcon, GitBranchPlusIcon, GitCommitHorizontalIcon, GitForkIcon, GitPullRequest, Glasses, Package, SquareSlash, Tag, type LucideIcon } from "@lucide/svelte";

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
	console.log(event);
	switch (event.type) {
		case 'PushEvent':
			return {
				icon: GitCommitHorizontalIcon,
				description: `pushed commit ${event.payload.head.slice(0, 10)} to`,
				color: 'text-success',
			};
		case 'CreateEvent':
			if (event.payload.ref_type == 'branch') {
				return {
					icon: GitBranchPlusIcon,
					description: `created branch ${event.payload.ref} in`,
					color: 'text-success'
				};
			} else if (event.payload.ref_type == 'tag') {
				return {
					icon: Tag,
					description: `created tag ${event.payload.ref} in`,
					color: 'text-section'
				};
			} else {
				return {
					icon: Package,
					description: `created a repository named `,
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
				description: `commented on issue #${event.payload.issue.number} in`,
				color: 'text-title',
			};
		case "PullRequestReviewCommentEvent":
			return {
				icon: GitPullRequest,
				description: `Commented on a code review on PR #${event.payload.pull_request.number} in`,
				color: 'text-title',
			}
		case "PullRequestEvent":
			const prColor = (): string => {
				switch (event.payload.action) {
					case 'opened':
						return 'text-green';
					case 'closed':
						return 'text-red';
					case 'merged':
						return 'text-mauve';
					case 'reopened':
						return 'text-yellow';
					case 'assigned':
						return 'text-blue';
					case 'unassigned':
						return 'text-subtext0';
					case 'labeled':
						return 'text-lavender';
					case 'unlabeled':
						return 'text-subtext1';
					default:
						return 'text-body';
				}
			}
			return {
				icon: GitPullRequest,
				description: `${event.payload.action} PR #${event.payload.pull_request.number} in`,
				color: prColor()
			}
		case "WatchEvent": {
			return {
				icon: Glasses,
				description: `started watching`,
				color: `text-title`
			}
		}
	}
}
