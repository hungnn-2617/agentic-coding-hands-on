'use client';

import { UserInfo } from '@/components/sun-kudos/user-info';
import { GoldDivider } from '@/components/sun-kudos/gold-divider';
import { ContentArea } from '@/components/sun-kudos/content-area';
import { HashtagList } from '@/components/sun-kudos/hashtag-list';
import { ImageGallery } from '@/components/sun-kudos/image-gallery';
import { ActionBar } from '@/components/sun-kudos/action-bar';
import { ArrowRightIcon } from '@/components/icons/arrow-right-icon';
import type { KudoPost } from '@/types/kudo-feed';

interface KudoPostCardProps {
  kudo: KudoPost;
  userId: string;
  userLikedKudoIds: Set<string>;
  onCopyLink: (kudoId: string) => void;
  onHashtagClick?: (hashtag: string) => void;
}

export function KudoPostCard({
  kudo,
  userId,
  userLikedKudoIds,
  onCopyLink,
  onHashtagClick,
}: KudoPostCardProps) {
  const isLiked = userLikedKudoIds.has(kudo.id);
  const isOwnKudo = kudo.sender.id === userId;

  return (
    <article className="w-full max-w-[680px] flex flex-col gap-4 pt-10 px-10 pb-4 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-3xl max-sm:pt-4 max-sm:px-4 max-sm:pb-4">
      {/* Sender -> Receiver */}
      <div className="flex items-center justify-between gap-6">
        <UserInfo user={kudo.sender} className="min-w-0 flex-1" />
        <ArrowRightIcon className="w-8 h-8 text-[#999] shrink-0" />
        <UserInfo user={kudo.receiver} className="min-w-0 flex-1" />
      </div>

      <GoldDivider />

      {/* Content */}
      <ContentArea
        timestamp={kudo.created_at}
        categoryLabel={kudo.title}
        content={kudo.content}
        lineClamp={5}
        variant="feed"
      />

      {/* Images */}
      <ImageGallery images={kudo.images} />

      {/* Hashtags */}
      <HashtagList hashtags={kudo.hashtags} onHashtagClick={onHashtagClick} />

      {/* Actions */}
      <ActionBar
        kudoId={kudo.id}
        likeCount={kudo.like_count}
        isLiked={isLiked}
        isOwnKudo={isOwnKudo}
        onCopyLink={() => onCopyLink(kudo.id)}
        variant="feed"
      />
    </article>
  );
}
