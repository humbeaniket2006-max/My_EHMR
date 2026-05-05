const mongoose = require('mongoose');

const bedCountSchema = new mongoose.Schema({
  total: { type: Number, default: 0 },
  available: { type: Number, default: 0 }
}, { _id: false });

const doctorSchema = new mongoose.Schema({
  name: String,
  dept: String,
  available: { type: Boolean, default: true },
  fee: { type: Number, default: 500 }
}, { _id: false });

const hospitalSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  address: { type: String, required: true, trim: true },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true }
  },
  phone: String,
  email: String,
  website: String,
  departments: [String],
  beds: {
    general: { type: bedCountSchema, default: () => ({}) },
    icu: { type: bedCountSchema, default: () => ({}) },
    private: { type: bedCountSchema, default: () => ({}) }
  },
  doctors: [doctorSchema],
  status: { type: String, enum: ['available', 'full', 'unavailable'], default: 'available' },
  rating: { type: Number, default: 4.2 },
  image: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  linkedUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

hospitalSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Hospital', hospitalSchema);
