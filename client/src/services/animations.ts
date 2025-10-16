// Animation service using GSAP
// Note: Install GSAP with: npm install gsap

import type { 
  AnimationConfig, 
  ScrollTriggerConfig, 
  GSAPTimelineConfig
} from '../types/animations';

// GSAP will be imported dynamically to handle cases where it's not installed
let gsap: any = null;
let ScrollTrigger: any = null;
let TextPlugin: any = null;

class AnimationService {
  private isInitialized = false;
  private initializationPromise: Promise<void> | null = null;

  /**
   * Initialize GSAP and plugins
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) return;
    
    if (this.initializationPromise) {
      return this.initializationPromise;
    }

    this.initializationPromise = this.loadGSAP();
    return this.initializationPromise;
  }

  /**
   * Load GSAP dynamically
   */
  private async loadGSAP(): Promise<void> {
    try {
      // Try to import GSAP
      const gsapModule = await import('gsap');
      gsap = gsapModule.gsap || gsapModule.default;

      // Load ScrollTrigger plugin
      try {
        const scrollTriggerModule = await import('gsap/ScrollTrigger');
        ScrollTrigger = scrollTriggerModule.ScrollTrigger || scrollTriggerModule.default;
        gsap.registerPlugin(ScrollTrigger);
      } catch (error) {
        console.warn('ScrollTrigger plugin not available:', error);
      }

      // Load TextPlugin
      try {
        const textPluginModule = await import('gsap/TextPlugin');
        TextPlugin = textPluginModule.TextPlugin || textPluginModule.default;
        gsap.registerPlugin(TextPlugin);
      } catch (error) {
        console.warn('TextPlugin not available:', error);
      }

      this.isInitialized = true;
      console.log('GSAP initialized successfully');
    } catch (error) {
      console.error('Failed to load GSAP:', error);
      // Provide fallback functionality
      this.createFallbackGSAP();
    }
  }

  /**
   * Create fallback GSAP-like functionality for when GSAP is not available
   */
  private createFallbackGSAP(): void {
    gsap = {
      to: (target: any, vars: any) => this.fallbackAnimation(target, vars),
      from: (target: any, vars: any) => this.fallbackAnimation(target, vars),
      fromTo: (target: any, _fromVars: any, toVars: any) => this.fallbackAnimation(target, toVars),
      timeline: () => ({
        to: (target: any, vars: any) => this.fallbackAnimation(target, vars),
        from: (target: any, vars: any) => this.fallbackAnimation(target, vars),
        play: () => {},
        pause: () => {},
        reverse: () => {},
      }),
      registerPlugin: () => {},
      set: (target: any, vars: any) => this.setStyles(target, vars),
    };

    ScrollTrigger = {
      create: () => ({}),
      refresh: () => {},
      update: () => {},
    };

    this.isInitialized = true;
    console.warn('Using fallback animation system (GSAP not available)');
  }

  /**
   * Fallback animation using CSS transitions
   */
  private fallbackAnimation(target: any, vars: any): any {
    const elements = typeof target === 'string' ? document.querySelectorAll(target) : [target];
    
    elements.forEach((element) => {
      if (!element || !(element instanceof HTMLElement)) return;

      const duration = vars.duration || 0.5;
      element.style.transition = `all ${duration}s ease-out`;

      // Apply styles
      Object.keys(vars).forEach(key => {
        if (key === 'duration' || key === 'delay' || key === 'ease') return;
        
        if (key === 'x') {
          element.style.transform = `translateX(${vars[key]}px)`;
        } else if (key === 'y') {
          element.style.transform = `translateY(${vars[key]}px)`;
        } else if (key === 'opacity') {
          element.style.opacity = vars[key];
        } else if (key === 'scale') {
          element.style.transform = `scale(${vars[key]})`;
        }
      });
    });

    return { play: () => {}, pause: () => {}, reverse: () => {} };
  }

  /**
   * Set styles immediately
   */
  private setStyles(target: any, vars: any): void {
    const elements = typeof target === 'string' ? document.querySelectorAll(target) : [target];
    
    elements.forEach((element) => {
      if (!element || !(element instanceof HTMLElement)) return;

      Object.keys(vars).forEach(key => {
        if (key === 'x') {
          element.style.transform = `translateX(${vars[key]}px)`;
        } else if (key === 'y') {
          element.style.transform = `translateY(${vars[key]}px)`;
        } else if (key === 'opacity') {
          element.style.opacity = vars[key];
        } else if (key === 'scale') {
          element.style.transform = `scale(${vars[key]})`;
        }
      });
    });
  }

  /**
   * Create a scroll trigger animation
   */
  async createScrollTrigger(
    element: HTMLElement | string, 
    animation: any,
    config: Partial<ScrollTriggerConfig> = {}
  ): Promise<any> {
    await this.initialize();

    if (!ScrollTrigger) {
      console.warn('ScrollTrigger not available');
      return null;
    }

    try {
      return ScrollTrigger.create({
        trigger: element,
        start: config.start || 'top 80%',
        end: config.end || 'bottom 20%',
        animation: animation,
        toggleActions: 'play none none reverse',
        ...config,
      });
    } catch (error) {
      this.handleAnimationError('createScrollTrigger', error);
      return null;
    }
  }

  /**
   * Create typing animation
   */
  async createTypingAnimation(
    element: HTMLElement | string, 
    text: string,
    config: Partial<AnimationConfig> = {}
  ): Promise<any> {
    await this.initialize();

    try {
      const target = typeof element === 'string' ? document.querySelector(element) : element;
      if (!target) return null;

      if (TextPlugin && gsap) {
        return gsap.to(target, {
          duration: config.duration || 2,
          text: text,
          ease: config.ease || 'none',
          delay: config.delay || 0,
        });
      } else {
        // Fallback typing animation
        return this.fallbackTypingAnimation(target as HTMLElement, text, config);
      }
    } catch (error) {
      this.handleAnimationError('createTypingAnimation', error);
      return null;
    }
  }

  /**
   * Fallback typing animation
   */
  private fallbackTypingAnimation(
    element: HTMLElement, 
    text: string, 
    config: Partial<AnimationConfig>
  ): any {
    let index = 0;
    const speed = (config.duration || 2) * 1000 / text.length;

    const typeChar = () => {
      if (index < text.length) {
        element.textContent = text.substring(0, index + 1);
        index++;
        setTimeout(typeChar, speed);
      }
    };

    setTimeout(typeChar, config.delay || 0);
    return { play: () => {}, pause: () => {}, reverse: () => {} };
  }

  /**
   * Create counter animation
   */
  async createCounterAnimation(
    element: HTMLElement | string, 
    target: number,
    config: Partial<AnimationConfig> = {}
  ): Promise<any> {
    await this.initialize();

    try {
      const targetElement = typeof element === 'string' ? document.querySelector(element) : element;
      if (!targetElement) return null;

      const obj = { value: 0 };

      if (gsap) {
        return gsap.to(obj, {
          duration: config.duration || 2,
          value: target,
          ease: config.ease || 'power2.out',
          delay: config.delay || 0,
          onUpdate: () => {
            (targetElement as HTMLElement).textContent = Math.round(obj.value).toString();
          },
        });
      } else {
        // Fallback counter animation
        return this.fallbackCounterAnimation(targetElement as HTMLElement, target, config);
      }
    } catch (error) {
      this.handleAnimationError('createCounterAnimation', error);
      return null;
    }
  }

  /**
   * Fallback counter animation
   */
  private fallbackCounterAnimation(
    element: HTMLElement, 
    target: number, 
    config: Partial<AnimationConfig>
  ): any {
    const duration = (config.duration || 2) * 1000;
    const steps = 60; // 60 FPS
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const animate = () => {
      if (step < steps) {
        current += increment;
        element.textContent = Math.round(current).toString();
        step++;
        setTimeout(animate, duration / steps);
      } else {
        element.textContent = target.toString();
      }
    };

    setTimeout(animate, config.delay || 0);
    return { play: () => {}, pause: () => {}, reverse: () => {} };
  }

  /**
   * Create slide animation
   */
  async slideIn(
    element: HTMLElement | string,
    direction: 'up' | 'down' | 'left' | 'right' = 'up',
    config: Partial<AnimationConfig> = {}
  ): Promise<any> {
    await this.initialize();

    try {
      const target = typeof element === 'string' ? document.querySelector(element) : element;
      if (!target) return null;

      const distance = 50;
      let fromVars: any = { opacity: 0 };
      let toVars: any = { opacity: 1 };

      switch (direction) {
        case 'up':
          fromVars.y = distance;
          toVars.y = 0;
          break;
        case 'down':
          fromVars.y = -distance;
          toVars.y = 0;
          break;
        case 'left':
          fromVars.x = distance;
          toVars.x = 0;
          break;
        case 'right':
          fromVars.x = -distance;
          toVars.x = 0;
          break;
      }

      if (gsap) {
        gsap.set(target, fromVars);
        return gsap.to(target, {
          ...toVars,
          duration: config.duration || 0.6,
          ease: config.ease || 'power2.out',
          delay: config.delay || 0,
        });
      } else {
        return this.fallbackAnimation(target, toVars);
      }
    } catch (error) {
      this.handleAnimationError('slideIn', error);
      return null;
    }
  }

  /**
   * Create fade animation
   */
  async fadeIn(
    element: HTMLElement | string,
    config: Partial<AnimationConfig> = {}
  ): Promise<any> {
    await this.initialize();

    try {
      const target = typeof element === 'string' ? document.querySelector(element) : element;
      if (!target) return null;

      if (gsap) {
        gsap.set(target, { opacity: 0 });
        return gsap.to(target, {
          opacity: 1,
          duration: config.duration || 0.6,
          ease: config.ease || 'power2.out',
          delay: config.delay || 0,
        });
      } else {
        return this.fallbackAnimation(target, { opacity: 1 });
      }
    } catch (error) {
      this.handleAnimationError('fadeIn', error);
      return null;
    }
  }

  /**
   * Create timeline
   */
  async createTimeline(config: GSAPTimelineConfig = {}): Promise<any> {
    await this.initialize();

    try {
      if (gsap) {
        return gsap.timeline(config);
      } else {
        return {
          to: (target: any, vars: any) => this.fallbackAnimation(target, vars),
          from: (target: any, vars: any) => this.fallbackAnimation(target, vars),
          play: () => {},
          pause: () => {},
          reverse: () => {},
        };
      }
    } catch (error) {
      this.handleAnimationError('createTimeline', error);
      return null;
    }
  }

  /**
   * Refresh ScrollTrigger
   */
  async refreshScrollTrigger(): Promise<void> {
    await this.initialize();

    if (ScrollTrigger) {
      ScrollTrigger.refresh();
    }
  }

  /**
   * Kill all animations
   */
  async killAll(): Promise<void> {
    await this.initialize();

    if (gsap) {
      gsap.killTweensOf('*');
    }

    if (ScrollTrigger) {
      ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
    }
  }

  /**
   * Handle animation errors
   */
  private handleAnimationError(method: string, error: any): void {
    const animationError = new AnimationError(
      `Animation error in ${method}: ${error.message}`,
      'AnimationService',
      method
    );
    
    console.error(animationError);
    
    // You could emit this error to an error tracking service
    // errorTrackingService.captureError(animationError);
  }

  /**
   * Check if GSAP is available
   */
  isGSAPAvailable(): boolean {
    return this.isInitialized && gsap !== null;
  }

  /**
   * Get GSAP instance (for advanced usage)
   */
  getGSAP(): any {
    return gsap;
  }

  /**
   * Get ScrollTrigger instance (for advanced usage)
   */
  getScrollTrigger(): any {
    return ScrollTrigger;
  }
}

// Create AnimationError class
class AnimationError extends Error {
  public component: string;
  public animation: string;

  constructor(message: string, component: string, animation: string) {
    super(message);
    this.name = 'AnimationError';
    this.component = component;
    this.animation = animation;
  }
}

// Create and export singleton instance
export const animationService = new AnimationService();
export default AnimationService;