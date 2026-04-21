'use client';

import { SafeHtml } from '@/components/sun-kudos/safe-html';

interface ContentAreaProps {
  timestamp: string;
  categoryLabel?: string;
  content: string;
  lineClamp?: 3 | 5;
  variant?: 'highlight' | 'feed';
}

function formatTimestamp(isoString: string): string {
  const date = new Date(isoString);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  return `${hours}:${minutes} - ${month}/${day}/${year}`;
}

export function ContentArea({
  timestamp,
  categoryLabel,
  content,
  lineClamp = 5,
  variant = 'feed',
}: ContentAreaProps) {
  const clampClass = lineClamp === 3 ? 'line-clamp-3' : 'line-clamp-5';

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <time className="text-base font-bold leading-6 tracking-[0.5px] text-[#999]">
          {formatTimestamp(timestamp)}
        </time>
        {categoryLabel && (
          <span className="text-base font-bold leading-6 tracking-[0.5px] text-[#00101A]">
            {categoryLabel}
          </span>
        )}
      </div>

      {variant === 'highlight' ? (
        <div className="rounded-xl border border-[var(--color-border-highlight)] bg-[var(--color-accent-gold-40)] px-6 py-4">
          <SafeHtml
            html={content}
            className={`text-xl font-bold leading-8 text-[#00101A] text-justify ${clampClass}`}
          />
        </div>
      ) : (
        <SafeHtml
          html={content}
          className={`text-xl font-bold leading-8 text-[#00101A] text-justify ${clampClass}`}
        />
      )}
    </div>
  );
}
