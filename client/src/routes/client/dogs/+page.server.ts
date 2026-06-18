import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import type { Dog } from '$lib/types';

const RAILS_URL = process.env.RAILS_URL || 'http://localhost:3000';

export const load: PageServerLoad = async ({ locals }) => {
	const res = await fetch(`${RAILS_URL}/api/v1/dogs`, {
		headers: { Authorization: `Bearer ${locals.token}` }
	});
	const dogs: Dog[] = res.ok ? await res.json() : [];
	return { dogs };
};

export const actions: Actions = {
	create: async ({ request, locals }) => {
		const data = await request.formData();
		const body = {
			name: data.get('name'),
			breed: data.get('breed'),
			age: Number(data.get('age')),
			notes: data.get('notes')
		};

		const res = await fetch(`${RAILS_URL}/api/v1/dogs`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${locals.token}` },
			body: JSON.stringify(body)
		});

		if (!res.ok) {
			const err = await res.json();
			return fail(res.status, { error: err.errors?.join(', ') ?? 'Could not save dog' });
		}

		redirect(303, '/client/dogs');
	}
};
