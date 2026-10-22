import { useState } from 'react'

type Card = { title: string; description: string; href: string; label: string }

const INITIAL_CARDS: Card[] = [
  { title: 'Mini Donut Menu', description: 'Baker Bee · Flavors, toppings, and package options', href: '/samples/brochures/baker-bee-mini-donut-menu.pdf', label: 'Menu design' },
  { title: 'Mini Donut Branding', description: 'Baker Bee · Brand and promotional material', href: '/samples/brochures/baker-bee-mini-donut-branding.pdf', label: 'Branding PDF' },
]

export default function BrochureDeck() {
  const [cards, setCards] = useState(INITIAL_CARDS)
  const [drag, setDrag] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const [start, setStart] = useState({ x: 0, y: 0, time: 0 })

  const swipe = (direction: -1 | 1) => {
    if (leaving || cards.length < 2) return
    setLeaving(true)
    setDrag({ x: direction * 520, y: -35 })
    window.setTimeout(() => {
      setCards((current) => [...current.slice(1), current[0]])
      setDrag({ x: 0, y: 0 })
      setLeaving(false)
    }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 520)
  }

  const onDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (leaving) return
    setStart({ x: e.clientX, y: e.clientY, time: performance.now() })
    setDrag({ x: 0, y: 0 })
    setDragging(true)
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return
    setDrag({ x: e.clientX - start.x, y: e.clientY - start.y })
  }
  const onUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return
    setDragging(false)
    if (Math.abs(drag.x) > 50 || (performance.now() - start.time < 220 && Math.abs(drag.x) > 18)) {
      swipe(drag.x < 0 ? -1 : 1)
    } else setDrag({ x: 0, y: 0 })
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId)
  }

  return (
    <section className="brochure-deck" aria-labelledby="brochure-deck-title">
      <div className="work-section-heading">
        <span className="va-eyebrow">Brochure & menu documents</span>
        <h2 id="brochure-deck-title">Swipe through the pages.</h2>
        <p>Drag or use your keyboard to cycle through the available PDF samples. Select a card to open the full document.</p>
      </div>
      <div className="brochure-deck__layout">
        <div className="brochure-deck__stage" tabIndex={0} role="region" aria-label="Swipeable brochure card deck. Use left and right arrow keys to cycle through cards." onKeyDown={(e) => { if (e.key === 'ArrowLeft') { e.preventDefault(); swipe(-1) } if (e.key === 'ArrowRight') { e.preventDefault(); swipe(1) } }}>
          {cards.map((card, index) => (
            <div
              className={`brochure-deck__card ${index === 0 && dragging ? 'is-dragging' : ''} ${index === 0 && leaving ? 'is-leaving' : ''}`}
              key={card.href}
              style={{
                zIndex: cards.length - index,
                transform: index === 0 ? `translate(${drag.x}px, ${drag.y * 0.3}px) rotate(${drag.x * 0.07}deg)` : `translateY(${index * 10}px) scale(${1 - index * 0.055})`,
                opacity: index > 3 ? 0 : 1,
                transition: index === 0 && dragging ? 'none' : 'transform 520ms cubic-bezier(.3,.7,.2,1), opacity 520ms cubic-bezier(.3,.7,.2,1)',
              }}
              onPointerDown={index === 0 ? onDown : undefined}
              onPointerMove={index === 0 ? onMove : undefined}
              onPointerUp={index === 0 ? onUp : undefined}
              onPointerCancel={index === 0 ? onUp : undefined}
            >
              <a href={card.href} target="_blank" rel="noreferrer" className="brochure-deck__card-link" onClick={(e) => { if (Math.abs(drag.x) > 8 || leaving) e.preventDefault() }}>
                <span className="brochure-deck__card-label">{card.label}</span>
                <strong>{card.title}</strong>
                <span>{card.description}</span>
                <span className="brochure-deck__open">Open PDF ↗</span>
              </a>
            </div>
          ))}
        </div>
        <div className="brochure-deck__controls">
          <p>Swipe to browse the deck, then open a PDF to view the complete design.</p>
          <div className="brochure-deck__buttons">
            <button type="button" onClick={() => swipe(-1)} disabled={leaving}>← Previous</button>
            <button type="button" onClick={() => swipe(1)} disabled={leaving}>Next →</button>
          </div>
          <span className="brochure-deck__count">Showing {cards[0]?.title}</span>
        </div>
      </div>
    </section>
  )
}
