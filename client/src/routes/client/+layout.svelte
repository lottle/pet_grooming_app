<script lang="ts">
	import { authStore } from '$lib/stores/auth.svelte';

	let { children } = $props();

	const navLinks = [
		{ href: '/client/dashboard', label: '🏠 Dashboard' },
		{ href: '/client/dogs', label: '🐶 My Dogs' },
		{ href: '/client/bookings', label: '📅 Bookings' }
	];
</script>

<div class="min-h-screen bg-[var(--color-cream)] flex flex-col">
	<nav class="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
		<a href="/client/dashboard" class="text-lg font-extrabold text-[var(--color-brown-800)]">🐾 Pawfect</a>
		<div class="flex items-center gap-4">
			{#each navLinks as link}
				<a href={link.href} class="text-sm font-semibold text-[var(--color-sage-600)] hover:text-[var(--color-sage-700)]">{link.label}</a>
			{/each}
			<form method="POST" action="/logout">
				<button type="submit" class="text-sm font-semibold text-[var(--color-brown-700)] hover:underline">Log out</button>
			</form>
		</div>
	</nav>

	<main class="flex-1 px-6 py-8 max-w-4xl mx-auto w-full">
		{@render children()}
	</main>
</div>
