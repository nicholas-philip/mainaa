import { motion } from 'framer-motion'
import FloatingHearts from './FloatingHearts.jsx'
import Sparkles from './Sparkles.jsx'

export default function GiftLanding({ onOpen }) {
  return (
    <motion.div
      className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden px-6 text-center"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      <FloatingHearts count={9} />
      <Sparkles count={10} />

      <motion.h1
        className="font-display text-3xl leading-tight text-white drop-shadow-lg sm:text-4xl"
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{ fontWeight: 700 }}
      >
        HAPPY NATIONAL
        <br />
        GF&apos;S DAY, MAINAA 💕
      </motion.h1>

      <motion.p
        className="mt-3 font-body text-sm text-white/80 sm:text-base"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        click the gift to open your surprise, my beab ❤️
      </motion.p>

      <motion.button
        type="button"
        onClick={onOpen}
        aria-label="Open your surprise"
        className="relative mt-10 h-40 w-40 cursor-pointer select-none sm:h-48 sm:w-48"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.35, type: 'spring' }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.92 }}
      >
        <motion.div className="absolute inset-0 animate-floatY animate-glow">
          <HeartGift />
        </motion.div>
      </motion.button>

      <motion.span
        className="mt-8 font-body text-xs uppercase tracking-[0.2em] text-white/60"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        tap to unwrap
      </motion.span>
    </motion.div>
  )
}

function HeartGift() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full drop-shadow-2xl">
      <path
        d="M100 176C100 176 20 128 20 74C20 44 44 24 70 24C86 24 98 32 100 46C102 32 114 24 130 24C156 24 180 44 180 74C180 128 100 176 100 176Z"
        fill="white"
        fillOpacity="0.9"
      />
      <path
        d="M100 176C100 176 20 128 20 74C20 44 44 24 70 24C86 24 98 32 100 46C102 32 114 24 130 24C156 24 180 44 180 74C180 128 100 176 100 176Z"
        fill="url(#giftShine)"
        opacity="0.5"
      />
      <rect x="90" y="20" width="20" height="150" fill="#FF4D6D" opacity="0.6" />
      <path d="M100 40 C70 10, 40 30, 60 55 C75 68, 92 55, 100 40 Z" fill="#FF4D6D" opacity="0.6" />
      <path d="M100 40 C130 10, 160 30, 140 55 C125 68, 108 55, 100 40 Z" fill="#FF4D6D" opacity="0.6" />
      <defs>
        <linearGradient id="giftShine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#FF4D6D" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )
}
