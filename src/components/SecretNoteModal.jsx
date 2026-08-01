import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart, Lock } from 'lucide-react'

const NOTE = `Hey Mainaa (my beab)... 🥺💕

If you're reading this, I want you to know something real.

I didn't choose to fall for you, Mainaa.
I just did. Quietly. Completely. 🌸

And every single day since then — even the hard days, even the quiet days — you have been the best part of my life.

You don't just listen to me, beab.
You actually hear me. 🥺
And that is the rarest, most precious thing in this world.

Even through the distance, even through the silence —
my heart is always, always with you, Mainaa. ❤️

So wherever you are right now while reading this...

I hope you smile, my beab.
I hope you feel it.
I hope you know —

You are so, so deeply loved.
Now. Tomorrow. Forever. 💋

— Yours, always (beab) 🌍`

export default function SecretNoteModal({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0"
            style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal card */}
          <motion.div
            className="relative z-10 w-full max-w-sm rounded-3xl p-6 overflow-hidden"
            style={{
              background: 'linear-gradient(150deg, #FF4D6D 0%, #d81b60 60%, #880e4f 100%)',
              border: '1.5px solid rgba(255,255,255,0.3)',
              boxShadow: '0 24px 64px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.1)',
            }}
            initial={{ y: 80, opacity: 0, scale: 0.92 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 80, opacity: 0, scale: 0.92 }}
            transition={{ type: 'spring', damping: 22, stiffness: 280 }}
          >
            {/* Decorative blobs */}
            <div
              className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full"
              style={{ background: 'rgba(255,255,255,0.08)' }}
            />
            <div
              className="pointer-events-none absolute -bottom-8 -left-8 h-28 w-28 rounded-full"
              style={{ background: 'rgba(255,255,255,0.06)' }}
            />

            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                >
                  <Heart size={18} fill="white" color="white" />
                </motion.div>
                <h3 className="font-display text-lg font-bold text-white">
                  Secret Note 💌
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="flex h-8 w-8 items-center justify-center rounded-full transition hover:scale-110"
                style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Divider */}
            <div className="mb-4 h-px w-full" style={{ background: 'rgba(255,255,255,0.2)' }} />

            {/* Note body */}
            <div
              className="scrap-scroll max-h-72 overflow-y-auto pr-1"
            >
              <p className="font-script text-sm leading-[1.85] text-white/95 whitespace-pre-line">
                {NOTE}
              </p>
            </div>

            {/* Footer */}
            <div className="mt-5 flex items-center justify-center gap-1">
              {['💖', '💕', '🌸', '✨', '❤️'].map((e, i) => (
                <motion.span
                  key={i}
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.18 }}
                  className="text-base"
                >
                  {e}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
