import { useRef } from 'react'
import { useScrollMotion } from '../lib/motion.js'
import Hero from '../sections/Hero.jsx'
import Leistungen from '../sections/Leistungen.jsx'
import Werkstatt from '../sections/Werkstatt.jsx'
import Ortsband from '../sections/Ortsband.jsx'
import Werkliste from '../sections/Werkliste.jsx'
import Kontakt from '../sections/Kontakt.jsx'

export default function Home() {
  const root = useRef(null)
  useScrollMotion(root)
  return (
    <div ref={root}>
      <Hero />
      <Leistungen />
      <Werkstatt />
      <Ortsband />
      <Werkliste />
      <Kontakt />
    </div>
  )
}
