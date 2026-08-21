const TROLL_AUDIO_SRC = '/audio/troll.mp3'

let audio: HTMLAudioElement | null = null

function getAudio(): HTMLAudioElement {
  if (!audio) {
    audio = new Audio(TROLL_AUDIO_SRC)
    audio.loop = true
    audio.preload = 'auto'
    audio.volume = 1
  }
  return audio
}

/** Call inside a click handler so the browser allows playback. */
export function startTrollAudio(): Promise<void> {
  const el = getAudio()
  el.muted = false
  if (el.paused) {
    el.currentTime = 0
  }
  return el.play().then(() => undefined)
}

export function ensureTrollAudioPlaying(): Promise<void> {
  const el = getAudio()
  if (!el.paused) return Promise.resolve()
  return el.play().then(() => undefined)
}

export function stopTrollAudio(): void {
  if (!audio) return
  audio.pause()
  audio.currentTime = 0
}

export function setTrollAudioMuted(muted: boolean): void {
  getAudio().muted = muted
}

export function isTrollAudioMuted(): boolean {
  return getAudio().muted
}

export function isTrollAudioPlaying(): boolean {
  return Boolean(audio && !audio.paused)
}
