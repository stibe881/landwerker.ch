import { useId, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { company } from '../content.js'

const STATIC_PREVIEW = import.meta.env.VITE_STATIC_PREVIEW === 'true'

const initial = { name: '', email: '', phone: '', location: '', topic: '', message: '', consent: false, website: '' }

function validate(v) {
  const e = {}
  if (!v.name.trim()) e.name = 'Bitte geben Sie Ihren Namen an.'
  if (!v.email.trim()) e.email = 'Bitte geben Sie Ihre E-Mail-Adresse an.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = 'Diese E-Mail-Adresse ist ungültig.'
  if (v.message.trim().length < 10) e.message = 'Beschreiben Sie Ihr Projekt in ein paar Worten.'
  if (!v.consent) e.consent = 'Ohne Ihre Einwilligung können wir die Anfrage nicht bearbeiten.'
  return e
}

const inputBase =
  'mt-2 block w-full border-0 border-b bg-transparent px-0 py-3 text-lg text-paper placeholder:text-ash focus:border-sand focus:outline-none focus:ring-0 focus-visible:outline-none'

function Field({ id, label, error, required, hint, children }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm text-stone">
        {label}
        {required ? (
          <span className="text-sand" aria-hidden="true">
            {' '}*
          </span>
        ) : (
          <span className="text-ash"> (optional)</span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-2 text-sm text-ash">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-[#f0a58f]">
          {error}
        </p>
      )}
    </div>
  )
}

export default function Contact() {
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

  const aria = (key, hint) => ({
    'aria-invalid': errors[key] ? true : undefined,
    'aria-describedby': errors[key] ? `${key}-error` : hint ? `${key}-hint` : undefined,
  })

  const onSubmit = async (e) => {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    const first = Object.keys(found)[0]
    if (first) {
      formRef.current?.querySelector(`[name="${first}"]`)?.focus()
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

  const border = (key) => (errors[key] ? 'border-[#f0a58f]' : 'border-line')

  return (
    <section id="kontakt" tabIndex={-1} aria-labelledby="kontakt-title" className="border-t border-line outline-none">
      <div className="container-x grid gap-16 py-28 md:grid-cols-12 md:py-40">
        <div className="md:col-span-4">
          <p className="eyebrow">Kontakt</p>
          <h2 id="kontakt-title" className="mt-6 font-serif text-4xl font-light leading-[1.05] md:text-6xl">
            Sie haben das Projekt.
            <br />
            <span className="text-stone">Wir die Umsetzung.</span>
          </h2>
          <p className="mt-8 max-w-sm leading-relaxed text-stone">
            Schreiben Sie uns, was Sie vorhaben. Ein paar Sätze und ein Ort reichen. Wir melden uns persönlich.
          </p>

          <dl className="mt-12 space-y-6 border-t border-line pt-8">
            <div>
              <dt className="text-sm text-ash">Büro</dt>
              <dd>
                <a href={`tel:${company.phoneOfficeHref}`} className="text-lg hover:text-sand focus-ring">
                  {company.phoneOffice}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-ash">Mobile</dt>
              <dd>
                <a href={`tel:${company.phoneMobileHref}`} className="text-lg hover:text-sand focus-ring">
                  {company.phoneMobile}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-ash">E-Mail</dt>
              <dd>
                <a href={`mailto:${company.email}`} className="break-all text-lg hover:text-sand focus-ring">
                  {company.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-ash">Adresse</dt>
              <dd className="text-lg">
                {company.street}, {company.zip} {company.city}
              </dd>
            </div>
          </dl>
        </div>

        <div className="md:col-span-7 md:col-start-6">
          {status === 'sent' ? (
            <div role="status" className="border border-line bg-coal p-10">
              <p className="font-serif text-3xl">Danke. Ihre Anfrage ist bei uns.</p>
              <p className="mt-4 text-stone">Wir melden uns persönlich bei Ihnen.</p>
            </div>
          ) : (
            <form ref={formRef} onSubmit={onSubmit} noValidate aria-describedby={statusId} className="space-y-10">
              <p className="text-sm text-ash">
                Felder mit <span className="text-sand">*</span> sind Pflichtfelder.
              </p>

              <div className="grid gap-10 sm:grid-cols-2">
                <Field id="name" label="Name" required error={errors.name}>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={values.name}
                    onChange={set('name')}
                    className={`${inputBase} ${border('name')}`}
                    {...aria('name')}
                  />
                </Field>
                <Field id="email" label="E-Mail" required error={errors.email}>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={values.email}
                    onChange={set('email')}
                    className={`${inputBase} ${border('email')}`}
                    {...aria('email')}
                  />
                </Field>
                <Field id="phone" label="Telefon" error={errors.phone}>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={values.phone}
                    onChange={set('phone')}
                    className={`${inputBase} ${border('phone')}`}
                  />
                </Field>
                <Field id="location" label="Ort des Projekts" error={errors.location}>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    autoComplete="address-level2"
                    value={values.location}
                    onChange={set('location')}
                    className={`${inputBase} ${border('location')}`}
                  />
                </Field>
              </div>

              <Field id="topic" label="Worum geht es?" error={errors.topic}>
                <select
                  id="topic"
                  name="topic"
                  value={values.topic}
                  onChange={set('topic')}
                  className={`${inputBase} ${border('topic')} cursor-pointer [&>option]:bg-coal`}
                >
                  <option value="">Bitte wählen</option>
                  <option>Terrasse</option>
                  <option>Umbau oder Innenausbau</option>
                  <option>Sanierung Dach oder Fassade</option>
                  <option>PV-Anlage</option>
                  <option>Dachsanierung mit PV-Anlage</option>
                  <option>Anderes</option>
                </select>
              </Field>

              <Field id="message" label="Ihr Projekt" required error={errors.message} hint="Was, wo, ungefähr wann.">
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={values.message}
                  onChange={set('message')}
                  className={`${inputBase} ${border('message')} resize-y`}
                  {...aria('message', true)}
                />
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
                    className="mt-1 h-5 w-5 shrink-0 cursor-pointer accent-sand focus-ring"
                    {...aria('consent')}
                  />
                  <label htmlFor="consent" className="cursor-pointer text-sm leading-relaxed text-stone">
                    Ich habe die{' '}
                    <Link to="/datenschutz" className="text-paper underline underline-offset-4 hover:text-sand focus-ring">
                      Datenschutzerklärung
                    </Link>{' '}
                    gelesen und bin einverstanden, dass die Landwerker GmbH meine Angaben zur Bearbeitung dieser Anfrage
                    verwendet. Die Einwilligung kann ich jederzeit per E-Mail widerrufen.
                    <span className="text-sand" aria-hidden="true">
                      {' '}*
                    </span>
                  </label>
                </div>
                {errors.consent && (
                  <p id="consent-error" className="mt-2 pl-9 text-sm text-[#f0a58f]">
                    {errors.consent}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="inline-flex min-h-14 items-center justify-center gap-4 bg-paper px-10 font-medium text-ink transition-colors hover:bg-sand disabled:opacity-60 focus-ring"
                >
                  {status === 'sending' ? 'Wird gesendet …' : 'Anfrage senden'}
                </button>
                <div id={statusId} role="status" aria-live="polite" className="text-sm">
                  {status === 'error' && (
                    <span className="text-[#f0a58f]">
                      Das hat nicht geklappt. Bitte rufen Sie uns an oder schreiben Sie an {company.email}.
                    </span>
                  )}
                  {status === 'preview' && (
                    <span className="text-sand">Vorschau: Eingaben gültig. In dieser Vorschau wird nichts versendet.</span>
                  )}
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
