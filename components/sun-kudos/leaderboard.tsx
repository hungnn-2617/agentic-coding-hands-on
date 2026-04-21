import { useLanguage } from '@/hooks/use-language';
import { LeaderboardItem } from '@/components/sun-kudos/leaderboard-item';
import type { LeaderboardEntry } from '@/types/kudo-feed';

interface LeaderboardProps {
  entries: LeaderboardEntry[];
}

export function Leaderboard({ entries }: LeaderboardProps) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col gap-2 bg-[var(--color-bg-sidebar)] border border-[var(--color-border)] rounded-[17px] pt-6 pr-4 pb-6 pl-6 w-full">
      <h3 className="text-[22px] font-bold leading-7 text-[var(--color-text-gold)]">
        {t('liveBoard.leaderboard.title')}
      </h3>

      {entries.length === 0 ? (
        <p className="text-base font-bold text-[#999] py-4">
          {t('liveBoard.leaderboard.empty')}
        </p>
      ) : (
        <div className="flex flex-col gap-2 max-h-[500px] overflow-y-auto scrollbar-thin">
          {entries.map((entry) => (
            <LeaderboardItem key={entry.id} entry={entry} />
          ))}
        </div>
      )}
    </div>
  );
}
