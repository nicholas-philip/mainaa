import { motion } from 'framer-motion'

const HEARTS = Array.from({ length: 10 }, (_, i) => i)

export default function FloatingHearts({ count = 10 }) {
  const items = HEARTS.slice(0, count)
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((i) => {
        const left = (i * 97) % 100
        const size = 14 + ((i * 13) % 22)
        const duration = 6 + (i % 5)
        const delay = (i % 6) * 0.7
        return (
          <motion.span
            key={i}
            className="absolute text-blush-500"
            style={{ left: `${left}%`, bottom: -40, fontSize: size }}
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: -600, opacity: [0, 1, 1, 0] }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            ♥
          </motion.span>
        )
      })}
    </div>
  )
}
