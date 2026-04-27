import { getMostRecentProjects } from "$lib/data/projects";

export interface Project {
	title: string;
	repoName?: string;
	repoOwner?: string;
	description: string;
	image?: string;
	technologies: string[];
	githubUrl: string;
	status: ProjectStatus;
	createdAt?: Date;
	lastUpdatedAt?: Date;
	websiteUrl?: string;
	areas?: string[];
	primaryLanguage: PrimaryLanguage;
	projectType: ProjectType;
	pinned: boolean;
}

export type ProjectStatus = 'active' | 'maintained' | 'wip' | 'archived';

export type PrimaryLanguage = "Go" | "Typescript" | "Lua" | "Java";

export type ProjectType = 'contribution' | 'project';

export interface RepoMetadata {
	repos: RepoDetails[];
}

export interface RepoDetails {
	name: string;
	owner: string;
}

export interface RepoMetadataResponse {
	repoDetails: Record<string, RepoMetadataDetail>;
}

export interface RepoMetadataDetail {
	createdAt: string;
	updatedAt: string;
}

export const StatusToColors: Record<ProjectStatus, string> = {
	'active': 'green',
	'maintained': 'blue',
	'wip': 'yellow',
	'archived': 'overlay2'
}

export const LanguagesToColors: Record<PrimaryLanguage, string> = {
	'Go': 'sky',
	'Typescript': 'blue',
	'Java': 'peach',
	'Lua': 'sapphire'
}
