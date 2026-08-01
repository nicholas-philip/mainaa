import { useEffect, useRef, useState } from 'react'

/**
 * Controls background music track.
 * Plays public/music/song.mp3 or song.webm (King Promise & Mr Eazi - You Are).
 * Mobile-safe: audio only starts on user gesture (tap to open gift).
 */
export default function useAudio() {
  const audioRef = useRef(null)
  const synthIntervalRef = useRef(null)
  const audioCtxRef = useRef(null)

  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)

  useEffect(() => {
    // Try mp3 first (best iOS/Android support), fall back to webm
    const audio = new Audio()
    audio.loop = true
    audio.volume = 0.7
    audio.preload = 'auto'

    // Use mp3 — widest mobile browser support including Safari/iOS
    const mp3 = '/music/song.mp3'
    const webm = '/music/song.webm'

    if (audio.canPlayType('audio/mpeg')) {
      audio.src = mp3
    } else if (audio.canPlayType('audio/webm')) {
      audio.src = webm
    } else {
      audio.src = mp3 // default fallback
    }

    audioRef.current = audio

    return () => {
      audio.pause()
      audio.src = ''
      audioRef.current = null
      stopSynth()
    }
  }, [])

  // Web Audio Synth Fallback (used only if audio file fails completely)
  const startSynth = () => {
    if (synthIntervalRef.current) return
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx()
      }
      const ctx = audioCtxRef.current
      if (ctx.state === 'suspended') ctx.resume()

      const notes = [
        261.63, 329.63, 392.00, 523.25,
        220.00, 261.63, 329.63, 440.00,
        174.61, 220.00, 261.63, 349.23,
        196.00, 246.94, 293.66, 392.00,
      ]

      let noteIdx = 0
      synthIntervalRef.current = setInterval(() => {
        if (muted) return
        const freq = notes[noteIdx % notes.length]
        noteIdx++

        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, ctx.currentTime)
        gain.gain.setValueAtTime(0.08, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.4)

        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start()
        osc.stop(ctx.currentTime + 1.4)
      }, 400)
    } catch {
      // AudioContext fallback ignored
    }
  }

  const stopSynth = () => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current)
      synthIntervalRef.current = null
    }
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = muted
    }
  }, [muted])

  const play = async () => {
    setPlaying(true)
    const audio = audioRef.current
    if (audio) {
      try {
        // Resume AudioContext if suspended (required on iOS after page load)
        if (audioCtxRef.current?.state === 'suspended') {
          await audioCtxRef.current.resume()
        }
        audio.currentTime = 0
        await audio.play()
        stopSynth()
        return
      } catch (err) {
        console.warn('Audio play failed, trying synth fallback', err)
      }
    }
    startSynth()
  }

  const pause = () => {
    setPlaying(false)
    if (audioRef.current) audioRef.current.pause()
    stopSynth()
  }

  const toggleMute = () => setMuted((m) => !m)
  const toggle = () => (playing ? pause() : play())

  return { playing, muted, ready: true, play, pause, toggle, toggleMute }
}
