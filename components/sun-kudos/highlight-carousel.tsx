'use client';

import { useRef, useState, useEffect } from 'react';
import { useHighlightKudos } from '@/hooks/use-highlight-kudos';
import { useLanguage } from '@/hooks/use-language';
import { HighlightKudoCard } from '@/components/sun-kudos/highlight-kudo-card';
import { ChevronLeftIcon } from '@/components/icons/chevron-left-icon';
import { ChevronRightIcon } from '@/components/icons/chevron-right-icon';
import type { KudoPost } from '@/types/kudo-feed';

interface HighlightCarouselProps {
  kudos: KudoPost[];
  userId: string;
  userLikedKudoIds: Set<string>;
  onCopyLink: (kudoId: string) => void;
  onHashtagClick?: (hashtag: string) => void;
}

const SLIDE_WIDTH = 528; // card width
const GAP = 24; // gap between cards

export function HighlightCarousel({
  kudos,
  userId,
  userLikedKudoIds,
  onCopyLink,
  onHashtagClick,
}: HighlightCarouselProps) {
  const { t } = useLanguage();
  const { currentSlide, next, prev, canGoNext, canGoPrev } = useHighlightKudos(kudos);
  const trackRef = useRef<HTMLDivElement>(null);
  const [slideWidth, setSlideWidth] = useState(SLIDE_WIDTH + GAP);

  // Calculate slide width dynamically on mount and resize
  useEffect(() => {
    const calculateWidth = () => {
      if (trackRef.current && trackRef.current.children.length > 0) {
        const firstChild = trackRef.current.children[0] as HTMLElement;
        setSlideWidth(firstChild.offsetWidth + GAP);
      }
    };
    calculateWidth();
    window.addEventListener('resize', calculateWidth);
    return () => window.removeEventListener('resize', calculateWidth);
  }, [kudos.length]);

  if (kudos.length === 0) {
    return (
      <div className="flex items-center justify-center py-20 text-base font-bold text-[#999]">
        {t('liveBoard.empty.kudos')}
      </div>
    );
  }

  // Calculate transform offset to center the current slide
  const translateX = -currentSlide * slideWidth;

  return (
    <div className="flex flex-col items-center gap-10">
      {/* Carousel */}
      <div
        className="relative w-full overflow-hidden"
        role="region"
        aria-roledescription="carousel"
        aria-label={t('liveBoard.carousel.ariaLabel')}
      >
        {/* Left Arrow */}
        <button
          type="button"
          onClick={prev}
          disabled={!canGoPrev}
          aria-label={t('liveBoard.carousel.prevSlide')}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex w-12 h-12 items-center justify-center rounded-full bg-white/15 cursor-pointer hover:bg-white/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all max-sm:w-9 max-sm:h-9"
        >
          <ChevronLeftIcon className="w-6 h-6 text-white" />
        </button>

        {/* Cards Track */}
        <div className="flex justify-center px-4 md:px-12 lg:px-36">
          <div
            ref={trackRef}
            className="flex items-center gap-6 py-4 transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(${translateX}px)` }}
            role="group"
            aria-label="slides"
          >
            {kudos.map((kudo, index) => {
              const offset = index - currentSlide;
              const isActive = offset === 0;

              return (
                <div
                  key={kudo.id}
                  className="shrink-0 transition-all duration-300 ease-in-out"
                  style={{
                    transform: isActive ? 'scale(1)' : 'scale(0.9)',
                    opacity: isActive ? 1 : 0.5,
                    zIndex: isActive ? 2 : 1,
                    pointerEvents: isActive ? 'auto' : 'none',
                  }}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${kudos.length}`}
                >
                  <HighlightKudoCard
                    kudo={kudo}
                    userId={userId}
                    userLikedKudoIds={userLikedKudoIds}
                    onCopyLink={onCopyLink}
                    onHashtagClick={onHashtagClick}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Arrow */}
        <button
          type="button"
          onClick={next}
          disabled={!canGoNext}
          aria-label={t('liveBoard.carousel.nextSlide')}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex w-12 h-12 items-center justify-center rounded-full bg-white/15 cursor-pointer hover:bg-white/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all max-sm:w-9 max-sm:h-9"
        >
          <ChevronRightIcon className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Pagination */}
      <div className="flex items-center gap-8 justify-center" aria-live="polite">
        <button
          type="button"
          onClick={prev}
          disabled={!canGoPrev}
          aria-label={t('liveBoard.carousel.prevSlide')}
          className="p-2.5 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeftIcon className="w-6 h-6 text-white" />
        </button>
        <span className="text-[28px] font-bold leading-9 text-[#999] transition-opacity duration-100">
          {currentSlide + 1}/{kudos.length}
        </span>
        <button
          type="button"
          onClick={next}
          disabled={!canGoNext}
          aria-label={t('liveBoard.carousel.nextSlide')}
          className="p-2.5 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRightIcon className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
}
