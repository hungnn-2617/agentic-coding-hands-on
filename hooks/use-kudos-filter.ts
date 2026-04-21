'use client';

import { useCallback, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import type { FilterState } from '@/types/kudo-feed';

export function useKudosFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const filters: FilterState = useMemo(
    () => ({
      hashtag: searchParams.get('hashtag'),
      department: searchParams.get('department'),
    }),
    [searchParams],
  );

  const updateParams = useCallback(
    (updates: Partial<FilterState>) => {
      const params = new URLSearchParams(searchParams.toString());

      for (const [key, value] of Object.entries(updates)) {
        if (value === null || value === undefined) {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      }

      const query = params.toString();
      router.push(query ? `?${query}` : '?');
    },
    [searchParams, router],
  );

  const setHashtag = useCallback(
    (hashtag: string | null) => {
      updateParams({ hashtag });
    },
    [updateParams],
  );

  const setDepartment = useCallback(
    (department: string | null) => {
      updateParams({ department });
    },
    [updateParams],
  );

  const clearFilters = useCallback(() => {
    router.push('?');
  }, [router]);

  return { filters, setHashtag, setDepartment, clearFilters };
}
