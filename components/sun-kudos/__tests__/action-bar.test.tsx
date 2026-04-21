import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import type { ReactNode } from 'react';
import { LanguageProvider } from '@/lib/i18n';
import { ActionBar } from '../action-bar';

// Mock the server action
vi.mock('@/app/(main)/sun-kudos/actions', () => ({
  toggleKudoLikeAction: vi.fn().mockResolvedValue(undefined),
}));

// Mock sonner toast
vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
  },
}));

function wrapper({ children }: { children: ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}

function renderActionBar(props: Partial<Parameters<typeof ActionBar>[0]> = {}) {
  const defaultProps = {
    kudoId: 'kudo-1',
    likeCount: 10,
    isLiked: false,
    isOwnKudo: false,
    onCopyLink: vi.fn(),
    variant: 'feed' as const,
  };

  return {
    ...render(<ActionBar {...defaultProps} {...props} />, { wrapper }),
    onCopyLink: props.onCopyLink ?? defaultProps.onCopyLink,
  };
}

describe('ActionBar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('rendering', () => {
    it('renders heart icon and like count', () => {
      renderActionBar({ likeCount: 25 });

      expect(screen.getByText('25')).toBeInTheDocument();
    });

    it('renders Copy Link button', () => {
      renderActionBar();

      expect(screen.getByText('Copy Link')).toBeInTheDocument();
    });

    it('renders "Xem chi tiết" button only for highlight variant', () => {
      renderActionBar({ variant: 'highlight' });

      expect(screen.getByText('Xem chi tiết')).toBeInTheDocument();
    });

    it('does not render "Xem chi tiết" button for feed variant', () => {
      renderActionBar({ variant: 'feed' });

      expect(screen.queryByText('Xem chi tiết')).not.toBeInTheDocument();
    });
  });

  describe('heart button - liked state', () => {
    it('shows unliked state with correct aria-label when not liked', () => {
      renderActionBar({ isLiked: false });

      // Vietnamese: "Thích" for like
      const heartButton = screen.getByRole('button', { name: /Thích/i });
      expect(heartButton).toHaveAttribute('aria-pressed', 'false');
    });

    it('shows liked state with correct aria-label when liked', () => {
      renderActionBar({ isLiked: true });

      // Vietnamese: "Bỏ thích" for unlike
      const heartButton = screen.getByRole('button', { name: /Bỏ thích/i });
      expect(heartButton).toHaveAttribute('aria-pressed', 'true');
    });
  });

  describe('heart button - toggle interaction', () => {
    it('toggles liked state on click (optimistic update)', () => {
      renderActionBar({ isLiked: false, likeCount: 10 });

      const heartButton = screen.getByRole('button', { name: /Thích/i });

      act(() => {
        fireEvent.click(heartButton);
      });

      // After toggle, should show unlike state (Bỏ thích)
      expect(screen.getByRole('button', { name: /Bỏ thích/i })).toBeInTheDocument();
      expect(screen.getByText('11')).toBeInTheDocument();
    });

    it('increments count when toggling from unliked to liked', () => {
      renderActionBar({ isLiked: false, likeCount: 5 });

      const heartButton = screen.getByRole('button', { name: /Thích/i });

      act(() => {
        fireEvent.click(heartButton);
      });

      expect(screen.getByText('6')).toBeInTheDocument();
    });

    it('decrements count when toggling from liked to unliked', () => {
      renderActionBar({ isLiked: true, likeCount: 5 });

      const heartButton = screen.getByRole('button', { name: /Bỏ thích/i });

      act(() => {
        fireEvent.click(heartButton);
      });

      expect(screen.getByText('4')).toBeInTheDocument();
    });
  });

  describe('heart button - disabled state (own kudo)', () => {
    it('disables heart button when isOwnKudo is true', () => {
      renderActionBar({ isOwnKudo: true });

      const heartButton = screen.getByRole('button', { name: /Thích/i });
      expect(heartButton).toBeDisabled();
    });

    it('does not toggle when clicking disabled heart button', () => {
      renderActionBar({ isOwnKudo: true, isLiked: false, likeCount: 10 });

      const heartButton = screen.getByRole('button', { name: /Thích/i });

      act(() => {
        fireEvent.click(heartButton);
      });

      // Count should remain unchanged
      expect(screen.getByText('10')).toBeInTheDocument();
    });

    it('shows reduced opacity on disabled button', () => {
      renderActionBar({ isOwnKudo: true });

      const heartButton = screen.getByRole('button', { name: /Thích/i });
      expect(heartButton).toHaveClass('opacity-50');
    });
  });

  describe('Copy Link button', () => {
    it('calls onCopyLink when clicked', () => {
      const onCopyLink = vi.fn();
      renderActionBar({ onCopyLink });

      const copyButton = screen.getByText('Copy Link');

      fireEvent.click(copyButton);

      expect(onCopyLink).toHaveBeenCalledTimes(1);
    });

    it('has hover styles', () => {
      renderActionBar();

      const copyButton = screen.getByText('Copy Link').closest('button');
      expect(copyButton).toHaveClass('hover:underline');
    });
  });

  describe('variant styling', () => {
    it('uses larger count text for highlight variant', () => {
      renderActionBar({ variant: 'highlight', likeCount: 100 });

      const countText = screen.getByText('100');
      expect(countText).toHaveClass('text-2xl');
    });

    it('uses smaller count text for feed variant', () => {
      renderActionBar({ variant: 'feed', likeCount: 100 });

      const countText = screen.getByText('100');
      expect(countText).toHaveClass('text-base');
    });
  });

  describe('accessibility', () => {
    it('heart button has aria-pressed attribute', () => {
      renderActionBar({ isLiked: false });

      const heartButton = screen.getByRole('button', { name: /Thích/i });
      expect(heartButton).toHaveAttribute('aria-pressed', 'false');
    });

    it('heart button updates aria-pressed on toggle', () => {
      renderActionBar({ isLiked: false });

      const heartButton = screen.getByRole('button', { name: /Thích/i });

      act(() => {
        fireEvent.click(heartButton);
      });

      expect(heartButton).toHaveAttribute('aria-pressed', 'true');
    });

    it('heart button has appropriate aria-label based on state', () => {
      renderActionBar({ isLiked: false });

      expect(screen.getByRole('button', { name: /Thích/i })).toBeInTheDocument();

      // Rerender with liked state - need to re-wrap with provider
      render(
        <LanguageProvider>
          <ActionBar
            kudoId="kudo-1"
            likeCount={10}
            isLiked={true}
            isOwnKudo={false}
            onCopyLink={vi.fn()}
            variant="feed"
          />
        </LanguageProvider>,
      );

      expect(screen.getByRole('button', { name: /Bỏ thích/i })).toBeInTheDocument();
    });

    it('buttons have type="button"', () => {
      renderActionBar({ variant: 'highlight' });

      const buttons = screen.getAllByRole('button');
      buttons.forEach((button) => {
        expect(button).toHaveAttribute('type', 'button');
      });
    });
  });

  describe('number formatting', () => {
    it('formats large numbers with locale string', () => {
      renderActionBar({ likeCount: 1234 });

      // toLocaleString() formats numbers - exact format depends on locale
      expect(screen.getByText(/1[,.]?234/)).toBeInTheDocument();
    });

    it('handles zero count', () => {
      renderActionBar({ likeCount: 0 });

      expect(screen.getByText('0')).toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('handles rapid clicks with debouncing', () => {
      renderActionBar({ isLiked: false, likeCount: 10 });

      const heartButton = screen.getByRole('button', { name: /Thích/i });

      // Rapid clicks
      act(() => {
        fireEvent.click(heartButton);
        fireEvent.click(heartButton);
        fireEvent.click(heartButton);
      });

      // Final state after 3 toggles from false: false -> true -> false -> true
      // Each click toggles the state
      expect(screen.getByText('11')).toBeInTheDocument();
    });

    it('renders correctly with very long count', () => {
      renderActionBar({ likeCount: 999999999 });

      // Should render formatted number
      expect(screen.getByText(/999/)).toBeInTheDocument();
    });
  });
});
