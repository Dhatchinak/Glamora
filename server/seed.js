/**
 * seed.js — seeds an admin user into the flat-file DB
 * Run: node server/seed.js
 */
const bcrypt = require('bcryptjs');
const { User, loadDB, saveDB } = require('./db');

async function seed() {
  const db = loadDB();
  const existing = (db.users || []).find(u => u.email === 'admin@glamora.in');
  if (existing) { console.log('Admin already seeded'); return; }
  const hashed = await bcrypt.hash('admin123', 10);
  const { newId } = require('./db');
  if (!db.users) db.users = [];
  db.users.push({ _id: (Date.now()).toString(16).padStart(24,'0'), name: 'Admin', email: 'admin@glamora.in', password: hashed, role: 'admin', loyaltyPoints: 0, isFirstVisit: false, createdAt: new Date().toISOString() });
  saveDB(db);
  console.log('✦ Admin seeded: admin@glamora.in / admin123');
}
seed();
