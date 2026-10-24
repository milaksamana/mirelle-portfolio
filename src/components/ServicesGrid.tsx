import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ChatCircleDots, ClipboardText, Palette, AirplaneTilt } from '@/components/slab'

const SERVICES = [
  {
    number: '01',
    title: 'Customer support assistance',
    summary: 'Clear, courteous responses that help customers understand their options and next steps.',
    examples: ['General inquiry responses', 'Accurate customer information updates', 'Following approved processes and escalating complex issues'],
    Icon: ChatCircleDots,
    tag: 'CUSTOMER CARE',
  },
  {
    number: '02',
    title: 'Administrative support',
    summary: 'Keep everyday information, records, and recurring tasks organized so details are easy to find and follow up on.',
    examples: ['Spreadsheet updates and basic tracking', 'Data organization and recordkeeping', 'Document and checklist preparation'],
    Icon: ClipboardText,
    tag: 'STAY ORGANIZED',
  },
  {
    number: '03',
    title: 'Social media & creative support',
    summary: 'Simple, on-brand visuals and short-form edits to help keep your content consistent.',
    examples: ['Canva graphics and promotional materials', 'Captions and basic social content', 'Short-form edits using CapCut or Filmora'],
    Icon: Palette,
    tag: 'CREATIVE CONTENT',
  },
  {
    number: '04',
    title: 'Travel support',
    summary: 'Experience-informed support for travel-related inquiries, itinerary changes, and disruption requests.',
    examples: ['Booking and itinerary support', 'Flight change and disruption requests', 'Familiarity with Amadeus GDS workflows'],
    Icon: AirplaneTilt,
    tag: 'TRAVEL WORKFLOWS',
  },
] as const

type Direction = -1 | 1

export default function ServicesGrid() {
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)

  const updateScroll = useCallback(() => {
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!viewport || !track) return

    const maxScroll = Math.max(0, viewport.scrollWidth - viewport.clientWidth)
    setProgress(maxScroll === 0 ? 0 : Math.min(1, Math.max(0, viewport.scrollLeft / maxScroll)))

    const center = viewport.getBoundingClientRect().left + viewport.clientWidth / 2
    let nearestIndex = 0
    let nearestDistance = Number.POSITIVE_INFINITY
    track.querySelectorAll<HTMLElement>('.service-panel').forEach((card, index) => {
      const rect = card.getBoundingClientRect()
      const distance = Math.abs(rect.left + rect.width / 2 - center)
      if (distance < nearestDistance) {
        nearestDistance = distance
        nearestIndex = index
      }
    })
    setActiveIndex(nearestIndex)
  }, [])

  const scrollServices = useCallback((direction: Direction) => {
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!viewport || !track) return

    const firstCard = track.querySelector<HTMLElement>('.service-panel')
    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap || window.getComputedStyle(track).gap) || 24
    const distance = firstCard ? firstCard.getBoundingClientRect().width + gap : viewport.clientWidth * 0.85

    viewport.scrollBy({
      left: direction * distance,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    })
  }, [])

  useEffect(() => {
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!viewport || !track) return

    updateScroll()
    const observer = new ResizeObserver(updateScroll)
    observer.observe(viewport)
    observer.observe(track)
    return () => observer.disconnect()
  }, [updateScroll])

  return (
    <div className="services-page-wrap">
      <section className="services-horizontal va-page" aria-labelledby="services-title">
        <div className="services-stage">
          <header className="va-page__head services-stage__head">
            <span className="va-eyebrow">How I can help</span>
            <h1 id="services-title">Reliable support for the work behind your business.</h1>
            <p>From customer inquiries and admin organization to travel-related requests and simple creative content, I help keep day-to-day tasks moving with care and clear communication.</p>
          </header>

          <div
            className="services-track-window"
            ref={viewportRef}
            tabIndex={0}
            role="region"
            aria-label="Horizontally scrollable service cards"
            onScroll={updateScroll}
            onKeyDown={(event) => {
              if (event.target !== event.currentTarget) return
              if (event.key === 'ArrowLeft') {
                event.preventDefault()
                scrollServices(-1)
              }
              if (event.key === 'ArrowRight') {
                event.preventDefault()
                scrollServices(1)
              }
            }}
          >
            <div className="services-track" ref={trackRef}>
              {SERVICES.map(({ Icon, ...service }, index) => (
                <article
                  className="service-panel"
                  key={service.number}
                  data-active={activeIndex === index ? 'true' : undefined}
                >
                  <div className="service-panel__top">
                    <span className="service-panel__icon"><Icon size={25} weight="duotone" aria-hidden="true" /></span>
                    <span className="service-panel__number">{service.number}</span>
                  </div>
                  <span className="service-panel__tag">{service.tag}</span>
                  <h2>{service.title}</h2>
                  <p className="service-panel__summary">{service.summary}</p>
                  <ul>
                    {service.examples.map((example) => <li key={example}>{example}</li>)}
                  </ul>
                  <span className="service-panel__foot">A thoughtful next step, every time.</span>
                </article>
              ))}
            </div>
          </div>

          <div className="services-stage__hint">
            <span>Service {String(activeIndex + 1).padStart(2, '0')} of {String(SERVICES.length).padStart(2, '0')} · Scroll or swipe to explore</span>
            <div className="services-stage__controls" aria-label="Service card navigation">
              <button type="button" onClick={() => scrollServices(-1)} disabled={activeIndex === 0} aria-label="Previous service">←</button>
              <button type="button" onClick={() => scrollServices(1)} disabled={activeIndex === SERVICES.length - 1} aria-label="Next service">→</button>
            </div>
          </div>
          <div className="services-progress" aria-hidden="true">
            <span className="services-progress__fill" style={{ transform: `scaleX(${progress})` }} />
          </div>
        </div>
      </section>
      <div className="va-endnote services-endnote">
        <div className="va-endnote__copy">
          <h2>Not sure what kind of support you need?</h2>
          <p>Tell me what’s taking up your time, and we can discuss the task, your preferred process, scope, and timeline. I’ll be upfront if something falls outside my current experience.</p>
        </div>
        <Link to="/contact" className="va-button">Discuss your support needs <ArrowUpRight size={17} aria-hidden="true" /></Link>
      </div>
    </div>
  )
}
