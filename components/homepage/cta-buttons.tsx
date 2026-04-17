'use client';

import Link from 'next/link';
import { useLanguage } from '@/hooks/use-language';
import { ArrowRightIcon } from '@/components/icons';

export function CTAButtons() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-10">
      <Link
        href="/awards-information"
        className="
          group relative inline-flex items-center justify-center gap-2
          min-w-[276px] h-[60px] px-6 py-4 rounded-lg
          bg-[#FFEA9E] text-[#00101A]
          font-bold text-[22px] leading-7
          transition-all duration-200 cursor-pointer
          hover:bg-[rgba(255,234,158,0.10)] hover:text-white hover:border hover:border-[#998C5F]
          focus:outline-2 focus:outline-[#FFEA9E] focus:outline-offset-2
        "
      >
        {t('cta.aboutAwards')}
        <ArrowRightIcon className="w-6 h-6" />
      </Link>

      <Link
        href="/sun-kudos"
        className="
          group relative inline-flex items-center justify-center gap-2
          min-w-[254px] h-[60px] px-6 py-4 rounded-lg
          bg-[rgba(255,234,158,0.10)] text-white
          border border-[#998C5F]
          font-bold text-[22px] leading-7
          transition-all duration-200 cursor-pointer
          hover:bg-[#FFEA9E] hover:text-[#00101A] hover:border-transparent
          focus:outline-2 focus:outline-[#FFEA9E] focus:outline-offset-2
        "
      >
        {t('cta.aboutKudos')}
        <ArrowRightIcon className="w-6 h-6" />
      </Link>
    </div>
  );
}
