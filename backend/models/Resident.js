const mongoose = require('mongoose');

const vitalSchema = new mongoose.Schema({
  date: Date,
  bp: String,
  hr: Number,
  spo2: Number,
  temp: Number,
  weight: Number
}, { _id: false });

const medicationSchema = new mongoose.Schema({
  name: String,
  dose: String,
  frequency: String,
  startDate: Date
}, { _id: false });

const noteSchema = new mongoose.Schema({
  shift: String,
  date: Date,
  author: String,
  note: String,
  tasks: [String]
}, { _id: false });

const labSchema = new mongoose.Schema({
  test: String,
  result: String,
  unit: String,
  ref: String,
  status: String,
  date: Date
}, { _id: false });

const residentSchema = new mongoose.Schema({
  residentId: { type: String, required: true, unique: true, trim: true },
  name: { type: String, required: true, trim: true },
  age: Number,
  room: String,
  conditions: [String],
  allergies: [String],
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
