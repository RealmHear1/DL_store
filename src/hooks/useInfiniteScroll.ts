import React, {useEffect} from "react";

interface UseInfiniteScrollProps<T extends Element> {
  targetRef: React.RefObject<T | null>
  isLoading: boolean | null
  onIntersect: () => void
  rootMargin?: string
  threshold?: number
}

export const useInfiniteScroll = <T extends Element> ({targetRef, isLoading, onIntersect, rootMargin = '120px', threshold = 0.1}: UseInfiniteScrollProps<T>) => {
  useEffect(() => {
    if (!targetRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !isLoading) {
          onIntersect()
        }
      },
      {
        root: null,
        rootMargin: rootMargin,
        threshold: threshold,
      }
    );
    observer.observe(targetRef.current);
    return () => observer.disconnect();
  }, [targetRef, isLoading, onIntersect, rootMargin, threshold, targetRef.current])
}