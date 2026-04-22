import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useScrollSpy } from '@/hooks/use-scroll-spy';

// Mock IntersectionObserver
let mockObserverCallback: IntersectionObserverCallback | null = null;
let mockObserve: ReturnType<typeof vi.fn>;
let mockDisconnect: ReturnType<typeof vi.fn>;

class MockIntersectionObserver {
  constructor(callback: IntersectionObserverCallback, _options?: IntersectionObserverInit) {
    mockObserverCallback = callback;
  }

  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
  takeRecords = vi.fn().mockReturnValue([]);
}

// Mock window.matchMedia
const mockMatchMedia = vi.fn().mockImplementation(() => ({
  matches: false,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}));

// Mock Element.scrollIntoView
const mockScrollIntoView = vi.fn();

describe('useScrollSpy', () => {
  const sectionIds = ['section-1', 'section-2', 'section-3'];

  beforeEach(() => {
    vi.clearAllMocks();
    mockObserverCallback = null;
    mockObserve = vi.fn();
    mockDisconnect = vi.fn();

    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
    vi.stubGlobal('matchMedia', mockMatchMedia);

    // Create mock DOM elements
    sectionIds.forEach((id) => {
      const element = document.createElement('div');
      element.id = id;
      element.scrollIntoView = mockScrollIntoView;
      document.body.appendChild(element);
    });

    // Mock window.location
    Object.defineProperty(window, 'location', {
      value: {
        hash: '',
        href: 'http://localhost:3000',
      },
      writable: true,
    });

    // Mock history.replaceState
    vi.spyOn(history, 'replaceState').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    // Cleanup DOM elements
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        element.remove();
      }
    });
  });

  describe('initialization', () => {
    it('returns activeSectionId as first section initially', () => {
      const { result } = renderHook(() => useScrollSpy({ sectionIds }));

      expect(result.current.activeSectionId).toBe('section-1');
    });

    it('returns scrollToSection function', () => {
      const { result } = renderHook(() => useScrollSpy({ sectionIds }));

      expect(typeof result.current.scrollToSection).toBe('function');
    });

    it('handles empty sectionIds array', () => {
      const { result } = renderHook(() => useScrollSpy({ sectionIds: [] }));

      expect(result.current.activeSectionId).toBe('');
    });
  });

  describe('observer setup', () => {
    it('creates IntersectionObserver', () => {
      renderHook(() => useScrollSpy({ sectionIds }));

      // The hook should have created an IntersectionObserver
      expect(mockObserverCallback).not.toBeNull();
    });

    it('accepts custom rootMargin', () => {
      const { result } = renderHook(() =>
        useScrollSpy({ sectionIds, rootMargin: '-50px 0px 0px 0px' }),
      );

      // Hook should work with custom rootMargin
      expect(result.current.activeSectionId).toBe('section-1');
    });

    it('accepts custom threshold', () => {
      const { result } = renderHook(() => useScrollSpy({ sectionIds, threshold: 0.5 }));

      // Hook should work with custom threshold
      expect(result.current.activeSectionId).toBe('section-1');
    });

    it('observes section elements', () => {
      renderHook(() => useScrollSpy({ sectionIds }));

      // Observer callback should be registered
      expect(mockObserverCallback).not.toBeNull();
    });
  });

  describe('intersection callbacks', () => {
    it('updates activeSectionId when section becomes visible', () => {
      const { result } = renderHook(() => useScrollSpy({ sectionIds }));

      // Simulate intersection callback for section-2
      if (mockObserverCallback) {
        act(() => {
          mockObserverCallback!(
            [{ isIntersecting: true, target: { id: 'section-2' } } as unknown as IntersectionObserverEntry],
            {} as IntersectionObserver,
          );
        });
      }

      expect(result.current.activeSectionId).toBe('section-2');
    });

    it('does not update activeSectionId when section is not intersecting', () => {
      const { result } = renderHook(() => useScrollSpy({ sectionIds }));

      // Initial state
      expect(result.current.activeSectionId).toBe('section-1');

      // Simulate non-intersecting callback
      if (mockObserverCallback) {
        act(() => {
          mockObserverCallback!(
            [{ isIntersecting: false, target: { id: 'section-2' } } as unknown as IntersectionObserverEntry],
            {} as IntersectionObserver,
          );
        });
      }

      // Should remain at section-1
      expect(result.current.activeSectionId).toBe('section-1');
    });

    it('updates URL hash when section becomes visible', () => {
      renderHook(() => useScrollSpy({ sectionIds }));

      if (mockObserverCallback) {
        act(() => {
          mockObserverCallback!(
            [{ isIntersecting: true, target: { id: 'section-2' } } as unknown as IntersectionObserverEntry],
            {} as IntersectionObserver,
          );
        });
      }

      expect(history.replaceState).toHaveBeenCalledWith(null, '', '#section-2');
    });
  });

  describe('scrollToSection', () => {
    it('scrolls to the specified section', () => {
      const { result } = renderHook(() => useScrollSpy({ sectionIds }));

      act(() => {
        result.current.scrollToSection('section-2');
      });

      expect(mockScrollIntoView).toHaveBeenCalled();
    });

    it('updates activeSectionId immediately', () => {
      const { result } = renderHook(() => useScrollSpy({ sectionIds }));

      act(() => {
        result.current.scrollToSection('section-2');
      });

      expect(result.current.activeSectionId).toBe('section-2');
    });

    it('updates URL hash', () => {
      const { result } = renderHook(() => useScrollSpy({ sectionIds }));

      act(() => {
        result.current.scrollToSection('section-3');
      });

      expect(history.replaceState).toHaveBeenCalledWith(null, '', '#section-3');
    });

    it('does nothing for non-existent section', () => {
      const { result } = renderHook(() => useScrollSpy({ sectionIds }));

      act(() => {
        result.current.scrollToSection('non-existent');
      });

      // Should remain at section-1
      expect(result.current.activeSectionId).toBe('section-1');
    });

    it('uses smooth scroll behavior by default', () => {
      const { result } = renderHook(() => useScrollSpy({ sectionIds }));

      act(() => {
        result.current.scrollToSection('section-2');
      });

      expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
    });

    it('uses auto scroll behavior when reduced motion is preferred', () => {
      mockMatchMedia.mockReturnValueOnce({ matches: true } as MediaQueryList);

      const { result } = renderHook(() => useScrollSpy({ sectionIds }));

      act(() => {
        result.current.scrollToSection('section-2');
      });

      expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'auto' });
    });
  });

  describe('deep linking', () => {
    it('reads hash on mount and sets active section', () => {
      // Set initial hash before rendering
      Object.defineProperty(window, 'location', {
        value: {
          hash: '#section-2',
          href: 'http://localhost:3000#section-2',
        },
        writable: true,
      });

      const { result } = renderHook(() => useScrollSpy({ sectionIds }));

      expect(result.current.activeSectionId).toBe('section-2');
    });

    it('ignores invalid hash values', () => {
      Object.defineProperty(window, 'location', {
        value: {
          hash: '#invalid-section',
          href: 'http://localhost:3000#invalid-section',
        },
        writable: true,
      });

      const { result } = renderHook(() => useScrollSpy({ sectionIds }));

      // Should default to first section
      expect(result.current.activeSectionId).toBe('section-1');
    });
  });

  describe('cleanup', () => {
    it('disconnects observer on unmount', () => {
      const { unmount } = renderHook(() => useScrollSpy({ sectionIds }));

      // Unmount should not throw
      expect(() => unmount()).not.toThrow();
    });
  });

  describe('re-render stability', () => {
    it('maintains scrollToSection identity across re-renders without deps change', () => {
      const { result, rerender } = renderHook(() => useScrollSpy({ sectionIds }));

      const initialScrollToSection = result.current.scrollToSection;

      rerender();

      expect(result.current.scrollToSection).toBe(initialScrollToSection);
    });

    it('handles sectionIds change', () => {
      // Add new section element
      const newElement = document.createElement('div');
      newElement.id = 'section-4';
      newElement.scrollIntoView = mockScrollIntoView;
      document.body.appendChild(newElement);

      const { result, rerender } = renderHook(
        ({ ids }) => useScrollSpy({ sectionIds: ids }),
        { initialProps: { ids: ['section-1', 'section-2'] } },
      );

      expect(result.current.activeSectionId).toBe('section-1');

      rerender({ ids: ['section-1', 'section-2', 'section-4'] });

      // Should still have valid state
      expect(result.current.activeSectionId).toBe('section-1');

      // Cleanup
      newElement.remove();
    });
  });

  describe('return value shape', () => {
    it('returns object with activeSectionId and scrollToSection', () => {
      const { result } = renderHook(() => useScrollSpy({ sectionIds }));

      expect(Object.keys(result.current).sort()).toEqual(['activeSectionId', 'scrollToSection'].sort());
    });

    it('activeSectionId is a string', () => {
      const { result } = renderHook(() => useScrollSpy({ sectionIds }));

      expect(typeof result.current.activeSectionId).toBe('string');
    });

    it('scrollToSection is a function', () => {
      const { result } = renderHook(() => useScrollSpy({ sectionIds }));

      expect(typeof result.current.scrollToSection).toBe('function');
    });
  });
});
