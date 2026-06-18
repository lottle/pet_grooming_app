<script lang="ts">
	import { enhance } from '$app/forms';
	import { format } from 'date-fns';

	let { data } = $props();

	const upcoming = $derived(data.bookings.filter((b) => b.status === 'confirmed' && new Date(b.starts_at) >= new Date()));
	const past = $derived(data.bookings.filter((b) => b.status !== 'confirmed' || new Date(b.starts_at) < new Date()));
</script>

<svelte:head><title>Bookings – Pawfect</title></svelte:head>

<div class="flex items-center justify-between mb-6">
	<h1 class="text-2xl font-extrabold text-[var(--color-brown-800)]">My Bookings 📅</h1>
	<a href="/client/bookings/new" class="bg-[var(--color-peach-500)] text-white font-bold px-5 py-2 rounded-2xl text-sm hover:bg-[var(--color-peach-400)] transition">
		+ New booking
	</a>
</div>

{#if upcoming.length > 0}
	<h2 class="font-bold text-[var(--color-brown-700)] mb-3">Upcoming</h2>
	<div class="flex flex-col gap-3 mb-8">
		{#each upcoming as booking (booking.id)}
			<div class="bg-white rounded-3xl shadow-sm p-5 flex items-center justify-between">
				<div>
					<p class="font-bold text-[var(--color-brown-800)]">{booking.service_snapshot?.name}</p>
					<p class="text-sm text-[var(--color-sage-600)]">{booking.dog.name}</p>
					<p class="text-xs text-[var(--color-brown-700)] mt-1">{format(new Date(booking.starts_at), 'EEE d MMM, h:mm a')}</p>
				</div>
				<div class="flex items-center gap-3">
					<span class="bg-[var(--color-sage-100)] text-[var(--color-sage-700)] text-xs font-bold px-3 py-1 rounded-full">Confirmed</span>
					<form method="POST" action="?/cancel" use:enhance>
						<input type="hidden" name="id" value={booking.id} />
						<button type="submit" onclick={(e) => { if (!confirm('Cancel this booking?')) e.preventDefault(); }} class="text-xs text-red-400 hover:text-red-600 font-semibold">Cancel</button>
					</form>
				</div>
			</div>
		{/each}
	</div>
{/if}

{#if past.length > 0}
	<h2 class="font-bold text-[var(--color-brown-700)] mb-3">Past</h2>
	<div class="flex flex-col gap-3">
		{#each past as booking (booking.id)}
			<div class="bg-white rounded-3xl shadow-sm p-5 flex items-center justify-between opacity-70">
				<div>
					<p class="font-bold text-[var(--color-brown-800)]">{booking.service_snapshot?.name}</p>
					<p class="text-sm text-[var(--color-sage-600)]">{booking.dog.name}</p>
					<p class="text-xs text-[var(--color-brown-700)] mt-1">{format(new Date(booking.starts_at), 'EEE d MMM, h:mm a')}</p>
				</div>
				<span class="text-xs font-bold px-3 py-1 rounded-full {booking.status === 'cancelled' ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-500'}">
					{booking.status === 'cancelled' ? 'Cancelled' : 'Completed'}
				</span>
			</div>
		{/each}
	</div>
{/if}

{#if data.bookings.length === 0}
	<div class="bg-[var(--color-sage-50)] rounded-3xl p-8 text-center text-[var(--color-sage-600)]">
		<p>No bookings yet. <a href="/client/bookings/new" class="font-semibold text-[var(--color-peach-500)]">Book your first session!</a></p>
	</div>
{/if}
