import { useEffect, useRef, useState } from 'react'

/**
 * Controls background music track.
 * Plays public/music/song.webm or song.mp3 (King Promise & Mr Eazi - That Way).
 */
export default function useAudio(src = '/music/song.webm') {
  const audioRef = useRef(null)
  const synthIntervalRef = useRef(null)
  const audioCtxRef = useRef(null)
  
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [hasAudioFile, setHasAudioFile] = useState(true)

  useEffect(() => {
    const audio = new Audio(src)
    audio.loop = true
    audio.volume = 0.7

    const handleCanPlay = () => setHasAudioFile(true)
    const handleError = () => setHasAudioFile(false)

    audio.addEventListener('canplay', handleCanPlay)
    audio.addEventListener('canplaythrough', handleCanPlay)
    audio.addEventListener('loadeddata', handleCanPlay)
    audio.addEventListener('error', handleError)
    audioRef.current = audio

    return () => {
      audio.pause()
      audio.removeEventListener('canplay', handleCanPlay)
      audio.removeEventListener('canplaythrough', handleCanPlay)
      audio.removeEventListener('loadeddata', handleCanPlay)
      audio.removeEventListener('error', handleError)
      audioRef.current = null
      stopSynth()
    }
  }, [src])

  // Web Audio Synth Fallback (used only if audio file fails to load)
  const startSynth = () => {
    if (synthIntervalRef.current) return
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx()
      }
      const ctx = audioCtxRef.current
      if (ctx.state === 'suspended') {
        ctx.resume()
      }

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
    if (audioRef.current) {
      try {
        await audioRef.current.play()
        stopSynth()
        return
      } catch (err) {
        console.warn('Audio play failed, falling back to synth', err)
      }
    }
    startSynth()
  }

  const pause = () => {
    setPlaying(false)
    if (audioRef.current) {
      audioRef.current.pause()
    }
    stopSynth()
  }

  const toggleMute = () => {
    setMuted((m) => !m)
  }

  const toggle = () => (playing ? pause() : play())

  return { playing, muted, ready: true, play, pause, toggle, toggleMute }
}

