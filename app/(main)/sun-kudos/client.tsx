'use client';

import { useState } from 'react';
import { useLanguage } from '@/hooks/use-language';
import { WriteKudoModal } from '@/components/write-kudo';
import { PenIcon } from '@/components/icons/pen-icon';

interface SunKudosClientProps {
  userId: string;
}

export function SunKudosClient({ userId }: SunKudosClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center gap-10 py-24 px-4">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-[57px] font-bold leading-[64px] text-[#FFEA9E] max-sm:text-4xl">
          {t('kudos.title')}
        </h1>
        <p className="text-base font-bold leading-6 text-white max-w-2xl">
          {t('kudos.description')}
        </p>
      </div>

      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 px-6 py-4 bg-[rgba(255,234,158,0.10)] border border-[#998C5F] rounded-[68px] text-base font-bold leading-6 tracking-[0.15px] text-white hover:bg-[rgba(255,234,158,0.20)] transition-colors focus:outline-2 focus:outline-[#FFEA9E] focus:outline-offset-2"
      >
        <PenIcon className="w-6 h-6" />
        {t('writeKudo.title')}
      </button>

      <WriteKudoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          // TODO: Refresh kudo feed
        }}
        userId={userId}
      />
    </div>
  );
}
