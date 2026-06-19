<script lang="ts">
	let { children } = $props();

	const navLinks = [
		{ href: '/business/dashboard', label: '📅 Calendar' },
		{ href: '/business/services', label: '✂️ Services' },
		{ href: '/business/bookings', label: '📋 Bookings' }
	];
</script>

<div class="min-vh-100 bg-cream d-flex flex-column">
	<nav class="bg-white shadow-sm px-4 py-3 d-flex align-items-center justify-content-between">
		<a href="/business/dashboard" class="fs-5 fw-bolder text-brown-800 text-decoration-none">🐾 Pawfect — Business</a>
		<div class="d-flex align-items-center gap-3">
			{#each navLinks as link}
				<a href={link.href} class="fs-sm fw-semibold text-sage-600 text-decoration-none hover-sage-700">{link.label}</a>
			{/each}
			<form method="POST" action="/logout">
				<button type="submit" class="btn-plain fs-sm fw-semibold text-brown hover-underline">Log out</button>
			</form>
		</div>
	</nav>

	<main class="flex-grow-1 px-4 py-4 mw-6xl mx-auto w-100">
		{@render children()}
	</main>
</div>
