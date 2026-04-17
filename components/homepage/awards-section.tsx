'use client';

import { useLanguage } from '@/hooks/use-language';
import { AWARD_CATEGORIES } from '@/lib/data/awards';
import { AwardCard } from '@/components/homepage/award-card';

export function AwardsSection() {
  const { t } = useLanguage();

  return (
    <section className="w-full max-w-[1224px] mx-auto px-4 sm:px-12 lg:px-0">
      {/* Divider */}
      <div className="h-px bg-[#2E3940] w-full" />

      {/* Header */}
      <div className="flex flex-col gap-4 mt-4">
        <p className="text-white text-2xl font-bold leading-8">
          {t('awards.caption')}
        </p>
        <h2 className="text-[#FFEA9E] text-[32px] sm:text-[40px] lg:text-[57px] font-bold leading-tight lg:leading-[64px] tracking-[-0.25px]">
          {t('awards.title')}
        </h2>
        <p className="text-white text-base font-normal leading-6 tracking-[0.5px]">
          {t('awards.description')}
        </p>
      </div>

      {/* Award Cards Grid */}
      {AWARD_CATEGORIES.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 lg:gap-20 mt-12 lg:mt-20">
          {AWARD_CATEGORIES.map((award) => (
            <AwardCard key={award.id} award={award} />
          ))}
        </div>
      ) : (
        <div className="mt-12 text-center">
          <p className="text-white/50 text-base">{t('awards.emptyState')}</p>
        </div>
      )}
    </section>
  );
}
