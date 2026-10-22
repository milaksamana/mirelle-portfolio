import { useEffect, useRef, useState } from 'react'

type Item = { src: string; alt: string; title: string; caption: string; pdf?: string; pdfLabel?: string }

const ITEMS: Item[] = [
  { src: '/samples/creative/sweet-serenade-logo.jpeg', alt: 'Sweet Serenade circular mango tapioca drink logo with a yellow scalloped border', title: 'Sweet Serenade', caption: 'Brand identity · Logo design' },
  { src: '/samples/creative/mango-tapioca-promo.png', alt: 'Mango tapioca promotional graphic with a yellow drink, mango splash, fruit cubes, and green leaves', title: 'Mango Tapioca', caption: 'Small-business promotional graphic' },
  { src: '/samples/creative/baker-bee-mini-donut-menu.png', alt: 'Baker Bee mini-donut menu showing flavors, toppings, and package prices', title: 'Baker Bee · Menu', caption: 'Small-business menu design', pdf: '/samples/creative/baker-bee-mini-donut-menu.pdf', pdfLabel: 'Open menu PDF' },
  { src: '/samples/creative/baker-bee-mini-donut-menu.png', alt: 'Baker Bee mini-donut branding PDF with bakery logo artwork', title: 'Baker Bee · Branding', caption: 'Mini-donut brand artwork', pdf: '/samples/creative/baker-bee-mini-donut-branding.pdf', pdfLabel: 'Open branding PDF' },
]

export default function MomentumGallery() {
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const state = useRef({ x: 0, velocity: 0, dragging: false, pointerX: 0, lastTime: 0, frame: 0 })
  const [progress, setProgress] = useState(0)
  const [activeImage, setActiveImage] = useState<Item | null>(null)

  useEffect(() => {
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!viewport || !track) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduced.matches) return
    const s = state.current
    const bounds = () => Math.min(0, viewport.clientWidth - track.scrollWidth)
    const render = () => {
      const min = bounds()
      if (!s.dragging) {
        const dt = s.lastTime ? Math.min(2, (performance.now() - s.lastTime) / 16.667) : 1
        s.x += s.velocity * dt
        s.velocity *= Math.pow(0.95, dt)
        if (s.x > 0) { s.x += (0 - s.x) * 0.16; s.velocity *= 0.82 }
        if (s.x < min) { s.x += (min - s.x) * 0.16; s.velocity *= 0.82 }
        if (Math.abs(s.velocity) < 0.05) s.velocity = 0
      }
      track.style.transform = `translateX(${s.x}px)`
      setProgress(min === 0 ? 0 : Math.min(1, Math.max(0, -s.x / -min)))
      s.lastTime = performance.now()
      s.frame = requestAnimationFrame(render)
    }
    s.frame = requestAnimationFrame(render)
    const resize = () => { s.x = Math.max(bounds(), Math.min(0, s.x)); track.style.transform = `translateX(${s.x}px)` }
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(s.frame); window.removeEventListener('resize', resize) }
  }, [])

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const s = state.current
    s.dragging = true
    s.velocity = 0
    s.pointerX = event.clientX
    event.currentTarget.setPointerCapture(event.pointerId)
    event.currentTarget.classList.add('momentum-gallery__viewport--dragging')
  }
  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const s = state.current
    if (!s.dragging || !trackRef.current || !viewportRef.current) return
    const dx = event.clientX - s.pointerX
    s.pointerX = event.clientX
    const min = Math.min(0, viewportRef.current.clientWidth - trackRef.current.scrollWidth)
    let delta = dx
    if (s.x > 0 || s.x < min) delta *= 0.35
    s.x += delta
    s.velocity = s.velocity * 0.5 + dx * 0.5
    trackRef.current.style.transform = `translateX(${s.x}px)`
  }
  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    state.current.dragging = false
    event.currentTarget.classList.remove('momentum-gallery__viewport--dragging')
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
  }
  const push = (amount: number) => { state.current.velocity += amount }

  return (
    <section className="momentum-gallery" aria-labelledby="creative-gallery-title">
      <div className="work-section-heading">
        <span className="va-eyebrow">Branding & promotional graphics</span>
        <h2 id="creative-gallery-title">Small-business visuals, made with care.</h2>
        <p>Logo design, product promotion, and menu materials grouped into one creative gallery.</p>
      </div>
      <div
        className="momentum-gallery__viewport"
        ref={viewportRef}
        tabIndex={0}
        role="region"
        aria-label="Draggable gallery of branding and promotional design samples. Use left and right arrow keys to move."
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={(e) => { if (e.key === 'ArrowLeft') { e.preventDefault(); push(12) } if (e.key === 'ArrowRight') { e.preventDefault(); push(-12) } }}
      >
        <div className="momentum-gallery__track" ref={trackRef}>
          {ITEMS.map((item) => (
            <article className="momentum-gallery__item" key={item.src}>
              <button type="button" className="momentum-gallery__image-button" onClick={() => setActiveImage(item)} aria-label={`Enlarge ${item.title} design`}>
                <img src={item.src} alt={item.alt} draggable={false} />
              </button>
              <div className="momentum-gallery__caption"><strong>{item.title}</strong><span>{item.caption}</span>{item.pdf && <a href={item.pdf} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>{item.pdfLabel} ↗</a>}</div>
            </article>
          ))}
        </div>
      </div>
      <div className="momentum-gallery__rail" aria-hidden="true"><span style={{ transform: `translateX(${progress * 100}%)` }} /></div>
      {activeImage && (
        <div className="work-lightbox" role="dialog" aria-modal="true" aria-label={activeImage.title} onClick={() => setActiveImage(null)}>
          <button className="work-lightbox__close" type="button" onClick={() => setActiveImage(null)} aria-label="Close image preview">×</button>
          <img src={activeImage.src} alt={activeImage.alt} onClick={(e) => e.stopPropagation()} />
          <p>{activeImage.title} · {activeImage.caption}</p>
        </div>
      )}
    </section>
  )
}
