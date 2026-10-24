/**
 * Profile identity and Home headline.
 */

import { Briefcase, SealCheck, Clock, type Icon } from '@/components/slab'

export type SocialLink = {
  label: string
  href: string
  iconPath: string
}

/** A proof fact on the phone's Home: a glyph, a short value, a caption. */
export type Stat = { value: string; label: string; Icon: Icon }

export type Profile = {
  name: string
  /** First name, used in "Hi, I'm ___.", on About. */
  firstName: string
  handle: string
  /** Short role line under the handle on phones. */
  role: string
  /** Square image. An SVG, WebP or PNG with a transparent background looks best. */
  avatarSrc: string
  /** Tooltip / screen-reader label on the verified tick next to your name. */
  verifiedLabel: string
  email: string
  location: string
  /** Three short proof facts shown on phones under the Home lede. */
  stats: Stat[]
  displayName: { line1: string; line2: string }
  hero: {
    body: string
    portraitSrc: string
    portraitAlt: string
  }
  socials: SocialLink[]
}

export const profile: Profile = {
  name: 'Mirelle Laksamana',
  firstName: 'Mirelle',
  handle: '@mirellelaksamana',
  role: 'Aspiring Virtual Assistant',
  avatarSrc: '/avatar.svg',
  verifiedLabel: 'Portfolio profile',
  email: 'you@example.com',
  location: 'PHT · Philippine Time (UTC+8)',
  stats: [
    { value: '1+ yr', label: 'Customer Support', Icon: Briefcase },
    { value: 'SME', label: 'Team Support', Icon: SealCheck },
    { value: 'UTC+8', label: 'Philippine Time', Icon: Clock },
  ],
  // The intro types this line, then flies it into the Home headline.
  displayName: { line1: 'Different skills.', line2: 'One thoughtful approach.' },
  hero: {
    body: 'A customer service professional with over a year of experience and SME experience supporting teammates, now bringing those skills into virtual assistance and admin support.',
    portraitSrc: '/avatar.svg',
    portraitAlt: 'Mirelle Laksamana',
  },
  socials: [
    { label: 'Facebook profile', href: '#', iconPath: '/icons/facebook.svg' },
    { label: 'LinkedIn profile', href: '#', iconPath: '/icons/linkedin.svg' },
    { label: 'Discord profile', href: '#', iconPath: '/icons/discord.svg' },
  ],
}
