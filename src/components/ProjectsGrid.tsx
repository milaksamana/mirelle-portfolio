import { useEffect, useRef, type RefObject } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from '@/components/slab'
import WorkTicker from './WorkTicker'

function useWorkSpotlight(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = ref.current
    if (!root) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    root.style.setProperty('--x', '50%')
    root.style.setProperty('--y', '42%')
    if (reducedMotion.matches) return

    let autoFrame = 0
    let pointerFrame: number | null = null
    let pointerX = 50
    let pointerY = 42
    let lastPointerAt = Number.NEGATIVE_INFINITY
    const start = performance.now()

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return
      const rect = root.getBoundingClientRect()
      pointerX = event.clientX - rect.left
      pointerY = event.clientY - rect.top
      lastPointerAt = performance.now()
      if (pointerFrame !== null) return
      pointerFrame = requestAnimationFrame(() => {
        root.style.setProperty('--x', `${pointerX}px`)
        root.style.setProperty('--y', `${pointerY}px`)
        pointerFrame = null
      })
    }

    const tick = (now: number) => {
      if (now - lastPointerAt > 2200) {
        const t = (now - start) / 1000
        const x = 50 + 29 * Math.sin(t * 0.17 + 0.4)
        const y = 48 + 24 * Math.sin(t * 0.11 + 1.25)
        root.style.setProperty('--x', `${x}%`)
        root.style.setProperty('--y', `${y}%`)
      }
      autoFrame = requestAnimationFrame(tick)
    }

    root.addEventListener('pointermove', onPointerMove, { passive: true })
    autoFrame = requestAnimationFrame(tick)
    return () => {
      root.removeEventListener('pointermove', onPointerMove)
      cancelAnimationFrame(autoFrame)
      if (pointerFrame !== null) cancelAnimationFrame(pointerFrame)
    }
  }, [ref])
}

const WORK = [
  {
    number: '01',
    category: 'VIDEO EDITING',
    title: 'Short-form video edit',
    summary: 'A sample edit with pacing, cuts, and simple text treatment using tools such as CapCut or Filmora.',
    note: 'YOUR VIDEO SAMPLE GOES HERE',
    kind: 'video',
  },
  {
    number: '02',
    category: 'BROCHURE DESIGN',
    title: 'Company brochure package',
    summary: 'A coordinated set of brochure pages prepared for one company, presented as one project rather than separate pieces.',
    note: 'YOUR BROCHURE PAGES GO HERE',
    kind: 'brochure',
  },
  {
    number: '03',
    category: 'PROMOTIONAL & PUBLICATION MATERIALS',
    title: 'Posters and publication layouts',
    summary: 'Promotional posters and other publication materials made to communicate information clearly and consistently.',
    note: 'YOUR POSTERS GO HERE',
    kind: 'posters',
  },
]

export default function ProjectsGrid() {
  const workRef = useRef<HTMLElement>(null)
  useWorkSpotlight(workRef)

  return (
    <section className="va-page work-page" aria-labelledby="samples-title" ref={workRef}>
      <header className="va-page__head work-page__head">
        <span className="va-eyebrow">Selected work · In progress</span>
        <h1 id="samples-title">Creative work, thoughtful details.</h1>
        <p>Browse my video-editing, brochure, and publication-design categories. I’ll replace the clearly marked sample spaces with finished files as I add each piece to this portfolio.</p>
      </header>

      <WorkTicker />

      <div className="work-gallery">
        {WORK.map((sample) => (
          <article className={`work-card work-card--${sample.kind}`} key={sample.number}>
            <div className={`work-card__art work-card__art--${sample.kind}`} aria-label={sample.note}>
              {sample.kind === 'video' && (
                <div className="work-placeholder work-placeholder--video">
                  <span className="work-placeholder__eyebrow">VIDEO PREVIEW</span>
                  <span className="work-placeholder__play" aria-hidden="true">▶</span>
                  <span className="work-placeholder__caption">{sample.note}</span>
                  <span className="work-placeholder__timeline" aria-hidden="true"><i /><i /><i /><i /><i /></span>
                </div>
              )}
              {sample.kind === 'brochure' && (
                <div className="work-brochure-stack" aria-hidden="true">
                  <div className="work-brochure work-brochure--back"><span>PAGE 03</span><i /></div>
                  <div className="work-brochure work-brochure--mid"><span>PAGE 02</span><i /></div>
                  <div className="work-brochure work-brochure--front"><span>BROCHURE</span><b>YOUR PAGES<br />GO HERE</b><i /></div>
                </div>
              )}
              {sample.kind === 'posters' && (
                <div className="work-poster-set" aria-hidden="true">
                  <div className="work-poster work-poster--one"><small>PUBLICATION</small><b>YOUR<br />POSTER</b><i /></div>
                  <div className="work-poster work-poster--two"><small>PROMO</small><b>YOUR<br />DESIGN</b><i /></div>
                  <div className="work-poster work-poster--three"><small>LAYOUT</small><b>YOUR<br />WORK</b><i /></div>
                </div>
              )}
            </div>
            <div className="work-card__copy">
              <div className="work-card__top"><span className="work-card__number">{sample.number}</span><span className="work-card__category">{sample.category}</span></div>
              <h2>{sample.title}</h2>
              <p>{sample.summary}</p>
              <span className="work-card__status"><i aria-hidden="true" /> Sample space · awaiting upload</span>
            </div>
          </article>
        ))}

        <article className="work-card work-card--website">
          <div className="work-card__art work-card__art--website" aria-hidden="true">
            <div className="work-browser">
              <div className="work-browser__bar"><i /><i /><i /><span>mirelle-portfolio</span></div>
              <div className="work-browser__body">
                <span className="work-browser__eyebrow">PERSONAL PORTFOLIO</span>
                <strong>Thoughtful support.<br /><em>Creative assistance.</em></strong>
                <span className="work-browser__line" /><span className="work-browser__line work-browser__line--short" />
                <div className="work-browser__button">Explore my work ↗</div>
              </div>
            </div>
          </div>
          <div className="work-card__copy">
            <div className="work-card__top"><span className="work-card__number">04</span><span className="work-card__category">WEB DESIGN · LEARNING PROJECT</span></div>
            <h2>This portfolio website</h2>
            <p>An ongoing personal project, customized from a starter template while I learn more about web layouts, React, CSS, and GitHub.</p>
            <Link to="/" className="va-text-link">View homepage <ArrowUpRight size={16} aria-hidden="true" /></Link>
          </div>
        </article>
      </div>

      <div className="va-endnote work-endnote">
        <p>These spaces are placeholders—not finished client deliverables. Each will be replaced with my real sample output and any relevant project context.</p>
        <Link to="/contact" className="va-button">Discuss a task <ArrowUpRight size={17} aria-hidden="true" /></Link>
      </div>
    </section>
  )
}
