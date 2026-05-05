const express = require('express');
const { body, param } = require('express-validator');
const Notification = require('../models/Notification');
const Hospital = require('../models/Hospital');
const User = require('../models/User');
const { auth } = require('../middleware/auth');
const asyncHandler = require('../utils/asyncHandler');
const validate = require('../utils/validate');
const { ok, fail } = require('../utils/respond');

const router = express.Router();
router.use(auth);

async function notificationRecipientIds(req) {
  const ids = [req.user.id];
  const user = await User.findById(req.user.id);
  let hospital = null;
  if (user?.hospitalId || user?.linkedHospitalId) {
    hospital = await Hospital.findById(user.hospitalId || user.linkedHospitalId);
  }
  if (!hospital && req.user.role === 'hospital') {
    hospital = await Hospital.findOne({ linkedUserId: req.user.id });
  }
  if (hospital?.linkedUserId) ids.push(String(hospital.linkedUserId));
  return [...new Set(ids)];
}

router.get('/mine', asyncHandler(async (req, res) => {
  const recipientIds = await notificationRecipientIds(req);
  const query = { recipientUserId: { $in: recipientIds } };
  if (req.query.unreadOnly === 'true') query.read = false;
  const notifications = await Notification.find(query)
    .populate('bookingId patientId')
    .sort({ createdAt: -1 });
  return ok(res, { notifications });
}));

router.post('/hospital', [
  body('hospitalId').isMongoId(),
  body('type').optional().trim(),
  body('title').trim().notEmpty(),
  body('message').trim().notEmpty()
], validate, asyncHandler(async (req, res) => {
  const hospital = await Hospital.findById(req.body.hospitalId);
  if (!hospital) return fail(res, 'Hospital not found', 404);
  if (!hospital.linkedUserId) return fail(res, 'Hospital has no linked staff account', 404);

  const notification = await Notification.create({
    recipientUserId: hospital.linkedUserId,
    type: req.body.type || 'hospital_update',
    title: req.body.title,
    message: req.body.message,
    patientId: req.user.id,
    read: false
  });

  return ok(res, { notification }, 201);
}));

router.patch('/:id/read', [param('id').isMongoId()], validate, asyncHandler(async (req, res) => {
  const recipientIds = await notificationRecipientIds(req);
  const notification = await Notification.findOne({ _id: req.params.id, recipientUserId: { $in: recipientIds } });
  if (!notification) return fail(res, 'Notification not found', 404);
  notification.read = true;
  await notification.save();
  return ok(res, { notification });
}));

module.exports = router;
