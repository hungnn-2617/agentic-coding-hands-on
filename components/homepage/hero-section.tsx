import Image from 'next/image';
import { CountdownTimer } from '@/components/homepage/countdown-timer';
import { EventInfo } from '@/components/homepage/event-info';
import { CTAButtons } from '@/components/homepage/cta-buttons';

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: 'max(100vh, 700px)' }}>
      {/* Background Image */}
      <Image
        src="/images/homepage-keyvisual.png"
        alt=""
        fill
        className="object-cover object-top"
        priority
        aria-hidden="true"
      />

      {/* Gradient Overlay — covers bottom-left, leaves top-right clear for the artwork */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            'linear-gradient(12deg, #00101A 23.7%, rgba(0, 18, 29, 0.46) 38.34%, rgba(0, 19, 32, 0.00) 48.92%)',
        }}
      />

      {/* Content — positioned at bottom-left over the gradient */}
      <div className="relative z-10 flex flex-col gap-10 px-4 py-12 sm:px-12 sm:py-16 lg:px-36 lg:py-24 h-full justify-end" style={{ minHeight: 'max(100vh, 700px)' }}>
        {/* ROOT FURTHER Logo */}
        <Image
          src="/images/root-further-logo.png"
          alt="ROOT FURTHER"
          width={451}
          height={200}
          className="w-[280px] sm:w-[360px] lg:w-[451px] h-auto object-contain"
          priority
        />

        {/* Countdown Timer */}
        <CountdownTimer />

        {/* Event Info */}
        <EventInfo />

        {/* CTA Buttons */}
        <CTAButtons />
      </div>
    </section>
  );
}
