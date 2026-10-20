import { company } from '../content.js'
import { LegalLayout, Placeholder, Section } from './LegalLayout.jsx'

export default function Impressum() {
  return (
    <LegalLayout title="Impressum" updated="Oktober 2026">
      <Section title="Betreiberin der Website">
        <address className="not-italic">
          <strong>{company.name}</strong>
          <br />
          {company.street}
          <br />
          {company.zip} {company.city}
          <br />
          Schweiz
        </address>
        <p>
          Telefon: <a href={`tel:${company.phoneOfficeHref}`}>{company.phoneOffice}</a>
          <br />
          Mobile: <a href={`tel:${company.phoneMobileHref}`}>{company.phoneMobile}</a>
          <br />
          E-Mail: <a href={`mailto:${company.email}`}>{company.email}</a>
        </p>
      </Section>

      <Section title="Vertretungsberechtigte Person">
        <p>{company.owner}</p>
      </Section>

      <Section title="Handelsregistereintrag">
        <p>
          Eingetragener Firmenname: {company.name}
          <br />
          Rechtsform: Gesellschaft mit beschränkter Haftung (GmbH)
          <br />
          Handelsregisteramt: Kanton {company.canton}
          <br />
          Handelsregister-Nummer: {company.hr}
          <br />
          Unternehmens-Identifikationsnummer (UID): {company.uid}
          <br />
          Mehrwertsteuer-Nummer: <Placeholder>CHE-343.855.359 MWST, falls MWST-pflichtig</Placeholder>
        </p>
      </Section>

      <Section title="Haftungsausschluss">
        <p>
          Wir prüfen die Inhalte dieser Website sorgfältig. Für Richtigkeit, Vollständigkeit und Aktualität übernehmen wir
          dennoch keine Gewähr. Haftungsansprüche wegen Schäden materieller oder immaterieller Art, die aus dem Zugriff auf
          die veröffentlichten Informationen, durch Missbrauch der Verbindung oder durch technische Störungen entstehen, sind
          ausgeschlossen, soweit gesetzlich zulässig.
        </p>
        <p>Offerten und Preise sind nur in schriftlicher Form verbindlich.</p>
      </Section>

      <Section title="Haftung für Links">
        <p>
          Verweise auf Websites Dritter liegen ausserhalb unseres Verantwortungsbereichs. Der Zugriff erfolgt auf eigenes
          Risiko.
        </p>
      </Section>

      <Section title="Urheberrechte">
        <p>
          Texte, Fotos und Videos auf dieser Website gehören der {company.name}. Die Verwendung bedarf unserer vorgängigen
          schriftlichen Zustimmung. Genannte Marken (z. B. Millboard, Velux, Rollfix, Eternit, Gutex, James Hardie) gehören
          ihren jeweiligen Inhabern.
        </p>
      </Section>

      <Section title="Allgemeine Geschäftsbedingungen">
        <p>
          Unsere AGB senden wir Ihnen gerne zu. Anfrage an <a href={`mailto:${company.email}`}>{company.email}</a>.
        </p>
      </Section>
    </LegalLayout>
  )
}
