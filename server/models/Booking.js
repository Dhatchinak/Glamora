const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  stylist: { type: String, required: true },
  service: { type: String, required: true },
  date: { type: String, required: true },
  timeSlot: { type: String, required: true },
  basePrice: { type: Number, required: true },
  stylistFee: { type: Number, required: true },
  isWeekend: { type: Boolean, default: false },
  isRush: { type: Boolean, default: false },
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'rejected', 'done'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);
