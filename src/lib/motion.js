import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Scroll-gekoppelte Bewegung. Gesteuert über data-Attribute im Markup:
//   data-parallax="0.15"   Element läuft langsamer (positiv) oder schneller (negativ) mit
//   data-plane             Bild wird freigelegt wie unter dem Hobel (Wisch von links)
//   data-slide="0.08"      Überschrift fährt beim Scrollen von rechts in ihre Position (Anteil der Breite)
//   data-words             Wörter färben sich im Lesetempo von Grau zu Tinte
// Alles nur bei prefers-reduced-motion: no-preference. Ohne JS bleibt der Inhalt vollständig sichtbar.
export function useScrollMotion(scope) {
  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    const ctx = gsap.context(() => {
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray('[data-parallax]').forEach((el) => {
          const speed = parseFloat(el.dataset.parallax) || 0.15
          gsap.fromTo(
            el,
            { yPercent: -speed * 50 },
            { yPercent: speed * 50, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } },
          )
        })

        gsap.utils.toArray('[data-plane]').forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: 'inset(0% 100% 0% 0%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', scrollTrigger: { trigger: el, start: 'top 90%', end: 'top 35%', scrub: 0.6 } },
          )
        })

        gsap.utils.toArray('[data-slide]').forEach((el) => {
          // Immer von rechts nach links: so wird am linken Satzrand nichts abgeschnitten
          const amount = parseFloat(el.dataset.slide) || 0.08
          gsap.fromTo(
            el,
            { xPercent: amount * 100 },
            { xPercent: 0, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'top 45%', scrub: 0.6 } },
          )
        })

        gsap.utils.toArray('[data-words]').forEach((el) => {
          gsap.fromTo(
            el.querySelectorAll('[data-word]'),
            // Hex-Werte statt CSS-Variablen: GSAP kann nur echte Farben interpolieren (grau → tinte)
            { color: '#6b6243' },
            {
              color: '#322b11',
              stagger: 0.1,
              ease: 'none',
              scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 30%', scrub: true },
            },
          )
        })
      })
    }, scope)

    // Lazy geladene Bilder verschieben das Layout: danach Positionen neu messen
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    return () => {
      window.removeEventListener('load', refresh)
      ctx.revert()
      mm.revert()
    }
  }, [scope])
}

export { gsap, ScrollTrigger }
