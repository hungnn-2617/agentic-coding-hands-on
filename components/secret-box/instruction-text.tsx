'use client';

import { useLanguage } from '@/hooks/use-language';
import type { InstructionTextProps } from '@/types/secret-box';

/**
 * InstructionText Component
 *
 * Displays the instruction "Click vào box để mở".
 * Hidden when user has 0 unopened boxes.
 */
export function InstructionText({ isVisible }: InstructionTextProps) {
  const { t } = useLanguage();

  if (!isVisible) {
    return null;
  }

  return (
    <div className="flex items-center justify-center">
      <span
        className="
          font-montserrat text-[12.73px] font-bold leading-[19.09px]
          tracking-[0.4px] text-white text-center
        "
      >
        {t('secretBox.instruction')}
      </span>
    </div>
  );
}
