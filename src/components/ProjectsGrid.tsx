import { ArrowUpRight } from '@/components/slab'
import MomentumGallery from './MomentumGallery'
import BrochureDeck from './BrochureDeck'
import VideoPanels from './VideoPanels'
import { Link } from 'react-router-dom'

export default function ProjectsGrid() {
  return (
    <section className="va-page work-page" aria-labelledby="samples-title">
      <header className="va-page__head work-page__head">
        <span className="va-eyebrow">Selected work · Creative samples</span>
        <h1 id="samples-title">Creative work, thoughtful details.</h1>
        <p>A collection of small-business graphics, brochure documents, and short-form video edits. Each project is grouped by format so you can explore the work at your own pace.</p>
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
          <span className="va-eyebrow">Web design · Learning project</span>
          <h2 id="website-project-title">Building a Simple, Responsive Website</h2>
          <p>A hands-on learning project where I’m practising responsive layouts, visual hierarchy, and front-end fundamentals while building my own portfolio.</p>
          <div className="work-website-project__skills" aria-label="Skills practised">
            <span>Responsive layout</span>
            <span>React & CSS</span>
            <span>GitHub workflow</span>
          </div>
        </div>
      </section>

      <div className="va-endnote work-endnote">
        <p>These samples represent different small-business and editing projects. Read the package brochures directly on this page, select a graphic to view it larger, or play a short-form video sample.</p>
        <Link to="/contact" className="va-button">Discuss a task <ArrowUpRight size={17} aria-hidden="true" /></Link>
      </div>
    </section>
  )
}
