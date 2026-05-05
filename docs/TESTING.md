# Testing Checklist

## Automated Smoke Test

Run:

```bash
npm test
```

This starts the backend on a temporary port and verifies:

- Public hospital listing works
- Protected bookings API rejects guests
- Patient login returns a JWT
- Appointment booking succeeds
- Admin login succeeds
- Admin analytics API returns booking statistics
- Health records API creates and lists records

## Manual UI Test

Run:

```bash
npm start
```

Open:

```text
http://localhost:5000
```

Check these flows:

- Guest can search hospitals and use filters
- Guest is asked to login before booking
- Hospital admin can login with `admin@ehmr.com / Admin@123` after `npm run seed`
- Patient can create an appointment booking
- Patient can reserve a bed and availability decreases
- Patient dashboard shows booking ID, estimated cost, and QR-style code
- Register a viewer user to test the patient dashboard
- Admin can add a hospital
- Admin can approve, reschedule, and cancel bookings
- Admin analytics chart renders
- Dark mode toggles correctly
- AI Summary returns a response after `GROQ_API_KEY` is added to `.env`
- Records tab saves vitals, lab, prescription, medication, service, insurance, and note entries
- MongoDB Atlas shows residents, appointments, hospitals, bookings, and records after `MONGO_URI` is configured
