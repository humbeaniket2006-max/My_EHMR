const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['admin', 'staff', 'viewer', 'hospital'], default: 'viewer' },
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital' },
  linkedHospitalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital' },
  hospitalName: String,
  lastLogin: Date
}, { timestamps: { createdAt: true, updatedAt: false } });

module.exports = mongoose.model('User', userSchema);
