import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import type { Dog, Service } from '$lib/types';

const RAILS_URL = process.env.RAILS_URL || 'http://localhost:3000';

export const load: PageServerLoad = async ({ locals }) => {
	const [servicesRes, dogsRes] = await Promise.all([
		fetch(`${RAILS_URL}/api/v1/services`, { headers: { Authorization: `Bearer ${locals.token}` } }),
		fetch(`${RAILS_URL}/api/v1/dogs`, { headers: { Authorization: `Bearer ${locals.token}` } })
	]);

	const services: Service[] = servicesRes.ok ? await servicesRes.json() : [];
	const dogs: Dog[] = dogsRes.ok ? await dogsRes.json() : [];

	return { services, dogs };
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const data = await request.formData();
		const body = {
			service_id: data.get('service_id'),
			dog_id: data.get('dog_id'),
			starts_at: data.get('starts_at'),
			notes: data.get('notes')
		};

		const res = await fetch(`${RAILS_URL}/api/v1/bookings`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${locals.token}` },
			body: JSON.stringify(body)
		});

		if (!res.ok) {
			const err = await res.json();
			return fail(res.status, { error: err.errors?.join(', ') ?? err.error ?? 'Could not create booking' });
		}

		redirect(303, '/client/bookings');
	}
};
