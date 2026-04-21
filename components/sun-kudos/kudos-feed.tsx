'use client';

import { useKudosFeed } from '@/hooks/use-kudos-feed';
import { useLanguage } from '@/hooks/use-language';
import { KudoPostCard } from '@/components/sun-kudos/kudo-post-card';
import type { KudoPost, FilterState } from '@/types/kudo-feed';

interface KudosFeedProps {
  initialKudos: KudoPost[];
  filters: FilterState;
  userId: string;
  userLikedKudoIds: Set<string>;
  onCopyLink: (kudoId: string) => void;
  onHashtagClick?: (hashtag: string) => void;
}

export function KudosFeed({
  initialKudos,
  filters,
  userId,
  userLikedKudoIds,
  onCopyLink,
  onHashtagClick,
}: KudosFeedProps) {
  const { t } = useLanguage();
  const { kudos, isLoading, hasMore, sentinelRef } = useKudosFeed(filters, initialKudos);

  if (kudos.length === 0 && !isLoading) {
    return (
      <div className="flex items-center justify-center py-20 text-base font-bold text-[#999]">
        {t('liveBoard.empty.kudos')}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-[680px]">
      {kudos.map((kudo) => (
        <KudoPostCard
          key={kudo.id}
          kudo={kudo}
          userId={userId}
          userLikedKudoIds={userLikedKudoIds}
          onCopyLink={onCopyLink}
          onHashtagClick={onHashtagClick}
        />
      ))}

      {/* Sentinel for infinite scroll */}
      {hasMore && (
        <div ref={sentinelRef} className="flex justify-center py-4" aria-live="polite">
          {isLoading && (
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-border-highlight)] border-t-transparent" />
          )}
        </div>
      )}
    </div>
  );
}
