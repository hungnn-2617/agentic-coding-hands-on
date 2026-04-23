import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useSecretBox } from '@/hooks/use-secret-box';
import { toast } from 'sonner';

// Mock fetch
global.fetch = vi.fn();

// Mock sonner toast
vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
  },
}));

// Mock use-language hook
vi.mock('@/hooks/use-language', () => ({
  useLanguage: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'secretBox.error.network': 'Unable to open box. Please try again.',
        'secretBox.error.noBoxes': 'You have no Secret Boxes remaining.',
      };
      return translations[key] || key;
    },
  }),
}));

const mockFetch = vi.mocked(global.fetch);

describe('useSecretBox', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('initial state', () => {
    it('returns initial state with all values at defaults', () => {
      const { result } = renderHook(() => useSecretBox());

      expect(result.current.state).toEqual({
        isLoading: false,
        isOpening: false,
        unopenedCount: 0,
        error: null,
        revealedBadge: null,
      });
    });

    it('provides all expected functions', () => {
      const { result } = renderHook(() => useSecretBox());

      expect(typeof result.current.openBox).toBe('function');
      expect(typeof result.current.fetchCount).toBe('function');
      expect(typeof result.current.resetError).toBe('function');
      expect(typeof result.current.resetState).toBe('function');
    });
  });

  describe('fetchCount', () => {
    it('updates unopenedCount on successful fetch', async () => {
      vi.useRealTimers();

      mockFetch.mockResolvedValueOnce(
        new Response(JSON.stringify({ unopened_count: 10 }), { status: 200 })
      );

      const { result } = renderHook(() => useSecretBox());

      await act(async () => {
        await result.current.fetchCount();
      });

      expect(result.current.state.unopenedCount).toBe(10);
      expect(result.current.state.isLoading).toBe(false);

      vi.useFakeTimers();
    });

    it('sets error on fetch failure', async () => {
      vi.useRealTimers();

      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      const { result } = renderHook(() => useSecretBox());

      await act(async () => {
        await result.current.fetchCount();
      });

      expect(result.current.state.error).toBe(
        'Unable to open box. Please try again.'
      );

      vi.useFakeTimers();
    });

    it('sets error on non-ok response', async () => {
      vi.useRealTimers();

      mockFetch.mockResolvedValueOnce(
        new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
      );

      const { result } = renderHook(() => useSecretBox());

      await act(async () => {
        await result.current.fetchCount();
      });

      expect(result.current.state.error).toBe(
        'Unable to open box. Please try again.'
      );

      vi.useFakeTimers();
    });
  });

  describe('openBox', () => {
    it('does not open if count is 0', async () => {
      vi.useRealTimers();

      const { result } = renderHook(() => useSecretBox());

      await act(async () => {
        await result.current.openBox();
      });

      expect(toast.error).toHaveBeenCalledWith(
        'You have no Secret Boxes remaining.'
      );

      vi.useFakeTimers();
    });

    it('updates state on successful open', async () => {
      vi.useRealTimers();

      // First fetch count
      mockFetch.mockResolvedValueOnce(
        new Response(JSON.stringify({ unopened_count: 5 }), { status: 200 })
      );

      const { result } = renderHook(() => useSecretBox());

      await act(async () => {
        await result.current.fetchCount();
      });

      // Mock the open response
      mockFetch.mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            success: true,
            badge: { id: 1, name: 'Stay Gold', image_url: '/badge.png' },
            remaining_count: 4,
          }),
          { status: 200 }
        )
      );

      await act(async () => {
        await result.current.openBox();
      });

      expect(result.current.state.unopenedCount).toBe(4);
      expect(result.current.state.revealedBadge).toEqual({
        id: 1,
        name: 'Stay Gold',
        description: null,
        image_url: '/badge.png',
        drop_rate: 0,
        created_at: '',
        display_name: 'Stay Gold',
      });

      vi.useFakeTimers();
    });

    it('shows error toast on open failure', async () => {
      vi.useRealTimers();

      // First fetch count
      mockFetch.mockResolvedValueOnce(
        new Response(JSON.stringify({ unopened_count: 5 }), { status: 200 })
      );

      const { result } = renderHook(() => useSecretBox());

      await act(async () => {
        await result.current.fetchCount();
      });

      // Mock the open response to fail
      mockFetch.mockRejectedValueOnce(new Error('Network error'));
      // Mock the re-fetch count call
      mockFetch.mockResolvedValueOnce(
        new Response(JSON.stringify({ unopened_count: 5 }), { status: 200 })
      );

      await act(async () => {
        await result.current.openBox();
      });

      expect(toast.error).toHaveBeenCalledWith(
        'Unable to open box. Please try again.'
      );

      vi.useFakeTimers();
    });
  });

  describe('resetError', () => {
    it('clears error state', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      const { result } = renderHook(() => useSecretBox());

      await act(async () => {
        await result.current.fetchCount();
      });

      expect(result.current.state.error).not.toBeNull();

      act(() => {
        result.current.resetError();
      });

      expect(result.current.state.error).toBeNull();
    });
  });

  describe('resetState', () => {
    it('resets all state to initial values', async () => {
      // Fetch count first
      mockFetch.mockResolvedValueOnce(
        new Response(JSON.stringify({ unopened_count: 5 }), { status: 200 })
      );

      const { result } = renderHook(() => useSecretBox());

      await act(async () => {
        await result.current.fetchCount();
      });

      expect(result.current.state.unopenedCount).toBe(5);

      act(() => {
        result.current.resetState();
      });

      expect(result.current.state).toEqual({
        isLoading: false,
        isOpening: false,
        unopenedCount: 0,
        error: null,
        revealedBadge: null,
      });
    });
  });
});
