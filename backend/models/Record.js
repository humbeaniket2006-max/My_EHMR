const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  title: { type: String, required: true },
  details: String,
  source: String,
  status: { type: String, default: 'active' }
}, { timestamps: true });

recordSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('Record', recordSchema);
