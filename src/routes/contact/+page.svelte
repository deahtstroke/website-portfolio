<script lang="ts">
	import { CheckCircle2, Cloud, Code, Download, Server } from "lucide-svelte";
	import { onMount } from "svelte";
	import type { ContactRequest, InquiryType } from "$lib/types/ContactRequest";
	import Metadata from "$lib/components/Metadata.svelte";
	import { X } from "@lucide/svelte";

	const inquiries: InquiryType[] = [
		"General Inquiry",
		"Project Collaboration",
		"Job Opportunity",
		"Freelance Work",
		"Bug Report",
		"Other",
	];

	type SubmissionStatus = "idle" | "submitting" | "success" | "error";

	let formData = $state<ContactRequest>({
		name: "",
		email: "",
		inquiryType: "",
		subject: "",
		message: "",
		cfToken: "",
	});

	let errors = $state<Record<string, string>>({});
	let isSubmitting = $state<boolean>(false);
	let submitStatus = $state<SubmissionStatus>("idle");
	let submissionError = $state<string>("");

	function validateForm(): boolean {
		const newErrors: Record<string, string> = {};

		if (!formData.name.trim()) {
			newErrors.name = "Name is required";
		}

		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
		}

		if (formData.inquiryType === "" || !formData.inquiryType.trim()) {
			newErrors.inquiryType = "Inquiry type cannot be blank";
		}

		if (!formData.subject.trim()) {
			newErrors.subject = "Subject is required";
		}

		if (!formData.message.trim()) {
			newErrors.message = "Message is required";
		} else if (formData.message.trim().length < 10) {
			newErrors.message = "Message must be at least 10 characters";
		}

		errors = newErrors;
		return Object.keys(newErrors).length === 0;
	}

	function clearError(field: string) {
		if (errors[field]) {
			const { [field]: _, ...rest } = errors;
			errors = rest;
		}
	}

	async function handleSubmit(e: Event) {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		try {
			isSubmitting = true;
			const contactUrl = import.meta.env.PROD
				? "https://api.danielvm.dev/contact"
				: "http://localhost:3000/contact";
			if (!contactUrl) {
				submitStatus = "error";
				throw new Error("The email API url is not set");
			}

			const response = await fetch(contactUrl, {
				method: "POST",
				body: JSON.stringify(formData),
			});

			// rate limit reached
			if (response.status === 429) {
				submitStatus = "error";
				throw new Error("Too many messages sent. Please try again later.");
			}

			if (!response.ok) {
				submitStatus = "error";
				throw new Error(
					"Unable to authenticate the legimitacy of your message",
				);
			}
			submitStatus = "success";
		} catch (error) {
			if (error instanceof Error) {
				submitStatus = "error";
				submissionError = `Oops! ${error.message}`;
			} else {
				submitStatus = "error";
				submissionError = `Something unexpected happened: ${error}`;
			}
		} finally {
			isSubmitting = false;
			setTimeout(() => {
				formData = {
					name: "",
					email: "",
					inquiryType: "",
					subject: "",
					message: "",
					cfToken: "",
				};
				submitStatus = "idle";
				submissionError = "";
			}, 3000);
		}
	}

	function getRandomSubjectPlaceholder(): string {
		const placeholders = [
			"Make it sound important 😎",
			"Insert clickbait here...",
			"The world’s shortest essay",
			"Tell me what’s up (politely)",
			"Something witty goes here",
			"Subject? I hardly know her!",
			"This better not be ‘no subject’",
			"What’s this email *really* about?",
			"Operation: Impress the recipient",
			"pls open this email 🙏",
			"Make the inbox exciting again",
			"Hot take, incoming",
			"The suspense starts here",
			"Your subject line, your legacy",
			"Professional email noises...",
			"Warning: may contain opinions",
			"Insert dramatic headline",
			"Definitely not spam",
			"Plot twist in the subject line",
			"TL;DR starts here",
		];

		const randomIndex = Math.floor(Math.random() * placeholders.length);
		return placeholders[randomIndex];
	}

	onMount(() => {
		(window as any).onTurnstileSuccess = (token: string) => {
			formData.cfToken = token;
		};
	});

	const getTimezoneData = (
		timeZone: string,
	): { offset: string; timezone: string; localTime: string } => {
		const getPart = (timeZoneName: string) =>
			new Intl.DateTimeFormat("en", { timeZone, timeZoneName })
				.formatToParts(new Date())
				.find((p) => p.type === "timeZoneName")!.value;

		const localTime = new Intl.DateTimeFormat("en", {
			timeZone,
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
		}).format(new Date());

		return {
			offset: getPart("shortOffset").replace("GMT", "UTC"),
			timezone: getPart("short"),
			localTime: localTime,
		};
	};

	let copied: boolean = $state(false);
	const handleCopy = () => {
		navigator.clipboard.writeText("dvm3099@pm.me");
		copied = true;
		setTimeout(() => (copied = false), 800);
	};
</script>

<Metadata
	title="Contact – DanielVM | Full-Stack Engineer"
	description="Get in touch with Daniel Villavicencio, a full-stack engineer. Reach out for collaboration, project inquiries, or consulting opportunities. Or shoot him a message about a bug."
	ogTitle="Contact – DanielVM | Full-Stack Engineer"
	ogDescription="Get in touch with Daniel Villavicencio, a full-stack engineer. Reach out for collaboration, project inquiries, or consulting opportunities. Or shoot him a message about a bug."
	ogUrl="https://www.danielvm.dev/contact"
	ogImage="https://www.danielvm.dev/manatee.png"
	ogType="website"
/>

<main
	class="max-w-3xl w-full mx-auto px-4 py-10 flex flex-col items-center gap-10"
>
	<!-- Hero section -->
	<section class="relative flex flex-col gap-4">
		<h1 class="text-3xl mb-2 text-mauve font-bold tracking-light">
			Get In Touch
		</h1>
		<p class="text-sm text-text">
			Have a project in mind or want to collaborate? Send me an email and I'll
			get back to you as soon as possible — I read everything
		</p>
	</section>

	<div class="w-full grid grid-cols-1 md:grid-cols-[1fr_auto] gap-x-10 gap-y-8">
		<!-- Form Submission -->
		<section class="flex flex-col gap-3">
			<form onsubmit={handleSubmit} novalidate class="flex flex-col gap-3">
				<div
					hidden
					class="cf-turnstile"
					data-sitekey="0x4AAAAAAB8Kyhx16DqpPvEy"
					data-callback="onTurnstileSuccess"
				></div>
				<!-- Name -->
				<div class="flex flex-col gap-2">
					<label for="name" class="block text-sm text-overlay0">
						Name <span class="text-red">*</span>
					</label>
					<input
						type="text"
						id="name"
						name="name"
						autocapitalize="on"
						bind:value={formData.name}
						oninput={() => clearError("name")}
						placeholder="John Doe"
						class="w-full p-2 bg-mantle border
					rounded text-sm text-text placeholder:text-text/50 focus:outline-none transition-colors
					{errors.name ? 'border-red' : 'border-surface0 '}"
					/>
					{#if errors.name}
						<p class="text-xs text-red">{errors.name}</p>
					{/if}
				</div>
				<!-- Email -->
				<div class="flex flex-col gap-2">
					<label for="email" class="block text-sm text-overlay0">
						Email <span class="text-red">*</span>
					</label>
					<input
						type="email"
						id="email"
						name="email"
						bind:value={formData.email}
						oninput={() => clearError("email")}
						autocomplete="email"
						placeholder="johndoe@example.com"
						class="w-full text-text text-sm p-2 bg-mantle border placeholder:text-text/50
							rounded text-bright focus:outline-none transition-colors
							{errors.email ? 'border-red' : 'border-surface0 '}"
					/>
					{#if errors.email}
						<p class="text-xs text-red">{errors.email}</p>
					{/if}
				</div>

				<!-- Inquiry Type -->
				<div class="flex flex-col gap-2">
					<label for="inquiryType" class="block text-sm text-overlay0">
						Inquiry Type <span class="text-red">*</span>
					</label>
					<select
						id="inquiryType"
						name="inquiryType"
						bind:value={formData.inquiryType}
						oninput={() => clearError("inquiryType")}
						class="w-full text-text text-sm p-2 bg-mantle border placeholder:text-text/50
					rounded focus:outline-none transition-colors
					{errors.inquiryType ? 'border-red' : 'border-surface0 '}"
					>
						<option value="" hidden class="text-text/40"
							>Select an Inquiry Type</option
						>
						{#each inquiries as inquiry}
							<option value={inquiry}>{inquiry}</option>
						{/each}
					</select>
					{#if errors.inquiryType}
						<p class="text-xs text-red">{errors.inquiryType}</p>
					{/if}
				</div>
				<!-- Subject -->
				<div class="flex flex-col gap-2">
					<label for="subject" class="block text-sm text-overlay0">
						Subject <span class="text-red">*</span>
					</label>
					<input
						type="text"
						id="subject"
						name="subject"
						bind:value={formData.subject}
						oninput={() => clearError("subject")}
						placeholder={getRandomSubjectPlaceholder()}
						class="w-full p-2 bg-mantle border placeholder:text-text/50
							rounded text-text text-sm focus:outline-none transition-colors
							{errors.subject ? 'border-red' : 'border-surface0'}"
					/>
					{#if errors.subject}
						<p class="text-xs text-red">{errors.subject}</p>
					{/if}
				</div>
				<!-- Message body -->
				<div class="flex-1 flex flex-col gap-2">
					<label for="message" class="block text-sm text-overlay0">
						Message <span class="text-red">*</span>
					</label>
					<textarea
						id="message"
						name="message"
						bind:value={formData.message}
						oninput={() => clearError("message")}
						rows="8"
						class="w-full p-2 bg-mantle border text-text text-sm placeholder:text-text/50
					rounded focus:outline-none transition-colors
					{errors.message ? 'border-red' : 'border-surface0'}"
						placeholder="Tell me about your inquiry..."
					></textarea>
					{#if errors.message}
						<p class="text-xs text-red">{errors.message}</p>
					{/if}
				</div>

				<!-- Submission -->
				<div class="flex flex-col gap-2">
					<button
						aria-label="Message submission button"
						type="submit"
						class="flex justify-center items-center text-sm gap-2 w-full md:w-auto px-4 py-2 bg-mauve hover:bg-mauve/75 text-crust
					rounded font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
						disabled={isSubmitting}
					>
						{#if isSubmitting}
							<div
								class="w-3 h-3 border-2 border-crust/30 border-t-crust rounded-full animate-spin"
							></div>
							<span>Sending message...</span>
						{:else if submitStatus === "success"}
							<CheckCircle2 class="w-3 h-3" />
							<span>Message Sent!</span>
						{:else if submitStatus === "error"}
							<X class="w-3 h-3" />
							<span>Error :(</span>
						{:else}
							<span>Send Message</span>
						{/if}
					</button>

					{#if submitStatus === "success"}
						<p class="text-xs text-green">
							Thanks for reaching out! I'll get back to you soon.
						</p>
					{:else if submitStatus === "error"}
						<p class="text-xs text-red">
							{submissionError}
						</p>
					{/if}
				</div>
			</form>
			<script
				src="https://challenges.cloudflare.com/turnstile/v0/api.js"
				async
				defer
			></script>
		</section>

		<!-- Sidebar -->
		<div class="flex flex-col items-center gap-4 my-auto">
			<!-- Availability -->
			<section class="w-full">
				<div class="flex items-center gap-2 pb-3">
					<div class="h-px flex-1 bg-surface0"></div>
					<h3 class="text-xs font-light uppercase text-overlay0 tracking-wide">
						Availability
					</h3>
					<div class="h-px flex-1 bg-surface0"></div>
				</div>
				<div class="mb-3 flex items-center gap-2">
					<span class="relative flex h-2 w-2">
						<span class="h-2 w-2 rounded-full bg-green"></span>
					</span>
					<p class="text-xs text-green">Open to work</p>
				</div>
				<div>
					<p class="text-xs text-overlay0">
						Looking for systems & infra
						<br />
						roles. Full-time preferred
					</p>
				</div>
			</section>

			<!-- Contact Information -->
			<section class="w-full">
				<div class="flex items-center gap-2 pb-3">
					<div class="h-px flex-1 bg-surface0"></div>
					<h3 class="text-xs font-light uppercase text-overlay0 tracking-wide">
						Find me on
					</h3>
					<div class="h-px flex-1 bg-surface0"></div>
				</div>
				<div class="mb-3">
					<p class="text-xs text-overlay0">email</p>
					<div class="w-full flex items-center cursor-pointer mb-3">
						<a
							href="mailto:dvm3099@pm.me"
							class="text-xs text-mauve hover:underline"
						>
							dvm3099@pm.me
						</a>
						<button
							onclick={handleCopy}
							class="text-[0.65rem] text-overlay0 ml-auto {copied
								? 'italic'
								: ''}"
						>
							{copied ? "skibidi" : "copy"}
						</button>
					</div>
				</div>
				<div>
					<p class="text-xs text-overlay0">github</p>
					<a
						target="_blank"
						rel="noopener noreferrer"
						href="https://www.github.com/deahtstroke"
						class="text-xs text-blue hover:underline"
					>
						deahtstroke
					</a>
				</div>
			</section>

			<!-- About me -->
			<section class="w-full">
				<div class="flex items-center gap-2 pb-3">
					<div class="h-px flex-1 bg-surface0"></div>
					<h3 class="text-xs font-light uppercase text-overlay0 tracking-wide">
						Details
					</h3>
					<div class="h-px flex-1 bg-surface0"></div>
				</div>
				<div class="mb-3 flex flex-col gap-1">
					<p class="text-xs text-overlay0">location</p>
					<p class="text-xs text-subtext0">California, US</p>
				</div>
				<div class="mb-3 flex flex-col gap-1">
					<p class="text-xs text-overlay0">timezone</p>
					<p class="text-xs text-subtext0">
						{getTimezoneData("America/Los_Angeles").localTime} -
						{getTimezoneData("America/Los_Angeles").offset}
						({getTimezoneData("America/Los_Angeles").timezone})
					</p>
				</div>
				<div class="flex flex-col gap-1">
					<p class="text-xs text-overlay0">response time</p>
					<p class="text-xs text-subtext0">within 48 hours</p>
				</div>
			</section>
		</div>
	</div>
</main>
