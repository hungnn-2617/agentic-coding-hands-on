'use client';

import { useLanguage } from '@/hooks/use-language';
import { SECRET_BOX_MAX_DISPLAY_COUNT } from '@/types/secret-box';
import type { CountDisplayProps } from '@/types/secret-box';

/**
 * Format count for display
 * - Zero-padded to 2 digits for counts <= 99
 * - Shows "99+" for counts > 99
 */
function formatCount(count: number): string {
  if (count > SECRET_BOX_MAX_DISPLAY_COUNT) {
    return '99+';
  }
  return count.toString().padStart(2, '0');
}

/**
 * CountDisplay Component
 *
 * Displays the number of unopened secret boxes with a label.
 * Layout: Label (left) - Number (right)
 */
export function CountDisplay({ count, isAnimating = false }: CountDisplayProps) {
  const { t } = useLanguage();
  const displayCount = formatCount(count);

  return (
    <div className="flex flex-row items-center justify-center gap-[6.36px]">
      {/* Label */}
      <span
        className="
          font-montserrat text-[12.73px] font-bold leading-[19.09px]
          tracking-[0.4px] text-white text-right
        "
      >
        {t('secretBox.countLabel')}
      </span>

      {/* Count number */}
      <span
        className={`
          font-montserrat text-[28.64px] font-bold leading-[35px]
          text-[#FFEA9E] text-right min-w-[37px]
          ${isAnimating ? 'animate-[count-pop_0.2s_ease-out]' : ''}
        `}
      >
        {displayCount}
      </span>
    </div>
  );
}
