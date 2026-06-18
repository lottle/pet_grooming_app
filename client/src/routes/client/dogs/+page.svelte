<script lang="ts">
	import { enhance } from '$app/forms';

	let { data, form } = $props();
	let showForm = $state(false);
	let saving = $state(false);
</script>

<svelte:head><title>My Dogs – Pawfect</title></svelte:head>

<div class="flex items-center justify-between mb-6">
	<h1 class="text-2xl font-extrabold text-[var(--color-brown-800)]">My Dogs 🐶</h1>
	<button
		onclick={() => (showForm = !showForm)}
		class="bg-[var(--color-peach-500)] text-white font-bold px-5 py-2 rounded-2xl hover:bg-[var(--color-peach-400)] transition text-sm"
	>
		{showForm ? 'Cancel' : '+ Add Dog'}
	</button>
</div>

{#if showForm}
	<div class="bg-white rounded-3xl shadow-sm p-6 mb-6">
		<h2 class="font-bold text-[var(--color-brown-800)] mb-4">Add a new dog</h2>
		{#if form?.error}
			<p class="text-red-500 text-sm mb-4">{form.error}</p>
		{/if}
		<form
			method="POST"
			action="?/create"
			use:enhance={() => {
				saving = true;
				return async ({ update }) => { saving = false; await update(); };
			}}
			class="grid grid-cols-2 gap-4"
		>
			<div class="flex flex-col gap-1">
				<label class="text-xs font-semibold text-[var(--color-brown-700)]">Name *</label>
				<input name="name" required class="border border-[var(--color-sage-200)] rounded-xl px-3 py-2 text-sm" />
			</div>
			<div class="flex flex-col gap-1">
				<label class="text-xs font-semibold text-[var(--color-brown-700)]">Breed</label>
				<input name="breed" class="border border-[var(--color-sage-200)] rounded-xl px-3 py-2 text-sm" />
			</div>
			<div class="flex flex-col gap-1">
				<label class="text-xs font-semibold text-[var(--color-brown-700)]">Age (years)</label>
				<input name="age" type="number" min="0" class="border border-[var(--color-sage-200)] rounded-xl px-3 py-2 text-sm" />
			</div>
			<div class="flex flex-col gap-1">
				<label class="text-xs font-semibold text-[var(--color-brown-700)]">Notes</label>
				<input name="notes" placeholder="Allergies, temperament…" class="border border-[var(--color-sage-200)] rounded-xl px-3 py-2 text-sm" />
			</div>
			<button
				type="submit"
				disabled={saving}
				class="col-span-2 bg-[var(--color-sage-500)] text-white font-bold py-2.5 rounded-2xl hover:bg-[var(--color-sage-600)] transition disabled:opacity-60"
			>
				{saving ? 'Saving…' : 'Save Dog'}
			</button>
		</form>
	</div>
{/if}

{#if data.dogs.length === 0}
	<div class="bg-[var(--color-sage-50)] rounded-3xl p-8 text-center text-[var(--color-sage-600)]">
		<div class="text-4xl mb-2">🐾</div>
		<p>No dogs yet. Add your first pup!</p>
	</div>
{:else}
	<div class="grid gap-4">
		{#each data.dogs as dog (dog.id)}
			<div class="bg-white rounded-3xl shadow-sm p-5 flex items-center justify-between">
				<div>
					<p class="font-bold text-[var(--color-brown-800)]">{dog.name}</p>
					<p class="text-sm text-[var(--color-sage-600)]">{dog.breed || 'Unknown breed'}{dog.age ? `, ${dog.age} yrs` : ''}</p>
					{#if dog.notes}<p class="text-xs text-[var(--color-brown-700)] mt-0.5">{dog.notes}</p>{/if}
				</div>
				<a href="/client/dogs/{dog.id}" class="text-xs font-semibold text-[var(--color-sage-500)] hover:underline">Edit</a>
			</div>
		{/each}
	</div>
{/if}
