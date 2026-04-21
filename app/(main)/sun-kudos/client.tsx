'use client';

import { useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useLanguage } from '@/hooks/use-language';
import { useKudosFilter } from '@/hooks/use-kudos-filter';
import { WriteKudoModal } from '@/components/write-kudo';
import { KVBanner } from '@/components/sun-kudos/kv-banner';
import { SunnerSearchModal } from '@/components/sun-kudos/sunner-search-modal';
import { SectionHeader } from '@/components/sun-kudos/section-header';
import { FilterDropdownButton } from '@/components/sun-kudos/filter-dropdown-button';
import { HighlightCarousel } from '@/components/sun-kudos/highlight-carousel';
import { SpotlightBoard } from '@/components/sun-kudos/spotlight-board';
import { AllKudosSection } from '@/components/sun-kudos/all-kudos-section';
import { KudosFeed } from '@/components/sun-kudos/kudos-feed';
import { StatsPanel } from '@/components/sun-kudos/stats-panel';
import { Leaderboard } from '@/components/sun-kudos/leaderboard';
import type { KudoPost, UserStats, LeaderboardEntry, SpotlightNode, FilterState } from '@/types/kudo-feed';

interface SunKudosClientProps {
  userId: string;
  highlightKudos: KudoPost[];
  initialKudos: KudoPost[];
  kudosCount: number;
  userStats: UserStats;
  leaderboardData: LeaderboardEntry[];
  spotlightData: SpotlightNode[];
  hashtags: { id: number; name: string }[];
  departments: { id: number; name: string }[];
  userLikedKudoIdsArray: string[];
  filters: FilterState;
}

export function SunKudosClient({
  userId,
  highlightKudos,
  initialKudos,
  kudosCount,
  userStats,
  leaderboardData,
  spotlightData,
  hashtags,
  departments,
  userLikedKudoIdsArray,
  filters,
}: SunKudosClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const router = useRouter();
  const { t } = useLanguage();
  const { setHashtag, setDepartment } = useKudosFilter();

  const userLikedKudoIds = useMemo(
    () => new Set(userLikedKudoIdsArray),
    [userLikedKudoIdsArray]
  );

  const hashtagOptions = useMemo(
    () => hashtags.map((h) => ({ id: h.name, name: h.name })),
    [hashtags]
  );

  const departmentOptions = useMemo(
    () => departments.map((d) => ({ id: d.id, name: d.name })),
    [departments]
  );

  const handleCopyLink = useCallback((kudoId: string) => {
    const url = `${window.location.origin}/sun-kudos/${kudoId}`;
    navigator.clipboard.writeText(url).then(() => {
      toast.success(t('liveBoard.action.linkCopied'));
    });
  }, [t]);

  const handleHashtagClick = useCallback((hashtag: string) => {
    setHashtag(hashtag);
  }, [setHashtag]);

  const handleOpenSecretBox = useCallback(() => {
    // Secret box dialog is a separate spec - placeholder
  }, []);

  const filterKey = `${filters.hashtag ?? ''}-${filters.department ?? ''}`;

  return (
    <div className="flex flex-col items-center w-full">
      {/* KV Banner */}
      <KVBanner
        onRecognitionClick={() => setIsModalOpen(true)}
        onSearchClick={() => setIsSearchOpen(true)}
      />

      {/* Main Content */}
      <div className="flex flex-col items-center gap-[120px] w-full px-[144px] py-24 max-sm:px-4 max-sm:gap-16">
        {/* Highlight Kudos Section */}
        <section className="w-full">
          <SectionHeader title={t('liveBoard.highlightKudos')}>
            <FilterDropdownButton
              label={t('liveBoard.filter.hashtag')}
              options={hashtagOptions}
              selectedValue={filters.hashtag}
              onSelect={setHashtag}
            />
            <FilterDropdownButton
              label={t('liveBoard.filter.department')}
              options={departmentOptions}
              selectedValue={filters.department}
              onSelect={setDepartment}
            />
          </SectionHeader>

          <div className="mt-10">
            <HighlightCarousel
              key={`highlight-${filterKey}`}
              kudos={highlightKudos}
              userId={userId}
              userLikedKudoIds={userLikedKudoIds}
              onCopyLink={handleCopyLink}
              onHashtagClick={handleHashtagClick}
            />
          </div>
        </section>

        {/* Spotlight Board Section */}
        <section className="w-full">
          <SectionHeader title={t('liveBoard.spotlightBoard')} />
          <div className="mt-10">
            <SpotlightBoard data={spotlightData} kudosCount={kudosCount} />
          </div>
        </section>

        {/* All Kudos + Sidebar */}
        <AllKudosSection
          feed={
            <KudosFeed
              key={`feed-${filterKey}`}
              initialKudos={initialKudos}
              filters={filters}
              userId={userId}
              userLikedKudoIds={userLikedKudoIds}
              onCopyLink={handleCopyLink}
              onHashtagClick={handleHashtagClick}
            />
          }
          sidebar={
            <>
              <StatsPanel stats={userStats} onOpenSecretBox={handleOpenSecretBox} />
              <Leaderboard entries={leaderboardData} />
            </>
          }
        />
      </div>

      {/* Write Kudo Modal */}
      <WriteKudoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          setIsModalOpen(false);
          router.refresh();
        }}
        userId={userId}
      />

      {/* Sunner Search Modal */}
      <SunnerSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
}
