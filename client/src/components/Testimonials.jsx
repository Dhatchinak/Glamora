import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { testimonials } from '../data/index.js';
import styles from './Testimonials.module.css';

export default function Testimonials() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(id);
  }, []);

  const t = testimonials[idx];

  return (
    <section className={`section ${styles.testimonials}`}>
      <div className={styles.orbLeft} />
      <div className="container">
        <div className={styles.inner}>
          {/* Left: quote */}
          <div className={styles.quoteCol}>
            <motion.span
              className="section-num"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              06 — Testimonials
            </motion.span>

            <div className={styles.bigQuote}>"</div>

            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className={styles.quoteBody}
              >
                <p className={styles.quoteText}>{t.text}</p>
                <div className={styles.author}>
                  <div className={styles.authorAvatar}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className={styles.authorName}>{t.name}</div>
                    <div className={styles.authorRole}>{t.role}</div>
                  </div>
                  <div className={styles.stars}>
                    {'★'.repeat(t.rating)}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dots */}
            <div className={styles.dots}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.dot} ${i === idx ? styles.dotActive : ''}`}
                  onClick={() => setIdx(i)}
                />
              ))}
            </div>
          </div>

          {/* Right: stat cards */}
          <div className={styles.statsCol}>
            {[
              { n: '4.98', label: 'Average Rating', sub: 'Based on 3,200+ reviews', color: '#d4a853' },
              { n: '98%', label: 'Would Return', sub: 'Client retention rate', color: '#c9956b' },
              { n: '12K+', label: 'Lives Transformed', sub: 'And counting every day', color: '#9d5cc4' },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                className={styles.statCard}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ x: -4 }}
              >
                <span className={styles.statNum} style={{ color: s.color }}>{s.n}</span>
                <div>
                  <div className={styles.statLabel}>{s.label}</div>
                  <div className={styles.statSub}>{s.sub}</div>
                </div>
                <div className={styles.statLine} style={{ background: s.color }} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
