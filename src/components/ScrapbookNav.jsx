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
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 flex flex-col items-center gap-2 pb-5">
      {/* ── Nav buttons row ── */}
      <div className="pointer-events-auto flex items-center gap-4">
        <button
          type="button"
          onClick={onPrev}
          disabled={pageIndex === 0}
          aria-label="Previous page"
          className="flex h-10 w-10 items-center justify-center rounded-full backdrop-blur transition hover:scale-110 active:scale-95 disabled:opacity-30 cursor-pointer"
          style={{ background: 'rgba(255,255,255,0.25)', color: 'white', border: '1px solid rgba(255,255,255,0.35)', boxShadow: '0 4px 14px rgba(0,0,0,0.15)' }}
        >
          <ChevronLeft size={20} />
        </button>

        <button
          type="button"
          onClick={onToggleMute}
          aria-label={muted ? 'Unmute music' : 'Mute music'}
          className="flex h-10 w-10 items-center justify-center rounded-full backdrop-blur transition hover:scale-110 active:scale-95 cursor-pointer"
          style={{ background: 'rgba(255,255,255,0.25)', color: 'white', border: '1px solid rgba(255,255,255,0.35)', boxShadow: '0 4px 14px rgba(0,0,0,0.15)' }}
        >
          {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={pageIndex === pageCount - 1}
          aria-label="Next page"
          className="flex h-10 w-10 items-center justify-center rounded-full backdrop-blur transition hover:scale-110 active:scale-95 disabled:opacity-30 cursor-pointer"
          style={{ background: 'rgba(255,255,255,0.25)', color: 'white', border: '1px solid rgba(255,255,255,0.35)', boxShadow: '0 4px 14px rgba(0,0,0,0.15)' }}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  )
}
