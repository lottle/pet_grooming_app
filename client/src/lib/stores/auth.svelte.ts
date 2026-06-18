import type { User } from '$lib/types';

let user = $state<User | null>(null);

export const authStore = {
	get user() {
		return user;
	},
	get isClient() {
		return user?.role === 'client';
	},
	get isBusiness() {
		return user?.role === 'business';
	},
	set(u: User | null) {
		user = u;
	},
	clear() {
		user = null;
	}
};
