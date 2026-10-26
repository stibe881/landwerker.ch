import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  useEffect(() => {
    document.title = 'Seite nicht gefunden – Landwerker GmbH'
    return () => {
      document.title = 'Landwerker GmbH – Holzbau und PV-Anlagen, Menznau'
    }
  }, [])

  return (
    <section aria-labelledby="nf-title" className="wrap pb-40 pt-48">
      <h1 id="nf-title" className="head text-7xl lg:text-9xl">
        Diese Seite gibt es nicht.
      </h1>
      <Link to="/" className="mt-10 inline-block underline underline-offset-4 hover:text-rot focus-ring">
        Zur Startseite
      </Link>
    </section>
  )
}
