import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ background: 'linear-gradient(160deg, #FF4D6D 0%, #e91e8c 55%, #c2185b 100%)' }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        animate={{ scale: [1, 1.18, 1] }}
        transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Heart className="h-14 w-14 text-white" fill="white" />
      </motion.div>
      <p className="mt-4 font-display text-sm tracking-wide text-white/90">
        wrapping your surprise… 🎁
      </p>
    </motion.div>
  )
}
