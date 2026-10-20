import { useMemo, useState } from 'react'
import { categories, projects } from '../content.js'

// Rhythmus der Kachelbreiten im 6-Spalten-Raster (Desktop)
const SPANS = [4, 2, 2, 4, 3, 3, 2, 2, 2]
const SPAN_CLASS = { 2: 'md:col-span-2', 3: 'md:col-span-3', 4: 'md:col-span-4' }

export default function Showcase() {
  const [active, setActive] = useState('alle')
  const visible = useMemo(
    () => (active === 'alle' ? projects : projects.filter((p) => p.category === active)),
    [active],
  )
  const label = (id) => categories.find((c) => c.id === id)?.label

  return (
    <section id="arbeiten" tabIndex={-1} aria-labelledby="arbeiten-title" className="outline-none">
      <div className="container-x py-28 md:py-40">
        <div className="grid gap-8 md:grid-cols-12">
          <p className="eyebrow md:col-span-3">Arbeiten</p>
          <div className="md:col-span-9">
            <h2 id="arbeiten-title" className="font-serif text-4xl font-light leading-[1.05] md:text-6xl">
              Gebaut. Fotografiert. Übergeben.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone">
              Eine Auswahl aus den letzten Jahren. Jedes Bild stammt von unseren Baustellen.
            </p>
          </div>
        </div>

        <div role="group" aria-label="Arbeiten filtern" className="mt-14 flex flex-wrap gap-2 md:mt-20">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              aria-pressed={active === c.id}
              onClick={() => setActive(c.id)}
              className={`min-h-11 border px-5 text-sm transition-colors focus-ring ${
                active === c.id ? 'border-sand bg-sand text-ink' : 'border-line text-stone hover:border-paper hover:text-paper'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
        <p className="sr-only" aria-live="polite">
          {visible.length} Arbeiten angezeigt
        </p>

        <ul className="mt-10 grid gap-x-6 gap-y-12 md:auto-rows-[26rem] md:grid-cols-6 lg:auto-rows-[30rem]">
          {visible.map((p, i) => (
            <li key={p.image + p.title} className={SPAN_CLASS[SPANS[i % SPANS.length]]}>
              <figure className="group flex h-full flex-col">
                <div className="aspect-[4/3] overflow-hidden bg-coal md:aspect-auto md:min-h-0 md:flex-1">
                  <img
                    src={p.image}
                    alt={p.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <figcaption className="mt-4 flex min-h-[4.75rem] items-start justify-between gap-6 border-t border-line pt-4">
                  <span>
                    <span className="block text-paper">{p.title}</span>
                    <span className="mt-1 block text-sm text-ash">{label(p.category)}</span>
                  </span>
                  {(p.place || p.year) && (
                    <span className="shrink-0 text-right text-sm text-stone">
                      {p.place}
                      {p.year && <span className="block">{p.year}</span>}
                    </span>
                  )}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
