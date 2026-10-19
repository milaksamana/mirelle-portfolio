const PHRASES = [
  'Video editing',
  'Brochure design',
  'Promotional posters',
  'Publication materials',
  'Creative support',
  'Personal website',
  'Thoughtful details',
]

function TickerRow({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className={`work-ticker__row${reverse ? ' work-ticker__row--outline' : ''}`} aria-label={reverse ? 'Creative services ticker' : undefined}>
      <div className="work-ticker__viewport">
        <div className="work-ticker__track" aria-hidden="true">
          {[0, 1, 2, 3].map((copy) => (
            <span className="work-ticker__group" key={copy}>
              {PHRASES.map((phrase, index) => (
                <span className="work-ticker__item" key={`${phrase}-${index}`}>
                  <span>{phrase}</span><i aria-hidden="true">✳</i>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function WorkTicker() {
  return (
    <section className="work-ticker" aria-label="Creative work categories">
      <p className="work-ticker__sr">Video editing, brochure design, promotional posters, publication materials, creative support, personal website, and thoughtful details.</p>
      <TickerRow />
      <TickerRow reverse />
    </section>
  )
}
