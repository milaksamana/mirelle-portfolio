/**
 * Mirelle's portfolio profile.
 * Only include contact and social details that the owner has approved for public use.
 */
import { Briefcase, SealCheck, Clock, type Icon } from '@/components/slab'

export type SocialLink = {
  label: string
  href: string
  iconPath: string
}
export type Stat = { value: string; label: string; Icon: Icon }
export type Profile = {
  name: string
  firstName: string
  handle: string
  role: string
  avatarSrc: string
  verifiedLabel: string
  email: string
  location: string
  stats: Stat[]
  displayName: { line1: string; line2: string }
  hero: { body: string; portraitSrc: string; portraitAlt: string }
  socials: SocialLink[]
}

export const profile: Profile = {
  name: 'Mirelle Laksamana',
  firstName: 'Mirelle',
  handle: 'Customer Support Professional',
  role: 'Administrative & Creative Support',
  avatarSrc: '/avatar.svg',
  // No verification badge is shown; no formal VA credential is being claimed.
  verifiedLabel: '',
  // Public contact address supplied by Mirelle.
  email: 'mirellelaksamana@gmail.com',
  location: 'San Pedro, Laguna, Philippines',
  stats: [
    { value: '1+ yrs', label: 'customer support', Icon: Briefcase },
    { value: '2', label: 'travel & automotive sectors', Icon: SealCheck },
    { value: 'UTC+8', label: 'Philippines time', Icon: Clock },
  ],
  displayName: { line1: 'Thoughtful support.', line2: 'Creative assistance.' },
  hero: {
    body: 'I bring customer support experience, organized admin skills, and creative content support to help busy teams keep things moving.',
    portraitSrc: '/avatar.svg',
    portraitAlt: 'Profile image placeholder for Mirelle Laksamana',
  },
  socials: [],
}
