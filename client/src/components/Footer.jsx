import { motion } from 'framer-motion';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer} id="contact">
      <div className={styles.topLine} />

      {/* Big brand name */}
      <div className={styles.bigBrand}>
        <span className={styles.bigText}>GLAMORA</span>
      </div>

      <div className="container">
        <div className={styles.grid}>
          {/* Col 1: About */}
          <div className={styles.col}>
            <div className={styles.logo}>
              <span className={styles.logoIcon}>✦</span>
              <span className={styles.logoText}>GLAMORA</span>
            </div>
            <p className={styles.about}>
              Chennai's most visionary beauty studio. Where technology
              meets artistry and every client leaves transformed.
            </p>
            <div className={styles.socials}>
              {['Instagram', 'YouTube', 'Pinterest', 'WhatsApp'].map(s => (
                <a key={s} href="#" className={styles.social}>{s[0]}</a>
              ))}
            </div>
          </div>

          {/* Col 2: Services */}
          <div className={styles.col}>
            <div className={styles.colTitle}>Services</div>
            {['Hair Artistry', 'Skin Sciences', 'Makeup Studio', 'Nail Atelier', 'Body Rituals', 'Bridal Suite'].map(s => (
              <a key={s} href="#services" className={styles.link}>{s}</a>
            ))}
          </div>

          {/* Col 3: Studio */}
          <div className={styles.col}>
            <div className={styles.colTitle}>Studio</div>
            {['About Us', 'Our Team', 'Gallery', 'Blog', 'Careers', 'Gift Cards'].map(s => (
              <a key={s} href="#" className={styles.link}>{s}</a>
            ))}
          </div>

          {/* Col 4: Contact */}
          <div className={styles.col}>
            <div className={styles.colTitle}>Visit Us</div>
            <div className={styles.address}>
              <span className={styles.addrLine}>24, Shafee Mohammed Road</span>
              <span className={styles.addrLine}>Anna Nagar West</span>
              <span className={styles.addrLine}>Chennai - 600 040</span>
            </div>
            <div className={styles.hours}>
              <span className={styles.hoursLabel}>Mon – Sat</span>
              <span className={styles.hoursVal}>9:00 AM – 8:00 PM</span>
            </div>
            <a href="tel:+919840012345" className={styles.phone}>+91 98400 12345</a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={styles.bottom}>
          <span className={styles.copy}>
            © 2025 Glamora Beauty Studio. All rights reserved.
          </span>
          <div className={styles.bottomLinks}>
            {['Privacy Policy', 'Terms', 'Sitemap'].map((l, i) => (
              <a key={l} href="#" className={styles.bottomLink}>{l}</a>
            ))}
          </div>
          <span className={styles.madeWith}>Crafted with ✦ in Chennai</span>
        </div>
      </div>
    </footer>
  );
}
