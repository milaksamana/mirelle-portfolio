import { useCallback, useEffect, useRef, useState, type FocusEvent, type PointerEvent } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { X } from '@/components/slab'
import { profile } from '@/data/profile'
import QuickMenu from './QuickMenu'

const LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Work', to: '/projects' },
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'Journey', to: '/showcase' },
  { label: 'Approach', to: '/testimonials' },
  { label: 'Contact', to: '/contact' },
] as const

export default function DynamicIslandNav() {
  const { pathname } = useLocation()
  const rootRef = useRef<HTMLElement>(null)
  const collapsedButtonRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [pinned, setPinned] = useState(false)
  const isOpen = hovered || focused || pinned

  const enterWithPointer = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'touch') setHovered(true)
  }

  const close = useCallback(() => {
    setPinned(false)
    setHovered(false)
    setFocused(false)
    closeButtonRef.current?.blur()
  }, [])

  useEffect(() => {
    setHovered(false)
    setFocused(false)
    setPinned(false)
  }, [pathname])

  const onBlurCapture = (event: FocusEvent<HTMLElement>) => {
    if (!rootRef.current?.contains(event.relatedTarget as Node | null)) {
      setFocused(false)
      setPinned(false)
    }
  }

  return (
    <nav
      className={`dynamic-island${isOpen ? ' is-expanded' : ''}`}
      ref={rootRef}
      aria-label="Main navigation"
      onPointerLeave={() => { setHovered(false); setPinned(false) }}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={onBlurCapture}
    >
      <div className="dynamic-island__surface">
        <button
          type="button"
          ref={collapsedButtonRef}
          className="dynamic-island__collapsed"
          onPointerEnter={enterWithPointer}
          onClick={() => setPinned((value) => !value)}
          aria-expanded={isOpen}
          aria-controls="dynamic-island-expanded"
          aria-label={isOpen ? 'Navigation expanded' : 'Expand navigation'}
          tabIndex={isOpen ? -1 : 0}
        >
          <span className="dynamic-island__brand">{profile.name}</span>
          <span className="dynamic-island__status" aria-hidden="true" />
        </button>

        <div className="dynamic-island__expanded" id="dynamic-island-expanded" aria-hidden={!isOpen} inert={!isOpen || undefined} onPointerEnter={enterWithPointer}>
          <img className="dynamic-island__avatar" src={profile.avatarSrc} alt="" width={30} height={30} />
          <div className="dynamic-island__links">
            {LINKS.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className="dynamic-island__link"
                tabIndex={isOpen ? 0 : -1}
                onClick={() => { setPinned(false); setHovered(false) }}
              >
                {label}
              </NavLink>
            ))}
          </div>
          <QuickMenu className="dynamic-island__quickmenu" />
          <button
            type="button"
            className="dynamic-island__close"
            aria-label="Collapse navigation"
            onClick={close}
            ref={closeButtonRef}
            tabIndex={isOpen ? 0 : -1}
          >
            <X size={15} weight="bold" aria-hidden="true" />
          </button>
        </div>
      </div>
    </nav>
  )
}
