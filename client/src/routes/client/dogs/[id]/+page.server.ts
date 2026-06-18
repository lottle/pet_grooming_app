import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

const RAILS_URL = process.env.RAILS_URL || 'http://localhost:3000';

export const load: PageServerLoad = async ({ locals, params }) => {
	const res = await fetch(`${RAILS_URL}/api/v1/dogs/${params.id}`, {
		headers: { Authorization: `Bearer ${locals.token}` }
	});
	if (!res.ok) redirect(303, '/client/dogs');
	return { dog: await res.json() };
};

export const actions: Actions = {
	update: async ({ request, locals, params }) => {
		const data = await request.formData();
		const body = {
			name: data.get('name'),
			breed: data.get('breed'),
			age: Number(data.get('age')),
			notes: data.get('notes')
		};

		const res = await fetch(`${RAILS_URL}/api/v1/dogs/${params.id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${locals.token}` },
			body: JSON.stringify(body)
		});

		if (!res.ok) {
			const err = await res.json();
			return fail(res.status, { error: err.errors?.join(', ') ?? 'Could not update dog' });
		}
		redirect(303, '/client/dogs');
	},

	delete: async ({ locals, params }) => {
		await fetch(`${RAILS_URL}/api/v1/dogs/${params.id}`, {
			method: 'DELETE',
			headers: { Authorization: `Bearer ${locals.token}` }
		});
		redirect(303, '/client/dogs');
	}
};
