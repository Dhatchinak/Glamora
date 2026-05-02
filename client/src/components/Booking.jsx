import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Booking.module.css';

const SERVICE_OPTIONS = ['Hair Artistry', 'Skin Sciences', 'Makeup Studio', 'Nail Atelier', 'Body Rituals', 'Bridal Suite'];

export default function Booking() {
  const [form, setForm] = useState({ name: '', phone: '', service: '', date: '', time: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className={`section ${styles.booking}`} id="booking">
      <div className={styles.orbTop} />
      <div className="container">
        <div className={styles.inner}>
          {/* Left info */}
          <motion.div
            className={styles.info}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="section-num">07 — Booking</span>
            <h2 className={styles.title}>
              Reserve Your<br />
              <em className="grad-text">Transformation</em>
            </h2>
            <p className={styles.desc}>
              Your journey begins with a single appointment.
              Let our master artists craft the look you deserve.
            </p>

            <div className={styles.infoCards}>
              {[
                { icon: '◉', label: 'Location', val: 'Anna Nagar, Chennai' },
                { icon: '◈', label: 'Hours', val: 'Mon–Sat 9AM–8PM' },
                { icon: '✦', label: 'Phone', val: '+91 98400 12345' },
                { icon: '◇', label: 'Email', val: 'hello@glamora.in' },
              ].map(item => (
                <div key={item.label} className={styles.infoCard}>
                  <span className={styles.infoIcon}>{item.icon}</span>
                  <div>
                    <div className={styles.infoLabel}>{item.label}</div>
                    <div className={styles.infoVal}>{item.val}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div
            className={styles.formWrap}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            {submitted ? (
              <motion.div
                className={styles.success}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <span className={styles.successIcon}>✦</span>
                <h3 className={styles.successTitle}>Appointment Requested!</h3>
                <p className={styles.successText}>We'll confirm your booking within 2 hours. A luxury experience awaits you.</p>
              </motion.div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formHeader}>
                  <div className={styles.formTitle}>Book an Appointment</div>
                  <div className={styles.formSub}>All fields required</div>
                </div>

                <div className={styles.fields}>
                  <div className={styles.field}>
                    <label className={styles.label}>Your Name</label>
                    <input
                      className={styles.input}
                      type="text"
                      placeholder="Full name"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Phone Number</label>
                    <input
                      className={styles.input}
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      required
                    />
                  </div>

                  <div className={`${styles.field} ${styles.fullWidth}`}>
                    <label className={styles.label}>Service Category</label>
                    <select
                      className={styles.input}
                      value={form.service}
                      onChange={e => setForm({ ...form, service: e.target.value })}
                      required
                    >
                      <option value="">Select a service</option>
                      {SERVICE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Preferred Date</label>
                    <input
                      className={styles.input}
                      type="date"
                      value={form.date}
                      onChange={e => setForm({ ...form, date: e.target.value })}
                      required
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Preferred Time</label>
                    <select
                      className={styles.input}
                      value={form.time}
                      onChange={e => setForm({ ...form, time: e.target.value })}
                      required
                    >
                      <option value="">Choose time</option>
                      {['9:00 AM','10:00 AM','11:00 AM','12:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM','6:00 PM'].map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                  <span>Confirm Appointment</span>
                </button>

                <p className={styles.formNote}>
                  Free cancellation up to 24 hours before your appointment.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
