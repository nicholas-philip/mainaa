import { motion } from 'framer-motion'
import reasons from '../data/reasons.js'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}

const item = {
  hidden: { opacity: 0, y: 14, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1 },
}

export default function PageReasons() {
  return (
    <div className="scrap-scroll flex h-full w-full flex-col items-center overflow-y-auto rounded-scrap p-6">
      <h3 className="font-display text-xl font-bold text-white drop-shadow">
        Reasons I Love You 💕
      </h3>

      <motion.div
        className="mt-5 grid w-full grid-cols-1 gap-3 sm:grid-cols-2"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {reasons.map((reason, i) => (
          <motion.div
            key={i}
            variants={item}
            whileHover={{ scale: 1.03, rotate: i % 2 === 0 ? -1 : 1 }}
            className="rounded-2xl p-4 text-left"
            style={{
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.25)',
            }}
          >
            <span className="font-display text-xs text-white/50">
              #{String(i + 1).padStart(2, '0')}
            </span>
            <p className="mt-1 font-body text-sm text-white/90">{reason}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
