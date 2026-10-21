import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { gsap } from '../lib/motion.js'
import { categories, img, projects } from '../content.js'
import Foto from '../components/Foto.jsx'

const years = projects.map((p) => p.year).filter(Boolean)
const span = `${Math.min(...years)} und ${Math.max(...years)}`

// Auswahl oben: Formate bleiben, wie fotografiert. Bewusst ungleich gesetzt.
const featured = [
  { i: 0, cls: 'lg:col-span-7 lg:row-start-1', ratio: 'aspect-[16/9]', speed: 0.1 },
  { i: 5, cls: 'lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:row-start-1 lg:pt-40', ratio: 'aspect-[4/5]', speed: -0.3 },
  { i: 7, cls: 'lg:col-span-4 lg:col-start-2 lg:row-start-2', ratio: 'aspect-[4/3]', speed: 0.25 },
  { i: 8, cls: 'lg:col-span-6 lg:col-start-4 lg:row-start-3', ratio: 'aspect-[16/10]', speed: -0.1 },
]

const label = (id) => categories.find((c) => c.id === id)?.label
const where = (p) => [p.place, p.year].filter(Boolean).join(', ')

export default function Werkliste() {
  const [filter, setFilter] = useState('alle')
  const [active, setActive] = useState(0)
  // Vorschau als Stapel: das neue Foto schiebt sich über das bisherige, statt es hart zu ersetzen
  const [stack, setStack] = useState([0])
  const preview = useRef(null)
  const list = useRef(null)
  const section = useRef(null)
  const first = useRef(true)
  // Richtung der Bewegung durch die Liste: nach unten (true) oder nach oben (false)
  const downward = useRef(true)

  // Zeilen stehen in derselben Reihenfolge wie projects: grösserer Index heisst weiter unten
  const show = (idx) => {
    if (idx === active) return
    downward.current = idx > active
    setActive(idx)
  }

  // Alle Fotos der Werkliste vorladen, sobald die Sektion in Reichweite kommt: Hover zeigt sie sofort
  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        projects.forEach((p) => {
          const pre = new Image()
          pre.decoding = 'async'
          pre.src = img(p.image)
        })
        io.disconnect()
      },
      { rootMargin: '800px 0px' },
    )
    io.observe(section.current)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    setStack((s) => (s[s.length - 1] === active ? s : [s[s.length - 1], active]))
  }, [active])

  const rows = useMemo(
    () => projects.map((p, idx) => ({ ...p, idx })).filter((p) => filter === 'alle' || p.cat === filter),
    [filter],
  )
  const current = projects[active] ?? projects[0]

  // Bewegung nur als Antwort auf eine Handlung: neues Foto wird in Leserichtung über das alte gezogen,
  // beim Abwärtsgehen von oben nach unten, beim Aufwärtsgehen von unten nach oben
  useLayoutEffect(() => {
    if (stack.length < 2) return
    const top = preview.current?.querySelector('[data-top]')
    if (!top) return
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.set(top, {
        clipPath: downward.current ? 'inset(0% 0% 100% 0%)' : 'inset(100% 0% 0% 0%)',
        scale: 1.08,
        transformOrigin: downward.current ? 'center top' : 'center bottom',
      })
      const play = () =>
        gsap.to(top, { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, duration: 0.75, ease: 'power3.out', overwrite: true })
      // Erst animieren, wenn das Bild wirklich da ist, sonst läuft die Bewegung ins Leere
      if (top.complete && top.naturalWidth) play()
      else top.addEventListener('load', play, { once: true })
    })
    return () => mm.revert()
  }, [stack])

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
    downward.current = true
    if (firstMatch >= 0) setActive(firstMatch)
  }

  return (
    <section ref={section} id="werkliste" tabIndex={-1} aria-labelledby="werkliste-title" className="bg-papier outline-none">
      <div className="wrap pb-28 pt-28 lg:pb-40 lg:pt-40">
        <div className="grid gap-8 lg:grid-cols-12">
          <h2 id="werkliste-title" className="head text-[clamp(4rem,10vw,10rem)] lg:col-span-7">
            Werkliste
          </h2>
          <p className="max-w-[28rem] text-grau lg:col-span-4 lg:col-start-9 lg:self-end">
            {projects.length} Arbeiten zwischen {span}. Jedes Foto stammt von unseren Baustellen, keines aus einer Bilddatenbank.
          </p>
        </div>

        <ul className="mt-20 grid gap-12 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-16" aria-label="Ausgewählte Arbeiten">
          {featured.map(({ i, cls, ratio, speed }) => {
            const p = projects[i]
            return (
              <li key={p.image} data-parallax={speed} className={cls}>
                <figure>
                  <div data-plane>
                    <Foto src={img(p.image)} alt={p.alt} className={ratio} />
                  </div>
                  <figcaption className="mt-3 flex justify-between gap-6 text-base">
                    <span>
                      {p.work}, {p.material}
                    </span>
                    <span className="shrink-0 text-grau">{where(p)}</span>
                  </figcaption>
                </figure>
              </li>
            )
          })}
        </ul>

        <div className="mt-28 lg:mt-40">
          <div role="group" aria-label="Werkliste filtern" className="flex flex-wrap gap-x-8 gap-y-3 border-b border-tinte/15 pb-5">
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
                    on ? 'text-rot underline decoration-2 underline-offset-8' : 'text-grau hover:text-tinte'
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
                <tr className="text-grau">
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
                    onMouseEnter={() => show(p.idx)}
                    onFocus={() => show(p.idx)}
                    className={`cursor-default border-t border-tinte/15 align-top outline-none transition-colors focus-visible:bg-creme ${
                      active === p.idx ? 'bg-creme' : 'hover:bg-creme'
                    }`}
                  >
                    <td className="py-4 pl-3 pr-6 tabular-nums text-grau">{p.year ?? '–'}</td>
                    <td className="py-4 pr-6">{p.work}</td>
                    <td className="py-4 pr-6 text-grau">{p.material}</td>
                    <td className="py-4 pr-3">{p.place ?? '–'}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="hidden lg:col-span-4 lg:block">
              <figure className="sticky top-28 mt-14">
                <div ref={preview} className="relative aspect-[4/5] overflow-hidden bg-creme">
                  {stack.map((idx, i) => {
                    const top = i === stack.length - 1
                    return (
                      <img
                        key={idx}
                        data-top={top || undefined}
                        src={img(projects[idx].image)}
                        alt={top ? projects[idx].alt : ''}
                        aria-hidden={top ? undefined : true}
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    )
                  })}
                </div>
                <figcaption className="mt-3 text-base">
                  {current.work}
                  <span className="block text-grau">
                    {label(current.cat)}
                    {where(current) && `, ${where(current)}`}
                  </span>
                </figcaption>
              </figure>
            </div>

            {/* Mobil: Liste mit Foto pro Eintrag */}
            <ul className="lg:hidden">
              {rows.map((p) => (
                <li key={p.idx} className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-tinte/15 py-5">
                  <Foto src={img(p.image)} alt={p.alt} className="aspect-square" />
                  <div className="text-base">
                    <p>{p.work}</p>
                    <p className="text-grau">{p.material}</p>
                    <p className="mt-1 text-grau">{where(p) || label(p.cat)}</p>
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
