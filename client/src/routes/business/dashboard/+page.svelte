<script lang="ts">
	import { format, addDays, parseISO } from 'date-fns';
	import type { Booking } from '$lib/types';

	let { data } = $props();

	const weekDays = $derived(
		Array.from({ length: 7 }, (_, i) => addDays(parseISO(data.weekStart), i))
	);

	function bookingsForDay(day: Date): Booking[] {
		return data.bookings.filter((b) => {
			const d = new Date(b.starts_at);
			return d.toDateString() === day.toDateString() && b.status === 'confirmed';
		});
	}

	const statusColors: Record<string, string> = {
		confirmed: 'badge-sage',
		cancelled: 'bg-danger-subtle text-danger'
	};
</script>

<svelte:head><title>Calendar – Pawfect Business</title></svelte:head>

<div class="d-flex align-items-center justify-content-between mb-4">
	<h1 class="fs-3 fw-bolder text-brown-800 mb-0">Weekly Calendar 📅</h1>
	<div class="d-flex gap-2">
		<a href="?week={data.weekOffset - 1}" class="btn border border-sage-200 px-3 py-1 rounded-4 fs-sm fw-semibold hover-sage-50">← Prev</a>
		<a href="?week=0" class="btn border border-sage-200 px-3 py-1 rounded-4 fs-sm fw-semibold hover-sage-50">Today</a>
		<a href="?week={data.weekOffset + 1}" class="btn border border-sage-200 px-3 py-1 rounded-4 fs-sm fw-semibold hover-sage-50">Next →</a>
	</div>
</div>

<div class="calendar-grid">
	{#each weekDays as day (day.toISOString())}
		{@const dayBookings = bookingsForDay(day)}
		{@const isToday = day.toDateString() === new Date().toDateString()}
		<div class="card-custom p-3 min-h-32">
			<div class="text-center mb-2">
				<p class="fs-xs fw-bold mb-0 {isToday ? 'text-peach' : 'text-sage-600'}">{format(day, 'EEE')}</p>
				<p class="fs-5 fw-bolder mb-0 {isToday ? 'text-peach' : 'text-brown-800'}">{format(day, 'd')}</p>
			</div>
			{#each dayBookings as booking (booking.id)}
				<a href="/business/bookings?id={booking.id}" class="d-block bg-peach-100 rounded-3 px-2 py-1 mb-1 text-decoration-none hover-peach-200">
					<p class="fs-xs fw-bold text-brown-800 text-truncate mb-0">{booking.service_snapshot?.name}</p>
					<p class="fs-xs text-sage-600 text-truncate mb-0">{booking.client?.name}</p>
					<p class="fs-xs text-brown mb-0">{format(new Date(booking.starts_at), 'h:mm a')}</p>
				</a>
			{/each}
			{#if dayBookings.length === 0}
				<p class="fs-xs text-center text-sage-100 mt-3 mb-0">—</p>
			{/if}
		</div>
	{/each}
</div>
