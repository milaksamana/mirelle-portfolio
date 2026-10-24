import { Link } from 'react-router-dom'
import { ArrowUpRight, FolderOpen, Stack, User, Compass } from '@/components/slab'
import { profile } from '@/data/profile'
import QuickMenu from './QuickMenu'

export function HomeProfile() {
  return (
    <header className="hprofile">
      <img className="hprofile__avatar" src={profile.avatarSrc} alt="" width={56} height={56} />
      <div className="hprofile__who">
        <span className="hprofile__name">{profile.name}</span>
        <span className="hprofile__handle">{profile.handle} · {profile.role}</span>
        <span className="hprofile__location">{profile.location}</span>
      </div>
      <QuickMenu className="hprofile__menu" />
    </header>
  )
}

export function HomeStats() {
  return (
    <ul className="hstats" role="list">
      {profile.stats.map(({ value, label, Icon }, i) => (
        <li key={i}>
          <Icon className="hstats__icon" size={18} weight="duotone" aria-hidden="true" />
          <b className="hstats__value">{value}</b>
          <span className="hstats__label">{label}</span>
        </li>
      ))}
    </ul>
  )
}

const TILES = [
  { n: '01', label: 'Work samples', to: '/projects', title: 'Practice projects, clearly labelled.', desc: 'Examples made to demonstrate my approach.', Icon: FolderOpen },
  { n: '02', label: 'Services', to: '/services', title: 'Support that keeps work moving.', desc: 'Customer, admin, and creative assistance.', Icon: Stack },
  { n: '03', label: 'About me', to: '/about', title: `Hi, I'm ${profile.firstName}.`, desc: 'My experience and working strengths.', Icon: User },
  { n: '04', label: 'My journey', to: '/showcase', title: 'Experience meets continued learning.', desc: 'The tools and skills I am building on.', Icon: Compass },
] as const

export function HomeExplore() {
  return (
    <section className="mobile-explore" aria-labelledby="mobile-explore-title">
      <div className="hsec">
        <h2 className="hsec__title" id="mobile-explore-title">Explore my portfolio</h2>
      </div>
      <ul className="htiles" role="list">
        {TILES.map(({ Icon, ...tile }) => (
          <li key={tile.to}>
            <Link to={tile.to} className="htile">
              <span className="htile__media htile__glyph"><Icon size={38} weight="regular" aria-hidden="true" /></span>
              <span className="htile__body">
                <span className="htile__n">{tile.n} · {tile.label}</span>
                <span className="htile__title">{tile.title}</span>
                <span className="htile__desc">{tile.desc}</span>
              </span>
              <ArrowUpRight className="htile__arrow" size={17} aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
      <div className="mobile-principles">
        <span className="va-eyebrow">How I work</span>
        <h2>Thoughtful, organized, and open to learning.</h2>
        <p>I aim to communicate clearly, follow processes carefully, and ask questions when I need context rather than make assumptions.</p>
        <Link to="/testimonials" className="va-text-link">My approach <ArrowUpRight size={16} aria-hidden="true" /></Link>
      </div>
    </section>
  )
}
