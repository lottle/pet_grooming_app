import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ locals }) => {
	if (!locals.user || locals.user.role !== 'client') {
		redirect(303, '/login');
	}
	return { user: locals.user };
};
