'use client';

import { useCountdown } from '@/hooks/use-countdown';
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

  return (
    <div className="flex flex-col gap-4">
      {!isExpired && (
        <p className="text-[#FFEA9E] text-2xl font-bold leading-8">
          Coming soon
        </p>
      )}
      <div
        className="flex items-center gap-10"
        role="timer"
        aria-live="polite"
        aria-label={`${days} days, ${hours} hours, ${minutes} minutes until event`}
      >
        <CountdownUnit value={days} label="Days" />
        <CountdownUnit value={hours} label="Hours" />
        <CountdownUnit value={minutes} label="Minutes" />
      </div>
    </div>
  );
}
