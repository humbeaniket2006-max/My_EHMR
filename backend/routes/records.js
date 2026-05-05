const express = require('express');
const { body } = require('express-validator');
const Record = require('../models/Record');
const { auth } = require('../middleware/auth');
const asyncHandler = require('../utils/asyncHandler');
const validate = require('../utils/validate');
const { ok } = require('../utils/respond');

const router = express.Router();
router.use(auth);

router.get('/', asyncHandler(async (req, res) => {
  const records = await Record.find({ userId: req.user.id }).sort({ createdAt: -1 });
  return ok(res, { records });
}));

router.post('/', [
  body('type').trim().notEmpty(),
  body('title').trim().notEmpty()
], validate, asyncHandler(async (req, res) => {
  const record = await Record.create({ ...req.body, userId: req.user.id });
  return ok(res, { record }, 201);
}));

module.exports = router;
