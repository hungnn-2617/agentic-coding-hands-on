'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/hooks/use-language';
import type { TranslationKey } from '@/lib/i18n/types';

export function MainFooter() {
  const { t } = useLanguage();

  const footerLinks: { href: string; labelKey: TranslationKey }[] = [
    { href: '/', labelKey: 'footer.about' },
    { href: '/awards-information', labelKey: 'footer.awards' },
    { href: '/sun-kudos', labelKey: 'footer.kudos' },
    { href: '/community-standards', labelKey: 'footer.standards' },
  ];

  return (
    <footer
      className="w-full px-4 py-6 sm:px-12 sm:py-8 lg:px-22.5 lg:py-10 border-t border-[#2E3940] flex flex-col sm:flex-row items-center justify-between gap-6"
      role="contentinfo"
    >
      <div className="flex flex-col sm:flex-row items-center gap-6 lg:gap-20">
        <Link href="/" aria-label="SAA 2025 Homepage">
          <Image
            src="/images/saa-logo.png"
            alt="SAA 2025 Logo"
            width={69}
            height={64}
            className="w-[69px] h-16 object-contain"
          />
        </Link>
        <nav className="flex flex-wrap items-center justify-center gap-4 lg:gap-12" aria-label="Footer navigation">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="
                px-4 py-2 rounded text-base font-bold leading-6 tracking-[0.15px]
                text-white transition-colors duration-150
                hover:bg-white/10
                focus:outline-2 focus:outline-[#FFEA9E] focus:outline-offset-2
              "
            >
              {t(link.labelKey)}
            </Link>
          ))}
        </nav>
      </div>

      <span
        className="font-bold text-sm lg:text-base text-white text-center"
        style={{ fontFamily: "var(--font-montserrat-alternates, 'Montserrat', sans-serif)" }}
      >
        {t('common.footer.copyright')}
      </span>
    </footer>
  );
}
