import { type NavItem, type SocialLink } from '../types';

export const NAV_ITEMS: NavItem[] = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Contact', href: '/contact' },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { name: 'GitHub', url: 'https://github.com', icon: 'github' },
  { name: 'LinkedIn', url: 'https://linkedin.com', icon: 'linkedin' },
  { name: 'Twitter', url: 'https://twitter.com', icon: 'twitter' },
];

export const SKILLS_CATEGORIES = {
  FRONTEND: 'frontend',
  BACKEND: 'backend',
  TOOLS: 'tools',
  OTHER: 'other',
} as const;