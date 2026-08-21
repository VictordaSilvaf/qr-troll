import { useEffect, useRef } from 'react'

type AdSlotProps = {
  slot: 'top' | 'bottom'
}

const CLIENT = import.meta.env.VITE_ADSENSE_CLIENT
const SLOTS = {
  top: import.meta.env.VITE_ADSENSE_SLOT_TOP,
  bottom: import.meta.env.VITE_ADSENSE_SLOT_BOTTOM,
} as const

let scriptLoading: Promise<void> | null = null

function loadAdSenseScript(client: string): Promise<void> {
  if (scriptLoading) return scriptLoading

  scriptLoading = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]',
    )
    if (existing) {
      resolve()
      return
    }

    const script = document.createElement('script')
    script.async = true
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`
    script.crossOrigin = 'anonymous'
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Failed to load AdSense'))
    document.head.appendChild(script)
  })

  return scriptLoading
}

function isConfigured(): boolean {
  return Boolean(
    CLIENT &&
      !CLIENT.includes('xxxx') &&
      SLOTS.top &&
      !SLOTS.top.includes('xxxx') &&
      SLOTS.bottom &&
      !SLOTS.bottom.includes('xxxx'),
  )
}

declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}

export function AdSlot({ slot }: AdSlotProps) {
  const pushed = useRef(false)
  const adSlot = SLOTS[slot]
  const configured = isConfigured()

  useEffect(() => {
    if (!configured || !CLIENT || !adSlot || pushed.current) return

    let cancelled = false

    loadAdSenseScript(CLIENT)
      .then(() => {
        if (cancelled || pushed.current) return
        window.adsbygoogle = window.adsbygoogle || []
        window.adsbygoogle.push({})
        pushed.current = true
      })
      .catch(() => {
        /* keep placeholder behavior via unconfigured UI if script fails */
      })

    return () => {
      cancelled = true
    }
  }, [configured, adSlot])

  if (!configured) {
    return (
      <div className="ad-slot ad-slot--placeholder" aria-hidden="true">
        Anúncio
      </div>
    )
  }

  return (
    <div className="ad-slot">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={CLIENT}
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}
