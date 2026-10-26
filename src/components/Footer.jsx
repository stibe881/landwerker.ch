import { Link } from 'react-router-dom'
import { company, nav } from '../content.js'
import { openConsentSettings } from '../lib/consent.js'

const link = 'hover:text-rot underline-offset-4 hover:underline focus-ring'

export default function Footer() {
  return (
    // Hell wie die Kopfzeile: das Logo in Markenrot hätte auf Tinte nur 1.9:1
    <footer className="border-t border-tinte/15 bg-creme text-tinte">
      <div className="wrap grid gap-12 py-16 text-base md:grid-cols-12">
        <div className="md:col-span-5">
          <img
            src={`${import.meta.env.BASE_URL}media/logo-landwerker.png`}
            alt="Landwerker GmbH, Holzbau & Unterhalt"
            width="798"
            height="242"
            loading="lazy"
            className="h-16 w-auto"
          />
          <address className="mt-6 not-italic text-grau">
            {company.name},{' '}
            <a href={company.mapsUrl} target="_blank" rel="noopener noreferrer" className={link}>
              {company.street}, {company.zip} {company.city}
              <span className="sr-only"> (in Google Maps öffnen, neues Fenster)</span>
            </a>
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
          <h2 className="text-grau">Seite</h2>
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
          <h2 className="text-grau">Rechtliches</h2>
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
            <li className="text-grau">AGB auf Anfrage per E-Mail</li>
          </ul>
        </nav>

        <p className="text-sm text-grau md:col-span-12">
          © {new Date().getFullYear()} {company.name}. UID {company.uid}. Die Fotos in Leistungen, Über uns und Werkliste zeigen eigene Arbeiten.
        </p>
      </div>
    </footer>
  )
}
