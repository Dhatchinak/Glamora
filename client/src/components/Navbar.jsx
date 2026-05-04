import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { dark, toggle } = useTheme();
  const navigate  = useNavigate();
  const location  = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [location]);

  // Lock body scroll when menu open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  const scrollTo = id => {
    close();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 420);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const NAV = [
    { label: 'Home',     action: () => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); close(); } },
    { label: 'AI Style', action: () => scrollTo('ai') },
    { label: 'Services', action: () => scrollTo('packages') },
    { label: 'Gallery',  action: () => scrollTo('gallery') },
    { label: 'Offers',   action: () => scrollTo('loyalty') },
    { label: 'Contact',  action: () => scrollTo('contact') },
  ];

  const drawerVariants = {
    hidden:  { opacity: 0, x: '100%' },
    visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.25, 0.1, 0.15, 1] } },
    exit:    { opacity: 0, x: '100%', transition: { duration: 0.28, ease: [0.4, 0, 1, 1] } },
  };

  const itemVariants = {
    hidden:  { opacity: 0, x: 30 },
    visible: i => ({ opacity: 1, x: 0, transition: { delay: i * 0.055, duration: 0.35 } }),
  };

  return (
    <>
      <motion.nav
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.15, 1] }}
      >
        {/* Logo */}
        <Link to="/" className="logo" onClick={close}>
          Glam<span>ora</span>
        </Link>

        {/* Desktop nav links */}
        <ul className="nav-links-desktop">
          {NAV.map(({ label, action }) => (
            <li key={label}>
              <a href="#" onClick={e => { e.preventDefault(); action(); }}>{label}</a>
            </li>
          ))}
          <li><Link to="/booking">Book</Link></li>
          {user && <li><Link to="/my-bookings">My Bookings</Link></li>}
          {user?.role === 'admin' && <li><Link to="/admin">Admin</Link></li>}
        </ul>

        {/* Desktop right */}
        <div className="nav-right">
          <button className="dark-toggle" onClick={toggle} aria-label="Toggle theme">
            <div className="dark-toggle-knob" />
          </button>
          {user ? (
            <>
              <span className="nav-user">Hi, {user.name.split(' ')[0]}</span>
              <button className="nav-cta" onClick={() => { logout(); navigate('/'); }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-login">Login</Link>
              <Link to="/booking" className="nav-cta">Book Now</Link>
            </>
          )}
        </div>

        {/* Burger button */}
        <button
          className={`burger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
          style={{ zIndex: 10000, position: 'relative' }}
        >
          <span /><span /><span />
        </button>
      </motion.nav>

      {/* Mobile drawer — completely separate from nav, always on top */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={close}
              style={{
                position: 'fixed', inset: 0,
                background: 'rgba(0,0,0,0.6)',
                zIndex: 9991,
                backdropFilter: 'blur(4px)',
              }}
            />

            {/* Drawer panel — slides in from right */}
            <motion.div
              key="drawer"
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{
                position: 'fixed',
                top: 0, right: 0, bottom: 0,
                width: 'min(320px, 85vw)',
                background: dark ? 'rgba(10,8,5,0.98)' : 'rgba(250,246,241,0.99)',
                backdropFilter: 'blur(30px)',
                WebkitBackdropFilter: 'blur(30px)',
                zIndex: 9992,
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto',
                borderLeft: `1px solid rgba(201,168,76,0.15)`,
              }}
            >
              {/* Drawer header */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '1.2rem 1.5rem',
                borderBottom: '1px solid rgba(201,168,76,0.1)',
                height: 'var(--nav-h)',
                flexShrink: 0,
              }}>
                <span style={{ fontFamily: 'var(--serif)', fontSize: '1.25rem', color: 'var(--ivory)' }}>
                  Glam<span style={{ color: 'var(--gold-light)', fontStyle: 'italic' }}>ora</span>
                </span>
                <motion.button
                  onClick={close}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    background: 'none', border: '1px solid rgba(201,168,76,0.2)',
                    color: 'var(--parchment)', width: '36px', height: '36px',
                    borderRadius: '50%', cursor: 'pointer', fontSize: '0.85rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >✕</motion.button>
              </div>

              {/* Nav links */}
              <div style={{ flex: 1, padding: '1.5rem 0' }}>
                {[...NAV,
                  { label: 'Book Now',    action: () => { navigate('/booking'); close(); } },
                  ...(user ? [{ label: 'My Bookings', action: () => { navigate('/my-bookings'); close(); } }] : []),
                  ...(user?.role === 'admin' ? [{ label: 'Admin', action: () => { navigate('/admin'); close(); } }] : []),
                ].map(({ label, action }, i) => (
                  <motion.button
                    key={label}
                    custom={i}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    onClick={action}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      width: '100%', background: 'none', border: 'none',
                      borderBottom: '1px solid rgba(201,168,76,0.07)',
                      padding: '1rem 1.5rem',
                      fontFamily: 'var(--cap)', fontSize: '10px', letterSpacing: '0.3em',
                      color: 'var(--parchment)', textTransform: 'uppercase',
                      cursor: 'pointer', textAlign: 'left',
                    }}
                    whileHover={{ x: 4, color: 'var(--gold-light)' }}
                  >
                    {label}
                    <span style={{ color: 'var(--gold-dim)', fontSize: '0.75rem' }}>→</span>
                  </motion.button>
                ))}
              </div>

              {/* Drawer footer — auth + theme */}
              <div style={{
                padding: '1.2rem 1.5rem',
                borderTop: '1px solid rgba(201,168,76,0.1)',
                flexShrink: 0,
                display: 'flex', flexDirection: 'column', gap: '0.8rem',
              }}>
                {/* Theme toggle row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'var(--cap)', fontSize: '8px', letterSpacing: '0.25em', color: 'var(--mist)', textTransform: 'uppercase' }}>
                    {dark ? '🌙 Dark Mode' : '☀️ Light Mode'}
                  </span>
                  <button className="dark-toggle" onClick={toggle} style={{ flexShrink: 0 }}>
                    <div className="dark-toggle-knob" />
                  </button>
                </div>

                {/* Auth buttons */}
                {user ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    <span style={{ fontFamily: 'var(--cap)', fontSize: '8.5px', letterSpacing: '0.2em', color: 'var(--gold)', textTransform: 'uppercase' }}>
                      ✦ {user.name}
                    </span>
                    <button className="btn-outline" style={{ width: '100%', padding: '0.75rem', justifyContent: 'center', fontSize: '9px' }}
                      onClick={() => { logout(); navigate('/'); close(); }}>
                      Logout
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    <Link to="/login" className="btn-outline"
                      style={{ textAlign: 'center', padding: '0.75rem', fontSize: '9px', letterSpacing: '0.2em' }}
                      onClick={close}>
                      Login
                    </Link>
                    <Link to="/booking" className="btn-primary"
                      style={{ textAlign: 'center', padding: '0.75rem', fontSize: '9px', letterSpacing: '0.2em', justifyContent: 'center' }}
                      onClick={close}>
                      Book Now ✦
                    </Link>
                  </div>
                )}

                {/* Contact info */}
                <div style={{ marginTop: '0.5rem' }}>
                  <p style={{ fontFamily: 'var(--cap)', fontSize: '7.5px', letterSpacing: '0.2em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                    Trichy · +91 93603 09620
                  </p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--fog)' }}>
                    © 2025 Glamora Beauty Studio
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
