import { useEffect } from 'react'

export function LegalLayout({ title, updated, children }) {
  useEffect(() => {
    document.title = `${title} – Landwerker GmbH`
    return () => {
      document.title = 'Landwerker GmbH – Holzbau und PV-Anlagen, Menznau'
    }
  }, [title])

  return (
    <article className="wrap grid gap-12 pb-32 pt-36 lg:grid-cols-12 lg:pt-44">
      <header className="lg:col-span-4">
        <h1 className="head text-6xl lg:text-8xl">{title}</h1>
        {updated && <p className="mt-6 text-base text-staub">Stand: {updated}</p>}
      </header>
      <div className="max-w-[38rem] lg:col-span-7 lg:col-start-6">{children}</div>
    </article>
  )
}

export function Section({ title, children }) {
  return (
    <section className="border-t border-kalk/15 py-10 first:border-t-0 first:pt-0">
      <h2 className="head text-3xl">{title}</h2>
      <div className="mt-5 space-y-4 text-staub [&_a]:text-kalk [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-sand [&_li]:ml-5 [&_li]:list-disc [&_strong]:font-semibold [&_strong]:text-kalk">
        {children}
      </div>
    </section>
  )
}

export function Placeholder({ children }) {
  return (
    <mark className="bg-sand px-1 text-kohle" title="Platzhalter: vor dem Livegang ergänzen">
      [{children}]
    </mark>
  )
}
