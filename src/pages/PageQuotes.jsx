import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import quotes from '../data/quotes.js'

export default function PageQuotes() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % quotes.length)
    }, 3500)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex h-full w-full flex-col items-center justify-center rounded-scrap p-8 text-center">
      <h3 className="font-display text-xl font-bold text-white drop-shadow">
        Words For You 💕
      </h3>

      <div className="mt-8 flex h-36 w-full max-w-sm items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.5 }}
            className="font-script text-base leading-relaxed text-white sm:text-lg"
          >
            {quotes[index]}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-1.5">
        {quotes.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Show quote ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? 'w-5 bg-white' : 'w-1.5 bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
