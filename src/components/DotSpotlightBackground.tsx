import { useEffect, useRef } from 'react'

/**
 * Lightweight homepage-only dot grid with a pointer spotlight.
 * The last real pointer position wins for two seconds; otherwise a slow
 * Lissajous path moves the spotlight. Pointer events only capture coordinates:
 * CSS variables are written from requestAnimationFrame, never per event.
 */
export default function DotSpotlightBackground() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const coarsePointer = window.matchMedia('(pointer: coarse) and (hover: none)')
    const origin = performance.now()

    let frame = 0
    let lastPointerAt = Number.NEGATIVE_INFINITY
    let pointerX = window.innerWidth * 0.5
    let pointerY = window.innerHeight * 0.42
    let idleStartedAt: number | null = null
    let idleFromX = pointerX
    let idleFromY = pointerY

    const onPointerMove = (event: PointerEvent) => {
      if (reducedMotion.matches || coarsePointer.matches || event.pointerType === 'touch') return
      pointerX = event.clientX
      pointerY = event.clientY
      lastPointerAt = performance.now()
      idleStartedAt = null
    }

    const tick = (now: number) => {
      let x: number
      let y: number

      if (now - lastPointerAt < 2000) {
        // A real pointer has moved recently; keep the spotlight on it.
        x = pointerX
        y = pointerY
        idleStartedAt = null
        idleFromX = pointerX
        idleFromY = pointerY
      } else {
        // Ease from the last pointer position to the autonomous path.
        if (idleStartedAt === null) {
          idleStartedAt = now
          idleFromX = pointerX
          idleFromY = pointerY
        }

        const elapsed = now - origin
        const autoX = window.innerWidth * (0.5 + 0.32 * Math.sin(elapsed * 0.00013))
        const autoY = window.innerHeight * (0.48 + 0.30 * Math.sin(elapsed * 0.000085 + 1.15))
        const progress = Math.min(1, Math.max(0, (now - idleStartedAt) / 1100))
        const eased = progress * progress * (3 - 2 * progress)

        x = idleFromX + (autoX - idleFromX) * eased
        y = idleFromY + (autoY - idleFromY) * eased
      }

      root.style.setProperty('--spot-x', `${x}px`)
      root.style.setProperty('--spot-y', `${y}px`)
      frame = window.requestAnimationFrame(tick)
    }

    const stop = () => {
      if (frame) window.cancelAnimationFrame(frame)
      frame = 0
    }
    const start = () => {
      if (!reducedMotion.matches && !frame) frame = window.requestAnimationFrame(tick)
    }
    const onMotionPreferenceChange = () => {
      if (reducedMotion.matches) {
        stop()
      } else {
        start()
      }
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    reducedMotion.addEventListener('change', onMotionPreferenceChange)
    start()

    return () => {
      stop()
      window.removeEventListener('pointermove', onPointerMove)
      reducedMotion.removeEventListener('change', onMotionPreferenceChange)
    }
  }, [])

  return (
    <div ref={rootRef} className="dot-spotlight-background" aria-hidden="true">
      <span className="dot-spotlight-background__base" />
      <span className="dot-spotlight-background__accent" />
      <span className="dot-spotlight-background__glow" />
    </div>
  )
}
