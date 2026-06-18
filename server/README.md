# Pawfect Grooming — API

Ruby on Rails 8 API-only backend for the Pawfect Grooming booking system.

## Stack

- **Rails 8** (API-only, no ActiveRecord)
- **Mongoid 9** — MongoDB ODM
- **bcrypt** — password hashing via `ActiveModel::SecurePassword`
- **jwt** — JWT generation and verification
- **rack-cors** — CORS for the SvelteKit frontend origin

## Dev

```bash
bundle install
bundle exec rails db:seed   # create business account + default services
bundle exec rails server -p 3000
```

Requires MongoDB running on `localhost:27017`.

## Structure

```
app/
├── controllers/api/v1/
│   ├── auth_controller.rb          # register, login, logout, me
│   ├── dogs_controller.rb          # client: CRUD own dogs
│   ├── bookings_controller.rb      # client: list, create, cancel bookings
│   ├── services_controller.rb      # client: read-only service list
│   └── business/
│       ├── services_controller.rb  # business: full CRUD services
│       └── bookings_controller.rb  # business: calendar, reschedule, cancel
├── models/
│   ├── user.rb             # role: "client" | "business", has_secure_password
│   ├── dog.rb              # belongs to client User
│   ├── service.rb          # grooming service with price + duration
│   ├── booking.rb          # confirmed/cancelled, overlap validation
│   └── service_snapshot.rb # embedded in Booking — preserves price at booking time
└── services/
    └── jwt_service.rb      # encode/decode JWT with secret_key_base
```

## API routes

All routes are under `/api/v1`.

```
POST   /auth/register
POST   /auth/login
DELETE /auth/logout
GET    /auth/me

GET/POST/PATCH/DELETE  /dogs
GET/POST/DELETE        /bookings
GET                    /services

GET/POST/PATCH/DELETE  /business/services
GET/PATCH/DELETE       /business/bookings   # supports ?start=&end= for calendar
```

## Environment

| Variable | Default | Purpose |
|---|---|---|
| `CLIENT_ORIGIN` | `http://localhost:5173` | Allowed CORS origin |
