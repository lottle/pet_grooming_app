import type { PageServerLoad } from './$types';
import type { Booking } from '$lib/types';

const RAILS_URL = process.env.RAILS_URL || 'http://localhost:3000';

export const load: PageServerLoad = async ({ locals }) => {
	const res = await fetch(`${RAILS_URL}/api/v1/bookings`, {
		headers: { Authorization: `Bearer ${locals.token}` }
	});
	const bookings: Booking[] = res.ok ? await res.json() : [];
	const upcoming = bookings.filter(
		(b) => b.status === 'confirmed' && new Date(b.starts_at) >= new Date()
	);
	return { upcoming };
};
