import { lazy, Suspense, useState, useEffect, useLayoutEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import IntroOverlay from '@/components/IntroOverlay'
import CursorRing from '@/components/CursorRing'
import AccessMenu from '@/components/AccessMenu'
import DynamicIslandNav from '@/components/DynamicIslandNav'
import { motionReduced } from '@/lib/a11y'
import { useLenis, SCROLLER_ID } from '@/hooks/useLenis'
import { getPerfTier, watchFrameHealth, PERF_TIER_EVENT } from '@/lib/perf'

// Lazy-load HeroCanvas so the 118KB Three.js bundle is fetched only
// when actually needed. Mobile + reduced-motion users skip the import
// entirely - the .hero-canvas CSS fallback (background:var(--cream))
// handles the visual baseline. PageSpeed showed Three.js had 76.6 KiB
// of unused JS; not loading it at all on mobile is the cleaner fix.
const HeroCanvas = lazy(() => import('@/components/HeroCanvasV2'))

/**
 * The app shell owns the top navigation, animated background, intro, and one
 * scrolling content panel. Each route renders its view into that panel.
 *
 * All content views scroll in the main panel on desktop; the app shell becomes
 * a normal document flow on narrower viewports.
 */
export default function App() {
  useLenis()

  const { pathname } = useLocation()
  // Every route now scrolls inside the same panel so the story and horizontal
  // Services section can respond to scroll progress on desktop.
  const isFixed = false
  const panelRef = useRef<HTMLElement>(null)

  // The panel is the scroller, so a route change has to reset it by hand -
  // the browser only restores scroll on the document.
  useEffect(() => {
    panelRef.current?.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])

  // From the first route change on, a page that mounts rises into place
  // (mobile-pass.css). Not on the first load: the intro owns that arrival.
  // Layout effect: set before paint, or the new page shows for one frame at
  // full opacity and then jumps back to start its rise.
  const firstPath = useRef(pathname)
  useLayoutEffect(() => {
    if (pathname !== firstPath.current) document.documentElement.classList.add('has-navigated')
  }, [pathname])

  // The page measures its own frame health once the intro clears and steps
  // the design down if it cannot hold it - see lib/perf.ts. `low` is the tier
  // where the shader itself has to go.
  const [perfTier, setPerfTier] = useState(getPerfTier)
  useEffect(() => {
    const onTier = (e: Event) => setPerfTier((e as CustomEvent).detail)
    window.addEventListener(PERF_TIER_EVENT, onTier)
    void watchFrameHealth()
    return () => window.removeEventListener(PERF_TIER_EVENT, onTier)
  }, [])

  const [shouldLoadCanvas, setShouldLoadCanvas] = useState(false)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const reduced =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches || motionReduced()
    const isMobile = window.matchMedia('(pointer: coarse) and (hover: none)').matches
    if (reduced || isMobile) return
    // Defer the Three.js fetch to idle time so it does not compete with
    // initial render / LCP. Falls back to setTimeout if requestIdleCallback
    // is unavailable (Safari).
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
    }
    // Wait for the load event too: the shader is decoration, and parsing
    // Three.js during boot was the bulk of the blocking time.
    const start = () => {
      if (w.requestIdleCallback) {
        w.requestIdleCallback(() => setShouldLoadCanvas(true), { timeout: 3000 })
      } else {
        window.setTimeout(() => setShouldLoadCanvas(true), 1500)
      }
    }
    if (document.readyState === 'complete') start()
    else window.addEventListener('load', start, { once: true })
  }, [])

  return (
    <>
      <IntroOverlay />
      <CursorRing />
      <a href={`#${SCROLLER_ID}`} className="skip-link">Skip to main content</a>
      {shouldLoadCanvas && perfTier !== 'low' && (
        <Suspense fallback={null}>
          <HeroCanvas />
        </Suspense>
      )}
      <DynamicIslandNav />
      <div className="shell">
        <main
          ref={panelRef}
          id={SCROLLER_ID}
          className="shell__panel"
          data-fixed={isFixed ? 'true' : 'false'}
        >
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </main>
      </div>
      <AccessMenu />
    </>
  )
}
