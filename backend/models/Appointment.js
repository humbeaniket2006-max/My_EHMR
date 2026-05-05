const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  residentId: { type: String, required: true },
  type: { type: String, default: 'doctor' },
  doctor: { type: String, required: true },
  department: String,
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital' },
  hospitalName: String,
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
  recordsShared: { type: Boolean, default: false },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  status: { type: String, enum: ['scheduled', 'completed', 'cancelled'], default: 'scheduled' },
  notes: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

appointmentSchema.index({ residentId: 1, date: 1 });

module.exports = mongoose.model('Appointment', appointmentSchema);
