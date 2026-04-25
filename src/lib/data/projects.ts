import type { Project, RepoMetadata, RepoMetadataResponse, } from "$lib/types/Project";

export const projectData: Project[] = [
	{
		title: "Go Schema Migration Tool",
		repoName: "gsmt",
		repoOwner: "deahtstroke",
		description:
			"Lightweight embedded-schema and data migration library for Go. It helps you apply, track and validate schema and data changes in your database at runtime.",
		technologies: ["Go", "PostgreSQL", "RDBMS"],
		githubUrl: "http://www.github.com/deahtstroke/gsmt",
		status: "maintained",
		primaryLanguage: "Go",
		projectType: 'project',
		pinned: false,
	},
	{
		title: "Verity Inside Helper",
		repoName: "verity-inside-helper",
		repoOwner: "deahtstroke",
		description:
			"Interactive website to provide instructional assitance to Destiny 2 players with the inside portion of the Verity encounter in Salvation's Edge. " +
			"",
		technologies: ["Typescript", "Svelte", "html", "css", "vercel"],
		githubUrl: "https://www.github.com/deahtstroke/verity-inside-helper",
		websiteUrl: "https://verity-inside-helper.vercel.app/",
		status: "active",
		primaryLanguage: "Typescript",
		projectType: 'project',
		pinned: false,
	},
	{
		title: "Protheon ETL",
		repoName: "protheon",
		repoOwner: "deahtstroke",
		description:
			"CLI-based ETL application that focuses on ease of use through the terminal",
		technologies: ["Go", "Toml", "Lua", "SQL"],
		githubUrl: "http://www.github.com/deahtstroke/Protheon",
		status: "wip",
		primaryLanguage: "Go",
		projectType: 'project',
		pinned: true,
	},
	{
		title: "Dap-Profiler.nvim",
		repoName: "dap-profiler.nvim",
		repoOwner: "deahtstroke",
		description:
			"Lightweight Neovim plugin that enhances the nvim-dap experience by allowing developers to create, organize and switch between debugging profiles effortlessly.",
		technologies: ["Lua", "Neovim"],
		githubUrl: "http://www.github.com/deahtstroke/dap-profiler.nvim",
		status: "wip",
		projectType: 'project',
		primaryLanguage: "Lua",
		pinned: true,
	},
	{
		title: "RivenBot Legacy",
		repoName: "rivenbot-legacy",
		repoOwner: "Riven-of-a-Thousand-Servers",
		description: "Legacy monolithic version of Riven Bot Discord Bot using Java, Spring Webflux and MongoDB.",
		technologies: ["Java", "spring boot", "Mongodb", "Redis", "Gradle", "Docker", "Github Actions", "JUnit5", "Mockito"],
		githubUrl: "https://github.com/Riven-of-a-Thousand-Servers/rivenbot-legacy",
		status: "archived",
		primaryLanguage: "Java",
		projectType: 'project',
		pinned: false,
	},
	{
		title: "Duck Assert",
		repoName: "duck-assert",
		repoOwner: "deahtstroke",
		description: "Small experimental mocking library to study Testify's mocking capabilities in Go.",
		technologies: ["Go", "Testing"],
		githubUrl: "https://github.com/deahtstroke/duck-assert",
		status: "maintained",
		projectType: 'project',
		primaryLanguage: "Go",
		pinned: false,
	},
	{
		title: "PGCR Batch Processor",
		repoName: "pgcr-batch-processor",
		repoOwner: "deahtstroke",
		description: "Backend application that efficiently processes Post Game Carnage Reports using Spring Batch's processing architecture and parallelism.",
		technologies: ["Java", "Spring Boot", "PostgreSQL", "Grafana", "Loki", "Redis", "Docker", "Prometheus"],
		githubUrl: "https://github.com/deahtstroke/pgcr-batch-processor",
		status: "archived",
		primaryLanguage: "Java",
		projectType: 'project',
		pinned: false,
	},
	{
		title: "Chameleon Business Studio",
		repoName: "ChameleonBusinessStudio",
		repoOwner: "Grovy",
		description: "Scheduling web-application using Vendia's GraphQL event-based technology.",
		technologies: ["Java", "Typescript", "Spring Boot", "Angular", "Groovy", "Azure", "Spring Security", "Test Containers", "Wiremock"],
		githubUrl: "https://github.com/deahtstroke/chameleon-business-studio",
		status: "archived",
		primaryLanguage: "Java",
		projectType: 'project',
		pinned: false,
	},
	{
		title: "RivenBot Proxy Service",
		repoName: "proxy-service",
		repoOwner: "Riven-of-a-Thousand-Servers",
		description: "Microservice-based Discord bot that fetches analytics and statistics for Destiny 2 players through Discord",
		technologies: ["Go", "PostgreSQL", "RabbitMQ", "Discord", "Digital Ocean"],
		githubUrl: "https://github.com/Riven-of-a-Thousand-Servers/proxy-service",
		status: "active",
		projectType: 'project',
		primaryLanguage: "Go",
		pinned: false,
	},
	{
		title: "RivenBot API Service",
		repoName: "rivenbot-api-service",
		repoOwner: "Riven-of-a-Thousand-Servers",
		description: "RivenBot API service in charge of serving HTTP endpoints for the rest of the application to consume database operations.",
		technologies: ["Go", "PostgreSQL", "Discord", "Redis"],
		githubUrl: "https://github.com/Riven-of-a-Thousand-Servers/rivenbot-api-service",
		projectType: 'project',
		status: "active",
		primaryLanguage: "Go",
		pinned: true,
	},
	{
		title: "RivenBot Crawler Serivce",
		repoName: "pgcr-crawler-service",
		repoOwner: "Riven-of-a-Thousand-Servers",
		description: "RivenBot crawler that linearly crawls Bungie's web API for Post Game Carnage Reports (PGCRs).",
		technologies: ["Go", "PostgreSQL", "IPv6", "Docker"],
		githubUrl: "https://github.com/Riven-of-a-Thousand-Servers/rivenbot-api-service",
		status: "active",
		projectType: 'project',
		primaryLanguage: "Go",
		pinned: false,
	},
	{
		title: "Moby Contributions",
		repoOwner: "moby",
		repoName: "moby",
		description: "Upstream contributions to the Moby container engine that powers Docker.",
		technologies: ["Go", "Docker", "Linux", "Containers"],
		githubUrl: "https://github.com/deahtstroke/moby",
		status: "active",
		areas: ["Integration testing", "Network and device statistics", "Testing suite migration"],
		primaryLanguage: "Go",
		projectType: 'contribution',
		pinned: true,
	}
];

export async function getRepoMetadata(projects: Project[]): Promise<Project[]> {
	const request: RepoMetadata = {
		repos: projects.map(p => ({
			name: p.repoName!,
			owner: p.repoOwner!
		}))
	}

	const url: string = import.meta.env.DEV ? "http://localhost:3000/repos" : "https://api.danielvm.dev/repos";

	try {
		const response = await fetch(url, {
			method: "POST",
			body: JSON.stringify(request),
			headers: {
				"Content-Type": "application/json"
			}
		})

		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`)
		}

		const data = (await response.json()) as RepoMetadataResponse;

		return projects.map(p => {
			const key = `${p.repoOwner}:${p.repoName}`
			const meta = data.repoDetails[key];
			return {
				...p,
				createdAt: meta.createdAt ? new Date(meta.createdAt) : p.createdAt ?? new Date(),
				lastUpdatedAt: meta.updatedAt ? new Date(meta.updatedAt) : p.createdAt ?? new Date()
			};
		});

	} catch (error) {
		console.error("Fetch for metadata failed: ", error)

		// just return the parameters passed
		return projects;
	}
}

// Gets the {number} most recent projects based on the start date
export function getMostRecentProjects(data: Project[], limit: number): Project[] {
	return data.sort((a, b) => {
		if (b.lastUpdatedAt && a.lastUpdatedAt) {
			return b.lastUpdatedAt.getDate() - a.lastUpdatedAt.getDate();
		}
		return 0;
	}
	).slice(0, limit ? limit : 5)
}

export function getPinnedProjects(): Project[] {
	return projectData.filter(p => p.pinned)
}
