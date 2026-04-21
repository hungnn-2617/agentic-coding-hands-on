'use client';

import { HeartIcon } from '@/components/icons/heart-icon';
import { CopyIcon } from '@/components/icons/copy-icon';
import { ExternalIcon } from '@/components/icons/external-icon';
import { useLanguage } from '@/hooks/use-language';
import { useKudoLike } from '@/hooks/use-kudo-like';

interface ActionBarProps {
  kudoId: string;
  likeCount: number;
  isLiked: boolean;
  isOwnKudo: boolean;
  onCopyLink: () => void;
  variant: 'highlight' | 'feed';
}

export function ActionBar({
  kudoId,
  likeCount,
  isLiked: initialLiked,
  isOwnKudo,
  onCopyLink,
  variant,
}: ActionBarProps) {
  const { t } = useLanguage();
  const { isLiked, count, toggle, isDisabled } = useKudoLike(
    kudoId,
    initialLiked,
    likeCount,
    isOwnKudo
  );

  const heartCountClass = variant === 'highlight'
    ? 'text-2xl font-bold leading-8 text-[#00101A]'
    : 'text-base font-bold leading-6 text-[#00101A]';

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-6">
        {/* Heart / Like */}
        <button
          type="button"
          onClick={toggle}
          disabled={isDisabled}
          aria-label={isLiked ? t('liveBoard.action.unlike') : t('liveBoard.action.like')}
          aria-pressed={isLiked}
          className={`flex items-center gap-1 transition-transform duration-200 ${
            isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:scale-110'
          }`}
        >
          <HeartIcon
            filled={isLiked}
            className={isLiked ? 'text-[var(--color-heart-active)]' : 'text-[#999]'}
          />
          <span className={heartCountClass}>
            {count.toLocaleString()}
          </span>
        </button>

        {/* Copy Link */}
        <button
          type="button"
          onClick={onCopyLink}
          className="flex items-center gap-1 text-base font-bold leading-6 tracking-[0.15px] text-[#00101A] cursor-pointer hover:text-[var(--color-border-highlight)] hover:underline transition-colors duration-100"
        >
          <CopyIcon className="w-4 h-4" />
          {t('liveBoard.action.copyLink')}
        </button>
      </div>

      {/* View Detail (highlight only) */}
      {variant === 'highlight' && (
        <button
          type="button"
          className="flex items-center gap-1 text-base font-bold leading-6 tracking-[0.15px] text-[#00101A] cursor-pointer hover:text-[var(--color-border-highlight)] hover:underline transition-colors duration-100"
        >
          <ExternalIcon className="w-4 h-4" />
          {t('liveBoard.action.viewDetail')}
        </button>
      )}
    </div>
  );
}
