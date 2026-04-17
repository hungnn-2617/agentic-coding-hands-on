import type { Metadata } from 'next';
import { HeroSection } from '@/components/homepage/hero-section';
import { AboutContent } from '@/components/homepage/about-content';
import { AwardsSection } from '@/components/homepage/awards-section';
import { KudosSection } from '@/components/homepage/kudos-section';

export const metadata: Metadata = {
  title: 'Homepage | SAA 2025',
  description: 'Sun* Annual Awards 2025 - ROOT FURTHER',
};

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      {/* Section gap: 120px desktop, 80px tablet, 64px mobile per design-style.md */}
      <div className="flex flex-col gap-16 sm:gap-20 lg:gap-[120px] py-16 sm:py-20 lg:py-[96px]">
        <AboutContent />
        <AwardsSection />
        <KudosSection />
      </div>
    </div>
  );
}
