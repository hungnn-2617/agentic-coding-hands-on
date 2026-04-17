'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/hooks/use-language';
import { ArrowRightIcon } from '@/components/icons';

export function SunKudosPromo() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full rounded-2xl overflow-hidden bg-[#0F0F0F]">
      <div className="flex flex-col lg:flex-row lg:h-[500px]">
        {/* Text Content — left side */}
        <div className="relative z-10 flex flex-col gap-4 lg:gap-6 p-8 sm:p-12 lg:p-16 lg:max-w-[500px] justify-center shrink-0">
          {/* Subtitle — first per Figma */}
          <p className="text-white text-2xl font-bold leading-8">
            {t('prizePage.kudos.label')}
          </p>

          {/* Title — gold, large */}
          <h2 className="text-[#FFEA9E] text-[32px] sm:text-[40px] lg:text-[57px] font-bold leading-tight lg:leading-[64px] tracking-[-0.25px]">
            {t('prizePage.kudos.title')}
          </h2>

          {/* Badge — below title per Figma design */}
          <span className="text-white text-sm font-bold uppercase tracking-[0.1px]">
            {t('prizePage.kudos.badge')}
          </span>

          {/* Description */}
          <p className="text-white text-base font-bold leading-6 tracking-[0.5px] text-justify">
            {t('prizePage.kudos.description')}
          </p>

          {/* CTA Button */}
          <Link
            href="/sun-kudos"
            className="
              inline-flex items-center gap-2 w-fit
              px-4 py-4 rounded bg-[#FFEA9E] text-[#00101A]
              font-bold text-base leading-6 tracking-[0.15px]
              transition-all duration-150 ease-out
              hover:-translate-y-px hover:shadow-[0_2px_8px_rgba(255,234,158,0.3)]
              focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2
            "
          >
            {t('prizePage.kudos.cta')}
            <ArrowRightIcon className="w-6 h-6" />
          </Link>
        </div>

        {/* Right side — image + KUDOS text */}
        <div className="relative flex-1 hidden lg:block">
          <Image
            src="/images/kudos-section-bg.png"
            alt=""
            fill
            className="object-cover object-right"
            aria-hidden="true"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="text-[#DBD1C1] select-none"
              style={{
                fontFamily: "var(--font-svn-gotham, 'Impact', sans-serif)",
                fontSize: '96.16px',
                fontWeight: 400,
                lineHeight: '24.04px',
                letterSpacing: '-0.13em',
              }}
              aria-hidden="true"
            >
              KUDOS
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
