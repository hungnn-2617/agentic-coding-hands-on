'use client';

import { useLanguage } from '@/hooks/use-language';
import { AWARD_CATEGORIES } from '@/lib/data/awards';
import { AwardDetailCard } from './award-detail-card';
import { PrizeSidebar } from './prize-sidebar';

export function PrizeContentSection() {
  const { locale, t } = useLanguage();

  return (
    <section className="flex flex-col lg:flex-row gap-6 lg:gap-20 w-full">
      <PrizeSidebar />

      {/* Award cards list */}
      <div className="flex flex-col gap-10 lg:gap-20 flex-1">
        {AWARD_CATEGORIES.map((award, index) => {
          const description =
            locale === 'en'
              ? (award.fullDescriptionEn ?? award.fullDescription)
              : award.fullDescription;
          const prizeUnit =
            locale === 'en'
              ? (award.prizeUnitEn ?? award.prizeUnit)
              : award.prizeUnit;
          const resolvedValues = award.prizeValues.map((v) => ({
            ...v,
            resolvedLabel:
              locale === 'en' ? (v.labelEn ?? v.label) : v.label,
          }));

          return (
            <AwardDetailCard
              key={award.id}
              slug={award.slug}
              title={award.name}
              description={description}
              thumbnailUrl={award.thumbnailUrl}
              prizeCount={award.prizeCount}
              prizeUnit={prizeUnit}
              prizeValues={resolvedValues}
              countLabel={t('prizePage.prizeCount.label')}
              valueLabel={t('prizePage.prizeValue.label')}
              orDividerText={t('prizePage.orDivider')}
              isReversed={index % 2 !== 0}
              isFirst={index === 0}
              isLast={index === AWARD_CATEGORIES.length - 1}
            />
          );
        })}
      </div>
    </section>
  );
}
