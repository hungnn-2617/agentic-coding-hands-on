'use client';

import { useLanguage } from '@/hooks/use-language';

export function PrizeTitleSection() {
  const { t } = useLanguage();

  return (
    <section className="flex flex-col items-center gap-4 lg:gap-8 w-full">
      <p className="text-white text-lg sm:text-xl lg:text-2xl font-bold leading-8">
        {t('prizePage.subtitle')}
      </p>
      <h1 className="text-[#FFEA9E] text-[32px] sm:text-[40px] lg:text-[57px] font-bold leading-tight lg:leading-[64px] tracking-[-0.25px] text-center">
        {t('prizePage.title')}
      </h1>
    </section>
  );
}
