<script lang="ts">
	import { enhance } from '$app/forms';
	import { format } from 'date-fns';

	let { data } = $props();

	const upcoming = $derived(data.bookings.filter((b) => b.status === 'confirmed' && new Date(b.starts_at) >= new Date()));
	const past = $derived(data.bookings.filter((b) => b.status !== 'confirmed' || new Date(b.starts_at) < new Date()));
</script>

<svelte:head><title>Bookings – Pawfect</title></svelte:head>

<div class="d-flex align-items-center justify-content-between mb-4">
	<h1 class="fs-3 fw-bolder text-brown-800 mb-0">My Bookings 📅</h1>
	<a href="/client/bookings/new" class="btn btn-peach fw-bold fs-sm px-4 py-2">+ New booking</a>
</div>

{#if upcoming.length > 0}
	<h2 class="fw-bold text-brown mb-2">Upcoming</h2>
	<div class="d-flex flex-column gap-3 mb-4">
		{#each upcoming as booking (booking.id)}
			<div class="card-custom p-4 d-flex align-items-center justify-content-between">
				<div>
					<p class="fw-bold text-brown-800 mb-0">{booking.service_snapshot?.name}</p>
					<p class="fs-sm text-sage-600 mb-0">{booking.dog.name}</p>
					<p class="fs-xs text-brown mt-1 mb-0">{format(new Date(booking.starts_at), 'EEE d MMM, h:mm a')}</p>
				</div>
				<div class="d-flex align-items-center gap-3">
					<span class="badge rounded-pill badge-sage fs-xs fw-bold px-3 py-1">Confirmed</span>
					<form method="POST" action="?/cancel" use:enhance>
						<input type="hidden" name="id" value={booking.id} />
						<button type="submit" onclick={(e) => { if (!confirm('Cancel this booking?')) e.preventDefault(); }} class="btn-plain fs-xs fw-semibold text-danger">Cancel</button>
					</form>
				</div>
			</div>
		{/each}
	</div>
{/if}

{#if past.length > 0}
	<h2 class="fw-bold text-brown mb-2">Past</h2>
	<div class="d-flex flex-column gap-3">
		{#each past as booking (booking.id)}
			<div class="card-custom p-4 d-flex align-items-center justify-content-between opacity-75">
				<div>
					<p class="fw-bold text-brown-800 mb-0">{booking.service_snapshot?.name}</p>
					<p class="fs-sm text-sage-600 mb-0">{booking.dog.name}</p>
					<p class="fs-xs text-brown mt-1 mb-0">{format(new Date(booking.starts_at), 'EEE d MMM, h:mm a')}</p>
				</div>
				<span class="badge rounded-pill fs-xs fw-bold px-3 py-1 {booking.status === 'cancelled' ? 'bg-danger-subtle text-danger' : 'bg-secondary-subtle text-secondary'}">
					{booking.status === 'cancelled' ? 'Cancelled' : 'Completed'}
				</span>
			</div>
		{/each}
	</div>
{/if}

{#if data.bookings.length === 0}
	<div class="card-sage p-4 text-center text-sage-600">
		<p class="mb-0">No bookings yet. <a href="/client/bookings/new" class="fw-semibold text-peach text-decoration-none hover-underline">Book your first session!</a></p>
	</div>
{/if}
