<script lang="ts">
	import { authStore } from '$lib/stores/auth.svelte';
</script>

<svelte:head>
	<title>Pawfect Grooming</title>
</svelte:head>

<main class="min-h-screen flex flex-col items-center justify-center px-4 text-center">
	<div class="mb-6 text-6xl">🐾</div>
	<h1 class="text-4xl font-extrabold text-[var(--color-brown-800)] mb-3">Pawfect Grooming</h1>
	<p class="text-lg text-[var(--color-sage-600)] mb-10 max-w-md">
		Professional dog grooming, booked in minutes. Your pup deserves the best.
	</p>

	{#if authStore.user}
		{#if authStore.isBusiness}
			<a
				href="/business/dashboard"
				class="bg-[var(--color-sage-500)] text-white font-bold px-8 py-3 rounded-2xl hover:bg-[var(--color-sage-600)] transition"
			>
				Go to Dashboard
			</a>
		{:else}
			<a
				href="/client/dashboard"
				class="bg-[var(--color-peach-500)] text-white font-bold px-8 py-3 rounded-2xl hover:bg-[var(--color-peach-400)] transition"
			>
				Go to Dashboard
			</a>
		{/if}
	{:else}
		<div class="flex gap-4 flex-wrap justify-center">
			<a
				href="/login"
				class="bg-[var(--color-sage-500)] text-white font-bold px-8 py-3 rounded-2xl hover:bg-[var(--color-sage-600)] transition"
			>
				Log In
			</a>
			<a
				href="/register"
				class="border-2 border-[var(--color-sage-500)] text-[var(--color-sage-600)] font-bold px-8 py-3 rounded-2xl hover:bg-[var(--color-sage-50)] transition"
			>
				Create Account
			</a>
		</div>
	{/if}
</main>
