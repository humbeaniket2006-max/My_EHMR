function ok(res, data = {}, status = 200) {
  return res.status(status).json({ success: true, data });
}

function fail(res, message = 'Request failed', status = 400, errors = undefined) {
  return res.status(status).json({ success: false, message, ...(errors ? { errors } : {}) });
}

module.exports = { ok, fail };
