import { useEffect, useRef, useCallback } from 'react';
import { animationService } from '../services/animations';
import type { UseGSAPOptions } from '../types/animations';

/**
 * Custom hook for GSAP animations with automatic cleanup
 */
export const useGSAP = (
  callback: () => void | (() => void),
  options: UseGSAPOptions = {}
): void => {
  const { dependencies = [], revertOnUpdate = true } = options;
  const cleanupRef = useRef<(() => void) | null>(null);
  const isInitializedRef = useRef(false);

  const runAnimation = useCallback(async () => {
    // Clean up previous animation if needed
    if (cleanupRef.current && revertOnUpdate) {
      cleanupRef.current();
      cleanupRef.current = null;
    }

    try {
      // Initialize GSAP if not already done
      await animationService.initialize();

      // Run the animation callback
      const cleanup = callback();
      
      // Store cleanup function if returned
      if (typeof cleanup === 'function') {
        cleanupRef.current = cleanup;
      }

      isInitializedRef.current = true;
    } catch (error) {
      console.error('GSAP animation error:', error);
    }
  }, [callback, revertOnUpdate]);

  useEffect(() => {
    runAnimation();

    // Cleanup on unmount
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, [runAnimation, ...dependencies]);
};

/**
 * Hook for creating GSAP timelines with automatic cleanup
 */
export const useGSAPTimeline = (
  options: UseGSAPOptions = {}
) => {
  const timelineRef = useRef<any>(null);
  const { dependencies = [] } = options;

  const createTimeline = useCallback(async (config = {}) => {
    await animationService.initialize();
    
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    timelineRef.current = await animationService.createTimeline(config);
    return timelineRef.current;
  }, []);

  const getTimeline = useCallback(() => {
    return timelineRef.current;
  }, []);

  const killTimeline = useCallback(() => {
    if (timelineRef.current) {
      timelineRef.current.kill();
      timelineRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      killTimeline();
    };
  }, [...dependencies]);

  return {
    createTimeline,
    getTimeline,
    killTimeline,
  };
};

/**
 * Hook for scroll-triggered animations
 */
export const useScrollTrigger = (
  animationCallback: () => any,
  triggerElement: string | HTMLElement,
  options: {
    start?: string;
    end?: string;
    scrub?: boolean | number;
    pin?: boolean;
    markers?: boolean;
    onEnter?: () => void;
    onLeave?: () => void;
    onEnterBack?: () => void;
    onLeaveBack?: () => void;
  } = {}
) => {
  const scrollTriggerRef = useRef<any>(null);
  const animationRef = useRef<any>(null);

  const createScrollTrigger = useCallback(async () => {
    await animationService.initialize();

    // Clean up previous scroll trigger
    if (scrollTriggerRef.current) {
      scrollTriggerRef.current.kill();
    }

    // Create animation
    const animation = animationCallback();
    animationRef.current = animation;

    // Create scroll trigger
    scrollTriggerRef.current = await animationService.createScrollTrigger(
      triggerElement,
      animation,
      {
        start: options.start || 'top 80%',
        end: options.end || 'bottom 20%',
        scrub: options.scrub,
        pin: options.pin,
        markers: options.markers,
      }
    );

    return scrollTriggerRef.current;
  }, [animationCallback, triggerElement, options]);

  const killScrollTrigger = useCallback(() => {
    if (scrollTriggerRef.current) {
      scrollTriggerRef.current.kill();
      scrollTriggerRef.current = null;
    }
    if (animationRef.current) {
      animationRef.current.kill();
      animationRef.current = null;
    }
  }, []);

  const refreshScrollTrigger = useCallback(async () => {
    await animationService.refreshScrollTrigger();
  }, []);

  useEffect(() => {
    createScrollTrigger();

    return () => {
      killScrollTrigger();
    };
  }, [createScrollTrigger, killScrollTrigger]);

  return {
    scrollTrigger: scrollTriggerRef.current,
    animation: animationRef.current,
    refresh: refreshScrollTrigger,
    kill: killScrollTrigger,
  };
};

/**
 * Hook for typing animations
 */
export const useTypingAnimation = (
  text: string,
  options: {
    duration?: number;
    delay?: number;
    cursor?: boolean;
    onComplete?: () => void;
  } = {}
) => {
  const elementRef = useRef<HTMLElement>(null);
  const animationRef = useRef<any>(null);

  const startAnimation = useCallback(async () => {
    if (!elementRef.current) return;

    await animationService.initialize();

    if (animationRef.current) {
      animationRef.current.kill();
    }

    animationRef.current = await animationService.createTypingAnimation(
      elementRef.current,
      text,
      {
        duration: options.duration || 2,
        delay: options.delay || 0,
      }
    );

    if (options.onComplete && animationRef.current) {
      animationRef.current.eventCallback('onComplete', options.onComplete);
    }
  }, [text, options]);

  const stopAnimation = useCallback(() => {
    if (animationRef.current) {
      animationRef.current.kill();
      animationRef.current = null;
    }
  }, []);

  useEffect(() => {
    startAnimation();

    return () => {
      stopAnimation();
    };
  }, [startAnimation, stopAnimation]);

  return {
    elementRef,
    animation: animationRef.current,
    start: startAnimation,
    stop: stopAnimation,
  };
};

/**
 * Hook for counter animations
 */
export const useCounterAnimation = (
  targetValue: number,
  options: {
    duration?: number;
    delay?: number;
    ease?: string;
    onUpdate?: (value: number) => void;
    onComplete?: () => void;
  } = {}
) => {
  const elementRef = useRef<HTMLElement>(null);
  const animationRef = useRef<any>(null);

  const startAnimation = useCallback(async () => {
    if (!elementRef.current) return;

    await animationService.initialize();

    if (animationRef.current) {
      animationRef.current.kill();
    }

    animationRef.current = await animationService.createCounterAnimation(
      elementRef.current,
      targetValue,
      {
        duration: options.duration || 2,
        delay: options.delay || 0,
        ease: options.ease || 'power2.out',
      }
    );

    if (options.onComplete && animationRef.current) {
      animationRef.current.eventCallback('onComplete', options.onComplete);
    }
  }, [targetValue, options]);

  const stopAnimation = useCallback(() => {
    if (animationRef.current) {
      animationRef.current.kill();
      animationRef.current = null;
    }
  }, []);

  useEffect(() => {
    startAnimation();

    return () => {
      stopAnimation();
    };
  }, [startAnimation, stopAnimation]);

  return {
    elementRef,
    animation: animationRef.current,
    start: startAnimation,
    stop: stopAnimation,
  };
};

/**
 * Hook for slide-in animations
 */
export const useSlideAnimation = (
  direction: 'up' | 'down' | 'left' | 'right' = 'up',
  options: {
    duration?: number;
    delay?: number;
    ease?: string;
    trigger?: boolean;
  } = {}
) => {
  const elementRef = useRef<HTMLElement>(null);
  const animationRef = useRef<any>(null);
  const { trigger = true } = options;

  const startAnimation = useCallback(async () => {
    if (!elementRef.current || !trigger) return;

    await animationService.initialize();

    if (animationRef.current) {
      animationRef.current.kill();
    }

    animationRef.current = await animationService.slideIn(
      elementRef.current,
      direction,
      {
        duration: options.duration || 0.6,
        delay: options.delay || 0,
        ease: options.ease || 'power2.out',
      }
    );
  }, [direction, options, trigger]);

  useEffect(() => {
    startAnimation();

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [startAnimation]);

  return {
    elementRef,
    animation: animationRef.current,
  };
};

export default useGSAP;