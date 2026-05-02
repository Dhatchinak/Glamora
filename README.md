# ✦ Glamora v2 — Luxury Beauty Studio

> **Ultra-premium 3D animated beauty parlour web app** built with the MERN stack (MongoDB-compatible flat-file DB, Express, React, Node.js).

---

## 🎨 Design Highlights

| Feature | Detail |
|---|---|
| **Color Palette** | Midnight ink, Venetian gold, Silk rose, Lavender |
| **Typography** | Playfair Display (serif) + DM Sans + Cinzel (caps) |
| **3D Hero** | React Three Fiber — floating lipstick, scissors, hair dryer, perfume bottle |
| **Particles** | Three.js Sparkles with gold & blush glow |
| **Animations** | Framer Motion — page transitions, scroll reveals, parallax |
| **Dark/Light Mode** | One-click toggle with smooth CSS variable transition |
| **Glassmorphism** | Backdrop-blur cards, gold-border glass panels |
| **Custom Cursor** | Gold dot + trailing ring cursor on desktop |

---

## ⚙️ Tech Stack

**Frontend**
- React 18 + Vite
- React Three Fiber + Three.js (3D hero)
- `@react-three/drei` (Float, Sparkles, MeshDistortMaterial)
- Framer Motion (all animations)
- Tailwind CSS (utility layer)
- Axios (API calls)

**Backend**
- Node.js + Express
- Flat-file JSON DB (no MongoDB setup needed — zero config!)
- JWT authentication + bcrypt password hashing
- REST API with full CRUD

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- npm v9+

### 1. Install all dependencies

```bash
npm run install:all
```

### 2. Seed admin user

```bash
node server/seed.js
```

### 3. Start dev servers (frontend + backend concurrently)

```bash
npm run dev
```

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000

---

## 📁 Project Structure

```
glamora-v2/
├── server/
│   ├── data/db.json          ← Flat-file database (auto-created)
│   ├── db.js                 ← Mongoose-compatible flat-file ORM
│   ├── index.js              ← Express server entry
│   ├── middleware/auth.js    ← JWT auth middleware
│   ├── models/               ← Mongoose schema definitions
│   └── routes/
│       ├── auth.js           ← POST /api/auth/register, /login
│       ├── bookings.js       ← POST/GET /api/bookings
│       ├── services.js       ← GET /api/services
│       └── packages.js       ← GET /api/packages
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Hero3D.jsx       ← Three.js 3D scene
│   │   │   ├── Navbar.jsx       ← Animated navbar + dark mode
│   │   │   ├── AIStyle.jsx      ← Claude AI style recommender
│   │   │   ├── Packages.jsx     ← Service packages
│   │   │   ├── Gallery.jsx      ← Filterable gallery + lightbox
│   │   │   ├── Loyalty.jsx      ← Rewards tiers
│   │   │   ├── Contact.jsx      ← WhatsApp booking form
│   │   │   ├── WhatsAppFAB.jsx  ← Floating WhatsApp button
│   │   │   └── Toast.jsx        ← Animated toast notifications
│   │   ├── context/
│   │   │   ├── AuthContext.jsx  ← Auth state
│   │   │   └── ThemeContext.jsx ← Dark/light mode state
│   │   ├── pages/
│   │   │   ├── Home.jsx         ← 3D hero + parallax sections
│   │   │   ├── Booking.jsx      ← 4-step booking wizard
│   │   │   ├── MyBookings.jsx   ← User's bookings + loyalty pts
│   │   │   ├── Admin.jsx        ← Admin dashboard
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── App.jsx              ← Router + AnimatePresence
│   │   └── index.css            ← Full design system
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── package.json              ← Root: concurrently scripts
├── .env                      ← PORT + JWT_SECRET
└── README.md
```

---

## 🔌 API Reference

### Auth
| Method | Endpoint | Body | Description |
|---|---|---|---|
| POST | `/api/auth/register` | `{name, email, password}` | Register user |
| POST | `/api/auth/login`    | `{email, password}` | Login, returns JWT |

### Bookings
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/bookings` | User | Create booking |
| GET | `/api/bookings/my` | User | Get own bookings |
| GET | `/api/bookings/all` | Admin | Get all bookings |
| PATCH | `/api/bookings/:id/status` | Admin | Update status |
| GET | `/api/bookings/stats` | Admin | Revenue stats |

---

## 🔑 Demo Credentials

| Role | Email | Password |
|---|---|---|
| Admin | `admin@glamora.in` | `admin123` |
| User | Register any email | Your password |

---

## 💬 WhatsApp Integration

Edit `WHATSAPP_NUMBER` in:
- `client/src/components/Contact.jsx`
- `client/src/components/WhatsAppFAB.jsx`

Replace `919876543210` with your actual number (country code + number, no +).

---

## 🌗 Dark / Light Mode

Toggle via the pill button in the navbar. Preference is saved to `localStorage`.

---

## 🤖 AI Style Recommender

Uses the Anthropic Claude API directly from the browser (no backend needed).  
The AI generates personalised beauty recommendations based on:
- Face shape
- Hair type  
- Skin tone
- Occasion

---

## 🎯 Key Features

- ✅ 3D animated hero (Three.js — lipstick, scissors, hair dryer, perfume)
- ✅ Sparkle particle background
- ✅ Framer Motion page transitions + scroll reveals
- ✅ Parallax scrolling hero
- ✅ AI-powered style recommender (Claude)
- ✅ Dark / Light mode toggle
- ✅ 4-step booking wizard with animated transitions
- ✅ Filterable gallery with lightbox
- ✅ WhatsApp booking FAB + contact form
- ✅ Loyalty rewards system (Pearl → Gold → Platinum → Diamond)
- ✅ Admin dashboard (stats, bookings, services, users)
- ✅ JWT authentication
- ✅ Skeleton/shimmer loading states
- ✅ Custom gold cursor
- ✅ Glassmorphism UI cards
- ✅ Zero-config flat-file DB (no MongoDB install needed)

---

## 🌐 Production Deployment

```bash
# Build frontend
cd client && npm run build

# Serve with Express (add static middleware to server/index.js)
npm start
```

For MongoDB: replace `server/db.js` with standard Mongoose connection to any MongoDB URI.

---

*© 2025 Glamora Beauty Studio, Chennai — Built with ♥ and ✦*
