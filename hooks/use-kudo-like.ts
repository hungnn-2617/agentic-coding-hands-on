'use client';

import { useState, useCallback, useRef } from 'react';
import { toggleKudoLikeAction } from '@/app/(main)/sun-kudos/actions';
import { toast } from 'sonner';

export function useKudoLike(
  kudoId: string,
  initialLiked: boolean,
  initialCount: number,
  isOwnKudo: boolean,
) {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toggle = useCallback(() => {
    if (isOwnKudo) return;

    // Clear any pending debounced call
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Optimistic update
    const prevLiked = isLiked;
    const prevCount = count;
    const nextLiked = !prevLiked;

    setIsLiked(nextLiked);
    setCount(nextLiked ? prevCount + 1 : prevCount - 1);

    // Debounce the server action
    debounceRef.current = setTimeout(async () => {
      try {
        await toggleKudoLikeAction(kudoId);
      } catch {
        // Revert on failure
        setIsLiked(prevLiked);
        setCount(prevCount);
        toast.error('Failed to update like. Please try again.');
      }
    }, 300);
  }, [isOwnKudo, isLiked, count, kudoId]);

  return {
    isLiked,
    count,
    toggle,
    isDisabled: isOwnKudo,
  };
}
