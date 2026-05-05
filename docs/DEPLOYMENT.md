# Deployment Guide

## Before Deployment

Create these environment variables on your hosting platform:

```text
NODE_ENV=production
PORT=5000
JWT_SECRET=<long-random-secret>
GROQ_API_KEY=<your-groq-api-key>
GROQ_MODEL=llama-3.1-8b-instant
MONGO_URI=<your-mongodb-atlas-connection-string>
FRONTEND_URL=https://your-frontend-domain.com
APP_URL=https://your-app-domain.com
SMTP_HOST=<your-smtp-host>
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=<your-smtp-username>
SMTP_PASS=<your-smtp-password>
MAIL_FROM="EHMR AI <no-reply@your-domain.com>"
```

Do not commit `.env`.

## Render Deployment

1. Push the project to GitHub.
2. Open Render and create a new Web Service from the GitHub repo.
3. Use:

```text
Build Command: npm install
Start Command: node server.js
```

4. Add the environment variables listed above.
5. Deploy.

The frontend uses relative `/api/...` calls, so the deployed frontend and backend work from the same domain.

## Docker Deployment

Build:

```bash
docker build -t hospital-booking-system .
```

Run:

```bash
docker run -p 5000:5000 \
  -e JWT_SECRET=<long-random-secret> \
  -e GROQ_API_KEY=<your-groq-api-key> \
  -e MONGO_URI=<your-mongodb-atlas-connection-string> \
  -e APP_URL=http://localhost:5000 \
  -e SMTP_HOST=<your-smtp-host> \
  -e SMTP_PORT=587 \
  -e SMTP_USER=<your-smtp-username> \
  -e SMTP_PASS=<your-smtp-password> \
  hospital-booking-system
```

Open:

```text
http://localhost:5000
```

## GitHub Submission

After pushing:

```text
https://github.com/<your-username>/hospital-bed-appointment-booking-system
```
