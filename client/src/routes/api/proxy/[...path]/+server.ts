import type { RequestHandler } from '@sveltejs/kit';

const RAILS_URL = process.env.RAILS_URL || 'http://localhost:3000';

async function proxy(event: Parameters<RequestHandler>[0]): Promise<Response> {
	const path = event.params.path;
	const url = `${RAILS_URL}/api/v1/${path}${event.url.search}`;

	const headers: Record<string, string> = {
		'Content-Type': 'application/json'
	};

	if (event.locals.token) {
		headers['Authorization'] = `Bearer ${event.locals.token}`;
	}

	const init: RequestInit = { method: event.request.method, headers };

	if (!['GET', 'HEAD', 'DELETE'].includes(event.request.method)) {
		init.body = await event.request.text();
	}

	return fetch(url, init);
}

export const GET: RequestHandler = (event) => proxy(event);
export const POST: RequestHandler = (event) => proxy(event);
export const PATCH: RequestHandler = (event) => proxy(event);
export const PUT: RequestHandler = (event) => proxy(event);
export const DELETE: RequestHandler = (event) => proxy(event);
