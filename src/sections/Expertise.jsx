import { expertise, facts } from '../content.js'

export default function Expertise() {
  return (
    <section id="leistungen" tabIndex={-1} aria-labelledby="leistungen-title" className="outline-none">
      <div className="container-x pt-28 md:pt-40">
        <div className="grid gap-8 md:grid-cols-12">
          <p className="eyebrow md:col-span-3">Leistungen</p>
          <h2
            id="leistungen-title"
            className="font-serif text-4xl font-light leading-[1.05] md:col-span-9 md:text-6xl"
          >
            Zwei Handwerke. Ein Team. Alles, was zwischen Fundament und Firstziegel gebaut wird.
          </h2>
        </div>
      </div>

      <div className="container-x mt-20 grid divide-y divide-line md:mt-28 lg:grid-cols-2 lg:divide-x lg:divide-y-0">
        {expertise.map((item) => (
          <article key={item.id} aria-labelledby={`${item.id}-title`} className="flex flex-col bg-ink lg:first:pr-10 lg:last:pl-10">
            <figure className="relative aspect-[4/3] overflow-hidden bg-coal">
              <img
                src={item.image}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover grayscale-[25%] transition duration-700 hover:grayscale-0"
              />
            </figure>
            <div className="flex flex-1 flex-col py-10 md:py-14">
              <div className="flex items-baseline gap-5">
                <span className="font-serif text-lg text-sand" aria-hidden="true">
                  {item.index}
                </span>
                <h3 id={`${item.id}-title`} className="font-serif text-3xl md:text-4xl">
                  {item.title}
                </h3>
              </div>
              <p className="mt-6 text-xl leading-snug text-paper">{item.lead}</p>
              {item.body.map((p) => (
                <p key={p} className="mt-4 max-w-xl leading-relaxed text-stone">
                  {p}
                </p>
              ))}
              <ul className="mt-10 grid border-t border-line sm:grid-cols-2 sm:gap-x-8">
                {item.services.map((s) => (
                  <li key={s} className="border-b border-line py-3 text-sm text-paper/90">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      <div className="container-x">
        <dl className="grid border-y border-line sm:grid-cols-3">
          {facts.map((f) => (
            <div
              key={f.label}
              className="flex flex-row-reverse items-baseline justify-end gap-4 border-line py-8 sm:border-r sm:px-8 sm:first:pl-0 sm:last:border-r-0"
            >
              <dt className="text-sm text-stone">{f.label}</dt>
              <dd className="font-serif text-5xl font-light text-sand">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
