import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/motion.js'
import { projects } from '../content.js'

// Zwei Bänder aus echten Daten der Werkliste: Orte mit Jahr, darunter die Materialien.
// Bewegt sich nur, wenn gescrollt wird (keine Endlosschleife), Richtung gegenläufig.
const orte = [...new Set(projects.filter((p) => p.place).map((p) => `${p.place} ${p.year}`))]
const materialien = ['Lärche', 'Douglasie', 'Millboard Golden Oak', 'Eternit', 'Gutex-Holzfaser', 'Stulpschalung', '27 kWp', '21 kWh Speicher', 'James Hardie', 'Coppered Oak']

function Row({ items, className, dir }) {
  const doubled = [...items, ...items]
  return (
    <div data-band={dir} className={`flex w-max gap-[0.4em] whitespace-nowrap ${className}`}>
      {doubled.map((t, i) => (
        <span key={i} className="flex items-center gap-[0.4em]">
          {t}
          <span className="inline-block h-[0.12em] w-[0.5em] bg-current opacity-40" />
        </span>
      ))}
    </div>
  )
}

export default function Ortsband() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      root.current.querySelectorAll('[data-band]').forEach((el) => {
        const toLeft = el.dataset.band === 'left'
        gsap.fromTo(
          el,
          { xPercent: toLeft ? 0 : -50 },
          { xPercent: toLeft ? -35 : -15, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 0.8 } },
        )
      })
    })
    return () => mm.revert()
  }, [])

  return (
    <div ref={root} aria-hidden="true" className="overflow-hidden bg-tinte py-16 lg:py-24">
      <Row items={orte} dir="left" className="head text-[clamp(3.5rem,9vw,9rem)] text-weiss" />
      <Row items={materialien} dir="right" className="head mt-2 text-[clamp(3.5rem,9vw,9rem)] text-ocker" />
    </div>
  )
}
