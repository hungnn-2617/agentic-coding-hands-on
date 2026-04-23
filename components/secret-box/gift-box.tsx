'use client';

import Image from 'next/image';
import { useLanguage } from '@/hooks/use-language';
import type { GiftBoxProps } from '@/types/secret-box';

/**
 * GiftBox Component
 *
 * Interactive gift box image with glow effect overlay.
 * Handles click, keyboard, and various interaction states.
 */
export function GiftBox({ isDisabled, isOpening, onClick }: GiftBoxProps) {
  const { t } = useLanguage();

  function handleClick() {
    if (isDisabled || isOpening) return;
    onClick();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }

  const isInteractive = !isDisabled && !isOpening;

  return (
    <div
      role="button"
      tabIndex={isDisabled ? -1 : 0}
      aria-label={t('secretBox.boxAria')}
      aria-disabled={isDisabled || isOpening}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`
        relative w-full max-w-[557px] aspect-square
        outline-none
        transition-transform duration-200 ease-out
        ${isInteractive ? 'cursor-pointer hover:scale-[1.02] active:scale-[0.98]' : ''}
        ${isDisabled ? 'opacity-60 grayscale-[30%] cursor-not-allowed' : ''}
        ${isOpening ? 'cursor-wait pointer-events-none' : ''}
        focus-visible:ring-2 focus-visible:ring-[#FFEA9E] focus-visible:ring-offset-4 focus-visible:ring-offset-[#00101A]
      `}
    >
      {/* Glow effect overlay - behind the box */}
      <div
        className={`
          absolute inset-0 z-0
          ${isOpening ? 'animate-[box-shake_0.1s_ease-in-out_infinite]' : 'animate-[glow-pulse_2s_ease-in-out_infinite]'}
        `}
      >
        <Image
          src="/images/secret-box/glow-effect.png"
          alt=""
          fill
          sizes="(max-width: 768px) 400px, 557px"
          className="object-contain"
          priority
        />
      </div>

      {/* Gift box image - on top */}
      <div
        className={`
          relative z-10 w-full h-full
          ${isOpening ? 'animate-[box-shake_0.1s_ease-in-out_infinite]' : ''}
        `}
      >
        <Image
          src="/images/secret-box/gift-box.png"
          alt=""
          fill
          sizes="(max-width: 768px) 400px, 557px"
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}
