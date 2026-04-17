import type { Metadata } from 'next';
import { PrizeHeroSection } from '@/components/awards-information/prize-hero-section';
import { PrizeContentSection } from '@/components/awards-information/prize-content-section';
import { SunKudosPromo } from '@/components/awards-information/sun-kudos-promo';

export const metadata: Metadata = {
  title: 'Award Information | SAA 2025',
  description: 'Sun* Annual Awards 2025 - Hệ thống giải thưởng SAA 2025',
};

export default function AwardsInformationPage() {
  return (
    <div className="flex flex-col">
      <PrizeHeroSection />

      {/* Main content */}
      <div className="flex flex-col gap-16 sm:gap-20 lg:gap-[120px] px-4 sm:px-12 lg:px-[144px] pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-20 lg:pb-[96px] max-w-[1440px] mx-auto w-full">
        <PrizeContentSection />
        <SunKudosPromo />
      </div>
    </div>
  );
}
