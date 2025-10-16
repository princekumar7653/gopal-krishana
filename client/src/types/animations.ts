// Animation related types and interfaces

import { type RefObject } from 'react';

export type AnimationType = 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'fade-in' | 'scale-in';

export interface AnimationConfig {
  type: AnimationType;
  duration?: number;
  delay?: number;
  ease?: string;
  stagger?: number;
}

export interface ScrollTriggerConfig {
  trigger: string | HTMLElement;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  markers?: boolean;
}

export interface GSAPTimelineConfig {
  paused?: boolean;
  repeat?: number;
  yoyo?: boolean;
  delay?: number;
}

export interface UseGSAPOptions {
  scope?: RefObject<HTMLElement>;
  dependencies?: any[];
  revertOnUpdate?: boolean;
}

export interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
  root?: Element | null;
}

export interface UseScrollProgressOptions {
  throttle?: number;
  offset?: number;
}

// Animation error types
export interface AnimationError {
  message: string;
  component: string;
  animation: string;
  stack?: string;
}

// Performance related animation types
export interface AnimationPerformanceConfig {
  enableAnimations: boolean;
  reducedMotion: boolean;
  performanceMode: 'high' | 'medium' | 'low';
  maxParticles: number;
  enable3D: boolean;
}

// Particle system types
export interface ParticleConfig {
  count: number;
  size: {
    min: number;
    max: number;
  };
  speed: {
    min: number;
    max: number;
  };
  color: string;
  opacity: {
    min: number;
    max: number;
  };
}

export interface ThreeJSConfig {
  enableWebGL: boolean;
  antialias: boolean;
  alpha: boolean;
  powerPreference: 'default' | 'high-performance' | 'low-power';
}