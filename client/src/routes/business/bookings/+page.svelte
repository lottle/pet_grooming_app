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

<h1 class="text-2xl font-extrabold text-[var(--color-brown-800)] mb-6">All Bookings 📋</h1>

{#if form?.error}
	<div class="bg-red-50 text-red-600 text-sm rounded-xl px-4 py-3 mb-5">{form.error}</div>
{/if}

{#if confirmed.length > 0}
	<h2 class="font-bold text-[var(--color-brown-700)] mb-3">Upcoming / Confirmed</h2>
	<div class="flex flex-col gap-3 mb-8">
		{#each confirmed as booking (booking.id)}
			<div class="bg-white rounded-3xl shadow-sm p-5">
				<div class="flex items-start justify-between">
					<div>
						<p class="font-bold text-[var(--color-brown-800)]">{booking.service_snapshot?.name}</p>
						<p class="text-sm text-[var(--color-sage-600)]">{booking.client?.name} · {booking.dog?.name} ({booking.dog?.breed})</p>
						<p class="text-xs text-[var(--color-brown-700)] mt-1">{format(new Date(booking.starts_at), 'EEE d MMM yyyy, h:mm a')}</p>
					</div>
					<div class="flex gap-3 items-center shrink-0 ml-4">
						<button
							onclick={() => reschedulingId = reschedulingId === booking.id ? null : booking.id}
							class="text-xs font-semibold text-[var(--color-sage-500)] hover:underline"
						>
							Reschedule
						</button>
						<form method="POST" action="?/cancel" use:enhance>
							<input type="hidden" name="id" value={booking.id} />
							<button type="submit" onclick={(e) => { if (!confirm('Cancel this booking?')) e.preventDefault(); }} class="text-xs font-semibold text-red-400 hover:text-red-600">Cancel</button>
						</form>
					</div>
				</div>

				{#if reschedulingId === booking.id}
					<form method="POST" action="?/reschedule" use:enhance={() => { saving = true; return async ({ update }) => { saving = false; reschedulingId = null; await update(); }; }} class="mt-4 flex gap-3 items-end border-t pt-4">
						<div class="flex flex-col gap-1 flex-1">
							<label class="text-xs font-semibold text-[var(--color-brown-700)]">New date &amp; time</label>
							<input type="datetime-local" name="starts_at" bind:value={newDateTime} required class="border border-[var(--color-sage-200)] rounded-xl px-3 py-2 text-sm" />
						</div>
						<input type="hidden" name="id" value={booking.id} />
						<button type="submit" disabled={saving} class="bg-[var(--color-peach-500)] text-white font-bold px-5 py-2 rounded-2xl text-sm hover:bg-[var(--color-peach-400)] transition disabled:opacity-60">
							{saving ? 'Saving…' : 'Confirm'}
						</button>
						<button type="button" onclick={() => (reschedulingId = null)} class="text-sm text-[var(--color-sage-500)] hover:underline">Cancel</button>
					</form>
				{/if}
			</div>
		{/each}
	</div>
{/if}

{#if cancelled.length > 0}
	<h2 class="font-bold text-[var(--color-brown-700)] mb-3">Cancelled</h2>
	<div class="flex flex-col gap-3">
		{#each cancelled as booking (booking.id)}
			<div class="bg-white rounded-3xl shadow-sm p-5 opacity-60 flex items-center justify-between">
				<div>
					<p class="font-bold text-[var(--color-brown-800)]">{booking.service_snapshot?.name}</p>
					<p class="text-sm text-[var(--color-sage-600)]">{booking.client?.name} · {booking.dog?.name}</p>
					<p class="text-xs text-[var(--color-brown-700)] mt-1">{format(new Date(booking.starts_at), 'EEE d MMM yyyy, h:mm a')}</p>
				</div>
				<span class="bg-red-50 text-red-500 text-xs font-bold px-3 py-1 rounded-full">Cancelled</span>
			</div>
		{/each}
	</div>
{/if}

{#if data.bookings.length === 0}
	<div class="bg-[var(--color-sage-50)] rounded-3xl p-8 text-center text-[var(--color-sage-600)]">
		<p>No bookings yet.</p>
	</div>
{/if}
