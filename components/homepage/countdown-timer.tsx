'use client';

import { useCountdown } from '@/hooks/use-countdown';
import { useLanguage } from '@/hooks/use-language';
import { DigitCard } from '@/components/homepage/digit-card';

function CountdownUnit({ value, label }: { value: string; label: string }) {
  const digits = value.split('');
  return (
    <div className="flex flex-col items-center gap-3.5">
      <div className="flex gap-3.5" suppressHydrationWarning>
        {digits.map((digit, i) => (
          <DigitCard key={`${label}-${i}`} digit={digit} />
        ))}
      </div>
      <span className="text-white text-2xl font-bold leading-8 uppercase">
        {label}
      </span>
    </div>
  );
}

export function CountdownTimer() {
  const { days, hours, minutes, isExpired } = useCountdown();
  const { t } = useLanguage();

  return (
    <div className="flex flex-col gap-4">
      {!isExpired && (
        <p className="text-[#FFEA9E] text-2xl font-bold leading-8">
          {t('countdown.comingSoon')}
        </p>
      )}
      <div
        className="flex items-center gap-10"
        role="timer"
        aria-live="polite"
        aria-label={t('countdown.ariaLabel', { days, hours, minutes })}
      >
        <CountdownUnit value={days} label={t('countdown.days')} />
        <CountdownUnit value={hours} label={t('countdown.hours')} />
        <CountdownUnit value={minutes} label={t('countdown.minutes')} />
      </div>
    </div>
  );
}
