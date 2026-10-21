import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'

const media = (f) => `${import.meta.env.BASE_URL}media/${f}`

const LINES = ['Sie haben', 'das Projekt.', 'Wir bauen es.']

export default function Hero() {
  const root = useRef(null)

  // Die eine orchestrierte Szene der Seite: Bild setzt sich, Zeilen werden wie ein Stempel aufgedrückt.
  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    const ctx = gsap.context(() => {
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap
          .timeline({ defaults: { ease: 'power4.out' } })
          .from('[data-bg]', { scale: 1.08, duration: 2.4, ease: 'power2.out' }, 0)
          .from('[data-line]', { yPercent: 105, duration: 1.1, stagger: 0.12 }, 0.15)
          .from('[data-rule]', { scaleX: 0, transformOrigin: 'left center', duration: 0.9 }, '-=0.6')
          .from('[data-after]', { opacity: 0, duration: 0.6 }, '-=0.4')
      })
    }, root)
    return () => {
      ctx.revert()
      mm.revert()
    }
  }, [])

  return (
    <section ref={root} aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden">
      <img
        data-bg
        src={media('hero-terrasse.webp')}
        srcSet={`${media('hero-terrasse-1100.webp')} 1100w, ${media('hero-terrasse.webp')} 2000w`}
        sizes="100vw"
        alt="Grosse Holzterrasse mit eingebauter Sitzbank und Pergola an einem Holzhaus mit PV-Anlage auf dem Dach, dahinter Hügel und Voralpen."
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[70%_center] lg:object-center"
      />
      {/* Gleichmässige Abdunkelung: weisse Schrift erreicht selbst über dem hellsten Himmel 5:1 */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-kohle/60" />

      <div className="wrap pb-10 pt-32 lg:pb-14">
        <h1 id="hero-title" className="font-stamp text-[clamp(4rem,13.5vw,15rem)] font-extrabold uppercase leading-[0.84] tracking-[-0.005em]">
          {LINES.map((line) => (
            <span key={line} className="block overflow-hidden pb-[0.04em]">
              <span data-line className="block">
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div data-rule className="mt-8 h-px bg-kalk/40 lg:mt-12" />

        <div data-after className="mt-6 grid gap-6 lg:grid-cols-12 lg:items-start">
          <p className="max-w-[30rem] text-xl leading-snug lg:col-span-5">
            Terrassen, Umbauten, Sanierungen und PV-Anlagen. Gebaut von vier Leuten aus Menznau.
          </p>
          <div className="lg:col-span-4 lg:col-start-9 lg:flex lg:justify-end">
            <Link
              to={{ pathname: '/', hash: 'kontakt' }}
              className="inline-flex min-h-14 items-center bg-sand px-8 font-display text-2xl font-semibold uppercase text-kohle hover:bg-kalk focus-ring"
            >
              Projekt anfragen
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
