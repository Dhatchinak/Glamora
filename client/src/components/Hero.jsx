import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Hero.module.css';

const WORDS = ['Redefined', 'Reimagined', 'Elevated', 'Transformed'];

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0);
  const canvasRef = useRef(null);

  // Rotating headline word
  useEffect(() => {
    const id = setInterval(() => {
      setWordIdx(i => (i + 1) % WORDS.length);
    }, 2500);
    return () => clearInterval(id);
  }, []);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    let animId;

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
      hue: Math.random() > 0.5 ? '#c9956b' : '#9d5cc4',
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.hue;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      });

      // Draw subtle connecting lines
      particles.forEach((p, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = 'rgba(201, 149, 107, 0.06)';
            ctx.globalAlpha = 1 - dist / 120;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <section className={styles.hero}>
      {/* Particle canvas */}
      <canvas ref={canvasRef} className={styles.canvas} />

      {/* Ambient orbs */}
      <div className={styles.orbRose} />
      <div className={styles.orbViolet} />
      <div className={styles.orbTeal} />

      {/* Scan line */}
      <div className={styles.scanLine} />

      {/* Grid overlay */}
      <div className={styles.grid} />

      {/* Content */}
      <div className={`container ${styles.content}`}>
        {/* Top tag */}
        <motion.div
          className={styles.tagLine}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <span className={styles.dot} />
          <span className="tag">Chennai's Premier Beauty Studio</span>
          <span className={styles.dot} />
        </motion.div>

        {/* Main heading */}
        <div className={styles.headingWrap}>
          <motion.h1
            className={styles.h1}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className={styles.hLine1}>Beauty</span>
            <span className={styles.hLine2}>
              <span className="grad-text">{WORDS[wordIdx]}</span>
            </span>
          </motion.h1>

          {/* Decorative vertical text */}
          <div className={styles.vertText}>
            <span>GLAMORA STUDIO 2025</span>
          </div>
        </div>

        {/* Sub */}
        <motion.p
          className={styles.sub}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          Where cutting-edge aesthetic science meets the art of transformation.
          <br />Experience luxury beauty in its most futuristic form.
        </motion.p>

        {/* CTA row */}
        <motion.div
          className={styles.ctaRow}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          <button className="btn-primary">
            <span>Book Your Experience</span>
          </button>
          <button className="btn-ghost">Explore Services</button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className={styles.statsRow}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
        >
          {[
            { n: '12K+', l: 'Clients Transformed' },
            { n: '8 Yrs', l: 'Of Excellence' },
            { n: '45+', l: 'Expert Artists' },
          ].map((s, i) => (
            <div key={i} className={styles.stat}>
              <span className={styles.statNum}>{s.n}</span>
              <span className={styles.statLabel}>{s.l}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom scroll indicator */}
      <motion.div
        className={styles.scroll}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <div className={styles.scrollLine} />
        <span className={styles.scrollText}>SCROLL</span>
      </motion.div>

      {/* 3D floating orb visual */}
      <div className={styles.sphereWrap}>
        <motion.div
          className={styles.sphere}
          animate={{ y: [0, -30, 0], rotateY: [0, 360] }}
          transition={{ y: { duration: 6, repeat: Infinity, ease: 'easeInOut' }, rotateY: { duration: 20, repeat: Infinity, ease: 'linear' } }}
        >
          <div className={styles.sphereInner} />
          <div className={styles.sphereRing} />
          <div className={styles.sphereRing2} />
          <div className={styles.sphereGlow} />
        </motion.div>

        {/* Floating chips around sphere */}
        {['HAIR', 'SKIN', 'NAILS', 'BRIDAL', 'SPA'].map((chip, i) => (
          <motion.div
            key={chip}
            className={styles.chip}
            style={{
              '--angle': `${i * 72}deg`,
              '--r': '180px',
            }}
            animate={{ rotate: [i * 72, i * 72 + 360] }}
            transition={{ duration: 15 + i * 2, repeat: Infinity, ease: 'linear' }}
          >
            {chip}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
