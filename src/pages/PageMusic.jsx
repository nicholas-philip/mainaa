import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, SkipBack, SkipForward, Music2, Heart } from 'lucide-react'

const LYRICS = [
  "♪ All these girls but you I dey like (you are) ♪",
  "♪ Make a bad man lose his mind (you are) ♪",
  "♪ Wetin dey your inside jollof I want know ♪",
  "♪ Girl you get me falling for you every day ♪",
]

export default function PageMusic({ audio }) {
  const [progress, setProgress] = useState(0)
  const [lyricIdx, setLyricIdx] = useState(0)

  useEffect(() => {
    if (!audio?.playing) return
    const interval = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : p + 0.5))
    }, 200)
    return () => clearInterval(interval)
  }, [audio?.playing])

  useEffect(() => {
    if (!audio?.playing) return
    const lyricInterval = setInterval(() => {
      setLyricIdx((i) => (i + 1) % LYRICS.length)
    }, 3500)
    return () => clearInterval(lyricInterval)
  }, [audio?.playing])

  return (
    <div className="flex h-full w-full flex-col items-center justify-center rounded-scrap p-6 text-center">
      <h3 className="font-display text-lg font-semibold text-white drop-shadow">
        Our Special Song 🎵
      </h3>
      <p className="mt-0.5 font-body text-xs text-white/70">
        Dedicated to my beab, Mainaa ❤️
      </p>

      {/* Spinning Record */}
      <div className="relative mt-5 flex items-center justify-center">
        <motion.div
          animate={{ rotate: audio?.playing ? 360 : 0 }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          className="relative flex h-36 w-36 items-center justify-center rounded-full overflow-hidden"
          style={{
            background: 'rgba(0,0,0,0.6)',
            border: '4px solid rgba(255,255,255,0.3)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
          }}
        >
          <div className="absolute inset-2 rounded-full border border-white/10" />
          <div className="absolute inset-5 rounded-full border border-white/10" />
          <div className="absolute inset-8 rounded-full border border-white/10" />

          <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-white/60 shadow-md">
            <img
              src="/images/gf-1.jpg"
              alt="Girlfriend photo"
              className="h-full w-full object-cover"
              onError={(e) => { e.currentTarget.style.display = 'none' }}
            />
            <div className="flex h-full w-full items-center justify-center text-white" style={{ background: 'rgba(255,77,109,0.8)' }}>
              <Music2 size={24} />
            </div>
          </div>
        </motion.div>

        <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full shadow-card" style={{ background: 'rgba(255,255,255,0.25)', border: '1px solid rgba(255,255,255,0.4)' }}>
          <Heart size={16} fill="white" color="white" />
        </div>
      </div>

      {/* Track Info */}
      <h4 className="mt-5 font-display text-base font-bold text-white">
        You Are
      </h4>
      <p className="font-body text-xs font-semibold text-white/70">
        King Promise &amp; Mr Eazi
      </p>

      {/* Lyric Display */}
      <div
        className="mt-3 flex h-10 w-full max-w-xs items-center justify-center rounded-xl px-3"
        style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)' }}
      >
        <AnimatePresence mode="wait">
          <motion.p
            key={lyricIdx}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="font-script text-xs text-white/90 italic"
          >
            {LYRICS[lyricIdx]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Progress Bar */}
      <div className="mt-4 w-full max-w-xs">
        <div className="h-1.5 w-full overflow-hidden rounded-full" style={{ background: 'rgba(255,255,255,0.2)' }}>
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{ width: `${progress}%`, background: 'white' }}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="mt-5 flex items-center gap-6">
        <button type="button" aria-label="Previous" className="transition hover:scale-110" style={{ color: 'rgba(255,255,255,0.5)' }}>
          <SkipBack size={20} />
        </button>

        <button
          type="button"
          onClick={audio?.toggle}
          aria-label={audio?.playing ? 'Pause' : 'Play'}
          className="flex h-12 w-12 items-center justify-center rounded-full text-white transition hover:scale-105"
          style={{ background: 'rgba(255,255,255,0.25)', border: '1.5px solid rgba(255,255,255,0.4)', backdropFilter: 'blur(8px)' }}
        >
          {audio?.playing ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
        </button>

        <button type="button" aria-label="Next" className="transition hover:scale-110" style={{ color: 'rgba(255,255,255,0.5)' }}>
          <SkipForward size={20} />
        </button>
      </div>
    </div>
  )
}
