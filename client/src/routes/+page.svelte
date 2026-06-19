<script lang="ts">
	import { authStore } from '$lib/stores/auth.svelte';
</script>

<svelte:head>
	<title>Pawfect Grooming</title>
</svelte:head>

<main class="min-vh-100 d-flex flex-column align-items-center justify-content-center px-3 text-center">
	<div class="mb-3" style="font-size: 3.5rem;">🐾</div>
	<h1 class="fw-bolder text-brown-800 mb-2" style="font-size: 2.25rem;">Pawfect Grooming</h1>
	<p class="fs-5 text-sage-600 mb-4 mw-md">
		Professional dog grooming, booked in minutes. Your pup deserves the best.
	</p>

	{#if authStore.user}
		{#if authStore.isBusiness}
			<a href="/business/dashboard" class="btn btn-sage px-4 py-2 fw-bold">
				Go to Dashboard
			</a>
		{:else}
			<a href="/client/dashboard" class="btn btn-peach px-4 py-2 fw-bold">
				Go to Dashboard
			</a>
		{/if}
	{:else}
		<div class="d-flex gap-3 flex-wrap justify-content-center">
			<a href="/login" class="btn btn-sage px-4 py-2 fw-bold">Log In</a>
			<a href="/register" class="btn btn-outline-sage px-4 py-2 fw-bold">Create Account</a>
		</div>
	{/if}
</main>
