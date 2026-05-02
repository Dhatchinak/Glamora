/**
 * db.js — Flat-file JSON store (drop-in replacement for MongoDB/Mongoose)
 * Data is persisted to server/data/db.json
 * API mirrors Mongoose patterns used throughout the routes.
 */

const fs   = require('fs');
const path = require('path');

const DATA_DIR  = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'db.json');

// ─── Ensure data directory exists ───────────────────────────────────────────
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

// ─── Load / initialise database ─────────────────────────────────────────────
function loadDB() {
  if (!fs.existsSync(DATA_FILE)) return { users: [], bookings: [], services: [] };
  try { return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')); }
  catch { return { users: [], bookings: [], services: [] }; }
}

function saveDB(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

// ─── ID generator (mimics Mongo ObjectId as a hex string) ───────────────────
let _counter = Date.now();
function newId() {
  return (++_counter).toString(16).padStart(24, '0');
}

// ─── Generic collection helper ───────────────────────────────────────────────
function collection(name) {
  return {
    // Return all docs matching filter object (shallow equality)
    find(filter = {}) {
      const db   = loadDB();
      const docs = db[name] || [];
      const keys = Object.keys(filter);
      const results = keys.length === 0
        ? docs
        : docs.filter(doc => keys.every(k => {
            // Support $ne operator: { status: { $ne: 'rejected' } }
            if (filter[k] && typeof filter[k] === 'object' && '$ne' in filter[k]) {
              return doc[k] !== filter[k].$ne;
            }
            return doc[k] === filter[k];
          }));
      return {
        _docs: results,
        sort(field) {
          // sort({ createdAt: -1 }) → sort descending by createdAt
          const [key, dir] = typeof field === 'object'
            ? Object.entries(field)[0]
            : [field, 1];
          this._docs = [...this._docs].sort((a, b) =>
            dir === -1
              ? new Date(b[key]) - new Date(a[key])
              : new Date(a[key]) - new Date(b[key])
          );
          return this;
        },
        // Resolve the promise (await find(...))
        then(resolve) { return Promise.resolve(this._docs).then(resolve); },
        catch(reject) { return Promise.resolve(this._docs).catch(reject); },
      };
    },

    findOne(filter = {}) {
      const db   = loadDB();
      const docs = db[name] || [];
      const keys = Object.keys(filter);
      const doc  = keys.length === 0
        ? docs[0]
        : docs.find(doc => keys.every(k => doc[k] === filter[k]));
      return Promise.resolve(doc || null);
    },

    findById(id) {
      const db  = loadDB();
      const doc = (db[name] || []).find(d => d._id === id);
      return Promise.resolve(doc || null);
    },

    create(data) {
      const db  = loadDB();
      if (!db[name]) db[name] = [];
      const doc = { _id: newId(), createdAt: new Date().toISOString(), ...data };
      db[name].push(doc);
      saveDB(db);
      return Promise.resolve(doc);
    },

    // insertMany — used by seed
    insertMany(docs) {
      const db = loadDB();
      if (!db[name]) db[name] = [];
      const created = docs.map(d => ({ _id: newId(), createdAt: new Date().toISOString(), ...d }));
      db[name].push(...created);
      saveDB(db);
      return Promise.resolve(created);
    },

    findByIdAndUpdate(id, update, opts = {}) {
      const db   = loadDB();
      const docs = db[name] || [];
      const idx  = docs.findIndex(d => d._id === id);
      if (idx === -1) return Promise.resolve(null);

      // Handle $inc operator
      if (update.$inc) {
        Object.entries(update.$inc).forEach(([k, v]) => {
          docs[idx][k] = (docs[idx][k] || 0) + v;
        });
      }
      // Handle plain field updates
      const plain = { ...update };
      delete plain.$inc;
      Object.assign(docs[idx], plain);

      saveDB(db);
      return Promise.resolve(opts.new ? docs[idx] : docs[idx]);
    },

    countDocuments(filter = {}) {
      const db   = loadDB();
      const docs = db[name] || [];
      const keys = Object.keys(filter);
      const count = keys.length === 0
        ? docs.length
        : docs.filter(doc => keys.every(k => doc[k] === filter[k])).length;
      return Promise.resolve(count);
    },
  };
}

// ─── Exported models (match names used in routes) ────────────────────────────
const User    = collection('users');
const Booking = collection('bookings');
const Service = collection('services');

module.exports = { User, Booking, Service, loadDB, saveDB, newId };
