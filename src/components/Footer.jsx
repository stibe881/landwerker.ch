import { Link } from 'react-router-dom'
import { company, nav } from '../content.js'
import { openConsentSettings } from '../lib/consent.js'
import Logo from './Logo.jsx'

const link = 'text-stone hover:text-paper underline-offset-4 hover:underline focus-ring'

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink">
      <div className="container-x grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <Logo />
          <address className="mt-6 not-italic leading-relaxed text-stone">
            {company.name}
            <br />
            {company.street}
            <br />
            {company.zip} {company.city}
          </address>
          <p className="mt-4 space-x-4 text-stone">
            <a href={`tel:${company.phoneOfficeHref}`} className={link}>
              {company.phoneOffice}
            </a>
            <a href={`mailto:${company.email}`} className={link}>
              {company.email}
            </a>
          </p>
        </div>

        <nav aria-label="Fussnavigation" className="md:col-span-3">
          <h2 className="eyebrow">Seiten</h2>
          <ul className="mt-5 space-y-3">
            {nav.map((item) => (
              <li key={item.id}>
                <Link to={{ pathname: '/', hash: item.id }} className={link}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Rechtliches" className="md:col-span-4">
          <h2 className="eyebrow">Rechtliches</h2>
          <ul className="mt-5 space-y-3">
            <li>
              <Link to="/impressum" className={link}>
                Impressum
              </Link>
            </li>
            <li>
              <Link to="/datenschutz" className={link}>
                Datenschutzerklärung
              </Link>
            </li>
            <li>
              <button type="button" onClick={openConsentSettings} className={link}>
                Cookie-Einstellungen
              </button>
            </li>
            <li className="text-ash">AGB auf Anfrage per E-Mail</li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-line">
        <div className="container-x flex flex-col gap-2 py-6 text-sm text-ash sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {company.name}</p>
          <p>UID {company.uid}</p>
        </div>
      </div>
    </footer>
  )
}
