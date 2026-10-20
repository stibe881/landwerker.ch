import { useEffect, useId, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { applyConsent, onOpenConsentSettings, readConsent, saveConsent } from '../lib/consent.js'

export default function CookieConsent() {
  const [open, setOpen] = useState(false)
  const [details, setDetails] = useState(false)
  const [statistics, setStatistics] = useState(false)
  const titleId = useId()
  const panelRef = useRef(null)

  useEffect(() => {
    const existing = readConsent()
    if (existing) {
      applyConsent(existing)
      setStatistics(existing.statistics)
    } else {
      setOpen(true)
    }
    return onOpenConsentSettings(() => {
      setStatistics(readConsent()?.statistics ?? false)
      setDetails(true)
      setOpen(true)
    })
  }, [])

  useEffect(() => {
    if (open && details) panelRef.current?.focus()
  }, [open, details])

  if (!open) return null

  const decide = (value) => {
    saveConsent({ statistics: value })
    setOpen(false)
    setDetails(false)
  }

  const btn = 'min-h-11 px-4 font-display text-lg font-semibold uppercase tracking-[0.02em] focus-ring-dark'

  return (
    <section
      ref={panelRef}
      tabIndex={-1}
      role="region"
      aria-labelledby={titleId}
      className="fixed bottom-3 left-3 right-3 z-50 max-h-[85svh] max-w-md overflow-y-auto bg-sand p-6 text-kohle outline-none sm:bottom-6 sm:left-6 sm:right-auto"
    >
      <h2 id={titleId} className="head text-3xl">
        Cookies? Nur mit Ihrem Ja.
      </h2>
      <p className="mt-3 text-base leading-snug">
        Ohne Zustimmung speichern wir nur Ihren Entscheid. Statistik läuft erst, wenn Sie zustimmen. Ändern können Sie das
        jederzeit unten auf der Seite.{' '}
        <Link to="/datenschutz" className="underline underline-offset-4 focus-ring-dark">
          Datenschutzerklärung
        </Link>
      </p>

      {details && (
        <fieldset className="mt-5 space-y-4 border-t border-kohle/25 pt-5 text-base">
          <legend className="sr-only">Kategorien</legend>
          <div className="flex items-start gap-3">
            <input id="consent-necessary" type="checkbox" checked disabled className="mt-1 h-5 w-5 accent-kohle" aria-describedby="consent-necessary-desc" />
            <div>
              <label htmlFor="consent-necessary" className="font-semibold">
                Notwendig (immer aktiv)
              </label>
              <p id="consent-necessary-desc" className="text-lehm">
                Speichert Ihren Entscheid zu dieser Abfrage. Bleibt auf Ihrem Gerät.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <input
              id="consent-statistics"
              type="checkbox"
              checked={statistics}
              onChange={(e) => setStatistics(e.target.checked)}
              className="mt-1 h-5 w-5 accent-kohle focus-ring-dark"
              aria-describedby="consent-statistics-desc"
            />
            <div>
              <label htmlFor="consent-statistics" className="font-semibold">
                Statistik
              </label>
              <p id="consent-statistics-desc" className="text-lehm">
                Anonyme Zählung der Seitenaufrufe.
              </p>
            </div>
          </div>
        </fieldset>
      )}

      {/* Ablehnen und Zustimmen sind gleich gross und gleich gestaltet */}
      <div className="mt-6 grid grid-cols-2 gap-2">
        <button type="button" onClick={() => decide(false)} className={`${btn} bg-kohle text-kalk hover:bg-lehm`}>
          Ablehnen
        </button>
        <button type="button" onClick={() => decide(true)} className={`${btn} bg-kohle text-kalk hover:bg-lehm`}>
          Zustimmen
        </button>
        {details ? (
          <button type="button" onClick={() => decide(statistics)} className={`${btn} col-span-2 border-2 border-kohle hover:bg-kohle hover:text-kalk`}>
            Auswahl speichern
          </button>
        ) : (
          <button type="button" onClick={() => setDetails(true)} className="col-span-2 min-h-11 text-left text-base underline underline-offset-4 focus-ring-dark">
            Einzeln auswählen
          </button>
        )}
      </div>
    </section>
  )
}
