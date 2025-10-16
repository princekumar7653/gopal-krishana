// Export all custom hooks
export { 
  useScrollProgress, 
  useSmoothScroll, 
  useScrollDirection 
} from './useScrollProgress';

export { 
  useIntersectionObserver,
  useMultipleIntersectionObserver,
  useLazyImage,
  useAnimateOnScroll,
  useActiveSection
} from './useIntersectionObserver';

export { 
  useGSAP,
  useGSAPTimeline,
  useScrollTrigger,
  useTypingAnimation,
  useCounterAnimation,
  useSlideAnimation
} from './useGSAP';

// Re-export existing hooks
export { useAppDispatch, useAppSelector } from './redux';