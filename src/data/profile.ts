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
  handle: 'General Virtual Assistant',
  role: 'Customer Support · Admin · Creative',
  avatarSrc: '/mirelle-profile.png',
  // No verification badge is shown; no formal VA credential is being claimed.
  verifiedLabel: '',
  email: 'mirellelaksamana@gmail.com',
  location: 'Philippines',
  stats: [
    { value: '2 yrs', label: 'professional experience', Icon: Briefcase },
    { value: 'SME', label: 'Subject Matter Expert assignment', Icon: SealCheck },
    { value: 'PHT', label: 'Philippine Time (UTC+8)', Icon: Clock },
  ],
  displayName: { line1: 'Thoughtful support.', line2: 'More room to focus.' },
  hero: {
    body: 'I help busy teams with customer communication, everyday admin, and simple creative tasks—bringing two years of professional experience, a detail-focused approach, and clear communication.',
    portraitSrc: '/mirelle-profile.png',
    portraitAlt: 'Portrait of Mirelle Laksamana',
  },
  socials: [],
}
