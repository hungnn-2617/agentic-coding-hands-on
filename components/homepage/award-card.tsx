'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/hooks/use-language';
import type { AwardCategory } from '@/types/awards';
import { ArrowRightIcon } from '@/components/icons';

interface AwardCardProps {
  award: AwardCategory;
}

export function AwardCard({ award }: AwardCardProps) {
  const { locale, t } = useLanguage();
  const description =
    locale === 'en'
      ? (award.descriptionEn ?? award.description)
      : award.description;

  return (
    <Link
      href={`/awards-information#${award.slug}`}
      className="
        group flex flex-col gap-6 cursor-pointer
        transition-transform duration-200 ease-out
        hover:-translate-y-1
        focus-within:outline-2 focus-within:outline-[#FFEA9E] focus-within:outline-offset-4
      "
      aria-label={`${award.name} — ${description}`}
    >
      {/* Thumbnail — glow ring background + badge text overlay */}
      <div
        className="
          relative aspect-square w-full rounded-3xl overflow-hidden
          transition-shadow duration-200
          group-hover:shadow-[0_8px_12px_0_rgba(0,0,0,0.3),0_0_12px_0_#FAE287]
        "
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
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
          aria-hidden="true"
        />
        {/* Badge text overlay centered */}
        <div className="absolute inset-0 flex items-center justify-center z-10 p-8">
          <Image
            src={award.thumbnailUrl}
            alt={award.name}
            width={222}
            height={36}
            className="w-[75%] h-auto object-contain drop-shadow-lg"
          />
        </div>
      </div>

      {/* Text Content */}
      <div className="flex flex-col gap-1">
        <h3 className="text-[#FFEA9E] text-2xl font-normal leading-8">
          {award.name}
        </h3>
        <p className="text-white text-base font-normal leading-6 tracking-[0.5px] line-clamp-2">
          {description}
        </p>
      </div>

      {/* Detail Link */}
      <div className="flex items-center gap-2 py-4 text-white text-base font-medium leading-6 tracking-[0.15px] group-hover:text-[#FFEA9E] transition-colors">
        {t('awards.detail')}
        <ArrowRightIcon className="w-6 h-6" />
      </div>
    </Link>
  );
}
