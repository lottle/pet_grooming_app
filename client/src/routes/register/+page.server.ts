import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

const RAILS_URL = process.env.RAILS_URL || 'http://localhost:3000';

export const load: PageServerLoad = ({ locals }) => {
	if (locals.user) redirect(303, '/client/dashboard');
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const name = data.get('name')?.toString() ?? '';
		const email = data.get('email')?.toString() ?? '';
		const password = data.get('password')?.toString() ?? '';

		try {
			const res = await fetch(`${RAILS_URL}/api/v1/auth/register`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, email, password })
			});

			const body = await res.json();

			if (!res.ok) {
				return fail(res.status, { error: body.errors?.join(', ') ?? 'Registration failed', name, email });
			}

			cookies.set('auth_token', body.token, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				maxAge: 60 * 60 * 24
			});

			redirect(303, '/client/dashboard');
		} catch {
			return fail(500, { error: 'Could not connect to server', name, email });
		}
	}
};
