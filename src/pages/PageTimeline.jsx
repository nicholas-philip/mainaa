import { motion } from 'framer-motion'
import timeline from '../data/timeline.js'

export default function PageTimeline() {
  return (
    <div className="scrap-scroll flex h-full w-full flex-col items-center overflow-y-auto rounded-scrap p-6">
      <h3 className="font-display text-xl font-bold text-white drop-shadow">
        Our Story 🌍❤️
      </h3>

      <div className="relative mt-6 w-full max-w-sm pl-6">
        <div className="absolute bottom-2 left-2 top-2 w-0.5 bg-white/30" />
        {timeline.map((step, i) => (
          <motion.div
            key={i}
            className="relative mb-8 last:mb-0"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
          >
            <span className="absolute -left-[27px] top-1 h-3 w-3 rounded-full border-2 border-white bg-white/80 shadow-card" />
            <p className="font-display text-xs uppercase tracking-wide text-white/60">
              {step.date}
            </p>
            <h4 className="mt-0.5 font-display text-base font-bold text-white">
              {step.title}
            </h4>
            <p className="mt-1 font-body text-sm text-white/80">{step.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
