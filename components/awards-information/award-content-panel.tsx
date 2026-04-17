import type { PrizeValue } from '@/types/awards';
import { TargetIcon, DiamondIcon, AwardBadgeIcon } from '@/components/icons';
import { OrDivider } from './or-divider';

interface AwardContentPanelProps {
  title: string;
  description: string;
  countLabel: string;
  count: number;
  unit: string;
  valueLabel: string;
  values: Array<PrizeValue & { resolvedLabel: string }>;
  orDividerText: string;
}

export function AwardContentPanel({
  title,
  description,
  countLabel,
  count,
  unit,
  valueLabel,
  values,
  orDividerText,
}: AwardContentPanelProps) {
  return (
    <div
      className="
        w-full lg:flex-1 rounded-2xl p-6 lg:p-8
        flex flex-col gap-6 lg:gap-8
        bg-white/5
      "
      style={{
        backdropFilter: 'blur(32px)',
        WebkitBackdropFilter: 'blur(32px)',
      }}
    >
      {/* Title with target icon */}
      <div className="flex items-start gap-2">
        <TargetIcon className="w-6 h-6 text-white shrink-0 mt-0.5" />
        <h3 className="text-[#FFEA9E] text-xl lg:text-2xl font-bold leading-8">
          {title}
        </h3>
      </div>

      {/* Description */}
      <p className="text-white text-base font-bold leading-6 tracking-[0.5px] text-justify">
        {description}
      </p>

      {/* Prize count with diamond icon */}
      <div className="flex flex-col gap-1">
        <div className="flex items-start gap-2">
          <DiamondIcon className="w-6 h-6 text-white shrink-0 mt-0.5" />
          <p className="text-[#FFEA9E] text-xl lg:text-2xl font-bold leading-8">
            {countLabel}
          </p>
        </div>
        <div className="flex items-baseline gap-2 pl-8">
          <span className="text-white text-2xl lg:text-4xl font-bold leading-[44px]">
            {String(count).padStart(2, '0')}
          </span>
          <span className="text-white text-sm font-bold leading-5 tracking-[0.1px]">
            {unit}
          </span>
        </div>
      </div>

      {/* Prize values with award badge icon */}
      {values.length > 0 && (
        <div className="flex flex-col gap-4">
          {values.map((value, index) => (
            <div key={index}>
              {index > 0 && <OrDivider text={orDividerText} />}
              <div className={`flex flex-col gap-1 ${index > 0 ? 'mt-4' : ''}`}>
                {index === 0 && (
                  <div className="flex items-start gap-2">
                    <AwardBadgeIcon className="w-6 h-6 text-white shrink-0 mt-0.5" />
                    <p className="text-[#FFEA9E] text-xl lg:text-2xl font-bold leading-8">
                      {valueLabel}
                    </p>
                  </div>
                )}
                {index > 0 && (
                  <p className="text-[#FFEA9E] text-xl lg:text-2xl font-bold leading-8 pl-8">
                    {valueLabel}
                  </p>
                )}
                <span className="text-white text-2xl lg:text-4xl font-bold leading-[44px] pl-8">
                  {value.amount}
                </span>
                {value.resolvedLabel && (
                  <span className="text-white text-sm font-bold leading-5 tracking-[0.1px] pl-8">
                    {value.resolvedLabel}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
