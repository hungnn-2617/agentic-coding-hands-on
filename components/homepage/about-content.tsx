'use client';

import Image from 'next/image';
import { useLanguage } from '@/hooks/use-language';

export function AboutContent() {
  const { t } = useLanguage();

  return (
    <section className="w-full max-w-[1152px] mx-auto px-4 py-12 sm:px-12 sm:py-16 lg:px-[104px] lg:py-[120px] rounded-lg">
      <div className="flex flex-col items-center gap-8">
        {/* ROOT FURTHER Logo (small) */}
        <Image
          src="/images/root-further-logo-about.png"
          alt="ROOT FURTHER"
          width={300}
          height={130}
          className="w-[200px] sm:w-[250px] lg:w-[300px] h-auto object-contain"
        />

        {/* Body Text — Montserrat 24px/32px 700 at desktop per design-style.md */}
        <div className="text-white text-base sm:text-lg lg:text-2xl font-bold leading-6 sm:leading-7 lg:leading-8 text-justify space-y-6">
          <p>{t('about.paragraph1')}</p>
          <p>{t('about.paragraph2')}</p>
          <p>{t('about.paragraph3')}</p>
          <p>{t('about.paragraph4')}</p>
          <p>{t('about.paragraph5')}</p>
        </div>

        {/* Quote */}
        <blockquote className="text-white text-lg sm:text-xl font-bold italic leading-8 text-center mt-4">
          {t('about.quote')}
          <br />
          <span className="text-base not-italic text-white/70">
            {t('about.quoteSubtitle')}
          </span>
        </blockquote>
      </div>
    </section>
  );
}
