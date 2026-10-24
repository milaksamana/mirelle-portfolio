import { Link } from 'react-router-dom'
import { ArrowUpRight } from '@/components/slab'

const COLUMNS = [
  [
    'I clarify the goal and expected outcome before I start.',
    'I keep updates clear so you know what’s done and what’s next.',
    'I double-check important details before marking a task complete.',
    'I follow approved processes and escalate issues outside my scope.',
  ],
  [
    'I treat collaboration as a shared workflow, not a guessing game.',
    'I welcome feedback and apply it to the next task.',
    'I keep notes and files organized so work is easy to pick up.',
    'When I use a new tool, I learn the basics and test carefully before relying on it.',
  ],
  [
    'I value consistent, careful work over rushed output.',
    'I pair empathy with process when supporting customers.',
    'I communicate honestly about progress, limitations, and what I need to clarify.',
    'My goal is to take small but meaningful tasks off your plate.',
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
        <h1 id="approach-title">Clear communication makes good support work.</h1>
        <p>These are my working principles—not client testimonials—so you know what to expect: care with details, honest updates, and consistent follow-through.</p>
      </header>

      <div className="principle-columns" aria-label="Mirelle’s working principles">
        {COLUMNS.map((quotes, index) => <PrincipleColumn quotes={quotes} index={index} key={index} />)}
      </div>

      <div className="va-endnote">
        <p>I’ll learn your workflow, ask useful questions, and communicate progress so you know what’s done and what needs attention.</p>
        <Link to="/contact" className="va-button">Start a conversation <ArrowUpRight size={16} aria-hidden="true" /></Link>
      </div>
    </section>
  )
}
