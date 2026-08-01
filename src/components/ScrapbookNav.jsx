import { ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react'

export default function ScrapbookNav({
  pageIndex,
  pageCount,
  onPrev,
  onNext,
  muted,
  onToggleMute,
}) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 flex flex-col items-center gap-3 pb-5">
      {/* Page dots */}
      <div className="pointer-events-auto flex items-center gap-1.5">
        {Array.from({ length: pageCount }).map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === pageIndex ? 'w-5 bg-white' : 'w-1.5 bg-white/30'
            }`}
          />
        ))}
      </div>

      {/* Buttons */}
      <div className="pointer-events-auto flex items-center gap-4">
        <button
          type="button"
          onClick={onPrev}
          disabled={pageIndex === 0}
          aria-label="Previous page"
          className="flex h-10 w-10 items-center justify-center rounded-full backdrop-blur transition disabled:opacity-30"
          style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}
        >
          <ChevronLeft size={20} />
        </button>

        <button
          type="button"
          onClick={onToggleMute}
          aria-label={muted ? 'Unmute music' : 'Mute music'}
          className="flex h-10 w-10 items-center justify-center rounded-full backdrop-blur transition"
          style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}
        >
          {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={pageIndex === pageCount - 1}
          aria-label="Next page"
          className="flex h-10 w-10 items-center justify-center rounded-full backdrop-blur transition disabled:opacity-30"
          style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  )
}
