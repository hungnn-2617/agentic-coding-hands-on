'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/hooks/use-language';
import { ArrowRightIcon } from '@/components/icons';

export function KudosSection() {
  const { t } = useLanguage();

  return (
    <section className="w-full max-w-[1224px] mx-auto px-4 sm:px-12 lg:px-0">
      <div className="relative w-full max-w-[1120px] mx-auto h-auto lg:h-[500px] rounded-2xl overflow-hidden bg-[#0F0F0F]">
        {/* Background Image */}
        <Image
          src="/images/kudos-section-bg.png"
          alt=""
          fill
          className="object-cover object-right hidden lg:block"
          aria-hidden="true"
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-stretch">
          {/* Text Content */}
          <div className="flex flex-col gap-6 lg:gap-8 p-8 sm:p-12 lg:p-16 max-w-full lg:max-w-[457px] justify-center">
            <div className="flex flex-col gap-2">
              <span className="text-white text-sm font-bold uppercase tracking-[0.1px]">
                {t('kudos.badge')}
              </span>
              <p className="text-white text-2xl font-bold leading-8">
                {t('kudos.subtitle')}
              </p>
              <h2 className="text-[#FFEA9E] text-[32px] sm:text-[40px] lg:text-[57px] font-bold leading-tight lg:leading-[64px] tracking-[-0.25px]">
                {t('kudos.title')}
              </h2>
            </div>

            <p className="text-white text-base font-bold leading-6 tracking-[0.5px] text-justify">
              {t('kudos.description')}
            </p>

            <Link
              href="/sun-kudos"
              className="
                inline-flex items-center gap-2 w-fit
                px-4 py-4 rounded bg-[#FFEA9E] text-[#00101A]
                font-bold text-base leading-6 tracking-[0.15px]
                transition-colors duration-200 cursor-pointer
                hover:bg-[#E6D48E]
                focus:outline-2 focus:outline-[#FFEA9E] focus:outline-offset-2
              "
            >
              {t('kudos.detailButton')}
              <ArrowRightIcon className="w-6 h-6" />
            </Link>
          </div>

          {/* Decorative "KUDOS" text */}
          <div className="hidden lg:flex items-center justify-center flex-1 pr-8">
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
