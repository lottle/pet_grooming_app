# Pawfect Grooming

A full-stack dog grooming booking system. Clients can register, manage their dogs, and book appointments. The business owner can manage services, view a weekly calendar, and cancel or reschedule bookings.

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | SvelteKit (Svelte 5 runes), Tailwind CSS v4, TypeScript |
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

- Node.js 22+
- Ruby 3.3 (via RubyInstaller on Windows — included at `C:\Ruby33-x64`)
- MongoDB 8.3 running on `localhost:27017`

### 1. Start MongoDB

```powershell
& "C:\Program Files\MongoDB\Server\8.3\bin\mongod.exe" --dbpath "C:\data\db"
```

### 2. Start the Rails API

```powershell
cd server
bundle exec rails server -p 3000
```

On first run, seed the database:

```powershell
bundle exec rails db:seed
```

This creates the business account and four default grooming services.

### 3. Start the SvelteKit frontend

```powershell
cd client
npm run dev
```

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
