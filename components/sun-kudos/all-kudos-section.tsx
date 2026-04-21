import { useLanguage } from '@/hooks/use-language';
import { SectionHeader } from '@/components/sun-kudos/section-header';
import type { ReactNode } from 'react';

interface AllKudosSectionProps {
  feed: ReactNode;
  sidebar: ReactNode;
}

export function AllKudosSection({ feed, sidebar }: AllKudosSectionProps) {
  const { t } = useLanguage();

  return (
    <section className="w-full">
      <SectionHeader title={t('liveBoard.allKudos')} />

      <div className="flex gap-20 mt-10 max-lg:flex-col max-lg:gap-10">
        {/* Feed Column */}
        <div className="w-[680px] max-lg:w-full shrink-0">{feed}</div>

        {/* Sidebar Column */}
        <div className="w-[422px] max-lg:w-full shrink flex flex-col gap-6 sticky top-[100px] self-start max-h-[calc(100vh-120px)] overflow-y-auto max-lg:static max-lg:max-h-none max-lg:overflow-visible">
          {sidebar}
        </div>
      </div>
    </section>
  );
}
