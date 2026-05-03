import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  useEffect(() => setMenuOpen(false), [location]);

  const scrollTo = id => {
    setMenuOpen(false);
    const doScroll = () => {
      const el = document.getElementById(id);
      window.__smoothScrollTo?.(el, -80) ?? el?.scrollIntoView({ behavior: 'smooth' });
    };
    if (location.pathname !== '/') { navigate('/'); setTimeout(doScroll, 420); }
    else doScroll();
  };

  const NAV = [
    { label: 'Home',     action: () => { navigate('/'); window.scrollTo({top:0,behavior:'smooth'}); } },
    { label: 'AI Style', action: () => scrollTo('ai') },
    { label: 'Services', action: () => scrollTo('packages') },
    { label: 'Gallery',  action: () => scrollTo('gallery') },
    { label: 'Offers',   action: () => scrollTo('loyalty') },
    { label: 'Contact',  action: () => scrollTo('contact') },
  ];

  return (
    <>
      <motion.nav
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.15, 1] }}
      >
        {/* Logo */}
        <Link to="/" className="logo">Glam<span>ora</span></Link>

        {/* Desktop nav links — centered */}
        <ul className="nav-links nav-links-desktop">
          {NAV.map(({ label, action }) => (
            <li key={label}>
              <a href="#" onClick={e => { e.preventDefault(); action(); }}>{label}</a>
            </li>
          ))}
          <li><Link to="/booking">Book</Link></li>
          {user && <li><Link to="/my-bookings">My Bookings</Link></li>}
          {user?.role === 'admin' && <li><Link to="/admin">Admin</Link></li>}
        </ul>

        {/* Desktop right controls */}
        <div className="nav-right nav-right-desktop">
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

        {/* Mobile: theme toggle + burger */}
        <div className="nav-mobile-controls">
          <button className="dark-toggle" onClick={toggle} aria-label="Toggle theme">
            <div className="dark-toggle-knob" />
          </button>
          <button className={`burger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(v => !v)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer overlay */}
      {menuOpen && (
        <div className="drawer-overlay" onClick={() => setMenuOpen(false)} />
      )}

      {/* Mobile slide-in drawer */}
      <div className={`nav-drawer ${menuOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <span className="drawer-logo">Glam<span>ora</span></span>
          <button className="drawer-close" onClick={() => setMenuOpen(false)}>✕</button>
        </div>

        <ul className="drawer-links">
          {NAV.map(({ label, action }, i) => (
            <li key={label} style={{ '--i': i }}>
              <a href="#" onClick={e => { e.preventDefault(); action(); setMenuOpen(false); }}>{label}</a>
            </li>
          ))}
          <li style={{ '--i': NAV.length }}>
            <Link to="/booking" onClick={() => setMenuOpen(false)}>Book Now</Link>
          </li>
          {user && (
            <li style={{ '--i': NAV.length + 1 }}>
              <Link to="/my-bookings" onClick={() => setMenuOpen(false)}>My Bookings</Link>
            </li>
          )}
          {user?.role === 'admin' && (
            <li style={{ '--i': NAV.length + 2 }}>
              <Link to="/admin" onClick={() => setMenuOpen(false)}>Admin</Link>
            </li>
          )}
        </ul>

        <div className="drawer-footer">
          {user ? (
            <div className="drawer-user-row">
              <span className="drawer-username">Hi, {user.name.split(' ')[0]} 👋</span>
              <button className="drawer-logout" onClick={() => { logout(); navigate('/'); setMenuOpen(false); }}>
                Logout
              </button>
            </div>
          ) : (
            <div className="drawer-auth-row">
              <Link to="/login" className="drawer-login" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/booking" className="drawer-book btn-primary" onClick={() => setMenuOpen(false)}>Book Now</Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
