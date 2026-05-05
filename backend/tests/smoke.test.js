const assert = require('assert');
const mongoose = require('mongoose');
const { app, connectDb } = require('../server');

async function request(baseUrl, path, options = {}) {
  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  });
  const data = await response.json().catch(() => ({}));
  return { response, data };
}

async function run() {
  if (!process.env.MONGO_URI && !process.env.MONGODB_URI) {
    console.log('Smoke tests skipped: MONGO_URI is not configured');
    return;
  }

  await connectDb();
  const server = app.listen(0);
  await new Promise(resolve => server.once('listening', resolve));
  const { port } = server.address();
  const baseUrl = `http://127.0.0.1:${port}`;
  const email = `smoke-${Date.now()}@ehmr.com`;
  const hospitalEmail = `smoke-hospital-${Date.now()}@ehmr.com`;

  try {
    const register = await request(baseUrl, '/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name: 'Smoke User', email, password: 'Smoke@123', role: 'viewer' })
    });
    assert.strictEqual(register.response.status, 201);
    assert.strictEqual(register.data.success, true);
    assert.ok(register.data.data.token);

    const me = await request(baseUrl, '/api/auth/me', {
      headers: { Authorization: `Bearer ${register.data.data.token}` }
    });
    assert.strictEqual(me.response.status, 200);
    assert.strictEqual(me.data.data.user.email, email);

    const demoPatient = await request(baseUrl, '/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: 'patient@ehmr.com', password: 'Patient@123' })
    });
    assert.strictEqual(demoPatient.response.status, 200);
    assert.strictEqual(demoPatient.data.data.user.email, 'patient@ehmr.com');
    assert.strictEqual(demoPatient.data.data.user.role, 'viewer');

    const residents = await request(baseUrl, '/api/residents', {
      headers: { Authorization: `Bearer ${register.data.data.token}` }
    });
    assert.strictEqual(residents.response.status, 200);

    const hospitals = await request(baseUrl, '/api/hospitals');
    assert.strictEqual(hospitals.response.status, 200);

    const hospitalRegister = await request(baseUrl, '/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Smoke Hospital Staff',
        email: hospitalEmail,
        password: 'Hospital@123',
        role: 'hospital',
        hospitalName: 'Smoke Test Hospital',
        hospitalAddress: 'Smoke Test Road',
        hospitalDepartments: 'General, Cardiology',
        hospitalPhone: '9999999999',
        hospitalLat: 12.9716,
        hospitalLng: 77.5946
      })
    });
    assert.strictEqual(hospitalRegister.response.status, 201);
    const hospitalToken = hospitalRegister.data.data.token;
    const hospitalId = hospitalRegister.data.data.user.hospitalId;

    const booking = await request(baseUrl, '/api/bookings', {
      method: 'POST',
      headers: { Authorization: `Bearer ${register.data.data.token}` },
      body: JSON.stringify({
        hospitalId,
        type: 'appointment',
        department: 'General',
        doctorName: 'Smoke Hospital Staff',
        date: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
        timeSlot: '11:30',
        shareHealthSummary: true
      })
    });
    assert.strictEqual(booking.response.status, 201);
    assert.strictEqual(booking.data.data.recordsShared, true);

    const notifications = await request(baseUrl, '/api/notifications/mine?unreadOnly=true', {
      headers: { Authorization: `Bearer ${hospitalToken}` }
    });
    assert.strictEqual(notifications.response.status, 200);
    assert.ok(notifications.data.data.notifications.some(n => n.bookingId._id === booking.data.data.booking._id));

    const sharedRecords = await request(baseUrl, '/api/shared-records', {
      headers: { Authorization: `Bearer ${hospitalToken}` }
    });
    assert.strictEqual(sharedRecords.response.status, 200);
    assert.ok(sharedRecords.data.data.records.some(r => r.bookingId._id === booking.data.data.booking._id));

    const sharedRecord = await request(baseUrl, `/api/shared-records/${booking.data.data.booking._id}`, {
      headers: { Authorization: `Bearer ${hospitalToken}` }
    });
    assert.strictEqual(sharedRecord.response.status, 200);
    assert.strictEqual(sharedRecord.data.data.record.accessStatus, 'active');

    const complete = await request(baseUrl, `/api/bookings/${booking.data.data.booking._id}/status`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${hospitalToken}` },
      body: JSON.stringify({ status: 'completed' })
    });
    assert.strictEqual(complete.response.status, 200);

    const appt = await request(baseUrl, '/api/appointments', {
      method: 'POST',
      headers: { Authorization: `Bearer ${register.data.data.token}` },
      body: JSON.stringify({
        patientId: 'R001',
        doctorName: 'Dr. Priya Nair',
        date: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
        time: '10:00',
        reason: 'Smoke test'
      })
    });
    assert.strictEqual(appt.response.status, 201);
    assert.ok(appt.data.data.appointment.id);

    console.log('Smoke tests passed');
  } finally {
    await new Promise(resolve => server.close(resolve));
    await mongoose.disconnect();
  }
}

run().catch(error => {
  console.error(error);
  process.exit(1);
});
