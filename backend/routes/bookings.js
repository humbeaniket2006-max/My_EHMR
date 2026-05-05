const express = require('express');
const { body, param } = require('express-validator');
const Booking = require('../models/Booking');
const Hospital = require('../models/Hospital');
const Notification = require('../models/Notification');
const Resident = require('../models/Resident');
const SharedRecord = require('../models/SharedRecord');
const User = require('../models/User');
const { auth } = require('../middleware/auth');
const asyncHandler = require('../utils/asyncHandler');
const validate = require('../utils/validate');
const { ok, fail } = require('../utils/respond');

const router = express.Router();
router.use(auth);

function bookingCode() {
  return `BK-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

function priceFor(type, bedType, doctor) {
  if (type === 'appointment') return Number(doctor?.fee || 500);
  return { general: 1800, icu: 9000, private: 5200 }[bedType] || 1500;
}

async function hospitalForUser(userId) {
  return Hospital.findOne({ linkedUserId: userId });
}

async function hospitalForRequest(req) {
  const user = await User.findById(req.user.id);
  if (user?.hospitalId || user?.linkedHospitalId) {
    return Hospital.findById(user.hospitalId || user.linkedHospitalId);
  }
  if (req.user.role === 'hospital') return hospitalForUser(req.user.id);
  return null;
}

async function patientSnapshot(userId) {
  const resident = await Resident.findOne({ createdBy: userId }).sort({ updatedAt: -1 });
  if (!resident) {
    return {
      name: 'Patient',
      age: 0,
      conditions: [],
      allergies: [],
      currentMedications: [],
      recentVitals: [],
      recentLabs: []
    };
  }
  return {
    name: resident.name,
    age: resident.age,
    conditions: resident.conditions || [],
    allergies: resident.allergies || [],
    currentMedications: resident.medications || [],
    recentVitals: (resident.vitals || []).slice(-3).reverse(),
    recentLabs: (resident.labs || []).slice(-3).reverse()
  };
}

async function notifyHospital({ hospital, booking, user, patientName, department }) {
  if (!hospital.linkedUserId) return null;
  return Notification.create({
    recipientUserId: hospital.linkedUserId,
    type: 'new_booking',
    title: 'New Patient Booking',
    message: `${patientName} has booked a ${booking.type} on ${booking.date ? booking.date.toISOString().slice(0, 10) : 'selected date'} at ${booking.timeSlot || 'selected time'} Department: ${department || 'General'} | Booking ID: ${booking.bookingId}`,
    bookingId: booking._id,
    patientId: user.id,
    read: false
  });
}

async function sharePatientRecord({ hospital, booking, user, sharedData }) {
  return SharedRecord.findOneAndUpdate(
    { hospitalId: hospital._id, bookingId: booking._id },
    {
      hospitalId: hospital._id,
      patientUserId: user.id,
      bookingId: booking._id,
      sharedData,
      sharedAt: new Date(),
      accessStatus: 'active'
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
}

router.post('/', [
  body('hospitalId').isMongoId(),
  body('type').isIn(['appointment', 'bed']),
  body('date').optional().isISO8601()
], validate, asyncHandler(async (req, res) => {
  const hospital = await Hospital.findById(req.body.hospitalId);
  if (!hospital) return fail(res, 'Hospital not found', 404);

  const type = req.body.type;
  const bedType = req.body.bedType || '';
  const doctor = hospital.doctors.find(item => item.name === req.body.doctor || item.name === req.body.doctorName);
  const department = req.body.department || doctor?.dept || hospital.departments?.[0] || 'General';

  if (type === 'bed') {
    if (!['general', 'icu', 'private'].includes(bedType)) return fail(res, 'Invalid bed type', 422);
    if (hospital.beds[bedType].available <= 0) return fail(res, 'Selected bed type is unavailable', 409);
    hospital.beds[bedType].available -= 1;
    await hospital.save();
  }

  const booking = await Booking.create({
    userId: req.user.id,
    hospitalId: hospital._id,
    type,
    department,
    doctor: req.body.doctor || req.body.doctorName,
    bedType,
    date: req.body.date,
    timeSlot: req.body.timeSlot || req.body.time,
    status: 'confirmed',
    bookingId: bookingCode(),
    estimatedCost: priceFor(type, bedType, doctor)
  });

  const snapshot = await patientSnapshot(req.user.id);
  const notification = await notifyHospital({
    hospital,
    booking,
    user: req.user,
    patientName: snapshot.name || 'Patient',
    department
  });

  let sharedRecord = null;
  if (req.body.shareHealthSummary !== false) {
    sharedRecord = await sharePatientRecord({
      hospital,
      booking,
      user: req.user,
      sharedData: snapshot
    });
  }

  return ok(res, {
    booking,
    notification,
    sharedRecord,
    recordsShared: Boolean(sharedRecord)
  }, 201);
}));

router.get('/me', asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ userId: req.user.id }).populate('hospitalId').sort({ createdAt: -1 });
  return ok(res, { bookings });
}));

router.put('/:id/cancel', [param('id').isMongoId()], validate, asyncHandler(async (req, res) => {
  const booking = await Booking.findOne({ _id: req.params.id, userId: req.user.id });
  if (!booking) return fail(res, 'Booking not found', 404);
  const bookingTime = booking.date ? booking.date.getTime() : Date.now();
  if (bookingTime - Date.now() < 24 * 60 * 60 * 1000) {
    return fail(res, 'Bookings can be cancelled only before 24 hours', 409);
  }
  booking.status = 'cancelled';
  await booking.save();
  return ok(res, { booking });
}));

router.get('/', asyncHandler(async (req, res) => {
  const query = {};
  const linkedHospital = await hospitalForRequest(req);
  if (linkedHospital) {
    const hospital = linkedHospital;
    if (!hospital) return fail(res, 'No linked hospital found for this account', 404);
    if (req.query.hospitalId && String(req.query.hospitalId) !== String(hospital._id)) {
      return fail(res, 'Hospital access denied', 403);
    }
    query.hospitalId = hospital._id;
  } else if (req.user.role === 'admin') {
    if (req.query.hospitalId) query.hospitalId = req.query.hospitalId;
  } else {
    return fail(res, 'Hospital access required', 403);
  }
  const bookings = await Booking.find(query).populate('userId hospitalId').sort({ createdAt: -1 });
  return ok(res, { bookings });
}));

router.patch('/:id/status', [
  param('id').isMongoId(),
  body('status').isIn(['pending', 'confirmed', 'rescheduled', 'cancelled', 'completed'])
], validate, asyncHandler(async (req, res) => {
  const query = { _id: req.params.id };
  const linkedHospital = await hospitalForRequest(req);
  if (linkedHospital) {
    const hospital = linkedHospital;
    if (!hospital) return fail(res, 'No linked hospital found for this account', 404);
    query.hospitalId = hospital._id;
  } else if (req.user.role !== 'admin') {
    return fail(res, 'Hospital access required', 403);
  }

  const booking = await Booking.findOne(query);
  if (!booking) return fail(res, 'Booking not found', 404);
  booking.status = req.body.status;
  if (req.body.date) booking.date = req.body.date;
  if (req.body.timeSlot || req.body.time) booking.timeSlot = req.body.timeSlot || req.body.time;
  await booking.save();

  if (booking.status === 'completed') {
    await SharedRecord.updateOne({ bookingId: booking._id }, { accessStatus: 'expired' });
  }

  return ok(res, { booking });
}));

module.exports = router;
