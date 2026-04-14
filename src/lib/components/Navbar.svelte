<script lang="ts">
	import { page } from "$app/state";
	import { Search } from "@lucide/svelte";
	import { fade, fly } from "svelte/transition";
	import { fuzzyIndices, fuzzyScore } from "$lib/utils/FuzzyFinding";

	let menuOptions = [
		{
			name: "Home",
			desc: "Go back to Homepage",
			ref: "/",
		},
		{
			name: "Projects",
			desc: "View my work",
			ref: "/projects",
		},
		{
			name: "Blog",
			desc: "Read my Blog",
			ref: "/blog",
		},
		{
			name: "Contact",
			desc: "Get in touch with me",
			ref: "/contact",
		},
		{
			name: "About",
			desc: "Learn more about me",
			ref: "/about",
		},
		{
			name: "Resume",
			desc: "See my resume",
			ref: "/resume",
		},
	];

	const segments = $derived(
		page.url.pathname == "/"
			? []
			: page.url.pathname
					.split("/")
					.filter(Boolean)
					.map((a) => a.toLowerCase()),
	);

	const closeTelescope = () => {
		telescopeOpen = false;
		document.body.style.overflow = "";
	};

	const openTelescope = () => {
		telescopeOpen = true;
		document.body.style.overflow = "hidden";
	};

	let telescopeOpen: boolean = $state(false);
	let query: string = $state("");
	let inputEl: HTMLInputElement | null = $state(null);
	let selectedIndex: number = $state(0);

	type Match = { href: string; label: string; indices: number[] };

	const filteredResults = $derived.by<Match[]>(() => {
		const q = query.toLowerCase().trim();
		console.log(query);
		if (q === "") {
			return menuOptions.map((l) => ({
				href: l.ref,
				label: l.name,
				indices: [],
			}));
		}
		return menuOptions
			.map((l) => ({
				href: l.ref,
				label: l.name,
				indices: fuzzyIndices(query, l.name),
			}))
			.filter((l): l is Match => l.indices !== null)
			.sort((a, b) => fuzzyScore(b.indices) - fuzzyScore(a.indices));
	});

	function inputKeycaptures(event: KeyboardEvent): void {
		if (event.key === "Escape") {
			closeTelescope();
		} else if (event.key === "Enter") {
			closeTelescope();
		}
	}

	$effect(() => {
		if (telescopeOpen) {
			inputEl?.focus();
		}
	});
</script>

<nav
	class="sticky top-0 bg-mantle border-b border-surface0 backdrop-blur-md z-40"
>
	<div
		class="max-w-3xl m-auto h-full px-4 py-3 flex flex-row align-middle items-center"
	>
		<a
			class="font-bold mr-auto tracking-wide text-text text-sm hover:cursor-pointer"
			href="/"
		>
			<h1 class="text-blue hover:text-sky">
				~/dvillavicencio
				{#each segments as segment}
					<span class="text-overlay0">/</span>
					<span class="text-subtext1">{segment}</span>
				{/each}
			</h1>
		</a>

		<!-- NavBar options desktop -->
		<ul class="flex gap-3 mx-2 justify-center content-center">
			{#each menuOptions as option}
				<li>
					<a
						href={option.ref}
						class="group text-xs relative hidden sm:inline-block content-center cursor-pointer {option.ref ===
						page.url.pathname
							? 'text-sky'
							: 'text-blue hover:text-sky '}"
					>
						{option.name}
					</a>
				</li>
			{/each}
			<li class="block sm:hidden content-start">
				<Search
					onclick={openTelescope}
					class="text-overlay0 hover:text-overlay2"
					size="16"
				/>
			</li>
		</ul>
	</div>
</nav>

<!-- Mobile side bar -->
{#if telescopeOpen}
	<div
		transition:fade={{ duration: 260 }}
		aria-modal="true"
		role="dialog"
		aria-label="Telescope finder"
		tabindex="-1"
		class="absolute inset-0 bg-crust/50 z-40"
		onkeydown={(e) => {
			if (e.key === "Escape") closeTelescope();
		}}
		onclick={closeTelescope}
	></div>
	<div
		transition:fly={{ y: 800, duration: 260, opacity: 1 }}
		class="sm:hidden fixed bottom-0 left-0 right-0 z-50 flex flex-col h-[75dvh] bg-mantle border-y border-surface0"
	>
		<!-- Telescope header -->
		<div class="px-4 py-3.5 border-b border-surface1 shrink-0">
			<div class="text-xs text-overlay0 mb-2">telescope.nvim</div>
			<div class="flex items-center text-base">
				<span class="text-sm text-blue mr-2">Find &gt;</span>
				<input
					type="text"
					bind:this={inputEl}
					onkeydown={inputKeycaptures}
					bind:value={query}
					class="bg-crust border-none text-text text-xs active:border-none"
				/>
			</div>
		</div>

		<div class="overflow-y-auto flex-1 py-1.5">
			{#each filteredResults as result, i}
				{@const active = i === selectedIndex}
				<a
					href={result.href}
					onclick={closeTelescope}
					class="group flex items-center justify-between px-4 py-2.5 text-xs {active
						? 'bg-mauve'
						: 'hover:bg-surface0'}"
				>
					<span class={active ? "text-crust" : "text-subtext1"}>
						~/deahtstroke/<span
							class={active ? "font-semibold text-crust" : "text-mauve"}
							>{result.label}</span
						>
					</span>
					<span class="text-surface0 group-hover:text-surface2">page</span>
				</a>
			{/each}
		</div>

		<!-- Footer -->
		<div class="px-4 py-3 flex gap-2 bg-crust border-t border-surface0">
			<p class="text-xs text-overlay0">{filteredResults.length} results</p>
			<div class="flex gap-2 ml-auto text-xs">
				<p class="text-overlay0">↑↓ navigate</p>
				<p class="text-overlay0">↵ open</p>
				<p class="text-overlay0">esc close</p>
			</div>
		</div>
	</div>
{/if}
