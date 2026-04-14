<script lang="ts">
	import "../app.css";
	import "$lib/components/Navbar.svelte";
	import Navbar from "$lib/components/Navbar.svelte";
	import Footer from "$lib/components/Footer.svelte";

	let { children } = $props();
</script>

<header>
	<Navbar />
</header>

{@render children?.()}

<Footer />
