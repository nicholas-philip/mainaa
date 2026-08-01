import { motion } from 'framer-motion'
import Sparkles from '../components/Sparkles.jsx'

export default function PageIntro() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center rounded-scrap p-8 text-center">
      <Sparkles count={6} />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex h-24 w-24 items-center justify-center rounded-full text-4xl"
        style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', border: '1.5px solid rgba(255,255,255,0.35)' }}
      >
        🌷
      </motion.div>

      <motion.h2
        className="mt-6 font-display text-3xl font-bold text-white drop-shadow-lg sm:text-4xl"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        For My Mainaa 💕
      </motion.h2>

      <motion.p
        className="mt-3 max-w-xs font-body text-sm text-white/80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        A little scrapbook for my beab — flip through whenever you need a reminder
        of how deeply loved you are. ❤️
      </motion.p>

      <motion.p
        className="mt-8 font-script text-xs uppercase tracking-[0.25em] text-white/60"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.4, repeat: Infinity }}
      >
        swipe or press → to begin
      </motion.p>
    </div>
  )
}
