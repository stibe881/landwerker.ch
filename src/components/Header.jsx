import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { nav } from '../content.js'
import Logo from './Logo.jsx'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [location])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const solid = scrolled || menuOpen || location.pathname !== '/'
  const link = 'text-sm text-paper/90 hover:text-sand transition-colors focus-ring'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 pt-[env(safe-area-inset-top,0px)] transition-colors duration-300 ${
        solid ? 'border-b border-line bg-ink/95 backdrop-blur' : 'bg-gradient-to-b from-black/50 to-transparent'
      }`}
    >
      <div className="container-x flex h-18 items-center justify-between">
        <Link to="/" className="focus-ring" aria-label="Landwerker GmbH, zur Startseite">
          <Logo />
        </Link>

        <nav aria-label="Hauptnavigation" className="hidden md:block">
          <ul className="flex items-center gap-9">
            {nav.map((item) => (
              <li key={item.id}>
                <NavLink to={{ pathname: '/', hash: item.id }} className={link}>
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li>
              <Link
                to={{ pathname: '/', hash: 'kontakt' }}
                className="inline-flex min-h-11 items-center border border-paper/70 px-5 text-sm hover:border-sand hover:bg-sand hover:text-ink transition-colors focus-ring"
              >
                Projekt anfragen
              </Link>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center text-sm md:hidden focus-ring"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? 'Schliessen' : 'Menü'}
        </button>
      </div>

      {menuOpen && (
        <nav id="mobile-nav" aria-label="Hauptnavigation mobil" className="border-t border-line md:hidden">
          <ul className="container-x flex flex-col py-4">
            {nav.map((item) => (
              <li key={item.id}>
                <Link
                  to={{ pathname: '/', hash: item.id }}
                  className="block py-3 font-serif text-2xl hover:text-sand focus-ring"
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
