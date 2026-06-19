# Pawfect Grooming

A full-stack dog grooming booking system. Clients can register, manage their dogs, and book appointments. The business owner can manage services, view a weekly calendar, and cancel or reschedule bookings.

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | SvelteKit (Svelte 5 runes), Bootstrap 5.3, TypeScript |
| Backend | Ruby on Rails 8 (API-only) |
| Database | MongoDB via Mongoid 9 |
| Auth | JWT stored in httpOnly cookies |

## Project structure

```
portfolio/
├── client/   # SvelteKit frontend  →  http://localhost:5173
└── server/   # Rails API           →  http://localhost:3000
```

## Getting started

### Prerequisites

- [rbenv](https://github.com/rbenv/rbenv) + [ruby-build](https://github.com/rbenv/ruby-build)
- Node.js 22+
- MongoDB 8.3 running on `localhost:27017`
- [Overmind](https://github.com/DarthSim/overmind) (or Foreman)

### 1. Install Ruby

```bash
rbenv install 3.3.11
```

### 2. Install dependencies

```bash
cd server && bundle install && cd ..
cd client && npm install && cd ..
```

### 3. Seed the database

On first run, create the business account and default grooming services:

```bash
cd server && bundle exec rails db:seed
```

### 4. Start everything

```bash
overmind start
```

This starts MongoDB, the Rails API on port 3000, and the SvelteKit frontend on port 5173.

Open [http://localhost:5173](http://localhost:5173).

## Accounts

| Role | Email | Password |
|---|---|---|
| Business | business@pawfect.com | grooming123 |
| Client | Register at `/register` | — |

## Features

### Client
- Register and log in
- Create profiles for each dog (name, breed, age, notes)
- Book appointments via a 4-step wizard: service → dog → date/time → confirm
- View upcoming and past bookings, cancel upcoming ones

### Business
- Log in to a dedicated dashboard
- Weekly calendar view with prev/next navigation
- Manage grooming services (add, edit, soft-delete)
- View all bookings, cancel or reschedule any appointment
