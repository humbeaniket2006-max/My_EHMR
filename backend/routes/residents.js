const express = require('express');
const { body, param } = require('express-validator');
const Booking = require('../models/Booking');
const Hospital = require('../models/Hospital');
const Resident = require('../models/Resident');
const User = require('../models/User');
const { auth, adminOnly } = require('../middleware/auth');
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

async function hospitalScopedResidentQuery(req, extra = {}) {
  if (canSeeDemo(req)) return extra;
  const hospital = await hospitalForRequest(req);
  if (!hospital) return { ...extra, createdBy: req.user.id };
  const bookings = await Booking.find({
    hospitalId: hospital._id,
    status: { $in: ['pending', 'confirmed', 'rescheduled'] }
  }).select('userId');
  const patientUserIds = bookings.map(booking => booking.userId).filter(Boolean);
  return { ...extra, createdBy: { $in: patientUserIds } };
}

async function hospitalForRequest(req) {
  const user = await User.findById(req.user.id);
  if (user?.hospitalId || user?.linkedHospitalId) {
    return Hospital.findById(user.hospitalId || user.linkedHospitalId);
  }
  if (req.user.role === 'hospital') return Hospital.findOne({ linkedUserId: req.user.id });
  return null;
}

async function shouldUseHospitalScope(req) {
  if (canSeeDemo(req)) return false;
  return Boolean(await hospitalForRequest(req));
}

async function findOwnedResident(req, residentId) {
  if (await shouldUseHospitalScope(req)) {
    const query = await hospitalScopedResidentQuery(req, { residentId });
    return Resident.findOne(query);
  }
  if (!canSeeDemo(req) && req.user.role === 'viewer' && residentId === 'R001') {
    return Resident.findOne({ createdBy: req.user.id });
  }
  return Resident.findOne(ownedQuery(req, { residentId }));
}

router.get('/', asyncHandler(async (req, res) => {
  if (req.user.role === 'viewer') {
    let residents = await Resident.find({ createdBy: req.user.id }).sort({ residentId: 1 });
    if (!residents.length && req.user.email === 'patient@ehmr.com') {
      residents = await Resident.find({ residentId: 'P-DEMO' }).sort({ residentId: 1 });
    }
    return ok(res, { residents });
  }

  const query = await shouldUseHospitalScope(req)
    ? await hospitalScopedResidentQuery(req)
    : ownedQuery(req);
  const residents = await Resident.find(query).sort({ residentId: 1 });
  return ok(res, { residents });
}));

router.post('/', [
  body('residentId').trim().notEmpty(),
  body('name').trim().notEmpty(),
  body('age').optional().isNumeric()
], validate, asyncHandler(async (req, res) => {
  const resident = await Resident.create({ ...req.body, createdBy: req.user.id });
  return ok(res, { resident }, 201);
}));

router.get('/:id', [param('id').trim().notEmpty()], validate, asyncHandler(async (req, res) => {
  const resident = await findOwnedResident(req, req.params.id);
  if (!resident) return fail(res, 'Resident not found', 404);
  return ok(res, { resident });
}));

router.put('/:id', [param('id').trim().notEmpty()], validate, asyncHandler(async (req, res) => {
  const target = await findOwnedResident(req, req.params.id);
  if (!target) return fail(res, 'Resident not found', 404);
  const resident = await Resident.findOneAndUpdate(
    { _id: target._id },
    { ...req.body, updatedAt: new Date() },
    { new: true, runValidators: true }
  );
  if (!resident) return fail(res, 'Resident not found', 404);
  return ok(res, { resident });
}));

router.delete('/:id', adminOnly, [param('id').trim().notEmpty()], validate, asyncHandler(async (req, res) => {
  const resident = await Resident.findOneAndDelete(ownedQuery(req, { residentId: req.params.id }));
  if (!resident) return fail(res, 'Resident not found', 404);
  return ok(res, { deleted: true });
}));

module.exports = router;
