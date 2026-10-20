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

  const btn =
    'min-h-11 px-5 text-sm font-medium transition-colors focus-ring'

  return (
    <section
      ref={panelRef}
      tabIndex={-1}
      role="region"
      aria-labelledby={titleId}
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-h-[85svh] max-w-2xl overflow-y-auto border border-line bg-coal p-5 text-paper shadow-2xl shadow-black/60 outline-none sm:inset-x-6 sm:bottom-6 sm:p-7"
    >
      <h2 id={titleId} className="font-serif text-xl">
        Ihre Daten, Ihr Entscheid.
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-stone">
        Diese Website braucht nur technisch notwendige Speicherung. Statistik setzen wir erst ein, wenn Sie zustimmen. Sie
        können Ihre Wahl jederzeit im Fuss der Seite ändern. Mehr dazu in der{' '}
        <Link to="/datenschutz" className="text-paper underline underline-offset-4 hover:text-sand focus-ring">
          Datenschutzerklärung
        </Link>
        .
      </p>

      {details && (
        <fieldset className="mt-5 space-y-4 border-t border-line pt-5">
          <legend className="sr-only">Kategorien</legend>
          <div className="flex items-start gap-3">
            <input
              id="consent-necessary"
              type="checkbox"
              checked
              disabled
              className="mt-1 h-5 w-5 accent-sand"
              aria-describedby="consent-necessary-desc"
            />
            <div>
              <label htmlFor="consent-necessary" className="text-sm font-medium">
                Notwendig <span className="text-ash">(immer aktiv)</span>
              </label>
              <p id="consent-necessary-desc" className="text-sm text-stone">
                Speichert Ihren Entscheid zu dieser Abfrage. Keine Weitergabe an Dritte.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <input
              id="consent-statistics"
              type="checkbox"
              checked={statistics}
              onChange={(e) => setStatistics(e.target.checked)}
              className="mt-1 h-5 w-5 accent-sand focus-ring"
              aria-describedby="consent-statistics-desc"
            />
            <div>
              <label htmlFor="consent-statistics" className="text-sm font-medium">
                Statistik
              </label>
              <p id="consent-statistics-desc" className="text-sm text-stone">
                Anonyme Auswertung der Seitenaufrufe, damit wir sehen, was gelesen wird.
              </p>
            </div>
          </div>
        </fieldset>
      )}

      <div className="mt-6 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
        {/* Ablehnen und Zustimmen sind gleichwertig gestaltet (kein Nudging) */}
        <button type="button" onClick={() => decide(false)} className={`${btn} border border-paper hover:bg-paper hover:text-ink`}>
          Nur notwendige
        </button>
        <button type="button" onClick={() => decide(true)} className={`${btn} border border-paper hover:bg-paper hover:text-ink`}>
          Alle akzeptieren
        </button>
        {details ? (
          <button type="button" onClick={() => decide(statistics)} className={`${btn} col-span-2 bg-sand text-ink hover:bg-paper sm:ml-auto`}>
            Auswahl speichern
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setDetails(true)}
            className={`${btn} col-span-2 text-stone underline underline-offset-4 hover:text-paper sm:ml-auto`}
          >
            Einstellungen
          </button>
        )}
      </div>
    </section>
  )
}
