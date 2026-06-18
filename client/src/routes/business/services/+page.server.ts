import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import type { Service } from '$lib/types';

const RAILS_URL = process.env.RAILS_URL || 'http://localhost:3000';

export const load: PageServerLoad = async ({ locals }) => {
	const res = await fetch(`${RAILS_URL}/api/v1/business/services`, {
		headers: { Authorization: `Bearer ${locals.token}` }
	});
	const services: Service[] = res.ok ? await res.json() : [];
	return { services };
};

export const actions: Actions = {
	create: async ({ request, locals }) => {
		const data = await request.formData();
		const body = {
			name: data.get('name'),
			description: data.get('description'),
			duration: Number(data.get('duration')),
			price: Number(data.get('price'))
		};

		const res = await fetch(`${RAILS_URL}/api/v1/business/services`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${locals.token}` },
			body: JSON.stringify(body)
		});

		if (!res.ok) {
			const err = await res.json();
			return fail(res.status, { error: err.errors?.join(', ') ?? 'Could not save service' });
		}
	},

	update: async ({ request, locals }) => {
		const data = await request.formData();
		const id = data.get('id')?.toString();
		const body = {
			name: data.get('name'),
			description: data.get('description'),
			duration: Number(data.get('duration')),
			price: Number(data.get('price'))
		};

		const res = await fetch(`${RAILS_URL}/api/v1/business/services/${id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${locals.token}` },
			body: JSON.stringify(body)
		});

		if (!res.ok) {
			const err = await res.json();
			return fail(res.status, { error: err.errors?.join(', ') ?? 'Could not update service' });
		}
	},

	delete: async ({ request, locals }) => {
		const data = await request.formData();
		const id = data.get('id')?.toString();
		await fetch(`${RAILS_URL}/api/v1/business/services/${id}`, {
			method: 'DELETE',
			headers: { Authorization: `Bearer ${locals.token}` }
		});
	}
};
