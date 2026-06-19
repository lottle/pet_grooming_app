<script lang="ts">
	import { enhance } from '$app/forms';
	import { format, addDays } from 'date-fns';
	import type { Service } from '$lib/types';

	let { data, form } = $props();

	let step = $state(1);
	let selectedService = $state<Service | null>(null);
	let selectedDogId = $state('');
	let selectedDate = $state('');
	let selectedTime = $state('');
	let saving = $state(false);

	const today = format(new Date(), 'yyyy-MM-dd');
	const maxDate = format(addDays(new Date(), 60), 'yyyy-MM-dd');

	const timeSlots = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
		'13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'];

	const startsAt = $derived(
		selectedDate && selectedTime ? `${selectedDate}T${selectedTime}:00` : ''
	);
</script>

<svelte:head><title>New Booking – Pawfect</title></svelte:head>

<a href="/client/bookings" class="fs-sm text-sage text-decoration-none hover-underline d-block mb-4">← Back</a>
<h1 class="fs-3 fw-bolder text-brown-800 mb-4">Book a Session 🐾</h1>

<!-- Progress steps -->
<div class="d-flex gap-2 mb-4">
	{#each [1, 2, 3, 4] as s}
		<div class="flex-grow-1 rounded-pill {step >= s ? 'bg-peach-400' : 'bg-sage-100'}" style="height: 0.5rem;"></div>
	{/each}
</div>

{#if form?.error}
	<div class="alert alert-danger fs-sm">{form.error}</div>
{/if}

{#if step === 1}
	<div>
		<h2 class="fw-bold text-brown mb-3">Choose a service</h2>
		<div class="d-flex flex-column gap-3">
			{#each data.services as service (service.id)}
				<button
					onclick={() => { selectedService = service; step = 2; }}
					class="card-custom p-4 text-start w-100 border border-2 hover-shadow btn-plain {selectedService?.id === service.id ? 'border-peach-400' : 'border-transparent'}"
				>
					<div class="d-flex justify-content-between align-items-start">
						<div>
							<p class="fw-bold text-brown-800 mb-1">{service.name}</p>
							<p class="fs-sm text-sage-600 mb-0">{service.description}</p>
						</div>
						<div class="text-end ms-3 flex-shrink-0">
							<p class="fw-bold text-peach mb-0">£{Number(service.price).toFixed(2)}</p>
							<p class="fs-xs text-sage mb-0">{service.duration} min</p>
						</div>
					</div>
				</button>
			{/each}
		</div>
	</div>
{/if}

{#if step === 2}
	<div>
		<h2 class="fw-bold text-brown mb-3">Which dog?</h2>
		{#if data.dogs.length === 0}
			<div class="card-peach p-4 text-center">
				<p class="text-brown mb-2">No dogs in your profile yet.</p>
				<a href="/client/dogs" class="fw-bold text-peach text-decoration-none hover-underline">Add a dog first →</a>
			</div>
		{:else}
			<div class="d-flex flex-column gap-3">
				{#each data.dogs as dog (dog.id)}
					<button
						onclick={() => { selectedDogId = dog.id; step = 3; }}
						class="card-custom p-4 text-start w-100 border border-2 hover-shadow btn-plain {selectedDogId === dog.id ? 'border-peach-400' : 'border-transparent'}"
					>
						<p class="fw-bold text-brown-800 mb-1">{dog.name}</p>
						<p class="fs-sm text-sage-600 mb-0">{dog.breed || 'Unknown breed'}{dog.age ? `, ${dog.age} yrs` : ''}</p>
					</button>
				{/each}
			</div>
			<button onclick={() => (step = 1)} class="btn-plain text-sage fs-sm mt-3 hover-underline">← Back</button>
		{/if}
	</div>
{/if}

{#if step === 3}
	<div>
		<h2 class="fw-bold text-brown mb-3">Pick a date &amp; time</h2>
		<div class="card-custom p-4">
			<label class="form-label fs-xs fw-semibold text-brown">Date</label>
			<input
				type="date"
				bind:value={selectedDate}
				min={today}
				max={maxDate}
				class="form-control input-custom fs-sm mb-4"
			/>

			{#if selectedDate}
				<label class="form-label fs-xs fw-semibold text-brown">Time</label>
				<div class="row g-2">
					{#each timeSlots as slot}
						<div class="col-3">
							<button
								type="button"
								onclick={() => (selectedTime = slot)}
								class="btn w-100 py-2 fs-sm fw-semibold rounded-4 border {selectedTime === slot ? 'btn-peach border-peach-400' : 'border-sage-200 text-brown'}"
							>
								{slot}
							</button>
						</div>
					{/each}
				</div>
			{/if}
		</div>
		<div class="d-flex gap-3 mt-3">
			<button onclick={() => (step = 2)} class="btn-plain text-sage fs-sm hover-underline">← Back</button>
			{#if selectedDate && selectedTime}
				<button onclick={() => (step = 4)} class="btn btn-peach fw-bold px-4 py-2 fs-sm">
					Continue →
				</button>
			{/if}
		</div>
	</div>
{/if}

{#if step === 4 && selectedService}
	<div class="card-custom p-4">
		<h2 class="fw-bold text-brown mb-4">Confirm booking</h2>
		<div class="d-flex flex-column gap-2 mb-4 fs-sm">
			<div class="d-flex justify-content-between"><span class="text-sage-600">Service</span><span class="fw-bold">{selectedService.name}</span></div>
			<div class="d-flex justify-content-between"><span class="text-sage-600">Dog</span><span class="fw-bold">{data.dogs.find((d) => d.id === selectedDogId)?.name}</span></div>
			<div class="d-flex justify-content-between"><span class="text-sage-600">Date &amp; time</span><span class="fw-bold">{format(new Date(`${selectedDate}T${selectedTime}:00`), 'EEE d MMM, h:mm a')}</span></div>
			<div class="d-flex justify-content-between"><span class="text-sage-600">Duration</span><span class="fw-bold">{selectedService.duration} min</span></div>
			<div class="d-flex justify-content-between border-top pt-2 mt-1"><span class="fw-bold">Total</span><span class="fw-bold text-peach">£{Number(selectedService.price).toFixed(2)}</span></div>
		</div>

		<form method="POST" use:enhance={() => { saving = true; return async ({ update }) => { saving = false; await update(); }; }}>
			<input type="hidden" name="service_id" value={selectedService.id} />
			<input type="hidden" name="dog_id" value={selectedDogId} />
			<input type="hidden" name="starts_at" value={startsAt} />
			<div class="mb-3">
				<label class="form-label fs-xs fw-semibold text-brown">Notes (optional)</label>
				<textarea name="notes" rows="2" placeholder="Anything the groomer should know…" class="form-control input-custom fs-sm" style="resize: none"></textarea>
			</div>
			<button
				type="submit"
				disabled={saving}
				class="btn btn-sage fw-bold py-2 w-100"
			>
				{saving ? 'Booking…' : 'Confirm Booking'}
			</button>
		</form>
		<button onclick={() => (step = 3)} class="btn-plain text-sage fs-sm mt-3 w-100 text-center hover-underline">← Back</button>
	</div>
{/if}
