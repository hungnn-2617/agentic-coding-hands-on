'use client';

import { UserInfo } from '@/components/sun-kudos/user-info';
import { GoldDivider } from '@/components/sun-kudos/gold-divider';
import { ContentArea } from '@/components/sun-kudos/content-area';
import { HashtagList } from '@/components/sun-kudos/hashtag-list';
import { ActionBar } from '@/components/sun-kudos/action-bar';
import { ArrowRightIcon } from '@/components/icons/arrow-right-icon';
import type { KudoPost } from '@/types/kudo-feed';

interface HighlightKudoCardProps {
  kudo: KudoPost;
  userId: string;
  userLikedKudoIds: Set<string>;
  onCopyLink: (kudoId: string) => void;
  onHashtagClick?: (hashtag: string) => void;
}

export function HighlightKudoCard({
  kudo,
  userId,
  userLikedKudoIds,
  onCopyLink,
  onHashtagClick,
}: HighlightKudoCardProps) {
  const isLiked = userLikedKudoIds.has(kudo.id);
  const isOwnKudo = kudo.sender.id === userId;

  return (
    <article className="w-[528px] shrink-0 flex flex-col gap-4 pt-6 px-6 pb-4 bg-[var(--color-bg-card)] border-4 border-[var(--color-border-highlight)] rounded-2xl">
      {/* Sender -> Receiver */}
      <div className="flex items-center justify-between gap-6">
        <UserInfo user={kudo.sender} className="min-w-0 flex-1" />
        <ArrowRightIcon className="w-6 h-6 text-[#999] shrink-0" />
        <UserInfo user={kudo.receiver} className="min-w-0 flex-1" />
      </div>

      <GoldDivider />

      {/* Content */}
      <ContentArea
        timestamp={kudo.created_at}
        categoryLabel={kudo.title}
        content={kudo.content}
        lineClamp={3}
        variant="highlight"
      />

      {/* Hashtags */}
      <HashtagList hashtags={kudo.hashtags} onHashtagClick={onHashtagClick} />

      {/* Actions */}
      <ActionBar
        kudoId={kudo.id}
        likeCount={kudo.like_count}
        isLiked={isLiked}
        isOwnKudo={isOwnKudo}
        onCopyLink={() => onCopyLink(kudo.id)}
        variant="highlight"
      />
    </article>
  );
}
