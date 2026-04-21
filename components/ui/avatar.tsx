import Image from 'next/image';

interface AvatarProps {
  src: string | null;
  alt: string;
  size?: number;
  className?: string;
}

export function Avatar({ src, alt, size = 64, className = '' }: AvatarProps) {
  return (
    <div
      className={`shrink-0 rounded-full border-[1.869px] border-white bg-[var(--color-avatar-fallback)] overflow-hidden ${className}`}
      style={{ width: size, height: size }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={size}
          height={size}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-[#999] text-sm font-bold">
          {alt.charAt(0).toUpperCase()}
        </div>
      )}
    </div>
  );
}
