import { useEffect, useRef } from 'react'

const STEPS = [
  {
    number: '01',
    label: 'TRAVEL SUPPORT',
    title: 'Details matter when plans change.',
    body: 'Working with travel requests taught me to check itineraries carefully, explain options clearly, and keep the next step visible when plans shift.',
  },
  {
    number: '02',
    label: 'CUSTOMER SUPPORT & SME',
    title: 'Good support is a mix of care and process.',
    body: 'In automotive chat support and my SME assignment, I learned to follow approved workflows, help teammates navigate tools, and escalate what needs specialist review.',
  },
  {
    number: '03',
    label: 'CREATIVE WORK & LEARNING',
    title: 'I keep building on what I know.',
    body: 'My digital marketing experience introduced me to Canva graphics and publication materials. Now I’m growing those skills alongside website design and short-form editing.',
  },
]

export default function HomeStory() {
  const wrapRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    const root = window.innerWidth >= 1100 ? document.getElementById('main-content') : null
    const steps = Array.from(wrap.querySelectorAll<HTMLElement>('.home-story__step'))
    if (!steps.length) return

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (!visible) return
      const index = steps.indexOf(visible.target as HTMLElement)
      if (index >= 0) wrap.dataset.step = String(index + 1)
    }, { root, rootMargin: '-45% 0px -45% 0px', threshold: 0 })

    steps.forEach((step) => observer.observe(step))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="home-story" aria-labelledby="home-story-title" ref={wrapRef} data-step="1">
      <h2 className="sr-only" id="home-story-title">The experience and creative work behind my support</h2>
      <div className="home-story__scene" aria-hidden="true">
        <div className="home-story__orbit home-story__orbit--one" />
        <div className="home-story__orbit home-story__orbit--two" />
        <div className="home-story__shape"><span>M</span></div>
        <span className="home-story__scene-label">EXPERIENCE · CARE · CURIOSITY</span>
      </div>
      <div className="home-story__steps">
        {STEPS.map((step) => (
          <article className="home-story__step" key={step.number}>
            <div className="home-story__card">
              <span className="va-eyebrow">{step.label}</span>
              <span className="home-story__number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
