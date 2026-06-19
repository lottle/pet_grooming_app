<script lang="ts">
	import { enhance } from '$app/forms';

	let { form } = $props();
	let loading = $state(false);
</script>

<svelte:head>
	<title>Log In – Pawfect Grooming</title>
</svelte:head>

<div class="min-vh-100 bg-cream d-flex align-items-center justify-content-center px-3">
	<div class="w-100 mw-md bg-white rounded-5 shadow p-4 p-md-5">
		<div class="text-center mb-4">
			<div class="mb-2" style="font-size: 3rem;">🐾</div>
			<h1 class="fs-3 fw-bolder text-brown-800">Welcome back</h1>
			<p class="text-sage-600 fs-sm mt-1 mb-0">Log in to Pawfect Grooming</p>
		</div>

		{#if form?.error}
			<div class="alert alert-danger fs-sm">{form.error}</div>
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
			class="d-flex flex-column gap-3"
		>
			<div>
				<label for="email" class="form-label fs-sm fw-semibold text-brown">Email</label>
				<input
					id="email"
					name="email"
					type="email"
					required
					value={form?.email ?? ''}
					class="form-control input-custom fs-sm"
				/>
			</div>

			<div>
				<label for="password" class="form-label fs-sm fw-semibold text-brown">Password</label>
				<input
					id="password"
					name="password"
					type="password"
					required
					class="form-control input-custom fs-sm"
				/>
			</div>

			<button
				type="submit"
				disabled={loading}
				class="btn btn-sage fw-bold py-2 mt-2"
			>
				{loading ? 'Logging in…' : 'Log In'}
			</button>
		</form>

		<p class="text-center fs-sm text-sage-600 mt-4 mb-0">
			No account?
			<a href="/register" class="fw-semibold text-peach text-decoration-none hover-underline">Sign up</a>
		</p>
	</div>
</div>
