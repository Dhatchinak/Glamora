import { motion } from 'framer-motion';
import { team } from '../data/index.js';
import styles from './Team.module.css';

const colors = ['#c9956b', '#9d5cc4', '#d4a853', '#00d4c8'];
const shapes = ['◈', '✦', '◇', '◉'];

export default function Team() {
  return (
    <section className={`section ${styles.team}`} id="team">
      <div className={styles.lineTop} />
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <span className="section-num">04 — Our Artists</span>
          <h2 className={styles.title}>
            The <em className="grad-text">Visionaries</em><br />Behind Your Look
          </h2>
          <p className={styles.desc}>
            Internationally trained. Locally inspired. Infinitely passionate.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              className={styles.card}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              whileHover={{ y: -8 }}
            >
              {/* Avatar */}
              <div className={styles.avatar} style={{ '--color': colors[i] }}>
                <div className={styles.avatarInner}>
                  <span className={styles.avatarInitials}>{member.name.split(' ').map(n => n[0]).join('')}</span>
                  <div className={styles.avatarRing} style={{ borderTopColor: colors[i] }} />
                </div>
                <div className={styles.avatarGlow} style={{ background: `radial-gradient(circle, ${colors[i]}33, transparent 70%)` }} />
                <span className={styles.shapeDecor} style={{ color: colors[i] }}>{shapes[i]}</span>
              </div>

              {/* Info */}
              <div className={styles.info}>
                <div className={styles.name}>{member.name}</div>
                <div className={styles.role} style={{ color: colors[i] }}>{member.role}</div>
                <div className="line-h" style={{ margin: '16px 0' }} />
                <div className={styles.specialty}>{member.specialty}</div>
                <div className={styles.exp}>
                  <span className={styles.expNum} style={{ color: colors[i] }}>{member.exp}</span>
                  <span className={styles.expLabel}>experience</span>
                </div>
              </div>

              {/* Bottom border glow */}
              <div className={styles.cardBorder} style={{ background: `linear-gradient(90deg, transparent, ${colors[i]}, transparent)` }} />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className={styles.cta}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className={styles.ctaText}>All 45+ of our artists bring a unique mastery to every appointment.</p>
          <button className="btn-ghost">Meet the Full Team</button>
        </motion.div>
      </div>
    </section>
  );
}
