import { Link } from 'react-router-dom'
import { ArrowUpRight, EnvelopeSimple, MapPin } from '@/components/slab'
import { profile } from '@/data/profile'

export default function ContactGrid() {
  return (
    <section className="va-page va-page--contact" aria-labelledby="contact-title">
      <header className="va-page__head">
        <span className="va-eyebrow">Contact</span>
        <h1 id="contact-title">Let’s talk about the support you need.</h1>
        <p>For General VA opportunities, customer support, administrative assistance, or simple creative tasks, email me and share a little about the support you need.</p>
      </header>
      <div className="va-contact-panel">
        <span className="va-contact-panel__sun" aria-hidden="true">✳</span>
        <div>
          <span className="va-eyebrow">A good place to start</span>
          <h2>What would make your workday easier?</h2>
          <p>Whether you need help with customer inquiries, admin organization, or simple creative tasks, a clear brief helps me understand the goal and decide whether the task is a good fit.</p>
          {profile.email ? (
            <div className="va-contact-actions">
              <a className="va-button" href={`mailto:${profile.email}`}>Email me <EnvelopeSimple size={17} aria-hidden="true" /></a>
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
        <p>Until the contact channel is ready, feel free to review my background and practice samples.</p>
        <div className="va-inline-links">
          <Link to="/about" className="va-text-link">About me <ArrowUpRight size={16} aria-hidden="true" /></Link>
          <Link to="/projects" className="va-text-link">Work samples <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  )
}
