'use client';

import { useEffect } from 'react';

type Options = IntersectionObserverInit & {
  enabled?: boolean;
};

export const useIntersectionObserver = (
  targetRef: React.RefObject<Element | null>,
  onIntersect: () => void,
  { enabled = true, root, rootMargin, threshold }: Options = {}
) => {
  useEffect(() => {
    if (!enabled) return;

    const target = targetRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) onIntersect();
      },
      { root, rootMargin, threshold }
    );

    observer.observe(target);

    return () => {
      observer.unobserve(target);
      observer.disconnect();
    };
  }, [enabled, onIntersect, root, rootMargin, threshold, targetRef]);
};
