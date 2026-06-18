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
		confirmed: 'bg-[var(--color-sage-100)] text-[var(--color-sage-700)]',
		cancelled: 'bg-red-50 text-red-500'
	};
</script>

<svelte:head><title>Calendar – Pawfect Business</title></svelte:head>

<div class="flex items-center justify-between mb-6">
	<h1 class="text-2xl font-extrabold text-[var(--color-brown-800)]">Weekly Calendar 📅</h1>
	<div class="flex gap-2">
		<a href="?week={data.weekOffset - 1}" class="border border-[var(--color-sage-200)] px-3 py-1.5 rounded-xl text-sm font-semibold hover:bg-[var(--color-sage-50)] transition">← Prev</a>
		<a href="?week=0" class="border border-[var(--color-sage-200)] px-3 py-1.5 rounded-xl text-sm font-semibold hover:bg-[var(--color-sage-50)] transition">Today</a>
		<a href="?week={data.weekOffset + 1}" class="border border-[var(--color-sage-200)] px-3 py-1.5 rounded-xl text-sm font-semibold hover:bg-[var(--color-sage-50)] transition">Next →</a>
	</div>
</div>

<div class="grid grid-cols-7 gap-3">
	{#each weekDays as day (day.toISOString())}
		{@const dayBookings = bookingsForDay(day)}
		{@const isToday = day.toDateString() === new Date().toDateString()}
		<div class="bg-white rounded-3xl shadow-sm p-3 min-h-32">
			<div class="text-center mb-2">
				<p class="text-xs font-bold {isToday ? 'text-[var(--color-peach-500)]' : 'text-[var(--color-sage-600)]'}">{format(day, 'EEE')}</p>
				<p class="text-lg font-extrabold {isToday ? 'text-[var(--color-peach-500)]' : 'text-[var(--color-brown-800)]'}">{format(day, 'd')}</p>
			</div>
			{#each dayBookings as booking (booking.id)}
				<a href="/business/bookings?id={booking.id}" class="block bg-[var(--color-peach-100)] rounded-xl px-2 py-1.5 mb-1 hover:bg-[var(--color-peach-200)] transition">
					<p class="text-xs font-bold text-[var(--color-brown-800)] truncate">{booking.service_snapshot?.name}</p>
					<p class="text-xs text-[var(--color-sage-600)] truncate">{booking.client?.name}</p>
					<p class="text-xs text-[var(--color-brown-700)]">{format(new Date(booking.starts_at), 'h:mm a')}</p>
				</a>
			{/each}
			{#if dayBookings.length === 0}
				<p class="text-xs text-center text-[var(--color-sage-100)] mt-4">—</p>
			{/if}
		</div>
	{/each}
</div>
