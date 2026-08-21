import { useEffect, type MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { AdSlot } from '../components/AdSlot'
import { startTrollAudio, stopTrollAudio } from '../lib/trollAudio'

export function WifiBaitPage() {
  const navigate = useNavigate()

  useEffect(() => {
    stopTrollAudio()
  }, [])

  async function handleAccess(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    try {
      await startTrollAudio()
    } catch {
      /* Reveal page keeps a fallback control if autoplay still fails */
    }
    navigate('/t/reveal')
  }

  return (
    <main className="page bait-page">
      <AdSlot slot="top" />

      <section className="bait-page__card">
        <div className="bait-page__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="48" height="48" fill="none">
            <path
              d="M12 18.5a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5Z"
              fill="currentColor"
            />
            <path
              d="M8.5 15.2a5 5 0 0 1 7 0"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <path
              d="M5.5 12.2a9 9 0 0 1 13 0"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <path
              d="M2.8 9.2a13 13 0 0 1 18.4 0"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <h1>Wi‑Fi grátis</h1>
        <p>
          Conecte-se à rede gratuita. Toque no botão abaixo para continuar e
          liberar o acesso.
        </p>

        <button
          type="button"
          className="btn btn--primary bait-page__cta"
          onClick={handleAccess}
        >
          Clique aqui
        </button>

        <p className="bait-page__fine">
          Ao continuar, você concorda com os termos de uso da rede.
        </p>
      </section>

      <AdSlot slot="bottom" />
    </main>
  )
}
