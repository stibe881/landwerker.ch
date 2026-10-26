import { Link } from 'react-router-dom'
import { company } from '../content.js'
import { LegalLayout, Section } from './LegalLayout.jsx'

// Erklärung zur Barrierefreiheit. Bei jeder grösseren Änderung der Website neu prüfen und das Datum anpassen.
export default function Barrierefreiheit() {
  return (
    <LegalLayout title="Barriere­freiheit" updated="Oktober 2026">
      <Section title="Unser Ziel">
        <p>
          Diese Website soll für alle nutzbar sein, auch mit Screenreader, nur mit der Tastatur, mit Vergrösserung oder mit
          eingeschränktem Sehvermögen. Wir richten uns nach den Web Content Accessibility Guidelines (WCAG) 2.2, Stufe AA.
        </p>
      </Section>

      <Section title="Stand der Vereinbarkeit">
        <p>
          Die Website ist mit WCAG 2.2 Stufe AA <strong>weitgehend vereinbar</strong>. Die bekannten Einschränkungen stehen
          unten.
        </p>
      </Section>

      <Section title="Was wir umgesetzt haben">
        <ul>
          <li>Klare Seitenstruktur mit Überschriften und Bereichen für Kopfzeile, Navigation, Inhalt und Fusszeile.</li>
          <li>Ein Link «Zum Inhalt springen» als erstes Element jeder Seite.</li>
          <li>Alle Funktionen sind mit der Tastatur bedienbar, der Fokus ist immer deutlich sichtbar.</li>
          <li>Texte haben einen Kontrast von mindestens 4.5:1 zum Hintergrund.</li>
          <li>Alle Fotos und die Karte haben eine Textbeschreibung.</li>
          <li>Klickflächen sind mindestens 24 × 24 Pixel gross.</li>
          <li>Die Seite funktioniert bis 320 Pixel Breite und bei 400 % Vergrösserung ohne seitliches Scrollen.</li>
          <li>
            Bewegungen beim Scrollen werden abgeschaltet, wenn im Betriebssystem «Bewegung reduzieren» eingestellt ist.
          </li>
          <li>
            Im Kontaktformular hat jedes Feld eine sichtbare Beschriftung. Fehler werden im Text beschrieben und dem Feld
            zugeordnet, der Fokus springt zum ersten Fehler.
          </li>
        </ul>
      </Section>

      <Section title="Bekannte Einschränkungen">
        <ul>
          <li>
            Die Standortkarte ist ein Bild. Man kann darin nicht zoomen oder verschieben. Die Adresse steht als Text
            daneben, und ein Klick auf die Karte öffnet Google Maps.
          </li>
          <li>
            Google Maps und OpenStreetMap sind Angebote Dritter. Für deren Barrierefreiheit sind wir nicht verantwortlich.
          </li>
          <li>
            Die Zeilen der Werkliste lassen sich mit der Tabulatortaste ansteuern, um das zugehörige Foto anzuzeigen. Die
            Fotos sind auf dem Handy direkt in der Liste zu sehen und haben dort eine Textbeschreibung.
          </li>
        </ul>
      </Section>

      <Section title="Wie wir geprüft haben">
        <p>
          Geprüft im Oktober 2026 auf Desktop, Smartphone und bei 320 Pixel Breite: automatisch mit axe-core (Regeln für
          WCAG 2.0, 2.1 und 2.2, Stufen A und AA), dazu von Hand mit der Tastatur, mit Kontrastmessung jeder Textstelle und
          mit eingeschalteter Einstellung «Bewegung reduzieren». Ein Test mit Screenreadern durch betroffene Personen steht
          noch aus.
        </p>
      </Section>

      <Section title="Rückmeldung und Kontakt">
        <p>
          Stossen Sie auf eine Barriere? Melden Sie sich bei uns. Wir antworten so schnell wie möglich und stellen Ihnen
          die Inhalte auf Wunsch in einer anderen Form zur Verfügung.
        </p>
        <p>
          E-Mail: <a href={`mailto:${company.email}`}>{company.email}</a>
          <br />
          Telefon: <a href={`tel:${company.phoneOfficeHref}`}>{company.phoneOffice}</a>
          <br />
          Post: {company.name}, {company.street}, {company.zip} {company.city}
        </p>
      </Section>

      <Section title="Rechtlicher Rahmen">
        <p>
          Die {company.name} ist ein privates Unternehmen. Das Schweizer Behindertengleichstellungsgesetz (BehiG) verpflichtet
          vor allem Behörden zu barrierefreien Websites. Wir halten uns freiwillig an WCAG 2.2 AA. Hinweise zum Datenschutz
          finden Sie in der <Link to="/datenschutz">Datenschutzerklärung</Link>.
        </p>
      </Section>
    </LegalLayout>
  )
}
