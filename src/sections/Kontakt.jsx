import { useId, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { company } from '../content.js'
import Foto from '../components/Foto.jsx'

const STATIC_PREVIEW = import.meta.env.VITE_STATIC_PREVIEW === 'true'

const initial = { name: '', email: '', phone: '', location: '', topic: '', message: '', consent: false, website: '' }

function validate(v) {
  const e = {}
  if (!v.name.trim()) e.name = 'Name fehlt.'
  if (!v.email.trim()) e.email = 'E-Mail-Adresse fehlt.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = 'Diese E-Mail-Adresse ist ungültig. Beispiel: name@beispiel.ch'
  if (v.message.trim().length < 10) e.message = 'Beschreiben Sie Ihr Projekt in ein paar Worten (mindestens 10 Zeichen).'
  if (!v.consent) e.consent = 'Bitte bestätigen Sie die Datenschutzerklärung. Ohne Einwilligung können wir die Anfrage nicht bearbeiten.'
  return e
}

const input =
  'mt-2 block w-full border-0 border-b-2 bg-transparent px-0 py-3 text-xl text-tinte focus:border-rot focus:outline-none focus:ring-0'

function Field({ id, label, required, error, hint, children }) {
  return (
    <div>
      <label htmlFor={id} className="text-lg">
        {label}
        {!required && <span className="ml-2 text-base text-grau">(optional)</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-2 text-base text-grau">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-base text-rot">
          {error}
        </p>
      )}
    </div>
  )
}

export default function Kontakt() {
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | preview | error
  const formRef = useRef(null)
  const statusId = useId()

  const set = (key) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setValues((v) => ({ ...v, [key]: value }))
    if (errors[key]) setErrors((err) => ({ ...err, [key]: undefined }))
  }

  const aria = (key, hasHint) => ({
    'aria-invalid': errors[key] ? true : undefined,
    'aria-describedby': errors[key] ? `${key}-error` : hasHint ? `${key}-hint` : undefined,
  })
  const line = (key) => (errors[key] ? 'border-rot' : 'border-tinte/30')

  const onSubmit = async (e) => {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    const firstError = Object.keys(found)[0]
    if (firstError) {
      formRef.current?.querySelector(`[name="${firstError}"]`)?.focus()
      return
    }
    if (STATIC_PREVIEW) {
      setStatus('preview')
      return
    }
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('sent')
      setValues(initial)
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="kontakt" tabIndex={-1} aria-labelledby="kontakt-title" className="outline-none lg:grid lg:grid-cols-12">
      {/* Kontaktfläche in Sand, wie eine Werkstatttafel */}
      <div className="bg-rot px-5 pb-16 pt-24 text-weiss sm:px-8 lg:col-span-5 lg:pb-28 lg:pl-12 lg:pr-12 lg:pt-32">
        <h2 id="kontakt-title" className="head text-[clamp(3.5rem,6vw,6.5rem)]">
          Projekt anfragen
        </h2>
        <p className="mt-8 max-w-[26rem]">
          Schreiben Sie, was Sie vorhaben, und wo. Ein paar Sätze reichen. Lieber reden? Rufen Sie an.
        </p>
        <dl className="mt-14 space-y-6">
          <div>
            <dt className="text-base text-rosa">Büro</dt>
            <dd>
              <a href={`tel:${company.phoneOfficeHref}`} className="head text-5xl hover:underline focus-ring-dark">
                {company.phoneOffice}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-base text-rosa">Mobile</dt>
            <dd>
              <a href={`tel:${company.phoneMobileHref}`} className="head text-5xl hover:underline focus-ring-dark">
                {company.phoneMobile}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-base text-rosa">E-Mail</dt>
            <dd>
              <a href={`mailto:${company.email}`} className="break-all underline underline-offset-4 focus-ring-dark">
                {company.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-base text-rosa">Werkstatt</dt>
            <dd>
              <a
                href={company.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 focus-ring-dark"
              >
                {company.street}, {company.zip} {company.city}
                <span className="sr-only"> (in Google Maps öffnen, neues Fenster)</span>
              </a>
            </dd>
          </div>
        </dl>

        {/* Standortkarte als lokales Bild (OpenStreetMap, einmalig erzeugt): keine Anfrage an Google beim Laden.
            Ein Klick öffnet Google Maps im neuen Register bzw. in der App. */}
        <figure className="mt-12">
          <a
            href={company.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block focus-ring-dark"
          >
            <Foto
              src={`${import.meta.env.BASE_URL}media/karte-menznau.webp`}
              alt="Karte von Menznau: Die Werkstatt der Landwerker GmbH liegt am Allmendweg 4, nordöstlich des Bahnhofs."
              // Volle Breite der Fläche: breit (2:1), wo die Fläche breit ist; sonst mittig auf 4:3 zugeschnitten
              className="aspect-[4/3] sm:aspect-[2/1] lg:aspect-[4/3]"
              width="2400"
              height="1200"
            />
            <span className="sr-only"> In Google Maps öffnen, neues Fenster</span>
          </a>
          <figcaption className="mt-3 flex flex-wrap justify-between gap-x-6 gap-y-1 text-sm text-rosa">
            <a href={company.mapsUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-weiss focus-ring-dark">
              In Google Maps öffnen
            </a>
            <span>
              Karte ©{' '}
              <a
                href="https://www.openstreetmap.org/copyright"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-weiss focus-ring-dark"
              >
                OpenStreetMap-Mitwirkende
              </a>
            </span>
          </figcaption>
        </figure>
      </div>

      <div className="px-5 pb-24 pt-16 sm:px-8 lg:col-span-6 lg:col-start-7 lg:pb-28 lg:pr-12 lg:pt-32">
        {status === 'sent' ? (
          <div role="status">
            <p className="head text-5xl">Anfrage gesendet.</p>
            <p className="mt-4 text-grau">Wir melden uns persönlich bei Ihnen.</p>
          </div>
        ) : (
          <form ref={formRef} onSubmit={onSubmit} noValidate aria-describedby={statusId} className="space-y-10">
            <div className="grid gap-10 sm:grid-cols-2">
              <Field id="name" label="Name" required error={errors.name}>
                <input id="name" name="name" type="text" autoComplete="name" required value={values.name} onChange={set('name')} className={`${input} ${line('name')}`} {...aria('name')} />
              </Field>
              <Field id="email" label="E-Mail" required error={errors.email}>
                <input id="email" name="email" type="email" autoComplete="email" required value={values.email} onChange={set('email')} className={`${input} ${line('email')}`} {...aria('email')} />
              </Field>
              <Field id="phone" label="Telefon" error={errors.phone}>
                <input id="phone" name="phone" type="tel" autoComplete="tel" value={values.phone} onChange={set('phone')} className={`${input} ${line('phone')}`} />
              </Field>
              <Field id="location" label="Ort" error={errors.location}>
                <input id="location" name="location" type="text" autoComplete="address-level2" value={values.location} onChange={set('location')} className={`${input} ${line('location')}`} />
              </Field>
            </div>

            <Field id="topic" label="Worum geht es?" error={errors.topic}>
              <select id="topic" name="topic" value={values.topic} onChange={set('topic')} className={`${input} ${line('topic')} cursor-pointer [&>option]:bg-papier`}>
                <option value="">Bitte wählen</option>
                <option>Terrasse</option>
                <option>Umbau oder Innenausbau</option>
                <option>Sanierung von Dach oder Fassade</option>
                <option>PV-Anlage</option>
                <option>Dachsanierung mit PV-Anlage</option>
                <option>Etwas anderes</option>
              </select>
            </Field>

            <Field id="message" label="Ihr Projekt" required error={errors.message} hint="Was, wo, ungefähr wann.">
              <textarea id="message" name="message" rows={5} required value={values.message} onChange={set('message')} className={`${input} ${line('message')} resize-y`} {...aria('message', true)} />
            </Field>

            {/* Spam-Schutz ohne Drittanbieter: für Menschen unsichtbar */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label htmlFor="website">Website</label>
              <input id="website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={set('website')} />
            </div>

            <div>
              <div className="flex items-start gap-4">
                <input
                  id="consent"
                  name="consent"
                  type="checkbox"
                  required
                  checked={values.consent}
                  onChange={set('consent')}
                  className="mt-1.5 h-5 w-5 shrink-0 cursor-pointer accent-rot focus-ring"
                  {...aria('consent')}
                />
                <label htmlFor="consent" className="cursor-pointer text-base">
                  Ich habe die{' '}
                  <Link to="/datenschutz" className="underline underline-offset-4 hover:text-rot focus-ring">
                    Datenschutzerklärung
                  </Link>{' '}
                  gelesen. Die Landwerker GmbH darf meine Angaben verwenden, um diese Anfrage zu bearbeiten. Ich kann das
                  jederzeit per E-Mail widerrufen. (Pflichtfeld)
                </label>
              </div>
              {errors.consent && (
                <p id="consent-error" className="mt-2 pl-9 text-base text-rot">
                  {errors.consent}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="min-h-14 bg-tinte px-10 font-display text-2xl font-semibold uppercase text-weiss hover:bg-rot disabled:opacity-60 focus-ring"
              >
                {status === 'sending' ? 'Wird gesendet …' : 'Anfrage senden'}
              </button>
              <p id={statusId} role="status" aria-live="polite" className="text-base">
                {status === 'error' && (
                  <span className="text-rot">Senden fehlgeschlagen. Rufen Sie uns an oder schreiben Sie an {company.email}.</span>
                )}
                {status === 'preview' && <span className="text-tinte">Vorschau: Eingaben gültig. Hier wird nichts versendet.</span>}
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
