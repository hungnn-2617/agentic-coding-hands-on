import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { LanguageProvider } from '@/lib/i18n';
import { CountDisplay } from '../count-display';

function wrapper({ children }: { children: ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}

function renderCountDisplay(count: number, isAnimating = false) {
  return render(<CountDisplay count={count} isAnimating={isAnimating} />, {
    wrapper,
  });
}

describe('CountDisplay', () => {
  describe('count formatting', () => {
    it('displays count with zero padding for single digits', () => {
      renderCountDisplay(5);
      expect(screen.getByText('05')).toBeInTheDocument();
    });

    it('displays count without padding for double digits', () => {
      renderCountDisplay(42);
      expect(screen.getByText('42')).toBeInTheDocument();
    });

    it('displays "99+" for counts over 99', () => {
      renderCountDisplay(100);
      expect(screen.getByText('99+')).toBeInTheDocument();
    });

    it('displays "99+" for very large counts', () => {
      renderCountDisplay(9999);
      expect(screen.getByText('99+')).toBeInTheDocument();
    });

    it('displays "00" for zero count', () => {
      renderCountDisplay(0);
      expect(screen.getByText('00')).toBeInTheDocument();
    });

    it('displays "99" for exactly 99', () => {
      renderCountDisplay(99);
      expect(screen.getByText('99')).toBeInTheDocument();
    });
  });

  describe('label display', () => {
    it('displays the label text in Vietnamese by default', () => {
      renderCountDisplay(5);
      expect(screen.getByText('Secretbox chưa mở')).toBeInTheDocument();
    });
  });

  describe('animation state', () => {
    it('does not apply animation class when isAnimating is false', () => {
      const { container } = renderCountDisplay(5, false);
      const countSpan = container.querySelector('.text-\\[\\#FFEA9E\\]');
      expect(countSpan).not.toHaveClass('animate-[count-pop_0.2s_ease-out]');
    });

    it('applies animation class when isAnimating is true', () => {
      const { container } = renderCountDisplay(5, true);
      const countSpan = container.querySelector('.text-\\[\\#FFEA9E\\]');
      expect(countSpan?.className).toContain('animate-[count-pop_0.2s_ease-out]');
    });
  });

  describe('styling', () => {
    it('displays count in gold color', () => {
      const { container } = renderCountDisplay(5);
      const countSpan = container.querySelector('.text-\\[\\#FFEA9E\\]');
      expect(countSpan).toBeInTheDocument();
    });

    it('displays label in white color', () => {
      const { container } = renderCountDisplay(5);
      const labelSpan = container.querySelector('.text-white');
      expect(labelSpan).toBeInTheDocument();
    });
  });
});
