import { useEffect } from 'react'

export function LegalLayout({ title, updated, children }) {
  useEffect(() => {
    document.title = `${title} · Landwerker GmbH`
    return () => {
      document.title = 'Landwerker GmbH · Holzbau und PV-Anlagen, Menznau'
    }
  }, [title])

  return (
    <article className="container-x pb-28 pt-36 md:pb-40 md:pt-48">
      <div className="grid gap-10 md:grid-cols-12">
        <header className="md:col-span-4">
          <p className="eyebrow">Rechtliches</p>
          <h1 className="mt-6 font-serif text-5xl font-light md:text-6xl">{title}</h1>
          {updated && <p className="mt-6 text-sm text-ash">Stand: {updated}</p>}
        </header>
        <div className="legal max-w-2xl md:col-span-7 md:col-start-6">{children}</div>
      </div>
    </article>
  )
}

export function Section({ title, children }) {
  return (
    <section className="border-t border-line py-10 first:border-t-0 first:pt-0">
      <h2 className="font-serif text-2xl">{title}</h2>
      <div className="mt-5 space-y-4 leading-relaxed text-stone [&_a]:text-paper [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-sand [&_li]:ml-5 [&_li]:list-disc [&_strong]:font-medium [&_strong]:text-paper">
        {children}
      </div>
    </section>
  )
}

export function Placeholder({ children }) {
  return (
    <mark className="bg-sand/15 px-1 text-sand" title="Platzhalter: vor Livegang ergänzen">
      [{children}]
    </mark>
  )
}
