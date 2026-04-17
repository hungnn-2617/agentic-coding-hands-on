'use client';

import { useLanguage } from '@/hooks/use-language';
import { useScrollSpy } from '@/hooks/use-scroll-spy';
import { AWARD_CATEGORIES } from '@/lib/data/awards';
import { TargetIcon } from '@/components/icons';

export function PrizeSidebar() {
  const { t } = useLanguage();
  const sectionIds = AWARD_CATEGORIES.map((a) => a.slug);
  const { activeSectionId, scrollToSection } = useScrollSpy({ sectionIds });

  return (
    <nav
      aria-label={t('prizePage.sidebar.ariaLabel')}
      className="
        flex flex-row lg:flex-col gap-3 lg:gap-4
        w-full lg:w-[178px]
        overflow-x-auto lg:overflow-visible
        lg:sticky lg:top-[104px] lg:self-start lg:shrink-0
        pb-2 lg:pb-0
      "
    >
      {AWARD_CATEGORIES.map((award) => {
        const isActive = activeSectionId === award.slug;

        return (
          <a
            key={award.slug}
            href={`#${award.slug}`}
            aria-current={isActive ? 'true' : undefined}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(award.slug);
            }}
            className={`
              flex items-center gap-1.5 whitespace-nowrap lg:whitespace-normal
              text-sm font-bold leading-5 tracking-[0.25px]
              px-2 py-2 lg:px-0 lg:py-1
              transition-colors duration-200
              focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2
              ${
                isActive
                  ? 'text-[#FFEA9E] border-b lg:border-b border-[#FFEA9E]'
                  : 'text-white hover:text-[#FFEA9E]'
              }
            `}
          >
            <TargetIcon className="w-5 h-5 shrink-0" />
            {award.name}
          </a>
        );
      })}
    </nav>
  );
}
