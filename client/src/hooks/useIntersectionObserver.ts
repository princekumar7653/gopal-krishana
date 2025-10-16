import { useEffect, useRef, useState, useCallback } from 'react';
import type { UseIntersectionObserverOptions } from '../types/animations';

/**
 * Custom hook for Intersection Observer API
 * Returns a ref to attach to the element and the intersection state
 */
export const useIntersectionObserver = (
    options: UseIntersectionObserverOptions = {}
): [React.RefObject<HTMLElement | null>, boolean] => {
    const {
        threshold = 0.1,
        rootMargin = '0px',
        triggerOnce = true,
        root = null,
    } = options;

    const elementRef = useRef<HTMLElement>(null);
    const [isIntersecting, setIsIntersecting] = useState(false);
    const [hasTriggered, setHasTriggered] = useState(false);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        // Check if Intersection Observer is supported
        if (!('IntersectionObserver' in window)) {
            console.warn('IntersectionObserver not supported, falling back to visible state');
            setIsIntersecting(true);
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const isCurrentlyIntersecting = entry.isIntersecting;

                    if (triggerOnce) {
                        if (isCurrentlyIntersecting && !hasTriggered) {
                            setIsIntersecting(true);
                            setHasTriggered(true);
                        }
                    } else {
                        setIsIntersecting(isCurrentlyIntersecting);
                    }
                });
            },
            {
                threshold,
                rootMargin,
                root,
            }
        );

        observer.observe(element);

        return () => {
            observer.unobserve(element);
            observer.disconnect();
        };
    }, [threshold, rootMargin, root, triggerOnce, hasTriggered]);

    return [elementRef, isIntersecting];
};

/**
 * Hook for observing multiple elements
 */
export const useMultipleIntersectionObserver = (
    options: UseIntersectionObserverOptions = {}
) => {
    const {
        threshold = 0.1,
        rootMargin = '0px',
        triggerOnce = false,
        root = null,
    } = options;

    const [intersectingElements, setIntersectingElements] = useState<Set<Element>>(new Set());
    const observerRef = useRef<IntersectionObserver | null>(null);
    const elementsRef = useRef<Set<Element>>(new Set());

    const observe = useCallback((element: Element) => {
        if (!element) return;

        elementsRef.current.add(element);

        if (!observerRef.current) {
            if (!('IntersectionObserver' in window)) {
                console.warn('IntersectionObserver not supported');
                return;
            }

            observerRef.current = new IntersectionObserver(
                (entries) => {
                    setIntersectingElements((prev) => {
                        const newSet = new Set(prev);

                        entries.forEach((entry) => {
                            if (entry.isIntersecting) {
                                newSet.add(entry.target);

                                if (triggerOnce) {
                                    observerRef.current?.unobserve(entry.target);
                                }
                            } else if (!triggerOnce) {
                                newSet.delete(entry.target);
                            }
                        });

                        return newSet;
                    });
                },
                {
                    threshold,
                    rootMargin,
                    root,
                }
            );
        }

        observerRef.current.observe(element);
    }, [threshold, rootMargin, root, triggerOnce]);

    const unobserve = useCallback((element: Element) => {
        if (!element || !observerRef.current) return;

        observerRef.current.unobserve(element);
        elementsRef.current.delete(element);

        setIntersectingElements((prev) => {
            const newSet = new Set(prev);
            newSet.delete(element);
            return newSet;
        });
    }, []);

    const disconnect = useCallback(() => {
        if (observerRef.current) {
            observerRef.current.disconnect();
            observerRef.current = null;
        }
        elementsRef.current.clear();
        setIntersectingElements(new Set());
    }, []);

    useEffect(() => {
        return () => {
            disconnect();
        };
    }, [disconnect]);

    return {
        observe,
        unobserve,
        disconnect,
        intersectingElements,
        isIntersecting: (element: Element) => intersectingElements.has(element),
    };
};

/**
 * Hook for lazy loading images with Intersection Observer
 */
export const useLazyImage = (
    src: string,
    options: UseIntersectionObserverOptions = {}
) => {
    const [imageSrc, setImageSrc] = useState<string>('');
    const [isLoaded, setIsLoaded] = useState(false);
    const [isError, setIsError] = useState(false);
    const [elementRef, isIntersecting] = useIntersectionObserver({
        triggerOnce: true,
        ...options,
    });

    useEffect(() => {
        if (isIntersecting && src && !imageSrc) {
            const img = new Image();

            img.onload = () => {
                setImageSrc(src);
                setIsLoaded(true);
            };

            img.onerror = () => {
                setIsError(true);
            };

            img.src = src;
        }
    }, [isIntersecting, src, imageSrc]);

    return {
        elementRef,
        imageSrc,
        isLoaded,
        isError,
        isIntersecting,
    };
};

/**
 * Hook for triggering animations when elements come into view
 */
export const useAnimateOnScroll = (
    animationCallback: () => void,
    options: UseIntersectionObserverOptions = {}
) => {
    const [elementRef, isIntersecting] = useIntersectionObserver({
        triggerOnce: true,
        threshold: 0.2,
        ...options,
    });

    useEffect(() => {
        if (isIntersecting) {
            animationCallback();
        }
    }, [isIntersecting, animationCallback]);

    return elementRef;
};

/**
 * Hook for tracking which section is currently in view (for navigation)
 */
export const useActiveSection = (sectionIds: string[]) => {
    const [activeSection, setActiveSection] = useState<string>('');
    const { observe, intersectingElements } = useMultipleIntersectionObserver({
        threshold: 0.3,
        rootMargin: '-80px 0px -50% 0px', // Account for header height
    });

    useEffect(() => {
        // Observe all sections
        sectionIds.forEach((id) => {
            const element = document.getElementById(id);
            if (element) {
                observe(element);
            }
        });
    }, [sectionIds, observe]);

    useEffect(() => {
        // Find the topmost intersecting section
        const intersectingSections = sectionIds.filter((id) => {
            const element = document.getElementById(id);
            return element && intersectingElements.has(element);
        });

        if (intersectingSections.length > 0) {
            // Get the first intersecting section (topmost)
            setActiveSection(intersectingSections[0]);
        }
    }, [intersectingElements, sectionIds]);

    return activeSection;
};

export default useIntersectionObserver;