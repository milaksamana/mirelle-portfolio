import { Link } from 'react-router-dom'
import { ArrowUpRight } from '@/components/slab'

const SKILLS = [
  { label: 'Customer communication', detail: 'Listening closely, writing clear non-voice responses, and explaining the next step.' },
  { label: 'Process & organization', detail: 'Following documented steps, tracking details, and helping teammates navigate processes.' },
  { label: 'Creative assistance', detail: 'Making practical Canva graphics and editing short-form videos with accessible tools.' },
  { label: 'Continuous learning', detail: 'Developing web design, Figma, GitHub, and landing-page fundamentals through self-directed projects.' },
]

export default function ShowcaseGrid() {
  return (
    <section className="va-page" aria-labelledby="journey-title">
      <header className="va-page__head">
        <span className="va-eyebrow">My journey</span>
        <h1 id="journey-title">From customer support to broader virtual assistance.</h1>
        <p>My experience in customer communication, travel workflows, SME support, and creative work gives me a practical foundation for General VA support.</p>
      </header>
      <div className="va-journey-note">
        <span className="va-journey-note__mark">M</span>
        <div>
          <span className="va-eyebrow">The direction</span>
          <h2>Reliable support, thoughtful details, and creative help when it’s needed.</h2>
          <p>My direction is simple: reliable support, thoughtful handling of details, and clear communication. I’m also learning website design, landing-page structure, and funnel fundamentals through self-directed projects; these are learning goals, not services I currently advertise as advanced expertise.</p>
        </div>
      </div>
      <div className="va-skill-list">
        {SKILLS.map((skill, index) => (
          <article className="va-skill" key={skill.label}>
            <span className="va-skill__num">0{index + 1}</span>
            <div><h2>{skill.label}</h2><p>{skill.detail}</p></div>
          </article>
        ))}
      </div>
      <div className="va-endnote">
        <p>See how my customer support, travel operations, and creative experience translate into practical support.</p>
        <Link to="/projects" className="va-button">Explore my work samples <ArrowUpRight size={17} aria-hidden="true" /></Link>
      </div>
    </section>
  )
}
