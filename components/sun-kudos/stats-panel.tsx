'use client';

import { useLanguage } from '@/hooks/use-language';
import { GiftIcon } from '@/components/icons/gift-icon';
import type { UserStats } from '@/types/kudo-feed';

interface StatsPanelProps {
  stats: UserStats;
  onOpenSecretBox: () => void;
}

export function StatsPanel({ stats, onOpenSecretBox }: StatsPanelProps) {
  const { t } = useLanguage();
  const hasUnopened = stats.secret_boxes_unopened > 0;

  const statRows = [
    { label: t('liveBoard.stats.kudosReceived'), value: stats.kudos_received },
    { label: t('liveBoard.stats.kudosSent'), value: stats.kudos_sent },
    { label: t('liveBoard.stats.heartsReceived'), value: stats.hearts_received },
  ];

  const boxRows = [
    { label: t('liveBoard.stats.secretBoxOpened'), value: stats.secret_boxes_opened },
    { label: t('liveBoard.stats.secretBoxUnopened'), value: stats.secret_boxes_unopened },
  ];

  return (
    <div className="flex flex-col gap-2 p-6 bg-[var(--color-bg-sidebar)] border border-[var(--color-border)] rounded-[17px] w-full">
      {statRows.map((row) => (
        <div key={row.label} className="flex h-10 items-center justify-between gap-2">
          <span className="text-[22px] font-bold leading-7 text-white">{row.label}</span>
          <span className="text-[32px] font-bold leading-10 text-[var(--color-text-gold)]">
            {row.value}
          </span>
        </div>
      ))}

      {/* Divider */}
      <hr className="w-full h-px border-0 bg-[var(--color-divider)]" />

      {boxRows.map((row) => (
        <div key={row.label} className="flex h-10 items-center justify-between gap-2">
          <span className="text-[22px] font-bold leading-7 text-white">{row.label}</span>
          <span className="text-[32px] font-bold leading-10 text-[var(--color-text-gold)]">
            {row.value}
          </span>
        </div>
      ))}

      {/* Open Secret Box Button */}
      <button
        type="button"
        onClick={onOpenSecretBox}
        disabled={!hasUnopened}
        className={`flex w-full h-[60px] items-center justify-center gap-2 mt-2 rounded-lg text-[22px] font-bold leading-7 transition-all cursor-pointer ${
          hasUnopened
            ? 'bg-[var(--color-bg-button-primary)] text-[#00101A] hover:bg-[#F5E088] hover:-translate-y-px'
            : 'bg-[#D4CCA8] text-[#999] cursor-not-allowed'
        }`}
      >
        <GiftIcon className="w-5 h-5" />
        {t('liveBoard.stats.openSecretBox')}
      </button>
    </div>
  );
}
