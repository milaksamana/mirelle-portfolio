import { useMemo } from 'react'
import { AirplaneTilt, ChatCircleDots } from '@/components/slab'

type Tool = {
  label: string
  logo?: string
  categoryIcon?: 'travel' | 'support'
}

/** Tools are described honestly; "beginner" stays visible where relevant. */
export const tools: Tool[] = [
  { label: 'Microsoft 365', logo: '/tool-logos/microsoft-365.svg' },
  { label: 'Excel', logo: '/tool-logos/excel.svg' },
  { label: 'Google Sheets · beginner', logo: '/tool-logos/google-sheets.svg' },
  { label: 'Canva', logo: '/tool-logos/canva.svg' },
  { label: 'CapCut', logo: '/tool-logos/capcut.svg' },
  { label: 'Filmora', logo: '/tool-logos/filmora.svg' },
  { label: 'Premiere Pro · beginner', logo: '/tool-logos/premiere-pro.svg' },
  { label: 'Amadeus GDS', categoryIcon: 'travel' },
  { label: 'CRM & support tools', categoryIcon: 'support' },
]

export default function ToolsMarquee() {
  const doubled = useMemo(() => [...tools, ...tools], [])
  return (
    <section className="tools-marquee tools-marquee--text" aria-label="Tools and platforms">
      <div className="tools-marquee__track" aria-hidden="true">
        {doubled.map((tool, i) => (
          <span key={`${tool.label}-${i}`} className="tools-marquee__item">
            <span className="tools-marquee__logo">
              {tool.logo ? (
                <img className="tools-marquee__img" src={tool.logo} alt="" loading="lazy" />
              ) : tool.categoryIcon === 'travel' ? (
                <AirplaneTilt className="tools-marquee__generic-icon" size={19} weight="duotone" />
              ) : (
                <ChatCircleDots className="tools-marquee__generic-icon" size={19} weight="duotone" />
              )}
            </span>
            <span className="tools-marquee__label">{tool.label}</span>
          </span>
        ))}
      </div>
      <ul className="sr-only">
        {tools.map((tool) => <li key={tool.label}>{tool.label}</li>)}
      </ul>
    </section>
  )
}
