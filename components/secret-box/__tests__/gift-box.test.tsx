import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import type { ReactNode } from 'react';
import { LanguageProvider } from '@/lib/i18n';
import { GiftBox } from '../gift-box';

function wrapper({ children }: { children: ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}

function renderGiftBox(props: {
  isDisabled?: boolean;
  isOpening?: boolean;
  onClick?: () => void;
}) {
  const defaultProps = {
    isDisabled: false,
    isOpening: false,
    onClick: vi.fn(),
  };
  return render(<GiftBox {...defaultProps} {...props} />, { wrapper });
}

describe('GiftBox', () => {
  describe('accessibility', () => {
    it('has button role', () => {
      renderGiftBox({});
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('has correct aria-label', () => {
      renderGiftBox({});
      // Vietnamese default
      expect(screen.getByLabelText('Mở Secret Box')).toBeInTheDocument();
    });

    it('is focusable when enabled', () => {
      renderGiftBox({});
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('tabIndex', '0');
    });

    it('is not focusable when disabled', () => {
      renderGiftBox({ isDisabled: true });
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('tabIndex', '-1');
    });

    it('has aria-disabled true when disabled', () => {
      renderGiftBox({ isDisabled: true });
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });

    it('has aria-disabled true when opening', () => {
      renderGiftBox({ isOpening: true });
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('click handling', () => {
    it('calls onClick when clicked and enabled', () => {
      const onClick = vi.fn();
      renderGiftBox({ onClick });

      fireEvent.click(screen.getByRole('button'));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', () => {
      const onClick = vi.fn();
      renderGiftBox({ isDisabled: true, onClick });

      fireEvent.click(screen.getByRole('button'));
      expect(onClick).not.toHaveBeenCalled();
    });

    it('does not call onClick when opening', () => {
      const onClick = vi.fn();
      renderGiftBox({ isOpening: true, onClick });

      fireEvent.click(screen.getByRole('button'));
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('keyboard handling', () => {
    it('calls onClick on Enter key', () => {
      const onClick = vi.fn();
      renderGiftBox({ onClick });

      fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter' });
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('calls onClick on Space key', () => {
      const onClick = vi.fn();
      renderGiftBox({ onClick });

      fireEvent.keyDown(screen.getByRole('button'), { key: ' ' });
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick on other keys', () => {
      const onClick = vi.fn();
      renderGiftBox({ onClick });

      fireEvent.keyDown(screen.getByRole('button'), { key: 'a' });
      expect(onClick).not.toHaveBeenCalled();
    });

    it('does not call onClick on Enter when disabled', () => {
      const onClick = vi.fn();
      renderGiftBox({ isDisabled: true, onClick });

      fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter' });
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('visual states', () => {
    it('shows cursor-pointer when interactive', () => {
      const { container } = renderGiftBox({});
      const button = container.querySelector('[role="button"]');
      expect(button?.className).toContain('cursor-pointer');
    });

    it('shows cursor-not-allowed when disabled', () => {
      const { container } = renderGiftBox({ isDisabled: true });
      const button = container.querySelector('[role="button"]');
      expect(button?.className).toContain('cursor-not-allowed');
    });

    it('shows cursor-wait when opening', () => {
      const { container } = renderGiftBox({ isOpening: true });
      const button = container.querySelector('[role="button"]');
      expect(button?.className).toContain('cursor-wait');
    });

    it('applies reduced opacity when disabled', () => {
      const { container } = renderGiftBox({ isDisabled: true });
      const button = container.querySelector('[role="button"]');
      expect(button?.className).toContain('opacity-60');
    });
  });

  describe('images', () => {
    it('renders gift box image', () => {
      const { container } = renderGiftBox({});
      const images = container.querySelectorAll('img');
      const giftBoxImg = Array.from(images).find((img) =>
        img.getAttribute('src')?.includes('gift-box')
      );
      expect(giftBoxImg).toBeInTheDocument();
    });

    it('renders glow effect image', () => {
      const { container } = renderGiftBox({});
      const images = container.querySelectorAll('img');
      const glowImg = Array.from(images).find((img) =>
        img.getAttribute('src')?.includes('glow-effect')
      );
      expect(glowImg).toBeInTheDocument();
    });
  });
});
