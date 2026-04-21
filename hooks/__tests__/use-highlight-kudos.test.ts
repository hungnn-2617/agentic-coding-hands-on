import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useHighlightKudos } from '@/hooks/use-highlight-kudos';
import { createMockKudosList } from '@/test-utils';

describe('useHighlightKudos', () => {
  describe('initial state', () => {
    it('starts at slide 0 with non-empty kudos array', () => {
      const kudos = createMockKudosList(5);
      const { result } = renderHook(() => useHighlightKudos(kudos));

      expect(result.current.currentSlide).toBe(0);
    });

    it('starts at slide 0 with empty kudos array', () => {
      const { result } = renderHook(() => useHighlightKudos([]));

      expect(result.current.currentSlide).toBe(0);
    });
  });

  describe('navigation state (canGoNext, canGoPrev)', () => {
    it('canGoPrev is false at first slide', () => {
      const kudos = createMockKudosList(5);
      const { result } = renderHook(() => useHighlightKudos(kudos));

      expect(result.current.canGoPrev).toBe(false);
    });

    it('canGoNext is true when not at last slide', () => {
      const kudos = createMockKudosList(5);
      const { result } = renderHook(() => useHighlightKudos(kudos));

      expect(result.current.canGoNext).toBe(true);
    });

    it('canGoNext is false when at last slide', () => {
      const kudos = createMockKudosList(5);
      const { result } = renderHook(() => useHighlightKudos(kudos));

      // Navigate to last slide
      act(() => {
        result.current.goTo(4);
      });

      expect(result.current.canGoNext).toBe(false);
    });

    it('canGoPrev is true when not at first slide', () => {
      const kudos = createMockKudosList(5);
      const { result } = renderHook(() => useHighlightKudos(kudos));

      // Navigate to slide 1
      act(() => {
        result.current.next();
      });

      expect(result.current.canGoPrev).toBe(true);
    });

    it('both canGoNext and canGoPrev are false with empty array', () => {
      const { result } = renderHook(() => useHighlightKudos([]));

      expect(result.current.canGoNext).toBe(false);
      expect(result.current.canGoPrev).toBe(false);
    });

    it('both canGoNext and canGoPrev are false with single kudo', () => {
      const kudos = createMockKudosList(1);
      const { result } = renderHook(() => useHighlightKudos(kudos));

      expect(result.current.canGoNext).toBe(false);
      expect(result.current.canGoPrev).toBe(false);
    });
  });

  describe('next()', () => {
    it('increments currentSlide by 1', () => {
      const kudos = createMockKudosList(5);
      const { result } = renderHook(() => useHighlightKudos(kudos));

      act(() => {
        result.current.next();
      });

      expect(result.current.currentSlide).toBe(1);
    });

    it('does not exceed last slide index', () => {
      const kudos = createMockKudosList(3);
      const { result } = renderHook(() => useHighlightKudos(kudos));

      // Try to go beyond last slide
      act(() => {
        result.current.next();
        result.current.next();
        result.current.next(); // Should be clamped
        result.current.next(); // Should be clamped
      });

      expect(result.current.currentSlide).toBe(2); // Max index for 3 items
    });
  });

  describe('prev()', () => {
    it('decrements currentSlide by 1', () => {
      const kudos = createMockKudosList(5);
      const { result } = renderHook(() => useHighlightKudos(kudos));

      // First navigate forward
      act(() => {
        result.current.next();
        result.current.next();
      });

      expect(result.current.currentSlide).toBe(2);

      // Then go back
      act(() => {
        result.current.prev();
      });

      expect(result.current.currentSlide).toBe(1);
    });

    it('does not go below 0', () => {
      const kudos = createMockKudosList(5);
      const { result } = renderHook(() => useHighlightKudos(kudos));

      // Try to go below 0
      act(() => {
        result.current.prev();
        result.current.prev();
      });

      expect(result.current.currentSlide).toBe(0);
    });
  });

  describe('goTo()', () => {
    it('navigates to specific slide index', () => {
      const kudos = createMockKudosList(5);
      const { result } = renderHook(() => useHighlightKudos(kudos));

      act(() => {
        result.current.goTo(3);
      });

      expect(result.current.currentSlide).toBe(3);
    });

    it('clamps negative index to 0', () => {
      const kudos = createMockKudosList(5);
      const { result } = renderHook(() => useHighlightKudos(kudos));

      act(() => {
        result.current.goTo(-5);
      });

      expect(result.current.currentSlide).toBe(0);
    });

    it('clamps index exceeding array length to last valid index', () => {
      const kudos = createMockKudosList(5);
      const { result } = renderHook(() => useHighlightKudos(kudos));

      act(() => {
        result.current.goTo(100);
      });

      expect(result.current.currentSlide).toBe(4); // Max index for 5 items
    });
  });

  describe('kudos array changes', () => {
    it('clamps currentSlide when kudos array shrinks', () => {
      const initialKudos = createMockKudosList(5);
      const { result, rerender } = renderHook(
        ({ kudos }) => useHighlightKudos(kudos),
        { initialProps: { kudos: initialKudos } },
      );

      // Navigate to last slide
      act(() => {
        result.current.goTo(4);
      });

      expect(result.current.currentSlide).toBe(4);

      // Shrink the array to 3 items
      const shorterKudos = createMockKudosList(3);
      rerender({ kudos: shorterKudos });

      expect(result.current.currentSlide).toBe(2); // Clamped to new max index
    });

    it('keeps currentSlide at 0 when kudos becomes empty', () => {
      const initialKudos = createMockKudosList(5);
      const { result, rerender } = renderHook(
        ({ kudos }) => useHighlightKudos(kudos),
        { initialProps: { kudos: initialKudos } },
      );

      // Navigate to slide 2
      act(() => {
        result.current.goTo(2);
      });

      expect(result.current.currentSlide).toBe(2);

      // Make kudos empty
      rerender({ kudos: [] });

      expect(result.current.currentSlide).toBe(0);
    });

    it('maintains currentSlide when kudos array grows', () => {
      const initialKudos = createMockKudosList(3);
      const { result, rerender } = renderHook(
        ({ kudos }) => useHighlightKudos(kudos),
        { initialProps: { kudos: initialKudos } },
      );

      // Navigate to slide 1
      act(() => {
        result.current.goTo(1);
      });

      expect(result.current.currentSlide).toBe(1);

      // Grow the array
      const longerKudos = createMockKudosList(10);
      rerender({ kudos: longerKudos });

      expect(result.current.currentSlide).toBe(1); // Should stay at 1
    });
  });

  describe('integration scenarios', () => {
    it('supports full navigation cycle', () => {
      const kudos = createMockKudosList(3);
      const { result } = renderHook(() => useHighlightKudos(kudos));

      // Start at 0
      expect(result.current.currentSlide).toBe(0);
      expect(result.current.canGoPrev).toBe(false);
      expect(result.current.canGoNext).toBe(true);

      // Go to 1
      act(() => {
        result.current.next();
      });
      expect(result.current.currentSlide).toBe(1);
      expect(result.current.canGoPrev).toBe(true);
      expect(result.current.canGoNext).toBe(true);

      // Go to 2 (last)
      act(() => {
        result.current.next();
      });
      expect(result.current.currentSlide).toBe(2);
      expect(result.current.canGoPrev).toBe(true);
      expect(result.current.canGoNext).toBe(false);

      // Go back to 1
      act(() => {
        result.current.prev();
      });
      expect(result.current.currentSlide).toBe(1);

      // Jump to 0
      act(() => {
        result.current.goTo(0);
      });
      expect(result.current.currentSlide).toBe(0);
    });
  });
});
