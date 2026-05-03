import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import { AuthProvider } from './context/AuthContext';
import PageLoader       from './components/PageLoader';
import FloatingParticles from './components/FloatingParticles';
import { ThemeProvider } from './context/ThemeContext';
import Navbar       from './components/Navbar';
import WhatsAppFAB  from './components/WhatsAppFAB';
import Home         from './pages/Home';
import Booking      from './pages/Booking';
import Login        from './pages/Login';
import Register     from './pages/Register';
import MyBookings   from './pages/MyBookings';
import Admin        from './pages/Admin';

function useLenisScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 1.5,
    });

    // Integrate with framer-motion scroll
    lenis.on('scroll', () => {});

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const id = requestAnimationFrame(raf);

    // Expose lenis globally for scrollTo calls
    window.__lenis = lenis;

    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);
}

function Cursor() {
  const dot  = useRef(null);
  const ring = useRef(null);
  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;
    let mx = -200, my = -200, rx = -200, ry = -200, raf;
    const onMove = e => { mx = e.clientX; my = e.clientY; };
    document.addEventListener('mousemove', onMove);
    const animate = () => {
      rx += (mx - rx) * 0.13; ry += (my - ry) * 0.13;
      if (dot.current)  { dot.current.style.left = mx+'px'; dot.current.style.top = my+'px'; }
      if (ring.current) { ring.current.style.left = rx+'px'; ring.current.style.top = ry+'px'; }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => { document.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
  }, []);
  return (
    <>
      <div ref={dot}  className="cursor-dot"  />
      <div ref={ring} className="cursor-ring" />
    </>
  );
}

function useScrollReveal() {
  const location = useLocation();
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }),
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [location.pathname]);
}

function AppInner() {
  const location = useLocation();
  useScrollReveal();
  useLenisScroll();
  useEffect(() => { window.scrollTo(0, 0); }, [location.pathname]);

  // Gold top bar on navigation
  useEffect(() => {
    const bar = document.createElement('div');
    bar.className = 'page-transition-bar';
    bar.style.cssText = 'position:fixed;top:0;left:0;height:2px;z-index:99998;background:linear-gradient(90deg,#7a6228,#e8c97a,#d28c82);width:0;transition:width .4s ease';
    document.body.appendChild(bar);
    requestAnimationFrame(() => { bar.style.width = '100%'; });
    const t = setTimeout(() => bar.remove(), 600);
    return () => { clearTimeout(t); bar.remove(); };
  }, [location.pathname]);

  return (
    <>
      <PageLoader />
      <FloatingParticles />
      <Cursor />
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.div key={location.pathname}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.45, ease: [0.25, 0.1, 0.15, 1] }}
        >
          <Routes location={location}>
            <Route path="/"            element={<Home />} />
            <Route path="/booking"     element={<Booking />} />
            <Route path="/login"       element={<Login />} />
            <Route path="/register"    element={<Register />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/admin"       element={<Admin />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
      <WhatsAppFAB />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <AppInner />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
