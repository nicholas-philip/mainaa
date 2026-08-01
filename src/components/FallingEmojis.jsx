import { useMemo } from 'react'

const EMOJIS = ['💖', '💕', '🌸', '✨', '❤️', '💗', '🌺', '💓', '💞']

/**
 * Renders continuously falling love emojis behind the card.
 * Lives in the outer page wrapper so they appear on the light-pink bg.
 */
export default function FallingEmojis({ count = 22 }) {
  const particles = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      emoji: EMOJIS[i % EMOJIS.length],
      left: `${(i / count) * 100 + Math.random() * (100 / count)}%`,
      delay: `${(Math.random() * 10).toFixed(2)}s`,
      duration: `${(7 + Math.random() * 9).toFixed(2)}s`,
      fontSize: `${14 + Math.floor(Math.random() * 18)}px`,
      opacity: (0.35 + Math.random() * 0.55).toFixed(2),
    })),
  [count])

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="falling-emoji"
          style={{
            left: p.left,
            fontSize: p.fontSize,
            animationDelay: p.delay,
            animationDuration: p.duration,
            opacity: p.opacity,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  )
}
