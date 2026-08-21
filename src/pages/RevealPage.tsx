import { useEffect, useState } from 'react'
import { AdSlot } from '../components/AdSlot'
import { pickRandomAnimal } from '../data/animals'
import {
  ensureTrollAudioPlaying,
  isTrollAudioMuted,
  isTrollAudioPlaying,
  setTrollAudioMuted,
  startTrollAudio,
} from '../lib/trollAudio'

export function RevealPage() {
  const [animal] = useState(() => pickRandomAnimal())
  const [muted, setMuted] = useState(() => isTrollAudioMuted())
  const [needsGesture, setNeedsGesture] = useState(() => !isTrollAudioPlaying())

  useEffect(() => {
    let cancelled = false

    ensureTrollAudioPlaying()
      .then(() => {
        if (!cancelled) setNeedsGesture(false)
      })
      .catch(() => {
        if (!cancelled) setNeedsGesture(true)
      })

    // Do not pause on unmount — Strict Mode remount would kill playback
    // started from the previous page's click gesture.
    return () => {
      cancelled = true
    }
  }, [])

  function toggleMute() {
    if (needsGesture || !isTrollAudioPlaying()) {
      startTrollAudio()
        .then(() => {
          setNeedsGesture(false)
          setTrollAudioMuted(false)
          setMuted(false)
        })
        .catch(() => undefined)
      return
    }

    const next = !isTrollAudioMuted()
    setTrollAudioMuted(next)
    setMuted(next)
  }

  return (
    <main className="page reveal-page">
      <AdSlot slot="top" />

      <figure className="reveal-page__figure">
        <img src={animal} alt="" className="reveal-page__image" />
      </figure>

      <AdSlot slot="bottom" />
    </main>
  )
}
