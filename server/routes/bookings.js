const express = require('express');
const { Booking, User } = require('../db');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const router = express.Router();

// Create booking
router.post('/', authMiddleware, async (req, res) => {
  try {
    const booking = await Booking.create({ ...req.body, user: req.user.id });
    const pts = Math.floor(booking.totalPrice / 100) * 10;
    await User.findByIdAndUpdate(req.user.id, { $inc: { loyaltyPoints: pts } });
    res.json({ booking, pointsEarned: pts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get user's bookings
router.get('/my', authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin: get all bookings
router.get('/all', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin: update booking status
router.patch('/:id/status', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin: revenue stats
router.get('/stats', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ status: { $ne: 'rejected' } });
    const total     = bookings.reduce((s, b) => s + b.totalPrice, 0);
    const confirmed = bookings.filter(b => b.status === 'confirmed' || b.status === 'done').length;
    const pending   = bookings.filter(b => b.status === 'pending').length;
    res.json({ totalRevenue: total, totalBookings: bookings.length, confirmed, pending });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

// Admin: delete booking
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: 'Booking deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
