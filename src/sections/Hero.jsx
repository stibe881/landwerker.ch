import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const media = (f) => `${import.meta.env.BASE_URL}media/${f}`

export default function Hero() {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(true)

  // Bewegung reduzieren, wenn das Betriebssystem es wünscht (WCAG 2.3.3)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => {
      const v = videoRef.current
      if (!v) return
      if (mq.matches) {
        v.pause()
        setPlaying(false)
      } else {
        v.playbackRate = 0.5 // Zeitlupe
        v.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
      }
    }
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  // Pausieren muss möglich sein, da das Video länger als 5 s läuft (WCAG 2.2.2)
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
    <section aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] items-end overflow-hidden">
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
      {/* Abdunkelung: garantiert Kontrast für weisse Schrift über allen Videobildern */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink/60" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/30 to-ink/40" />

      <div className="container-x pb-20 pt-40 md:pb-28">
        <p className="eyebrow">Holzbau und Photovoltaik · Menznau LU</p>
        <h1
          id="hero-title"
          className="mt-6 max-w-5xl font-serif text-[clamp(2.75rem,7.2vw,7.5rem)] font-light leading-[0.95] tracking-[-0.02em]"
        >
          Holz, das hält.
          <br />
          <span className="italic text-sand">Strom</span> vom eigenen Dach.
        </h1>
        <div className="mt-10 flex flex-col gap-8 md:mt-14 md:flex-row md:items-end md:justify-between">
          <p className="max-w-md text-lg leading-relaxed text-paper/90">
            Terrassen, Umbauten, Sanierungen und PV-Anlagen. Geplant und gebaut von vier Leuten aus Menznau.
          </p>
          <Link
            to={{ pathname: '/', hash: 'kontakt' }}
            className="group inline-flex min-h-14 items-center gap-4 self-start bg-paper px-8 text-base font-medium text-ink transition-colors hover:bg-sand focus-ring md:self-auto"
          >
            Projekt anfragen
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>

      <button
        type="button"
        onClick={toggle}
        className="absolute bottom-5 right-5 inline-flex min-h-11 items-center gap-2 px-3 text-xs uppercase tracking-[0.18em] text-paper/80 hover:text-paper focus-ring md:bottom-8 md:right-8"
        aria-label={playing ? 'Hintergrundvideo anhalten' : 'Hintergrundvideo abspielen'}
      >
        <svg aria-hidden="true" viewBox="0 0 12 12" className="h-3 w-3 fill-current">
          {playing ? <path d="M2 1h3v10H2zM7 1h3v10H7z" /> : <path d="M2 1l9 5-9 5z" />}
        </svg>
        {playing ? 'Pause' : 'Play'}
      </button>
    </section>
  )
}
