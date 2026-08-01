import { useEffect, useRef } from 'react'

const COLORS = ['#FF7DAE', '#FFB7D5', '#FAD1DC', '#FFE4EE', '#FFFFFF']

/**
 * Lightweight canvas confetti burst. No external dependency —
 * fires once on mount and cleans itself up.
 */
export default function Confetti({ active = true, pieceCount = 140 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!active) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let width = (canvas.width = canvas.offsetWidth)
    let height = (canvas.height = canvas.offsetHeight)

    const pieces = Array.from({ length: pieceCount }, () => ({
      x: Math.random() * width,
      y: -20 - Math.random() * height,
      r: 4 + Math.random() * 5,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      speed: 2 + Math.random() * 3,
      drift: -1 + Math.random() * 2,
      spin: Math.random() * Math.PI,
      spinSpeed: -0.1 + Math.random() * 0.2,
    }))

    let frame
    let elapsed = 0
    const duration = 4200

    const tick = () => {
      elapsed += 16
      ctx.clearRect(0, 0, width, height)
      pieces.forEach((p) => {
        p.y += p.speed
        p.x += p.drift
        p.spin += p.spinSpeed
        if (p.y > height) p.y = -10
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.spin)
        ctx.fillStyle = p.color
        ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 0.6)
        ctx.restore()
      })
      if (elapsed < duration) {
        frame = requestAnimationFrame(tick)
      } else {
        ctx.clearRect(0, 0, width, height)
      }
    }
    frame = requestAnimationFrame(tick)

    const onResize = () => {
      width = canvas.width = canvas.offsetWidth
      height = canvas.height = canvas.offsetHeight
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', onResize)
    }
  }, [active, pieceCount])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  )
}
