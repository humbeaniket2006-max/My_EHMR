const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config({ path: path.join(__dirname, '.env') });
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const authRoutes = require('./routes/auth');
const residentRoutes = require('./routes/residents');
const appointmentRoutes = require('./routes/appointments');
const hospitalRoutes = require('./routes/hospitals');
const bookingRoutes = require('./routes/bookings');
const recordRoutes = require('./routes/records');
const notificationRoutes = require('./routes/notifications');
const sharedRecordRoutes = require('./routes/sharedRecords');
const aiRoutes = require('./routes/ai');
const { fail } = require('./utils/respond');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;
const frontendDir = path.join(__dirname, '..', 'frontend');

app.use(helmet({
  contentSecurityPolicy: false
}));
app.use(cors({
  origin: process.env.FRONTEND_URL || true,
  credentials: true
}));
app.use(express.json({ limit: '2mb' }));

app.use('/api/auth', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false
}));

app.use(express.static(frontendDir));

app.use('/api/auth', authRoutes);
app.use('/api/residents', residentRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/hospitals', hospitalRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/records', recordRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/shared-records', sharedRecordRoutes);
app.use('/api', aiRoutes);

app.get('/api/availability', (req, res) => {
  const slots = ['09:00', '10:00', '11:30', '14:00', '15:30', '17:00'].map(time => ({
    time,
    available: true,
    booked: false,
    break: false
  }));
  res.json({
    success: true,
    data: {
      date: req.query.date,
      availability: [{
        name: req.query.doctorName || 'Dr. Priya Nair',
        slots
      }]
    }
  });
});

app.use('/api', (req, res) => fail(res, 'Route not found', 404));

app.get('*', (req, res) => {
  res.sendFile(path.join(frontendDir, 'index.html'));
});

app.use((err, req, res, next) => {
  console.error(err);
  return fail(res, err.message || 'Server error', err.status || 500);
});

async function connectDb() {
  if (!MONGO_URI) {
    throw new Error('MONGO_URI is required. Add it to backend/.env or root .env.');
  }
  await mongoose.connect(MONGO_URI);
  console.log('MongoDB connected');
}

async function start() {
  await connectDb();
  app.listen(PORT, () => {
    console.log(`EHMR AI server running at http://localhost:${PORT}`);
  });
}

if (require.main === module) {
  start().catch(error => {
    console.error(error);
    process.exit(1);
  });
}

module.exports = { app, connectDb };
