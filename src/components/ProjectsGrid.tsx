import { Link } from 'react-router-dom'
import { ArrowUpRight } from '@/components/slab'
import MomentumGallery from './MomentumGallery'
import BrochureDeck from './BrochureDeck'
import VideoPanels from './VideoPanels'

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
            <div className="work-browser__bar"><i /><i /><i /><span>mirelle-portfolio</span></div>
            <div className="work-browser__body">
              <span className="work-browser__eyebrow">PERSONAL PORTFOLIO</span>
              <strong>Thoughtful support.<br /><em>Creative assistance.</em></strong>
              <span className="work-browser__line" /><span className="work-browser__line work-browser__line--short" />
              <div className="work-browser__button">Explore my work ↗</div>
            </div>
          </div>
        </div>
        <div className="work-website-project__copy">
          <span className="va-eyebrow">Web design · Learning project</span>
          <h2 id="website-project-title">This portfolio website</h2>
          <p>An ongoing personal project customized from a starter template while I learn more about responsive layouts, React, CSS, and GitHub.</p>
          <Link to="/" className="va-text-link">View homepage <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </div>
      </section>

      <div className="va-endnote work-endnote">
        <p>These samples represent different small-business and editing projects. Read the package brochures directly on this page, select a graphic to view it larger, or play a short-form video sample.</p>
        <Link to="/contact" className="va-button">Discuss a task <ArrowUpRight size={17} aria-hidden="true" /></Link>
      </div>
    </section>
  )
}
