'use client';

import { Avatar } from '@/components/ui/avatar';
import type { LeaderboardEntry } from '@/types/kudo-feed';

interface LeaderboardItemProps {
  entry: LeaderboardEntry;
}

export function LeaderboardItem({ entry }: LeaderboardItemProps) {
  return (
    <div className="flex items-center gap-2 cursor-pointer hover:bg-white/5 rounded-lg p-1 transition-colors">
      <Avatar src={entry.avatar_url} alt={entry.name} size={64} />
      <div className="flex flex-col gap-[2px] min-w-0">
        <span className="text-[22px] font-bold leading-7 text-[var(--color-text-gold)] truncate">
          {entry.name}
        </span>
        <span className="text-base font-bold leading-6 tracking-[0.15px] text-white truncate">
          {entry.prize_description}
        </span>
      </div>
    </div>
  );
}
