import { holzbau, pv } from '../content.js'
import Foto from '../components/Foto.jsx'

function ServiceList({ items, tone }) {
  const line = tone === 'rot' ? 'border-weiss/30' : 'border-tinte/15'
  return (
    <ul className={`mt-10 grid border-t ${line} sm:grid-cols-2 sm:gap-x-8`}>
      {items.map((s) => (
        <li key={s} className={`border-b ${line} py-3 text-base`}>
          {s}
        </li>
      ))}
    </ul>
  )
}

// Split 7/5: Holzbau auf Kohle, PV als Sandfläche, die bis an den rechten Rand läuft
export default function Leistungen() {
  return (
    <section id="leistungen" tabIndex={-1} aria-label="Leistungen" className="overflow-hidden outline-none lg:grid lg:grid-cols-12">
      <article aria-labelledby="holzbau-title" className="bg-papier lg:col-span-7">
        <div className="px-5 pb-20 pt-24 sm:px-8 lg:pb-28 lg:pl-12 lg:pr-16 lg:pt-32">
          <h2 id="holzbau-title" data-slide="0.1" className="head text-[clamp(3.25rem,7vw,7.5rem)]">
            {holzbau.title}
          </h2>
          <figure data-plane className="mt-12 lg:-mr-16">
            <Foto src={holzbau.image} alt={holzbau.alt} className="aspect-[16/10]" />
          </figure>
          <div className="mt-10 grid gap-x-10 lg:grid-cols-7">
            <div className="max-w-[34rem] space-y-4 lg:col-span-5">
              {holzbau.text.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <ServiceList items={holzbau.services} />
        </div>
      </article>

      <article aria-labelledby="pv-title" className="bg-rot text-weiss lg:col-span-5">
        <div className="px-5 pb-20 pt-24 sm:px-8 lg:pb-28 lg:pl-12 lg:pr-12 lg:pt-32">
          <h2 id="pv-title" data-slide="0.05" className="head text-[clamp(3.25rem,5.4vw,6rem)]">
            {pv.title}
          </h2>
          <div className="mt-10 max-w-[34rem] space-y-4">
            {pv.text.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <ServiceList items={pv.services} tone="rot" />
          <figure className="mt-12 max-w-[22rem]">
            <div data-plane>
            <Foto src={pv.image} alt={pv.alt} className="aspect-[9/16]" />
            </div>
            <figcaption className="mt-3 text-base text-rosa">Technikraum einer Anlage in Menznau, 2026.</figcaption>
          </figure>
        </div>
      </article>
    </section>
  )
}
