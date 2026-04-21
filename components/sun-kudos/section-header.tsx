import { useLanguage } from '@/hooks/use-language';
import type { ReactNode } from 'react';

interface SectionHeaderProps {
  title: string;
  children?: ReactNode;
}

export function SectionHeader({ title, children }: SectionHeaderProps) {
  const { t } = useLanguage();

  return (
    <div className="flex items-end justify-between w-full">
      <div className="flex flex-col gap-2">
        <span className="text-2xl font-bold leading-8 text-white max-sm:text-base">
          {t('liveBoard.sectionSubtitle')}
        </span>
        <h2 className="text-[57px] font-bold leading-[64px] tracking-[-0.25px] text-[var(--color-text-gold)] max-sm:text-[28px] max-sm:leading-9">
          {title}
        </h2>
      </div>
      {children && <div className="flex items-center gap-3">{children}</div>}
    </div>
  );
}
