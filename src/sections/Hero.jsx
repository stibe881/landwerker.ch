import { useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'

const media = (f) => `${import.meta.env.BASE_URL}media/${f}`

const LINES = ['Sie haben', 'das Projekt.', 'Wir bauen es.']

export default function Hero() {
  const root = useRef(null)
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(true)

  // Die eine orchestrierte Szene der Seite: Zeilen werden wie ein Stempel aufgedrückt.
  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    const ctx = gsap.context(() => {
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap
          .timeline({ defaults: { ease: 'power4.out' } })
          .from('[data-line]', { yPercent: 105, duration: 1.1, stagger: 0.12 })
          .from('[data-rule]', { scaleX: 0, transformOrigin: 'left center', duration: 0.9 }, '-=0.6')
          .from('[data-after]', { opacity: 0, duration: 0.6 }, '-=0.4')
      })
    }, root)

    // Video: Zeitlupe, bei reduzierter Bewegung angehalten (WCAG 2.3.3)
    const v = videoRef.current
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (v) {
      v.playbackRate = 0.5
      if (mq.matches) {
        v.pause()
        setPlaying(false)
      }
    }
    return () => {
      ctx.revert()
      mm.revert()
    }
  }, [])

  // Pausieren muss möglich sein, das Video läuft länger als 5 s (WCAG 2.2.2)
  const toggle = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      v.playbackRate = 0.5
      v.play().then(() => setPlaying(true)).catch(() => {})
    } else {
      v.pause()
      setPlaying(false)
    }
  }

  return (
    <section ref={root} aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden">
      <video
        ref={videoRef}
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={media('hero-poster.jpg')}
        aria-hidden="true"
        onLoadedMetadata={(e) => (e.currentTarget.playbackRate = 0.5)}
      >
        <source src={media('hero.webm')} type="video/webm" />
        <source src={media('hero.mp4')} type="video/mp4" />
      </video>
      {/* Gleichmässige Abdunkelung, damit weisse Schrift auf jedem Videobild mindestens 4.5:1 erreicht */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-kohle/65" />

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
          <div className="flex items-center gap-6 lg:col-span-4 lg:col-start-9 lg:justify-end">
            <Link
              to={{ pathname: '/', hash: 'kontakt' }}
              className="inline-flex min-h-14 items-center bg-sand px-8 font-display text-2xl font-semibold uppercase text-kohle hover:bg-kalk focus-ring"
            >
              Projekt anfragen
            </Link>
            <button
              type="button"
              onClick={toggle}
              className="inline-flex min-h-11 items-center gap-2 font-display text-lg font-medium uppercase text-kalk/90 hover:text-kalk focus-ring"
              aria-label={playing ? 'Hintergrundvideo anhalten' : 'Hintergrundvideo abspielen'}
            >
              <svg aria-hidden="true" viewBox="0 0 12 12" className="h-3 w-3 fill-current">
                {playing ? <path d="M2 1h3v10H2zM7 1h3v10H7z" /> : <path d="M2 1l9 5-9 5z" />}
              </svg>
              {playing ? 'Pause' : 'Play'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
