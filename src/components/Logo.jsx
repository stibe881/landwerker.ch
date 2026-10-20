// Wortmarke: der Firmenname im Stempelschnitt, wie auf einem Sortierstempel
export default function Logo({ className = '' }) {
  return <span className={`font-stamp text-2xl font-bold uppercase leading-none tracking-[0.04em] ${className}`}>Landwerker</span>
}
