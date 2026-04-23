'use client';

import { useReducer, useCallback, useRef } from 'react';
import { toast } from 'sonner';
import { useLanguage } from '@/hooks/use-language';
import {
  SECRET_BOX_OPEN_DEBOUNCE_MS,
  type SecretBoxModalState,
  type SecretBoxAction,
  type UseSecretBoxReturn,
  type SecretBoxCountResponse,
  type SecretBoxOpenResponse,
  type SecretBoxOpenErrorResponse,
  type LocalizedBadge,
} from '@/types/secret-box';

/**
 * Initial state for the secret box modal
 */
const initialState: SecretBoxModalState = {
  isLoading: false,
  isOpening: false,
  unopenedCount: 0,
  error: null,
  revealedBadge: null,
};

/**
 * Reducer for managing secret box modal state
 */
function secretBoxReducer(
  state: SecretBoxModalState,
  action: SecretBoxAction
): SecretBoxModalState {
  switch (action.type) {
    case 'FETCH_COUNT_START':
      return { ...state, isLoading: true, error: null };

    case 'FETCH_COUNT_SUCCESS':
      return { ...state, isLoading: false, unopenedCount: action.payload };

    case 'FETCH_COUNT_ERROR':
      return { ...state, isLoading: false, error: action.payload };

    case 'OPEN_BOX_START':
      return { ...state, isOpening: true, error: null };

    case 'OPEN_BOX_SUCCESS':
      return {
        ...state,
        isOpening: false,
        unopenedCount: action.payload.remainingCount,
        revealedBadge: action.payload.badge,
      };

    case 'OPEN_BOX_ERROR':
      return { ...state, isOpening: false, error: action.payload };

    case 'RESET_ERROR':
      return { ...state, error: null };

    case 'RESET_STATE':
      return initialState;

    default:
      return state;
  }
}

/**
 * useSecretBox Hook
 *
 * Manages the state and logic for the Secret Box modal.
 * Handles fetching count, opening boxes, and error handling.
 */
export function useSecretBox(): UseSecretBoxReturn {
  const [state, dispatch] = useReducer(secretBoxReducer, initialState);
  const { t } = useLanguage();
  const lastOpenTimeRef = useRef<number>(0);

  /**
   * Fetch the user's unopened box count
   */
  const fetchCount = useCallback(async () => {
    dispatch({ type: 'FETCH_COUNT_START' });

    try {
      const response = await fetch('/api/secret-boxes/count');
      const data: SecretBoxCountResponse = await response.json();

      if (!response.ok) {
        throw new Error('Failed to fetch count');
      }

      dispatch({ type: 'FETCH_COUNT_SUCCESS', payload: data.unopened_count });
    } catch (err) {
      console.error('[useSecretBox] fetchCount error:', err);
      dispatch({
        type: 'FETCH_COUNT_ERROR',
        payload: t('secretBox.error.network'),
      });
    }
  }, [t]);

  /**
   * Open a secret box
   * Includes debounce protection to prevent rapid clicks
   */
  const openBox = useCallback(async () => {
    // Debounce check
    const now = Date.now();
    if (now - lastOpenTimeRef.current < SECRET_BOX_OPEN_DEBOUNCE_MS) {
      return;
    }
    lastOpenTimeRef.current = now;

    // Check if user has boxes to open
    if (state.unopenedCount <= 0) {
      toast.error(t('secretBox.error.noBoxes'));
      return;
    }

    dispatch({ type: 'OPEN_BOX_START' });

    // Optimistic update - decrement count immediately
    const previousCount = state.unopenedCount;

    try {
      const response = await fetch('/api/secret-boxes/open', {
        method: 'POST',
      });

      const data: SecretBoxOpenResponse | SecretBoxOpenErrorResponse =
        await response.json();

      if (!response.ok || !('success' in data) || !data.success) {
        throw new Error(
          'error' in data ? data.error : 'Failed to open box'
        );
      }

      // Create localized badge
      const badge: LocalizedBadge = {
        id: data.badge.id,
        name: data.badge.name,
        description: null,
        image_url: data.badge.image_url,
        drop_rate: 0,
        created_at: '',
        display_name: data.badge.name,
      };

      dispatch({
        type: 'OPEN_BOX_SUCCESS',
        payload: {
          badge,
          remainingCount: data.remaining_count,
        },
      });

      // Note: Badge reveal announcement would be handled by the modal component
      // using the revealedBadge state
    } catch (err) {
      console.error('[useSecretBox] openBox error:', err);

      // Rollback optimistic update by re-fetching count
      dispatch({
        type: 'OPEN_BOX_ERROR',
        payload: t('secretBox.error.network'),
      });

      // Show toast error
      toast.error(t('secretBox.error.network'));

      // Re-fetch actual count to ensure consistency
      try {
        const countResponse = await fetch('/api/secret-boxes/count');
        const countData: SecretBoxCountResponse = await countResponse.json();
        if (countResponse.ok) {
          dispatch({
            type: 'FETCH_COUNT_SUCCESS',
            payload: countData.unopened_count,
          });
        }
      } catch {
        // Silent fail for re-fetch, state already has error
      }
    }
  }, [state.unopenedCount, t]);

  /**
   * Reset the error state
   */
  const resetError = useCallback(() => {
    dispatch({ type: 'RESET_ERROR' });
  }, []);

  /**
   * Reset the entire state (e.g., when modal closes)
   */
  const resetState = useCallback(() => {
    dispatch({ type: 'RESET_STATE' });
  }, []);

  return {
    state,
    openBox,
    fetchCount,
    resetError,
    resetState,
  };
}
