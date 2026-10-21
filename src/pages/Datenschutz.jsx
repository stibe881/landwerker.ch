import { company } from '../content.js'
import { openConsentSettings } from '../lib/consent.js'
import { LegalLayout, Section } from './LegalLayout.jsx'

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
      </Section>

      <Section title="3. Besuch der Website">
        <p>
          Beim Aufruf der Website speichert unser Hosting-Anbieter technisch notwendige Daten in Server-Logfiles: IP-Adresse,
          Datum und Uhrzeit, aufgerufene Seite, Browser und Betriebssystem. Das dient dem sicheren Betrieb und wird nach 30 Tagen
          gelöscht.
        </p>
        <p>
          Schriften (Google Fonts, lokal eingebunden), Bilder und Skripte liefern wir vom eigenen Server aus. Ohne Ihre
          Einwilligung werden keine Inhalte von Servern von Google, YouTube oder ähnlichen Diensten nachgeladen. Zu Google
          Analytics siehe Ziffer 5.
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
          <strong>Statistik mit Google Analytics (nur mit Einwilligung):</strong> Erst wenn Sie zustimmen, setzen wir Google
          Analytics 4 ein. Anbieter ist Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Google Analytics
          wertet aus, welche Seiten wie oft und wie lange besucht werden, mit welchem Gerät und Browser und aus welcher Region.
          Google speichert dazu Cookies auf Ihrem Gerät (z. B. «_ga», bis zu 2 Jahre). Die vollständige IP-Adresse wird von
          Google Analytics 4 nicht gespeichert. Die Auswertungsdaten werden nach 14 Monaten gelöscht.
        </p>
        <p>
          Dabei können Daten an Google LLC in den USA übermittelt werden. Google LLC ist unter dem EU-US Data Privacy
          Framework und dem Swiss-US Data Privacy Framework zertifiziert. Rechtsgrundlage ist Ihre Einwilligung (Art. 6
          Abs. 1 lit. a DSGVO). Ohne Zustimmung findet keine Auswertung statt. Sie können die Einwilligung jederzeit
          widerrufen; danach laden wir Google Analytics nicht mehr und löschen die Cookies «_ga».
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
          E-Mail), mit Ihrer Einwilligung an Google (Statistik, siehe Ziffer 5), oder wenn das Gesetz es verlangt. Liegen
          diese Dienstleister ausserhalb der Schweiz oder des EWR, stellen wir einen angemessenen Schutz sicher, etwa über
          die Standardvertragsklauseln der EU-Kommission oder eine Zertifizierung unter dem Data Privacy Framework.
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
