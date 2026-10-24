import { Link } from 'react-router-dom'
import { ArrowUpRight, EnvelopeSimple, MapPin } from '@/components/slab'
import { profile } from '@/data/profile'

export default function ContactGrid() {
  return (
    <section className="va-page va-page--contact" aria-labelledby="contact-title">
      <header className="va-page__head">
        <span className="va-eyebrow">Contact</span>
        <h1 id="contact-title">Let’s talk about the support you need.</h1>
        <p>Need help with customer inquiries, admin tasks, travel-related requests, or simple creative content? Email me a few details, and we can see whether it’s a good fit.</p>
      </header>
      <div className="va-contact-panel">
        <span className="va-contact-panel__sun" aria-hidden="true">✳</span>
        <div>
          <span className="va-eyebrow">A good place to start</span>
          <h2>What would make your workday easier?</h2>
          <p>Tell me what you need help with, the result you’re hoping for, and any preferred timeline or tools. I’ll confirm fit, availability, scope, and pricing before we agree to anything.</p>
          {profile.email ? (
            <div className="va-contact-actions">
              <a className="va-button" href={`mailto:${profile.email}`}>Email Mirelle <EnvelopeSimple size={17} aria-hidden="true" /></a>
              <a className="va-contact-email" href={`mailto:${profile.email}`}>{profile.email}</a>
            </div>
          ) : (
            <span className="va-contact-pending"><EnvelopeSimple size={17} aria-hidden="true" /> Direct contact link to be added before launch</span>
          )}
        </div>
      </div>
      <div className="va-contact-meta">
        <div><MapPin size={18} aria-hidden="true" /><span>{profile.location}</span></div>
        <p>I’ll confirm availability, scope, timeline, and pricing before agreeing to any work.</p>
      </div>
      <div className="va-endnote">
        <p>No pressure to have every detail figured out. A short message is enough to start the conversation.</p>
        <div className="va-inline-links">
          <Link to="/about" className="va-text-link">About me <ArrowUpRight size={16} aria-hidden="true" /></Link>
          <Link to="/projects" className="va-text-link">Work samples <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  )
}
