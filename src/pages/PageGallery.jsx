import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const PHOTOS = [
  { id: 1, src: '/images/gf-1.jpg', caption: 'my gorgeous Mainaa ✨', rotate: -5 },
  { id: 2, src: '/images/gf-2.jpg', caption: 'cutest smile ever beab 💕', rotate: 4 },
  { id: 3, src: '/images/gf-3.jpg', caption: 'absolute perfection 🔥', rotate: -3 },
  { id: 4, src: '/images/gf-4.jpg', caption: 'stunning queen Mainaa 👑', rotate: 5 },
  { id: 5, src: '/images/gf-5.jpg', caption: 'i love you too beab 😘', rotate: -4 },
  { id: 6, src: '/images/gf-6.jpg', caption: 'my sun-kissed Mainaa ☀️', rotate: 3 },
]

export default function PageGallery() {
  const [active, setActive] = useState(null)

  return (
    <div className="scrap-scroll flex h-full w-full flex-col items-center overflow-y-auto rounded-scrap p-6">
      <h3 className="font-display text-xl font-bold text-white drop-shadow">
        Our Memories 📸❤️
      </h3>

      <div className="mt-5 grid grid-cols-2 gap-4">
        {PHOTOS.map((photo, i) => (
          <motion.button
            key={photo.id}
            type="button"
            className="polaroid w-32 cursor-pointer text-left sm:w-36"
            style={{ rotate: `${photo.rotate}deg` }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            whileHover={{ scale: 1.06, rotate: 0, y: -6 }}
            onClick={() => setActive(photo)}
          >
            <div className="aspect-square w-full overflow-hidden rounded-sm bg-white/10">
              <img
                src={photo.src}
                alt={photo.caption}
                className="h-full w-full object-cover"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                  e.currentTarget.parentElement.dataset.empty = 'true'
                }}
              />
              <div className="hidden h-full w-full items-center justify-center text-xs text-white/50 data-[empty=true]:flex">
                💕
              </div>
            </div>
            <p className="mt-2 truncate font-script text-xs text-white/80">
              {photo.caption}
            </p>
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
            <motion.div
              className="polaroid max-w-sm"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={active.src}
                alt={active.caption}
                className="max-h-[70vh] w-full object-cover rounded-sm"
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
              <p className="mt-3 text-center font-script text-sm text-white/90">
                {active.caption}
              </p>
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close"
                className="absolute -right-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-blush-500 shadow-card"
              >
                <X size={16} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
