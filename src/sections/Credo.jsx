import { company, credo } from '../content.js'

export default function Credo() {
  return (
    <section id="team" tabIndex={-1} aria-labelledby="team-title" className="mt-28 bg-clay outline-none md:mt-40">
      <div className="container-x py-28 md:py-40">
        <p className="eyebrow">Über uns</p>
        <h2 id="team-title" className="sr-only">
          Über uns: Stefan Möckli und Team
        </h2>
        <blockquote className="mt-8">
          <p className="max-w-6xl font-serif text-[clamp(2.25rem,6vw,5.75rem)] font-light leading-[1.02] tracking-[-0.015em]">
            «{credo.quote}»
          </p>
        </blockquote>

        <div className="mt-20 grid gap-12 md:mt-28 md:grid-cols-12 md:gap-16">
          <figure className="md:col-span-5">
            <div className="aspect-[4/5] overflow-hidden bg-coal">
              <img src={credo.image} alt={credo.alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
            </div>
            <figcaption className="mt-3 text-sm text-ash">Unterwegs zwischen Menznau und der Baustelle.</figcaption>
          </figure>

          <div className="md:col-span-6 md:col-start-7 md:pt-10">
            <h3 className="font-serif text-3xl md:text-4xl">
              Gegründet {company.founded} in Menznau.
              <br />
              <span className="text-stone">Heute zu viert.</span>
            </h3>
            <div className="mt-10 space-y-6 text-lg leading-relaxed text-stone">
              {credo.story.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <p className="mt-10 border-t border-line pt-6 text-sm uppercase tracking-[0.18em] text-paper">
              {credo.signature}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
