import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { nav } from '../content.js'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 60)
      // Erst ab 400 px verstecken, kleine Bewegungen ignorieren
      if (Math.abs(y - last) > 8) {
        setHidden(y > last && y > 400)
        last = y
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])


  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 pt-[env(safe-area-inset-top,0px)] transition-[background-color,transform] duration-300 motion-reduce:transition-none ${
        scrolled ? 'border-b border-tinte/15' : ''
      } bg-papier ${hidden && !open ? '-translate-y-full focus-within:translate-y-0' : ''}`}
    >
      <div className="wrap flex h-18 items-center justify-between gap-8">
        {/* Original-Logo in Markenrot, freigestellt wie vom Kunden geliefert (Logos sind von WCAG 1.4.3 ausgenommen) */}
        <Link to="/" className="block focus-ring">
          <img
            src={`${import.meta.env.BASE_URL}media/logo-landwerker.png`}
            alt="Landwerker GmbH, Holzbau & Unterhalt – zur Startseite"
            width="798"
            height="242"
            className="h-11 w-auto sm:h-14"
          />
        </Link>

        <nav aria-label="Hauptnavigation" className="hidden md:block">
          <ul className="flex items-center gap-8 font-display text-lg font-medium uppercase tracking-[0.03em]">
            {nav.map((item) => (
              <li key={item.id}>
                <Link to={{ pathname: '/', hash: item.id }} className="inline-flex min-h-11 items-center hover:text-rot focus-ring">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to={{ pathname: '/', hash: 'kontakt' }}
                className="inline-flex min-h-11 items-center bg-rot px-5 text-weiss hover:bg-tinte focus-ring"
              >
                Projekt anfragen
              </Link>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          className="min-h-11 min-w-11 font-display text-lg font-medium uppercase md:hidden focus-ring"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Schliessen' : 'Menü'}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Hauptnavigation mobil" className="md:hidden">
          <ul className="wrap flex flex-col pb-8 pt-2">
            {[...nav, { id: 'kontakt', label: 'Projekt anfragen' }].map((item, i) => (
              <li key={item.label} className="border-t border-tinte/15">
                <Link
                  to={{ pathname: '/', hash: item.id }}
                  className={`head block py-4 text-4xl focus-ring ${i === nav.length ? 'text-rot' : ''}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
