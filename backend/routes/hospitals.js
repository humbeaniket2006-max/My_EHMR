const express = require('express');
const { body, param } = require('express-validator');
const Hospital = require('../models/Hospital');
const { auth, adminOnly } = require('../middleware/auth');
const asyncHandler = require('../utils/asyncHandler');
const validate = require('../utils/validate');
const { ok, fail } = require('../utils/respond');

const router = express.Router();

function frontendHospital(hospital) {
  const [lng, lat] = hospital.location.coordinates;
  return {
    id: String(hospital._id),
    _id: hospital._id,
    name: hospital.name,
    address: hospital.address,
    area: hospital.address,
    lat,
    lng,
    phone: hospital.phone,
    email: hospital.email,
    website: hospital.website,
    departments: hospital.departments,
    beds: hospital.beds,
    doctors: hospital.doctors,
    status: hospital.status,
    rating: hospital.rating,
    image: hospital.image
  };
}

router.get('/', asyncHandler(async (req, res) => {
  const query = {};
  if (req.query.dept) query.departments = req.query.dept;
  if (req.query.available === 'true') query.status = 'available';

  const hospitals = await Hospital.find(query).sort({ rating: -1, name: 1 });
  const bedType = req.query.bedType;
  const filtered = bedType
    ? hospitals.filter(hospital => hospital.beds?.[bedType]?.available > 0 || req.query.available !== 'true')
    : hospitals;
  return ok(res, { hospitals: filtered.map(frontendHospital) });
}));

router.get('/:id', [param('id').isMongoId()], validate, asyncHandler(async (req, res) => {
  const hospital = await Hospital.findById(req.params.id);
  if (!hospital) return fail(res, 'Hospital not found', 404);
  return ok(res, { hospital: frontendHospital(hospital) });
}));

router.post('/', auth, adminOnly, [
  body('name').trim().notEmpty(),
  body('address').trim().notEmpty(),
  body('location.coordinates').isArray({ min: 2, max: 2 })
], validate, asyncHandler(async (req, res) => {
  const hospital = await Hospital.create({ ...req.body, createdBy: req.user.id });
  return ok(res, { hospital: frontendHospital(hospital) }, 201);
}));

router.put('/:id', auth, adminOnly, [param('id').isMongoId()], validate, asyncHandler(async (req, res) => {
  const query = req.user.email === 'admin@ehmr.com' ? { _id: req.params.id } : { _id: req.params.id, createdBy: req.user.id };
  const hospital = await Hospital.findOneAndUpdate(query, req.body, { new: true, runValidators: true });
  if (!hospital) return fail(res, 'Hospital not found', 404);
  return ok(res, { hospital: frontendHospital(hospital) });
}));

module.exports = router;
