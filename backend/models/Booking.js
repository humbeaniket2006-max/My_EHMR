const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true },
  type: { type: String, enum: ['appointment', 'bed'], required: true },
  department: String,
  doctor: String,
  bedType: { type: String, enum: ['general', 'icu', 'private', ''] },
  date: Date,
  timeSlot: String,
  status: { type: String, enum: ['pending', 'confirmed', 'rescheduled', 'cancelled', 'completed'], default: 'confirmed' },
  bookingId: { type: String, required: true, unique: true },
  estimatedCost: { type: Number, default: 0 }
}, { timestamps: { createdAt: true, updatedAt: true } });

bookingSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('Booking', bookingSchema);
