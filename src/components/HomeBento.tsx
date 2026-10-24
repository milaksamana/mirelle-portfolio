import { Link } from 'react-router-dom'
import { ArrowUpRight } from '@/components/slab'

const LINKS = [
  { number: '01', title: 'Examples of my work', description: 'Explore selected business graphics, brochures, short-form video edits, and my website project.', to: '/projects', note: 'WORK SAMPLES' },
  { number: '02', title: 'Practical support for everyday business needs', description: 'Customer support, admin organization, travel-related requests, and simple creative content.', to: '/services', note: 'HOW I CAN HELP' },
  { number: '03', title: 'The experience behind my support', description: 'My background across customer support, travel operations, and creative work.', to: '/about', note: 'MY BACKGROUND' },
  { number: '04', title: 'Experience, plus continued growth', description: 'How my previous roles and self-directed learning are shaping my VA services.', to: '/showcase', note: 'EXPERIENCE & GROWTH' },
  { number: '05', title: 'Clear communication and careful follow-through', description: 'The principles I bring to each task and working relationship.', to: '/testimonials', note: 'WHAT TO EXPECT' },
] as const

export default function HomeBento() {
  return (
    <nav className="editorial-index" aria-label="Explore Mirelle's portfolio">
      {LINKS.map((item) => (
        <Link className="editorial-index__link" to={item.to} key={item.to}>
          <span className="editorial-index__number">{item.number}</span>
          <span className="editorial-index__copy">
            <span className="editorial-index__note">{item.note}</span>
            <span className="editorial-index__title">{item.title}</span>
            <span className="editorial-index__description">{item.description}</span>
          </span>
          <ArrowUpRight className="editorial-index__arrow" size={20} weight="bold" aria-hidden="true" />
        </Link>
      ))}
    </nav>
  )
}
