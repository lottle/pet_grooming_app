<script lang="ts">
	import { enhance } from '$app/forms';

	let { data, form } = $props();
	let saving = $state(false);
</script>

<svelte:head><title>Edit {data.dog.name} – Pawfect</title></svelte:head>

<a href="/client/dogs" class="fs-sm text-sage text-decoration-none hover-underline d-block mb-4">← Back to dogs</a>

<div class="card-custom p-4 mw-lg">
	<h1 class="fs-4 fw-bolder text-brown-800 mb-4">Edit {data.dog.name}</h1>

	{#if form?.error}
		<p class="text-danger fs-sm mb-3">{form.error}</p>
	{/if}

	<form
		method="POST"
		action="?/update"
		use:enhance={() => {
			saving = true;
			return async ({ update }) => { saving = false; await update(); };
		}}
		class="d-flex flex-column gap-3"
	>
		<div>
			<label class="form-label fs-xs fw-semibold text-brown">Name *</label>
			<input name="name" value={data.dog.name} required class="form-control input-custom fs-sm" />
		</div>
		<div>
			<label class="form-label fs-xs fw-semibold text-brown">Breed</label>
			<input name="breed" value={data.dog.breed ?? ''} class="form-control input-custom fs-sm" />
		</div>
		<div>
			<label class="form-label fs-xs fw-semibold text-brown">Age (years)</label>
			<input name="age" type="number" value={data.dog.age ?? ''} min="0" class="form-control input-custom fs-sm" />
		</div>
		<div>
			<label class="form-label fs-xs fw-semibold text-brown">Notes</label>
			<textarea name="notes" rows="3" class="form-control input-custom fs-sm" style="resize: none">{data.dog.notes ?? ''}</textarea>
		</div>
		<button
			type="submit"
			disabled={saving}
			class="btn btn-sage fw-bold py-2"
		>
			{saving ? 'Saving…' : 'Save Changes'}
		</button>
	</form>

	<form method="POST" action="?/delete" class="mt-3">
		<button
			type="submit"
			onclick={(e) => { if (!confirm(`Remove ${data.dog.name}?`)) e.preventDefault(); }}
			class="btn-plain text-danger fs-sm fw-semibold w-100 text-center hover-underline"
		>
			Remove this dog
		</button>
	</form>
</div>
