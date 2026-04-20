'use client';

import { PrelaunchDigitCard } from '@/components/countdown-prelaunch/prelaunch-digit-card';

interface CountdownUnitProps {
  value: string;
  label: string;
}

export function CountdownUnit({ value, label }: CountdownUnitProps) {
  const digits = value.padStart(2, '0').slice(0, 2).split('');

  return (
    <div
      className="
        flex flex-col items-start justify-center
        gap-2 sm:gap-3 md:gap-4 lg:gap-[21px]
      "
    >
      {/* Digit row */}
      <div
        className="
          flex flex-row items-center
          gap-2 sm:gap-3 md:gap-3.5 lg:gap-[21px]
        "
        suppressHydrationWarning
      >
        {digits.map((digit, i) => (
          <PrelaunchDigitCard key={`${label}-${i}`} digit={digit} />
        ))}
      </div>
      {/* Unit label */}
      <span
        className="
          text-white font-bold uppercase font-montserrat
          text-sm sm:text-lg md:text-2xl lg:text-4xl
          leading-5 sm:leading-6 md:leading-8 lg:leading-12
        "
      >
        {label}
      </span>
    </div>
  );
}
