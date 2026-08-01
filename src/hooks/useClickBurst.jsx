import { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BURST_EMOJIS = ['❤️', '💕', '✨', '💖', '🌸', '💗']

/**
 * Hook that returns:
 *   - handleClick  → attach to the root onClick
 *   - BurstLayer   → render this once near the top of the tree
 */
export default function useClickBurst() {
  const [bursts, setBursts] = useState([])
  const nextId = useRef(0)

  const handleClick = useCallback((e) => {
    // Don't fire if the user clicked a button/input
    if (e.target.closest('button, input, a, [role="button"]')) return

    const id = nextId.current++
    const x = e.clientX
    const y = e.clientY

    // Spawn 6 mini emojis per click, each in a different direction
    const count = 6
    const particles = Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * 360
      const rad = (angle * Math.PI) / 180
      const dist = 35 + Math.random() * 30
      return {
        dx: Math.cos(rad) * dist,
        dy: Math.sin(rad) * dist - 10,
        emoji: BURST_EMOJIS[i % BURST_EMOJIS.length],
        rotate: Math.random() * 60 - 30,
      }
    })

    setBursts((prev) => [...prev, { id, x, y, particles }])
    setTimeout(() => {
      setBursts((prev) => prev.filter((b) => b.id !== id))
    }, 900)
  }, [])

  function BurstLayer() {
    return (
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        <AnimatePresence>
          {bursts.map((burst) =>
            burst.particles.map((p, i) => (
              <motion.span
                key={`${burst.id}-${i}`}
                style={{
                  position: 'absolute',
                  left: burst.x,
                  top: burst.y,
                  fontSize: '16px',
                  lineHeight: 1,
                  userSelect: 'none',
                }}
                initial={{ opacity: 1, x: '-50%', y: '-50%', scale: 0.4, rotate: 0 }}
                animate={{
                  opacity: 0,
                  x: `calc(-50% + ${p.dx}px)`,
                  y: `calc(-50% + ${p.dy}px)`,
                  scale: 1.2,
                  rotate: p.rotate,
                }}
                transition={{ duration: 0.75, ease: 'easeOut' }}
              >
                {p.emoji}
              </motion.span>
            ))
          )}
        </AnimatePresence>
      </div>
    )
  }

  return { handleClick, BurstLayer }
}
