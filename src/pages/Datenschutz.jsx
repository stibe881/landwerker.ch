import { company } from '../content.js'
import { openConsentSettings } from '../lib/consent.js'
import { LegalLayout, Placeholder, Section } from './LegalLayout.jsx'

// VORLAGE nach revDSG (CH) und DSGVO (EU). Vor dem Livegang juristisch prüfen
// und die markierten Platzhalter ergänzen.
export default function Datenschutz() {
  return (
    <LegalLayout title="Datenschutz­erklärung" updated="Oktober 2026">
      <Section title="1. Worum es geht">
        <p>
          Diese Erklärung beschreibt, welche Personendaten wir beim Besuch dieser Website und bei Anfragen bearbeiten. Sie
          richtet sich nach dem Schweizer Datenschutzgesetz (revDSG) und, soweit anwendbar, nach der Datenschutz-Grundverordnung
          der EU (DSGVO).
        </p>
      </Section>

      <Section title="2. Verantwortliche Stelle">
        <address className="not-italic">
          {company.name}
          <br />
          {company.owner}
          <br />
          {company.street}, {company.zip} {company.city}, Schweiz
          <br />
          <a href={`mailto:${company.email}`}>{company.email}</a>
        </address>
        <p>
          Vertretung in der EU (Art. 27 DSGVO): <Placeholder>nur nötig bei systematischem Angebot an Personen in der EU</Placeholder>
        </p>
      </Section>

      <Section title="3. Besuch der Website">
        <p>
          Beim Aufruf der Website speichert unser Hosting-Anbieter technisch notwendige Daten in Server-Logfiles: IP-Adresse,
          Datum und Uhrzeit, aufgerufene Seite, Browser und Betriebssystem. Das dient dem sicheren Betrieb und wird nach{' '}
          <Placeholder>z. B. 30</Placeholder> Tagen gelöscht.
        </p>
        <p>
          Hosting-Anbieter: <Placeholder>Name, Sitz, Land des Hosting-Anbieters</Placeholder>
        </p>
        <p>
          Schriften (Google Fonts, lokal eingebunden), Bilder und Skripte liefern wir vom eigenen Server aus. Es werden keine Inhalte von Servern von Google, YouTube
          oder ähnlichen Diensten nachgeladen.
        </p>
      </Section>

      <Section title="4. Kontaktformular und E-Mail">
        <p>
          Wenn Sie uns über das Formular oder per E-Mail kontaktieren, bearbeiten wir Name, E-Mail-Adresse, Telefonnummer,
          Projektort und Ihre Nachricht. Wir nutzen diese Angaben ausschliesslich, um Ihre Anfrage zu beantworten und eine
          Offerte zu erstellen.
        </p>
        <p>
          Rechtsgrundlage ist Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sowie die Anbahnung eines Vertrags (Art. 6 Abs. 1
          lit. b DSGVO). Sie können die Einwilligung jederzeit per E-Mail widerrufen.
        </p>
        <p>
          Kommt kein Auftrag zustande, löschen wir die Anfrage nach spätestens 12 Monaten. Bei einem Auftrag gelten die
          gesetzlichen Aufbewahrungspflichten (in der Schweiz in der Regel 10 Jahre für Geschäftsunterlagen).
        </p>
      </Section>

      <Section title="5. Cookies und lokale Speicherung">
        <p>
          <strong>Notwendig:</strong> Wir speichern Ihren Entscheid zur Cookie-Abfrage im lokalen Speicher Ihres Browsers
          (Schlüssel «lw-consent»). Diese Angabe verlässt Ihr Gerät nicht.
        </p>
        <p>
          <strong>Statistik (nur mit Einwilligung):</strong> Erst wenn Sie zustimmen, setzen wir ein Statistik-Werkzeug ein.{' '}
          <Placeholder>Name des Tools, Anbieter, Speicherort, Speicherdauer</Placeholder>. Ohne Zustimmung findet keine
          Auswertung statt.
        </p>
        <p>
          <button type="button" onClick={openConsentSettings} className="underline underline-offset-4 hover:text-rot focus-ring">
            Cookie-Einstellungen jetzt ändern
          </button>
        </p>
      </Section>

      <Section title="6. Weitergabe und Bekanntgabe ins Ausland">
        <p>
          Wir verkaufen keine Daten. Eine Weitergabe erfolgt nur an Dienstleister, die wir für den Betrieb brauchen (Hosting,
          E-Mail), oder wenn das Gesetz es verlangt. Liegen diese Dienstleister ausserhalb der Schweiz oder des EWR, stellen
          wir einen angemessenen Schutz sicher, etwa über die Standardvertragsklauseln der EU-Kommission.
        </p>
        <p>
          E-Mail-Anbieter: <Placeholder>Name, Sitz, Land</Placeholder>
        </p>
      </Section>

      <Section title="7. Ihre Rechte">
        <p>Sie haben jederzeit das Recht auf:</p>
        <ul>
          <li>Auskunft über Ihre bei uns gespeicherten Daten</li>
          <li>Berichtigung unrichtiger Daten</li>
          <li>Löschung oder Einschränkung der Bearbeitung</li>
          <li>Herausgabe oder Übertragung Ihrer Daten</li>
          <li>Widerruf einer erteilten Einwilligung</li>
          <li>Widerspruch gegen die Bearbeitung</li>
        </ul>
        <p>
          Schreiben Sie dazu an <a href={`mailto:${company.email}`}>{company.email}</a>. Sie können sich zudem beim
          Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten (EDÖB) oder bei einer Aufsichtsbehörde in Ihrem
          EU-Wohnsitzstaat beschweren.
        </p>
      </Section>

      <Section title="8. Datensicherheit">
        <p>
          Die Website ist per TLS verschlüsselt. Wir schützen Ihre Daten mit angemessenen technischen und organisatorischen
          Massnahmen gegen Verlust und unbefugten Zugriff.
        </p>
      </Section>

      <Section title="9. Änderungen">
        <p>
          Wir passen diese Erklärung an, wenn sich unsere Website oder das Recht ändert. Es gilt die hier veröffentlichte
          Fassung.
        </p>
      </Section>
    </LegalLayout>
  )
}
