const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  recipientUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  type: { type: String, required: true, trim: true },
  title: { type: String, required: true, trim: true },
  message: { type: String, required: true, trim: true },
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  read: { type: Boolean, default: false, index: true },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: { createdAt: false, updatedAt: true } });

notificationSchema.index({ recipientUserId: 1, read: 1, createdAt: -1 });

module.exports = mongoose.model('Notification', notificationSchema);
