'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { KudoPost, FilterState } from '@/types/kudo-feed';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

function transformRow(row: Record<string, unknown>): KudoPost {
  const sender = row.sender as Record<string, unknown> | null;
  const receiver = row.receiver as Record<string, unknown> | null;

  return {
    id: row.id as string,
    sender: {
      id: (sender?.id as string) ?? '',
      full_name: (sender?.full_name as string) ?? '',
      avatar_url: (sender?.avatar_url as string | null) ?? null,
      department_id: (sender?.department_id as number | null) ?? null,
      star_rating: (sender?.star_rating as number) ?? 0,
    },
    receiver: {
      id: (receiver?.id as string) ?? '',
      full_name: (receiver?.full_name as string) ?? '',
      avatar_url: (receiver?.avatar_url as string | null) ?? null,
      department_id: (receiver?.department_id as number | null) ?? null,
      star_rating: (receiver?.star_rating as number) ?? 0,
    },
    title: (row.title as string) ?? '',
    content: (row.content as string) ?? '',
    hashtags: (row.hashtags as string[]) ?? [],
    images: (row.images as string[]) ?? [],
    is_anonymous: (row.is_anonymous as boolean) ?? false,
    anonymous_name: (row.anonymous_name as string) ?? null,
    like_count: (row.like_count as number) ?? 0,
    user_liked: (row.user_liked as boolean) ?? false,
    created_at: (row.created_at as string) ?? '',
  };
}

export function useKudosFeed(filters: FilterState, initialKudos: KudoPost[]) {
  const [kudos, setKudos] = useState<KudoPost[]>(initialKudos);
  const [cursor, setCursor] = useState<string | null>(
    initialKudos.length > 0
      ? initialKudos[initialKudos.length - 1].created_at
      : null,
  );
  const [hasMore, setHasMore] = useState(initialKudos.length >= 10);
  const [isLoading, setIsLoading] = useState(false);
  const isLoadingRef = useRef(false);

  const { ref: sentinelRef, isIntersecting } = useIntersectionObserver({
    rootMargin: '200px',
  });

  // Reset state when filters change (detected via initialKudos reference)
  useEffect(() => {
    setKudos(initialKudos);
    setCursor(
      initialKudos.length > 0
        ? initialKudos[initialKudos.length - 1].created_at
        : null,
    );
    setHasMore(initialKudos.length >= 10);
    setIsLoading(false);
    isLoadingRef.current = false;
  }, [initialKudos]);

  const loadMore = useCallback(async () => {
    if (isLoadingRef.current || !hasMore || !cursor) return;

    const supabase = createClient();
    if (!supabase) return;

    isLoadingRef.current = true;
    setIsLoading(true);

    try {
      // Try with FK joins (column-based disambiguation)
      const joinResult = await supabase
        .from('kudos')
        .select(
          '*, sender:profiles!sender_id(*), receiver:profiles!recipient_id(*)',
        )
        .lt('created_at', cursor)
        .order('created_at', { ascending: false })
        .limit(10);

      let rows: Record<string, unknown>[];

      if (!joinResult.error && joinResult.data) {
        rows = joinResult.data as unknown as Record<string, unknown>[];
      } else {
        // Fallback: plain select without joins
        const plainResult = await supabase
          .from('kudos')
          .select('*')
          .lt('created_at', cursor)
          .order('created_at', { ascending: false })
          .limit(10);

        if (plainResult.error) throw plainResult.error;
        rows = (plainResult.data ?? []).map((r) => ({ ...r, sender: null, receiver: null })) as unknown as Record<string, unknown>[];
      }

      if (rows.length === 0) {
        setHasMore(false);
        return;
      }

      const newKudos = rows.map(transformRow);

      setKudos((prev) => [...prev, ...newKudos]);
      setCursor(newKudos[newKudos.length - 1].created_at);
      setHasMore(newKudos.length >= 10);
    } catch {
      setHasMore(false);
    } finally {
      setIsLoading(false);
      isLoadingRef.current = false;
    }
  }, [hasMore, cursor]);

  // Trigger loadMore when sentinel is intersecting
  useEffect(() => {
    if (isIntersecting && hasMore && !isLoadingRef.current) {
      loadMore();
    }
  }, [isIntersecting, hasMore, loadMore]);

  return { kudos, isLoading, hasMore, sentinelRef };
}
