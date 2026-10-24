import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ChatCircleDots, ClipboardText, Palette, AirplaneTilt } from '@/components/slab'
import { getScroller } from '@/hooks/useLenis'

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
]

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

export default function ServicesGrid() {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    const stage = stageRef.current
    const track = trackRef.current
    const viewport = stage?.querySelector<HTMLElement>('.services-track-window')
    const scroller = getScroller()
    if (!section || !stage || !track || !viewport || !scroller) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let travel = 0

    const measure = () => {
      if (window.innerWidth < 1100 || reducedMotion.matches) {
        section.style.height = ''
        track.style.transform = ''
        section.dataset.static = 'true'
        return
      }

      section.dataset.static = 'false'
      travel = Math.max(0, track.scrollWidth - viewport.clientWidth)
      section.style.height = `${stage.clientHeight + travel}px`
      schedule()
    }

    const update = () => {
      frameRef.current = null
      if (window.innerWidth < 1100 || reducedMotion.matches) return

      const sectionTop = section.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop
      const maxScroll = Math.max(0, section.offsetHeight - stage.clientHeight)
      const progress = maxScroll > 0 ? clamp(scroller.scrollTop - sectionTop, 0, maxScroll) / maxScroll : 0
      const distance = Math.max(0, track.scrollWidth - viewport.clientWidth)
      track.style.transform = `translate3d(${-progress * distance}px, 0, 0)`

      let closest: HTMLElement | null = null
      let closestDistance = Number.POSITIVE_INFINITY
      const center = viewport.getBoundingClientRect().left + viewport.clientWidth / 2
      track.querySelectorAll<HTMLElement>('.service-panel').forEach((card) => {
        const rect = card.getBoundingClientRect()
        const distanceFromCenter = Math.abs(rect.left + rect.width / 2 - center)
        const active = distanceFromCenter < closestDistance
        if (active) {
          closestDistance = distanceFromCenter
          closest = card
        }
      })
      track.querySelectorAll<HTMLElement>('.service-panel').forEach((card) => {
        if (card === closest) card.dataset.active = 'true'
        else delete card.dataset.active
      })
      const progressBar = stage.querySelector<HTMLElement>('.services-progress__fill')
      if (progressBar) progressBar.style.transform = `scaleX(${progress})`
    }

    function schedule() {
      if (frameRef.current === null) frameRef.current = requestAnimationFrame(update)
    }

    const resizeObserver = new ResizeObserver(measure)
    resizeObserver.observe(stage)
    resizeObserver.observe(track)
    scroller.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', measure)
    reducedMotion.addEventListener('change', measure)
    measure()
    schedule()

    return () => {
      resizeObserver.disconnect()
      scroller.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', measure)
      reducedMotion.removeEventListener('change', measure)
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
      section.style.height = ''
      track.style.transform = ''
    }
  }, [])

  return (
    <div className="services-page-wrap">
      <section className="services-horizontal va-page" aria-labelledby="services-title" ref={sectionRef} data-static="false">
        <div className="services-stage" ref={stageRef}>
          <header className="va-page__head services-stage__head">
            <span className="va-eyebrow">How I can help</span>
            <h1 id="services-title">Reliable support for the work behind your business.</h1>
            <p>From customer inquiries and admin organization to travel-related requests and simple creative content, I help keep day-to-day tasks moving with care and clear communication.</p>
          </header>

          <div className="services-track-window">
            <div className="services-track" ref={trackRef}>
              {SERVICES.map(({ Icon, ...service }) => (
                <article className="service-panel" key={service.number}>
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

          <div className="services-stage__hint" aria-hidden="true">
            <span>Scroll to explore</span><span className="services-stage__hint-arrow">→</span>
          </div>
          <div className="services-progress" aria-hidden="true"><span className="services-progress__fill" /></div>
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
