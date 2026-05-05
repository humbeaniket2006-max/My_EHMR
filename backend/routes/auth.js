const express = require('express');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { body } = require('express-validator');
const User = require('../models/User');
const Resident = require('../models/Resident');
const Hospital = require('../models/Hospital');
const { auth } = require('../middleware/auth');
const asyncHandler = require('../utils/asyncHandler');
const validate = require('../utils/validate');
const { ok, fail } = require('../utils/respond');
const { sendPasswordResetEmail, sendWelcomeEmail } = require('../services/emailService');

const router = express.Router();

async function publicUser(user) {
  let hospital = null;
  const directHospitalId = user.hospitalId || user.linkedHospitalId;
  if (directHospitalId) hospital = await Hospital.findById(directHospitalId);
  if (!hospital && user.role === 'hospital') hospital = await Hospital.findOne({ linkedUserId: user._id });
  const hospitalId = directHospitalId || hospital?._id;
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    hospitalId: hospitalId || undefined,
    linkedHospitalId: hospitalId || undefined,
    hospitalName: user.hospitalName || hospital?.name || undefined
  };
}

function sign(user) {
  return jwt.sign(
    { id: String(user._id), email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
}

function hashResetToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

function normalizeRole(role) {
  if (role === 'patient') return 'viewer';
  return ['admin', 'staff', 'viewer', 'hospital'].includes(role) ? role : 'viewer';
}

function hospitalLoginEmail(name) {
  return `admin@${String(name).toLowerCase().replace(/[^a-z0-9]/g, '')}.com`;
}

async function syncDemoPatientResident(user) {
  await Resident.updateOne(
    { residentId: 'P-DEMO' },
    {
      $set: {
        residentId: 'P-DEMO',
        name: 'Ramesh Iyer',
        age: 78,
        room: '204-A',
        conditions: ['Type 2 Diabetes', 'Hypertension', 'Mild Arthritis'],
        allergies: ['Penicillin severe', 'Aspirin moderate'],
        vitals: [{ date: new Date(), bp: '142/88', hr: 84, spo2: 93, temp: 36.9, weight: 67.8 }],
        medications: [{ name: 'Metformin', dose: '500mg', frequency: 'Twice daily', startDate: new Date() }],
        notes: [{ shift: 'Morning', date: new Date(), author: 'Sunita Rao', note: 'Mild fatigue, fasting sugar high', tasks: ['Repeat vitals'] }],
        labs: [{ test: 'HbA1c', result: '7.8', unit: '%', ref: '< 7.0', status: 'high', date: new Date() }],
        createdBy: user._id
      }
    },
    { upsert: true }
  );
}

async function ensureDemoPatient(email, password) {
  if (email !== 'patient@ehmr.com' || password !== 'Patient@123') return null;

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({
    name: 'Demo Patient',
    email,
    passwordHash,
    role: 'viewer'
  });

  await syncDemoPatientResident(user);
  return user;
}

router.post('/register', [
  body('name').trim().notEmpty(),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }),
  body('role').optional().isIn(['admin', 'staff', 'viewer', 'hospital', 'patient']),
  body('hospitalName').optional().trim(),
  body('hospitalAddress').optional().trim(),
  body('hospitalLat').optional().isFloat({ min: -90, max: 90 }),
  body('hospitalLng').optional().isFloat({ min: -180, max: 180 })
], validate, asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const role = normalizeRole(req.body.role);
  const exists = await User.findOne({ email });
  if (exists) return fail(res, 'Email is already registered', 409);
  if (['admin', 'staff', 'hospital'].includes(role)) {
    if (!req.body.hospitalName || !req.body.hospitalAddress || req.body.hospitalLat === undefined || req.body.hospitalLng === undefined) {
      return fail(res, 'Hospital name, address, latitude, and longitude are required for hospital registration', 400);
    }
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({ name, email, passwordHash, role, lastLogin: new Date() });
  if (role === 'viewer') {
    await Resident.create({
      residentId: `P-${String(user._id).slice(-6).toUpperCase()}`,
      name,
      age: Number(req.body.age) || 0,
      room: 'Personal',
      conditions: [],
      allergies: [],
      createdBy: user._id
    });
  }
  if (['admin', 'staff', 'hospital'].includes(role)) {
    const departments = String(req.body.hospitalDepartments || 'General')
      .split(',')
      .map(item => item.trim())
      .filter(Boolean);
    let linkedUser = user;
    if (role !== 'hospital') {
      const linkedEmail = hospitalLoginEmail(req.body.hospitalName);
      linkedUser = await User.findOneAndUpdate(
        { email: linkedEmail },
        {
          $setOnInsert: {
            name: `${req.body.hospitalName} Staff`,
            email: linkedEmail,
            passwordHash: await bcrypt.hash('Hospital@123', 12),
            role: 'hospital'
          }
        },
        { upsert: true, new: true }
      );
    }
    const hospital = await Hospital.create({
      name: req.body.hospitalName,
      address: req.body.hospitalAddress,
      location: {
        type: 'Point',
        coordinates: [Number(req.body.hospitalLng), Number(req.body.hospitalLat)]
      },
      phone: req.body.hospitalPhone || '',
      email,
      departments,
      beds: {
        general: { total: 20, available: 20 },
        icu: { total: 5, available: 5 },
        private: { total: 8, available: 8 }
      },
      doctors: [{ name, dept: departments[0] || 'General', available: true, fee: 500 }],
      status: 'available',
      rating: 4.2,
      createdBy: user._id,
      linkedUserId: linkedUser._id
    });
    user.hospitalId = hospital._id;
    user.linkedHospitalId = hospital._id;
    user.hospitalName = hospital.name;
    await user.save();
    if (linkedUser._id.toString() !== user._id.toString()) {
      linkedUser.hospitalId = hospital._id;
      linkedUser.linkedHospitalId = hospital._id;
      linkedUser.hospitalName = hospital.name;
      await linkedUser.save();
    }
  }
  try {
    await sendWelcomeEmail(user);
  } catch (error) {
    console.error('Welcome email failed:', error.message);
  }
  return ok(res, { token: sign(user), user: await publicUser(user) }, 201);
}));

router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty()
], validate, asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email }) || await ensureDemoPatient(req.body.email, req.body.password);
  if (!user) return fail(res, 'Invalid email or password', 401);

  const matches = await bcrypt.compare(req.body.password, user.passwordHash);
  if (!matches) return fail(res, 'Invalid email or password', 401);

  if (req.body.email === 'patient@ehmr.com' && req.body.password === 'Patient@123') {
    await syncDemoPatientResident(user);
  }
  user.lastLogin = new Date();
  await user.save();
  return ok(res, { token: sign(user), user: await publicUser(user) });
}));

router.get('/me', auth, asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return fail(res, 'User not found', 404);
  return ok(res, { user: await publicUser(user) });
}));

router.post('/forgot-password', [
  body('email').isEmail().normalizeEmail()
], validate, asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (user) {
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.passwordResetTokenHash = hashResetToken(resetToken);
    user.passwordResetExpires = new Date(Date.now() + 30 * 60 * 1000);
    await user.save();

    try {
      await sendPasswordResetEmail(user, resetToken);
    } catch (error) {
      console.error('Password reset email failed:', error.message);
    }
  }

  return ok(res, {
    message: 'If an account exists for this email, a password reset link has been sent.'
  });
}));

router.post('/reset-password', [
  body('token').trim().notEmpty(),
  body('password').isLength({ min: 8 })
], validate, asyncHandler(async (req, res) => {
  const user = await User.findOne({
    passwordResetTokenHash: hashResetToken(req.body.token),
    passwordResetExpires: { $gt: new Date() }
  });

  if (!user) return fail(res, 'Password reset link is invalid or expired', 400);

  user.passwordHash = await bcrypt.hash(req.body.password, 12);
  user.passwordResetTokenHash = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  return ok(res, { message: 'Password has been reset. You can sign in now.' });
}));

module.exports = router;
