import ServicesGrid from '@/components/ServicesGrid'

/**
 * Services uses a scroll-driven horizontal sequence on desktop. The section's
 * JavaScript measures the track inside the shell scroller and falls back to a
 * normal vertical stack on narrow screens and for reduced-motion preferences.
 */
export default function ServicesView() {
  return <ServicesGrid />
}
