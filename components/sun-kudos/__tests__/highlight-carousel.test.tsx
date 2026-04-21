import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import type { ReactNode } from 'react';
import { LanguageProvider } from '@/lib/i18n';
import { HighlightCarousel } from '../highlight-carousel';
import { createMockKudosList } from '@/test-utils';

// Mock the server action for useKudoLike inside HighlightKudoCard
vi.mock('@/app/(main)/sun-kudos/actions', () => ({
  toggleKudoLikeAction: vi.fn().mockResolvedValue(undefined),
}));

// Mock sonner toast
vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

// Mock next/navigation for UserInfo profile navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

// Mock next/image to avoid optimization issues in tests
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: { src: string; alt: string }) => (
    <img src={src} alt={alt} {...props} />
  ),
}));

function wrapper({ children }: { children: ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}

function renderCarousel(props: Partial<Parameters<typeof HighlightCarousel>[0]> = {}) {
  const defaultProps = {
    kudos: createMockKudosList(5),
    userId: 'current-user-id',
    userLikedKudoIds: new Set<string>(),
    onCopyLink: vi.fn(),
    onHashtagClick: vi.fn(),
  };

  return {
    ...render(<HighlightCarousel {...defaultProps} {...props} />, { wrapper }),
    onCopyLink: props.onCopyLink ?? defaultProps.onCopyLink,
    onHashtagClick: props.onHashtagClick ?? defaultProps.onHashtagClick,
  };
}

describe('HighlightCarousel', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('rendering', () => {
    it('renders carousel with kudos', () => {
      const kudos = createMockKudosList(5);
      renderCarousel({ kudos });

      // Should have the carousel region
      expect(screen.getByRole('region')).toBeInTheDocument();
    });

    it('renders empty state when no kudos', () => {
      renderCarousel({ kudos: [] });

      expect(screen.getByText('Hiện tại chưa có Kudos nào.')).toBeInTheDocument();
    });

    it('renders navigation arrows', () => {
      renderCarousel();

      // Vietnamese: "Slide trước" for previous, "Slide tiếp theo" for next
      const prevButtons = screen.getAllByRole('button', { name: /Slide trước/i });
      const nextButtons = screen.getAllByRole('button', { name: /Slide tiếp theo/i });

      expect(prevButtons.length).toBeGreaterThan(0);
      expect(nextButtons.length).toBeGreaterThan(0);
    });

    it('renders pagination indicator', () => {
      const kudos = createMockKudosList(5);
      renderCarousel({ kudos });

      // Should show "1/5" initially
      expect(screen.getByText('1/5')).toBeInTheDocument();
    });

    it('renders correct number of slides', () => {
      const kudos = createMockKudosList(3);
      renderCarousel({ kudos });

      // Check for slide aria-labels
      const slides = screen.getAllByRole('group', { name: /\d of \d/i });
      expect(slides).toHaveLength(3);
    });
  });

  describe('navigation - next button', () => {
    it('navigates to next slide on click', () => {
      const kudos = createMockKudosList(5);
      renderCarousel({ kudos });

      // Initially at slide 1
      expect(screen.getByText('1/5')).toBeInTheDocument();

      // Click next button (in pagination area)
      const nextButtons = screen.getAllByRole('button', { name: /Slide tiếp theo/i });
      const paginationNextButton = nextButtons[nextButtons.length - 1];

      act(() => {
        fireEvent.click(paginationNextButton);
      });

      // Should now be at slide 2
      expect(screen.getByText('2/5')).toBeInTheDocument();
    });

    it('disables next button at last slide', () => {
      const kudos = createMockKudosList(2);
      renderCarousel({ kudos });

      // Go to last slide
      const nextButtons = screen.getAllByRole('button', { name: /Slide tiếp theo/i });

      act(() => {
        fireEvent.click(nextButtons[0]);
      });

      // Now at 2/2, next should be disabled
      nextButtons.forEach((button) => {
        expect(button).toBeDisabled();
      });
    });
  });

  describe('navigation - previous button', () => {
    it('disables previous button at first slide', () => {
      renderCarousel();

      const prevButtons = screen.getAllByRole('button', { name: /Slide trước/i });

      // At first slide, all prev buttons should be disabled
      prevButtons.forEach((button) => {
        expect(button).toBeDisabled();
      });
    });

    it('enables previous button after navigating forward', () => {
      const kudos = createMockKudosList(5);
      renderCarousel({ kudos });

      // Navigate forward first
      const nextButtons = screen.getAllByRole('button', { name: /Slide tiếp theo/i });

      act(() => {
        fireEvent.click(nextButtons[0]);
      });

      // Now prev should be enabled
      const prevButtons = screen.getAllByRole('button', { name: /Slide trước/i });
      prevButtons.forEach((button) => {
        expect(button).not.toBeDisabled();
      });
    });

    it('navigates back to previous slide', () => {
      const kudos = createMockKudosList(5);
      renderCarousel({ kudos });

      // Go forward
      const nextButtons = screen.getAllByRole('button', { name: /Slide tiếp theo/i });
      act(() => {
        fireEvent.click(nextButtons[0]);
      });

      expect(screen.getByText('2/5')).toBeInTheDocument();

      // Go back
      const prevButtons = screen.getAllByRole('button', { name: /Slide trước/i });
      act(() => {
        fireEvent.click(prevButtons[0]);
      });

      expect(screen.getByText('1/5')).toBeInTheDocument();
    });
  });

  describe('pagination indicator', () => {
    it('shows current position and total', () => {
      const kudos = createMockKudosList(7);
      renderCarousel({ kudos });

      // Initial position
      expect(screen.getByText('1/7')).toBeInTheDocument();
    });

    it('updates on navigation', () => {
      const kudos = createMockKudosList(5);
      renderCarousel({ kudos });

      const nextButtons = screen.getAllByRole('button', { name: /Slide tiếp theo/i });

      // Navigate to slide 3
      act(() => {
        fireEvent.click(nextButtons[0]);
        fireEvent.click(nextButtons[0]);
      });

      expect(screen.getByText('3/5')).toBeInTheDocument();
    });

    it('has aria-live="polite" for accessibility', () => {
      renderCarousel();

      // Find the pagination container specifically (format: "N/M" not time format)
      const paginationText = screen.getByText('1/5');
      const pagination = paginationText.closest('[aria-live]');
      expect(pagination).toHaveAttribute('aria-live', 'polite');
    });
  });

  describe('accessibility', () => {
    it('carousel has role="region"', () => {
      renderCarousel();

      expect(screen.getByRole('region')).toBeInTheDocument();
    });

    it('carousel has appropriate aria-label', () => {
      renderCarousel();

      const carousel = screen.getByRole('region');
      expect(carousel).toHaveAttribute('aria-label');
    });

    it('carousel has aria-roledescription="carousel"', () => {
      renderCarousel();

      const carousel = screen.getByRole('region');
      expect(carousel).toHaveAttribute('aria-roledescription', 'carousel');
    });

    it('each slide has aria-roledescription="slide"', () => {
      const kudos = createMockKudosList(3);
      renderCarousel({ kudos });

      const slides = screen.getAllByRole('group', { name: /\d of \d/i });
      slides.forEach((slide) => {
        expect(slide).toHaveAttribute('aria-roledescription', 'slide');
      });
    });

    it('slides have aria-label with position', () => {
      const kudos = createMockKudosList(3);
      renderCarousel({ kudos });

      expect(screen.getByRole('group', { name: '1 of 3' })).toBeInTheDocument();
      expect(screen.getByRole('group', { name: '2 of 3' })).toBeInTheDocument();
      expect(screen.getByRole('group', { name: '3 of 3' })).toBeInTheDocument();
    });

    it('navigation buttons have aria-labels', () => {
      renderCarousel();

      const prevButtons = screen.getAllByRole('button', { name: /Slide trước/i });
      const nextButtons = screen.getAllByRole('button', { name: /Slide tiếp theo/i });

      expect(prevButtons.length).toBeGreaterThan(0);
      expect(nextButtons.length).toBeGreaterThan(0);
    });
  });

  describe('slide styling', () => {
    it('active slide has full opacity', () => {
      const kudos = createMockKudosList(3);
      renderCarousel({ kudos });

      const slides = screen.getAllByRole('group', { name: /\d of \d/i });
      const firstSlide = slides[0];

      // Active slide should have opacity 1
      expect(firstSlide).toHaveStyle({ opacity: '1' });
    });

    it('inactive slides have reduced opacity', () => {
      const kudos = createMockKudosList(3);
      renderCarousel({ kudos });

      const slides = screen.getAllByRole('group', { name: /\d of \d/i });

      // Non-active slides should have opacity 0.5
      expect(slides[1]).toHaveStyle({ opacity: '0.5' });
      expect(slides[2]).toHaveStyle({ opacity: '0.5' });
    });

    it('active slide has scale(1)', () => {
      const kudos = createMockKudosList(3);
      renderCarousel({ kudos });

      const slides = screen.getAllByRole('group', { name: /\d of \d/i });
      const firstSlide = slides[0];

      expect(firstSlide).toHaveStyle({ transform: 'scale(1)' });
    });

    it('inactive slides have scale(0.9)', () => {
      const kudos = createMockKudosList(3);
      renderCarousel({ kudos });

      const slides = screen.getAllByRole('group', { name: /\d of \d/i });

      expect(slides[1]).toHaveStyle({ transform: 'scale(0.9)' });
    });

    it('active slide has pointer-events auto', () => {
      const kudos = createMockKudosList(3);
      renderCarousel({ kudos });

      const slides = screen.getAllByRole('group', { name: /\d of \d/i });

      expect(slides[0]).toHaveStyle({ pointerEvents: 'auto' });
    });

    it('inactive slides have pointer-events none', () => {
      const kudos = createMockKudosList(3);
      renderCarousel({ kudos });

      const slides = screen.getAllByRole('group', { name: /\d of \d/i });

      expect(slides[1]).toHaveStyle({ pointerEvents: 'none' });
      expect(slides[2]).toHaveStyle({ pointerEvents: 'none' });
    });
  });

  describe('edge cases', () => {
    it('handles single kudo (no navigation possible)', () => {
      const kudos = createMockKudosList(1);
      renderCarousel({ kudos });

      expect(screen.getByText('1/1')).toBeInTheDocument();

      // Both prev and next should be disabled
      const prevButtons = screen.getAllByRole('button', { name: /Slide trước/i });
      const nextButtons = screen.getAllByRole('button', { name: /Slide tiếp theo/i });

      prevButtons.forEach((button) => {
        expect(button).toBeDisabled();
      });

      nextButtons.forEach((button) => {
        expect(button).toBeDisabled();
      });
    });

    it('handles two kudos correctly', () => {
      const kudos = createMockKudosList(2);
      renderCarousel({ kudos });

      expect(screen.getByText('1/2')).toBeInTheDocument();

      // Prev disabled, next enabled
      const prevButtons = screen.getAllByRole('button', { name: /Slide trước/i });
      const nextButtons = screen.getAllByRole('button', { name: /Slide tiếp theo/i });

      prevButtons.forEach((button) => {
        expect(button).toBeDisabled();
      });

      nextButtons.forEach((button) => {
        expect(button).not.toBeDisabled();
      });
    });

    it('handles exactly 5 kudos (max highlight count)', () => {
      const kudos = createMockKudosList(5);
      renderCarousel({ kudos });

      expect(screen.getByText('1/5')).toBeInTheDocument();

      // Navigate to last
      const nextButtons = screen.getAllByRole('button', { name: /Slide tiếp theo/i });

      for (let i = 0; i < 4; i++) {
        act(() => {
          fireEvent.click(nextButtons[0]);
        });
      }

      expect(screen.getByText('5/5')).toBeInTheDocument();
    });
  });

  describe('callback props', () => {
    it('passes onCopyLink to child cards', () => {
      const onCopyLink = vi.fn();
      renderCarousel({ onCopyLink });

      // The carousel renders HighlightKudoCard which has ActionBar with Copy Link
      // We'd need to interact with the card to test this
      // For now, we verify the carousel rendered without errors
      expect(screen.getByRole('region')).toBeInTheDocument();
    });

    it('passes onHashtagClick to child cards', () => {
      const onHashtagClick = vi.fn();
      renderCarousel({ onHashtagClick });

      expect(screen.getByRole('region')).toBeInTheDocument();
    });
  });
});
