import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Hero3D from '../components/Hero3D';
import AIStyle from '../components/AIStyle';
import Packages from '../components/Packages';
import Gallery from '../components/Gallery';
import Loyalty from '../components/Loyalty';
import Contact from '../components/Contact';
import './Home.css';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.85, delay, ease: [0.25, 0.1, 0.15, 1] },
});

export default function Home() {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY   = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const heroOp  = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    window.__smoothScrollTo?.(el, -80) ?? el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      {/* ── HERO ── */}
      <section className="hero" ref={heroRef} id="hero">
        {/* 3D Canvas background */}
        <div className="hero-canvas">
          <Hero3D />
        </div>
        <div className="hero-overlay" />

        {/* Parallax content */}
        <motion.div className="hero-content" style={{ y: heroY, opacity: heroOp }}>
          <motion.div className="hero-badge" {...fadeUp(0.2)}>
            <span>✦</span> Est. 2019 · Luxury Beauty Studio · Chennai <span>✦</span>
          </motion.div>

          <motion.h1 className="hero-title" {...fadeUp(0.35)}>
            Redefine<br /><em>Your Beauty</em>
          </motion.h1>

          <motion.p className="hero-sub" {...fadeUp(0.5)}>
            Bespoke beauty experiences crafted for the discerning woman.
            Where artistry meets elegance, and every detail is a masterpiece.
          </motion.p>

          <motion.div className="hero-btns" {...fadeUp(0.65)}>
            <button className="btn-primary" onClick={() => navigate('/booking')}>
              Book Appointment
            </button>
            <button className="btn-outline" onClick={() => scrollTo('ai')}>
              AI Style Match
            </button>
          </motion.div>

          <motion.div className="hero-stats" {...fadeUp(0.8)}>
            {[
              { num: '2,400+', lbl: 'Happy Clients' },
              { num: '98%',    lbl: 'Satisfaction' },
              { num: '12',     lbl: 'Expert Stylists' },
              { num: '6yr',    lbl: 'Excellence' },
            ].map(({ num, lbl }) => (
              <div className="hero-stat" key={lbl}>
                <span className="num">{num}</span>
                <span className="lbl">{lbl}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="scroll-cue">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      <AIStyle />
      <Packages />
      <Gallery />
      <Loyalty />
      <Contact />

      <footer className="footer">
        <span className="logo-foot">Glam<span>ora</span></span>
        <p>Where art meets elegance. Your beauty, our craft.</p>
        <ul className="footer-links">
          {['hero','packages','gallery','loyalty','contact'].map(id => (
            <li key={id}>
              <a href={`#${id}`} onClick={e => { e.preventDefault(); scrollTo(id); }}>
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            </li>
          ))}
          <li><a href="/booking">Book Now</a></li>
        </ul>
        <p className="footer-copy">© 2025 Glamora Beauty Studio · Trichy, India</p>
        <p className="footer-made">Made with <span style={{color:'var(--rose-solid)'}}>♥</span> by <span style={{color:'var(--gold-light)',fontStyle:'italic'}}>Dhatchinamoorthy</span></p>
      </footer>
    </div>
  );
}
