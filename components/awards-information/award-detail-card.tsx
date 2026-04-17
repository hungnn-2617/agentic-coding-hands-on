import type { PrizeValue } from '@/types/awards';
import { AwardImage } from './award-image';
import { AwardContentPanel } from './award-content-panel';

interface AwardDetailCardProps {
  slug: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  prizeCount: number;
  prizeUnit: string;
  prizeValues: Array<PrizeValue & { resolvedLabel: string }>;
  countLabel: string;
  valueLabel: string;
  orDividerText: string;
  isReversed: boolean;
  isFirst: boolean;
  isLast: boolean;
}

export function AwardDetailCard({
  slug,
  title,
  description,
  thumbnailUrl,
  prizeCount,
  prizeUnit,
  prizeValues,
  countLabel,
  valueLabel,
  orDividerText,
  isReversed,
  isFirst,
  isLast,
}: AwardDetailCardProps) {
  return (
    <article id={slug} className="scroll-mt-[104px]">
      <div
        className={`
          flex flex-col items-center lg:items-start gap-6 lg:gap-10
          ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'}
        `}
      >
        <AwardImage
          thumbnailUrl={thumbnailUrl}
          altText={`${title} award badge`}
          priority={isFirst}
        />
        <AwardContentPanel
          title={title}
          description={description}
          countLabel={countLabel}
          count={prizeCount}
          unit={prizeUnit}
          valueLabel={valueLabel}
          values={prizeValues}
          orDividerText={orDividerText}
        />
      </div>
      {/* Section divider — omit after last card */}
      {!isLast && (
        <div className="w-full h-px bg-[#2E3940] mt-10 lg:mt-20" />
      )}
    </article>
  );
}
