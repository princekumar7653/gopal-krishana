// Re-export types from store slices
export type { Project, Skill, Experience } from '../store/slices/portfolioSlice';

// Common types
export interface NavItem {
  name: string;
  href: string;
  icon?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}