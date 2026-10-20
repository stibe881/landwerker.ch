export default function Logo({ className = '' }) {
  return (
    <span className={`inline-flex items-baseline gap-2 ${className}`}>
      <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 translate-y-0.5 text-sand">
        <path d="M3 2v15h14" stroke="currentColor" strokeWidth="3" fill="none" />
      </svg>
      <span className="text-[0.95rem] font-semibold uppercase tracking-[0.2em]">Landwerker</span>
    </span>
  )
}
