import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function PageLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          style={{
            position: 'fixed', inset: 0, zIndex: 99999,
            background: 'var(--ink)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: '2rem',
          }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.15, 1] } }}
        >
          {/* Animated logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.15, 1] }}
            style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.5rem,6vw,4rem)', color: 'var(--ivory)' }}
          >
            Glam<span style={{ color: 'var(--gold-light)', fontStyle: 'italic' }}>ora</span>
          </motion.div>

          {/* Gold progress bar */}
          <motion.div
            style={{ width: '120px', height: '1px', background: 'var(--border-soft)', borderRadius: '1px', overflow: 'hidden' }}>
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.4, ease: 'easeInOut' }}
              style={{ height: '100%', background: 'linear-gradient(90deg, var(--gold-dim), var(--gold-light))' }}
            />
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{ fontFamily: 'var(--cap)', fontSize: '8px', letterSpacing: '0.45em', color: 'var(--mist)', textTransform: 'uppercase' }}>
            Luxury Beauty Studio · Trichy
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
