<script lang="ts">
	import { enhance } from '$app/forms';

	let { data, form } = $props();
	let showForm = $state(false);
	let saving = $state(false);
</script>

<svelte:head><title>My Dogs – Pawfect</title></svelte:head>

<div class="d-flex align-items-center justify-content-between mb-4">
	<h1 class="fs-3 fw-bolder text-brown-800 mb-0">My Dogs 🐶</h1>
	<button
		onclick={() => (showForm = !showForm)}
		class="btn btn-peach fw-bold fs-sm px-4 py-2"
	>
		{showForm ? 'Cancel' : '+ Add Dog'}
	</button>
</div>

{#if showForm}
	<div class="card-custom p-4 mb-4">
		<h2 class="fw-bold text-brown-800 mb-3">Add a new dog</h2>
		{#if form?.error}
			<p class="text-danger fs-sm mb-3">{form.error}</p>
		{/if}
		<form
			method="POST"
			action="?/create"
			use:enhance={() => {
				saving = true;
				return async ({ update }) => { saving = false; await update(); };
			}}
			class="row g-3"
		>
			<div class="col-md-6">
				<label class="form-label fs-xs fw-semibold text-brown">Name *</label>
				<input name="name" required class="form-control input-custom fs-sm" />
			</div>
			<div class="col-md-6">
				<label class="form-label fs-xs fw-semibold text-brown">Breed</label>
				<input name="breed" class="form-control input-custom fs-sm" />
			</div>
			<div class="col-md-6">
				<label class="form-label fs-xs fw-semibold text-brown">Age (years)</label>
				<input name="age" type="number" min="0" class="form-control input-custom fs-sm" />
			</div>
			<div class="col-md-6">
				<label class="form-label fs-xs fw-semibold text-brown">Notes</label>
				<input name="notes" placeholder="Allergies, temperament…" class="form-control input-custom fs-sm" />
			</div>
			<div class="col-12">
				<button
					type="submit"
					disabled={saving}
					class="btn btn-sage fw-bold py-2 w-100"
				>
					{saving ? 'Saving…' : 'Save Dog'}
				</button>
			</div>
		</form>
	</div>
{/if}

{#if data.dogs.length === 0}
	<div class="card-sage p-4 text-center text-sage-600">
		<div class="mb-2" style="font-size: 2.5rem;">🐾</div>
		<p class="mb-0">No dogs yet. Add your first pup!</p>
	</div>
{:else}
	<div class="d-flex flex-column gap-3">
		{#each data.dogs as dog (dog.id)}
			<div class="card-custom p-4 d-flex align-items-center justify-content-between">
				<div>
					<p class="fw-bold text-brown-800 mb-0">{dog.name}</p>
					<p class="fs-sm text-sage-600 mb-0">{dog.breed || 'Unknown breed'}{dog.age ? `, ${dog.age} yrs` : ''}</p>
					{#if dog.notes}<p class="fs-xs text-brown mt-1 mb-0">{dog.notes}</p>{/if}
				</div>
				<a href="/client/dogs/{dog.id}" class="fs-xs fw-semibold text-sage text-decoration-none hover-underline">Edit</a>
			</div>
		{/each}
	</div>
{/if}
