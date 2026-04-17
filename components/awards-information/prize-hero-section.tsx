'use client';

import Image from 'next/image';
import { useLanguage } from '@/hooks/use-language';

export function PrizeHeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full h-[400px] sm:h-[500px] lg:h-[650px] overflow-hidden">
      <Image
        src="/images/homepage-keyvisual.png"
        alt="Sun* Annual Awards 2025 - ROOT FURTHER"
        fill
        className="object-cover object-center"
        sizes="100vw"
        priority
      />
      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(0deg, #00101A -4.23%, rgba(0, 19, 32, 0.00) 52.79%)',
        }}
        aria-hidden="true"
      />

      {/* ROOT FURTHER logo — top-left per Figma design */}
      <div className="absolute top-8 sm:top-12 lg:top-16 left-4 sm:left-12 lg:left-[144px] z-10">
        <Image
          src="/images/root-further-logo.png"
          alt="ROOT FURTHER"
          width={338}
          height={150}
          className="w-[160px] sm:w-[240px] lg:w-[338px] h-auto"
        />
      </div>

      {/* Title section — bottom-center over gradient, per Figma */}
      <div className="absolute bottom-8 sm:bottom-12 lg:bottom-16 left-0 right-0 z-10 flex flex-col items-center gap-2 lg:gap-4 px-4">
        <p className="text-white text-lg sm:text-xl lg:text-2xl font-bold leading-8 text-center">
          {t('prizePage.subtitle')}
        </p>
        <h1 className="text-[#FFEA9E] text-[28px] sm:text-[40px] lg:text-[57px] font-bold leading-tight lg:leading-[64px] tracking-[-0.25px] text-center">
          {t('prizePage.title')}
        </h1>
      </div>
    </section>
  );
}
