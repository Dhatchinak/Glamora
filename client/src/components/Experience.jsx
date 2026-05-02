import { motion } from 'framer-motion';
import styles from './Experience.module.css';

const features = [
  {
    icon: '⬡',
    title: 'Quantum Skincare Lab',
    desc: 'State-of-the-art LED panels, ultrasonic devices and AI skin analysis deliver clinical-grade results with spa-level luxury.',
    color: '#9d5cc4',
  },
  {
    icon: '◈',
    title: 'Immersive Treatment Pods',
    desc: 'Private cocoon suites with ambient lighting, thermal therapy beds and curated soundscapes for total sensory elevation.',
    color: '#c9956b',
  },
  {
    icon: '✦',
    title: 'Master Artist Collective',
    desc: 'Our team of 45+ elite artists are trained internationally, bringing global techniques to every brush stroke and cut.',
    color: '#d4a853',
  },
  {
    icon: '◉',
    title: 'Zero-Toxin Philosophy',
    desc: 'Every product we use is ethically sourced, cruelty-free and dermatologically tested. Beauty that respects both you and the planet.',
    color: '#00d4c8',
  },
];

export default function Experience() {
  return (
    <section className={`section ${styles.experience}`} id="experience">
      <div className={styles.orbCenter} />
      <div className="container">

        {/* Split layout */}
        <div className={styles.split}>
          {/* Left: big visual */}
          <motion.div
            className={styles.visual}
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Hexagon grid art */}
            <div className={styles.hexGrid}>
              {Array.from({ length: 19 }).map((_, i) => (
                <motion.div
                  key={i}
                  className={styles.hex}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  style={{
                    opacity: [0, 3, 6, 9, 12, 15, 18].includes(i) ? 0.6 : 0.15,
                    background: [0, 6, 12, 18].includes(i)
                      ? 'linear-gradient(135deg, rgba(201,149,107,0.4), rgba(212,168,83,0.3))'
                      : [3, 9, 15].includes(i)
                      ? 'linear-gradient(135deg, rgba(157,92,196,0.4), rgba(123,63,160,0.3))'
                      : 'rgba(255,255,255,0.04)',
                  }}
                />
              ))}
            </div>

            {/* Centered card */}
            <div className={styles.centerCard}>
              <div className={styles.ccTop}>
                <span className={styles.ccBadge}>EST. 2017</span>
              </div>
              <div className={styles.ccNum}>
                <span className="grad-text" style={{ fontFamily: 'var(--font-display)', fontSize: '80px', fontWeight: 900, lineHeight: 1 }}>08</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.3em', color: 'rgba(250,245,240,0.4)', textTransform: 'uppercase' }}>Years of mastery</span>
              </div>
              <div className="line-h" style={{ margin: '20px 0' }} />
              <p style={{ fontFamily: 'var(--font-body)', fontStyle: 'italic', color: 'rgba(250,245,240,0.6)', fontSize: '14px' }}>
                "Where science meets the soul of beauty."
              </p>
            </div>

            {/* Floating badges */}
            <motion.div
              className={styles.badge1}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span>✦</span> 12K+ Clients
            </motion.div>
            <motion.div
              className={styles.badge2}
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            >
              <span>◈</span> 5★ Rated
            </motion.div>
          </motion.div>

          {/* Right: text */}
          <div className={styles.text}>
            <motion.span
              className="section-num"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              03 — The Experience
            </motion.span>

            <motion.h2
              className={styles.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1 }}
            >
              Step Into<br />
              <em className="grad-text">Tomorrow's</em><br />
              Beauty Studio
            </motion.h2>

            <motion.p
              className={styles.body}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Glamora was born from a singular vision: to create a space where
              cutting-edge beauty technology meets the warmth of personalized care.
              Every corner of our studio is designed to transport you into a future
              where beauty has no limits.
            </motion.p>

            {/* Feature grid */}
            <div className={styles.features}>
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  className={styles.feature}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i + 0.3 }}
                  whileHover={{ y: -4 }}
                >
                  <span className={styles.fIcon} style={{ color: f.color }}>{f.icon}</span>
                  <div>
                    <div className={styles.fTitle}>{f.title}</div>
                    <div className={styles.fDesc}>{f.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
