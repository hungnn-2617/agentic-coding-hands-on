'use client';

import { useState, useCallback, useEffect } from 'react';
import type { KudoPost } from '@/types/kudo-feed';

export function useHighlightKudos(kudos: KudoPost[]) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Clamp currentSlide when kudos array changes
  useEffect(() => {
    setCurrentSlide((prev) => {
      if (kudos.length === 0) return 0;
      return Math.min(prev, kudos.length - 1);
    });
  }, [kudos.length]);

  const canGoNext = kudos.length > 0 && currentSlide < kudos.length - 1;
  const canGoPrev = kudos.length > 0 && currentSlide > 0;

  const next = useCallback(() => {
    setCurrentSlide((prev) => Math.min(prev + 1, kudos.length - 1));
  }, [kudos.length]);

  const prev = useCallback(() => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  }, []);

  const goTo = useCallback(
    (index: number) => {
      setCurrentSlide(Math.max(0, Math.min(index, kudos.length - 1)));
    },
    [kudos.length],
  );

  return { currentSlide, next, prev, goTo, canGoNext, canGoPrev };
}
