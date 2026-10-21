import { werkstatt } from '../content.js'

export default function Werkstatt() {
  return (
    <section id="werkstatt" tabIndex={-1} aria-labelledby="werkstatt-title" className="bg-rinde outline-none">
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
          <figcaption className="mt-6 text-staub">Das Credo der Landwerker GmbH</figcaption>
        </figure>

        <div className="mt-24 grid gap-14 lg:mt-32 lg:grid-cols-12 lg:gap-x-10">
          <figure className="-mx-5 overflow-hidden sm:-mx-8 lg:col-span-5 lg:-ml-12 lg:mr-0">
            <img data-parallax="-0.12" src={werkstatt.image} alt={werkstatt.alt} loading="lazy" decoding="async" className="aspect-[4/5] w-full scale-110 object-cover" />
          </figure>

          <div className="lg:col-span-6 lg:col-start-7 lg:pt-16">
            <h3 className="head text-5xl lg:text-6xl">Seit 2018 in Menznau</h3>
            <div className="mt-8 max-w-[36rem] space-y-5 text-staub">
              {werkstatt.story.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <p className="mt-8 font-serif italic">{werkstatt.signature}</p>

            <dl className="mt-14 grid max-w-[36rem] grid-cols-[auto_1fr] gap-x-8 border-t border-kalk/15 text-base">
              {werkstatt.card.map(([k, v]) => (
                <div key={k} className="col-span-2 grid grid-cols-subgrid border-b border-kalk/15 py-3">
                  <dt className="text-staub">{k}</dt>
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
