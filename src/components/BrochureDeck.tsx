import { useRef } from 'react'

type Card = { title: string; description: string; href: string; label: string }

const CARDS: Card[] = [
  { title: 'Debut Packages', description: 'Sanz Studio by HotShoe · Event photography package brochure', href: '/samples/brochures/debut-package-2023.pdf', label: 'Photography brochure' },
  { title: 'Wedding Packages', description: 'Sanz Studio by HotShoe · Wedding photography and video packages', href: '/samples/brochures/wedding-packages-2023.pdf', label: 'Photography brochure' },
  { title: 'Kiddie Packages', description: 'Sanz Studio by HotShoe · Children’s event photography packages', href: '/samples/brochures/kiddie-packages-2023.pdf', label: 'Photography brochure' },
]

function scrollPackages(track: HTMLDivElement | null, direction: -1 | 1) {
  if (!track) return
  track.scrollBy({
    left: direction * Math.max(280, track.clientWidth * 0.85),
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
  })
}

function discourageSaving(event: React.SyntheticEvent) {
  event.preventDefault()
}

export default function BrochureDeck() {
  const trackRef = useRef<HTMLDivElement>(null)

  return (
    <section className="brochure-deck" aria-labelledby="brochure-deck-title">
      <div className="work-section-heading">
        <span className="va-eyebrow">Brochure Package</span>
        <h2 id="brochure-deck-title">Explore the packages right here.</h2>
        <p>Browse each brochure directly on this page. The previews stay within the portfolio, with no separate open or download buttons.</p>
      </div>

      <div className="brochure-deck__controls" aria-label="Package brochure navigation">
        <p>Three Sanz Studio by HotShoe brochures · Inline document previews</p>
        <div className="brochure-deck__buttons">
          <button type="button" onClick={() => scrollPackages(trackRef.current, -1)} aria-label="Scroll packages left">← Previous</button>
          <button type="button" onClick={() => scrollPackages(trackRef.current, 1)} aria-label="Scroll packages right">Next →</button>
        </div>
      </div>

      <div
        className="brochure-deck__track"
        ref={trackRef}
        tabIndex={0}
        role="region"
        aria-label="Horizontally scrollable event package PDF previews"
        onContextMenu={discourageSaving}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft') { event.preventDefault(); scrollPackages(trackRef.current, -1) }
          if (event.key === 'ArrowRight') { event.preventDefault(); scrollPackages(trackRef.current, 1) }
        }}
      >
        {CARDS.map((card) => (
          <article className="brochure-deck__card" key={card.href}>
            <div className="brochure-deck__card-top">
              <span className="brochure-deck__card-label">{card.label}</span>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
            <div className="brochure-deck__pdf-preview" onContextMenu={discourageSaving}>
              <iframe
                src={card.href + '#toolbar=0&navpanes=0&scrollbar=0'}
                title={card.title + ' inline PDF preview'}
                loading="lazy"
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
