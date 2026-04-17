'use client';

import { useLanguage } from '@/hooks/use-language';

/**
 * Footer component with copyright text.
 * Fixed position at bottom with border-top.
 */
export function Footer() {
  const { t } = useLanguage();

  return (
    <footer
      className="fixed bottom-0 z-50 w-full px-4 py-6 sm:px-12 lg:px-22.5 lg:py-10 border-t border-[#2E3940] flex items-center justify-center"
      role="contentinfo"
    >
      <span className="font-montserrat-alternates font-bold text-sm lg:text-base text-white">
        {t('common.footer.copyright')}
      </span>
    </footer>
  );
}
