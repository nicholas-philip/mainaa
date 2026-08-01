import { useEffect, useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import LoadingScreen from './components/LoadingScreen.jsx'
import GiftLanding from './components/GiftLanding.jsx'
import ScrapbookNav from './components/ScrapbookNav.jsx'
import FallingEmojis from './components/FallingEmojis.jsx'
import SecretNoteModal from './components/SecretNoteModal.jsx'
import CatchMyHeartGame from './components/CatchMyHeartGame.jsx'
import useAudio from './hooks/useAudio.js'
import useClickBurst from './hooks/useClickBurst.jsx'

import PageIntro from './pages/PageIntro.jsx'
import PageMusic from './pages/PageMusic.jsx'
import PageGallery from './pages/PageGallery.jsx'
import PageLetter from './pages/PageLetter.jsx'
import PageReasons from './pages/PageReasons.jsx'
import PageTimeline from './pages/PageTimeline.jsx'
import PageDreams from './pages/PageDreams.jsx'
import PageCollage from './pages/PageCollage.jsx'
import PageQuotes from './pages/PageQuotes.jsx'
import PageFinal from './pages/PageFinal.jsx'

const PAGES = [
  PageIntro,
  PageMusic,
  PageGallery,
  PageLetter,
  PageReasons,
  PageTimeline,
  PageDreams,
  PageCollage,
  PageQuotes,
  PageFinal,
]

const flipVariants = {
  enter: (dir) => ({
    rotateY: dir > 0 ? 90 : -90,
    opacity: 0,
  }),
  center: {
    rotateY: 0,
    opacity: 1,
  },
  exit: (dir) => ({
    rotateY: dir > 0 ? -90 : 90,
    opacity: 0,
  }),
}

export default function App() {
  const [loading, setLoading] = useState(true)
  const [opened, setOpened] = useState(false)
  const [pageIndex, setPageIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [showNote, setShowNote] = useState(false)
  const [showGame, setShowGame] = useState(false)
  const audio = useAudio()
  const { handleClick, BurstLayer } = useClickBurst()

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1400)
    return () => clearTimeout(t)
  }, [])

  const goNext = useCallback(() => {
    setDirection(1)
    setPageIndex((i) => Math.min(i + 1, PAGES.length - 1))
  }, [])

  const goPrev = useCallback(() => {
    setDirection(-1)
    setPageIndex((i) => Math.max(i - 1, 0))
  }, [])

  const handleOpen = () => {
    setOpened(true)
    audio.play()
  }

  const handleReplay = () => {
    setDirection(-1)
    setPageIndex(0)
  }

  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const minSwipeDistance = 50

  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }
  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    if (distance > minSwipeDistance) goNext()
    else if (distance < -minSwipeDistance) goPrev()
  }

  useEffect(() => {
    if (!opened) return
    const onKey = (e) => {
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [opened, goNext, goPrev])

  const CurrentPage = PAGES[pageIndex]
  const isFinal = pageIndex === PAGES.length - 1

  return (
    /* ── Outer page: soft light pink, falling emojis layer ── */
    <div
      className="relative flex min-h-screen w-full flex-col items-center justify-center gap-3 p-0 sm:p-6 select-none"
      style={{ background: '#FFF0F3' }}
      onClick={handleClick}
    >
      {/* Falling emojis behind everything */}
      <FallingEmojis count={24} />

      {/* Click burst particles — highest z-index */}
      <BurstLayer />

      {/* Loading screen */}
      <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>

      {!loading && (
        <>
          {/* ── Central pink card ── */}
          <div
            className="relative z-10 h-screen w-full max-w-md overflow-hidden sm:h-[84vh] sm:rounded-[32px]"
            style={{
              background: 'linear-gradient(160deg, #FF4D6D 0%, #e91e8c 55%, #c2185b 100%)',
              boxShadow: '0 24px 64px rgba(233,30,140,0.5), 0 8px 32px rgba(0,0,0,0.25)',
              color: 'white',
            }}
          >
            <AnimatePresence mode="wait">
              {!opened ? (
                <GiftLanding key="landing" onOpen={handleOpen} />
              ) : (
                <motion.div
                  key="book"
                  className="relative flex h-full w-full flex-col"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  onTouchStart={onTouchStart}
                  onTouchMove={onTouchMove}
                  onTouchEnd={onTouchEnd}
                >
                  <div
                    className="relative flex-1 overflow-hidden p-4"
                    style={{ perspective: 1200 }}
                  >
                    <AnimatePresence mode="wait" custom={direction}>
                      <motion.div
                        key={pageIndex}
                        custom={direction}
                        variants={flipVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.45, ease: 'easeInOut' }}
                        style={{ transformStyle: 'preserve-3d' }}
                        className="h-full w-full"
                      >
                        {isFinal ? (
                          <PageFinal onReplay={handleReplay} />
                        ) : (
                          <CurrentPage audio={audio} />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <ScrapbookNav
                    pageIndex={pageIndex}
                    pageCount={PAGES.length}
                    onPrev={goPrev}
                    onNext={goNext}
                    muted={audio.muted}
                    onToggleMute={audio.toggleMute}
                    onShowNote={() => setShowNote(true)}
                    onShowGame={() => setShowGame(true)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Buttons below card (Desktop / Tablet) ── */}
          <AnimatePresence>
            {opened && (
              <motion.div
                className="relative z-10 hidden sm:flex flex-wrap items-center justify-center gap-3 mt-1"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                {/* Secret Note Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowNote(true)
                  }}
                  aria-label="Tap for a Secret Note"
                  className="heartbeat-btn flex items-center gap-2 rounded-full px-5 py-2.5 font-display text-sm font-bold active:scale-95 cursor-pointer"
                >
                  <motion.span
                    animate={{ scale: [1, 1.25, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  >
                    💌
                  </motion.span>
                  Tap for a Secret Note
                </button>

                {/* Catch My Heart Game Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowGame(true)
                  }}
                  aria-label="Play Mini Game: Catch My Heart"
                  className="heartbeat-btn flex items-center gap-2 rounded-full px-5 py-2.5 font-display text-sm font-bold active:scale-95 cursor-pointer"
                >
                  <motion.span
                    animate={{ rotate: [-10, 10, -10] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    🎮
                  </motion.span>
                  Play Mini Game: Catch My Heart
                </button>
              </motion.div>
            )}
          </AnimatePresence>



          {/* Secret Note Modal */}
          <SecretNoteModal open={showNote} onClose={() => setShowNote(false)} />

          {/* Catch My Heart Arcade Mini Game Modal */}
          <CatchMyHeartGame open={showGame} onClose={() => setShowGame(false)} />
        </>
      )}
    </div>
  )
}
