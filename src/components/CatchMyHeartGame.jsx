import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Trophy, RotateCcw, Flame } from 'lucide-react'
import Confetti from './Confetti.jsx'

const EMOJIS = ['💖', '💕', '❤️', '✨']

export default function CatchMyHeartGame({ open, onClose }) {
  const [timeLeft, setTimeLeft] = useState(15)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [hearts, setHearts] = useState([])
  const nextHeartId = useRef(0)

  // Reset / Start Game
  const startGame = () => {
    setTimeLeft(15)
    setScore(0)
    setGameOver(false)
    setHearts([])
    nextHeartId.current = 0
  }

  // Effect to handle start when modal opens
  useEffect(() => {
    if (open) {
      startGame()
    }
  }, [open])

  // Timer countdown effect
  useEffect(() => {
    if (!open || gameOver) return

    if (timeLeft <= 0) {
      setGameOver(true)
      setHearts([])
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [open, gameOver, timeLeft])

  // Spawn falling hearts continuously while game is active
  useEffect(() => {
    if (!open || gameOver) return

    const spawner = setInterval(() => {
      const id = nextHeartId.current++
      const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)]
      const left = Math.floor(Math.random() * 80) + 5 // 5% to 85%
      const duration = 2.2 + Math.random() * 1.8 // 2.2s to 4s speed
      const size = 32 + Math.floor(Math.random() * 16) // 32px to 48px

      setHearts((prev) => [
        ...prev,
        { id, emoji, left, duration, size, popped: false },
      ])
    }, 450)

    return () => clearInterval(spawner)
  }, [open, gameOver])

  // Clean up hearts that reach the bottom naturally
  const handleHeartAnimationComplete = (id) => {
    setHearts((prev) => prev.filter((h) => h.id !== id))
  }

  // Catch heart click
  const catchHeart = (id, e) => {
    e.stopPropagation()
    setScore((prev) => prev + 1)
    setHearts((prev) =>
      prev.map((h) => (h.id === id ? { ...h, popped: true } : h))
    )
    // Remove after short pop animation
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== id))
    }, 200)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0"
            style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
            onClick={onClose}
          />

          {/* Game Window Card */}
          <motion.div
            className="relative z-10 flex h-[82vh] w-full max-w-sm flex-col overflow-hidden rounded-[32px] p-5 select-none"
            style={{
              background: 'linear-gradient(160deg, #FF4D6D 0%, #e91e8c 55%, #c2185b 100%)',
              border: '2px solid rgba(255,255,255,0.35)',
              boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
            }}
            initial={{ scale: 0.85, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 30 }}
            transition={{ type: 'spring', damping: 24, stiffness: 280 }}
          >
            {/* Header / Stats Bar */}
            <div className="flex items-center justify-between rounded-2xl p-3 backdrop-blur-md" style={{ background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.25)' }}>
              <div className="flex items-center gap-2">
                <span className="text-xl">⏱️</span>
                <div>
                  <p className="font-body text-[10px] uppercase tracking-wider text-white/70">Time Left</p>
                  <p className="font-display text-lg font-bold text-white">{timeLeft}s</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xl">💖</span>
                <div>
                  <p className="font-body text-[10px] uppercase tracking-wider text-white/70">Hearts Caught</p>
                  <p className="font-display text-lg font-bold text-white">{score}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close Game"
                className="flex h-8 w-8 items-center justify-center rounded-full text-white transition hover:scale-110"
                style={{ background: 'rgba(255,255,255,0.25)' }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Main Interactive Game Arena */}
            <div className="relative flex-1 w-full overflow-hidden mt-3 rounded-2xl" style={{ background: 'rgba(0,0,0,0.15)', border: '1px border-white/10' }}>
              {!gameOver && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <p className="font-script text-xs text-white/30 tracking-widest uppercase">
                    Tap the falling hearts! ✨
                  </p>
                </div>
              )}

              {/* Falling Hearts */}
              {!gameOver &&
                hearts.map((h) => (
                  <motion.button
                    key={h.id}
                    type="button"
                    onClick={(e) => catchHeart(h.id, e)}
                    className="absolute cursor-pointer select-none focus:outline-none"
                    style={{
                      left: `${h.left}%`,
                      fontSize: `${h.size}px`,
                      lineHeight: 1,
                      zIndex: 20,
                    }}
                    initial={{ top: '-15%', opacity: 1, scale: 1 }}
                    animate={
                      h.popped
                        ? { scale: [1, 1.8, 0], opacity: [1, 1, 0] }
                        : { top: '105%', opacity: 1, scale: 1 }
                    }
                    transition={
                      h.popped
                        ? { duration: 0.2 }
                        : { duration: h.duration, ease: 'linear' }
                    }
                    onAnimationComplete={() => {
                      if (!h.popped) handleHeartAnimationComplete(h.id)
                    }}
                  >
                    {h.emoji}
                  </motion.button>
                ))}

              {/* End Screen Twist Modal / Popup */}
              <AnimatePresence>
                {gameOver && (
                  <motion.div
                    className="absolute inset-0 z-50 flex flex-col items-center justify-center p-6 text-center"
                    style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)' }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: 'spring', damping: 20 }}
                  >
                    <Confetti />

                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.3, 1] }}
                      transition={{ duration: 0.6 }}
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-3xl shadow-xl mb-3"
                    >
                      🏆
                    </motion.div>

                    <h3 className="font-display text-2xl font-bold text-white drop-shadow-md">
                      Game Over! 💕
                    </h3>

                    <p className="mt-3 font-script text-base sm:text-lg leading-relaxed text-white/95 max-w-xs">
                      You caught <span className="font-bold text-yellow-300 text-xl">{score}</span> hearts, but you already stole mine 100%! 💖
                    </p>

                    <motion.button
                      type="button"
                      onClick={startGame}
                      className="mt-6 flex items-center gap-2 rounded-full px-6 py-3 font-display text-sm font-bold transition hover:scale-105 active:scale-95 shadow-xl"
                      style={{
                        background: 'linear-gradient(135deg, #ffffff, #ffe0ef)',
                        color: '#e91e8c',
                        border: '2px solid white',
                      }}
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.94 }}
                    >
                      <RotateCcw size={16} />
                      Play Again 🔄
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
