import { useRef } from 'react'
import { motion } from 'framer-motion'

/**
 * Two draggable floating action buttons fixed on screen.
 * User can drag them anywhere on the screen.
 */
export default function FloatingActions({ onShowNote, onShowGame }) {
  const constraintsRef = useRef(null)

  return (
    <>
      {/* Full-screen drag area (invisible) */}
      <div
        ref={constraintsRef}
        className="pointer-events-none fixed inset-0 z-40"
      />

      {/* 💌 Secret Note FAB */}
      <motion.button
        type="button"
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.15}
        dragMomentum={false}
        whileDrag={{ scale: 1.15, boxShadow: '0 12px 32px rgba(233,30,140,0.6)' }}
        onClick={() => onShowNote()}
        aria-label="Tap for a Secret Note"
        className="fixed z-50 cursor-grab active:cursor-grabbing select-none focus:outline-none"
        style={{ bottom: '90px', right: '18px', touchAction: 'none' }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 14, stiffness: 220, delay: 0.3 }}
      >
        {/* Pulsing ring */}
        <motion.span
          className="absolute inset-0 rounded-full"
          style={{ background: 'rgba(255,77,109,0.35)' }}
          animate={{ scale: [1, 1.45, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.span
          className="relative flex h-14 w-14 items-center justify-center rounded-full text-2xl shadow-xl"
          style={{
            background: 'linear-gradient(135deg, #FF4D6D, #c2185b)',
            border: '2.5px solid rgba(255,255,255,0.55)',
            boxShadow: '0 6px 22px rgba(233,30,140,0.5)',
          }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          💌
        </motion.span>
      </motion.button>

      {/* 🎮 Mini Game FAB */}
      <motion.button
        type="button"
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.15}
        dragMomentum={false}
        whileDrag={{ scale: 1.15, boxShadow: '0 12px 32px rgba(233,30,140,0.6)' }}
        onClick={() => onShowGame()}
        aria-label="Play Mini Game: Catch My Heart"
        className="fixed z-50 cursor-grab active:cursor-grabbing select-none focus:outline-none"
        style={{ bottom: '168px', right: '18px', touchAction: 'none' }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 14, stiffness: 220, delay: 0.5 }}
      >
        {/* Pulsing ring */}
        <motion.span
          className="absolute inset-0 rounded-full"
          style={{ background: 'rgba(233,30,140,0.3)' }}
          animate={{ scale: [1, 1.45, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />
        <motion.span
          className="relative flex h-14 w-14 items-center justify-center rounded-full text-2xl shadow-xl"
          style={{
            background: 'linear-gradient(135deg, #e91e8c, #880e4f)',
            border: '2.5px solid rgba(255,255,255,0.55)',
            boxShadow: '0 6px 22px rgba(136,14,79,0.5)',
          }}
          animate={{ rotate: [-8, 8, -8] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          🎮
        </motion.span>
      </motion.button>
    </>
  )
}
