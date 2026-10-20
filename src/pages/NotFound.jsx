import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section aria-labelledby="nf-title" className="container-x pb-40 pt-48">
      <p className="eyebrow">Fehler 404</p>
      <h1 id="nf-title" className="mt-6 font-serif text-5xl font-light md:text-7xl">
        Diese Seite gibt es nicht.
      </h1>
      <Link to="/" className="mt-10 inline-block text-lg underline underline-offset-4 hover:text-sand focus-ring">
        Zur Startseite
      </Link>
    </section>
  )
}
