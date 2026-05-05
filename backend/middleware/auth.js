const jwt = require('jsonwebtoken');
const { fail } = require('../utils/respond');

function auth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (!token) {
    return fail(res, 'Authentication required', 401);
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch (error) {
    return fail(res, 'Invalid or expired token', 401);
  }
}

function adminOnly(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return fail(res, 'Admin access required', 403);
  }
  return next();
}

function hospitalOnly(req, res, next) {
  if (!req.user || req.user.role !== 'hospital') {
    return fail(res, 'Hospital access required', 403);
  }
  return next();
}

module.exports = { auth, adminOnly, hospitalOnly };
