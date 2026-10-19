import { useEffect, useRef, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from '@/components/slab'
import { getScroller } from '@/hooks/useLenis'

const EXPERIENCE = [
  {
    date: 'JUN 2025 — PRESENT',
    dateTime: '2025-06',
    role: 'Customer Service Representative · Automotive',
    place: 'Teleperformance',
    detail: 'Provide non-voice support for general vehicle-related inquiries, basic profile updates, recall and warranty status checks, and reimbursement requests. Technical diagnosis and specialist decisions are routed to the appropriate team.',
  },
  {
    date: 'SEP — DEC 2025',
    dateTime: '2025-09',
    role: 'Subject Matter Expert assignment',
    place: 'Teleperformance · Additional responsibility',
    detail: 'Reviewed chat interactions, helped teammates follow processes and navigate tools, and identified gaps in handling. Returned to the agent role after the assignment and continued focusing on consistent performance.',
  },
  {
    date: 'DEC 2024 — EARLY 2025',
    dateTime: '2024-12',
    role: 'Social Media Associate · Travel support',
    place: 'IGT Technologies Philippines, Inc.',
    detail: 'Supported travel-related requests involving bookings, itinerary and flight modifications, cancellations, travel disruptions, baggage, pets, and related service questions using Amadeus GDS.',
  },
  {
    date: 'JUL — SEP 2024',
    dateTime: '2024-07',
    role: 'Systems & Methods Intern',
    place: 'Northpoint Development Bank',
    detail: 'Assisted with project monitoring and gap analysis as part of an internship / OJT placement.',
  },
  {
    date: 'MAR 2022 — MAR 2023',
    dateTime: '2022-03',
    role: 'Digital Marketing Assistant',
    place: 'HotShoe Photocinema',
    detail: 'Created Canva promotional graphics, social media ad materials, captions, brochures, and publication materials for a photo and video business.',
  },
  {
    date: '2020',
    dateTime: '2020',
    role: 'Finance Assistant',
    place: 'Motorcentral Finance',
    detail: 'Recorded and cross-checked daily receipts in spreadsheets.',
  },
]

export default function AboutGrid() {
  const timelineRef = useRef<HTMLOListElement>(null)

  useEffect(() => {
    const timeline = timelineRef.current
    if (!timeline) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduced.matches) {
      timeline.dataset.revealed = 'true'
      return
    }
    const root = window.innerWidth >= 1100 ? getScroller() : null
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        timeline.dataset.revealed = 'true'
        observer.disconnect()
      }
    }, { root, threshold: 0.16 })
    observer.observe(timeline)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="va-page" aria-labelledby="about-title">
      <header className="va-page__head">
        <span className="va-eyebrow">About me</span>
        <h1 id="about-title">Hi, I’m Mirelle.</h1>
        <p className="va-lede">Customer support professional bringing clear communication, organized administrative help, and thoughtful creative support.</p>
      </header>
      <div className="va-about-intro">
        <p>I enjoy bringing order to information, helping people find the next step, and learning tools that make work easier. My background spans non-voice customer service, travel support, SME guidance, spreadsheet-based tasks, and digital marketing assistance.</p>
        <p>I’m a fast learner, an active listener, and an observant teammate. I try to stay calm under pressure, communicate clearly, and ask rather than assume when a process needs clarification.</p>
      </div>
      <section className="va-subsection" aria-labelledby="experience-title">
        <div className="va-subsection__head">
          <span className="va-eyebrow">Work history</span>
          <h2 id="experience-title">Experience that shaped how I work.</h2>
        </div>
        <ol className="va-timeline" ref={timelineRef}>
          {EXPERIENCE.map((item, index) => (
            <li key={item.role} className="va-timeline__item" style={{ '--timeline-index': index } as CSSProperties}>
              <span className="va-timeline__dot" aria-hidden="true" />
              <article className="va-timeline__card" tabIndex={0}>
                <time className="va-timeline__date" dateTime={item.dateTime}>{item.date}</time>
                <h3>{item.role}</h3>
                <p className="va-timeline__place">{item.place}</p>
                <p>{item.detail}</p>
              </article>
            </li>
          ))}
        </ol>
      </section>
      <div className="va-endnote">
        <p>My next step is to bring these skills into a General VA role, keep learning, and build trust through reliable day-to-day support.</p>
        <Link to="/services" className="va-button">Explore my services <ArrowUpRight size={17} aria-hidden="true" /></Link>
      </div>
    </section>
  )
}
