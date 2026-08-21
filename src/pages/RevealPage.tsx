import { useEffect, useState } from 'react'
import { AdSlot } from '../components/AdSlot'
import { pickRandomAnimal } from '../data/animals'
import { ensureTrollAudioPlaying } from '../lib/trollAudio'

export function RevealPage() {
  const [animal] = useState(() => pickRandomAnimal())

  useEffect(() => {
    void ensureTrollAudioPlaying().catch(() => undefined)

    // Do not pause on unmount — Strict Mode remount would kill playback
    // started from the previous page's click gesture.
  }, [])

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
