<script lang="ts">
	import { enhance } from '$app/forms';

	let { data, form } = $props();
	let saving = $state(false);
</script>

<svelte:head><title>Edit {data.dog.name} – Pawfect</title></svelte:head>

<a href="/client/dogs" class="text-sm text-[var(--color-sage-500)] hover:underline mb-6 block">← Back to dogs</a>

<div class="bg-white rounded-3xl shadow-sm p-8 max-w-lg">
	<h1 class="text-xl font-extrabold text-[var(--color-brown-800)] mb-6">Edit {data.dog.name}</h1>

	{#if form?.error}
		<p class="text-red-500 text-sm mb-4">{form.error}</p>
	{/if}

	<form
		method="POST"
		action="?/update"
		use:enhance={() => {
			saving = true;
			return async ({ update }) => { saving = false; await update(); };
		}}
		class="flex flex-col gap-4"
	>
		<div class="flex flex-col gap-1">
			<label class="text-xs font-semibold text-[var(--color-brown-700)]">Name *</label>
			<input name="name" value={data.dog.name} required class="border border-[var(--color-sage-200)] rounded-xl px-3 py-2 text-sm" />
		</div>
		<div class="flex flex-col gap-1">
			<label class="text-xs font-semibold text-[var(--color-brown-700)]">Breed</label>
			<input name="breed" value={data.dog.breed ?? ''} class="border border-[var(--color-sage-200)] rounded-xl px-3 py-2 text-sm" />
		</div>
		<div class="flex flex-col gap-1">
			<label class="text-xs font-semibold text-[var(--color-brown-700)]">Age (years)</label>
			<input name="age" type="number" value={data.dog.age ?? ''} min="0" class="border border-[var(--color-sage-200)] rounded-xl px-3 py-2 text-sm" />
		</div>
		<div class="flex flex-col gap-1">
			<label class="text-xs font-semibold text-[var(--color-brown-700)]">Notes</label>
			<textarea name="notes" rows="3" class="border border-[var(--color-sage-200)] rounded-xl px-3 py-2 text-sm resize-none">{data.dog.notes ?? ''}</textarea>
		</div>
		<button
			type="submit"
			disabled={saving}
			class="bg-[var(--color-sage-500)] text-white font-bold py-2.5 rounded-2xl hover:bg-[var(--color-sage-600)] transition disabled:opacity-60"
		>
			{saving ? 'Saving…' : 'Save Changes'}
		</button>
	</form>

	<form method="POST" action="?/delete" class="mt-4">
		<button
			type="submit"
			onclick={(e) => { if (!confirm(`Remove ${data.dog.name}?`)) e.preventDefault(); }}
			class="w-full text-red-500 text-sm font-semibold py-2 hover:underline"
		>
			Remove this dog
		</button>
	</form>
</div>
