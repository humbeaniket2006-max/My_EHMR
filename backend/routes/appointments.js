const express = require('express');
const { body, param } = require('express-validator');
const Appointment = require('../models/Appointment');
const { auth } = require('../middleware/auth');
const asyncHandler = require('../utils/asyncHandler');
const validate = require('../utils/validate');
const { ok, fail } = require('../utils/respond');

const router = express.Router();
router.use(auth);

function canSeeDemo(req) {
  return req.user.email === 'admin@ehmr.com';
}

function ownedQuery(req, extra = {}) {
  return canSeeDemo(req) ? extra : { ...extra, createdBy: req.user.id };
}

function toFrontend(appt) {
  return {
    id: String(appt._id),
    patientId: appt.residentId,
    doctorName: appt.doctor,
    hospitalId: appt.hospitalId,
    hospitalName: appt.hospitalName,
    bookingId: appt.bookingId ? String(appt.bookingId) : '',
    recordsShared: Boolean(appt.recordsShared),
    department: appt.department,
    date: appt.date ? appt.date.toISOString().slice(0, 10) : '',
    time: appt.time,
    status: appt.status === 'scheduled' ? 'Scheduled' : appt.status[0].toUpperCase() + appt.status.slice(1),
    reason: appt.notes,
    type: appt.type
  };
}

router.get('/', asyncHandler(async (req, res) => {
  const query = ownedQuery(req, req.query.residentId ? { residentId: req.query.residentId } : {});
  const appointments = await Appointment.find(query).sort({ date: 1, time: 1 });
  return ok(res, { appointments: appointments.map(toFrontend) });
}));

router.post('/', [
  body('patientId').optional().trim().notEmpty(),
  body('residentId').optional().trim().notEmpty(),
  body('doctorName').optional().trim().notEmpty(),
  body('doctor').optional().trim().notEmpty(),
  body('date').isISO8601(),
  body('time').notEmpty()
], validate, asyncHandler(async (req, res) => {
  const appointment = await Appointment.create({
    residentId: req.body.residentId || req.body.patientId,
    type: req.body.type || 'doctor',
    doctor: req.body.doctor || req.body.doctorName,
    department: req.body.department,
    hospitalId: req.body.hospitalId || undefined,
    hospitalName: req.body.hospitalName,
    bookingId: req.body.bookingId || undefined,
    recordsShared: Boolean(req.body.recordsShared),
    date: req.body.date,
    time: req.body.time,
    notes: req.body.notes || req.body.reason,
    createdBy: req.user.id
  });
  return ok(res, { appointment: toFrontend(appointment) }, 201);
}));

router.put('/:id', [
  param('id').isMongoId(),
  body('status').optional().isIn(['scheduled', 'completed', 'cancelled', 'Scheduled', 'Completed', 'Cancelled'])
], validate, asyncHandler(async (req, res) => {
  const updates = { ...req.body };
  if (updates.status) updates.status = String(updates.status).toLowerCase();
  const appointment = await Appointment.findOneAndUpdate(ownedQuery(req, { _id: req.params.id }), updates, { new: true, runValidators: true });
  if (!appointment) return fail(res, 'Appointment not found', 404);
  return ok(res, { appointment: toFrontend(appointment) });
}));

router.delete('/:id', [param('id').isMongoId()], validate, asyncHandler(async (req, res) => {
  const appointment = await Appointment.findOneAndDelete(ownedQuery(req, { _id: req.params.id }));
  if (!appointment) return fail(res, 'Appointment not found', 404);
  return ok(res, { deleted: true });
}));

module.exports = router;
