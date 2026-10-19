import { useCallback, useLayoutEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import QuickMenu from './QuickMenu'

const LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About Me', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Work', to: '/projects' },
  { label: 'My Journey', to: '/showcase' },
  { label: 'My Approach', to: '/testimonials' },
  { label: 'Contact', to: '/contact' },
] as const

const INDICATOR_BASE_WIDTH = 100

export default function TopNav() {
  const { pathname } = useLocation()
  const listRef = useRef<HTMLUListElement>(null)
  const indicatorRef = useRef<HTMLSpanElement>(null)

  const moveIndicator = useCallback((target: HTMLElement | null) => {
    const list = listRef.current
    const indicator = indicatorRef.current
    if (!list || !indicator || !target) return

    const listRect = list.getBoundingClientRect()
    const targetRect = target.getBoundingClientRect()
    const left = targetRect.left - listRect.left
    indicator.style.transform = `translate3d(${left}px, 0, 0) scaleX(${targetRect.width / INDICATOR_BASE_WIDTH})`
    indicator.dataset.visible = 'true'
  }, [])

  const parkOnCurrent = useCallback(() => {
    const list = listRef.current
    moveIndicator(list?.querySelector<HTMLElement>('.topnav__link[aria-current="page"]') ?? null)
  }, [moveIndicator])

  useLayoutEffect(() => {
    const list = listRef.current
    if (!list) return
    parkOnCurrent()
    const observer = new ResizeObserver(parkOnCurrent)
    observer.observe(list)
    window.addEventListener('resize', parkOnCurrent)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', parkOnCurrent)
    }
  }, [pathname, parkOnCurrent])

  return (
    <header className="topnav">
      <div className="topnav__inner">
        <Link className="topnav__brand" to="/" aria-label="Mirelle Laksamana — Home">
          <span className="topnav__brand-mark" aria-hidden="true">M</span>
          <span className="topnav__brand-copy">
            <strong>Mirelle Laksamana</strong>
            <small>VIRTUAL ASSISTANT PORTFOLIO</small>
          </span>
        </Link>

        <nav className="topnav__links" aria-label="Main navigation">
          <ul ref={listRef} onPointerLeave={parkOnCurrent}>
            <li className="topnav__indicator-holder" aria-hidden="true">
              <span className="topnav__indicator" ref={indicatorRef} />
            </li>
            {LINKS.map(({ label, to }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  className="topnav__link"
                  onPointerEnter={(event) => moveIndicator(event.currentTarget)}
                  onFocus={(event) => moveIndicator(event.currentTarget)}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <QuickMenu className="topnav__quickmenu" />
      </div>
    </header>
  )
}
