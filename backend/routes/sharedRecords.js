const express = require('express');
const mongoose = require('mongoose');
const SharedRecord = require('../models/SharedRecord');
const Hospital = require('../models/Hospital');
const Booking = require('../models/Booking');
const User = require('../models/User');
const { auth } = require('../middleware/auth');
const asyncHandler = require('../utils/asyncHandler');
const { ok, fail } = require('../utils/respond');

const router = express.Router();
router.use(auth);

async function linkedHospital(req) {
  const user = await User.findById(req.user.id);
  if (user?.hospitalId || user?.linkedHospitalId) {
    return Hospital.findById(user.hospitalId || user.linkedHospitalId);
  }
  return Hospital.findOne({ linkedUserId: req.user.id });
}

router.get('/', asyncHandler(async (req, res) => {
  const hospital = await linkedHospital(req);
  if (!hospital) return fail(res, 'No linked hospital found for this account', 404);
  const records = await SharedRecord.find({ hospitalId: hospital._id })
    .populate('patientUserId', 'name email')
    .populate('bookingId')
    .sort({ sharedAt: -1 });
  return ok(res, { records, hospital });
}));

router.get('/:bookingId', asyncHandler(async (req, res) => {
  const hospital = await linkedHospital(req);
  if (!hospital) return fail(res, 'No linked hospital found for this account', 404);

  let bookingObjectId = req.params.bookingId;
  if (!mongoose.Types.ObjectId.isValid(bookingObjectId)) {
    const booking = await Booking.findOne({ bookingId: req.params.bookingId, hospitalId: hospital._id });
    if (!booking) return fail(res, 'Shared record not found', 404);
    bookingObjectId = booking._id;
  }

  const record = await SharedRecord.findOne({ hospitalId: hospital._id, bookingId: bookingObjectId })
    .populate('patientUserId', 'name email')
    .populate('bookingId');
  if (!record) return fail(res, 'Shared record not found', 404);
  if (record.accessStatus !== 'active') return fail(res, 'Shared record access has expired', 403);
  return ok(res, { record });
}));

module.exports = router;
