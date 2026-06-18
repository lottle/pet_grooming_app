<script lang="ts">
	import { enhance } from '$app/forms';

	let { form } = $props();
	let loading = $state(false);
</script>

<svelte:head>
	<title>Log In – Pawfect Grooming</title>
</svelte:head>

<div class="min-h-screen bg-[var(--color-cream)] flex items-center justify-center px-4">
	<div class="w-full max-w-md bg-white rounded-3xl shadow-md p-8">
		<div class="text-center mb-8">
			<div class="text-5xl mb-3">🐾</div>
			<h1 class="text-2xl font-extrabold text-[var(--color-brown-800)]">Welcome back</h1>
			<p class="text-[var(--color-sage-600)] text-sm mt-1">Log in to Pawfect Grooming</p>
		</div>

		{#if form?.error}
			<div class="bg-red-50 text-red-600 text-sm rounded-xl px-4 py-3 mb-5">{form.error}</div>
		{/if}

		<form
			method="POST"
			use:enhance={() => {
				loading = true;
				return async ({ update }) => {
					loading = false;
					await update();
				};
			}}
			class="flex flex-col gap-4"
		>
			<div class="flex flex-col gap-1">
				<label for="email" class="text-sm font-semibold text-[var(--color-brown-700)]">Email</label>
				<input
					id="email"
					name="email"
					type="email"
					required
					value={form?.email ?? ''}
					class="border border-[var(--color-sage-200)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-sage-400)]"
				/>
			</div>

			<div class="flex flex-col gap-1">
				<label for="password" class="text-sm font-semibold text-[var(--color-brown-700)]">Password</label>
				<input
					id="password"
					name="password"
					type="password"
					required
					class="border border-[var(--color-sage-200)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-sage-400)]"
				/>
			</div>

			<button
				type="submit"
				disabled={loading}
				class="mt-2 bg-[var(--color-sage-500)] text-white font-bold py-3 rounded-2xl hover:bg-[var(--color-sage-600)] transition disabled:opacity-60"
			>
				{loading ? 'Logging in…' : 'Log In'}
			</button>
		</form>

		<p class="text-center text-sm text-[var(--color-sage-600)] mt-6">
			No account? <a href="/register" class="font-semibold text-[var(--color-peach-500)] hover:underline">Sign up</a>
		</p>
	</div>
</div>
