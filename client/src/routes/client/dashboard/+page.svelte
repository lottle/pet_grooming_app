<script lang="ts">
	import { format } from 'date-fns';
	import { authStore } from '$lib/stores/auth.svelte';
	import type { Booking } from '$lib/types';

	let { data } = $props();
</script>

<svelte:head><title>Dashboard – Pawfect</title></svelte:head>

<h1 class="fs-3 fw-bolder text-brown-800 mb-1">
	Hello, {authStore.user?.name?.split(' ')[0]} 👋
</h1>
<p class="text-sage-600 mb-4">Here are your upcoming appointments.</p>

{#if data.upcoming.length === 0}
	<div class="card-peach p-4 text-center">
		<div class="mb-2" style="font-size: 2.5rem;">📅</div>
		<p class="fw-semibold text-brown mb-3">No upcoming bookings</p>
		<a href="/client/bookings/new" class="btn btn-peach fw-bold px-4 py-2">
			Book a session
		</a>
	</div>
{:else}
	<div class="d-flex flex-column gap-3">
		{#each data.upcoming as booking (booking.id)}
			<div class="card-custom p-4 d-flex align-items-center justify-content-between">
				<div>
					<p class="fw-bold text-brown-800 mb-0">{booking.service_snapshot?.name ?? 'Grooming'}</p>
					<p class="fs-sm text-sage-600 mb-0">{booking.dog.name}</p>
					<p class="fs-xs text-brown mt-1 mb-0">
						{format(new Date(booking.starts_at), 'EEE d MMM, h:mm a')}
					</p>
				</div>
				<span class="badge rounded-pill badge-sage fs-xs fw-bold px-3 py-1">Confirmed</span>
			</div>
		{/each}

		<a href="/client/bookings/new" class="btn btn-peach fw-bold px-4 py-2 mt-2 text-center">
			+ Book another session
		</a>
	</div>
{/if}
