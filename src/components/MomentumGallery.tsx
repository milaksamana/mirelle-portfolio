import { useRef, useState } from 'react'

type Item = { src?: string; alt: string; title: string; caption: string; pdf?: string; pdfLabel?: string }
type ImageItem = Item & { src: string }

const ITEMS: Item[] = [
  { src: '/samples/creative/sweet-serenade-logo.jpeg', alt: 'Sweet Serenade circular mango tapioca drink logo with a yellow scalloped border', title: 'Sweet Serenade', caption: 'Brand identity · Logo design' },
  { src: '/samples/creative/mango-tapioca-promo.png', alt: 'Mango tapioca promotional graphic with a yellow drink, mango splash, fruit cubes, and green leaves', title: 'Mango Tapioca', caption: 'Small-business promotional graphic' },
  { src: '/samples/creative/baker-bee-mini-donut-menu.png', alt: 'Baker Bee mini-donut menu showing flavors, toppings, and package prices', title: 'Baker Bee · Menu', caption: 'Small-business menu design' },
  { alt: 'Baker Bee mini-donut branding and logo artwork presented in a PDF document', title: 'Baker Bee · Branding', caption: 'Mini-donut brand artwork', pdf: '/samples/creative/baker-bee-mini-donut-branding.pdf', pdfLabel: 'Open branding PDF' },
]

function scrollGallery(viewport: HTMLDivElement | null, direction: -1 | 1) {
  if (!viewport) return
  viewport.scrollBy({
    left: direction * Math.max(260, viewport.clientWidth * 0.82),
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
  })
}

export default function MomentumGallery() {
  const viewportRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [activeImage, setActiveImage] = useState<ImageItem | null>(null)

  const updateProgress = () => {
    const viewport = viewportRef.current
    if (!viewport) return
    const max = viewport.scrollWidth - viewport.clientWidth
    setProgress(max <= 0 ? 0 : Math.min(1, Math.max(0, viewport.scrollLeft / max)))
  }

  return (
    <section className="momentum-gallery" aria-labelledby="creative-gallery-title">
      <div className="work-section-heading">
        <span className="va-eyebrow">Branding & promotional graphics</span>
        <h2 id="creative-gallery-title">Small-business visuals, made with care.</h2>
        <p>Logo design, product promotion, and menu materials grouped into one creative gallery. Scroll sideways, swipe, or use the arrows to browse every sample.</p>
      </div>

      <div className="momentum-gallery__controls" aria-label="Creative gallery navigation">
        <span>Browse the gallery</span>
        <div>
          <button type="button" onClick={() => scrollGallery(viewportRef.current, -1)} aria-label="Scroll gallery left">←</button>
          <button type="button" onClick={() => scrollGallery(viewportRef.current, 1)} aria-label="Scroll gallery right">→</button>
        </div>
      </div>

      <div
        className="momentum-gallery__viewport"
        ref={viewportRef}
        tabIndex={0}
        role="region"
        aria-label="Horizontally scrollable branding and promotional design samples"
        onScroll={updateProgress}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft') { event.preventDefault(); scrollGallery(viewportRef.current, -1) }
          if (event.key === 'ArrowRight') { event.preventDefault(); scrollGallery(viewportRef.current, 1) }
        }}
      >
        <div className="momentum-gallery__track">
          {ITEMS.map((item) => (
            <article className="momentum-gallery__item" key={item.title}>
              {item.src && (
                <button
                  type="button"
                  className="momentum-gallery__image-button"
                  onClick={() => setActiveImage(item as ImageItem)}
                  aria-label={'Enlarge ' + item.title + ' design'}
                >
                  <img src={item.src} alt={item.alt} draggable={false} loading="lazy" decoding="async" />
                </button>
              )}
              {item.pdf && (
                <div className="momentum-gallery__pdf-preview">
                  <div className="momentum-gallery__pdf-heading">
                    <span>PDF preview</span>
                    <span aria-hidden="true">↘</span>
                  </div>
                  <iframe
                    src={item.pdf}
                    title={item.title + ' PDF preview'}
                    loading="lazy"
                  />
                </div>
              )}
              <div className="momentum-gallery__caption">
                <strong>{item.title}</strong>
                <span>{item.caption}</span>
                {item.pdf && (
                  <a href={item.pdf} target="_blank" rel="noreferrer">
                    Open full PDF ↗
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="momentum-gallery__rail" aria-hidden="true">
        <span style={{ transform: 'translateX(' + (progress * 100) + '%)' }} />
      </div>

      {activeImage && (
        <div className="work-lightbox" role="dialog" aria-modal="true" aria-label={activeImage.title} onClick={() => setActiveImage(null)}>
          <button className="work-lightbox__close" type="button" onClick={() => setActiveImage(null)} aria-label="Close image preview">×</button>
          <img src={activeImage.src} alt={activeImage.alt} onClick={(event) => event.stopPropagation()} />
          <p>{activeImage.title} · {activeImage.caption}</p>
        </div>
      )}
    </section>
  )
}
