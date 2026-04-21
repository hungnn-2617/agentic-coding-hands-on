'use client';

interface HashtagListProps {
  hashtags: string[];
  onHashtagClick?: (hashtag: string) => void;
}

export function HashtagList({ hashtags, onHashtagClick }: HashtagListProps) {
  if (hashtags.length === 0) return null;

  return (
    <div className="flex gap-2 overflow-hidden">
      {hashtags.map((tag) => (
        <button
          key={tag}
          type="button"
          onClick={() => onHashtagClick?.(tag)}
          className="shrink-0 text-base font-bold leading-6 tracking-[0.5px] text-[var(--color-text-hashtag)] hover:underline cursor-pointer"
        >
          #{tag}
        </button>
      ))}
    </div>
  );
}
