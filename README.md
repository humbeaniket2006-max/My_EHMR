# EHMR AI Hospital and Patient Web App

A full-stack EHMR AI web application based on the original `index (6).html` dashboard, with patient and hospital role entry, clinical records, AI insights, services, appointment scheduling, and map-based hospital selection.

## Submission Format

Submit this project as a GitHub repository link:

```text
https://github.com/<your-username>/hospital-bed-appointment-booking-system
```

## Features

- Original EHMR AI dashboard restored from `index (6).html`
- Login-time role selection for Patient and Hospital
- Separate patient-facing and hospital/admin dashboard interfaces
- Patient-only Leaflet map to select nearby hospitals
- Appointment booking with selected hospital, doctor, date, and slot
- Vitals, labs, eMAR, prescriptions, care plan, services, insurance/ABHA, audit, and records views
- Local backend APIs for appointments, availability, AI proxy, auth, records, and MongoDB Cloud storage

## Role Entry

```text
Use the role cards on the login page.

Patient: opens patient health, services, insurance, and hospital map views.
Hospital: opens clinical/admin hospital dashboard views.
```

## Project Structure

```text
.
├── backend/                 Express API, auth, MongoDB models, routes, seed, tests
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── tests/
│   ├── utils/
│   ├── seed.js
│   └── server.js
├── frontend/                Static EHMR AI web client served by Express
│   ├── assets/
│   │   ├── css/styles.css
│   │   └── js/app.js
│   └── index.html
├── docs/                    Deployment, testing, and feature notes
├── .github/workflows/       CI smoke test workflow
├── Dockerfile
├── package.json
├── render.yaml
└── README.md
```

## Run Locally

Create a local `.env` file in the project root. This file is intentionally ignored by Git and should never be committed.

Add these values:

```text
GROQ_API_KEY=your_groq_api_key_here
MONGO_URI=your_mongodb_cloud_connection_string
JWT_SECRET=your_super_secret_key_min_32_chars
PORT=3000
APP_URL=http://localhost:5000
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
MAIL_FROM="EHMR AI <no-reply@example.com>"
```

SMTP settings are used for welcome emails after registration and password reset emails. If SMTP is not configured, the app logs that email was skipped and continues running.

Install dependencies:

```bash
npm install
```

```bash
npm start
```

Open:

```text
http://localhost:5000
```

## Testing

Run the automated smoke test:

```bash
npm test
```

Manual QA steps are documented in [docs/TESTING.md](docs/TESTING.md).

Original `index (6).html` feature mapping is documented in [docs/LEGACY_FEATURES.md](docs/LEGACY_FEATURES.md).

## Deployment

This project can be deployed as one Node web service because the backend also serves the frontend static files.

Deployment options are documented in [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

Included deployment files:

- `render.yaml` for Render web service deployment
- `Dockerfile` for Docker-based deployment
- `.github/workflows/ci.yml` for GitHub Actions smoke testing

## API Overview

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`
- `GET /api/auth/me`
- `GET /api/hospitals`
- `GET /api/hospitals/:id`
- `GET /api/appointments`
- `POST /api/appointments`
- `PUT /api/appointments/:id`
- `DELETE /api/appointments/:id`
- `GET /api/availability`
- `GET /api/residents`
- `POST /api/residents`
- `GET /api/residents/:id`
- `PUT /api/residents/:id`
- `DELETE /api/residents/:id`
- `GET /api/bookings`
- `GET /api/bookings/me`
- `POST /api/bookings`
- `PATCH /api/bookings/:id/status`
- `PUT /api/bookings/:id/cancel`
- `GET /api/notifications/mine`
- `PATCH /api/notifications/:id/read`
- `GET /api/shared-records`
- `GET /api/shared-records/:bookingId`
- `POST /api/hospitals`
- `PUT /api/hospitals/:id`
- `POST /api/ai-insight`
- `GET /api/records`
- `POST /api/records`

## Notes

Frontend API calls use relative `/api/...` paths, so no Railway backend URL is required. The Groq API key and MongoDB URI stay in `.env` and are read only by the backend.

Run `npm run seed` once after setting `MONGO_URI` to insert the demo admin (`admin@ehmr.com` / `Admin@123`), demo patient (`patient@ehmr.com` / `Patient@123`), residents, hospitals, and linked hospital staff accounts. Sample hospital staff logins use `Hospital@123`, for example `admin@apollohospitalsgreamsroad.com`.

Seeded hospital staff accounts:

- Apollo Hospitals Greams Road: `admin@apollohospitalsgreamsroad.com`
- MIOT International: `admin@miotinternational.com`
- Kauvery Hospital: `admin@kauveryhospital.com`
- PSG Hospitals: `admin@psghospitals.com`
- Meenakshi Mission Hospital: `admin@meenakshimissionhospital.com`

For production, set `MONGO_URI` and a strong `JWT_SECRET` environment variable.
