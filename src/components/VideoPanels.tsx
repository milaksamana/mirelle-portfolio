import { useEffect, useRef, useState } from 'react'

const VIDEOS = [
  { src: '/samples/videos/birthday-template.mp4', title: 'Birthday Template', subtitle: 'Celebration edit · CapCut', alt: 'Birthday-themed short-form video template edited in CapCut' },
  { src: '/samples/videos/fathers-day-template.mp4', title: "Father's Day Template", subtitle: 'Seasonal edit · CapCut', alt: "Father's Day themed short-form video template edited in CapCut" },
  { src: '/samples/videos/keyframe-moving-texts.mp4', title: 'Keyframes & Moving Text', subtitle: 'Motion and text animation', alt: 'Short-form editing demonstration featuring keyframes and animated text' },
  { src: '/samples/videos/masking-overlay-texts.mp4', title: 'Masking & Overlay Text', subtitle: 'Layering and masking', alt: 'Short-form editing demonstration featuring masking and overlay text' },
  { src: '/samples/videos/short-vlog-template.mp4', title: 'Short Vlog Template', subtitle: 'Vlog pacing · CapCut', alt: 'Short vlog template edited in CapCut' },
]

export default function VideoPanels() {
  const [active, setActive] = useState(0)
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([])

  useEffect(() => {
    const videos = videoRefs.current.filter((video): video is HTMLVideoElement => video !== null)
    if (!videos.length) return

    // Autoplay muted clips when the gallery enters view; pause clips off-screen
    // to avoid making five videos decode continuously while the visitor browses.
    if (!('IntersectionObserver' in window)) {
      videos.forEach((video) => { video.play().catch(() => undefined) })
      return
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target as HTMLVideoElement
        if (entry.isIntersecting && entry.intersectionRatio >= 0.15) {
          video.play().catch(() => undefined)
        } else {
          video.pause()
        }
      })
    }, { threshold: [0, 0.15, 0.5] })

    videos.forEach((video) => observer.observe(video))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="video-panels" aria-labelledby="video-panels-title">
      <div className="work-section-heading">
        <span className="va-eyebrow">Short-form video editing</span>
        <h2 id="video-panels-title">A few ways I work with motion.</h2>
        <p>Selected CapCut projects, from seasonal templates to keyframes, masking, and vlog edits. Videos autoplay muted when visible; use the player controls to pause or replay a clip.</p>
      </div>
      <div className="video-panels__row">
        {VIDEOS.map((video, index) => (
          <div
            key={video.src}
            className={'video-panels__panel ' + (active === index ? 'is-active' : '')}
            role="group"
            tabIndex={0}
            aria-label={video.title + ': ' + video.subtitle}
            onPointerEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
            onClick={() => setActive(index)}
            onKeyDown={(event) => {
              if (event.target !== event.currentTarget) return
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                setActive(index)
              }
            }}
          >
            <video
              ref={(element) => { videoRefs.current[index] = element }}
              src={video.src}
              muted
              autoPlay
              loop
              playsInline
              preload="metadata"
              controls={active === index}
              aria-label={video.alt}
            />
            <span className="video-panels__scrim" aria-hidden="true" />
            <span className="video-panels__number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <span className="video-panels__copy">
              <strong>{video.title}</strong>
              <small>{video.subtitle}</small>
              <span className="video-panels__play">Playing muted · Controls on focus</span>
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
