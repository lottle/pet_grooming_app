<script lang="ts">
	import { enhance } from '$app/forms';
	import { format } from 'date-fns';
	import type { Booking } from '$lib/types';

	let { data, form } = $props();
	let reschedulingId = $state<string | null>(null);
	let newDateTime = $state('');
	let saving = $state(false);

	const confirmed = $derived(data.bookings.filter((b) => b.status === 'confirmed'));
	const cancelled = $derived(data.bookings.filter((b) => b.status === 'cancelled'));
</script>

<svelte:head><title>Bookings – Pawfect Business</title></svelte:head>

<h1 class="fs-3 fw-bolder text-brown-800 mb-4">All Bookings 📋</h1>

{#if form?.error}
	<div class="alert alert-danger fs-sm">{form.error}</div>
{/if}

{#if confirmed.length > 0}
	<h2 class="fw-bold text-brown mb-2">Upcoming / Confirmed</h2>
	<div class="d-flex flex-column gap-3 mb-4">
		{#each confirmed as booking (booking.id)}
			<div class="card-custom p-4">
				<div class="d-flex align-items-start justify-content-between">
					<div>
						<p class="fw-bold text-brown-800 mb-0">{booking.service_snapshot?.name}</p>
						<p class="fs-sm text-sage-600 mb-0">{booking.client?.name} · {booking.dog?.name} ({booking.dog?.breed})</p>
						<p class="fs-xs text-brown mt-1 mb-0">{format(new Date(booking.starts_at), 'EEE d MMM yyyy, h:mm a')}</p>
					</div>
					<div class="d-flex gap-3 align-items-center flex-shrink-0 ms-3">
						<button
							onclick={() => reschedulingId = reschedulingId === booking.id ? null : booking.id}
							class="btn-plain fs-xs fw-semibold text-sage hover-underline"
						>
							Reschedule
						</button>
						<form method="POST" action="?/cancel" use:enhance>
							<input type="hidden" name="id" value={booking.id} />
							<button type="submit" onclick={(e) => { if (!confirm('Cancel this booking?')) e.preventDefault(); }} class="btn-plain fs-xs fw-semibold text-danger">Cancel</button>
						</form>
					</div>
				</div>

				{#if reschedulingId === booking.id}
					<form method="POST" action="?/reschedule" use:enhance={() => { saving = true; return async ({ update }) => { saving = false; reschedulingId = null; await update(); }; }} class="mt-3 d-flex gap-3 align-items-end border-top pt-3">
						<div class="flex-grow-1">
							<label class="form-label fs-xs fw-semibold text-brown">New date &amp; time</label>
							<input type="datetime-local" name="starts_at" bind:value={newDateTime} required class="form-control input-custom fs-sm" />
						</div>
						<input type="hidden" name="id" value={booking.id} />
						<button type="submit" disabled={saving} class="btn btn-peach fw-bold px-4 py-2 fs-sm">
							{saving ? 'Saving…' : 'Confirm'}
						</button>
						<button type="button" onclick={() => (reschedulingId = null)} class="btn-plain text-sage fs-sm hover-underline">Cancel</button>
					</form>
				{/if}
			</div>
		{/each}
	</div>
{/if}

{#if cancelled.length > 0}
	<h2 class="fw-bold text-brown mb-2">Cancelled</h2>
	<div class="d-flex flex-column gap-3">
		{#each cancelled as booking (booking.id)}
			<div class="card-custom p-4 opacity-75 d-flex align-items-center justify-content-between">
				<div>
					<p class="fw-bold text-brown-800 mb-0">{booking.service_snapshot?.name}</p>
					<p class="fs-sm text-sage-600 mb-0">{booking.client?.name} · {booking.dog?.name}</p>
					<p class="fs-xs text-brown mt-1 mb-0">{format(new Date(booking.starts_at), 'EEE d MMM yyyy, h:mm a')}</p>
				</div>
				<span class="badge rounded-pill bg-danger-subtle text-danger fs-xs fw-bold px-3 py-1">Cancelled</span>
			</div>
		{/each}
	</div>
{/if}

{#if data.bookings.length === 0}
	<div class="card-sage p-4 text-center text-sage-600">
		<p class="mb-0">No bookings yet.</p>
	</div>
{/if}
