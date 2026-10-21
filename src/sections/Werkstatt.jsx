import { werkstatt } from '../content.js'
import Foto from '../components/Foto.jsx'

export default function Werkstatt() {
  return (
    <section id="werkstatt" tabIndex={-1} aria-labelledby="werkstatt-title" className="bg-creme outline-none">
      <div className="wrap pb-24 pt-28 lg:pb-36 lg:pt-40">
        <h2 id="werkstatt-title" className="sr-only">
          Über uns
        </h2>
        <figure className="lg:ml-[8.333%] lg:w-10/12">
          <blockquote>
            <p data-words className="font-serif text-[clamp(2.5rem,6.5vw,6.75rem)] font-light leading-[1.02] tracking-[-0.02em]">
              {`«${werkstatt.quote}»`.split(' ').map((w, i) => (
                <span key={i} data-word>
                  {w}{' '}
                </span>
              ))}
            </p>
          </blockquote>
          <figcaption className="mt-6 text-grau">Das Credo der Landwerker GmbH</figcaption>
        </figure>

        <div className="mt-24 grid gap-14 lg:mt-32 lg:grid-cols-12 lg:gap-x-10">
          {/* Fährt beim Scrollen von links herein und wird dabei freigelegt; das Foto blendet nach dem Laden weich ein */}
          <figure className="-mx-5 overflow-hidden sm:-mx-8 lg:col-span-5 lg:-ml-12 lg:mr-0">
            <div data-plane data-enter="left">
              <Foto src={werkstatt.image} alt={werkstatt.alt} className="aspect-[4/5]" />
            </div>
          </figure>

          <div className="lg:col-span-6 lg:col-start-7 lg:pt-16">
            <h3 className="head text-5xl lg:text-6xl">Seit 2018 in Menznau</h3>
            <div className="mt-8 max-w-[36rem] space-y-5 text-grau">
              {werkstatt.story.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <p className="mt-8 font-serif italic">{werkstatt.signature}</p>

            <dl className="mt-14 grid max-w-[36rem] grid-cols-[auto_1fr] gap-x-8 border-t border-tinte/15 text-base">
              {werkstatt.card.map(([k, v]) => (
                <div key={k} className="col-span-2 grid grid-cols-subgrid border-b border-tinte/15 py-3">
                  <dt className="text-grau">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
