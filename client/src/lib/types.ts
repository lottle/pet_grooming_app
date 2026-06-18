export interface User {
	id: string;
	email: string;
	name: string;
	role: 'client' | 'business';
}

export interface Dog {
	id: string;
	name: string;
	breed: string;
	age: number;
	notes: string;
}

export interface Service {
	id: string;
	name: string;
	description: string;
	duration: number;
	price: number;
	active: boolean;
}

export interface ServiceSnapshot {
	name: string;
	duration: number;
	price: number;
}

export interface Booking {
	id: string;
	starts_at: string;
	ends_at: string;
	status: 'confirmed' | 'cancelled';
	notes: string;
	dog: { id: string; name: string; breed?: string };
	client?: { id: string; name: string; email: string };
	service_snapshot: ServiceSnapshot | null;
}
