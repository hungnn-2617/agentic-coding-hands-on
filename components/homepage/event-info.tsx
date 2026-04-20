'use client';

import { useLanguage } from '@/hooks/use-language';
import { EVENT_START_DATE } from '@/lib/constants';

function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  if (isNaN(date.getTime())) return '';
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function EventInfo() {
  const { t } = useLanguage();
  const formattedDate = formatDate(EVENT_START_DATE);

  return (
    <div className="flex flex-col gap-2 max-w-[637px]">
      <div className="flex flex-col sm:flex-row gap-1 sm:gap-[60px]">
        {formattedDate && (
          <div className="flex items-baseline gap-2">
            <span className="text-white text-base font-bold leading-6 tracking-[0.15px]">
              {t('event.time')}
            </span>
            <span className="text-[#FFEA9E] text-2xl font-bold leading-8">
              {formattedDate}
            </span>
          </div>
        )}
        <div className="flex items-baseline gap-2">
          <span className="text-white text-base font-bold leading-6 tracking-[0.15px]">
            {t('event.venue')}
          </span>
          <span className="text-[#FFEA9E] text-2xl font-bold leading-8">
            {t('event.venueValue')}
          </span>
        </div>
      </div>
      <p className="text-white text-base font-bold leading-6 tracking-[0.5px]">
        {t('event.livestreamNote')}
      </p>
    </div>
  );
}
