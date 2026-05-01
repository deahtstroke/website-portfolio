<script lang="ts">
	import ProjectCard from "$lib/components/ProjectCard.svelte";
	import Metadata from "$lib/components/Metadata.svelte";
	import {
		LanguagesToColors,
		StatusToColors,
		type PrimaryLanguage,
		type Project,
		type ProjectStatus,
	} from "$lib/types/Project";

	let { data } = $props();

	type SortDir = "asc" | "desc";

	interface SortOption {
		label: string;
		value?: keyof Project;
		requiresEnrich: boolean;
		defaultDir: SortDir;
		toggleDir?: boolean;
	}

	const sortOptions: SortOption[] = [
		{
			label: "last updated",
			value: "lastUpdatedAt",
			defaultDir: "asc",
			requiresEnrich: true,
		},
		{
			label: "creation date",
			value: "createdAt",
			defaultDir: "asc",
			requiresEnrich: true,
		},
		{ label: "name", value: "title", defaultDir: "asc", requiresEnrich: false },
		{
			label: "status",
			value: "status",
			defaultDir: "asc",
			requiresEnrich: false,
		},
		{ label: "stack depth", defaultDir: "asc", requiresEnrich: false },
	];

	let baseProjects: Project[] = $derived(data.projects);
	let searchQuery = $state<string>("");
	let selectedSort: keyof Project | "stackDepth" = $derived(
		data.enriched ? "lastUpdatedAt" : "title",
	);
	let sortDirection: SortDir = $state("asc");

	let selectedLanguage: PrimaryLanguage | null = $state(null);
	let languageFilters = $derived(
		new Set([...baseProjects.map((p) => p.primaryLanguage)]),
	);

	let selectedStatus: ProjectStatus | null = $state(null);
	let statusFilters: Set<ProjectStatus> = $derived(
		new Set([...baseProjects.map((p) => p.status)]),
	);

	// Derived projects from all filters and sorts
	let filteredProjects = $derived(
		baseProjects
			.filter((p) => {
				return selectedStatus === null ? true : p.status === selectedStatus;
			})
			.filter((p) => {
				return selectedLanguage === null
					? true
					: p.primaryLanguage === selectedLanguage;
			})
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
				switch (selectedSort) {
					case "title":
						return sortDirection === "asc"
							? a.title.localeCompare(b.title)
							: b.title.localeCompare(a.title);
					case "stackDepth":
						return sortDirection === "asc"
							? a.technologies.length - b.technologies.length
							: b.technologies.length - a.technologies.length;
					case "lastUpdatedAt":
						if (a.lastUpdatedAt && b.lastUpdatedAt) {
							return sortDirection === "asc"
								? a.lastUpdatedAt.getTime() - b.lastUpdatedAt.getTime()
								: b.lastUpdatedAt.getTime() - a.lastUpdatedAt.getTime();
						} else return 0;
					case "createdAt":
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

	function clearFilters() {
		searchQuery = "";

		selectedSort = data.enriched ? "lastUpdatedAt" : "title";
		sortDirection = "asc";
		selectedStatus = null;
		selectedLanguage = null;
	}

	function clearStatus() {
		selectedStatus = null;
	}

	function clearLanguage() {
		selectedLanguage = null;
	}
</script>

{#snippet filterButton_desktop(
	label: string,
	count: number,
	cond: boolean,
	fn: () => void,
	diamondColor: string = "mauve",
	diamond: boolean = true,
)}
	<button
		onclick={fn}
		class={[
			"w-full flex items-center gap-1.5 text-xs text-left px-2 py-1 border-l cursor-pointer",
			cond
				? "text-text bg-surface border-mauve"
				: "text-overlay0 bg-surface/50",
			cond ? "border-" + diamondColor : "border-transparent",
			cond ? "bg-surface0" : "hover:bg-surface0/50",
		]}
	>
		<span class="w-2 shrink-0 text-[0.65rem] text-{diamondColor ?? 'mauve'}"
			>{diamond ? "◆" : ""}</span
		>
		<span class="flex-1">{label}</span>
		<span class="text-xs text-overlay0">{count}</span>
	</button>
{/snippet}

<Metadata
	title="Projects – DanielVM | Software Portfolio & Full-Stack Engineering"
	description="Explore Daniel Villavicencio's software projects, showcasing full-stack engineering skills, distributed systems, and practical development solutions."
	ogTitle="Projects – DanielVM | Software Portfolio & Full-Stack Engineering"
	ogDescription="Explore Daniel Villavicencio's software projects, showcasing full-stack engineering skills, distributed systems, and practical development solutions."
	ogUrl="https://www.danielvm.dev/projects"
	ogImage="https://www.danielvm.dev/manatee.png"
	ogType="website"
/>

<main class="flex flex-col items-center gap-10 max-w-3xl mx-auto px-4 py-8">
	<section class="flex flex-col gap-4 items-start">
		<h1 class="text-3xl mb-2 text-mauve font-bold tracking-light">Projects</h1>
		<p class="text-base text-text">
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
				class="flex-1 bg-transparent border-0 text-base text-text placeholder:text-overlay0 focus:outline-none"
				placeholder="search projects"
				bind:value={searchQuery}
			/>
			<span class="text-overlay0 text-sm select-none tabular-nums">
				{filteredProjects.length} / {baseProjects.length}
			</span>
		</div>

		<!-- Sorting Options and filters -->
		<div class="grid grid-cols-1 lg:grid-cols-[auto_1fr]">
			<!-- Side bar is hidden on smaller screens -->
			<div
				class="hidden lg:w-40 lg:flex lg:flex-col gap-2 pr-2 border-r border-surface0 mr-4"
			>
				<!-- Lanauge filters -->
				<div class="flex flex-col gap-1 mb-3">
					<h3
						class="text-sm text-overlay0 font-medium tracking-widest uppercase"
					>
						Language
					</h3>
					{@render filterButton_desktop(
						"All",
						baseProjects.length,
						selectedLanguage === null,
						() => clearLanguage(),
						"mauve",
						false,
					)}

					{#each languageFilters as filter}
						{@render filterButton_desktop(
							filter,
							baseProjects.filter((p) => p.primaryLanguage === filter).length,
							selectedLanguage === filter,
							() => setLanguage(filter),
							LanguagesToColors[filter],
						)}
					{/each}
				</div>

				<!-- Status filters -->
				<div class="flex flex-col gap-1 mb-3">
					<h3
						class="text-sm text-overlay0 font-medium tracking-widest uppercase"
					>
						Status
					</h3>
					{@render filterButton_desktop(
						"Any",
						baseProjects.length,
						selectedStatus === null,
						() => clearStatus(),
						"blue",
						false,
					)}

					{#each statusFilters as filter}
						{@render filterButton_desktop(
							filter,
							baseProjects.filter((p) => p.status === filter).length,
							selectedStatus === filter,
							() => setStatus(filter),
							StatusToColors[filter],
						)}
					{/each}
				</div>
			</div>
			<div class="flex flex-col gap-4">
				<!-- Language filters (Hiddden on large screens) -->
				<div class="lg:hidden flex flex-col gap-2">
					<h3
						class="text-overlay0 text-sm font-medium tracking-widest uppercase"
					>
						Language
					</h3>
					<div class="flex gap-2 flex-wrap">
						<button
							onclick={() => clearLanguage()}
							class="px-2 py-1 text-xs border rounded cursor-pointer {selectedLanguage ===
							null
								? 'text-mauve border-mauve bg-surface0'
								: 'text-overlay0 border-overlay0'}">All</button
						>
						{#each languageFilters as language}
							{@const active = selectedLanguage === language}
							<button
								onclick={() => setLanguage(language)}
								class="px-2 py-1 text-xs border rounded cursor-pointer {active
									? 'text-mauve border-mauve bg-surface0'
									: 'text-overlay0 border-overlay0'}">{language}</button
							>
						{/each}
					</div>
				</div>

				<!-- Status filters (Also hidden on large screens) -->
				<div class="lg:hidden flex flex-col gap-2">
					<h3
						class="text-overlay0 text-sm font-medium tracking-widest uppercase"
					>
						Status
					</h3>
					<div class="flex gap-2 flex-wrap">
						<button
							onclick={() => clearStatus()}
							class="px-2 py-1 text-xs border rounded cursor-pointer {selectedStatus ===
							null
								? 'text-mauve border-mauve bg-surface0'
								: 'text-overlay0 border-overlay0'}">Any</button
						>
						{#each statusFilters as status}
							{@const active = selectedStatus == status}
							<button
								onclick={() => setStatus(status)}
								class="px-2 py-1 text-xs border border-mauve rounded cursor-pointer {active
									? 'text-mauve border-mauve bg-surface0'
									: 'text-overlay0 border-overlay0'}">{status}</button
							>
						{/each}
					</div>
				</div>

				<!-- Sort by -->
				<div class="flex flex-col gap-2">
					<h3
						class="text-overlay0 text-sm font-medium tracking-widest uppercase"
					>
						Sort By
					</h3>
					<div class="flex gap-2 flex-wrap">
						{#each sortOptions as tag}
							<!-- Several sorting options are not available if enrichment doesn't go through -->
							<!-- AKA fetching Github data for these repos -->
							{#if !tag.requiresEnrich || data.enriched}
								{@const active = selectedSort === tag.value}
								<button
									onclick={() => setSort(tag)}
									class="px-2 py-1 text-xs border rounded cursor-pointer {active
										? 'border-mauve text-mauve bg-surface0'
										: 'border-overlay0 text-overlay0'}"
									>{tag.label}
									{#if active}
										<span class="text-[0.65rem]"
											>{sortDirection === "asc" ? "↑" : "↓"}</span
										>
									{/if}
								</button>
							{/if}
						{/each}
					</div>
				</div>

				<!-- Search results -->
				<section class="flex flex-col items-center gap-3">
					{#if filteredProjects.length > 0}
						<div class="grid grid-cols-1 gap-3">
							{#each filteredProjects as project (project.title)}
								<ProjectCard {project} />
							{/each}
						</div>
					{:else}
						<div class="text-center space-y-2 py-16">
							<h3 class="text-base font-semibold text-yellow">
								Huh, couldn't find anything?
							</h3>
							<p class="text-sm text-overlay2 text-center">
								Try adjusting your search or filters to find what you're looking
								for
							</p>
							{#if hasActiveFilters}
								<button
									onclick={clearFilters}
									class="hover:underline cursor-pointer text-sm mt-4 px-2 py-1 text-mauve"
								>
									Clear all filters
								</button>
							{/if}
						</div>
					{/if}
				</section>
			</div>
		</div>
	</section>
</main>
