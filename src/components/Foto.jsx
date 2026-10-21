import { useEffect, useRef, useState } from 'react'

// Foto, das nach dem Laden weich einblendet statt aufzuploppen.
// Rahmen in Creme hält den Platz, solange das Bild lädt. Bei reduzierter Bewegung sofort sichtbar.
export default function Foto({ src, alt, className = '', imgClassName = '', loading = 'lazy', ...rest }) {
  const ref = useRef(null)
  const [loaded, setLoaded] = useState(false)

  // Bereits aus dem Cache geladen? Dann feuert onLoad unter Umständen vor dem ersten Render
  useEffect(() => {
    const el = ref.current
    setLoaded(Boolean(el?.complete && el.naturalWidth))
  }, [src])

  return (
    <div className={`overflow-hidden bg-creme ${className}`}>
      <img
        ref={ref}
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-[opacity,transform] duration-[900ms] ease-out motion-reduce:transition-none ${
          loaded ? 'scale-100 opacity-100' : 'scale-[1.04] opacity-0'
        } ${imgClassName}`}
        {...rest}
      />
    </div>
  )
}
