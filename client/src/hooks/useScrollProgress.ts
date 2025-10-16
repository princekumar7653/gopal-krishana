import { useState, useEffect, useCallback } from 'react';
import type { UseScrollProgressOptions } from '../types/animations';

// Define the return type here since it's not in animations types
interface UseScrollProgressReturn {
  scrollProgress: number;
  isScrolled: boolean;
}

/**
 * Custom hook for tracking scroll progress and scroll state
 */
export const useScrollProgress = (
  options: UseScrollProgressOptions = {}
): UseScrollProgressReturn => {
  const { throttle = 16, offset = 100 } = options; // 16ms ≈ 60fps
  
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const updateScrollProgress = useCallback(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    // Calculate scroll progress (0 to 1)
    const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
    setScrollProgress(progress);
    
    // Update scrolled state based on offset
    setIsScrolled(scrollTop > offset);
  }, [offset]);

  const throttledUpdateScrollProgress = useCallback(() => {
    let timeoutId: number;
    let lastExecTime = 0;

    return () => {
      const currentTime = Date.now();
      
      if (currentTime - lastExecTime > throttle) {
        updateScrollProgress();
        lastExecTime = currentTime;
      } else {
        window.clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => {
          updateScrollProgress();
          lastExecTime = Date.now();
        }, throttle - (currentTime - lastExecTime));
      }
    };
  }, [updateScrollProgress, throttle]);

  useEffect(() => {
    const handleScroll = throttledUpdateScrollProgress();
    
    // Initial calculation
    updateScrollProgress();
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Add resize listener to recalculate on window resize
    const handleResize = () => {
      updateScrollProgress();
    };
    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [updateScrollProgress, throttledUpdateScrollProgress]);

  return {
    scrollProgress,
    isScrolled,
  };
};

/**
 * Hook for smooth scrolling to elements
 */
export const useSmoothScroll = () => {
  const scrollToElement = useCallback((
    target: string | HTMLElement,
    options: {
      offset?: number;
      behavior?: ScrollBehavior;
      block?: ScrollLogicalPosition;
    } = {}
  ) => {
    const {
      offset = 80, // Default header height offset
      behavior = 'smooth'
    } = options;

    let element: HTMLElement | null = null;

    if (typeof target === 'string') {
      element = document.querySelector(target);
    } else {
      element = target;
    }

    if (!element) {
      console.warn(`Element not found: ${target}`);
      return;
    }

    const elementPosition = element.offsetTop - offset;
    
    window.scrollTo({
      top: elementPosition,
      behavior,
    });
  }, []);

  const scrollToTop = useCallback((behavior: ScrollBehavior = 'smooth') => {
    window.scrollTo({
      top: 0,
      behavior,
    });
  }, []);

  return {
    scrollToElement,
    scrollToTop,
  };
};

/**
 * Hook for detecting scroll direction
 */
export const useScrollDirection = (threshold = 10) => {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;
      const difference = Math.abs(currentScrollY - lastScrollY);

      if (difference < threshold) {
        return;
      }

      if (currentScrollY > lastScrollY) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY, threshold]);

  return scrollDirection;
};

export default useScrollProgress;