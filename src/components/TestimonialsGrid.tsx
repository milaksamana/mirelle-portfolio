import { Link } from 'react-router-dom'
import { ArrowUpRight } from '@/components/slab'

const COLUMNS = [
  [
    'I want to understand the request before jumping to a solution.',
    'A clear update can make the next step feel much easier.',
    'I pay attention to the small details because they shape the overall experience.',
    'When something needs specialist review, I’d rather escalate carefully than guess.',
  ],
  [
    'Working together should feel like a shared effort—not a guessing game.',
    'I welcome feedback because it helps me improve the way I work.',
    'I try to keep information organized so the next person can pick up where I left off.',
    'Learning a new tool starts with curiosity, patience, and practice.',
  ],
  [
    'I believe consistency is built through the little things done thoughtfully.',
    'Good support combines empathy with a reliable process.',
    'I want to be honest about what I know and proactive about what I’m still learning.',
    'The goal is to make busy workdays feel a little more manageable.',
  ],
]

function PrincipleCard({ quote }: { quote: string }) {
  return (
    <figure className="principle-card">
      <figcaption className="principle-card__author">
        <span className="principle-card__avatar" aria-hidden="true">ML</span>
        <span className="principle-card__author-copy">
          <strong>Mirelle Laksamana</strong>
          <span>Working principle</span>
        </span>
      </figcaption>
      <blockquote><p>{quote}</p></blockquote>
    </figure>
  )
}

function PrincipleColumn({ quotes, index }: { quotes: string[]; index: number }) {
  const cards = (clone: boolean) => (
    <div className="principle-set" aria-hidden={clone || undefined}>
      {quotes.map((quote, i) => <PrincipleCard quote={quote} key={`${i}-${quote}`} />)}
    </div>
  )
  return (
    <div className={`principle-column principle-column--${index + 1}`}>
      <div className="principle-column__viewport">
        <div className="principle-track">
          {cards(false)}
          {cards(true)}
        </div>
      </div>
    </div>
  )
}

export default function TestimonialsGrid() {
  return (
    <section className="va-page approach-wall-page" aria-labelledby="approach-title">
      <header className="va-page__head">
        <span className="va-eyebrow">My approach</span>
        <h1 id="approach-title">How I aim to work with you.</h1>
        <p>These are my own working principles, not client testimonials. They describe the care, communication, and follow-through I want to bring to a working relationship.</p>
      </header>

      <div className="principle-columns" aria-label="Mirelle’s working principles">
        {COLUMNS.map((quotes, index) => <PrincipleColumn quotes={quotes} index={index} key={index} />)}
      </div>

      <div className="va-endnote">
        <p>Every team has its own tools and expectations. I aim to understand the workflow, ask useful questions, and contribute steadily.</p>
        <Link to="/contact" className="va-button">Start a conversation <ArrowUpRight size={16} aria-hidden="true" /></Link>
      </div>
    </section>
  )
}
