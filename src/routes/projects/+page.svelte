<script lang="ts">
	import { Search } from "lucide-svelte";
	import ProjectCard from "$lib/components/ProjectCard.svelte";
	import Metadata from "$lib/components/Metadata.svelte";
	import { projectData as projects, getRepoMetadata } from "$lib/data/projects";
	import { onMount } from "svelte";
	import type {
		PrimaryLanguage,
		Project,
		ProjectStatus,
	} from "$lib/types/Project";

	type SortDir = "asc" | "desc";

	interface SortOption {
		label: string;
		value?: keyof Project;
		defaultDir: SortDir;
		toggleDir?: boolean;
	}

	const sortOptions: SortOption[] = [
		{ label: "last updated", value: "lastUpdatedAt", defaultDir: "asc" },
		{ label: "creation date", value: "createdAt", defaultDir: "asc" },
		{ label: "name", value: "title", defaultDir: "asc" },
		{ label: "status", value: "status", defaultDir: "asc" },
		{ label: "stack depth", defaultDir: "asc" },
	];

	let baseProjects: Project[] = $state(projects);
	let searchQuery = $state<string>("");
	let selectedSort: keyof Project = $state("lastUpdatedAt");
	let sortDirection: SortDir = $state("asc");
	let sortBy = $state<"name" | "techCount" | "updateDate" | "creationDate">(
		"name",
	);

	let selectedLanguage: PrimaryLanguage | null = $state(null);
	let languageTags = $derived(
		new Set([...projects.map((p) => p.primaryLanguage)]),
	);

	let selectedStatus: ProjectStatus | null = $state(null);
	let statusTags: Set<ProjectStatus> = $derived(
		new Set([...projects.map((p) => p.status)]),
	);

	let filteredProjects = $derived(
		baseProjects
			.filter((p: Project) => {
				if (!searchQuery.trim()) {
					return true;
				}

				const query = searchQuery.toLowerCase();
				return (
					p.title.toLowerCase().includes(query) ||
					p.description.toLowerCase().includes(query) ||
					p.technologies.some((t) => t.toLowerCase().includes(query))
				);
			})
			.sort((a: Project, b: Project) => {
				switch (sortBy) {
					case "name":
						return sortDirection === "asc"
							? a.title.localeCompare(b.title)
							: b.title.localeCompare(a.title);
					case "techCount":
						return sortDirection === "asc"
							? a.technologies.length - b.technologies.length
							: b.technologies.length - a.technologies.length;
					case "updateDate":
						if (a.lastUpdatedAt && b.lastUpdatedAt) {
							return sortDirection === "asc"
								? a.lastUpdatedAt.getTime() - b.lastUpdatedAt.getTime()
								: b.lastUpdatedAt.getTime() - a.lastUpdatedAt.getTime();
						} else return 0;
					case "creationDate":
						if (a.createdAt && b.createdAt) {
							return sortDirection === "asc"
								? a.createdAt.getTime() - b.createdAt.getTime()
								: b.createdAt.getTime() - a.createdAt.getTime();
						} else return 0;
					default:
						return 0;
				}
			}),
	);

	let hasActiveFilters = $derived(searchQuery.trim() != "");

	function clearFilters() {
		searchQuery = "";
		sortBy = "name";
	}

	function setStatus(s: ProjectStatus) {
		selectedStatus = s;
	}

	function setLanguage(l: PrimaryLanguage): any {
		selectedLanguage = l;
	}

	function setSort(s: SortOption) {
		const opt: SortOption | undefined = sortOptions.find((o) => o === s);
		if (!opt) {
			return;
		}

		if (selectedSort === s.value) {
			sortDirection = sortDirection === "asc" ? "desc" : "asc";
		} else {
			selectedSort = s.value!;
			sortDirection = s.defaultDir;
		}
	}

	// enrich data on component being mounted
	onMount(async () => {
		try {
			const response = await getRepoMetadata(projects);
			baseProjects = response;
		} catch (error) {
			console.log(error);
		}
	});

	function clearStatus() {
		selectedStatus = null;
	}

	function clearLanguage() {
		selectedLanguage = null;
	}
</script>

<Metadata
	title="Projects – DanielVM | Software Portfolio & Full-Stack Engineering"
	description="Explore Daniel Villavicencio's software projects, showcasing full-stack engineering skills, distributed systems, and practical development solutions."
	ogTitle="Projects – DanielVM | Software Portfolio & Full-Stack Engineering"
	ogDescription="Explore Daniel Villavicencio's software projects, showcasing full-stack engineering skills, distributed systems, and practical development solutions."
	ogUrl="https://www.danielvm.dev/projects"
	ogImage="https://www.danielvm.dev/manatee.png"
	ogType="website"
/>

<main
	class="flex flex-col items-center gap-10 max-w-3xl mx-auto px-4 py-8 sm:gap-10"
>
	<section class="flex flex-col gap-4 items-start">
		<h1 class="text-3xl mb-2 text-mauve font-bold tracking-light">Projects</h1>
		<p class="text-sm text-text">
			A collection of projects spanning multiple domains and technologies — from
			personal experiments to meaningful contributions. Always building, always
			exploring.
		</p>
	</section>

	<!-- Search bar, filters, and sorting -->
	<section class="w-full">
		<!-- Search bar -->
		<div
			class="flex items-center px-3 py-2 mb-3 gap-2 border border-surface0 rounded bg-mantle"
		>
			<span class="text-mauve text-sm select-none">/</span>
			<input
				class="flex-1 bg-transparent border-0 text-sm text-text placeholder:text-overlay0 focus:outline-none"
				placeholder="search projects"
				bind:value={searchQuery}
			/>
			<span class="text-overlay0 text-xs select-none tabular-nums">
				{filteredProjects.length} / {projects.length}
			</span>
		</div>

		<!-- Sorting Options and filters -->
		<section
			class="grid grid-cols-[1fr] sm:grid-cols-[auto_1fr] gap-y-4 gap-x-2"
		>
			<!-- Language filters -->
			<div class="flex flex-col gap-2">
				<h3 class="text-overlay0 text-xs font-medium tracking-widest uppercase">
					Language
				</h3>
				<div class="flex gap-2 flex-wrap">
					<button
						onclick={() => clearLanguage()}
						class="px-2 py-1 text-[0.65rem] border rounded cursor-pointer {selectedLanguage ===
						null
							? 'text-mauve border-mauve bg-surface0'
							: 'text-overlay0 border-overlay0'}">All</button
					>
					{#each languageTags as language}
						{@const active = selectedLanguage === language}
						<button
							onclick={() => setLanguage(language)}
							class="px-2 py-1 text-[0.65rem] border rounded cursor-pointer {active
								? 'text-mauve border-mauve bg-surface0'
								: 'text-overlay0 border-overlay0'}">{language}</button
						>
					{/each}
				</div>
			</div>

			<!-- Status filters -->
			<div class="flex flex-col gap-2">
				<h3 class="text-overlay0 text-xs font-medium tracking-widest uppercase">
					Status
				</h3>
				<div class="flex gap-2 flex-wrap">
					<button
						onclick={() => clearStatus()}
						class="px-2 py-1 text-[0.65rem] border rounded cursor-pointer {selectedStatus ===
						null
							? 'text-mauve border-mauve bg-surface0'
							: 'text-overlay0 border-overlay0'}">Any</button
					>
					{#each statusTags as status}
						{@const active = selectedStatus == status}
						<button
							onclick={() => setStatus(status)}
							class="px-2 py-1 text-[0.65rem] border border-mauve rounded cursor-pointer {active
								? 'text-mauve border-mauve bg-surface0'
								: 'text-overlay0 border-overlay0'}">{status}</button
						>
					{/each}
				</div>
			</div>

			<!-- Sort by -->
			<div class="flex flex-col gap-2">
				<h3 class="text-overlay0 text-xs font-medium tracking-widest uppercase">
					Sort By
				</h3>
				<div class="flex gap-2 flex-wrap">
					{#each sortOptions as tag}
						{@const active = selectedSort === tag.value}
						<button
							onclick={() => setSort(tag)}
							class="px-2 py-1 text-[0.65rem] border rounded cursor-pointer {active
								? 'border-mauve text-mauve bg-surface0'
								: 'border-overlay0 text-overlay0'}"
							>{tag.label}
							{#if active}
								<span class="text-[0.65rem]"
									>{sortDirection === "asc" ? "↑" : "↓"}</span
								>
							{/if}
						</button>
					{/each}
				</div>
			</div>
		</section>
	</section>

	<!-- Project Results -->
	<section class="flex flex-col items-center gap-6">
		{#if filteredProjects.length > 0}
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each filteredProjects as project (project.title)}
					<ProjectCard {project} />
				{/each}
			</div>
		{:else}
			<div
				class="w-16 h-16 border-2 border-neutral-800 flex items-center justify-center"
			>
				<Search class="w-8 h-8 text-neutral/700" />
			</div>
			<div class="text-center space-y-2">
				<h3 class="text-xl font-semibold text-default">No Projects Found</h3>
				<p class="text-default text-center max-w-md">
					Try adjusting your search or filters to find what you're looking for
				</p>
				{#if hasActiveFilters}
					<button
						onclick={clearFilters}
						class="mt-4 px-6 py-2 bg-cyan-500 hover:bg-cyan-400 text-bright transition-colors"
					>
						Clear all filters
					</button>
				{/if}
			</div>
		{/if}
	</section>
</main>
