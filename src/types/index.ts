import React from 'react';

// Re-export types from store slices
export type { Project as BaseProject, Skill as BaseSkill, Experience } from '../store/slices/portfolioSlice';

// Re-export from specialized type files
export * from './api';
export * from './animations';
export * from './performance';

// Enhanced Project interface for modern portfolio
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  images: string[];
  technologies: string[];
  category: string;
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  completedDate: string;
}

// Enhanced Skill interface for modern portfolio
export interface Skill {
  name: string;
  proficiency: number; // 0-100
  icon: string;
  description: string;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}

// Personal Information
export interface PersonalInfo {
  name: string;
  title: string;
  description: string;
  image: string;
  stats: HeroStat[];
  socialLinks: SocialLink[];
}

export interface HeroStat {
  value: number;
  label: string;
  suffix?: string;
}

// Navigation and UI
export interface NavItem {
  name: string;
  href: string;
  icon?: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  isActive: boolean;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

// Contact Form
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Configuration Types
export interface PortfolioConfig {
  backend: {
    url: string;
  };
  emailjs?: {
    serviceId: string;
    templateId: string;
    publicKey: string;
  };
  formspree?: {
    formId: string;
  };
  analytics: {
    enabled: boolean;
    trackVisitors: boolean;
  };
  ui: {
    showPerformanceIndicator: boolean;
    enableAnimations: boolean;
    theme: 'dark' | 'light';
  };
}

// Animation Options (keeping here as it's used in component props)
export interface AnimationOptions {
  animation?: 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'fade-in';
  delay?: number;
  threshold?: number;
}

// Component Props Interfaces
export interface HeaderProps {
  isScrolled: boolean;
}

export interface SidebarProps {
  activeSection: string;
}

export interface HeroSectionProps {
  personalInfo: PersonalInfo;
}

export interface SkillsSectionProps {
  skillCategories: SkillCategory[];
}

export interface PortfolioSectionProps {
  projects: Project[];
}

export interface ContactSectionProps {
  onSubmit: (formData: ContactFormData) => Promise<void>;
}

export interface AnimatedSectionProps {
  children: React.ReactNode;
  animation?: 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'fade-in';
  delay?: number;
  threshold?: number;
}

export interface SkillBarProps {
  skill: Skill;
  isVisible: boolean;
  animationDelay?: number;
}

export interface ProjectCardProps {
  project: Project;
  onViewDetails: (project: Project) => void;
}

export interface ParticleBackgroundProps {
  particleCount?: number;
  enableInteraction?: boolean;
  performanceMode?: import('./performance').PerformanceMode;
}

// Hook Return Types
export interface UseScrollProgressReturn {
  scrollProgress: number;
  isScrolled: boolean;
}

export interface UsePerformanceMonitorReturn {
  performanceMode: import('./performance').PerformanceMode;
  metrics: import('./performance').PerformanceMetrics;
  adjustSettings: (mode: string) => void;
}

// API Response Types
export interface SkillsApiResponse {
  skillCategories: SkillCategory[];
}

export interface ProjectsApiResponse {
  projects: Project[];
}