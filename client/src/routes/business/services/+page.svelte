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

<div class="d-flex align-items-center justify-content-between mb-4">
	<h1 class="fs-3 fw-bolder text-brown-800 mb-0">Grooming Services ✂️</h1>
	<button
		onclick={() => { showForm = !showForm; editingService = null; }}
		class="btn btn-sage fw-bold fs-sm px-4 py-2"
	>
		{showForm ? 'Cancel' : '+ Add Service'}
	</button>
</div>

{#if form?.error}
	<div class="alert alert-danger fs-sm">{form.error}</div>
{/if}

{#if showForm}
	<div class="card-custom p-4 mb-4">
		<h2 class="fw-bold text-brown-800 mb-3">New service</h2>
		<form method="POST" action="?/create" use:enhance={() => { saving = true; return async ({ update }) => { saving = false; showForm = false; await update(); }; }} class="row g-3">
			<div class="col-md-6">
				<label class="form-label fs-xs fw-semibold text-brown">Name *</label>
				<input name="name" required class="form-control input-custom fs-sm" />
			</div>
			<div class="col-md-6">
				<label class="form-label fs-xs fw-semibold text-brown">Duration (minutes) *</label>
				<input name="duration" type="number" min="1" required class="form-control input-custom fs-sm" />
			</div>
			<div class="col-md-6">
				<label class="form-label fs-xs fw-semibold text-brown">Price (£) *</label>
				<input name="price" type="number" min="0" step="0.01" required class="form-control input-custom fs-sm" />
			</div>
			<div class="col-md-6">
				<label class="form-label fs-xs fw-semibold text-brown">Description</label>
				<input name="description" class="form-control input-custom fs-sm" />
			</div>
			<div class="col-12">
				<button type="submit" disabled={saving} class="btn btn-sage fw-bold py-2 w-100">
					{saving ? 'Saving…' : 'Add Service'}
				</button>
			</div>
		</form>
	</div>
{/if}

{#if editingService}
	<div class="card-custom p-4 mb-4 border border-2 border-peach-200">
		<h2 class="fw-bold text-brown-800 mb-3">Edit service</h2>
		<form method="POST" action="?/update" use:enhance={() => { saving = true; return async ({ update }) => { saving = false; editingService = null; await update(); }; }} class="row g-3">
			<input type="hidden" name="id" value={editingService.id} />
			<div class="col-md-6">
				<label class="form-label fs-xs fw-semibold text-brown">Name *</label>
				<input name="name" value={editingService.name} required class="form-control input-custom fs-sm" />
			</div>
			<div class="col-md-6">
				<label class="form-label fs-xs fw-semibold text-brown">Duration (minutes) *</label>
				<input name="duration" type="number" value={editingService.duration} required class="form-control input-custom fs-sm" />
			</div>
			<div class="col-md-6">
				<label class="form-label fs-xs fw-semibold text-brown">Price (£) *</label>
				<input name="price" type="number" step="0.01" value={editingService.price} required class="form-control input-custom fs-sm" />
			</div>
			<div class="col-md-6">
				<label class="form-label fs-xs fw-semibold text-brown">Description</label>
				<input name="description" value={editingService.description ?? ''} class="form-control input-custom fs-sm" />
			</div>
			<div class="col-md-6">
				<button type="submit" disabled={saving} class="btn btn-peach fw-bold py-2 w-100">
					{saving ? 'Saving…' : 'Save Changes'}
				</button>
			</div>
			<div class="col-md-6">
				<button type="button" onclick={cancelEdit} class="btn border border-sage-200 text-brown fw-bold py-2 w-100 hover-sage-50">
					Cancel
				</button>
			</div>
		</form>
	</div>
{/if}

<div class="d-flex flex-column gap-3">
	{#each data.services as service (service.id)}
		<div class="card-custom p-4 d-flex align-items-center justify-content-between">
			<div>
				<div class="d-flex align-items-center gap-2">
					<p class="fw-bold text-brown-800 mb-0">{service.name}</p>
					{#if !service.active}
						<span class="badge rounded-pill bg-secondary-subtle text-secondary fs-xs">Inactive</span>
					{/if}
				</div>
				<p class="fs-sm text-sage-600 mb-0">{service.description}</p>
				<p class="fs-xs text-brown mt-1 mb-0">{service.duration} min · £{Number(service.price).toFixed(2)}</p>
			</div>
			<div class="d-flex align-items-center gap-3">
				<button onclick={() => startEdit(service)} class="btn-plain fs-xs fw-semibold text-sage hover-underline">Edit</button>
				<form method="POST" action="?/delete" use:enhance>
					<input type="hidden" name="id" value={service.id} />
					<button type="submit" onclick={(e) => { if (!confirm('Remove this service?')) e.preventDefault(); }} class="btn-plain fs-xs fw-semibold text-danger hover-red-600">Remove</button>
				</form>
			</div>
		</div>
	{/each}
</div>
