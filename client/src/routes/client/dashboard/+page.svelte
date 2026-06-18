<script lang="ts">
	import { format } from 'date-fns';
	import { authStore } from '$lib/stores/auth.svelte';
	import type { Booking } from '$lib/types';

	let { data } = $props();
</script>

<svelte:head><title>Dashboard – Pawfect</title></svelte:head>

<h1 class="text-2xl font-extrabold text-[var(--color-brown-800)] mb-1">
	Hello, {authStore.user?.name?.split(' ')[0]} 👋
</h1>
<p class="text-[var(--color-sage-600)] mb-8">Here are your upcoming appointments.</p>

{#if data.upcoming.length === 0}
	<div class="bg-[var(--color-peach-100)] rounded-3xl p-8 text-center">
		<div class="text-4xl mb-3">📅</div>
		<p class="font-semibold text-[var(--color-brown-700)] mb-4">No upcoming bookings</p>
		<a
			href="/client/bookings/new"
			class="bg-[var(--color-peach-500)] text-white font-bold px-6 py-2.5 rounded-2xl hover:bg-[var(--color-peach-400)] transition"
		>
			Book a session
		</a>
	</div>
{:else}
	<div class="flex flex-col gap-4">
		{#each data.upcoming as booking (booking.id)}
			<div class="bg-white rounded-3xl shadow-sm p-5 flex items-center justify-between">
				<div>
					<p class="font-bold text-[var(--color-brown-800)]">{booking.service_snapshot?.name ?? 'Grooming'}</p>
					<p class="text-sm text-[var(--color-sage-600)]">{booking.dog.name}</p>
					<p class="text-xs text-[var(--color-brown-700)] mt-1">
						{format(new Date(booking.starts_at), 'EEE d MMM, h:mm a')}
					</p>
				</div>
				<span class="bg-[var(--color-sage-100)] text-[var(--color-sage-700)] text-xs font-bold px-3 py-1 rounded-full">
					Confirmed
				</span>
			</div>
		{/each}

		<a
			href="/client/bookings/new"
			class="mt-2 text-center bg-[var(--color-peach-500)] text-white font-bold px-6 py-3 rounded-2xl hover:bg-[var(--color-peach-400)] transition"
		>
			+ Book another session
		</a>
	</div>
{/if}
