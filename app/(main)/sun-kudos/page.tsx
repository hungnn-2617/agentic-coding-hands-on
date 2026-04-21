import { createClient } from '@/lib/supabase/server';
import { fetchKudos, fetchHighlightKudos, fetchKudosCount, fetchUserStats, fetchLeaderboard, fetchSpotlightData } from '@/lib/services/kudo-feed-service';
import { getUserLikedKudoIds } from '@/lib/services/kudo-like-service';
import { getHashtags } from '@/lib/services/hashtag-service';
import { getDepartments } from '@/lib/services/department-service';
import { SunKudosClient } from './client';
import type { FilterState } from '@/types/kudo-feed';

interface SunKudosPageProps {
  searchParams: Promise<{ hashtag?: string; department?: string }>;
}

export default async function SunKudosPage({ searchParams }: SunKudosPageProps) {
  const params = await searchParams;
  const supabase = await createClient();
  let userId = '';

  if (supabase) {
    const { data: { user } } = await supabase.auth.getUser();
    userId = user?.id ?? '';
  }

  const filters: FilterState = {
    hashtag: params.hashtag ?? null,
    department: params.department ?? null,
  };

  // Fetch all data with graceful error handling — each service already
  // returns safe defaults on failure, but wrap the whole block to be safe.
  const likedKudoIds = userId ? await getUserLikedKudoIds(userId) : new Set<string>();

  const [
    highlightKudos,
    initialKudos,
    kudosCount,
    userStats,
    leaderboardData,
    spotlightData,
    hashtags,
    departments,
  ] = await Promise.all([
    fetchHighlightKudos(filters, likedKudoIds).catch(() => []),
    fetchKudos(filters, null, 10, likedKudoIds).catch(() => []),
    fetchKudosCount().catch(() => 0),
    userId
      ? fetchUserStats(userId).catch(() => ({ kudos_received: 0, kudos_sent: 0, hearts_received: 0, secret_boxes_opened: 0, secret_boxes_unopened: 0 }))
      : Promise.resolve({ kudos_received: 0, kudos_sent: 0, hearts_received: 0, secret_boxes_opened: 0, secret_boxes_unopened: 0 }),
    fetchLeaderboard().catch(() => []),
    fetchSpotlightData().catch(() => []),
    getHashtags().catch(() => []),
    getDepartments().catch(() => []),
  ]);

  const userLikedKudoIdsArray = Array.from(likedKudoIds);

  return (
    <SunKudosClient
      userId={userId}
      highlightKudos={highlightKudos}
      initialKudos={initialKudos}
      kudosCount={kudosCount}
      userStats={userStats}
      leaderboardData={leaderboardData}
      spotlightData={spotlightData}
      hashtags={hashtags}
      departments={departments}
      userLikedKudoIdsArray={userLikedKudoIdsArray}
      filters={filters}
    />
  );
}
