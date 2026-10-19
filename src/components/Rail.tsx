import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import ThemeGlyph from './ThemeGlyph'
import {
  HomeIcon,
  FolderIcon,
  StackIcon,
  CupIcon,
  StarIcon,
  UserIcon,
  MessageIcon,
} from './RailIcons'
import { getTheme, toggleTheme, type Theme } from '@/lib/theme'
import { profile } from '@/data/profile'

/**
 * The profile rail: the fixed left column of the shell. It carries identity,
 * the theme switch and the section index, and it is the site's only navigation
 * surface from 1100px up - the floating NavBar pill hides there and takes over
 * again below it.
 *
 * The links are ROUTES, not anchors. Home is a fixed non-scrolling viewport, so
 * there is nothing for a scrollspy to spy on; the panel to the right swaps
 * instead. `NavLink` owns the active state, which is why there is no
 * IntersectionObserver here.
 */
export const RAIL_LINKS = [
  { label: 'Home', to: '/', Icon: HomeIcon },
  { label: 'About Me', to: '/about', Icon: UserIcon },
  { label: 'Services', to: '/services', Icon: StackIcon },
  { label: 'Work Samples', to: '/projects', Icon: FolderIcon },
  { label: 'My Journey', to: '/showcase', Icon: CupIcon },
  { label: 'My Approach', to: '/testimonials', Icon: StarIcon },
  { label: 'Contact', to: '/contact', Icon: MessageIcon },
] as const

export default function Rail() {
  const [theme, setThemeState] = useState<Theme>('light')
  const { pathname } = useLocation()
  const navListRef = useRef<HTMLUListElement>(null)
  const indicatorRef = useRef<HTMLSpanElement>(null)

  const moveIndicator = useCallback((target: HTMLElement | null) => {
    const list = navListRef.current
    const indicator = indicatorRef.current
    if (!list || !indicator || !target) return
    const listRect = list.getBoundingClientRect()
    const targetRect = target.getBoundingClientRect()
    const y = targetRect.top - listRect.top
    const height = targetRect.height
    indicator.style.transform = `translate3d(0, ${y}px, 0) scaleY(${height / 54})`
    indicator.dataset.visible = 'true'
  }, [])

  const parkIndicator = useCallback(() => {
    const list = navListRef.current
    moveIndicator(list?.querySelector<HTMLElement>('.rail__link[aria-current="page"]') ?? null)
  }, [moveIndicator])

  useLayoutEffect(() => {
    const list = navListRef.current
    if (!list) return
    parkIndicator()
    const observer = new ResizeObserver(parkIndicator)
    observer.observe(list)
    return () => observer.disconnect()
  }, [pathname, parkIndicator])

  // The pre-paint script owns the real value; read it once mounted so the
  // button shows the icon for the action, not for the current state.
  useEffect(() => setThemeState(getTheme()), [])

  return (
    <aside className="rail" aria-label="Profile and site navigation">
      <div className="rail__inner">
        <span className="rail__avatar">
          <img
            src={profile.avatarSrc}
            alt={profile.name}
            width={120}
            height={120}
          />
        </span>

        <h2 className="rail__name">{profile.name}</h2>
        <p className="rail__handle">
          {profile.handle}
        </p>

        <div className="rail__actions">
          <ul className="rail__socials" role="list" aria-label="Social profiles">
          {profile.socials.map(({ label, href, iconPath }) => (
            <li key={label}>
              <a
                className="rail__social"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
              >
                {/* Single-colour silhouettes, tinted by currentColor through a
                    CSS mask - same technique as the hero's social row. */}
                <span
                  className="rail__social-icon"
                  style={{ ['--icon-url' as string]: `url('${iconPath}')` }}
                  aria-hidden="true"
                />
              </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="rail__theme"
            onClick={(e) => setThemeState(toggleTheme(e.currentTarget))}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            <ThemeGlyph theme={theme} size={21} />
          </button>
        </div>

        <nav className="rail__nav" aria-label="Sections">
          <ul ref={navListRef} onPointerLeave={parkIndicator}>
            <li className="rail__indicator-holder" aria-hidden="true"><span className="rail__indicator" ref={indicatorRef} /></li>
            {RAIL_LINKS.map(({ label, to, Icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  className="rail__link"
                  onPointerEnter={(event) => moveIndicator(event.currentTarget)}
                  onFocus={(event) => moveIndicator(event.currentTarget)}
                >
                  <Icon size={21} />
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <p className="rail__copy">
          &copy; {new Date().getFullYear()}
          <br />
          {profile.name}. All rights reserved.
        </p>
      </div>
    </aside>
  )
}
