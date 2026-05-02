const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'glamora_secret';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'] || req.header('Authorization');
  const token = authHeader?.replace('Bearer ', '').trim();
  if (!token) return res.status(401).json({ message: 'No token, access denied' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

const adminMiddleware = (req, res, next) => {
  if (req.user?.role !== 'admin') return res.status(403).json({ message: 'Admin access required' });
  next();
};

module.exports = { authMiddleware, adminMiddleware };
