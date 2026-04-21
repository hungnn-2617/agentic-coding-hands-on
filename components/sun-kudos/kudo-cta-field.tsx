'use client';

import { PenIcon } from '@/components/icons/pen-icon';
import { useLanguage } from '@/hooks/use-language';

interface KudoCTAFieldProps {
  onClick: () => void;
}

export function KudoCTAField({ onClick }: KudoCTAFieldProps) {
  const { t } = useLanguage();

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-[738px] max-w-full h-[72px] items-center gap-2 px-4 py-6 bg-[rgba(255,234,158,0.10)] border border-[var(--color-border)] rounded-[68px] text-base font-bold leading-6 tracking-[0.15px] text-white cursor-pointer hover:bg-[rgba(255,234,158,0.20)] transition-colors focus:outline-2 focus:outline-[var(--color-border-highlight)] focus:outline-offset-2"
    >
      <PenIcon className="w-6 h-6 shrink-0" />
      <span className="truncate">{t('liveBoard.cta.recognition')}</span>
    </button>
  );
}
