import type { Handle } from '@sveltejs/kit';
import type { User } from '$lib/types';

const RAILS_URL = process.env.RAILS_URL || 'http://localhost:3000';

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('auth_token');

	if (token) {
		try {
			const res = await fetch(`${RAILS_URL}/api/v1/auth/me`, {
				headers: { Authorization: `Bearer ${token}` }
			});
			if (res.ok) {
				const data = await res.json();
				event.locals.user = data.user as User;
				event.locals.token = token;
			} else {
				event.cookies.delete('auth_token', { path: '/' });
			}
		} catch {
			// Rails unreachable — leave locals empty
		}
	}

	return resolve(event);
};
