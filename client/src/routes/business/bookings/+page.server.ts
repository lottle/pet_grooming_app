import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import type { Booking } from '$lib/types';

const RAILS_URL = process.env.RAILS_URL || 'http://localhost:3000';

export const load: PageServerLoad = async ({ locals }) => {
	const res = await fetch(`${RAILS_URL}/api/v1/business/bookings`, {
		headers: { Authorization: `Bearer ${locals.token}` }
	});
	const bookings: Booking[] = res.ok ? await res.json() : [];
	return { bookings };
};

export const actions: Actions = {
	cancel: async ({ request, locals }) => {
		const data = await request.formData();
		const id = data.get('id')?.toString();

		const res = await fetch(`${RAILS_URL}/api/v1/business/bookings/${id}`, {
			method: 'DELETE',
			headers: { Authorization: `Bearer ${locals.token}` }
		});

		if (!res.ok) return fail(400, { error: 'Could not cancel booking' });
	},

	reschedule: async ({ request, locals }) => {
		const data = await request.formData();
		const id = data.get('id')?.toString();
		const starts_at = data.get('starts_at')?.toString();

		const res = await fetch(`${RAILS_URL}/api/v1/business/bookings/${id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${locals.token}` },
			body: JSON.stringify({ starts_at })
		});

		if (!res.ok) {
			const err = await res.json();
			return fail(res.status, { error: err.errors?.join(', ') ?? err.error ?? 'Could not reschedule' });
		}
	}
};
