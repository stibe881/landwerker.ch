import { Link } from 'react-router-dom'
import { company, nav } from '../content.js'
import { openConsentSettings } from '../lib/consent.js'
import Logo from './Logo.jsx'

const link = 'hover:text-sand underline-offset-4 hover:underline focus-ring'

export default function Footer() {
  return (
    <footer className="bg-kohle">
      <div className="wrap grid gap-12 border-t border-kalk/15 py-16 text-base md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo className="text-4xl" />
          <address className="mt-6 not-italic text-staub">
            {company.name}, {company.street}, {company.zip} {company.city}
            <br />
            <a href={`tel:${company.phoneOfficeHref}`} className={link}>
              {company.phoneOffice}
            </a>{' '}
            oder{' '}
            <a href={`mailto:${company.email}`} className={link}>
              {company.email}
            </a>
          </address>
        </div>

        <nav aria-label="Fussnavigation" className="md:col-span-3 md:col-start-7">
          <h2 className="text-staub">Seite</h2>
          <ul className="mt-4 space-y-2">
            {nav.map((item) => (
              <li key={item.id}>
                <Link to={{ pathname: '/', hash: item.id }} className={link}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Rechtliches" className="md:col-span-3">
          <h2 className="text-staub">Rechtliches</h2>
          <ul className="mt-4 space-y-2">
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
              <button type="button" onClick={openConsentSettings} className={`text-left ${link}`}>
                Cookie-Einstellungen
              </button>
            </li>
            <li className="text-staub">AGB auf Anfrage per E-Mail</li>
          </ul>
        </nav>

        <p className="text-sm text-staub md:col-span-12">
          © {new Date().getFullYear()} {company.name}. UID {company.uid}. Alle Fotos zeigen eigene Arbeiten.
        </p>
      </div>
    </footer>
  )
}
