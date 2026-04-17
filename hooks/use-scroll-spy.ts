'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface UseScrollSpyOptions {
  sectionIds: string[];
  rootMargin?: string;
  threshold?: number;
}

export function useScrollSpy({
  sectionIds,
  rootMargin = '-104px 0px 0px 0px',
  threshold = 0.3,
}: UseScrollSpyOptions) {
  const [activeSectionId, setActiveSectionId] = useState<string>(sectionIds[0] ?? '');
  const isUserScrolling = useRef(true);

  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  // Read hash on mount for deep linking
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash && sectionIds.includes(hash)) {
      setActiveSectionId(hash);
      const element = document.getElementById(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({
            behavior: prefersReducedMotion ? 'auto' : 'smooth',
          });
        }, 100);
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // IntersectionObserver for scroll-spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (!isUserScrolling.current) return;

        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActiveSectionId(id);
            history.replaceState(null, '', `#${id}`);
          }
        }
      },
      { rootMargin, threshold },
    );

    for (const id of sectionIds) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }

    return () => observer.disconnect();
  }, [sectionIds, rootMargin, threshold]);

  const scrollToSection = useCallback(
    (sectionId: string) => {
      const element = document.getElementById(sectionId);
      if (!element) return;

      isUserScrolling.current = false;
      setActiveSectionId(sectionId);
      history.replaceState(null, '', `#${sectionId}`);

      element.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });

      // Re-enable scroll-spy after scroll completes
      setTimeout(() => {
        isUserScrolling.current = true;
      }, 500);
    },
    [prefersReducedMotion],
  );

  return { activeSectionId, scrollToSection };
}
