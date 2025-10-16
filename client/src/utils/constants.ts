import { type NavItem, type SocialLink } from '../types';

// API Configuration
export const API_BASE_URL = import.meta.env.MODE === 'production' 
  ? 'https://your-production-backend.herokuapp.com'
  : 'http://localhost:3003';

// Portfolio Configuration
export const PORTFOLIO_CONFIG = {
  backend: {
    url: API_BASE_URL,
  },
  emailjs: {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_EMAILJS_SERVICE_ID',
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_EMAILJS_TEMPLATE_ID',
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_EMAILJS_PUBLIC_KEY',
  },
  formspree: {
    formId: import.meta.env.VITE_FORMSPREE_FORM_ID || 'YOUR_FORMSPREE_FORM_ID',
  },
  analytics: {
    enabled: true,
    trackVisitors: true,
  },
  ui: {
    showPerformanceIndicator: false,
    enableAnimations: true,
    theme: 'dark' as const,
  },
} as const;

// Animation Constants
export const ANIMATION_DURATIONS = {
  fast: 0.3,
  normal: 0.6,
  slow: 1.0,
} as const;

export const ANIMATION_EASINGS = {
  easeOut: 'power2.out',
  easeIn: 'power2.in',
  easeInOut: 'power2.inOut',
  bounce: 'bounce.out',
  elastic: 'elastic.out',
} as const;

// Performance Constants
export const PERFORMANCE_THRESHOLDS = {
  fps: {
    high: 55,
    medium: 30,
    low: 15,
  },
  memory: {
    high: 50 * 1024 * 1024, // 50MB
    medium: 100 * 1024 * 1024, // 100MB
  },
  particles: {
    high: 50,
    medium: 25,
    low: 10,
  },
} as const;

// Breakpoints (matching Tailwind CSS)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// Social Media Links
export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: 'GitHub',
    url: 'https://github.com/princekumar7653',
    icon: 'github',
  },
  {
    platform: 'LinkedIn',
    url: 'https://www.linkedin.com/feed/',
    icon: 'linkedin',
  },
  {
    platform: 'Instagram',
    url: 'https://www.instagram.com/prince_singh_53_85/',
    icon: 'instagram',
  },
  {
    platform: 'Email',
    url: 'mailto:chanchalgopalkrishna42@gmail.com',
    icon: 'email',
  },
];

// Navigation Items
export const NAVIGATION_ITEMS = [
  { id: 'hero', label: 'Home', href: '#hero' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'portfolio', label: 'Portfolio', href: '#portfolio' },
  { id: 'blog', label: 'Blog', href: '#blog' },
  { id: 'contact', label: 'Contact', href: '#contact' },
] as const;

// Legacy navigation for compatibility
export const NAV_ITEMS: NavItem[] = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#portfolio' },
  { name: 'Contact', href: '#contact' },
];

// Personal Information
export const PERSONAL_INFO = {
  name: 'Prince Kumar',
  title: 'Modern Frontend Developer',
  description: 'Transforming Ideas into Digital Reality. I craft stunning, high-performance web applications that drive business growth and user engagement. Specializing in modern React ecosystems, responsive design, and cutting-edge animations.',
  image: '/assets/images/princek.jfif',
  stats: [
    { value: 98, label: 'Client Satisfaction', suffix: '%' },
    { value: 2, label: 'Years Experience', suffix: '+' },
    { value: 24, label: 'Hours Response', suffix: 'h' },
  ],
  socialLinks: SOCIAL_LINKS,
};

// Asset paths
export const ASSET_PATHS = {
  images: {
    profile: '/assets/images/princek.jfif',
    projects: '/assets/images/projects/',
    placeholder: '/assets/images/projects/placeholder.svg',
  },
  documents: {
    resume: '/assets/gopal.pdf',
  },
  css: {
    custom: '/assets/css/custom.css',
  },
} as const;

export const SKILLS_CATEGORIES = {
  FRONTEND: 'frontend',
  BACKEND: 'backend',
  TOOLS: 'tools',
  OTHER: 'other',
} as const;