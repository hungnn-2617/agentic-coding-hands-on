'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { usePrelaunchCountdown } from '@/hooks/use-prelaunch-countdown';
import { useLanguage } from '@/hooks/use-language';
import { CountdownUnit } from '@/components/countdown-prelaunch/countdown-unit';

// TODO: Replace with real analytics library when configured
function trackEvent(event: string, properties: Record<string, unknown>) {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Analytics] ${event}`, properties);
  }
}

interface CountdownPageClientProps {
  serverTime: string;
  eventStartDate: string;
}

export function CountdownPageClient({
  serverTime,
  eventStartDate,
}: CountdownPageClientProps) {
  const { days, hours, minutes, isExpired } = usePrelaunchCountdown({
    serverTime,
    eventStartDate,
  });
  const { t } = useLanguage();
  const hasTrackedView = useRef(false);
  const hasTrackedComplete = useRef(false);

  // Track page view on mount
  useEffect(() => {
    if (!hasTrackedView.current) {
      hasTrackedView.current = true;
      const remaining =
        new Date(eventStartDate).getTime() - new Date(serverTime).getTime();
      trackEvent('prelaunch_view', {
        event_id: 'saa-2025',
        remaining_time: Math.max(0, remaining),
      });
    }
  }, [eventStartDate, serverTime]);

  // Track countdown complete
  useEffect(() => {
    if (isExpired && !hasTrackedComplete.current) {
      hasTrackedComplete.current = true;
      trackEvent('prelaunch_countdown_complete', { event_id: 'saa-2025' });
      trackEvent('prelaunch_redirect', { event_id: 'saa-2025', destination: '/' });
    }
  }, [isExpired]);

  return (
    <div className="bg-[#00101A] relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Layer 1: Background Image */}
      <Image
        src="/images/prelaunch-bg.png"
        alt=""
        fill
        priority
        className="absolute inset-0 object-cover z-[1]"
      />

      {/* Layer 2: Gradient Overlay */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background:
            'linear-gradient(18deg, #00101A 15.48%, rgba(0, 18, 29, 0.46) 52.13%, rgba(0, 19, 32, 0.00) 63.41%)',
        }}
      />

      {/* Layer 3: Content */}
      <section
        className="
          relative z-10
          flex flex-col items-center justify-center
          px-6 py-12
          sm:px-9 sm:py-15
          md:px-12 md:py-18
          lg:px-36 lg:py-24
        "
      >
        <div className="flex flex-col items-center gap-4 sm:gap-4 md:gap-5 lg:gap-6">
          {/* Title */}
          <h1
            className="
              text-white font-bold text-center font-montserrat
              text-xl sm:text-2xl md:text-[28px] md:leading-9 lg:text-4xl lg:leading-12
            "
          >
            {t('prelaunch.title')}
          </h1>

          {/* Countdown Timer */}
          <div
            className="
              flex flex-row items-center
              gap-4 sm:gap-7 md:gap-10 lg:gap-15
            "
            role="timer"
            aria-live="polite"
            aria-atomic="true"
            aria-label={t('prelaunch.ariaLabel', { days, hours, minutes })}
          >
            <CountdownUnit value={days} label={t('prelaunch.days')} />
            <CountdownUnit value={hours} label={t('prelaunch.hours')} />
            <CountdownUnit value={minutes} label={t('prelaunch.minutes')} />
          </div>
        </div>
      </section>
    </div>
  );
}
