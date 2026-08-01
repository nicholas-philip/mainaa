import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import initialDreams from '../data/dreams.js'

export default function PageDreams() {
  const [dreams, setDreams] = useState(initialDreams)

  const toggle = (id) => {
    setDreams((prev) =>
      prev.map((d) => (d.id === id ? { ...d, done: !d.done } : d))
    )
  }

  return (
    <div className="scrap-scroll flex h-full w-full flex-col items-center overflow-y-auto rounded-scrap p-6">
      <h3 className="font-display text-xl font-bold text-white drop-shadow">
        Future Dreams 🌍✨
      </h3>
      <p className="mt-1 font-body text-xs text-white/70">
        things I still want to do with you
      </p>

      <ul className="mt-5 w-full max-w-sm space-y-3">
        {dreams.map((dream, i) => (
          <motion.li
            key={dream.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
          >
            <button
              type="button"
              onClick={() => toggle(dream.id)}
              className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition"
              style={{
                background: dream.done
                  ? 'rgba(255,255,255,0.25)'
                  : 'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              <span
                className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition ${
                  dream.done
                    ? 'border-white bg-white'
                    : 'border-white/50 bg-transparent'
                }`}
              >
                {dream.done && <Check size={12} className="text-blush-500" />}
              </span>
              <span
                className={`font-body text-sm ${
                  dream.done ? 'text-white/50 line-through' : 'text-white'
                }`}
              >
                {dream.text}
              </span>
            </button>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}
