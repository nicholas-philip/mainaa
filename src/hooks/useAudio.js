import { useEffect, useRef, useState } from 'react'

export default function useAudio() {
  const audioRef = useRef(null)
  const synthIntervalRef = useRef(null)
  const audioCtxRef = useRef(null)

  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [audioReady, setAudioReady] = useState(false)

  useEffect(() => {
    const audio = new Audio()
    audio.loop = true
    audio.volume = 0.7
    audio.preload = 'auto'

    // mp3 has widest support (Safari, iOS, Android, Chrome)
    audio.src = audio.canPlayType('audio/webm; codecs="opus"')
      ? '/music/song.webm'
      : '/music/song.mp3'

    const onReady = () => setAudioReady(true)
    const onError = () => {
      // Try mp3 fallback if webm fails
      if (audio.src.includes('.webm')) {
        audio.src = '/music/song.mp3'
        audio.load()
      }
    }

    audio.addEventListener('canplaythrough', onReady)
    audio.addEventListener('canplay', onReady)
    audio.addEventListener('error', onError)

    // Force browser to start buffering immediately
    audio.load()

    audioRef.current = audio

    return () => {
      audio.pause()
      audio.removeEventListener('canplaythrough', onReady)
      audio.removeEventListener('canplay', onReady)
      audio.removeEventListener('error', onError)
      audio.src = ''
      audioRef.current = null
      stopSynth()
    }
  }, [])

  const startSynth = () => {
    if (synthIntervalRef.current) return
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (!audioCtxRef.current) audioCtxRef.current = new AudioCtx()
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
    } catch { /* ignore */ }
  }

  const stopSynth = () => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current)
      synthIntervalRef.current = null
    }
  }

  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = muted
  }, [muted])

  const play = async () => {
    setPlaying(true)
    const audio = audioRef.current
    if (audio) {
      try {
        // Resume suspended AudioContext (required on iOS)
        if (audioCtxRef.current?.state === 'suspended') {
          await audioCtxRef.current.resume()
        }
        await audio.play()
        stopSynth()
        return
      } catch (err) {
        console.warn('Audio play failed, using synth fallback', err)
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

  return { playing, muted, audioReady, ready: true, play, pause, toggle, toggleMute }
}
