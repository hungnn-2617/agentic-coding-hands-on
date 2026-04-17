import Image from 'next/image';

interface AwardImageProps {
  thumbnailUrl: string;
  altText: string;
  priority?: boolean;
}

export function AwardImage({ thumbnailUrl, altText, priority = false }: AwardImageProps) {
  return (
    <div
      className="relative w-[280px] h-[280px] sm:w-[300px] sm:h-[300px] lg:w-[336px] lg:h-[336px] shrink-0 rounded-3xl overflow-hidden border border-[#FFEA9E] mx-auto lg:mx-0"
      style={{
        boxShadow: '0 4px 4px 0 rgba(0,0,0,0.25), 0 0 6px 0 #FAE287',
      }}
    >
      {/* Glow ring background */}
      <Image
        src="/images/award-glow-ring.png"
        alt=""
        fill
        className="object-cover"
        sizes="336px"
        priority={priority}
        aria-hidden="true"
      />
      {/* Badge text overlay centered */}
      <div className="absolute inset-0 flex items-center justify-center z-10 p-8">
        <Image
          src={thumbnailUrl}
          alt={altText}
          width={222}
          height={36}
          className="w-[75%] h-auto object-contain drop-shadow-lg"
        />
      </div>
    </div>
  );
}
