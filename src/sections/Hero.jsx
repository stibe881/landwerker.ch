import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from '../lib/motion.js'

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

        // Beim Scrollen: Bild läuft langsamer mit, die drei Zeilen gleiten versetzt auseinander wie gestapelte Bretter
        const st = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true }
        gsap.to('[data-bgwrap]', { yPercent: 18, ease: 'none', scrollTrigger: st })
        gsap.utils.toArray('[data-shift]').forEach((el, i) => {
          gsap.to(el, { xPercent: [-14, 10, -6][i], ease: 'none', scrollTrigger: st })
        })
      })
    }, root)
    return () => {
      ctx.revert()
      mm.revert()
    }
  }, [])

  return (
    <section ref={root} aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden text-weiss">
      <div data-bgwrap className="absolute inset-0 -z-20">
        <img
          data-bg
          src={media('hero-terrasse.webp')}
          srcSet={`${media('hero-terrasse-1100.webp')} 1100w, ${media('hero-terrasse.webp')} 2000w`}
          sizes="100vw"
          alt="Grosse Holzterrasse mit eingebauter Sitzbank und Pergola an einem Holzhaus mit PV-Anlage auf dem Dach, dahinter Hügel und Voralpen."
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover object-[70%_center] lg:object-center"
        />
      </div>
      {/* Gleichmässige Abdunkelung in Tinte (65 %): weisse Schrift erreicht selbst über dem hellsten Himmel 4.6:1 */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-tinte/65" />

      <div className="wrap pb-10 pt-32 lg:pb-14">
        <h1 id="hero-title" className="font-stamp text-[clamp(4rem,13.5vw,15rem)] font-extrabold uppercase leading-[0.84] tracking-[-0.005em]">
          {LINES.map((line) => (
            <span key={line} data-shift className="block overflow-hidden pb-[0.04em]">
              <span data-line className="block">
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div data-rule className="mt-8 h-px bg-weiss/40 lg:mt-12" />

        <div data-after className="mt-6 grid gap-6 lg:grid-cols-12 lg:items-start">
          <p className="max-w-[30rem] text-xl leading-snug lg:col-span-5">
            Terrassen, Umbauten, Sanierungen und PV-Anlagen. Gebaut von vier Leuten aus Menznau.
          </p>
          <div className="lg:col-span-4 lg:col-start-9 lg:flex lg:justify-end">
            <Link
              to={{ pathname: '/', hash: 'kontakt' }}
              className="inline-flex min-h-14 items-center bg-rot px-8 font-display text-2xl font-semibold uppercase text-weiss hover:bg-weiss hover:text-rot focus-ring-dark"
            >
              Projekt anfragen
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
