<script lang="ts">
	import { page } from "$app/state";
	import {
		User,
		Briefcase,
		Mail,
		Home,
		FileText,
		Notebook,
	} from "lucide-svelte";
	import { Search } from "@lucide/svelte";
	import { fly } from "svelte/transition";

	let menuOptions = [
		{
			name: "Home",
			desc: "Go back to Homepage",
			ref: "/",
			icon: Home,
		},
		{
			name: "Projects",
			desc: "View my work",
			ref: "/projects",
			icon: Briefcase,
		},
		{
			name: "Blog",
			desc: "Read my Blog",
			ref: "/blog",
			icon: Notebook,
		},
		{
			name: "Contact",
			desc: "Get in touch with me",
			ref: "/contact",
			icon: Mail,
		},
		{
			name: "About",
			desc: "Learn more about me",
			ref: "/about",
			icon: User,
		},
		{
			name: "Resume",
			desc: "See my resume",
			ref: "/resume",
			icon: FileText,
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

	const toggleTelescope = () => {
		telescopeOpen = !telescopeOpen;
	};

	let telescopeOpen: boolean = $state(false);
	let query: string = $state("");
	let inputEl: HTMLInputElement | null = $state(null);

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
					onclick={toggleTelescope}
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
		transition:fly={{ y: 800, duration: 260, opacity: 1 }}
		class="sm:hidden fixed bottom-0 left-0 right-0 z-50 flex flex-col h-[75dvh] bg-mantle border-y border-surface0"
	>
		<div class="px-4 py-3.5 border-b border-surface1 shrink-0">
			<div class="text-xs text-overlay0 mb-2">telescope.nvim</div>
			<div class="flex items-center text-base">
				<span class="text-blue mr-2">Find &gt;</span>
				<input
					type="text"
					bind:this={inputEl}
					bind:value={query}
					class="bg-crust border-none text-text active:border-none"
				/>
			</div>
		</div>
	</div>
{/if}
