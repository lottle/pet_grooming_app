<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Service } from '$lib/types';

	let { data, form } = $props();
	let showForm = $state(false);
	let editingService = $state<Service | null>(null);
	let saving = $state(false);

	function startEdit(s: Service) {
		editingService = s;
		showForm = false;
	}

	function cancelEdit() {
		editingService = null;
	}
</script>

<svelte:head><title>Services – Pawfect Business</title></svelte:head>

<div class="flex items-center justify-between mb-6">
	<h1 class="text-2xl font-extrabold text-[var(--color-brown-800)]">Grooming Services ✂️</h1>
	<button
		onclick={() => { showForm = !showForm; editingService = null; }}
		class="bg-[var(--color-sage-500)] text-white font-bold px-5 py-2 rounded-2xl hover:bg-[var(--color-sage-600)] transition text-sm"
	>
		{showForm ? 'Cancel' : '+ Add Service'}
	</button>
</div>

{#if form?.error}
	<div class="bg-red-50 text-red-600 text-sm rounded-xl px-4 py-3 mb-5">{form.error}</div>
{/if}

{#if showForm}
	<div class="bg-white rounded-3xl shadow-sm p-6 mb-6">
		<h2 class="font-bold text-[var(--color-brown-800)] mb-4">New service</h2>
		<form method="POST" action="?/create" use:enhance={() => { saving = true; return async ({ update }) => { saving = false; showForm = false; await update(); }; }} class="grid grid-cols-2 gap-4">
			<div class="flex flex-col gap-1">
				<label class="text-xs font-semibold text-[var(--color-brown-700)]">Name *</label>
				<input name="name" required class="border border-[var(--color-sage-200)] rounded-xl px-3 py-2 text-sm" />
			</div>
			<div class="flex flex-col gap-1">
				<label class="text-xs font-semibold text-[var(--color-brown-700)]">Duration (minutes) *</label>
				<input name="duration" type="number" min="1" required class="border border-[var(--color-sage-200)] rounded-xl px-3 py-2 text-sm" />
			</div>
			<div class="flex flex-col gap-1">
				<label class="text-xs font-semibold text-[var(--color-brown-700)]">Price (£) *</label>
				<input name="price" type="number" min="0" step="0.01" required class="border border-[var(--color-sage-200)] rounded-xl px-3 py-2 text-sm" />
			</div>
			<div class="flex flex-col gap-1">
				<label class="text-xs font-semibold text-[var(--color-brown-700)]">Description</label>
				<input name="description" class="border border-[var(--color-sage-200)] rounded-xl px-3 py-2 text-sm" />
			</div>
			<button type="submit" disabled={saving} class="col-span-2 bg-[var(--color-sage-500)] text-white font-bold py-2.5 rounded-2xl hover:bg-[var(--color-sage-600)] transition disabled:opacity-60">
				{saving ? 'Saving…' : 'Add Service'}
			</button>
		</form>
	</div>
{/if}

{#if editingService}
	<div class="bg-white rounded-3xl shadow-sm p-6 mb-6 border-2 border-[var(--color-peach-200)]">
		<h2 class="font-bold text-[var(--color-brown-800)] mb-4">Edit service</h2>
		<form method="POST" action="?/update" use:enhance={() => { saving = true; return async ({ update }) => { saving = false; editingService = null; await update(); }; }} class="grid grid-cols-2 gap-4">
			<input type="hidden" name="id" value={editingService.id} />
			<div class="flex flex-col gap-1">
				<label class="text-xs font-semibold text-[var(--color-brown-700)]">Name *</label>
				<input name="name" value={editingService.name} required class="border border-[var(--color-sage-200)] rounded-xl px-3 py-2 text-sm" />
			</div>
			<div class="flex flex-col gap-1">
				<label class="text-xs font-semibold text-[var(--color-brown-700)]">Duration (minutes) *</label>
				<input name="duration" type="number" value={editingService.duration} required class="border border-[var(--color-sage-200)] rounded-xl px-3 py-2 text-sm" />
			</div>
			<div class="flex flex-col gap-1">
				<label class="text-xs font-semibold text-[var(--color-brown-700)]">Price (£) *</label>
				<input name="price" type="number" step="0.01" value={editingService.price} required class="border border-[var(--color-sage-200)] rounded-xl px-3 py-2 text-sm" />
			</div>
			<div class="flex flex-col gap-1">
				<label class="text-xs font-semibold text-[var(--color-brown-700)]">Description</label>
				<input name="description" value={editingService.description ?? ''} class="border border-[var(--color-sage-200)] rounded-xl px-3 py-2 text-sm" />
			</div>
			<button type="submit" disabled={saving} class="bg-[var(--color-peach-500)] text-white font-bold py-2.5 rounded-2xl hover:bg-[var(--color-peach-400)] transition disabled:opacity-60">
				{saving ? 'Saving…' : 'Save Changes'}
			</button>
			<button type="button" onclick={cancelEdit} class="border border-[var(--color-sage-200)] text-[var(--color-brown-700)] font-bold py-2.5 rounded-2xl hover:bg-[var(--color-sage-50)] transition">
				Cancel
			</button>
		</form>
	</div>
{/if}

<div class="flex flex-col gap-3">
	{#each data.services as service (service.id)}
		<div class="bg-white rounded-3xl shadow-sm p-5 flex items-center justify-between">
			<div>
				<div class="flex items-center gap-2">
					<p class="font-bold text-[var(--color-brown-800)]">{service.name}</p>
					{#if !service.active}
						<span class="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-full">Inactive</span>
					{/if}
				</div>
				<p class="text-sm text-[var(--color-sage-600)]">{service.description}</p>
				<p class="text-xs text-[var(--color-brown-700)] mt-0.5">{service.duration} min · £{Number(service.price).toFixed(2)}</p>
			</div>
			<div class="flex items-center gap-3">
				<button onclick={() => startEdit(service)} class="text-xs font-semibold text-[var(--color-sage-500)] hover:underline">Edit</button>
				<form method="POST" action="?/delete" use:enhance>
					<input type="hidden" name="id" value={service.id} />
					<button type="submit" onclick={(e) => { if (!confirm('Remove this service?')) e.preventDefault(); }} class="text-xs font-semibold text-red-400 hover:text-red-600">Remove</button>
				</form>
			</div>
		</div>
	{/each}
</div>
