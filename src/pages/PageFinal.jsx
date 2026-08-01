import { motion } from 'framer-motion'
import { RotateCcw } from 'lucide-react'
import Confetti from '../components/Confetti.jsx'
import FloatingHearts from '../components/FloatingHearts.jsx'

export default function PageFinal({ onReplay }) {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-scrap p-8 text-center">
      <FloatingHearts count={10} />
      <Confetti />

      <motion.div
        className="text-6xl mb-4"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.4, repeat: Infinity }}
      >
        ❤️
      </motion.div>

      <motion.h2
        className="font-display text-3xl font-bold text-white drop-shadow-lg sm:text-4xl"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, type: 'spring' }}
      >
        I LOVE YOU MAINAA ❤️
      </motion.h2>

      <motion.p
        className="mt-4 max-w-xs font-body text-sm text-white/85"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        Happy Girlfriend&apos;s Day my beab 🌍💕 Forever yours — till the last byyyyy. 🥺❤️
      </motion.p>

      <motion.p
        className="mt-3 max-w-xs font-script text-xs text-white/70 italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        &ldquo;One day the distance won&apos;t matter — because I&apos;ll be holding you tight.&rdquo; 🤗
      </motion.p>

      <motion.button
        type="button"
        onClick={onReplay}
        className="mt-8 flex items-center gap-2 rounded-full px-5 py-2.5 font-display text-sm font-bold transition hover:scale-105"
        style={{ background: 'rgba(255,255,255,0.25)', color: 'white', border: '1.5px solid rgba(255,255,255,0.4)', backdropFilter: 'blur(8px)' }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <RotateCcw size={16} />
        Replay 🔁
      </motion.button>
    </div>
  )
}
