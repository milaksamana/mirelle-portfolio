import { useEffect, useRef } from 'react'

const QUOTE = 'Working together should feel like a shared effort: clear communication, thoughtful support, and a willingness to keep learning as we go.'

export default function PullQuote() {
  const quoteRef = useRef<HTMLElement>(null)
  const words = QUOTE.split(' ')

  useEffect(() => {
    const block = quoteRef.current
    if (!block) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reducedMotion.matches) {
      block.dataset.revealed = 'true'
      return
    }
    const root = window.innerWidth >= 1100 ? document.getElementById('main-content') : null
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        block.dataset.revealed = 'true'
        observer.disconnect()
      }
    }, { root, threshold: 0.25 })
    observer.observe(block)
    return () => observer.disconnect()
  }, [])

  return (
    <figure className="pull-quote" ref={quoteRef} aria-labelledby="pull-quote-attribution">
      <svg className="pull-quote__mark" viewBox="0 0 80 64" aria-hidden="true">
        <path d="M7 34C7 15 18 5 37 2v12C26 17 21 23 20 32h16v27H7V34Zm39 0C46 15 57 5 76 2v12C65 17 60 23 59 32h16v27H46V34Z" fill="currentColor" />
      </svg>
      <blockquote className="pull-quote__text" aria-label={QUOTE}>
        {words.map((word, index) => (
          <span className="pull-quote__word" key={`${word}-${index}`} style={{ ['--delay' as string]: `${index * 85}ms` }} aria-hidden="true">
            {word}{index < words.length - 1 ? ' ' : ''}
          </span>
        ))}
      </blockquote>
      <figcaption className="pull-quote__attribution" id="pull-quote-attribution">
        MIRELLE LAKSAMANA <span>·</span> MY WORKING PHILOSOPHY
      </figcaption>
    </figure>
  )
}
