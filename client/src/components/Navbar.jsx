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
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 420);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
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
    <motion.nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.15, 1] }}
    >
      {/* Logo — left */}
      <Link to="/" className="logo">Glam<span>ora</span></Link>

      {/* Nav links — centered */}
      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        {NAV.map(({ label, action }) => (
          <li key={label}>
            <a href="#" onClick={e => { e.preventDefault(); action(); }}>{label}</a>
          </li>
        ))}
        <li><Link to="/booking">Book</Link></li>
        {user && <li><Link to="/my-bookings">My Bookings</Link></li>}
        {user?.role === 'admin' && <li><Link to="/admin">Admin</Link></li>}
      </ul>

      {/* Right controls */}
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

      <button className={`burger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(v => !v)} aria-label="Menu">
        <span /><span /><span />
      </button>
    </motion.nav>
  );
}
