# EHMR AI — Smart Senior Health Platform

A full-stack electronic health management system built for senior care facilities. EHMR AI combines clinical record management, AI-powered health insights, appointment scheduling, and patient-facing dashboards into a single deployable Node.js web service.

**Live Demo:** [my-ehmr.onrender.com](https://my-ehmr.onrender.com) &nbsp;|&nbsp; **Demo Credentials:** see [Role Entry](#role-entry) below

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Runtime** | Node.js 18+ |
| **Framework** | Express.js |
| **Database** | MongoDB Atlas Cloud (Mongoose ODM) |
| **Auth** | JWT + bcrypt |
| **AI** | Groq API (llama-3.3-70b-versatile) |
| **Email** | Brevo SMTP API |
| **Frontend** | Vanilla JS, CSS3 (served statically by Express) |
| **Maps** | Leaflet.js |
| **Deployment** | Render (web service) / Docker |
| **CI** | GitHub Actions |

---

## Features

- **Dual-role dashboard** — separate Patient and Hospital/Admin interfaces from a single login
- **AI Health Insights** — Groq-powered risk interpretation from vitals, labs, and medication history
- **Clinical records** — vitals monitor, eMAR, lab reports, shift notes, care plans, clinical timeline
- **Appointment booking** — doctor availability slots, AI-priority scheduling, visit status tracking
- **Services** — home visits, lab collection, physiotherapy, pharmacy delivery, transport booking
- **Insurance + ABHA** — policy management, ABHA digital health ID, government scheme readiness
- **Hospital finder** — Leaflet map for patients to select nearby hospitals
- **Auth flows** — JWT login, registration, forgot password, password reset via email
- **Audit log** — full activity trail across all clinical actions
- **Rate limiting + security** — helmet, express-rate-limit, CORS, trust proxy configured for Render

---

## Project Structure

```
.
├── backend/
│   ├── middleware/        auth.js
│   ├── models/            User, Resident, Hospital, Appointment, Booking,
│   │                      Record, Notification, SharedRecord
│   ├── routes/            auth, residents, appointments, hospitals,
│   │                      bookings, records, notifications, sharedRecords, ai
│   ├── services/          emailService.js (Brevo HTTP API)
│   ├── tests/             smoke.test.js
│   ├── utils/             asyncHandler, respond, validate
│   ├── seed.js
│   └── server.js
├── frontend/
│   ├── assets/
│   │   ├── css/styles.css
│   │   └── js/app.js
│   └── index.html
├── docs/
│   ├── DEPLOYMENT.md
│   ├── TESTING.md
│   └── LEGACY_FEATURES.md
├── .github/workflows/ci.yml
├── Dockerfile
├── render.yaml
├── package.json
└── README.md
```

---

## Role Entry

On the login page, select a role card before signing in:

| Role | Access |
|---|---|
| **Patient** | Health summary, AI insight, vitals, labs, services, insurance/ABHA, hospital map |
| **Hospital / Admin** | Clinical dashboard, residents, alerts, eMAR, shift notes, lab reports, audit log, ledger |

**Demo accounts (pre-seeded):**

| Role | Email | Password |
|---|---|---|
| Admin | `admin@ehmr.com` | `Admin@123` |
| Doctor / Staff | `doctor.deepa@ehmr.com` | `Admin@123` |
| Patient | `patient@ehmr.com` | `Patient@123` |

**Seeded hospital staff accounts** (password: `Hospital@123`):

| Hospital | Login |
|---|---|
| Apollo Hospitals Greams Road | `admin@apollohospitalsgreamsroad.com` |
| MIOT International | `admin@miotinternational.com` |
| Kauvery Hospital | `admin@kauveryhospital.com` |
| PSG Hospitals | `admin@psghospitals.com` |
| Meenakshi Mission Hospital | `admin@meenakshimissionhospital.com` |

---

## Run Locally

**1. Clone and install**
```bash
git clone https://github.com/<your-username>/hospital-bed-appointment-booking-system
cd hospital-bed-appointment-booking-system
npm install
```

**2. Create `.env` in the project root**
```env
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_key_min_32_chars
GROQ_API_KEY=your_groq_api_key
PORT=5000
APP_URL=http://localhost:5000

# Email (Brevo)
BREVO_API_KEY=your_brevo_api_key
MAIL_FROM_ADDRESS=your_verified_sender@email.com
```

> If `BREVO_API_KEY` is not set, email is skipped with a console log — the app continues running normally.

**3. Seed demo data**
```bash
npm run seed
```

**4. Start**
```bash
npm start
```

Open [http://localhost:5000](http://localhost:5000)

---

## API Reference

### Auth
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register new user |
| `POST` | `/api/auth/login` | Login, returns JWT |
| `GET` | `/api/auth/me` | Get current user (auth required) |
| `POST` | `/api/auth/forgot-password` | Send password reset email |
| `POST` | `/api/auth/reset-password` | Reset password with token |

### Residents
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/residents` | List all residents |
| `POST` | `/api/residents` | Create resident |
| `GET` | `/api/residents/:id` | Get resident by ID |
| `PUT` | `/api/residents/:id` | Update resident |
| `DELETE` | `/api/residents/:id` | Delete resident |

### Hospitals
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/hospitals` | List all hospitals |
| `GET` | `/api/hospitals/:id` | Get hospital by ID |
| `POST` | `/api/hospitals` | Create hospital |
| `PUT` | `/api/hospitals/:id` | Update hospital |

### Appointments
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/appointments` | List appointments |
| `POST` | `/api/appointments` | Book appointment |
| `PUT` | `/api/appointments/:id` | Update appointment |
| `DELETE` | `/api/appointments/:id` | Cancel appointment |
| `GET` | `/api/availability` | Get available slots by doctor + date |

### Bookings & Services
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/bookings` | List all bookings |
| `GET` | `/api/bookings/me` | Get current user's bookings |
| `POST` | `/api/bookings` | Create service booking |
| `PATCH` | `/api/bookings/:id/status` | Update booking status |
| `PUT` | `/api/bookings/:id/cancel` | Cancel booking |

### Records & Notifications
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/records` | List records |
| `POST` | `/api/records` | Create record |
| `GET` | `/api/notifications/mine` | Get user notifications |
| `PATCH` | `/api/notifications/:id/read` | Mark notification read |
| `GET` | `/api/shared-records` | List shared records |
| `GET` | `/api/shared-records/:bookingId` | Get shared record by booking |

### AI
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/ai-insight` | Generate AI health insight via Groq |

---

## Testing

Run the automated smoke test suite:
```bash
npm test
```

Manual QA steps are documented in [`docs/TESTING.md`](docs/TESTING.md).

---

## Deployment

The backend serves frontend static files, so this deploys as a **single web service** — no separate frontend hosting needed.

**Render (recommended):**
- Connect your GitHub repo to Render
- Set environment variables in the Render dashboard
- Build command: `npm install`
- Start command: `npm start`
- Add `BREVO_API_KEY`, `MONGO_URI`, `JWT_SECRET`, `GROQ_API_KEY` as env vars

See [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) for Docker and other options.

---

## Environment Variables Reference

| Variable | Required | Description |
|---|---|---|
| `MONGO_URI` | ✅ | MongoDB Atlas connection string |
| `JWT_SECRET` | ✅ | Secret key for JWT signing (min 32 chars) |
| `GROQ_API_KEY` | ✅ | Groq API key for AI insights |
| `PORT` | — | Server port (default: 5000) |
| `APP_URL` | — | Base URL for email links |
| `BREVO_API_KEY` | — | Brevo API key for transactional email |
| `MAIL_FROM_ADDRESS` | — | Verified sender email address |

---

## License

MIT
