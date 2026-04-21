import { createClient } from '@/lib/supabase/server';
import type {
  KudoPost,
  UserStats,
  LeaderboardEntry,
  SpotlightNode,
  FilterState,
} from '@/types/kudo-feed';

function computeStarRating(kudosReceived: number): number {
  if (kudosReceived >= 50) return 3;
  if (kudosReceived >= 20) return 2;
  if (kudosReceived >= 10) return 1;
  return 0;
}

type ProfileInfo = {
  id: string;
  full_name: string;
  avatar_url: string | null;
  department_id: number | null;
};

type KudoHashtagJoin = { hashtag: { name: string } | null };
type KudoImageJoin = { image_url: string; display_order: number };

function extractHashtags(row: Record<string, unknown>): string[] {
  // Handle already-processed array of strings (from fallback path)
  if (Array.isArray(row.hashtags) && typeof row.hashtags[0] === 'string') {
    return row.hashtags as string[];
  }
  // Handle joined data from kudo_hashtags
  const joined = row.kudo_hashtags as KudoHashtagJoin[] | undefined;
  if (!joined) return [];
  return joined
    .map((h) => h.hashtag?.name)
    .filter((name): name is string => !!name);
}

function extractImages(row: Record<string, unknown>): string[] {
  // Handle already-processed array of strings (from fallback path)
  if (Array.isArray(row.images) && typeof row.images[0] === 'string') {
    return row.images as string[];
  }
  // Handle joined data from kudo_images
  const joined = row.kudo_images as KudoImageJoin[] | undefined;
  if (!joined) return [];
  return joined
    .sort((a, b) => a.display_order - b.display_order)
    .map((img) => img.image_url);
}

function mapToKudoPost(
  row: Record<string, unknown>,
  kudoCountByUser: Map<string, number>,
  likedKudoIds: Set<string>
): KudoPost {
  const sender = row.sender as ProfileInfo | null;
  const receiver = row.receiver as ProfileInfo | null;
  const isAnonymous = row.is_anonymous as boolean;
  const anonymousName = row.anonymous_name as string | null;

  const senderKudosReceived = sender ? (kudoCountByUser.get(sender.id) ?? 0) : 0;
  const receiverKudosReceived = receiver ? (kudoCountByUser.get(receiver.id) ?? 0) : 0;

  const senderInfo = isAnonymous
    ? { id: '', full_name: anonymousName || 'Ẩn danh', avatar_url: null, department_id: null, star_rating: 0 }
    : {
        id: sender?.id ?? '',
        full_name: sender?.full_name ?? '',
        avatar_url: sender?.avatar_url ?? null,
        department_id: sender?.department_id ?? null,
        star_rating: computeStarRating(senderKudosReceived),
      };

  return {
    id: String(row.id),
    sender: senderInfo,
    receiver: {
      id: receiver?.id ?? '',
      full_name: receiver?.full_name ?? '',
      avatar_url: receiver?.avatar_url ?? null,
      department_id: receiver?.department_id ?? null,
      star_rating: computeStarRating(receiverKudosReceived),
    },
    title: (row.title as string) ?? '',
    content: (row.content as string) ?? '',
    hashtags: extractHashtags(row),
    images: extractImages(row),
    is_anonymous: isAnonymous,
    anonymous_name: anonymousName,
    like_count: (row.like_count as number) ?? 0,
    user_liked: likedKudoIds.has(String(row.id)),
    created_at: row.created_at as string,
  };
}

async function fetchKudoCountsByRecipient(
  supabase: Awaited<ReturnType<typeof createClient>> & object
): Promise<Map<string, number>> {
  const { data } = await supabase.from('kudos').select('receiver_id');
  const countMap = new Map<string, number>();
  if (data) {
    for (const row of data) {
      const id = row.receiver_id;
      countMap.set(id, (countMap.get(id) ?? 0) + 1);
    }
  }
  return countMap;
}

/**
 * Try a select with profile joins. If FK joins fail (e.g. constraint names differ),
 * fall back to a plain select without joins and fetch profiles separately.
 */
async function fetchKudosWithProfiles(
  supabase: Awaited<ReturnType<typeof createClient>> & object,
  filters: FilterState,
  options: { cursor?: string | null; limit?: number; orderBy?: string; orderAsc?: boolean }
) {
  const { cursor, limit = 10, orderBy = 'created_at', orderAsc = false } = options;

  // Try with FK joins first (column-based disambiguation)
  let query = supabase
    .from('kudos')
    .select(
      `id, sender_id, receiver_id, title, content,
       is_anonymous, anonymous_name, like_count, created_at,
       sender:profiles!sender_id(id, full_name, avatar_url, department_id),
       receiver:profiles!receiver_id(id, full_name, avatar_url, department_id),
       kudo_hashtags(hashtag:hashtags(name)),
       kudo_images(image_url, display_order)`
    );

  // Note: hashtag filtering needs to be done via junction table or post-filter
  // For now we'll do post-filtering after fetch
  if (cursor) {
    query = query.lt('created_at', cursor);
  }
  query = query.order(orderBy, { ascending: orderAsc }).limit(limit);

  const { data, error } = await query;

  if (!error && data) {
    let rows = data as unknown as Record<string, unknown>[];

    // Apply hashtag filter post-query
    if (filters.hashtag) {
      rows = rows.filter((row) => {
        const hashtags = extractHashtags(row);
        return hashtags.includes(filters.hashtag!);
      });
    }

    // Apply department filter post-query
    if (filters.department) {
      const deptId = Number(filters.department);
      rows = rows.filter((row) => {
        const receiver = row.receiver as ProfileInfo | null;
        return receiver?.department_id === deptId;
      });
    }

    return rows;
  }

  // Fallback: plain select without joins (if FK constraint names don't match)
  let fallbackQuery = supabase
    .from('kudos')
    .select('id, sender_id, receiver_id, title, content, is_anonymous, anonymous_name, like_count, created_at');

  if (cursor) {
    fallbackQuery = fallbackQuery.lt('created_at', cursor);
  }
  fallbackQuery = fallbackQuery.order(orderBy, { ascending: orderAsc }).limit(limit);

  const { data: fallbackData, error: fallbackError } = await fallbackQuery;
  if (fallbackError || !fallbackData) return [];

  // Fetch profiles for all sender/receiver IDs
  const allIds = new Set<string>();
  for (const row of fallbackData) {
    allIds.add(row.sender_id);
    allIds.add(row.receiver_id);
  }

  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, full_name, avatar_url, department_id')
    .in('id', Array.from(allIds));

  const profileMap = new Map<string, ProfileInfo>();
  if (profiles) {
    for (const p of profiles) {
      profileMap.set(p.id, p);
    }
  }

  // Fetch hashtags and images for these kudos
  const kudoIds = fallbackData.map((row) => row.id);

  type HashtagRow = { kudo_id: number; hashtag: { name: string } | null };
  type ImageRow = { kudo_id: number; image_url: string; display_order: number };

  const [hashtagsResult, imagesResult] = await Promise.all([
    supabase.from('kudo_hashtags').select('kudo_id, hashtag:hashtags(name)').in('kudo_id', kudoIds),
    supabase.from('kudo_images').select('kudo_id, image_url, display_order').in('kudo_id', kudoIds).order('display_order'),
  ]);

  const hashtagsByKudo = new Map<number, string[]>();
  if (hashtagsResult.data) {
    for (const row of hashtagsResult.data as unknown as HashtagRow[]) {
      const existing = hashtagsByKudo.get(row.kudo_id) ?? [];
      if (row.hashtag?.name) {
        existing.push(row.hashtag.name);
      }
      hashtagsByKudo.set(row.kudo_id, existing);
    }
  }

  const imagesByKudo = new Map<number, string[]>();
  if (imagesResult.data) {
    for (const row of imagesResult.data as unknown as ImageRow[]) {
      const existing = imagesByKudo.get(row.kudo_id) ?? [];
      existing.push(row.image_url);
      imagesByKudo.set(row.kudo_id, existing);
    }
  }

  const rows = fallbackData.map((row) => ({
    ...row,
    sender: profileMap.get(row.sender_id) ?? null,
    receiver: profileMap.get(row.receiver_id) ?? null,
    hashtags: hashtagsByKudo.get(row.id) ?? [],
    images: imagesByKudo.get(row.id) ?? [],
  }));

  // Apply filters
  let filteredRows = rows;
  if (filters.hashtag) {
    filteredRows = filteredRows.filter((row) => row.hashtags.includes(filters.hashtag!));
  }
  if (filters.department) {
    const deptId = Number(filters.department);
    filteredRows = filteredRows.filter((row) => {
      const receiver = row.receiver as ProfileInfo | null;
      return receiver?.department_id === deptId;
    });
  }

  return filteredRows as unknown as Record<string, unknown>[];
}

export async function fetchKudos(
  filters: FilterState,
  cursor: string | null,
  limit = 10,
  likedKudoIds: Set<string> = new Set()
): Promise<KudoPost[]> {
  try {
    const supabase = await createClient();
    if (!supabase) return [];

    const rows = await fetchKudosWithProfiles(supabase, filters, { cursor, limit });
    if (rows.length === 0) return [];

    const kudoCountByUser = await fetchKudoCountsByRecipient(supabase);
    return rows.map((row) => mapToKudoPost(row, kudoCountByUser, likedKudoIds));
  } catch {
    return [];
  }
}

export async function fetchHighlightKudos(
  filters: FilterState,
  likedKudoIds: Set<string> = new Set()
): Promise<KudoPost[]> {
  try {
    const supabase = await createClient();
    if (!supabase) return [];

    const rows = await fetchKudosWithProfiles(supabase, filters, {
      limit: 5,
      orderBy: 'like_count',
    });
    if (rows.length === 0) return [];

    const kudoCountByUser = await fetchKudoCountsByRecipient(supabase);
    return rows.map((row) => mapToKudoPost(row, kudoCountByUser, likedKudoIds));
  } catch {
    return [];
  }
}

export async function fetchKudosCount(): Promise<number> {
  try {
    const supabase = await createClient();
    if (!supabase) return 0;

    const { count, error } = await supabase
      .from('kudos')
      .select('*', { count: 'exact', head: true });

    if (error) return 0;
    return count ?? 0;
  } catch {
    return 0;
  }
}

export async function fetchUserStats(userId: string): Promise<UserStats> {
  const defaultStats: UserStats = {
    kudos_received: 0,
    kudos_sent: 0,
    hearts_received: 0,
    secret_boxes_opened: 0,
    secret_boxes_unopened: 0,
  };

  try {
    const supabase = await createClient();
    if (!supabase) return defaultStats;

    // Fetch kudos stats (these tables should exist)
    const [receivedResult, sentResult] = await Promise.all([
      supabase.from('kudos').select('*', { count: 'exact', head: true }).eq('receiver_id', userId),
      supabase.from('kudos').select('*', { count: 'exact', head: true }).eq('sender_id', userId),
    ]);

    const kudosReceived = receivedResult.count ?? 0;
    const kudosSent = sentResult.count ?? 0;

    // Fetch hearts from kudo_likes (table may not exist)
    let heartsReceived = 0;
    try {
      const { data: heartsData } = await supabase
        .from('kudo_likes')
        .select('heart_value')
        .eq('user_id', userId);
      if (heartsData) {
        heartsReceived = heartsData.reduce((sum, row) => sum + (row.heart_value ?? 0), 0);
      }
    } catch { /* table may not exist */ }

    // Fetch secret box stats (table may not exist)
    let boxesOpened = 0;
    let boxesUnopened = 0;
    try {
      const [openedResult, unopenedResult] = await Promise.all([
        supabase.from('secret_boxes').select('*', { count: 'exact', head: true }).eq('user_id', userId).eq('is_opened', true),
        supabase.from('secret_boxes').select('*', { count: 'exact', head: true }).eq('user_id', userId).eq('is_opened', false),
      ]);
      boxesOpened = openedResult.count ?? 0;
      boxesUnopened = unopenedResult.count ?? 0;
    } catch { /* table may not exist */ }

    return {
      kudos_received: kudosReceived,
      kudos_sent: kudosSent,
      hearts_received: heartsReceived,
      secret_boxes_opened: boxesOpened,
      secret_boxes_unopened: boxesUnopened,
    };
  } catch {
    return defaultStats;
  }
}

export async function fetchLeaderboard(): Promise<LeaderboardEntry[]> {
  try {
    const supabase = await createClient();
    if (!supabase) return [];

    // Try with FK join
    const { data, error } = await supabase
      .from('secret_boxes')
      .select('id, prize_id, user:profiles!user_id(id, full_name, avatar_url)')
      .eq('is_opened', true)
      .not('prize_id', 'is', null)
      .order('opened_at', { ascending: false })
      .limit(10);

    if (error || !data) return [];

    type LeaderboardRow = {
      id: string;
      prize_id: string | null;
      user: { id: string; full_name: string; avatar_url: string | null } | null;
    };

    return (data as unknown as LeaderboardRow[]).map((row) => ({
      id: row.user?.id ?? '',
      name: row.user?.full_name ?? '',
      avatar_url: row.user?.avatar_url ?? null,
      prize_description: row.prize_id ?? '',
    }));
  } catch {
    return [];
  }
}

export async function fetchSpotlightData(): Promise<SpotlightNode[]> {
  try {
    const supabase = await createClient();
    if (!supabase) return [];

    // Simple approach: fetch kudos with receiver_id, then fetch profiles
    const { data, error } = await supabase.from('kudos').select('receiver_id');
    if (error || !data) return [];

    const countMap = new Map<string, number>();
    for (const row of data) {
      const id = row.receiver_id;
      countMap.set(id, (countMap.get(id) ?? 0) + 1);
    }

    const recipientIds = Array.from(countMap.keys());
    if (recipientIds.length === 0) return [];

    const { data: profiles } = await supabase
      .from('profiles')
      .select('id, full_name')
      .in('id', recipientIds);

    if (!profiles) return [];

    return profiles.map((profile) => ({
      id: profile.id,
      name: profile.full_name,
      kudo_count: countMap.get(profile.id) ?? 0,
    }));
  } catch {
    return [];
  }
}
