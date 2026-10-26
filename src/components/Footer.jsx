import { Link } from 'react-router-dom'
import { company, nav } from '../content.js'
import { openConsentSettings } from '../lib/consent.js'

// inline-block mit Polsterung: Klickfläche mindestens 24 px hoch (WCAG 2.5.8)
const link = 'inline-block py-1 hover:text-rot underline-offset-4 hover:underline focus-ring'

export default function Footer() {
  return (
    // Hell wie die Kopfzeile: das Logo in Markenrot hätte auf Tinte nur 1.9:1
    <footer className="border-t border-tinte/15 bg-creme text-tinte">
      {/* Zwei Blöcke: links Logo und Adresse, rechts die Navigation rechtsbündig.
          Copyright und Credit stehen jeweils unten im Block, auf derselben Höhe. */}
      <div className="wrap grid gap-12 py-16 text-base md:grid-cols-12 md:gap-x-8">
        <div className="flex flex-col md:col-span-5">
          <img
            src={`${import.meta.env.BASE_URL}media/logo-landwerker.png`}
            alt="Landwerker GmbH, Holzbau & Unterhalt"
            width="798"
            height="242"
            loading="lazy"
            className="h-16 w-max"
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
          <div className="mt-auto hidden pt-12 md:block">
            {/* Gleiche Höhe wie die Credit-Zeile rechts (Logo-Link 32 px), damit beide auf einer Linie stehen */}
            <p className="flex h-8 items-center text-sm text-grau">© {new Date().getFullYear()} {company.name}</p>
          </div>
        </div>

        {/* Rechter Block ab Spalte 7: «Seite» links, «Rechtliches» bündig mit dem rechten Rand und dem Credit */}
        <div className="flex flex-col md:col-span-6 md:col-start-7">
          <div className="flex flex-col gap-12 md:flex-row md:justify-between md:gap-8">
            <nav aria-label="Fussnavigation">
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

            <nav aria-label="Rechtliches">
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
                  <Link to="/barrierefreiheit" className={link}>
                    Barrierefreiheit
                  </Link>
                </li>
                <li>
                  <button type="button" onClick={openConsentSettings} className={`text-left ${link}`}>
                    Cookie-Einstellungen
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          {/* Endet rechts bündig mit der Navigation darüber */}
          <p className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-grau md:mt-auto md:justify-end md:pt-12">
            <span className="whitespace-nowrap">Diese Webseite wurde erstellt von</span>
            <a href="https://gross-ict.ch" target="_blank" rel="noopener noreferrer" className="inline-block py-1 focus-ring">
              <img
                src={`${import.meta.env.BASE_URL}media/logo-gross-ict.webp`}
                alt="Gross ICT"
                width="600"
                height="91"
                loading="lazy"
                className="h-6 w-auto"
              />
              <span className="sr-only"> (Website, neues Fenster)</span>
            </a>
          </p>
        </div>

        <p className="text-sm text-grau md:hidden">© {new Date().getFullYear()} {company.name}</p>
      </div>
    </footer>
  )
}
