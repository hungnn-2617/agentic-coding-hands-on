'use client';

import { CloseIcon } from '@/components/icons/close-icon';
import { useLanguage } from '@/hooks/use-language';
import type { ModalHeaderProps } from '@/types/secret-box';

/**
 * ModalHeader Component
 *
 * Modal title and close button row.
 * Title: "KHÁM PHÁ SECRET BOX CỦA BẠN"
 * Close button positioned absolutely on the right.
 */
export function ModalHeader({ onClose }: ModalHeaderProps) {
  const { t } = useLanguage();

  return (
    <div className="relative w-full flex items-center justify-center">
      {/* Title - centered */}
      <h2
        id="secret-box-modal-title"
        className="
          font-montserrat text-[20px] md:text-[25.46px]
          font-bold leading-[31.82px] text-[#FFEA9E] text-center
        "
      >
        {t('secretBox.title')}
      </h2>

      {/* Close button - absolute right */}
      <button
        type="button"
        onClick={onClose}
        aria-label={t('secretBox.closeAria')}
        className="
          absolute right-0 top-1/2 -translate-y-1/2
          w-[19px] h-[19px] flex items-center justify-center
          text-white opacity-100
          hover:opacity-80 active:opacity-60
          transition-opacity duration-150 ease-in-out
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFEA9E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#00101A]
          rounded
        "
      >
        <CloseIcon className="w-[19px] h-[19px]" />
      </button>
    </div>
  );
}
