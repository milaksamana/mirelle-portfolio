import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ChatCircleDots, ClipboardText, Palette, AirplaneTilt } from '@/components/slab'
import { getScroller } from '@/hooks/useLenis'

const SERVICES = [
  {
    number: '01',
    title: 'Customer support assistance',
    summary: 'Friendly, clear support that helps customers understand the next step.',
    examples: ['General inquiry responses', 'Organizing customer information', 'Following approved processes and escalating when needed'],
    Icon: ChatCircleDots,
    tag: 'CUSTOMER CARE',
  },
  {
    number: '02',
    title: 'Administrative support',
    summary: 'Practical help keeping information, records, and everyday tasks organized.',
    examples: ['Spreadsheet updates and basic tracking', 'Data organization and recordkeeping', 'Document and checklist preparation'],
    Icon: ClipboardText,
    tag: 'STAY ORGANIZED',
  },
  {
    number: '03',
    title: 'Social media & creative support',
    summary: 'Simple, consistent visual content for brands and small businesses.',
    examples: ['Canva graphics and promotional materials', 'Captions and basic social content', 'Short-form edits using CapCut or Filmora'],
    Icon: Palette,
    tag: 'CREATIVE SUPPORT',
  },
  {
    number: '04',
    title: 'Travel support',
    summary: 'Experience-informed assistance for travel-related requests and itinerary changes.',
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
      const distance = Math.max(0, track.scrollWidth - stage.clientWidth)
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
    <>
      <section className="services-horizontal va-page" aria-labelledby="services-title" ref={sectionRef} data-static="false">
        <div className="services-stage" ref={stageRef}>
          <header className="va-page__head services-stage__head">
            <span className="va-eyebrow">Services · Explore horizontally</span>
            <h1 id="services-title">Practical support, with care in the details.</h1>
            <p>I’m building my General Virtual Assistant services around the work I know, the tools I use, and the skills I’m continuing to develop.</p>
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
        <p>Every project starts with a conversation about your needs, preferred process, timeline, and scope. I’ll be transparent when a task falls outside my current experience.</p>
        <Link to="/contact" className="va-button">Discuss a task <ArrowUpRight size={17} aria-hidden="true" /></Link>
      </div>
    </>
  )
}
