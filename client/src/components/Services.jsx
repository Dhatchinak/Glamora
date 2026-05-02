import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { services } from '../data/index.js';
import styles from './Services.module.css';

export default function Services() {
  const [active, setActive] = useState(0);

  return (
    <section className={`section ${styles.services}`} id="services">
      {/* Background */}
      <div className={styles.bg} />
      <div className={styles.orbLeft} />
      <div className={styles.orbRight} />

      <div className="container">
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <span className="section-num">02 — Services</span>
          <h2 className={styles.title}>
            Our <em className="grad-text">Signature</em><br />Experiences
          </h2>
          <p className={styles.desc}>
            Every treatment is a ritual. Every service a work of art.
            Curated exclusively for those who demand the extraordinary.
          </p>
        </motion.div>

        {/* Tab grid */}
        <div className={styles.layout}>
          {/* Category tabs */}
          <div className={styles.tabs}>
            {services.map((svc, i) => (
              <motion.button
                key={svc.id}
                className={`${styles.tab} ${active === i ? styles.tabActive : ''}`}
                onClick={() => setActive(i)}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <span className={styles.tabIcon} style={{ color: svc.color }}>{svc.icon}</span>
                <span className={styles.tabName}>{svc.category}</span>
                <span className={styles.tabArrow}>→</span>
              </motion.button>
            ))}
          </div>

          {/* Service detail panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className={styles.panel}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
            >
              {/* Panel header */}
              <div className={styles.panelHeader}>
                <span className={styles.panelIcon} style={{ color: services[active].color }}>
                  {services[active].icon}
                </span>
                <div>
                  <div className="section-num">{String(active + 1).padStart(2, '0')}</div>
                  <h3 className={styles.panelTitle}>{services[active].category}</h3>
                </div>
                <div className={styles.panelGlow} style={{ background: `radial-gradient(circle, ${services[active].color}22, transparent 70%)` }} />
              </div>

              {/* Services list */}
              <div className={styles.serviceList}>
                {services[active].services.map((item, i) => (
                  <motion.div
                    key={item.name}
                    className={styles.serviceItem}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <div className={styles.itemLeft}>
                      <div className={styles.itemDot} style={{ background: services[active].color }} />
                      <div>
                        <div className={styles.itemName}>{item.name}</div>
                        <div className={styles.itemDuration}>{item.duration}</div>
                      </div>
                    </div>
                    <div className={styles.itemPrice} style={{ color: services[active].color }}>
                      {item.price}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <div className={styles.panelCta}>
                <button className="btn-primary"><span>Book This Service</span></button>
                <span className={styles.panelNote}>Free consultation included</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
