# Pawfect Grooming — Frontend

SvelteKit (Svelte 5) frontend for the Pawfect Grooming booking system.

## Stack

- **SvelteKit** with Svelte 5 runes (`$state`, `$derived`, `$effect`)
- **Bootstrap 5.3** for layout, components, and utilities
- **TypeScript**
- **date-fns** for date formatting and calendar calculations
- **Nunito** font (Google Fonts) for the warm, rounded aesthetic

## Dev

```bash
npm install
npm run dev        # http://localhost:5173
```

## Build

```bash
npm run build
npm run preview
```

## Structure

```
src/
├── hooks.server.ts              # Reads JWT cookie → populates locals.user
├── app.css                      # Bootstrap import + brand design tokens (palette, font, custom utilities)
├── lib/
│   ├── types.ts                 # Shared TypeScript interfaces
│   ├── api/client.ts            # Fetch wrapper (routes through BFF proxy)
│   └── stores/auth.svelte.ts    # Svelte 5 runes auth store
└── routes/
    ├── +layout.svelte/server.ts # Root layout — loads user from cookie
    ├── login/                   # Login form (sets httpOnly cookie)
    ├── register/                # Client registration
    ├── logout/                  # Clears cookie, redirects to /
    ├── api/proxy/[...path]/     # BFF proxy → Rails API (injects Bearer token)
    ├── client/                  # Protected: role = client
    │   ├── dashboard/           # Upcoming bookings
    │   ├── dogs/                # Dog profiles CRUD
    │   └── bookings/new/        # 4-step booking wizard
    └── business/                # Protected: role = business
        ├── dashboard/           # Weekly calendar
        ├── services/            # Service management
        └── bookings/            # Cancel / reschedule bookings
```

## Auth flow

The browser never calls the Rails API directly. All requests go through SvelteKit:

1. Login/register → SvelteKit form action calls Rails, stores JWT in an `httpOnly` cookie
2. `hooks.server.ts` reads the cookie on every request, calls `GET /api/v1/auth/me`, and populates `event.locals.user`
3. Client-side data fetching goes through `/api/proxy/[...path]`, which injects the `Authorization: Bearer` header server-side before forwarding to Rails
