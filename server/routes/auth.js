const express = require('express');
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const { User } = require('../db');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const router  = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'glamora_secret';

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'All fields required' });
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already registered' });
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, role: 'user', loyaltyPoints: 0, isFirstVisit: true });
    const token = jwt.sign({ id: user._id, name: user.name, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role, loyaltyPoints: 0 } });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, name: user.name, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role, loyaltyPoints: user.loyaltyPoints } });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.get('/users', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const all = await User.find();
    res.json(all.map(u => ({ _id: u._id, name: u.name, email: u.email, role: u.role, loyaltyPoints: u.loyaltyPoints, createdAt: u.createdAt })));
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
