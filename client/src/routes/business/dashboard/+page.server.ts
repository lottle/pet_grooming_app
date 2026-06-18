import type { PageServerLoad } from './$types';
import type { Booking } from '$lib/types';
import { startOfWeek, endOfWeek, format } from 'date-fns';

const RAILS_URL = process.env.RAILS_URL || 'http://localhost:3000';

export const load: PageServerLoad = async ({ locals, url }) => {
	const weekOffset = Number(url.searchParams.get('week') ?? 0);
	const base = new Date();
	base.setDate(base.getDate() + weekOffset * 7);

	const start = startOfWeek(base, { weekStartsOn: 1 });
	const end = endOfWeek(base, { weekStartsOn: 1 });

	const res = await fetch(
		`${RAILS_URL}/api/v1/business/bookings?start=${start.toISOString()}&end=${end.toISOString()}`,
		{ headers: { Authorization: `Bearer ${locals.token}` } }
	);

	const bookings: Booking[] = res.ok ? await res.json() : [];
	return { bookings, weekStart: start.toISOString(), weekOffset };
};
