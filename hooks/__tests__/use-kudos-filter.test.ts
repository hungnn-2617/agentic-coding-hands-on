import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useKudosFilter } from '@/hooks/use-kudos-filter';

// Mock next/navigation
const mockPush = vi.fn();
let mockSearchParams = new URLSearchParams();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
  useSearchParams: () => mockSearchParams,
}));

describe('useKudosFilter', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSearchParams = new URLSearchParams();
  });

  describe('initial state - filters from URL', () => {
    it('returns null hashtag when not in URL', () => {
      mockSearchParams = new URLSearchParams();
      const { result } = renderHook(() => useKudosFilter());

      expect(result.current.filters.hashtag).toBeNull();
    });

    it('returns null department when not in URL', () => {
      mockSearchParams = new URLSearchParams();
      const { result } = renderHook(() => useKudosFilter());

      expect(result.current.filters.department).toBeNull();
    });

    it('reads hashtag from URL params', () => {
      mockSearchParams = new URLSearchParams('hashtag=teamwork');
      const { result } = renderHook(() => useKudosFilter());

      expect(result.current.filters.hashtag).toBe('teamwork');
    });

    it('reads department from URL params', () => {
      mockSearchParams = new URLSearchParams('department=Engineering');
      const { result } = renderHook(() => useKudosFilter());

      expect(result.current.filters.department).toBe('Engineering');
    });

    it('reads both filters from URL params', () => {
      mockSearchParams = new URLSearchParams('hashtag=innovation&department=Design');
      const { result } = renderHook(() => useKudosFilter());

      expect(result.current.filters.hashtag).toBe('innovation');
      expect(result.current.filters.department).toBe('Design');
    });
  });

  describe('setHashtag()', () => {
    it('updates URL with new hashtag', () => {
      mockSearchParams = new URLSearchParams();
      const { result } = renderHook(() => useKudosFilter());

      act(() => {
        result.current.setHashtag('teamwork');
      });

      expect(mockPush).toHaveBeenCalledWith('?hashtag=teamwork');
    });

    it('preserves existing department when setting hashtag', () => {
      mockSearchParams = new URLSearchParams('department=Engineering');
      const { result } = renderHook(() => useKudosFilter());

      act(() => {
        result.current.setHashtag('innovation');
      });

      expect(mockPush).toHaveBeenCalledWith('?department=Engineering&hashtag=innovation');
    });

    it('replaces existing hashtag in URL', () => {
      mockSearchParams = new URLSearchParams('hashtag=old-tag');
      const { result } = renderHook(() => useKudosFilter());

      act(() => {
        result.current.setHashtag('new-tag');
      });

      expect(mockPush).toHaveBeenCalledWith('?hashtag=new-tag');
    });

    it('removes hashtag when setting null', () => {
      mockSearchParams = new URLSearchParams('hashtag=teamwork');
      const { result } = renderHook(() => useKudosFilter());

      act(() => {
        result.current.setHashtag(null);
      });

      expect(mockPush).toHaveBeenCalledWith('?');
    });

    it('removes hashtag but preserves department when setting null', () => {
      mockSearchParams = new URLSearchParams('hashtag=teamwork&department=Design');
      const { result } = renderHook(() => useKudosFilter());

      act(() => {
        result.current.setHashtag(null);
      });

      expect(mockPush).toHaveBeenCalledWith('?department=Design');
    });
  });

  describe('setDepartment()', () => {
    it('updates URL with new department', () => {
      mockSearchParams = new URLSearchParams();
      const { result } = renderHook(() => useKudosFilter());

      act(() => {
        result.current.setDepartment('Engineering');
      });

      expect(mockPush).toHaveBeenCalledWith('?department=Engineering');
    });

    it('preserves existing hashtag when setting department', () => {
      mockSearchParams = new URLSearchParams('hashtag=teamwork');
      const { result } = renderHook(() => useKudosFilter());

      act(() => {
        result.current.setDepartment('Marketing');
      });

      expect(mockPush).toHaveBeenCalledWith('?hashtag=teamwork&department=Marketing');
    });

    it('replaces existing department in URL', () => {
      mockSearchParams = new URLSearchParams('department=OldDept');
      const { result } = renderHook(() => useKudosFilter());

      act(() => {
        result.current.setDepartment('NewDept');
      });

      expect(mockPush).toHaveBeenCalledWith('?department=NewDept');
    });

    it('removes department when setting null', () => {
      mockSearchParams = new URLSearchParams('department=Engineering');
      const { result } = renderHook(() => useKudosFilter());

      act(() => {
        result.current.setDepartment(null);
      });

      expect(mockPush).toHaveBeenCalledWith('?');
    });

    it('removes department but preserves hashtag when setting null', () => {
      mockSearchParams = new URLSearchParams('hashtag=innovation&department=Engineering');
      const { result } = renderHook(() => useKudosFilter());

      act(() => {
        result.current.setDepartment(null);
      });

      expect(mockPush).toHaveBeenCalledWith('?hashtag=innovation');
    });
  });

  describe('clearFilters()', () => {
    it('clears all filters from URL', () => {
      mockSearchParams = new URLSearchParams('hashtag=teamwork&department=Engineering');
      const { result } = renderHook(() => useKudosFilter());

      act(() => {
        result.current.clearFilters();
      });

      expect(mockPush).toHaveBeenCalledWith('?');
    });

    it('works when no filters are set', () => {
      mockSearchParams = new URLSearchParams();
      const { result } = renderHook(() => useKudosFilter());

      act(() => {
        result.current.clearFilters();
      });

      expect(mockPush).toHaveBeenCalledWith('?');
    });

    it('clears only filter params, hypothetically preserving other params', () => {
      // This tests the implementation behavior - clearFilters always pushes '?'
      mockSearchParams = new URLSearchParams('hashtag=teamwork');
      const { result } = renderHook(() => useKudosFilter());

      act(() => {
        result.current.clearFilters();
      });

      expect(mockPush).toHaveBeenCalledWith('?');
    });
  });

  describe('return value stability', () => {
    it('returns all expected properties', () => {
      mockSearchParams = new URLSearchParams();
      const { result } = renderHook(() => useKudosFilter());

      expect(result.current).toHaveProperty('filters');
      expect(result.current).toHaveProperty('setHashtag');
      expect(result.current).toHaveProperty('setDepartment');
      expect(result.current).toHaveProperty('clearFilters');
    });

    it('filters object has correct shape', () => {
      mockSearchParams = new URLSearchParams('hashtag=test&department=dept');
      const { result } = renderHook(() => useKudosFilter());

      expect(result.current.filters).toEqual({
        hashtag: 'test',
        department: 'dept',
      });
    });
  });

  describe('URL encoding', () => {
    it('handles special characters in hashtag', () => {
      mockSearchParams = new URLSearchParams();
      const { result } = renderHook(() => useKudosFilter());

      act(() => {
        result.current.setHashtag('team work');
      });

      // URLSearchParams encodes spaces as +
      expect(mockPush).toHaveBeenCalledWith('?hashtag=team+work');
    });

    it('reads URL-encoded values correctly', () => {
      mockSearchParams = new URLSearchParams('hashtag=team%20work');
      const { result } = renderHook(() => useKudosFilter());

      expect(result.current.filters.hashtag).toBe('team work');
    });

    it('handles unicode characters in department', () => {
      mockSearchParams = new URLSearchParams();
      const { result } = renderHook(() => useKudosFilter());

      act(() => {
        result.current.setDepartment('Phòng Kỹ thuật');
      });

      // Check that the push was called (URLSearchParams handles encoding)
      expect(mockPush).toHaveBeenCalled();
      const pushedUrl = mockPush.mock.calls[0][0];
      expect(pushedUrl).toContain('department=');
    });
  });

  describe('integration scenarios', () => {
    it('supports typical filter workflow', () => {
      mockSearchParams = new URLSearchParams();
      const { result } = renderHook(() => useKudosFilter());

      // Initial state
      expect(result.current.filters).toEqual({ hashtag: null, department: null });

      // Set hashtag
      act(() => {
        result.current.setHashtag('teamwork');
      });
      expect(mockPush).toHaveBeenLastCalledWith('?hashtag=teamwork');

      // Clear
      act(() => {
        result.current.clearFilters();
      });
      expect(mockPush).toHaveBeenLastCalledWith('?');
    });

    it('handles rapid filter changes', () => {
      mockSearchParams = new URLSearchParams();
      const { result } = renderHook(() => useKudosFilter());

      act(() => {
        result.current.setHashtag('tag1');
        result.current.setHashtag('tag2');
        result.current.setHashtag('tag3');
      });

      // All calls should go through (no debouncing in this hook)
      expect(mockPush).toHaveBeenCalledTimes(3);
    });
  });
});
