'use client';

import Image from 'next/image';

interface ImageGalleryProps {
  images: string[];
}

export function ImageGallery({ images }: ImageGalleryProps) {
  if (images.length === 0) return null;

  const visible = images.slice(0, 5);

  return (
    <div className="flex gap-4">
      {visible.map((src, index) => (
        <a
          key={src}
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 w-[88px] h-[88px] rounded-[18px] border border-[var(--color-border)] overflow-hidden hover:opacity-80 hover:scale-105 transition-all duration-150"
        >
          <Image
            src={src}
            alt={`Attached image ${index + 1}`}
            width={88}
            height={88}
            className="h-full w-full object-cover rounded-[4px]"
          />
        </a>
      ))}
    </div>
  );
}
