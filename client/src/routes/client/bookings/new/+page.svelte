<script lang="ts">
	import { enhance } from '$app/forms';
	import { format, addDays, setHours, setMinutes } from 'date-fns';
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

<a href="/client/bookings" class="text-sm text-[var(--color-sage-500)] hover:underline mb-6 block">← Back</a>
<h1 class="text-2xl font-extrabold text-[var(--color-brown-800)] mb-6">Book a Session 🐾</h1>

<!-- Progress -->
<div class="flex gap-2 mb-8">
	{#each [1, 2, 3, 4] as s}
		<div class="flex-1 h-2 rounded-full {step >= s ? 'bg-[var(--color-peach-400)]' : 'bg-[var(--color-sage-100)]'}"></div>
	{/each}
</div>

{#if form?.error}
	<div class="bg-red-50 text-red-600 text-sm rounded-xl px-4 py-3 mb-5">{form.error}</div>
{/if}

{#if step === 1}
	<div>
		<h2 class="font-bold text-[var(--color-brown-700)] mb-4">Choose a service</h2>
		<div class="flex flex-col gap-3">
			{#each data.services as service (service.id)}
				<button
					onclick={() => { selectedService = service; step = 2; }}
					class="bg-white rounded-3xl shadow-sm p-5 text-left hover:shadow-md transition border-2 {selectedService?.id === service.id ? 'border-[var(--color-peach-400)]' : 'border-transparent'}"
				>
					<div class="flex justify-between items-start">
						<div>
							<p class="font-bold text-[var(--color-brown-800)]">{service.name}</p>
							<p class="text-sm text-[var(--color-sage-600)] mt-0.5">{service.description}</p>
						</div>
						<div class="text-right ml-4 shrink-0">
							<p class="font-bold text-[var(--color-peach-500)]">£{Number(service.price).toFixed(2)}</p>
							<p class="text-xs text-[var(--color-sage-500)]">{service.duration} min</p>
						</div>
					</div>
				</button>
			{/each}
		</div>
	</div>
{/if}

{#if step === 2}
	<div>
		<h2 class="font-bold text-[var(--color-brown-700)] mb-4">Which dog?</h2>
		{#if data.dogs.length === 0}
			<div class="bg-[var(--color-peach-100)] rounded-3xl p-6 text-center">
				<p class="text-[var(--color-brown-700)] mb-3">No dogs in your profile yet.</p>
				<a href="/client/dogs" class="font-bold text-[var(--color-peach-500)] hover:underline">Add a dog first →</a>
			</div>
		{:else}
			<div class="flex flex-col gap-3">
				{#each data.dogs as dog (dog.id)}
					<button
						onclick={() => { selectedDogId = dog.id; step = 3; }}
						class="bg-white rounded-3xl shadow-sm p-5 text-left hover:shadow-md transition border-2 {selectedDogId === dog.id ? 'border-[var(--color-peach-400)]' : 'border-transparent'}"
					>
						<p class="font-bold text-[var(--color-brown-800)]">{dog.name}</p>
						<p class="text-sm text-[var(--color-sage-600)]">{dog.breed || 'Unknown breed'}{dog.age ? `, ${dog.age} yrs` : ''}</p>
					</button>
				{/each}
			</div>
			<button onclick={() => (step = 1)} class="mt-4 text-sm text-[var(--color-sage-500)] hover:underline">← Back</button>
		{/if}
	</div>
{/if}

{#if step === 3}
	<div>
		<h2 class="font-bold text-[var(--color-brown-700)] mb-4">Pick a date &amp; time</h2>
		<div class="bg-white rounded-3xl shadow-sm p-6">
			<label class="text-xs font-semibold text-[var(--color-brown-700)] block mb-1">Date</label>
			<input
				type="date"
				bind:value={selectedDate}
				min={today}
				max={maxDate}
				class="border border-[var(--color-sage-200)] rounded-xl px-3 py-2 text-sm w-full mb-5"
			/>

			{#if selectedDate}
				<label class="text-xs font-semibold text-[var(--color-brown-700)] block mb-2">Time</label>
				<div class="grid grid-cols-4 gap-2">
					{#each timeSlots as slot}
						<button
							type="button"
							onclick={() => (selectedTime = slot)}
							class="py-2 rounded-xl text-sm font-semibold transition border {selectedTime === slot ? 'bg-[var(--color-peach-400)] text-white border-[var(--color-peach-400)]' : 'border-[var(--color-sage-200)] text-[var(--color-brown-700)] hover:border-[var(--color-peach-400)]'}"
						>
							{slot}
						</button>
					{/each}
				</div>
			{/if}
		</div>
		<div class="flex gap-3 mt-4">
			<button onclick={() => (step = 2)} class="text-sm text-[var(--color-sage-500)] hover:underline">← Back</button>
			{#if selectedDate && selectedTime}
				<button onclick={() => (step = 4)} class="bg-[var(--color-peach-500)] text-white font-bold px-6 py-2.5 rounded-2xl hover:bg-[var(--color-peach-400)] transition text-sm">
					Continue →
				</button>
			{/if}
		</div>
	</div>
{/if}

{#if step === 4 && selectedService}
	<div class="bg-white rounded-3xl shadow-sm p-6">
		<h2 class="font-bold text-[var(--color-brown-700)] mb-5">Confirm booking</h2>
		<div class="flex flex-col gap-2 mb-6 text-sm">
			<div class="flex justify-between"><span class="text-[var(--color-sage-600)]">Service</span><span class="font-bold">{selectedService.name}</span></div>
			<div class="flex justify-between"><span class="text-[var(--color-sage-600)]">Dog</span><span class="font-bold">{data.dogs.find((d) => d.id === selectedDogId)?.name}</span></div>
			<div class="flex justify-between"><span class="text-[var(--color-sage-600)]">Date &amp; time</span><span class="font-bold">{format(new Date(`${selectedDate}T${selectedTime}:00`), 'EEE d MMM, h:mm a')}</span></div>
			<div class="flex justify-between"><span class="text-[var(--color-sage-600)]">Duration</span><span class="font-bold">{selectedService.duration} min</span></div>
			<div class="flex justify-between border-t pt-2 mt-1"><span class="font-bold">Total</span><span class="font-bold text-[var(--color-peach-500)]">£{Number(selectedService.price).toFixed(2)}</span></div>
		</div>

		<form method="POST" use:enhance={() => { saving = true; return async ({ update }) => { saving = false; await update(); }; }}>
			<input type="hidden" name="service_id" value={selectedService.id} />
			<input type="hidden" name="dog_id" value={selectedDogId} />
			<input type="hidden" name="starts_at" value={startsAt} />
			<div class="flex flex-col gap-1 mb-4">
				<label class="text-xs font-semibold text-[var(--color-brown-700)]">Notes (optional)</label>
				<textarea name="notes" rows="2" placeholder="Anything the groomer should know…" class="border border-[var(--color-sage-200)] rounded-xl px-3 py-2 text-sm resize-none"></textarea>
			</div>
			<button
				type="submit"
				disabled={saving}
				class="w-full bg-[var(--color-sage-500)] text-white font-bold py-3 rounded-2xl hover:bg-[var(--color-sage-600)] transition disabled:opacity-60"
			>
				{saving ? 'Booking…' : 'Confirm Booking'}
			</button>
		</form>
		<button onclick={() => (step = 3)} class="mt-3 text-sm text-[var(--color-sage-500)] hover:underline w-full text-center">← Back</button>
	</div>
{/if}
