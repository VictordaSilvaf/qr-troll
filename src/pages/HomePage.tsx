import { useMemo } from 'react'
import { QRCodeCanvas } from 'qrcode.react'

export function HomePage() {
  const targetUrl = useMemo(() => `${window.location.origin}/t`, [])

  function downloadQr() {
    const canvas = document.querySelector<HTMLCanvasElement>('#qr-troll-canvas')
    if (!canvas) return

    const link = document.createElement('a')
    link.download = 'qr-troll.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <main className="page home-page">
      <header className="home-page__header">
        <p className="eyebrow">Free WiFi</p>
        <h1>Gere o QR do link</h1>
        <p className="lede">
          Escaneie ou compartilhe este código. Quem abrir cai na página de
          Wi‑Fi grátis.
        </p>
      </header>

      <div className="home-page__qr">
        <QRCodeCanvas
          id="qr-troll-canvas"
          value={targetUrl}
          size={240}
          level="M"
          includeMargin
        />
      </div>

      <p className="home-page__url">
        <code>{targetUrl}</code>
      </p>

      <button type="button" className="btn btn--primary" onClick={downloadQr}>
        Baixar PNG
      </button>
    </main>
  )
}
