import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { categories, img, projects } from '../content.js'

const years = projects.map((p) => p.year).filter(Boolean)
const span = `${Math.min(...years)} und ${Math.max(...years)}`

// Auswahl oben: Formate bleiben, wie fotografiert. Bewusst ungleich gesetzt.
const featured = [
  { i: 0, cls: 'lg:col-span-7 lg:row-start-1', ratio: 'aspect-[16/9]' },
  { i: 5, cls: 'lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:row-start-1 lg:pt-40', ratio: 'aspect-[4/5]' },
  { i: 7, cls: 'lg:col-span-4 lg:col-start-2 lg:row-start-2', ratio: 'aspect-[4/3]' },
  { i: 8, cls: 'lg:col-span-6 lg:col-start-4 lg:row-start-3', ratio: 'aspect-[16/10]' },
]

const label = (id) => categories.find((c) => c.id === id)?.label
const where = (p) => [p.place, p.year].filter(Boolean).join(', ')

export default function Werkliste() {
  const [filter, setFilter] = useState('alle')
  const [active, setActive] = useState(0)
  const preview = useRef(null)
  const list = useRef(null)
  const first = useRef(true)

  const rows = useMemo(
    () => projects.map((p, idx) => ({ ...p, idx })).filter((p) => filter === 'alle' || p.cat === filter),
    [filter],
  )
  const current = projects[active] ?? projects[0]

  // Bewegung nur als Antwort auf eine Handlung: Foto wechselt, Liste filtert
  useLayoutEffect(() => {
    if (first.current) return
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(preview.current, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.55, ease: 'power3.out' })
    })
    return () => mm.revert()
  }, [active])

  useLayoutEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from(list.current.querySelectorAll('[data-row]'), { opacity: 0, y: 8, duration: 0.35, stagger: 0.02, ease: 'power2.out' })
    })
    return () => mm.revert()
  }, [filter])

  const choose = (id) => {
    setFilter(id)
    const firstMatch = projects.findIndex((p) => id === 'alle' || p.cat === id)
    if (firstMatch >= 0) setActive(firstMatch)
  }

  return (
    <section id="werkliste" tabIndex={-1} aria-labelledby="werkliste-title" className="bg-kohle outline-none">
      <div className="wrap pb-28 pt-28 lg:pb-40 lg:pt-40">
        <div className="grid gap-8 lg:grid-cols-12">
          <h2 id="werkliste-title" className="head text-[clamp(4rem,10vw,10rem)] lg:col-span-7">
            Werkliste
          </h2>
          <p className="max-w-[28rem] text-staub lg:col-span-4 lg:col-start-9 lg:self-end">
            {projects.length} Arbeiten zwischen {span}. Jedes Foto stammt von unseren Baustellen, keines aus einer Bilddatenbank.
          </p>
        </div>

        <ul className="mt-20 grid gap-12 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-16" aria-label="Ausgewählte Arbeiten">
          {featured.map(({ i, cls, ratio }) => {
            const p = projects[i]
            return (
              <li key={p.image} className={cls}>
                <figure>
                  <img src={img(p.image)} alt={p.alt} loading="lazy" decoding="async" className={`${ratio} w-full object-cover`} />
                  <figcaption className="mt-3 flex justify-between gap-6 text-base">
                    <span>
                      {p.work}, {p.material}
                    </span>
                    <span className="shrink-0 text-staub">{where(p)}</span>
                  </figcaption>
                </figure>
              </li>
            )
          })}
        </ul>

        <div className="mt-28 lg:mt-40">
          <div role="group" aria-label="Werkliste filtern" className="flex flex-wrap gap-x-8 gap-y-3 border-b border-kalk/15 pb-5">
            {categories.map((c) => {
              const n = c.id === 'alle' ? projects.length : projects.filter((p) => p.cat === c.id).length
              const on = filter === c.id
              return (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => choose(c.id)}
                  className={`min-h-11 font-display text-2xl font-semibold uppercase focus-ring ${
                    on ? 'text-sand underline decoration-2 underline-offset-8' : 'text-staub hover:text-kalk'
                  }`}
                >
                  {c.label} <span className="font-serif text-base font-normal normal-case">({n})</span>
                </button>
              )
            })}
          </div>
          <p className="sr-only" aria-live="polite">
            {rows.length} Arbeiten angezeigt
          </p>

          <div className="lg:grid lg:grid-cols-12 lg:gap-x-10">
            {/* Desktop: Tabelle, Vorschau rechts folgt Maus und Tastaturfokus */}
            <table ref={list} className="hidden w-full text-left text-base lg:col-span-8 lg:table">
              <caption className="sr-only">Alle Referenzen mit Jahr, Arbeit, Material und Ort</caption>
              <thead>
                <tr className="text-staub">
                  <th scope="col" className="py-4 pr-6 font-normal">Jahr</th>
                  <th scope="col" className="py-4 pr-6 font-normal">Arbeit</th>
                  <th scope="col" className="py-4 pr-6 font-normal">Material, Leistung</th>
                  <th scope="col" className="py-4 font-normal">Ort</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((p) => (
                  <tr
                    key={p.idx}
                    data-row
                    tabIndex={0}
                    onMouseEnter={() => setActive(p.idx)}
                    onFocus={() => setActive(p.idx)}
                    className={`cursor-default border-t border-kalk/15 align-top outline-none transition-colors focus-visible:bg-rinde ${
                      active === p.idx ? 'bg-rinde' : 'hover:bg-rinde'
                    }`}
                  >
                    <td className="py-4 pl-3 pr-6 tabular-nums text-staub">{p.year ?? '–'}</td>
                    <td className="py-4 pr-6">{p.work}</td>
                    <td className="py-4 pr-6 text-staub">{p.material}</td>
                    <td className="py-4 pr-3">{p.place ?? '–'}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="hidden lg:col-span-4 lg:block">
              <figure className="sticky top-28 mt-14">
                <img
                  ref={preview}
                  key={current.image}
                  src={img(current.image)}
                  alt={current.alt}
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover"
                />
                <figcaption className="mt-3 text-base">
                  {current.work}
                  <span className="block text-staub">
                    {label(current.cat)}
                    {where(current) && `, ${where(current)}`}
                  </span>
                </figcaption>
              </figure>
            </div>

            {/* Mobil: Liste mit Foto pro Eintrag */}
            <ul className="lg:hidden">
              {rows.map((p) => (
                <li key={p.idx} className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-kalk/15 py-5">
                  <img src={img(p.image)} alt={p.alt} loading="lazy" decoding="async" className="aspect-square w-full object-cover" />
                  <div className="text-base">
                    <p>{p.work}</p>
                    <p className="text-staub">{p.material}</p>
                    <p className="mt-1 text-staub">{where(p) || label(p.cat)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
