import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const PHOTOS = [
  { id: 1, src: '/images/gf-1.jpg', top: '5%', left: '8%', rotate: -8 },
  { id: 2, src: '/images/gf-2.jpg', top: '12%', left: '55%', rotate: 10 },
  { id: 3, src: '/images/gf-3.jpg', top: '30%', left: '15%', rotate: -4 },
  { id: 4, src: '/images/gf-4.jpg', top: '35%', left: '58%', rotate: 6 },
  { id: 5, src: '/images/gf-5.jpg', top: '55%', left: '5%', rotate: 8 },
  { id: 6, src: '/images/gf-6.jpg', top: '58%', left: '50%', rotate: -7 },
  { id: 7, src: '/images/gf-7.jpg', top: '75%', left: '25%', rotate: -5 },
  { id: 8, src: '/images/gf-8.jpg', top: '70%', left: '60%', rotate: 12 },
]

export default function PageCollage() {
  const [active, setActive] = useState(null)

  return (
    <div className="relative flex h-full w-full flex-col items-center overflow-hidden rounded-scrap p-6">
      <h3 className="font-display text-xl font-bold text-white drop-shadow">
        Photo Collage 💕
      </h3>

      <div className="relative mt-4 h-full w-full max-w-sm">
        {PHOTOS.map((item, i) => (
          <motion.button
            key={item.id}
            type="button"
            className="polaroid absolute w-24 sm:w-28"
            style={{
              top: item.top,
              left: item.left,
              rotate: `${item.rotate}deg`,
              zIndex: i,
            }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            whileHover={{ scale: 1.15, rotate: 0, zIndex: 20 }}
            onClick={() => setActive(item)}
          >
            <div className="aspect-square w-full overflow-hidden rounded-sm bg-white/10">
              <img
                src={item.src}
                alt={`memory ${item.id}`}
                className="h-full w-full object-cover"
                loading="lazy"
                onError={(e) => (e.currentTarget.style.opacity = 0)}
              />
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.img
              src={active.src}
              alt="memory"
              className="max-h-[75vh] max-w-full rounded-xl object-contain shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            />
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Close"
              className="absolute right-6 top-6 flex h-9 w-9 items-center justify-center rounded-full bg-white text-blush-500 shadow-card"
            >
              <X size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
