const mongoose = require('mongoose');

const vitalSchema = new mongoose.Schema({
  date: Date,
  bp: String,
  hr: Number,
  spo2: Number,
  temp: Number,
  glucose: Number,
  weight: Number,
  by: String,
  notes: String
}, { _id: false });

const medicationSchema = new mongoose.Schema({
  name: String,
  dose: String,
  frequency: String,
  indication: String,
  prescribedBy: String,
  startDate: Date
}, { _id: false });

const noteSchema = new mongoose.Schema({
  shift: String,
  date: Date,
  author: String,
  role: String,
  note: String,
  tasks: [String]
}, { _id: false });

const labSchema = new mongoose.Schema({
  test: String,
  result: String,
  unit: String,
  ref: String,
  status: String,
  date: Date,
  by: String
}, { _id: false });

const allergySchema = new mongoose.Schema({
  drug: String,
  severity: String
}, { _id: false });

const emergencyContactSchema = new mongoose.Schema({
  name: String,
  relation: String,
  phone: String
}, { _id: false });

const residentSchema = new mongoose.Schema({
  residentId: { type: String, required: true, unique: true, trim: true },
  name: { type: String, required: true, trim: true },
  age: Number,
  room: String,
  blood: String,
  condition: String,
  admitted: String,
  doctor: String,
  caregiver: String,
  phone: String,
  emergencyContact: emergencyContactSchema,
  conditions: [String],
  allergies: [allergySchema],
  vitals: [vitalSchema],
  medications: [medicationSchema],
  notes: [noteSchema],
  labs: [labSchema],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: { createdAt: true, updatedAt: false } });

residentSchema.pre('save', function updateTimestamp(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Resident', residentSchema);
