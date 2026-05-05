const express = require('express');
const asyncHandler = require('../utils/asyncHandler');
const { ok } = require('../utils/respond');

const router = express.Router();

router.post('/ai-insight', asyncHandler(async (req, res) => {
  const fallback = {
    riskLevel: 'Medium',
    insight: 'Vitals and records should be reviewed with the care team.',
    recommendation: 'Continue monitoring and book a routine doctor review if symptoms change.',
    score: 78,
    visitWindow: 'Routine review within 7 days',
    actions: []
  };
  return ok(res, fallback);
}));

module.exports = router;
