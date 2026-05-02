import { motion, AnimatePresence } from 'framer-motion';

export default function Toast({ msg }) {
  return (
    <AnimatePresence>
      {msg && (
        <motion.div className="toast"
          initial={{ opacity:0, y:20, x:'-50%' }}
          animate={{ opacity:1, y:0,  x:'-50%' }}
          exit={{ opacity:0, y:10,    x:'-50%' }}
          transition={{ duration:0.35, ease:[0.25,0.1,0.15,1] }}>
          {msg}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
