import { useEffect } from 'react'
import { applyShellScroller } from '@/lib/scrolltrigger'

/**
 * The portfolio uses a scrollable shell panel on desktop and native document
 * scrolling on narrower screens. Native wheel scrolling is deliberately used
 * instead of Lenis here: the previous custom wheel loop could leave the
 * desktop panel feeling stuck until the visitor dragged its scrollbar.
 *
 * We still configure ScrollTrigger to read the desktop panel, so scroll-linked
 * visuals continue to measure the same element as the browser.
 */
export const SCROLLER_ID = 'main-content'

export function getScroller(): HTMLElement | null {
  return document.getElementById(SCROLLER_ID)
}

export function useLenis() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    let cancelled = false
    let cleanup = () => {}

    // Keep GSAP's scroll-linked effects aligned with the native scroller,
    // without intercepting wheel events or adding another scroll engine.
    void (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])
      if (cancelled) return

      gsap.registerPlugin(ScrollTrigger)
      applyShellScroller(ScrollTrigger)
      ScrollTrigger.refresh()

      cleanup = () => {
        // ScrollTrigger instances belong to their components; do not kill
        // global triggers when the app shell unmounts.
      }
    })()

    return () => {
      cancelled = true
      cleanup()
    }
  }, [])
}
