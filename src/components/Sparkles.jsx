const SPARKS = Array.from({ length: 8 }, (_, i) => i)

export default function Sparkles({ count = 8 }) {
  const items = SPARKS.slice(0, count)
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((i) => {
        const top = (i * 53) % 100
        const left = (i * 37) % 100
        const delay = (i % 5) * 0.4
        const size = 6 + (i % 4) * 3
        return (
          <span
            key={i}
            className="absolute rounded-full bg-white animate-sparkle"
            style={{
              top: `${top}%`,
              left: `${left}%`,
              width: size,
              height: size,
              boxShadow: '0 0 8px 2px rgba(255,255,255,0.9)',
              animationDelay: `${delay}s`,
            }}
          />
        )
      })}
    </div>
  )
}
