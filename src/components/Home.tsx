import { Link } from 'react-router-dom'
import { ArrowUpRight } from '@/components/slab'
import { profile } from '@/data/profile'
import ToolsMarquee from './ToolsMarquee'
import HomeBento from './HomeBento'
import { HomeProfile, HomeStats, HomeExplore } from './HomeMobile'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useIsPhone } from '@/hooks/useMediaQuery'
import HomeStory from './HomeStory'
import PullQuote from './PullQuote'
import QuickMenu from './QuickMenu'

/**
 * Home's opening composition: profile, headline, introduction, then the
 * full-width three-part proof bar. Supporting portfolio content follows it.
 */
export default function Home() {
  useScrollReveal()
  const phone = useIsPhone()
  const { displayName, hero } = profile

  return (
    <section className="home" aria-labelledby="home-title">
      {phone ? (
        <HomeProfile />
      ) : (
        <header className="home__profile">
          <img className="home__profile-avatar" src={profile.avatarSrc} alt="" width={56} height={56} />
          <div className="home__profile-copy">
            <p className="home__profile-name">{profile.name}</p>
            <p className="home__profile-role">
              {profile.handle} <span aria-hidden="true">·</span> {profile.role}
            </p>
            <p className="home__profile-meta">{profile.location}</p>
          </div>
          <QuickMenu className="home__profile-menu" />
        </header>
      )}

      <div className="home__head">
        <div className="home__headline">
          <h1 className="home__title" id="home-title">
            <span className="home__line">
              <span>{displayName.line1}</span>
              <span>{displayName.line2}</span>
            </span>
          </h1>

          {!phone && (
            <Link className="home__cta" to="/contact">
              Discuss your support needs
              <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
            </Link>
          )}
        </div>

        <p className="home__lede">{hero.body}</p>
        <HomeStats />
      </div>

      <div className="home__glass home__glass--tools">
        <div className="home__tools">
          <div className="home__tools-head">
            <span className="home__tools-eyebrow">Daily drivers</span>
            <h2 className="home__tools-label">Tools I work with</h2>
          </div>
          <ToolsMarquee />
        </div>
      </div>

      <HomeStory />
      <PullQuote />

      {phone ? (
        <HomeExplore />
      ) : (
        <div className="home__glass home__glass--showcase">
          <div className="home__showcase">
            <HomeBento />
          </div>
        </div>
      )}
    </section>
  )
}
