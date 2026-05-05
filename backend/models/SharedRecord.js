const mongoose = require('mongoose');

const sharedRecordSchema = new mongoose.Schema({
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true, index: true },
  patientUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true, index: true },
  sharedData: {
    name: String,
    age: Number,
    conditions: [String],
    allergies: [String],
    currentMedications: [mongoose.Schema.Types.Mixed],
    recentVitals: [mongoose.Schema.Types.Mixed],
    recentLabs: [mongoose.Schema.Types.Mixed]
  },
  sharedAt: { type: Date, default: Date.now },
  accessStatus: { type: String, enum: ['active', 'expired'], default: 'active', index: true }
}, { timestamps: true });

sharedRecordSchema.index({ hospitalId: 1, bookingId: 1 }, { unique: true });

module.exports = mongoose.model('SharedRecord', sharedRecordSchema);
