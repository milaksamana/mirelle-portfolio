import { ArrowUpRight } from '@/components/slab'
import MomentumGallery from './MomentumGallery'
import BrochureDeck from './BrochureDeck'
import VideoPanels from './VideoPanels'
import { Link } from 'react-router-dom'

export default function ProjectsGrid() {
  return (
    <section className="va-page work-page" aria-labelledby="samples-title">
      <header className="va-page__head work-page__head">
        <span className="va-eyebrow">Work samples & practice projects</span>
        <h1 id="samples-title">Creative work for small-business needs.</h1>
        <p>Explore promotional graphics, event-package brochures, short-form video edits, and a self-directed website project. Professional experience and learning projects are clearly identified.</p>
      </header>

      <MomentumGallery />
      <BrochureDeck />
      <VideoPanels />

      <section className="work-website-project" aria-labelledby="website-project-title">
        <div className="work-website-project__art" aria-hidden="true">
          <div className="work-browser">
            <div className="work-browser__bar">
              <span className="work-browser__dots"><i /><i /><i /></span>
              <span className="work-browser__address"><span>mirelle-portfolio</span><span>responsive preview</span></span>
              <span className="work-browser__status">Live concept</span>
            </div>
            <div className="work-browser__canvas">
              <div className="work-browser__nav"><span className="work-browser__brand">M<span>.</span></span><span>ABOUT&nbsp;&nbsp; SERVICES&nbsp;&nbsp; MY WORK</span><span className="work-browser__nav-cta">LET'S TALK ↗</span></div>
              <div className="work-browser__hero">
                <div className="work-browser__hero-copy">
                  <span className="work-browser__eyebrow">VIRTUAL ASSISTANT PORTFOLIO</span>
                  <strong>Thoughtful support.<br /><em>Creative assistance.</em></strong>
                  <span className="work-browser__line" /><span className="work-browser__line work-browser__line--short" />
                  <span className="work-browser__button">Explore my work ↗</span>
                </div>
                <div className="work-browser__portrait"><span>M.</span><small>ADMIN · SUPPORT · CREATIVE</small></div>
              </div>
              <div className="work-browser__services">
                <span>01&nbsp; ADMIN SUPPORT</span><span>02&nbsp; CUSTOMER CARE</span><span>03&nbsp; CREATIVE HELP</span>
              </div>
            </div>
          </div>
          <p className="work-browser__caption">A responsive layout concept · Desktop and split-screen friendly</p>
        </div>
        <div className="work-website-project__copy">
          <span className="va-eyebrow">Web Design</span>
          <h2 id="website-project-title">Building a Simple, Responsive Website</h2>
          <div className="work-website-project__skills" aria-label="Skills practised">
            <span>Responsive layout</span>
            <span>React & CSS</span>
            <span>GitHub workflow</span>
          </div>
        </div>
      </section>

      <div className="va-endnote work-endnote">
        <p>Need graphics, brochures, or short-form edits for your business? Let’s discuss your support needs.</p>
        <Link to="/contact" className="va-button">Discuss your support needs <ArrowUpRight size={17} aria-hidden="true" /></Link>
      </div>
    </section>
  )
}
